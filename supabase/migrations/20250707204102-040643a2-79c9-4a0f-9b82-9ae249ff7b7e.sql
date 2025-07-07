
-- Create a table for trial feedback
CREATE TABLE public.trial_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  was_helpful BOOLEAN NOT NULL,
  what_helped_most TEXT[] DEFAULT '{}',
  improvement_suggestion TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_session_id TEXT, -- Since this is for trial users who might not be authenticated
  ip_address INET,
  user_agent TEXT
);

-- Add Row Level Security (RLS) 
ALTER TABLE public.trial_feedback ENABLE ROW LEVEL Security;

-- Create policy that allows anyone to insert trial feedback (since trial users are not authenticated)
CREATE POLICY "Anyone can submit trial feedback" 
  ON public.trial_feedback 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows viewing feedback (for analytics/admin purposes)
CREATE POLICY "Allow viewing trial feedback" 
  ON public.trial_feedback 
  FOR SELECT 
  USING (true);
