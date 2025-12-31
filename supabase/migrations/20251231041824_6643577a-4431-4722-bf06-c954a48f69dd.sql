-- Create table for storing test results
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  iq_base INTEGER NOT NULL,
  iq_min INTEGER NOT NULL,
  iq_max INTEGER NOT NULL,
  percentile INTEGER NOT NULL,
  overall_score NUMERIC NOT NULL,
  pattern_score NUMERIC,
  spatial_score NUMERIC,
  memory_score NUMERIC,
  speed_score NUMERIC,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- Users can view their own results
CREATE POLICY "Users can view their own results" 
ON public.test_results 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert their own results" 
ON public.test_results 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_test_results_user_id ON public.test_results(user_id);
CREATE INDEX idx_test_results_completed_at ON public.test_results(completed_at DESC);