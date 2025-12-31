import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTestHistory, SavedTestResult } from '@/hooks/useTestHistory';
import { Brain, TrendingUp, TrendingDown, Minus, Trophy, Calendar, ArrowLeft, Crown, Loader2, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function Progress() {
  const navigate = useNavigate();
  const { user, isPremium, isLoading: authLoading } = useAuth();
  const { history, isLoading, getProgressStats } = useTestHistory();

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6">
        <Card variant="glass" className="max-w-md w-full text-center p-8">
          <Brain className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-bold text-foreground mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Sign in to track your progress over time</p>
          <Button variant="hero" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6">
        <Card variant="glass" className="max-w-md w-full text-center p-8">
          <Crown className="w-16 h-16 mx-auto mb-4 text-secondary" />
          <h2 className="text-xl font-bold text-foreground mb-2">Premium Feature</h2>
          <p className="text-muted-foreground mb-6">Unlock premium to track your progress and view improvement trends</p>
          <Button variant="hero" onClick={() => navigate('/')}>
            <Crown className="w-4 h-4 mr-2" />
            Unlock Premium
          </Button>
        </Card>
      </div>
    );
  }

  const stats = getProgressStats();

  // Prepare chart data (reverse to show oldest first)
  const chartData = useMemo(() => {
    return [...history]
      .reverse()
      .map((result, index) => ({
        name: format(new Date(result.completed_at), 'MMM d'),
        iq: result.iq_base,
        overall: Math.round(result.overall_score),
        test: index + 1,
      }));
  }, [history]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-destructive" />;
      default:
        return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Test
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your cognitive improvement over time</p>
        </div>

        {history.length === 0 ? (
          <Card variant="glass" className="text-center p-8">
            <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Results Yet</h3>
            <p className="text-muted-foreground mb-4">Complete your first test to start tracking progress</p>
            <Button variant="hero" onClick={() => navigate('/')}>
              Take Test
            </Button>
          </Card>
        ) : (
          <>
            {/* Stats Overview */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card variant="glass" className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.testsCompleted}</div>
                  <div className="text-xs text-muted-foreground">Tests Taken</div>
                </Card>
                <Card variant="glass" className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.latestIQ}</div>
                  <div className="text-xs text-muted-foreground">Latest IQ</div>
                </Card>
                <Card variant="glass" className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">{stats.bestIQ}</div>
                  <div className="text-xs text-muted-foreground">Best Score</div>
                </Card>
                <Card variant="glass" className="p-4 text-center flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    {getTrendIcon(stats.improvementTrend)}
                    <span className={`text-2xl font-bold ${stats.iqChange >= 0 ? 'text-green-400' : 'text-destructive'}`}>
                      {stats.iqChange > 0 ? '+' : ''}{stats.iqChange}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Change</div>
                </Card>
              </div>
            )}

            {/* IQ Trend Chart */}
            {history.length >= 2 && (
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    IQ Trend Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="iqGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 10%, 20%)" />
                        <XAxis 
                          dataKey="name" 
                          stroke="hsl(215, 20%, 65%)" 
                          fontSize={12}
                          tickLine={false}
                        />
                        <YAxis 
                          domain={['dataMin - 10', 'dataMax + 10']} 
                          stroke="hsl(215, 20%, 65%)" 
                          fontSize={12}
                          tickLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(228, 12%, 10%)', 
                            border: '1px solid hsl(228, 10%, 20%)',
                            borderRadius: '8px',
                            color: 'hsl(210, 40%, 98%)'
                          }}
                          formatter={(value: number) => [`IQ: ${value}`, '']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="iq" 
                          stroke="hsl(190, 100%, 50%)" 
                          strokeWidth={2}
                          fill="url(#iqGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Test History */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Test History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {history.map((result, index) => (
                  <div
                    key={result.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0 ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {index === 0 && (
                        <Trophy className="w-5 h-5 text-secondary" />
                      )}
                      <div>
                        <div className="font-medium text-foreground">
                          IQ: {result.iq_min}-{result.iq_max}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(result.completed_at), 'MMM d, yyyy • h:mm a')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {Math.round(result.overall_score)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Top {100 - result.percentile}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
