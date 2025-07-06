
-- Add confidence_score column to scenario_attempts table to track user self-ratings
ALTER TABLE public.scenario_attempts 
ADD COLUMN confidence_score integer CHECK (confidence_score >= 1 AND confidence_score <= 5);

-- Add comment to explain the confidence score scale
COMMENT ON COLUMN public.scenario_attempts.confidence_score IS 'User self-rated confidence score from 1-5 (1=Not confident, 5=Very confident)';
