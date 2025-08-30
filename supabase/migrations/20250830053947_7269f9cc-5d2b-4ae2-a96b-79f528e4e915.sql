
-- Complete revert of all RLS policies to restore website functionality
-- This will disable RLS entirely on tables that might be blocking the website

-- Completely disable RLS on all tables except those that absolutely require authentication
ALTER TABLE public.alpha_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_feedback DISABLE ROW LEVEL SECURITY;

-- For user-specific tables, keep RLS but ensure policies are working
-- Drop any problematic policies and recreate simple ones
DROP POLICY IF EXISTS "Users can view their own learning sessions" ON public.learning_sessions;
DROP POLICY IF EXISTS "Users can create their own learning sessions" ON public.learning_sessions;
DROP POLICY IF EXISTS "Users can update their own learning sessions" ON public.learning_sessions;

DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can create their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;

DROP POLICY IF EXISTS "Users can view their own scenario attempts" ON public.scenario_attempts;
DROP POLICY IF EXISTS "Users can create their own scenario attempts" ON public.scenario_attempts;

DROP POLICY IF EXISTS "Users can view their own vocabulary progress" ON public.vocabulary_mastery;
DROP POLICY IF EXISTS "Users can create their own vocabulary progress" ON public.vocabulary_mastery;
DROP POLICY IF EXISTS "Users can update their own vocabulary progress" ON public.vocabulary_mastery;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create simple permissive policies only where authentication is actually needed
CREATE POLICY "Allow authenticated users" ON public.learning_sessions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users" ON public.user_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users" ON public.scenario_attempts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users" ON public.vocabulary_mastery FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow authenticated users" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
