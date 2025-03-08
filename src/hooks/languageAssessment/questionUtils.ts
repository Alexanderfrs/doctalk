
import { Question, UserAnswer } from './types';
import { questionBank } from './questionBank';
import { getTopicDifficultyLevel, topicWeights } from './topicMapper';

// Helper to get the numerical value of a difficulty level
function getDifficultyValue(level: string): number {
  const levelMap: Record<string, number> = {
    'A1': 1,
    'A2': 2,
    'B1': 3,
    'B2': 4,
    'C1': 5,
    'C2': 6
  };
  return levelMap[level] || 3; // Default to B1 if not found
}

// Select questions with adaptive difficulty based on user performance
export function selectAdaptiveQuestions(
  currentLevel: string,
  answeredQuestions: UserAnswer[],
  numberOfQuestions: number
): Question[] {
  // Start with some questions from the current level
  let targetLevel = currentLevel;
  const result: Question[] = [];
  
  // If user has answered questions, adjust level based on performance
  if (answeredQuestions.length > 0) {
    const correctPercentage = answeredQuestions.filter(a => a.isCorrect).length / answeredQuestions.length;
    const currentLevelValue = getDifficultyValue(currentLevel);
    
    if (correctPercentage > 0.7 && currentLevelValue < 6) {
      // If doing well, increase difficulty
      const nextLevelValue = Math.min(currentLevelValue + 1, 6);
      targetLevel = Object.keys(questionBank)[nextLevelValue - 1];
    } else if (correctPercentage < 0.3 && currentLevelValue > 1) {
      // If struggling, decrease difficulty
      const prevLevelValue = Math.max(currentLevelValue - 1, 1);
      targetLevel = Object.keys(questionBank)[prevLevelValue - 1];
    }
  }
  
  // Get questions from target level and adjacent levels
  const targetLevelValue = getDifficultyValue(targetLevel);
  const availableLevels = Object.keys(questionBank)
    .filter(level => {
      const levelValue = getDifficultyValue(level);
      return Math.abs(levelValue - targetLevelValue) <= 1;
    });
  
  // Gather all relevant questions
  const allRelevantQuestions = availableLevels.flatMap(level => 
    questionBank[level].filter(q => 
      !answeredQuestions.some(a => a.questionId === q.id)
    )
  );
  
  // If we don't have enough questions, include other levels
  if (allRelevantQuestions.length < numberOfQuestions) {
    const otherQuestions = Object.values(questionBank)
      .flat()
      .filter(q => 
        !answeredQuestions.some(a => a.questionId === q.id) && 
        !allRelevantQuestions.some(rq => rq.id === q.id)
      );
    allRelevantQuestions.push(...otherQuestions);
  }
  
  // Shuffle and pick the requested number of questions
  const shuffled = allRelevantQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfQuestions);
}

// Calculate a weighted score based on question difficulty and topic
export function calculateWeightedScore(userAnswers: UserAnswer[], questions: Question[]): number {
  if (userAnswers.length === 0) return 0;
  
  let totalWeight = 0;
  let weightedCorrect = 0;
  
  for (const answer of userAnswers) {
    if (!answer.isCorrect) continue;
    
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) continue;
    
    const difficultyValue = getDifficultyValue(question.difficulty);
    const topicWeight = question.topic ? (topicWeights[question.topic] || 1) : 1;
    
    const weight = difficultyValue * topicWeight;
    totalWeight += weight;
    weightedCorrect += weight;
  }
  
  // Calculate total possible weight for all questions
  const totalPossibleWeight = userAnswers.reduce((sum, answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return sum;
    
    const difficultyValue = getDifficultyValue(question.difficulty);
    const topicWeight = question.topic ? (topicWeights[question.topic] || 1) : 1;
    
    return sum + (difficultyValue * topicWeight);
  }, 0);
  
  return totalPossibleWeight > 0 ? weightedCorrect / totalPossibleWeight : 0;
}

// Get an estimated difficulty level based on user performance
export function estimateDifficultyLevel(userAnswers: UserAnswer[], questions: Question[]): string {
  const weightedScore = calculateWeightedScore(userAnswers, questions);
  
  if (weightedScore >= 0.9) return 'C2';
  if (weightedScore >= 0.75) return 'C1';
  if (weightedScore >= 0.6) return 'B2';
  if (weightedScore >= 0.45) return 'B1';
  if (weightedScore >= 0.3) return 'A2';
  return 'A1';
}
