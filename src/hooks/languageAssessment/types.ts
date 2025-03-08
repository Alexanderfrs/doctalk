
// Define all types used in the language assessment functionality
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  topic?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface AssessmentResult {
  level: string;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  description: string;
}

export type QuestionBank = Record<string, Question[]>;

export interface TopicWeight {
  [key: string]: number;
}
