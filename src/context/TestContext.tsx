import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  Question,
  ModuleType,
  QuestionResponse,
  ModuleResult,
  TestResult,
  MODULES,
  calculateModuleScore,
  calculateOverallScore,
  calculateIQ,
  calculatePercentile,
} from '@/types/questions';
import { getModuleQuestions, shuffleArray } from '@/data/questions';
import { trackEvent, trackPageView } from '@/lib/analytics';

export type TestPhase = 
  | 'welcome'
  | 'disclaimer'
  | 'module-intro'
  | 'question'
  | 'module-complete'
  | 'results';

interface TestState {
  phase: TestPhase;
  currentModuleIndex: number;
  currentQuestionIndex: number;
  questions: Question[];
  responses: QuestionResponse[];
  moduleResults: ModuleResult[];
  result: TestResult | null;
  isPremium: boolean;
}

interface TestContextType extends TestState {
  startTest: () => void;
  acceptDisclaimer: () => void;
  startModule: () => void;
  submitAnswer: (selectedAnswer: number | null, timeSpent: number) => void;
  nextModule: () => void;
  finishTest: () => void;
  resetTest: () => void;
  getCurrentQuestion: () => Question | null;
  getCurrentModule: () => typeof MODULES[number] | null;
  getModuleProgress: () => { current: number; total: number };
  getOverallProgress: () => { current: number; total: number };
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TestState>({
    phase: 'welcome',
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    questions: [],
    responses: [],
    moduleResults: [],
    result: null,
    isPremium: false,
  });

  const startTest = useCallback(() => {
    trackEvent('test_started');
    trackPageView('Disclaimer');
    setState(prev => ({ ...prev, phase: 'disclaimer' }));
  }, []);

  const acceptDisclaimer = useCallback(() => {
    trackEvent('disclaimer_accepted');
    trackPageView('Module Intro');
    setState(prev => ({ ...prev, phase: 'module-intro' }));
  }, []);

  const startModule = useCallback(() => {
    const currentModule = MODULES[state.currentModuleIndex];
    const moduleQuestions = getModuleQuestions(currentModule.id);
    const shuffledQuestions = shuffleArray(moduleQuestions);
    
    trackEvent('module_started', { 
      module_name: currentModule.name,
      module_index: state.currentModuleIndex + 1 
    });
    trackPageView(`Question - ${currentModule.name}`);
    
    setState(prev => ({
      ...prev,
      phase: 'question',
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      responses: [],
    }));
  }, [state.currentModuleIndex]);

  const submitAnswer = useCallback((selectedAnswer: number | null, timeSpent: number) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const response: QuestionResponse = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
      difficulty: currentQuestion.difficulty,
    };

    const newResponses = [...state.responses, response];
    const isLastQuestion = state.currentQuestionIndex >= state.questions.length - 1;

    if (isLastQuestion) {
      // Calculate module result
      const moduleScore = calculateModuleScore(newResponses, state.questions);
      const maxPossible = state.questions.reduce(
        (acc, q) => acc + ({ easy: 1.0, medium: 1.4, hard: 1.8 }[q.difficulty] || 1),
        0
      );
      
      const moduleResult: ModuleResult = {
        module: MODULES[state.currentModuleIndex].id,
        responses: newResponses,
        score: moduleScore,
        maxPossible,
        percentageScore: moduleScore,
      };

      setState(prev => ({
        ...prev,
        responses: newResponses,
        moduleResults: [...prev.moduleResults, moduleResult],
        phase: 'module-complete',
      }));
    } else {
      setState(prev => ({
        ...prev,
        responses: newResponses,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  }, [state.questions, state.currentQuestionIndex, state.responses, state.currentModuleIndex]);

  const nextModule = useCallback(() => {
    const isLastModule = state.currentModuleIndex >= MODULES.length - 1;
    
    if (isLastModule) {
      // Calculate final results
      const overallScore = calculateOverallScore(state.moduleResults);
      const iq = calculateIQ(overallScore);
      const percentile = calculatePercentile(iq.base);

      const result: TestResult = {
        moduleResults: state.moduleResults,
        overallScore,
        iqBase: iq.base,
        iqRange: { min: iq.min, max: iq.max },
        percentile,
        completedAt: new Date(),
      };

      trackEvent('test_completed', {
        iq_score: iq.base,
        percentile: percentile,
        overall_score: Math.round(overallScore)
      });
      trackPageView('Results');

      setState(prev => ({
        ...prev,
        result,
        phase: 'results',
      }));
    } else {
      trackEvent('module_completed', {
        module_name: MODULES[state.currentModuleIndex].name,
        module_index: state.currentModuleIndex + 1
      });
      trackPageView('Module Intro');
      
      setState(prev => ({
        ...prev,
        currentModuleIndex: prev.currentModuleIndex + 1,
        currentQuestionIndex: 0,
        questions: [],
        responses: [],
        phase: 'module-intro',
      }));
    }
  }, [state.currentModuleIndex, state.moduleResults]);

  const finishTest = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'results' }));
  }, []);

  const resetTest = useCallback(() => {
    trackEvent('test_reset');
    trackPageView('Welcome');
    setState({
      phase: 'welcome',
      currentModuleIndex: 0,
      currentQuestionIndex: 0,
      questions: [],
      responses: [],
      moduleResults: [],
      result: null,
      isPremium: false,
    });
  }, []);

  const getCurrentQuestion = useCallback(() => {
    return state.questions[state.currentQuestionIndex] || null;
  }, [state.questions, state.currentQuestionIndex]);

  const getCurrentModule = useCallback(() => {
    return MODULES[state.currentModuleIndex] || null;
  }, [state.currentModuleIndex]);

  const getModuleProgress = useCallback(() => ({
    current: state.currentQuestionIndex + 1,
    total: state.questions.length || MODULES[state.currentModuleIndex]?.questionCount || 0,
  }), [state.currentQuestionIndex, state.questions.length, state.currentModuleIndex]);

  const getOverallProgress = useCallback(() => {
    const completedQuestions = state.moduleResults.reduce(
      (acc, mr) => acc + mr.responses.length,
      0
    ) + state.currentQuestionIndex;
    const totalQuestions = MODULES.reduce((acc, m) => acc + m.questionCount, 0);
    return { current: completedQuestions, total: totalQuestions };
  }, [state.moduleResults, state.currentQuestionIndex]);

  return (
    <TestContext.Provider
      value={{
        ...state,
        startTest,
        acceptDisclaimer,
        startModule,
        submitAnswer,
        nextModule,
        finishTest,
        resetTest,
        getCurrentQuestion,
        getCurrentModule,
        getModuleProgress,
        getOverallProgress,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
