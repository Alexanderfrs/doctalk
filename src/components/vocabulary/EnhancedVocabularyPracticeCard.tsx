
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { CheckCircle, XCircle, Volume2 } from "lucide-react";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";

interface EnhancedVocabularyPracticeCardProps {
  word: DeduplicatedVocabularyWord & { difficulty?: string };
  onComplete: (correct: boolean) => void;
  autoAdvanceDelay?: number;
}

const EnhancedVocabularyPracticeCard: React.FC<EnhancedVocabularyPracticeCardProps> = ({
  word,
  onComplete,
  autoAdvanceDelay = 2000
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { recordVocabularyPractice } = useVocabularyProgress();
  const { speak, hasSpeechSupport } = useTextToSpeech();

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

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value);
    
    if (!isAnswered && value.trim().length > 0) {
      const correct = checkAnswer(value);
      if (correct || value.trim().length >= word.english.length) {
        setIsAnswered(true);
        setIsCorrect(correct);
        
        // Record the practice session
        recordVocabularyPractice(word.id, word.categories[0], correct);
        
        // Auto-advance after delay
        setTimeout(() => {
          onComplete(correct);
        }, autoAdvanceDelay);
      }
    }
  };

  const handleSpeak = () => {
    if (hasSpeechSupport) {
      speak(word.german);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'A1': return 'bg-green-500';
      case 'A2': return 'bg-green-600';
      case 'B1': return 'bg-yellow-500';
      case 'B2': return 'bg-yellow-600';
      case 'C1': return 'bg-red-500';
      case 'C2': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vokabel-Übung</CardTitle>
          <div className="flex items-center gap-2">
            {word.difficulty && (
              <Badge className={getDifficultyColor(word.difficulty)}>
                {word.difficulty}
              </Badge>
            )}
            <div className="flex flex-wrap gap-1">
              {word.categories.map((category, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
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
                className="text-medical-600"
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
              type="text"
              value={userAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Ihre Antwort..."
              className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                isAnswered 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-medical-500'
              }`}
              disabled={isAnswered}
            />
            {isAnswered && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>

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
