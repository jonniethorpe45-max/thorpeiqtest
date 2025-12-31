import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTest } from '@/context/TestContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Brain, Sparkles, Target, Zap, User, LogOut, Crown, TrendingUp, Flame,
  Clock, Shield, Award, ChevronRight, CheckCircle2, BarChart3, Users, Star
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function WelcomeScreen() {
  const { startTest } = useTest();
  const { user, isPremium, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Fetch user profile for display name and avatar
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setDisplayName(null);
        setAvatarUrl(null);
        return;
      }
      
      const { data } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data) {
        setDisplayName(data.display_name);
        setAvatarUrl(data.avatar_url);
      }
    };
    
    fetchProfile();
  }, [user]);

  const scrollToTest = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(startTest, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Language switcher - top left */}
        <div className="absolute top-4 left-4 z-20">
          <LanguageSwitcher />
        </div>

        {/* Auth buttons - top right */}
        <nav className="absolute top-4 right-4 z-20 flex items-center gap-2" aria-label="User navigation">
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
                    {t('nav.challenges')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/progress')}
                    className="text-primary hover:text-primary/80"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {t('nav.progress')}
                  </Button>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
                    <Crown className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-secondary font-medium">{t('nav.premium')}</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={avatarUrl || undefined} alt={displayName || 'User avatar'} />
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {(displayName || user.email?.split('@')[0] || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground font-medium">
                  {displayName || user.email?.split('@')[0]}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
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
              {t('nav.signIn')}
            </Button>
          )}
        </nav>

        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(var(--accent)/0.1)_0%,_transparent_40%)]" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-lg w-full text-center space-y-8">
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
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient-primary">{t('hero.title1')}</span>
              <span className="text-foreground"> {t('hero.title2')}</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 my-8 animate-slide-up stagger-2">
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">{t('features.modules')}</span>
            </Card>
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Clock className="w-6 h-6 text-secondary" />
              <span className="text-sm text-muted-foreground">{t('features.time')}</span>
            </Card>
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Brain className="w-6 h-6 text-accent" />
              <span className="text-sm text-muted-foreground">{t('features.adaptive')}</span>
            </Card>
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">{t('features.instant')}</span>
            </Card>
          </div>

          {/* CTA */}
          <div className="space-y-4 animate-slide-up stagger-3">
            <Button
              variant="hero"
              size="xl"
              className="w-full group"
              onClick={startTest}
            >
              {t('hero.cta')}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground">
              {t('hero.ctaSubtext')}
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 pt-4 text-muted-foreground animate-slide-up stagger-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span className="text-xs">{t('trust.tests')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-xs">{t('trust.rating')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span className="text-xs">{t('trust.secure')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* What is IQ Section */}
      <section className="py-20 px-6 bg-card/50" aria-labelledby="what-is-iq">
        <div className="max-w-4xl mx-auto">
          <h2 id="what-is-iq" className="text-3xl md:text-4xl font-bold text-center mb-6">
            {t('whatIsIQ.title')} <span className="text-gradient-primary">{t('whatIsIQ.titleHighlight')}</span>?
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            {t('whatIsIQ.description')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('whatIsIQ.pattern')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('whatIsIQ.patternDesc')}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('whatIsIQ.speed')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('whatIsIQ.speedDesc')}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('whatIsIQ.spatial')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('whatIsIQ.spatialDesc')}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('whatIsIQ.memory')}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t('whatIsIQ.memoryDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6" aria-labelledby="how-it-works">
        <div className="max-w-4xl mx-auto">
          <h2 id="how-it-works" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            {t('howItWorks.subtitle')}
          </p>
          
          <div className="space-y-6">
            {[
              { step: 1, title: t('howItWorks.step1.title'), desc: t('howItWorks.step1.desc') },
              { step: 2, title: t('howItWorks.step2.title'), desc: t('howItWorks.step2.desc') },
              { step: 3, title: t('howItWorks.step3.title'), desc: t('howItWorks.step3.desc') },
              { step: 4, title: t('howItWorks.step4.title'), desc: t('howItWorks.step4.desc') },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-card/50" aria-labelledby="benefits">
        <div className="max-w-4xl mx-auto">
          <h2 id="benefits" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            {t('benefits.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: t('benefits.validated'), desc: t('benefits.validatedDesc') },
              { icon: Clock, title: t('benefits.quick'), desc: t('benefits.quickDesc') },
              { icon: Award, title: t('benefits.detailed'), desc: t('benefits.detailedDesc') },
              { icon: Zap, title: t('benefits.instantFeedback'), desc: t('benefits.instantFeedbackDesc') },
              { icon: Users, title: t('benefits.global'), desc: t('benefits.globalDesc') },
              { icon: CheckCircle2, title: t('benefits.free'), desc: t('benefits.freeDesc') },
            ].map((item, i) => (
              <Card key={i} className="p-6 bg-background border-border/50 text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IQ Scale Section */}
      <section className="py-20 px-6" aria-labelledby="iq-scale">
        <div className="max-w-4xl mx-auto">
          <h2 id="iq-scale" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('iqScale.title')}
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            {t('iqScale.subtitle')}
          </p>
          
          <Card className="p-6 bg-gradient-card border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">{t('iqScale.range')}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t('iqScale.classification')}</th>
                  <th className="text-left py-3 px-4 font-semibold">{t('iqScale.percentile')}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">130+</td>
                  <td className="py-3 px-4 text-primary font-medium">{t('iqScale.verySuperior')}</td>
                  <td className="py-3 px-4">Top 2%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">120-129</td>
                  <td className="py-3 px-4 text-secondary font-medium">{t('iqScale.superior')}</td>
                  <td className="py-3 px-4">Top 9%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">110-119</td>
                  <td className="py-3 px-4">{t('iqScale.highAverage')}</td>
                  <td className="py-3 px-4">Top 25%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">90-109</td>
                  <td className="py-3 px-4">{t('iqScale.average')}</td>
                  <td className="py-3 px-4">25th-75th</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">80-89</td>
                  <td className="py-3 px-4">{t('iqScale.lowAverage')}</td>
                  <td className="py-3 px-4">Bottom 25%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Below 80</td>
                  <td className="py-3 px-4">{t('iqScale.belowAverage')}</td>
                  <td className="py-3 px-4">Bottom 9%</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-card/50" aria-labelledby="faq">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-12">
            {t('faq.subtitle') || 'Everything you need to know about the Thorpe IQ Test'}
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {t('faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t('faq.a3')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {t('faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t('faq.a1')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {t('faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t('faq.a2')}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {t('faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t('faq.a4')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6" aria-labelledby="cta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="cta" className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t('cta.subtitle')}
          </p>
          <Button
            variant="hero"
            size="xl"
            className="group"
            onClick={scrollToTest}
          >
            {t('hero.cta')}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold">Thorpe IQ Test</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            {t('footer.disclaimer')}
          </p>
          <nav className="flex items-center justify-center gap-6 mb-4" aria-label="Legal links">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.terms')}
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}
