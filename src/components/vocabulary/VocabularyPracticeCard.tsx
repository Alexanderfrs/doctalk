
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { CheckCircle, X, Volume2, RotateCcw } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface VocabularyWord {
  id: string;
  german: string;
  english: string;
  category: string;
  difficulty: string;
  example?: string;
  pronunciation?: string;
}

interface VocabularyPracticeCardProps {
  word: VocabularyWord;
  onComplete: (correct: boolean) => void;
  showAnswer?: boolean;
}

const VocabularyPracticeCard: React.FC<VocabularyPracticeCardProps> = ({
  word,
  onComplete,
  showAnswer = false
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(showAnswer);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { recordVocabularyPractice } = useVocabularyProgress();
  const { speak, isSupported } = useTextToSpeech();

  const handleAnswer = (correct: boolean) => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    setAnswerRevealed(true);
    
    // Record the practice session
    recordVocabularyPractice(word.id, word.category, correct);
    
    // Call the completion callback after a short delay
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  const handleRevealAnswer = () => {
    setAnswerRevealed(true);
  };

  const handleReset = () => {
    setUserAnswer('');
    setAnswerRevealed(showAnswer);
    setHasAnswered(false);
  };

  const handleSpeak = () => {
    if (isSupported) {
      speak(word.german, 'de-DE');
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
            <Badge className={getDifficultyColor(word.difficulty)}>
              {word.difficulty}
            </Badge>
            <Badge variant="outline">
              {word.category}
            </Badge>
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
            {isSupported && (
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
        {!answerRevealed && (
          <div className="space-y-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ihre Antwort..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-medical-500 focus:outline-none"
              disabled={hasAnswered}
            />
            
            <div className="flex gap-2">
              <Button
                onClick={handleRevealAnswer}
                variant="outline"
                className="flex-1"
                disabled={hasAnswered}
              >
                Antwort zeigen
              </Button>
            </div>
          </div>
        )}

        {/* Answer Revealed */}
        {answerRevealed && (
          <div className="space-y-4">
            <div className="bg-medical-50 p-4 rounded-lg text-center">
              <p className="text-lg font-semibold text-medical-800">
                {word.english}
              </p>
              {word.example && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  Beispiel: {word.example}
                </p>
              )}
            </div>

            {!hasAnswered && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAnswer(false)}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Schwierig
                </Button>
                <Button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Gewusst
                </Button>
              </div>
            )}

            {hasAnswered && (
              <div className="text-center">
                <p className="text-green-600 font-medium mb-3">
                  Antwort aufgezeichnet!
                </p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Nochmal
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VocabularyPracticeCard;
