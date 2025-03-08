
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { Question, UserAnswer, AssessmentResult } from './types';
import { questionBank } from './questionBank';
import { selectAdaptiveQuestions } from './questionUtils';
import { calculateAssessmentResults, shouldEndAssessment } from './resultCalculation';

interface LanguageAssessmentHook {
  currentQuestion: Question | null;
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  totalQuestions: number;
  isLoading: boolean;
  isComplete: boolean;
  result: AssessmentResult | null;
  progress: number;
  handleSelectAnswer: (answer: string) => void;
  resetAssessment: () => void;
  goToNextQuestion: () => void;
}

export function useLanguageAssessment(): LanguageAssessmentHook {
  // Configuration
  const MIN_QUESTIONS = 5;
  const MAX_QUESTIONS = 15;
  const CONFIDENCE_THRESHOLD = 0.7;
  const TIME_LIMIT_MINUTES = 5;

  // State
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>('A1');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // Initialize assessment with first set of questions
  useEffect(() => {
    initializeAssessment();
  }, []);

  // Check time limit
  useEffect(() => {
    if (startTime > 0 && !isComplete) {
      const timerId = setInterval(() => {
        const elapsedMinutes = (Date.now() - startTime) / (1000 * 60);
        if (elapsedMinutes >= TIME_LIMIT_MINUTES) {
          completeAssessment();
          toast.info(`Time limit of ${TIME_LIMIT_MINUTES} minutes reached.`);
        }
      }, 10000); // Check every 10 seconds
      
      return () => clearInterval(timerId);
    }
  }, [startTime, isComplete]);

  // Initialize the assessment with first set of questions
  const initializeAssessment = () => {
    setIsLoading(true);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(Date.now());
    
    // Start with questions from A1 level
    const initialQuestions = selectAdaptiveQuestions('A1', [], MAX_QUESTIONS);
    setAllQuestions(initialQuestions);
    setCurrentLevel('A1');
    setIsLoading(false);
  };

  // Current question based on index
  const currentQuestion = useMemo(() => {
    if (allQuestions.length === 0 || currentQuestionIndex >= allQuestions.length) {
      return null;
    }
    return allQuestions[currentQuestionIndex];
  }, [allQuestions, currentQuestionIndex]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    if (isComplete) return 100;
    if (userAnswers.length === 0) return 0;
    // Progress is based on minimum questions or adaptive assessment
    const estimatedTotal = Math.max(MIN_QUESTIONS, userAnswers.length);
    return Math.min(100, Math.round((userAnswers.length / estimatedTotal) * 100));
  }, [userAnswers.length, isComplete]);

  // Handle user selecting an answer
  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion || isComplete) return;
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect
    };
    
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);
    
    // Check if we should end the assessment or continue to next question
    if (shouldEndAssessment(updatedAnswers, MAX_QUESTIONS, MIN_QUESTIONS, CONFIDENCE_THRESHOLD) ||
        currentQuestionIndex >= allQuestions.length - 1) {
      completeAssessment(updatedAnswers);
    } else {
      goToNextQuestion();
    }
  };

  // Move to next question
  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  // Complete the assessment and calculate results
  const completeAssessment = (answers = userAnswers) => {
    const assessmentResult = calculateAssessmentResults(answers, allQuestions);
    setResult(assessmentResult);
    setIsComplete(true);
  };

  // Reset the assessment
  const resetAssessment = () => {
    initializeAssessment();
  };

  return {
    currentQuestion,
    userAnswers,
    currentQuestionIndex,
    totalQuestions: allQuestions.length,
    isLoading,
    isComplete,
    result,
    progress,
    handleSelectAnswer,
    resetAssessment,
    goToNextQuestion
  };
}
