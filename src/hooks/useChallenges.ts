import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  module: string;
  difficulty: string;
  week_start: string;
  week_end: string;
  target_score: number;
  created_at: string;
}

export interface ChallengeCompletion {
  id: string;
  user_id: string;
  challenge_id: string;
  score: number;
  completed_at: string;
}

export interface ChallengeWithStatus extends WeeklyChallenge {
  isCompleted: boolean;
  userScore: number | null;
  isPassed: boolean;
}

export function useChallenges() {
  const { user, isPremium } = useAuth();
  const [challenges, setChallenges] = useState<ChallengeWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch current week's challenges
      const today = new Date().toISOString().split('T')[0];
      
      const { data: challengeData, error: challengeError } = await supabase
        .from('weekly_challenges')
        .select('*')
        .lte('week_start', today)
        .gte('week_end', today);

      if (challengeError) throw challengeError;

      // Fetch user's completions if logged in
      let completions: ChallengeCompletion[] = [];
      if (user) {
        const { data: completionData, error: completionError } = await supabase
          .from('challenge_completions')
          .select('*')
          .eq('user_id', user.id);

        if (completionError) throw completionError;
        completions = completionData || [];
      }

      // Merge challenges with completion status
      const challengesWithStatus: ChallengeWithStatus[] = (challengeData || []).map((challenge) => {
        const completion = completions.find(c => c.challenge_id === challenge.id);
        return {
          ...challenge,
          isCompleted: !!completion,
          userScore: completion ? Number(completion.score) : null,
          isPassed: completion ? Number(completion.score) >= challenge.target_score : false,
        };
      });

      setChallenges(challengesWithStatus);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError('Failed to load challenges');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const completeChallenge = useCallback(async (challengeId: string, score: number): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error: insertError } = await supabase
        .from('challenge_completions')
        .upsert({
          user_id: user.id,
          challenge_id: challengeId,
          score,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,challenge_id'
        });

      if (insertError) throw insertError;

      await fetchChallenges();
      return true;
    } catch (err) {
      console.error('Error completing challenge:', err);
      return false;
    }
  }, [user, fetchChallenges]);

  const getChallengeStats = useCallback(() => {
    const total = challenges.length;
    const completed = challenges.filter(c => c.isCompleted).length;
    const passed = challenges.filter(c => c.isPassed).length;

    return {
      total,
      completed,
      passed,
      remaining: total - completed,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
    };
  }, [challenges]);

  useEffect(() => {
    if (isPremium) {
      fetchChallenges();
    }
  }, [isPremium, fetchChallenges]);

  return {
    challenges,
    isLoading,
    error,
    fetchChallenges,
    completeChallenge,
    getChallengeStats,
  };
}
