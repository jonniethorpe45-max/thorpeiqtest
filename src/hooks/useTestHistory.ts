import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { TestResult } from '@/types/questions';

export interface SavedTestResult {
  id: string;
  user_id: string;
  iq_base: number;
  iq_min: number;
  iq_max: number;
  percentile: number;
  overall_score: number;
  pattern_score: number | null;
  spatial_score: number | null;
  memory_score: number | null;
  speed_score: number | null;
  completed_at: string;
  created_at: string;
}

export function useTestHistory() {
  const { user, isPremium } = useAuth();
  const [history, setHistory] = useState<SavedTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!user) {
      setHistory([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;
      setHistory(data || []);
    } catch (err) {
      console.error('Error fetching test history:', err);
      setError('Failed to load test history');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const saveResult = useCallback(async (result: TestResult): Promise<boolean> => {
    if (!user) return false;

    try {
      const moduleScores: Record<string, number | null> = {
        pattern_score: null,
        spatial_score: null,
        memory_score: null,
        speed_score: null,
      };

      result.moduleResults.forEach((mr) => {
        const key = `${mr.module}_score` as keyof typeof moduleScores;
        if (key in moduleScores) {
          moduleScores[key] = mr.percentageScore;
        }
      });

      const { error: insertError } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          iq_base: result.iqBase,
          iq_min: result.iqRange.min,
          iq_max: result.iqRange.max,
          percentile: result.percentile,
          overall_score: result.overallScore,
          ...moduleScores,
          completed_at: result.completedAt.toISOString(),
        });

      if (insertError) throw insertError;
      
      // Refresh history after saving
      await fetchHistory();
      return true;
    } catch (err) {
      console.error('Error saving test result:', err);
      return false;
    }
  }, [user, fetchHistory]);

  const getProgressStats = useCallback(() => {
    if (history.length < 2) return null;

    const latest = history[0];
    const oldest = history[history.length - 1];
    const iqChange = latest.iq_base - oldest.iq_base;
    const avgIQ = Math.round(history.reduce((acc, h) => acc + h.iq_base, 0) / history.length);
    const bestIQ = Math.max(...history.map(h => h.iq_base));

    return {
      testsCompleted: history.length,
      iqChange,
      avgIQ,
      bestIQ,
      latestIQ: latest.iq_base,
      improvementTrend: iqChange > 0 ? 'improving' : iqChange < 0 ? 'declining' : 'stable',
    };
  }, [history]);

  useEffect(() => {
    if (user && isPremium) {
      fetchHistory();
    }
  }, [user, isPremium, fetchHistory]);

  return {
    history,
    isLoading,
    error,
    saveResult,
    fetchHistory,
    getProgressStats,
  };
}
