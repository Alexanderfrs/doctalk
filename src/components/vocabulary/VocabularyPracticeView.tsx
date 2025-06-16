
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";
import EnhancedVocabularyPracticeCard from "./EnhancedVocabularyPracticeCard";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";
import { useIsMobile } from "@/hooks/use-mobile";

interface VocabularyPracticeViewProps {
  practiceWords: DeduplicatedVocabularyWord[];
  currentWordIndex: number;
  practiceCompleted: boolean;
  onPracticeComplete: (correct: boolean) => void;
  onResetPractice: () => void;
  onEndPractice: () => void;
}

const VocabularyPracticeView: React.FC<VocabularyPracticeViewProps> = ({
  practiceWords,
  currentWordIndex,
  practiceCompleted,
  onPracticeComplete,
  onResetPractice,
  onEndPractice
}) => {
  const isMobile = useIsMobile();

  if (practiceCompleted) {
    return (
      <Card>
        <CardContent className={`text-center ${isMobile ? 'p-6' : 'p-8'}`}>
          <CheckCircle className={`text-green-500 mx-auto mb-4 ${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
          <h3 className={`font-semibold mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>Training abgeschlossen!</h3>
          <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : ''}`}>
            Sie haben alle {practiceWords.length} Vokabeln durchgearbeitet.
          </p>
          <Button onClick={onEndPractice} className={isMobile ? 'w-full touch-target' : ''}>
            Zurück zur Übersicht
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (practiceWords.length === 0) {
    return (
      <Card>
        <CardContent className="text-center p-8">
          <p className="text-gray-600 mb-4">Keine Vokabeln zum Üben verfügbar.</p>
          <Button onClick={onEndPractice}>Zurück zur Übersicht</Button>
        </CardContent>
      </Card>
    );
  }

  const currentWord = practiceWords[currentWordIndex];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Vokabeltraining</h3>
              <p className="text-sm text-gray-600">
                Wort {currentWordIndex + 1} von {practiceWords.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onResetPractice}
                className="touch-target"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onEndPractice}
                className="touch-target"
              >
                Beenden
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-medical-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentWordIndex + 1) / practiceWords.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {currentWord && (
        <EnhancedVocabularyPracticeCard
          key={`practice-session-${currentWordIndex}-${currentWord.id}`}
          word={currentWord}
          onComplete={onPracticeComplete}
          autoAdvanceDelay={2000}
        />
      )}
    </div>
  );
};

export default VocabularyPracticeView;
