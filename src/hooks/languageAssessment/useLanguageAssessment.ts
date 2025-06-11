
import { useState, useEffect, useMemo, useCallback } from 'react';
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
  const MIN_QUESTIONS = 8;
  const MAX_QUESTIONS = 12;
  const CONFIDENCE_THRESHOLD = 0.7;
  const DEFAULT_TIME_LIMIT_MINUTES = 10;

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string>('A1');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(false);
  const [isTimedTest, setIsTimedTest] = useState<boolean>(false);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(DEFAULT_TIME_LIMIT_MINUTES);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [showAnswerExplanations, setShowAnswerExplanations] = useState<boolean>(true);

  // Initialize questions when assessment starts
  useEffect(() => {
    if (assessmentStarted && allQuestions.length === 0) {
      console.log("Initializing assessment questions...");
      setIsLoading(true);
      
      // Start with a balanced mix of B1-B2 questions for proper assessment
      const initialQuestions = selectAdaptiveQuestions('B1', [], MAX_QUESTIONS);
      console.log("Selected questions:", initialQuestions.length);
      
      if (initialQuestions.length >= MIN_QUESTIONS) {
        setAllQuestions(initialQuestions);
        setCurrentLevel('B1');
      } else {
        // Fallback to ensure we have enough questions
        const allAvailableQuestions = Object.values(questionBank).flat();
        const fallbackQuestions = allAvailableQuestions.slice(0, MAX_QUESTIONS);
        setAllQuestions(fallbackQuestions);
        console.log("Using fallback questions:", fallbackQuestions.length);
      }
      
      setIsLoading(false);
    }
  }, [assessmentStarted]);

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
      }, 1000);
      
      return () => clearInterval(timerId);
    }
  }, [startTime, isComplete, isTimedTest, timeLimitMinutes]);

  const currentQuestion = useMemo(() => {
    if (allQuestions.length === 0 || currentQuestionIndex >= allQuestions.length) {
      return null;
    }
    
    const question = allQuestions[currentQuestionIndex];
    
    // Ensure question has proper structure
    if (question && !question.question && question.text) {
      question.question = question.text;
    }
    
    if (question && !question.level && question.difficulty) {
      question.level = question.difficulty;
    }
    
    return question;
  }, [allQuestions, currentQuestionIndex]);

  const progress = useMemo(() => {
    if (isComplete) return 100;
    if (userAnswers.length === 0) return 0;
    const estimatedTotal = Math.max(MIN_QUESTIONS, Math.min(userAnswers.length + 3, MAX_QUESTIONS));
    return Math.min(100, Math.round((userAnswers.length / estimatedTotal) * 100));
  }, [userAnswers.length, isComplete]);

  const timeRemaining = useMemo(() => {
    if (!isTimedTest || !startTime) return timeLimitMinutes * 60;
    const remainingSeconds = Math.max(0, timeLimitMinutes * 60 - timeElapsed * 60);
    return Math.floor(remainingSeconds);
  }, [isTimedTest, startTime, timeLimitMinutes, timeElapsed]);

  const startAssessment = useCallback(() => {
    console.log("Starting assessment...");
    setAssessmentStarted(true);
    setUserAnswers([]);
    setAllQuestions([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setIsLoading(true);
  }, []);

  const handleSelectAnswer = useCallback((answer: string) => {
    if (!currentQuestion || isComplete) {
      console.log("Cannot select answer: no current question or assessment complete");
      return;
    }
    
    console.log("Selected answer:", answer, "for question:", currentQuestion.id);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect
    };
    
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);
    
    // Check if we should end the assessment
    if (shouldEndAssessment(updatedAnswers, MAX_QUESTIONS, MIN_QUESTIONS, CONFIDENCE_THRESHOLD) ||
        currentQuestionIndex >= allQuestions.length - 1) {
      setTimeout(() => completeAssessment(updatedAnswers), 500);
    } else {
      setTimeout(() => goToNextQuestion(), 500);
    }
  }, [currentQuestion, isComplete, userAnswers, currentQuestionIndex, allQuestions.length]);

  const handleAnswer = useCallback((questionId: string, answerId: string) => {
    handleSelectAnswer(answerId);
  }, [handleSelectAnswer]);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => prev + 1);
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentQuestion && !userAnswers.some(a => a.questionId === currentQuestion.id)) {
      toast.warning("Bitte wählen Sie eine Antwort aus");
      return;
    }
    
    if (currentQuestionIndex >= allQuestions.length - 1) {
      completeAssessment();
    } else {
      goToNextQuestion();
    }
  }, [currentQuestion, userAnswers, currentQuestionIndex, allQuestions.length]);

  const completeAssessment = useCallback((answers = userAnswers) => {
    console.log("Completing assessment with", answers.length, "answers");
    const assessmentResult = calculateAssessmentResults(answers, allQuestions);
    setResult(assessmentResult);
    setIsComplete(true);
    
    if (isTimedTest) {
      toast.success(`Deutschtest abgeschlossen: Niveau ${assessmentResult.level}, Zeit: ${Math.floor(timeElapsed)} Minuten`);
    } else {
      toast.success(`Deutschtest abgeschlossen: Niveau ${assessmentResult.level}`);
    }
  }, [userAnswers, allQuestions, isTimedTest, timeElapsed]);

  const resetAssessment = useCallback(() => {
    setAssessmentStarted(false);
    setUserAnswers([]);
    setAllQuestions([]);
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResult(null);
    setStartTime(0);
    setTimeElapsed(0);
    setIsLoading(false);
  }, []);

  const toggleAnswerExplanations = useCallback(() => {
    setShowAnswerExplanations(prev => !prev);
  }, []);

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
    setTimedTest: setIsTimedTest, // Fixed: Use the correct state setter
    timeRemaining,
    timeElapsed,
    timeLimitMinutes,
    setTimeLimitMinutes,
    showAnswerExplanations,
    toggleAnswerExplanations
  };
}
