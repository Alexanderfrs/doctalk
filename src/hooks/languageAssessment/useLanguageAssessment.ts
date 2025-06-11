
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
  
  // New properties for timed tests
  isTimedTest: boolean;
  setTimedTest: (isTimed: boolean) => void;
  timeRemaining: number;
  timeElapsed: number;
  timeLimitMinutes: number;
  setTimeLimitMinutes: (minutes: number) => void;
  showAnswerExplanations: boolean;
  toggleAnswerExplanations: () => void;
}

export function useLanguageAssessment(): LanguageAssessmentHook {
  // Updated for general German proficiency assessment
  const MIN_QUESTIONS = 8;
  const MAX_QUESTIONS = 10;
  const CONFIDENCE_THRESHOLD = 0.7;
  const DEFAULT_TIME_LIMIT_MINUTES = 10; // Increased for more thorough assessment

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>('A1');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(false);
  
  // New state for timed tests
  const [isTimedTest, setIsTimedTest] = useState<boolean>(false);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(DEFAULT_TIME_LIMIT_MINUTES);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [showAnswerExplanations, setShowAnswerExplanations] = useState<boolean>(true);

  // Timer effect
  useEffect(() => {
    if (startTime > 0 && !isComplete && isTimedTest) {
      const timerId = setInterval(() => {
        const elapsed = (Date.now() - startTime) / (1000 * 60);
        setTimeElapsed(elapsed);
        
        if (elapsed >= timeLimitMinutes) {
          completeAssessment();
          toast.info(`Zeitlimit von ${timeLimitMinutes} Minuten erreicht.`);
        }
      }, 1000); // Update every second for smoother countdown
      
      return () => clearInterval(timerId);
    }
  }, [startTime, isComplete, isTimedTest, timeLimitMinutes]);

  const initializeAssessment = () => {
    setIsLoading(true);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(Date.now());
    setAssessmentStarted(false);
    setTimeElapsed(0);
    
    // Start with adaptive questions for general German proficiency
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

  const timeRemaining = useMemo(() => {
    if (!isTimedTest || !startTime) return timeLimitMinutes * 60;
    const remainingSeconds = Math.max(0, timeLimitMinutes * 60 - timeElapsed * 60);
    return Math.floor(remainingSeconds);
  }, [isTimedTest, startTime, timeLimitMinutes, timeElapsed]);

  const startAssessment = () => {
    setAssessmentStarted(true);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  const setTimedTest = (isTimed: boolean) => {
    setIsTimedTest(isTimed);
  };

  const toggleAnswerExplanations = () => {
    setShowAnswerExplanations(prev => !prev);
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
    
    // Modified logic for 8-10 questions assessment
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
    
    // Show completion notification for general German proficiency
    if (isTimedTest) {
      toast.success(`Deutschtest abgeschlossen: Niveau ${assessmentResult.level}, Zeit: ${Math.floor(timeElapsed)} Minuten`);
    } else {
      toast.success(`Deutschtest abgeschlossen: Niveau ${assessmentResult.level}`);
    }
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
    completeAssessment,
    isTimedTest,
    setTimedTest,
    timeRemaining,
    timeElapsed,
    timeLimitMinutes,
    setTimeLimitMinutes,
    showAnswerExplanations,
    toggleAnswerExplanations
  };
}
