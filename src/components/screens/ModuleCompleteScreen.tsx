import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTest } from '@/context/TestContext';
import { MODULES } from '@/types/questions';
import { ArrowRight, CheckCircle, Target } from 'lucide-react';

export function ModuleCompleteScreen() {
  const { 
    nextModule, 
    getCurrentModule, 
    currentModuleIndex,
    moduleResults,
  } = useTest();
  
  const currentModule = getCurrentModule();
  const latestResult = moduleResults[moduleResults.length - 1];
  const isLastModule = currentModuleIndex >= MODULES.length - 1;

  if (!currentModule || !latestResult) return null;

  const correctAnswers = latestResult.responses.filter(r => r.isCorrect).length;
  const totalQuestions = latestResult.responses.length;
  const accuracy = (correctAnswers / totalQuestions) * 100;

  const moduleEmojis: Record<string, string> = {
    pattern: '🧩',
    spatial: '🔷',
    memory: '🧠',
    speed: '⚡',
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6 animate-scale-in">
        {/* Success indicator */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Module Complete!
          </h2>
          <p className="text-muted-foreground">
            {currentModule.name}
          </p>
        </div>

        {/* Quick stats */}
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl">{moduleEmojis[currentModule.id]}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {correctAnswers}/{totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(accuracy)}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            {/* Module score bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Module Score</span>
                <span className="text-primary font-medium">
                  {Math.round(latestResult.percentageScore)}%
                </span>
              </div>
              <Progress 
                value={latestResult.percentageScore} 
                indicatorVariant="glow"
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="flex gap-2 justify-center">
          {MODULES.map((module, index) => (
            <div
              key={module.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentModuleIndex
                  ? 'bg-primary shadow-lg shadow-primary/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Continue button */}
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={nextModule}
        >
          {isLastModule ? (
            <>
              View Results
              <Target className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Next Module
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>

        {!isLastModule && (
          <p className="text-center text-sm text-muted-foreground">
            {MODULES.length - currentModuleIndex - 1} modules remaining
          </p>
        )}
      </div>
    </div>
  );
}
