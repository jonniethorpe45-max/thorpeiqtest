import React from 'react';
import { TestProvider, useTest } from '@/context/TestContext';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { DisclaimerScreen } from '@/components/screens/DisclaimerScreen';
import { ModuleIntroScreen } from '@/components/screens/ModuleIntroScreen';
import { QuestionScreen } from '@/components/screens/QuestionScreen';
import { ModuleCompleteScreen } from '@/components/screens/ModuleCompleteScreen';
import { ResultsScreen } from '@/components/screens/ResultsScreen';

function TestContent() {
  const { phase } = useTest();

  switch (phase) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'disclaimer':
      return <DisclaimerScreen />;
    case 'module-intro':
      return <ModuleIntroScreen />;
    case 'question':
      return <QuestionScreen />;
    case 'module-complete':
      return <ModuleCompleteScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      return <WelcomeScreen />;
  }
}

const Index = () => {
  return (
    <TestProvider>
      <main className="min-h-screen bg-background">
        <TestContent />
      </main>
    </TestProvider>
  );
};

export default Index;
