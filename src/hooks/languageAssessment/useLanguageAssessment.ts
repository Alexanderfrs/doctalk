
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

  assessmentStarted: boolean;
  assessmentStep: number;
  currentLevel: string;
  startAssessment: () => void;
  handleAnswer: (questionId: string, answerId: string) => void;
  handleNextStep: () => void;
  completeAssessment: (answers?: UserAnswer[]) => void;
}

export function useLanguageAssessment(): LanguageAssessmentHook {
  const MIN_QUESTIONS = 5;
  const MAX_QUESTIONS = 15;
  const CONFIDENCE_THRESHOLD = 0.7;
  const TIME_LIMIT_MINUTES = 5;

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>('A1');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(false);

  useEffect(() => {
    initializeAssessment();
  }, []);

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

  const initializeAssessment = () => {
    setIsLoading(true);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(Date.now());
    setAssessmentStarted(false);
    
    const initialQuestions = selectAdaptiveQuestions('A1', [], MAX_QUESTIONS);
    setAllQuestions(initialQuestions);
    setCurrentLevel('A1');
    setIsLoading(false);
  };

  const currentQuestion = useMemo(() => {
    if (allQuestions.length === 0 || currentQuestionIndex >= allQuestions.length) {
      return null;
    }
    
    const question = allQuestions[currentQuestionIndex];
    
    if (question && !question.level && question.difficulty) {
      question.level = question.difficulty;
    }
    
    if (question && !question.question && question.text) {
      question.question = question.text;
    }
    
    return question;
  }, [allQuestions, currentQuestionIndex]);

  const progress = useMemo(() => {
    if (isComplete) return 100;
    if (userAnswers.length === 0) return 0;
    const estimatedTotal = Math.max(MIN_QUESTIONS, userAnswers.length);
    return Math.min(100, Math.round((userAnswers.length / estimatedTotal) * 100));
  }, [userAnswers.length, isComplete]);

  const startAssessment = () => {
    setAssessmentStarted(true);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(Date.now());
  };

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
    
    if (shouldEndAssessment(updatedAnswers, MAX_QUESTIONS, MIN_QUESTIONS, CONFIDENCE_THRESHOLD) ||
        currentQuestionIndex >= allQuestions.length - 1) {
      completeAssessment(updatedAnswers);
    } else {
      goToNextQuestion();
    }
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    if (!currentQuestion || isComplete) return;
    
    const isCorrect = answerId === currentQuestion.correctAnswer;
    const newAnswer: UserAnswer = {
      questionId,
      selectedAnswer: answerId,
      isCorrect
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleNextStep = () => {
    // Check if an answer has been selected for the current question
    if (currentQuestion && !userAnswers.some(a => a.questionId === currentQuestion.id)) {
      toast.warning("Bitte wählen Sie eine Antwort aus");
      return;
    }
    
    if (currentQuestionIndex >= allQuestions.length - 1) {
      completeAssessment();
    } else {
      goToNextQuestion();
    }
  };

  const completeAssessment = (answers = userAnswers) => {
    const assessmentResult = calculateAssessmentResults(answers, allQuestions);
    setResult(assessmentResult);
    setIsComplete(true);
    
    // Show completion notification
    toast.success(`Sprachtest abgeschlossen: Niveau ${assessmentResult.level}`);
  };

  const resetAssessment = () => {
    initializeAssessment();
  };

  const assessmentStep = currentQuestionIndex + 1;

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
    goToNextQuestion,
    assessmentStarted,
    assessmentStep,
    currentLevel,
    startAssessment,
    handleAnswer,
    handleNextStep,
    completeAssessment
  };
}
