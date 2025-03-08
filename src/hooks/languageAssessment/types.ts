
// Define all types used in the language assessment functionality
export interface Question {
  id: string;
  text: string; // This is used as 'question' in the UI
  question?: string; // Alias for text to maintain backward compatibility
  options: string[] | Array<{id: string; text: string}>; // Support both simple strings and objects with id/text
  correctAnswer: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  level?: string; // Alias for difficulty to maintain backward compatibility
  topic?: string;
  image?: string; // Add support for question images
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
