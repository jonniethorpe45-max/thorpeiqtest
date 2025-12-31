// Question types for the IQ test
export interface Question {
  id: string;
  module: ModuleType;
  questionText: string;
  optionalImage?: string;
  answerChoices: string[];
  correctAnswer: number; // Index of correct answer
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimitSeconds: number;
}

export type ModuleType = 'pattern' | 'spatial' | 'memory' | 'speed';

export interface ModuleInfo {
  id: ModuleType;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
  weight: number;
}

export interface QuestionResponse {
  questionId: string;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ModuleResult {
  module: ModuleType;
  responses: QuestionResponse[];
  score: number;
  maxPossible: number;
  percentageScore: number;
}

export interface TestResult {
  moduleResults: ModuleResult[];
  overallScore: number;
  iqBase: number;
  iqRange: { min: number; max: number };
  percentile: number;
  completedAt: Date;
}

// Difficulty weights as specified
export const DIFFICULTY_WEIGHTS = {
  easy: 1.0,
  medium: 1.4,
  hard: 1.8,
} as const;

// Module weights for overall score
export const MODULE_WEIGHTS: Record<ModuleType, number> = {
  pattern: 0.30, // Logic/Pattern: 30%
  spatial: 0.25, // Spatial: 25%
  memory: 0.25,  // Memory: 25%
  speed: 0.20,   // Speed: 20%
};

// Module information
export const MODULES: ModuleInfo[] = [
  {
    id: 'pattern',
    name: 'Pattern Reasoning',
    description: 'Identify patterns and logical sequences',
    icon: '🧩',
    questionCount: 6,
    weight: 0.30,
  },
  {
    id: 'spatial',
    name: 'Spatial Logic',
    description: 'Visualize and manipulate objects in space',
    icon: '🔷',
    questionCount: 6,
    weight: 0.25,
  },
  {
    id: 'memory',
    name: 'Working Memory',
    description: 'Remember and process information',
    icon: '🧠',
    questionCount: 6,
    weight: 0.25,
  },
  {
    id: 'speed',
    name: 'Processing Speed',
    description: 'Quick thinking and rapid responses',
    icon: '⚡',
    questionCount: 6,
    weight: 0.20,
  },
];

// Calculate speed factor based on time used
export function calculateSpeedFactor(timeSpent: number, timeLimit: number): number {
  const percentUsed = (timeSpent / timeLimit) * 100;
  
  if (percentUsed <= 70) return 1.0;
  if (percentUsed <= 90) return 0.85;
  return 0.7;
}

// Calculate question score
export function calculateQuestionScore(
  isCorrect: boolean,
  difficulty: 'easy' | 'medium' | 'hard',
  timeSpent: number,
  timeLimit: number
): number {
  if (!isCorrect) return 0;
  
  const accuracy = 1;
  const difficultyWeight = DIFFICULTY_WEIGHTS[difficulty];
  const speedFactor = calculateSpeedFactor(timeSpent, timeLimit);
  
  return accuracy * difficultyWeight * speedFactor;
}

// Calculate module score (0-100)
export function calculateModuleScore(responses: QuestionResponse[], questions: Question[]): number {
  let userTotal = 0;
  let maxPossible = 0;
  
  responses.forEach((response, index) => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;
    
    const questionScore = calculateQuestionScore(
      response.isCorrect,
      response.difficulty,
      response.timeSpent,
      question.timeLimitSeconds
    );
    
    userTotal += questionScore;
    
    // Max possible is if answered correctly at fastest speed
    maxPossible += DIFFICULTY_WEIGHTS[response.difficulty] * 1.0;
  });
  
  if (maxPossible === 0) return 0;
  return (userTotal / maxPossible) * 100;
}

// Calculate overall score from module scores
export function calculateOverallScore(moduleResults: ModuleResult[]): number {
  return moduleResults.reduce((total, result) => {
    const weight = MODULE_WEIGHTS[result.module];
    return total + (result.percentageScore * weight);
  }, 0);
}

// Convert overall score to IQ
export function calculateIQ(overallScore: number): { base: number; min: number; max: number } {
  const base = Math.round(70 + (overallScore * 0.7));
  return {
    base,
    min: base - 5,
    max: base + 5,
  };
}

// Percentile lookup table
const PERCENTILE_MAP: Record<number, number> = {
  70: 2,
  75: 5,
  80: 9,
  85: 16,
  90: 25,
  95: 37,
  100: 50,
  105: 63,
  110: 75,
  115: 84,
  120: 91,
  125: 95,
  130: 98,
  135: 99,
  140: 99.6,
};

// Calculate percentile with interpolation
export function calculatePercentile(iq: number): number {
  const iqKeys = Object.keys(PERCENTILE_MAP).map(Number).sort((a, b) => a - b);
  
  if (iq <= iqKeys[0]) return PERCENTILE_MAP[iqKeys[0]];
  if (iq >= iqKeys[iqKeys.length - 1]) return PERCENTILE_MAP[iqKeys[iqKeys.length - 1]];
  
  for (let i = 0; i < iqKeys.length - 1; i++) {
    const lowerIQ = iqKeys[i];
    const upperIQ = iqKeys[i + 1];
    
    if (iq >= lowerIQ && iq <= upperIQ) {
      const lowerPercentile = PERCENTILE_MAP[lowerIQ];
      const upperPercentile = PERCENTILE_MAP[upperIQ];
      
      // Linear interpolation
      const ratio = (iq - lowerIQ) / (upperIQ - lowerIQ);
      return Math.round(lowerPercentile + ratio * (upperPercentile - lowerPercentile));
    }
  }
  
  return 50;
}
