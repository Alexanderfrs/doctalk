
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { CheckCircle, XCircle, Volume2, Mic, Send } from "lucide-react";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import { useIsMobile } from "@/hooks/use-mobile";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";

interface EnhancedVocabularyPracticeCardProps {
  word: DeduplicatedVocabularyWord;
  onComplete: (correct: boolean) => void;
  autoAdvanceDelay?: number;
}

const EnhancedVocabularyPracticeCard: React.FC<EnhancedVocabularyPracticeCardProps> = ({
  word,
  onComplete,
  autoAdvanceDelay = 3000
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const { recordVocabularyPractice } = useVocabularyProgress();
  const { speak, hasSpeechSupport } = useTextToSpeech();
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const completedRef = useRef(false);

  const {
    text: voiceText,
    isListening,
    startListening,
    stopListening,
    resetText,
    hasRecognitionSupport
  } = useVoiceRecognition({
    language: 'en-US',
    onResult: (result, isFinal) => {
      if (isFinal && !isAnswered) {
        setUserAnswer(result.trim());
        setShowSubmit(true);
      }
    }
  });

  // Reset component state when word changes
  useEffect(() => {
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowSubmit(false);
    completedRef.current = false;
    resetText();
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [word.id, resetText]);

  useEffect(() => {
    if (voiceText && !isAnswered) {
      setUserAnswer(voiceText);
      setShowSubmit(true);
    }
  }, [voiceText, isAnswered]);

  useEffect(() => {
    if (userAnswer.trim().length > 0 && !isAnswered) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [userAnswer, isAnswered]);

  const normalizeText = (text: string) => {
    return text.toLowerCase().trim().replace(/[^a-z\s]/g, '');
  };

  const checkAnswer = (answer: string) => {
    const normalizedAnswer = normalizeText(answer);
    const normalizedCorrect = normalizeText(word.english);
    
    // Exact match or close match (allowing for minor variations)
    const isExactMatch = normalizedAnswer === normalizedCorrect;
    const isCloseMatch = normalizedAnswer.includes(normalizedCorrect) || 
                        normalizedCorrect.includes(normalizedAnswer);
    
    return isExactMatch || (isCloseMatch && Math.abs(normalizedAnswer.length - normalizedCorrect.length) <= 2);
  };

  const handleComplete = useCallback((correct: boolean) => {
    if (completedRef.current) return;
    
    completedRef.current = true;
    onComplete(correct);
  }, [onComplete]);

  const handleSubmitAnswer = () => {
    if (isAnswered || userAnswer.trim().length === 0 || completedRef.current) return;

    const correct = checkAnswer(userAnswer);
    setIsAnswered(true);
    setIsCorrect(correct);
    setShowSubmit(false);
    
    // Record the practice session
    recordVocabularyPractice(word.id, word.categories[0], correct);
    
    // Set timeout for auto-advance
    timeoutRef.current = setTimeout(() => {
      handleComplete(correct);
    }, autoAdvanceDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showSubmit && !isAnswered) {
      handleSubmitAnswer();
    }
  };

  const handleSpeak = () => {
    if (hasSpeechSupport) {
      speak(word.german);
    }
  };

  const handleVoiceInput = async () => {
    if (!hasRecognitionSupport) return;

    if (isListening) {
      stopListening();
    } else {
      resetText();
      setUserAnswer('');
      await startListening();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vokabel-Übung</CardTitle>
          <div className="flex flex-wrap gap-1">
            {word.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Question */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-2xl font-bold text-medical-800">
              {word.german}
            </h3>
            {hasSpeechSupport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSpeak}
                className="text-medical-600 touch-target"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {word.pronunciation && (
            <p className="text-sm text-gray-500 mb-2">
              [{word.pronunciation}]
            </p>
          )}
          <p className="text-gray-600">Was bedeutet das auf Englisch?</p>
        </div>

        {/* Answer Input */}
        <div className="space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ihre Antwort..."
              className={`w-full p-3 border rounded-lg focus:outline-none transition-colors pr-20 ${
                isAnswered 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-medical-500'
              }`}
              disabled={isAnswered}
            />
            
            {/* Voice Input Button */}
            {hasRecognitionSupport && !isAnswered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`absolute right-12 top-1/2 transform -translate-y-1/2 touch-target ${
                  isListening ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                <Mic className="h-4 w-4" />
              </Button>
            )}
            
            {/* Submit Button or Status Icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isAnswered ? (
                isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )
              ) : showSubmit ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSubmitAnswer}
                  className="p-1 touch-target"
                >
                  <Send className="h-4 w-4 text-medical-600" />
                </Button>
              ) : null}
            </div>
          </div>

          {/* Mobile Submit Button */}
          {isMobile && showSubmit && !isAnswered && (
            <Button
              onClick={handleSubmitAnswer}
              className="w-full bg-medical-500 hover:bg-medical-600 touch-target"
            >
              Antwort prüfen
            </Button>
          )}

          {/* Voice Recognition Status */}
          {isListening && (
            <div className="text-center text-sm text-medical-600">
              🎤 Hört zu... (Sprechen Sie Ihre Antwort)
            </div>
          )}

          {/* Feedback */}
          {isAnswered && (
            <div className={`p-3 rounded-lg text-center ${
              isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium mb-1">
                {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
              </p>
              <p className="text-sm">
                Korrekte Antwort: <strong>{word.english}</strong>
              </p>
              {word.example && (
                <p className="text-xs mt-2 italic">
                  Beispiel: {word.example}
                </p>
              )}
              <p className="text-xs mt-2 text-gray-600">
                Weiter zur nächsten Vokabel...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedVocabularyPracticeCard;
