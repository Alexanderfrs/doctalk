
-- COMPLETE REVERT: Undo ALL security changes that broke the website
-- This will restore the original working state before any security modifications

-- 1. Drop the problematic user_roles table and related functions
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP FUNCTION IF EXISTS public.has_role(UUID, app_role) CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;

-- 2. Completely restore original permissive access to alpha_subscribers
DROP POLICY IF EXISTS "Admins can view alpha subscribers" ON public.alpha_subscribers;
DROP POLICY IF EXISTS "Anyone can insert alpha subscribers" ON public.alpha_subscribers;
DROP POLICY IF EXISTS "Allow all operations on alpha_subscribers" ON public.alpha_subscribers;

-- Restore original permissive policy for alpha_subscribers
CREATE POLICY "Allow all operations on alpha_subscribers" 
  ON public.alpha_subscribers 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 3. Completely restore original permissive access to trial_feedback
DROP POLICY IF EXISTS "Admins can view trial feedback" ON public.trial_feedback;
DROP POLICY IF EXISTS "Anyone can submit trial feedback" ON public.trial_feedback;
DROP POLICY IF EXISTS "Allow all operations on trial_feedback" ON public.trial_feedback;

-- Restore original permissive policy for trial_feedback
CREATE POLICY "Allow all operations on trial_feedback" 
  ON public.trial_feedback 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 4. Restore original function definitions (remove security changes)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', new.email));
  RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_user_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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
