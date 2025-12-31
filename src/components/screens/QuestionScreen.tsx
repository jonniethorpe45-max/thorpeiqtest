import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTest } from '@/context/TestContext';
import { shuffleArray } from '@/data/questions';

export function QuestionScreen() {
  const { 
    getCurrentQuestion, 
    getCurrentModule,
    getModuleProgress,
    submitAnswer,
    currentQuestionIndex,
  } = useTest();
  
  const question = getCurrentQuestion();
  const module = getCurrentModule();
  const progress = getModuleProgress();
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(question?.timeLimitSeconds || 30);
  const [shuffledAnswers, setShuffledAnswers] = useState<{ text: string; originalIndex: number }[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Shuffle answers when question changes
  useEffect(() => {
    if (question) {
      const answersWithIndex = question.answerChoices.map((text, index) => ({
        text,
        originalIndex: index,
      }));
      setShuffledAnswers(shuffleArray(answersWithIndex));
      setSelectedAnswer(null);
      setTimeRemaining(question.timeLimitSeconds);
      setHasSubmitted(false);
    }
  }, [question?.id]);

  // Timer countdown
  useEffect(() => {
    if (hasSubmitted || !question) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleSubmit(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasSubmitted, question?.id]);

  const handleSubmit = useCallback((answer: number | null) => {
    if (hasSubmitted || !question) return;
    setHasSubmitted(true);
    
    const timeSpent = question.timeLimitSeconds - timeRemaining;
    
    // Small delay for visual feedback
    setTimeout(() => {
      submitAnswer(answer, timeSpent);
    }, 300);
  }, [hasSubmitted, question, timeRemaining, submitAnswer]);

  const handleAnswerClick = (shuffledIndex: number) => {
    if (hasSubmitted) return;
    
    const originalIndex = shuffledAnswers[shuffledIndex].originalIndex;
    setSelectedAnswer(shuffledIndex);
    handleSubmit(originalIndex);
  };

  if (!question || !module) return null;

  const timePercentage = (timeRemaining / question.timeLimitSeconds) * 100;
  const isTimeLow = timePercentage <= 30;
  const isTimeCritical = timePercentage <= 15;

  const moduleEmojis: Record<string, string> = {
    pattern: '🧩',
    spatial: '🔷',
    memory: '🧠',
    speed: '⚡',
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col p-4 md:p-6">
      {/* Header */}
      <div className="max-w-2xl w-full mx-auto mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{moduleEmojis[module.id]}</span>
            <span className="text-sm font-medium text-foreground">{module.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {progress.current} / {progress.total}
          </span>
        </div>
        
        {/* Progress bar */}
        <Progress 
          value={(progress.current / progress.total) * 100} 
          variant="slim" 
          indicatorVariant="glow" 
          className="mb-3"
        />
        
        {/* Timer */}
        <div className="relative">
          <Progress
            value={timePercentage}
            variant="timer"
            indicatorVariant={isTimeCritical ? 'timerDanger' : isTimeLow ? 'timerWarning' : 'timer'}
          />
          <div className="absolute right-0 -top-6 flex items-center gap-1">
            <span className={`text-sm font-mono font-bold ${
              isTimeCritical ? 'text-destructive animate-pulse' : 
              isTimeLow ? 'text-secondary' : 'text-muted-foreground'
            }`}>
              {timeRemaining}s
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-6 animate-fade-in">
          <Card variant="glass">
            <CardContent className="p-6 md:p-8">
              {/* Difficulty badge */}
              <div className="flex justify-between items-center mb-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  question.difficulty === 'medium' ? 'bg-secondary/20 text-secondary' :
                  'bg-destructive/20 text-destructive'
                }`}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
              </div>
              
              {/* Question text */}
              <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
                {question.questionText}
              </h2>
            </CardContent>
          </Card>

          {/* Answer choices */}
          <div className="grid gap-3">
            {shuffledAnswers.map((answer, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? 'answerSelected' : 'answer'}
                size="answer"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleAnswerClick(index)}
                disabled={hasSubmitted}
              >
                <span className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-sm font-bold text-muted-foreground mr-3 flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{answer.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
