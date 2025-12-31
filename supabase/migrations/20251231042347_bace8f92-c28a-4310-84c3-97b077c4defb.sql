-- Create table for weekly challenges
CREATE TABLE public.weekly_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  module TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium',
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  target_score INTEGER NOT NULL DEFAULT 70,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user challenge completions
CREATE TABLE public.challenge_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.weekly_challenges(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable Row Level Security
ALTER TABLE public.weekly_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_completions ENABLE ROW LEVEL SECURITY;

-- Everyone can view challenges
CREATE POLICY "Challenges are viewable by everyone" 
ON public.weekly_challenges 
FOR SELECT 
USING (true);

-- Users can view their own completions
CREATE POLICY "Users can view their own completions" 
ON public.challenge_completions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own completions
CREATE POLICY "Users can insert their own completions" 
ON public.challenge_completions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_weekly_challenges_dates ON public.weekly_challenges(week_start, week_end);
CREATE INDEX idx_challenge_completions_user ON public.challenge_completions(user_id);

-- Insert initial weekly challenges
INSERT INTO public.weekly_challenges (title, description, module, difficulty, week_start, week_end, target_score) VALUES
('Pattern Master', 'Complete the pattern reasoning module with a score of 70% or higher', 'pattern', 'medium', CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER, CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6, 70),
('Spatial Explorer', 'Test your spatial reasoning abilities and score 65% or higher', 'spatial', 'medium', CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER, CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6, 65),
('Memory Champion', 'Challenge your working memory with a target of 75%', 'memory', 'hard', CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER, CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6, 75),
('Speed Demon', 'Test your processing speed and aim for 60% or higher', 'speed', 'easy', CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER, CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6, 60);