export type DifficultyLevel = 'oson' | 'orta' | 'qiyin';

export interface TopicExample {
  title: string;
  problem: string;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface TopicPracticeItem {
  id: string;
  question: string;
  answer: string;
  hint: string;
}

export interface Topic {
  id: number;
  slug: string;
  title: string;
  category: 'Algebra' | 'Geometriya' | 'Sonlar va Kasrlar' | 'Statistika';
  difficulty: DifficultyLevel;
  iconName: string;
  summary: string;
  detailedExplanation: string;
  formulas: { name: string; formula: string; explanation?: string }[];
  examples: TopicExample[];
  practice: TopicPracticeItem[];
}

export interface PracticeProblem {
  id: string;
  topicId: number;
  category: string;
  difficulty: DifficultyLevel;
  question: string;
  inputPrefix?: string;
  inputPlaceholder?: string;
  correctAnswers: string[]; // variations e.g. ["6", "x=6", "x = 6"]
  hint: string;
  stepByStepSolution: string[];
}

export interface TestQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface AISolveResult {
  success: boolean;
  question: string;
  category: string;
  steps: string[];
  answer: string;
  tips?: string;
  error?: string;
}

export interface StudentProgress {
  solvedPracticeIds: string[];
  correctPracticeIds: string[];
  completedTopicIds: number[];
  testsTaken: number;
  bestTestScore: number;
  lastTestScore: number;
  todaySolved: number;
  todayCorrect: number;
  lastActiveDate: string;
}
