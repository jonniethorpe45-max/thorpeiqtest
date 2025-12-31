import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTest } from '@/context/TestContext';
import { useAuth } from '@/context/AuthContext';
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

export function WelcomeScreen() {
  const { startTest } = useTest();
  const { user, isPremium, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToTest = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(startTest, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Auth buttons */}
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
              <span className="text-gradient-primary">Thorpe</span>
              <span className="text-foreground"> IQ Test</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
              Take the most accurate online IQ test and discover your true cognitive potential in just 10 minutes
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 my-8 animate-slide-up stagger-2">
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground">4 Cognitive Modules</span>
            </Card>
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Clock className="w-6 h-6 text-secondary" />
              <span className="text-sm text-muted-foreground">10-12 Minutes</span>
            </Card>
            <Card variant="glass" className="p-4 flex flex-col items-center gap-2">
              <Brain className="w-6 h-6 text-accent" />
              <span className="text-sm text-muted-foreground">Adaptive Testing</span>
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
              className="w-full group"
              onClick={startTest}
            >
              Start Free IQ Test
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground">
              ✓ Free assessment • ✓ No registration required • ✓ Get results instantly
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 pt-4 text-muted-foreground animate-slide-up stagger-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span className="text-xs">500K+ Tests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-xs">4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Secure</span>
            </div>
          </div>
        </div>
      </header>

      {/* What is IQ Section */}
      <section className="py-20 px-6 bg-card/50" aria-labelledby="what-is-iq">
        <div className="max-w-4xl mx-auto">
          <h2 id="what-is-iq" className="text-3xl md:text-4xl font-bold text-center mb-6">
            What is an <span className="text-gradient-primary">IQ Test</span>?
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            An Intelligence Quotient (IQ) test measures cognitive abilities and intellectual potential. 
            The Thorpe IQ Test evaluates four key areas of mental ability to provide a comprehensive 
            assessment of your cognitive strengths.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pattern Recognition</h3>
                  <p className="text-muted-foreground text-sm">
                    Evaluate your ability to identify logical patterns and sequences in visual data.
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
                  <h3 className="font-semibold text-lg mb-2">Processing Speed</h3>
                  <p className="text-muted-foreground text-sm">
                    Measure how quickly and accurately you can process information under time pressure.
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
                  <h3 className="font-semibold text-lg mb-2">Spatial Reasoning</h3>
                  <p className="text-muted-foreground text-sm">
                    Assess your capacity to visualize and manipulate objects in three-dimensional space.
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
                  <h3 className="font-semibold text-lg mb-2">Working Memory</h3>
                  <p className="text-muted-foreground text-sm">
                    Test your ability to hold and manipulate information in short-term memory.
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
            How the Thorpe IQ Test Works
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            Complete four scientifically-designed modules and receive your personalized IQ score
          </p>
          
          <div className="space-y-6">
            {[
              { step: 1, title: "Start the Test", desc: "Begin with a brief introduction to understand the test format. No registration required." },
              { step: 2, title: "Complete 4 Modules", desc: "Answer questions across pattern recognition, processing speed, spatial reasoning, and memory." },
              { step: 3, title: "Adaptive Difficulty", desc: "Questions adjust based on your performance for accurate measurement across all skill levels." },
              { step: 4, title: "Get Your Results", desc: "Receive your IQ score with detailed breakdown of cognitive strengths and percentile ranking." },
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
            Why Take the Thorpe IQ Test?
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            Trusted by over 500,000 users worldwide for accurate cognitive assessment
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Scientifically Validated", desc: "Based on established psychometric principles and cognitive research" },
              { icon: Clock, title: "Quick & Convenient", desc: "Complete the entire test in just 10-12 minutes from any device" },
              { icon: Award, title: "Detailed Results", desc: "Get comprehensive breakdown with percentile rankings and module scores" },
              { icon: Zap, title: "Instant Feedback", desc: "Receive your IQ score immediately after completing the test" },
              { icon: Users, title: "Compare Globally", desc: "See how you rank against test-takers from around the world" },
              { icon: CheckCircle2, title: "100% Free", desc: "No hidden fees or registration required to take the full test" },
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
            Understanding IQ Scores
          </h2>
          <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-12">
            IQ scores follow a normal distribution with 100 as the average
          </p>
          
          <Card className="p-6 bg-gradient-card border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">IQ Range</th>
                  <th className="text-left py-3 px-4 font-semibold">Classification</th>
                  <th className="text-left py-3 px-4 font-semibold">Percentile</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">130+</td>
                  <td className="py-3 px-4 text-primary font-medium">Very Superior</td>
                  <td className="py-3 px-4">Top 2%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">120-129</td>
                  <td className="py-3 px-4 text-secondary font-medium">Superior</td>
                  <td className="py-3 px-4">Top 9%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">110-119</td>
                  <td className="py-3 px-4">High Average</td>
                  <td className="py-3 px-4">Top 25%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">90-109</td>
                  <td className="py-3 px-4">Average</td>
                  <td className="py-3 px-4">25th-75th</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">80-89</td>
                  <td className="py-3 px-4">Low Average</td>
                  <td className="py-3 px-4">Bottom 25%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Below 80</td>
                  <td className="py-3 px-4">Below Average</td>
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
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-12">
            Everything you need to know about the Thorpe IQ Test
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                How accurate is the Thorpe IQ Test?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The Thorpe IQ Test is designed using established psychometric principles and provides 
                a reliable estimate of cognitive ability. While no online test can replace a 
                professionally administered assessment, our test offers a scientifically-grounded 
                approximation of your IQ score.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                How long does the test take to complete?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The complete test takes approximately 10-12 minutes. It consists of four modules 
                covering pattern recognition, processing speed, spatial reasoning, and working memory. 
                Each module contains timed questions designed to assess your cognitive abilities efficiently.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                Is the Thorpe IQ Test really free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, the full IQ test is completely free with no registration required. You can take 
                the test and receive your IQ score instantly. We also offer an optional premium 
                upgrade for detailed analysis, progress tracking, and weekly cognitive challenges.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                Can I retake the test to improve my score?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can retake the test, but keep in mind that IQ tests measure your general cognitive 
                ability, which tends to be stable over time. Significant improvements from retaking 
                the same test may reflect practice effects rather than actual cognitive gains.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-background border border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                What does my IQ score mean?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                IQ scores are normalized with 100 as the average. About 68% of people score between 
                85 and 115. Scores above 130 are considered very superior (top 2%), while scores 
                between 110-119 represent high average intelligence (top 25%).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6" aria-labelledby="cta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="cta" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Discover Your IQ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join over 500,000 people who have taken the Thorpe IQ Test. 
            It only takes 10 minutes to unlock insights about your cognitive abilities.
          </p>
          <Button
            variant="hero"
            size="xl"
            className="group"
            onClick={scrollToTest}
          >
            Start Your Free IQ Test Now
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            No email required • Results in 10 minutes
          </p>
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
            The most trusted free online IQ test. Measure your cognitive abilities today.
          </p>
          <nav className="flex items-center justify-center gap-6 mb-4" aria-label="Legal links">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Thorpe IQ Test. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
