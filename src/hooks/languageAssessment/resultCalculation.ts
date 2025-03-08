
import { UserAnswer, Question, AssessmentResult } from './types';
import { estimateDifficultyLevel } from './questionUtils';

// Generate descriptions for each language level
const levelDescriptions: Record<string, string> = {
  'A1': 'You can understand and use familiar everyday expressions and very basic phrases. You can introduce yourself and others and can ask and answer questions about personal details such as where you live, people you know and things you have.',
  'A2': 'You can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment). You can describe in simple terms aspects of your background, immediate environment and matters in areas of immediate need.',
  'B1': 'You can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. You can deal with most situations likely to arise while traveling in an area where the language is spoken. You can produce simple connected text on topics that are familiar or of personal interest.',
  'B2': 'You can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field of specialization. You can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.',
  'C1': 'You can understand a wide range of demanding, longer texts, and recognize implicit meaning. You can express yourself fluently and spontaneously without much obvious searching for expressions. You can use language flexibly and effectively for social, academic and professional purposes.',
  'C2': 'You can understand with ease virtually everything heard or read. You can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. You can express yourself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations.'
};

// Calculate assessment results based on user answers
export function calculateAssessmentResults(
  userAnswers: UserAnswer[],
  questions: Question[]
): AssessmentResult {
  // Count correct answers
  const correctCount = userAnswers.filter(answer => answer.isCorrect).length;
  const totalQuestions = userAnswers.length;
  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  
  // Estimate level based on performance
  const level = estimateDifficultyLevel(userAnswers, questions);
  const description = levelDescriptions[level] || 'Assessment complete. Please review your results.';
  
  return {
    level,
    correctCount,
    totalQuestions,
    percentage,
    description
  };
}

// Determine if the assessment should continue or end
export function shouldEndAssessment(
  userAnswers: UserAnswer[],
  maxQuestions: number,
  minQuestions: number,
  confidenceThreshold: number
): boolean {
  // Always ask at least minimum number of questions
  if (userAnswers.length < minQuestions) {
    return false;
  }
  
  // Don't exceed maximum number of questions
  if (userAnswers.length >= maxQuestions) {
    return true;
  }
  
  // Check if we have enough data for a confident assessment
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const correctPercentage = userAnswers.length > 0 ? correctCount / userAnswers.length : 0;
  
  // If performance is very clear (very good or very poor), we can end earlier
  if (correctPercentage >= 0.85 || correctPercentage <= 0.15) {
    return userAnswers.length >= minQuestions;
  }
  
  // Continue until we reach max questions or have enough confidence
  const confidence = 1 - (2 * Math.abs(0.5 - correctPercentage));
  return confidence >= confidenceThreshold;
}
