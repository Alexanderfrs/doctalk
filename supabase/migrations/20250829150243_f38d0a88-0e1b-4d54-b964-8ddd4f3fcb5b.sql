
-- Phase 1: Critical Data Protection - Restrict public access to sensitive tables

-- 1. Remove public access policies from alpha_subscribers table
DROP POLICY IF EXISTS "Allow authenticated users to view beta signups" ON public.alpha_subscribers;
DROP POLICY IF EXISTS "Allow public to insert beta signups" ON public.alpha_subscribers;

-- 2. Remove public access policies from trial_feedback table  
DROP POLICY IF EXISTS "Allow viewing trial feedback" ON public.trial_feedback;

-- 3. Create user_roles table for admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- 5. Create secure policies for alpha_subscribers (admin-only access)
CREATE POLICY "Admins can view alpha subscribers" 
  ON public.alpha_subscribers 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert alpha subscribers" 
  ON public.alpha_subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- 6. Create secure policies for trial_feedback (admin-only access)
CREATE POLICY "Admins can view trial feedback" 
  ON public.trial_feedback 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit trial feedback" 
  ON public.trial_feedback 
  FOR INSERT 
  WITH CHECK (true);

-- 7. Create policy for user_roles table
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
  ON public.user_roles 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 3: Database Security - Fix vulnerable functions with proper search_path

-- 8. Fix handle_new_user function security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', new.email));
  RETURN new;
END;
$function$;

-- 9. Fix create_user_progress function security
CREATE OR REPLACE FUNCTION public.create_user_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.user_progress (
    user_id,
    daily_goal_minutes,
    weekly_goal_minutes
  ) VALUES (
    NEW.id,
    COALESCE(NEW.daily_goal_minutes, 20),
    COALESCE(NEW.weekly_goal_sessions * NEW.daily_goal_minutes, 120)
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$function$;

-- 10. Insert initial admin user (replace with your actual user ID after first signup)
-- Note: This will need to be updated with the actual admin user ID
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('your-admin-user-id-here', 'admin')
-- ON CONFLICT (user_id, role) DO NOTHING;
