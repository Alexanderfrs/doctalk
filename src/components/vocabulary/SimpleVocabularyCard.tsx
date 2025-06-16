
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Volume2 } from "lucide-react";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";

interface SimpleVocabularyCardProps {
  word: DeduplicatedVocabularyWord;
  onNext: () => void;
}

const SimpleVocabularyCard: React.FC<SimpleVocabularyCardProps> = ({
  word,
  onNext
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, hasSpeechSupport } = useTextToSpeech();
  const { recordVocabularyPractice } = useVocabularyProgress();

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    recordVocabularyPractice(word.id, word.categories[0], isCorrect);
    
    // Move to next word after a short delay
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  const handleSpeak = () => {
    if (hasSpeechSupport) {
      speak(word.german);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vokabel-Übung</CardTitle>
          <Badge variant="outline" className="text-xs">
            {word.categories[0]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* German Word */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-3xl font-bold text-medical-800">
              {word.german}
            </h3>
            {hasSpeechSupport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSpeak}
                className="text-medical-600"
                disabled={hasAnswered}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {word.pronunciation && (
            <p className="text-sm text-gray-500 mb-4">
              [{word.pronunciation}]
            </p>
          )}
          <p className="text-gray-600 mb-6">Was bedeutet das auf Englisch?</p>
        </div>

        {/* Show Answer Button */}
        {!showAnswer && !hasAnswered && (
          <Button 
            onClick={handleShowAnswer} 
            className="w-full bg-medical-500 hover:bg-medical-600"
          >
            Antwort zeigen
          </Button>
        )}

        {/* Answer Display */}
        {showAnswer && (
          <div className="space-y-4">
            <div className="bg-medical-50 p-4 rounded-lg text-center">
              <p className="text-xl font-semibold text-medical-800 mb-2">
                {word.english}
              </p>
              {word.example && (
                <p className="text-sm text-gray-600 italic">
                  Beispiel: {word.example}
                </p>
              )}
            </div>

            {!hasAnswered && (
              <div className="flex gap-3">
                <Button
                  onClick={() => handleAnswer(false)}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Schwierig
                </Button>
                <Button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kannte ich
                </Button>
              </div>
            )}

            {hasAnswered && (
              <div className="text-center text-green-600 font-medium">
                Antwort aufgezeichnet! Nächste Vokabel...
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleVocabularyCard;
