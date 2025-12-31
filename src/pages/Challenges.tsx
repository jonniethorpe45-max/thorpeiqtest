import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { useChallenges, ChallengeWithStatus } from '@/hooks/useChallenges';
import { 
  Brain, 
  Boxes, 
  Target, 
  Zap, 
  ArrowLeft, 
  Crown, 
  Loader2, 
  Trophy, 
  CheckCircle2, 
  Circle,
  Flame
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { trackPageView, trackEvent } from '@/lib/analytics';

const moduleIcons: Record<string, React.ReactNode> = {
  pattern: <Brain className="w-6 h-6" />,
  spatial: <Boxes className="w-6 h-6" />,
  memory: <Target className="w-6 h-6" />,
  speed: <Zap className="w-6 h-6" />,
};

const moduleColors: Record<string, string> = {
  pattern: 'text-primary bg-primary/20 border-primary/30',
  spatial: 'text-accent bg-accent/20 border-accent/30',
  memory: 'text-secondary bg-secondary/20 border-secondary/30',
  speed: 'text-green-400 bg-green-400/20 border-green-400/30',
};

const difficultyColors: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-secondary',
  hard: 'text-destructive',
};

export default function Challenges() {
  const navigate = useNavigate();
  const { user, isPremium, isLoading: authLoading } = useAuth();
  const { challenges, isLoading, getChallengeStats } = useChallenges();

  useEffect(() => {
    trackPageView('Challenges');
  }, []);

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
          <Flame className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-bold text-foreground mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Sign in to access weekly challenges</p>
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
          <p className="text-muted-foreground mb-6">Unlock premium to access weekly cognitive challenges</p>
          <Button variant="hero" onClick={() => navigate('/')}>
            <Crown className="w-4 h-4 mr-2" />
            Unlock Premium
          </Button>
        </Card>
      </div>
    );
  }

  const stats = getChallengeStats();
  const daysLeft = challenges.length > 0 
    ? differenceInDays(new Date(challenges[0].week_end), new Date()) + 1
    : 0;

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Weekly Challenges</h1>
          <p className="text-muted-foreground">Complete cognitive challenges to sharpen your mind</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card variant="glass" className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.passed}</div>
            <div className="text-xs text-muted-foreground">Passed</div>
          </Card>
          <Card variant="glass" className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{stats.remaining}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </Card>
          <Card variant="glass" className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{daysLeft}</div>
            <div className="text-xs text-muted-foreground">Days Left</div>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Weekly Progress</span>
              <span className="text-sm font-medium text-primary">{stats.passed}/{stats.total}</span>
            </div>
            <Progress value={(stats.passed / Math.max(stats.total, 1)) * 100} indicatorVariant="glow" />
          </CardContent>
        </Card>

        {/* Challenges List */}
        <div className="space-y-4">
          {challenges.length === 0 ? (
            <Card variant="glass" className="text-center p-8">
              <Flame className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Challenges This Week</h3>
              <p className="text-muted-foreground">Check back soon for new challenges!</p>
            </Card>
          ) : (
            challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: ChallengeWithStatus }) {
  const navigate = useNavigate();
  
  return (
    <Card 
      variant="glass" 
      className={`overflow-hidden transition-all ${
        challenge.isPassed ? 'border-green-400/30 bg-green-400/5' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Module Icon */}
          <div className={`p-3 rounded-xl border ${moduleColors[challenge.module]}`}>
            {moduleIcons[challenge.module]}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{challenge.title}</h3>
              <span className={`text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
            
            {/* Target */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Target: {challenge.target_score}%</span>
                </div>
                {challenge.isCompleted && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">Your score:</span>
                    <span className={`text-sm font-medium ${challenge.isPassed ? 'text-green-400' : 'text-destructive'}`}>
                      {Math.round(challenge.userScore || 0)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                {challenge.isPassed ? (
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Passed</span>
                  </div>
                ) : challenge.isCompleted ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      trackEvent('challenge_retry_clicked', { 
                        challenge_title: challenge.title, 
                        module: challenge.module 
                      });
                      navigate('/');
                    }}
                  >
                    Retry
                  </Button>
                ) : (
                  <Button 
                    variant="hero" 
                    size="sm"
                    onClick={() => {
                      trackEvent('challenge_started', { 
                        challenge_title: challenge.title, 
                        module: challenge.module,
                        difficulty: challenge.difficulty,
                        target_score: challenge.target_score
                      });
                      navigate('/');
                    }}
                  >
                    Start
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
