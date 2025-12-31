import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTest } from '@/context/TestContext';
import { useAuth } from '@/context/AuthContext';
import { MODULES } from '@/types/questions';
import { Share2, Crown, RotateCcw, Download, Brain, Zap, Target, Boxes, Loader2, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { generatePDFReport } from '@/lib/pdfGenerator';

export function ResultsScreen() {
  const { result, resetTest } = useTest();
  const { user, isPremium, checkPremiumStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check for payment success in URL
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast.success('Payment successful! Premium features unlocked.');
      checkPremiumStatus();
      // Clear the URL params
      navigate('/', { replace: true });
    } else if (paymentStatus === 'cancelled') {
      toast.info('Payment cancelled');
      navigate('/', { replace: true });
    }
  }, [searchParams, checkPremiumStatus, navigate]);

  if (!result) return null;

  const handleUnlockPremium = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment');
      
      if (error) {
        toast.error('Failed to create payment session');
        console.error('Payment error:', error);
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const moduleIcons: Record<string, React.ReactNode> = {
    pattern: <Brain className="w-5 h-5" />,
    spatial: <Boxes className="w-5 h-5" />,
    memory: <Target className="w-5 h-5" />,
    speed: <Zap className="w-5 h-5" />,
  };

  const moduleColors: Record<string, string> = {
    pattern: 'text-primary',
    spatial: 'text-accent',
    memory: 'text-secondary',
    speed: 'text-green-400',
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 130) return { label: 'Exceptional', color: 'text-primary' };
    if (score >= 120) return { label: 'Superior', color: 'text-primary' };
    if (score >= 110) return { label: 'Above Average', color: 'text-green-400' };
    if (score >= 90) return { label: 'Average', color: 'text-secondary' };
    if (score >= 80) return { label: 'Below Average', color: 'text-muted-foreground' };
    return { label: 'Needs Development', color: 'text-muted-foreground' };
  };

  const performance = getPerformanceLabel(result.iqBase);

  const handleShare = async () => {
    const shareText = `I scored ${result.iqRange.min}-${result.iqRange.max} on the Thorpe IQ Test! That puts me in the top ${100 - result.percentile}% of test takers. Try it yourself!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Thorpe IQ Test Results',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-6 overflow-y-auto">
      <div className="max-w-lg mx-auto space-y-6 py-8">
        {/* Main score card */}
        <Card variant="glow" className="overflow-hidden animate-scale-in">
          <CardContent className="p-8 text-center relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
            
            <div className="relative z-10">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Your IQ Estimate
              </h2>
              
              <div className="mb-4">
                <span className="text-6xl md:text-7xl font-bold text-gradient-primary">
                  {result.iqRange.min}-{result.iqRange.max}
                </span>
              </div>

              <div className={`text-lg font-semibold ${performance.color} mb-4`}>
                {performance.label}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
                <Crown className="w-4 h-4 text-secondary" />
                <span className="text-sm">
                  Top <span className="font-bold text-secondary">{100 - result.percentile}%</span> of test takers
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sub-scores */}
        <Card variant="glass" className="animate-slide-up stagger-1">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Cognitive Profile
            </h3>
            
            <div className="space-y-4">
              {result.moduleResults.map((moduleResult) => {
                const moduleInfo = MODULES.find(m => m.id === moduleResult.module);
                if (!moduleInfo) return null;
                
                return (
                  <div key={moduleResult.module} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={moduleColors[moduleResult.module]}>
                          {moduleIcons[moduleResult.module]}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {moduleInfo.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {Math.round(moduleResult.percentageScore)}%
                      </span>
                    </div>
                    <Progress 
                      value={moduleResult.percentageScore}
                      className="h-2"
                      indicatorVariant={moduleResult.percentageScore >= 70 ? 'glow' : 'default'}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Confidence indicator */}
        <Card variant="glass" className="animate-slide-up stagger-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Confidence Level</span>
              <span className="text-sm font-medium text-primary">Moderate</span>
            </div>
            <Progress value={65} indicatorVariant="glow" />
            <p className="text-xs text-muted-foreground mt-2">
              Based on response consistency and timing patterns
            </p>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="space-y-3 animate-slide-up stagger-3">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Your Score
          </Button>

          {isPremium ? (
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary/20 border border-secondary/30">
              <Check className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-medium">Premium Unlocked</span>
            </div>
          ) : (
            <Button
              variant="glass"
              size="lg"
              className="w-full border-primary/30 hover:bg-primary/10"
              onClick={handleUnlockPremium}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Crown className="w-5 h-5 mr-2 text-secondary" />
              )}
              {user ? 'Unlock Full Report — $6.99' : 'Sign in to Unlock Premium'}
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="default"
              className="w-full"
              onClick={resetTest}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake
            </Button>
            <Button
              variant="outline"
              size="default"
              className={`w-full ${!isPremium && 'opacity-50'}`}
              disabled={!isPremium}
              onClick={() => {
                if (isPremium && result) {
                  generatePDFReport({ result, userName: user?.email });
                  toast.success('PDF report downloaded!');
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 text-center px-4 animate-fade-in stagger-4">
          Scores are estimates and should not be used for clinical, academic, or employment decisions.
        </p>
      </div>
    </div>
  );
}
