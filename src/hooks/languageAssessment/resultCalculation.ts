
import { UserAnswer, Question, AssessmentResult } from './types';
import { estimateDifficultyLevel } from './questionUtils';

// Enhanced level descriptions with medical German context
const levelDescriptions: Record<string, string> = {
  'A1': 'Grundlegendes Deutsch: Sie verstehen einfache, alltägliche Ausdrücke. Für medizinisches Deutsch empfehlen wir zunächst die Verbesserung Ihrer allgemeinen Deutschkenntnisse.',
  'A2': 'Grundlegendes Deutsch: Sie können einfache Sätze verstehen und bilden. Medizinisches Deutsch wird sehr herausfordernd sein. Wir empfehlen einen allgemeinen Deutschkurs.',
  'B1': 'Mittleres Deutsch: Sie können die Hauptpunkte klarer Standardsprache verstehen. Sie sind bereit für grundlegendes medizinisches Deutsch mit zusätzlicher Unterstützung.',
  'B2': 'Gutes Deutsch: Sie verstehen komplexere Texte und können sich fließend ausdrücken. Sie können effektiv medizinisches Deutsch lernen.',
  'C1': 'Fortgeschrittenes Deutsch: Sie verstehen anspruchsvolle Texte und drücken sich spontan aus. Medizinisches Deutsch wird gut erlernbar sein.',
  'C2': 'Muttersprachliches Niveau: Sie verstehen praktisch alles und können sich sehr fließend ausdrücken. Medizinisches Deutsch wird leicht erlernbar sein.'
};

// Calculate assessment results with improved accuracy
export function calculateAssessmentResults(
  userAnswers: UserAnswer[],
  questions: Question[]
): AssessmentResult {
  if (userAnswers.length === 0) {
    return {
      level: 'A1',
      correctCount: 0,
      totalQuestions: 0,
      percentage: 0,
      description: levelDescriptions['A1'],
      strengths: [],
      recommendedContent: ['Allgemeine Deutschkenntnisse verbessern'],
      certificationEligible: false
    };
  }

  const correctCount = userAnswers.filter(answer => answer.isCorrect).length;
  const totalQuestions = userAnswers.length;
  const percentage = (correctCount / totalQuestions) * 100;
  
  // More nuanced level estimation based on performance patterns
  const level = estimateLanguageLevelFromAnswers(userAnswers, questions, percentage);
  const description = levelDescriptions[level] || 'Assessment complete.';
  
  // Determine if user meets minimum B1 requirement
  const meetsMinimumRequirement = ['B1', 'B2', 'C1', 'C2'].includes(level);
  
  // Generate strengths and recommendations
  const strengths = identifyStrengths(userAnswers, questions);
  const recommendedContent = generateRecommendations(level, strengths);
  
  return {
    level,
    correctCount,
    totalQuestions,
    percentage,
    description,
    strengths,
    recommendedContent,
    certificationEligible: meetsMinimumRequirement
  };
}

// Enhanced level estimation with better accuracy
function estimateLanguageLevelFromAnswers(
  userAnswers: UserAnswer[],
  questions: Question[],
  percentage: number
): string {
  // Analyze performance by difficulty level
  const performanceByLevel: Record<string, { correct: number; total: number }> = {};
  
  userAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const level = question.difficulty;
      if (!performanceByLevel[level]) {
        performanceByLevel[level] = { correct: 0, total: 0 };
      }
      performanceByLevel[level].total++;
      if (answer.isCorrect) {
        performanceByLevel[level].correct++;
      }
    }
  });

  // Calculate performance percentages by level
  const levelPerformances = Object.entries(performanceByLevel).map(([level, stats]) => ({
    level,
    percentage: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    total: stats.total
  }));

  // Determine highest level where user performed reasonably well (>60%)
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let estimatedLevel = 'A1';

  for (const level of levels) {
    const performance = levelPerformances.find(p => p.level === level);
    if (performance && performance.percentage >= 60 && performance.total >= 2) {
      estimatedLevel = level;
    } else if (performance && performance.percentage < 40) {
      // Stop if performance drops significantly
      break;
    }
  }

  // Adjust based on overall percentage
  if (percentage >= 85) {
    const currentIndex = levels.indexOf(estimatedLevel);
    if (currentIndex < levels.length - 1) {
      estimatedLevel = levels[currentIndex + 1];
    }
  } else if (percentage < 50) {
    const currentIndex = levels.indexOf(estimatedLevel);
    if (currentIndex > 0) {
      estimatedLevel = levels[currentIndex - 1];
    }
  }

  return estimatedLevel;
}

// Identify user's strengths based on topic performance
function identifyStrengths(userAnswers: UserAnswer[], questions: Question[]): string[] {
  const topicPerformance: Record<string, { correct: number; total: number }> = {};
  
  userAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && question.topic) {
      if (!topicPerformance[question.topic]) {
        topicPerformance[question.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[question.topic].total++;
      if (answer.isCorrect) {
        topicPerformance[question.topic].correct++;
      }
    }
  });

  const strengths = Object.entries(topicPerformance)
    .filter(([_, stats]) => stats.total >= 2 && (stats.correct / stats.total) >= 0.75)
    .map(([topic]) => {
      // Convert topic keys to readable names
      const topicNames: Record<string, string> = {
        'personal_information': 'Persönliche Angaben',
        'grammar': 'Grammatik',
        'vocabulary': 'Wortschatz',
        'verbs': 'Verben',
        'articles': 'Artikel',
        'prepositions': 'Präpositionen',
        'communication': 'Kommunikation'
      };
      return topicNames[topic] || topic;
    });

  return strengths;
}

// Generate personalized recommendations based on level and performance
function generateRecommendations(level: string, strengths: string[]): string[] {
  const recommendations: string[] = [];

  if (level === 'A1' || level === 'A2') {
    recommendations.push(
      'Grundlagen der deutschen Grammatik',
      'Basiswortschatz erweitern',
      'Einfache Konversationen üben',
      'Deutsche Medien (einfache Texte, Kindersendungen) konsumieren'
    );
  } else if (level === 'B1') {
    recommendations.push(
      'Medizinische Grundbegriffe lernen',
      'Patientengespräche (einfach) üben',
      'Anatomie-Vokabular',
      'Höflichkeitsformen im medizinischen Kontext'
    );
  } else if (level === 'B2') {
    recommendations.push(
      'Komplexere medizinische Terminologie',
      'Notfallsituationen simulieren',
      'Patientenaufklärung üben',
      'Medizinische Dokumentation'
    );
  } else {
    recommendations.push(
      'Spezialisierte medizinische Fachsprache',
      'Komplexe Patientenfälle bearbeiten',
      'Kollegengespräche und Übergaben',
      'Medizinische Fortbildungen auf Deutsch'
    );
  }

  return recommendations;
}

// Determine if assessment should continue
export function shouldEndAssessment(
  userAnswers: UserAnswer[],
  maxQuestions: number,
  minQuestions: number,
  confidenceThreshold: number
): boolean {
  if (userAnswers.length < minQuestions) {
    return false;
  }
  
  if (userAnswers.length >= maxQuestions) {
    return true;
  }
  
  // More sophisticated ending logic
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const correctPercentage = correctCount / userAnswers.length;
  
  // If we have strong evidence of level (very good or very poor performance)
  if (userAnswers.length >= minQuestions) {
    if (correctPercentage >= 0.9 || correctPercentage <= 0.1) {
      return true;
    }
    
    // Check for consistent performance pattern
    const recentAnswers = userAnswers.slice(-3);
    const recentCorrect = recentAnswers.filter(a => a.isCorrect).length;
    const recentPercentage = recentCorrect / recentAnswers.length;
    
    if (Math.abs(correctPercentage - recentPercentage) < 0.1) {
      return true; // Consistent performance indicates stable level
    }
  }
  
  return false;
}
