import { Question } from '@/types/questions';

// Sample questions for each module
export const sampleQuestions: Question[] = [
  // Pattern Reasoning Questions
  {
    id: 'pattern-1',
    module: 'pattern',
    questionText: 'What number comes next in the sequence: 2, 4, 8, 16, ?',
    answerChoices: ['24', '32', '20', '28'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimitSeconds: 30,
  },
  {
    id: 'pattern-2',
    module: 'pattern',
    questionText: 'Complete the pattern: A1, B2, C3, D4, ?',
    answerChoices: ['E4', 'E5', 'F5', 'D5'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimitSeconds: 30,
  },
  {
    id: 'pattern-3',
    module: 'pattern',
    questionText: 'What comes next: 1, 1, 2, 3, 5, 8, ?',
    answerChoices: ['11', '12', '13', '10'],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimitSeconds: 45,
  },
  {
    id: 'pattern-4',
    module: 'pattern',
    questionText: 'Find the next term: 3, 6, 11, 18, 27, ?',
    answerChoices: ['36', '38', '35', '40'],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimitSeconds: 45,
  },
  {
    id: 'pattern-5',
    module: 'pattern',
    questionText: 'What number completes: 64, 32, 16, 8, 4, ?',
    answerChoices: ['0', '1', '2', '3'],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimitSeconds: 30,
  },
  {
    id: 'pattern-6',
    module: 'pattern',
    questionText: 'Complete: 2, 6, 12, 20, 30, ?',
    answerChoices: ['40', '42', '44', '46'],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimitSeconds: 60,
  },

  // Spatial Logic Questions
  {
    id: 'spatial-1',
    module: 'spatial',
    questionText: 'If you rotate the letter "N" 90° clockwise, what does it look like?',
    answerChoices: ['Z', 'И', 'N', 'Sideways Z'],
    correctAnswer: 0,
    difficulty: 'easy',
    timeLimitSeconds: 30,
  },
  {
    id: 'spatial-2',
    module: 'spatial',
    questionText: 'How many faces does a cube have?',
    answerChoices: ['4', '6', '8', '12'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimitSeconds: 20,
  },
  {
    id: 'spatial-3',
    module: 'spatial',
    questionText: 'If you fold a square piece of paper in half twice, how many layers are there?',
    answerChoices: ['2', '3', '4', '8'],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimitSeconds: 40,
  },
  {
    id: 'spatial-4',
    module: 'spatial',
    questionText: 'Which shape has the most sides: hexagon, octagon, or pentagon?',
    answerChoices: ['Hexagon', 'Octagon', 'Pentagon', 'They are equal'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimitSeconds: 25,
  },
  {
    id: 'spatial-5',
    module: 'spatial',
    questionText: 'A cube is painted red on all sides, then cut into 27 smaller cubes. How many small cubes have exactly 2 red faces?',
    answerChoices: ['6', '8', '12', '16'],
    correctAnswer: 2,
    difficulty: 'hard',
    timeLimitSeconds: 90,
  },
  {
    id: 'spatial-6',
    module: 'spatial',
    questionText: 'If a mirror is placed to the right of "AMBULANCE", how would it appear in the mirror?',
    answerChoices: ['ECNALUBMA', 'Reversed letters', 'Same as original', 'Upside down'],
    correctAnswer: 0,
    difficulty: 'medium',
    timeLimitSeconds: 45,
  },

  // Working Memory Questions
  {
    id: 'memory-1',
    module: 'memory',
    questionText: 'Remember this sequence: 7, 3, 9. Now, what is the sum of these numbers?',
    answerChoices: ['17', '18', '19', '20'],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimitSeconds: 20,
  },
  {
    id: 'memory-2',
    module: 'memory',
    questionText: 'If CAT = 3, DOG = 3, BIRD = 4, what does ELEPHANT equal?',
    answerChoices: ['7', '8', '9', '10'],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimitSeconds: 40,
  },
  {
    id: 'memory-3',
    module: 'memory',
    questionText: 'Given: Apple = 5, Banana = 7, Cherry = 6. What is Apple + Banana - Cherry?',
    answerChoices: ['4', '5', '6', '7'],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimitSeconds: 35,
  },
  {
    id: 'memory-4',
    module: 'memory',
    questionText: 'Remember: Red, Blue, Green, Yellow. Which color was mentioned second?',
    answerChoices: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimitSeconds: 15,
  },
  {
    id: 'memory-5',
    module: 'memory',
    questionText: 'If A=1, B=2, C=3... What is the sum of H + E + L + L + O?',
    answerChoices: ['50', '52', '54', '56'],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimitSeconds: 60,
  },
  {
    id: 'memory-6',
    module: 'memory',
    questionText: 'Remember: 15, 28, 42, 67. What is the second largest number?',
    answerChoices: ['15', '28', '42', '67'],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimitSeconds: 25,
  },

  // Processing Speed Questions
  {
    id: 'speed-1',
    module: 'speed',
    questionText: 'Quick: 5 + 3 = ?',
    answerChoices: ['6', '7', '8', '9'],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimitSeconds: 10,
  },
  {
    id: 'speed-2',
    module: 'speed',
    questionText: 'Quick: 12 - 7 = ?',
    answerChoices: ['4', '5', '6', '7'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimitSeconds: 10,
  },
  {
    id: 'speed-3',
    module: 'speed',
    questionText: 'Quick: 6 × 7 = ?',
    answerChoices: ['36', '42', '48', '49'],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimitSeconds: 12,
  },
  {
    id: 'speed-4',
    module: 'speed',
    questionText: 'Quick: 81 ÷ 9 = ?',
    answerChoices: ['7', '8', '9', '10'],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimitSeconds: 12,
  },
  {
    id: 'speed-5',
    module: 'speed',
    questionText: 'Quick: What is 15% of 100?',
    answerChoices: ['10', '15', '20', '25'],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimitSeconds: 15,
  },
  {
    id: 'speed-6',
    module: 'speed',
    questionText: 'Quick: 144 ÷ 12 = ?',
    answerChoices: ['10', '11', '12', '13'],
    correctAnswer: 2,
    difficulty: 'hard',
    timeLimitSeconds: 15,
  },
];

// Shuffle array utility
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get questions for a specific module
export function getModuleQuestions(module: string): Question[] {
  return sampleQuestions.filter(q => q.module === module);
}
