import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTest } from '@/context/TestContext';
import { useLanguage } from '@/context/LanguageContext';
import { MODULES } from '@/types/questions';
import { ArrowRight, Clock } from 'lucide-react';

export function ModuleIntroScreen() {
  const { startModule, getCurrentModule, currentModuleIndex, getOverallProgress } = useTest();
  const { t } = useLanguage();
  const currentModule = getCurrentModule();
  const progress = getOverallProgress();

  if (!currentModule) return null;

  const moduleEmojis: Record<string, string> = {
    pattern: '🧩',
    spatial: '🔷',
    memory: '🧠',
    speed: '⚡',
  };

  const estimatedTime: Record<string, string> = {
    pattern: '3 min',
    spatial: '3 min',
    memory: '2 min',
    speed: '2 min',
  };

  const getModuleName = (id: string) => {
    const moduleNames: Record<string, string> = {
      pattern: t('modules.pattern'),
      spatial: t('modules.spatial'),
      memory: t('modules.memory'),
      speed: t('modules.speed'),
    };
    return moduleNames[id] || currentModule.name;
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col p-6">
      {/* Overall progress */}
      <div className="max-w-lg w-full mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{t('module.overallProgress')}</span>
          <span className="text-sm text-primary font-medium">
            {t('module.moduleOf').replace('{current}', String(currentModuleIndex + 1)).replace('{total}', String(MODULES.length))}
          </span>
        </div>
        <Progress 
          value={(currentModuleIndex / MODULES.length) * 100} 
          variant="glow" 
          indicatorVariant="glow" 
        />
      </div>

      {/* Module cards */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full space-y-6 animate-scale-in">
          {/* Current module highlight */}
          <Card variant="glow" className="overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 animate-float">
                {moduleEmojis[currentModule.id]}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {getModuleName(currentModule.id)}
              </h2>
              <p className="text-muted-foreground mb-6">
                {currentModule.description}
              </p>
              
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{estimatedTime[currentModule.id]}</span>
                </div>
                <div className="text-muted-foreground">
                  {t('module.questions').replace('{count}', String(currentModule.questionCount))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming modules preview */}
          <div className="flex gap-3 justify-center">
            {MODULES.map((module, index) => (
              <div
                key={module.id}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                  index < currentModuleIndex
                    ? 'bg-primary/20 border border-primary/30'
                    : index === currentModuleIndex
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-muted/50 border border-border/50'
                }`}
              >
                {moduleEmojis[module.id]}
              </div>
            ))}
          </div>

          {/* Start button */}
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={startModule}
          >
            {t('module.begin')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
