
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw, ArrowLeft } from "lucide-react";
import SimpleVocabularyCard from "./SimpleVocabularyCard";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";
import { useIsMobile } from "@/hooks/use-mobile";

interface NewVocabularyPracticeViewProps {
  practiceWords: DeduplicatedVocabularyWord[];
  onEndPractice: () => void;
}

const NewVocabularyPracticeView: React.FC<NewVocabularyPracticeViewProps> = ({
  practiceWords,
  onEndPractice
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (currentIndex < practiceWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Show completion screen
  if (isCompleted) {
    return (
      <Card>
        <CardContent className={`text-center ${isMobile ? 'p-6' : 'p-8'}`}>
          <CheckCircle className={`text-green-500 mx-auto mb-4 ${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
          <h3 className={`font-semibold mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            Großartig! Training abgeschlossen!
          </h3>
          <p className={`text-gray-600 mb-6 ${isMobile ? 'text-sm' : ''}`}>
            Sie haben alle {practiceWords.length} Vokabeln durchgearbeitet.
          </p>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={handleRestart} 
              variant="outline"
              className={isMobile ? 'touch-target' : ''}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Nochmal
            </Button>
            <Button 
              onClick={onEndPractice} 
              className={`bg-medical-500 hover:bg-medical-600 ${isMobile ? 'touch-target' : ''}`}
            >
              Zurück zur Übersicht
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show empty state
  if (practiceWords.length === 0) {
    return (
      <Card>
        <CardContent className="text-center p-8">
          <p className="text-gray-600 mb-4">Keine Vokabeln zum Üben verfügbar.</p>
          <Button onClick={onEndPractice}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentWord = practiceWords[currentIndex];

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Vokabeltraining</h3>
              <p className="text-sm text-gray-600">
                Vokabel {currentIndex + 1} von {practiceWords.length}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onEndPractice}
              className="touch-target"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Beenden
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-medical-500 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${((currentIndex + 1) / practiceWords.length) * 100}%` 
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Word Card */}
      <SimpleVocabularyCard
        key={`word-${currentIndex}-${currentWord.id}`}
        word={currentWord}
        onNext={handleNext}
      />
    </div>
  );
};

export default NewVocabularyPracticeView;
