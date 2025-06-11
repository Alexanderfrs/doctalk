
-- Create progress tracking tables for accurate user metrics

-- Table to track daily learning sessions and calculate streaks
CREATE TABLE public.learning_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  minutes_studied INTEGER NOT NULL DEFAULT 0,
  scenarios_completed INTEGER NOT NULL DEFAULT 0,
  vocabulary_practiced INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, session_date)
);

-- Table to track scenario attempts with detailed performance
CREATE TABLE public.scenario_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  scenario_id TEXT NOT NULL,
  scenario_type TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  duration_minutes INTEGER,
  accuracy_score DECIMAL(3,2), -- 0.00 to 1.00
  feedback_quality TEXT CHECK (feedback_quality IN ('excellent', 'good', 'needs_improvement')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table to track vocabulary learning progress
CREATE TABLE public.vocabulary_mastery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  word_id TEXT NOT NULL,
  category TEXT NOT NULL,
  mastery_level INTEGER NOT NULL DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),
  last_practiced TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  correct_attempts INTEGER NOT NULL DEFAULT 0,
  total_attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, word_id)
);

-- Table to track overall user progress metrics
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  total_study_minutes INTEGER NOT NULL DEFAULT 0,
  scenarios_completed INTEGER NOT NULL DEFAULT 0,
  vocabulary_mastered INTEGER NOT NULL DEFAULT 0,
  last_study_date DATE,
  weekly_goal_minutes INTEGER NOT NULL DEFAULT 120, -- 2 hours default
  daily_goal_minutes INTEGER NOT NULL DEFAULT 20,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for learning_sessions
CREATE POLICY "Users can view their own learning sessions" 
  ON public.learning_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own learning sessions" 
  ON public.learning_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning sessions" 
  ON public.learning_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for scenario_attempts
CREATE POLICY "Users can view their own scenario attempts" 
  ON public.scenario_attempts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scenario attempts" 
  ON public.scenario_attempts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for vocabulary_mastery
CREATE POLICY "Users can view their own vocabulary progress" 
  ON public.vocabulary_mastery 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own vocabulary progress" 
  ON public.vocabulary_mastery 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vocabulary progress" 
  ON public.vocabulary_mastery 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for user_progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress" 
  ON public.user_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add new columns to existing profiles table for profession-specific data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profession_category TEXT,
ADD COLUMN IF NOT EXISTS specialty_areas TEXT[],
ADD COLUMN IF NOT EXISTS learning_preferences JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS practice_needs TEXT[],
ADD COLUMN IF NOT EXISTS experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS daily_goal_minutes INTEGER DEFAULT 20,
ADD COLUMN IF NOT EXISTS weekly_goal_sessions INTEGER DEFAULT 5;

-- Create function to automatically create user_progress when profile is created
CREATE OR REPLACE FUNCTION public.create_user_progress()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user_progress
CREATE OR REPLACE TRIGGER create_user_progress_trigger
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_progress();
