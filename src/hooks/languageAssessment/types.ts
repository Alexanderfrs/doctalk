
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
  image?: string; // Support for question images
  healthcareContext?: string; // Added for healthcare-specific context
  specialization?: 'nursing' | 'diagnosis' | 'emergency' | 'general'; // For categorizing healthcare terms
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
  strengths?: string[]; // Added to highlight user's strong areas
  recommendedContent?: string[]; // Added to suggest next learning modules
  certificationEligible?: boolean; // Added for certification program
}

export type QuestionBank = Record<string, Question[]>;

export interface TopicWeight {
  [key: string]: number;
}

export interface HealthcareVocabularyCategory {
  id: string;
  name: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  terms: Array<{term: string, definition: string}>;
}
