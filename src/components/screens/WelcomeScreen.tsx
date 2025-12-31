import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTest } from '@/context/TestContext';
import { useAuth } from '@/context/AuthContext';
import { Brain, Sparkles, Target, Zap, User, LogOut, Crown, TrendingUp, Flame } from 'lucide-react';

export function WelcomeScreen() {
  const { startTest } = useTest();
  const { user, isPremium, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Auth buttons */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {user ? (
          <>
            {isPremium && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/challenges')}
                  className="text-secondary hover:text-secondary/80"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Challenges
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/progress')}
                  className="text-primary hover:text-primary/80"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Progress
                </Button>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
                  <Crown className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-secondary font-medium">Premium</span>
                </div>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/auth')}
            className="border-border/50"
          >
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(var(--accent)/0.1)_0%,_transparent_40%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8 animate-scale-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl shadow-primary/30">
              <Brain className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl -z-10 animate-pulse-glow" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient-primary">Thorpe</span>
            <span className="text-foreground"> IQ Test</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover your cognitive potential
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 my-8 animate-slide-up stagger-2">
          <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">4 Modules</span>
          </Card>
          <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
            <Zap className="w-6 h-6 text-secondary" />
            <span className="text-sm text-muted-foreground">10-12 min</span>
          </Card>
          <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
            <Brain className="w-6 h-6 text-accent" />
            <span className="text-sm text-muted-foreground">Adaptive</span>
          </Card>
          <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Instant Results</span>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-4 animate-slide-up stagger-3">
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={startTest}
          >
            Start IQ Test
          </Button>
          <p className="text-xs text-muted-foreground">
            Free assessment • No registration required
          </p>
        </div>
      </div>
    </div>
  );
}
