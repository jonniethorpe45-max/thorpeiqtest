import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useTest } from '@/context/TestContext';
import { useLanguage } from '@/context/LanguageContext';
import { AlertTriangle, Check } from 'lucide-react';

export function DisclaimerScreen() {
  const { acceptDisclaimer } = useTest();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full animate-scale-in">
        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t('disclaimer.title')}
            </h2>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Thorpe IQ Test</strong> {t('disclaimer.intro')}{' '}
              <strong className="text-secondary">{t('disclaimer.purpose')}</strong>.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              {t('disclaimer.notMedical')}
            </p>

            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">{t('disclaimer.measuresTitle')}</h3>
              <ul className="space-y-2">
                {[
                  t('disclaimer.measure1'),
                  t('disclaimer.measure2'),
                  t('disclaimer.measure3'),
                  t('disclaimer.measure4')
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-muted-foreground/80 italic">
              {t('disclaimer.warning')}
            </p>
          </CardContent>

          <CardFooter className="flex-col gap-3 pt-2">
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={acceptDisclaimer}
            >
              {t('disclaimer.accept')}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {t('disclaimer.acknowledge')}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
