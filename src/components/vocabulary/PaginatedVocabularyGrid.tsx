
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { DeduplicatedVocabularyWord } from "@/hooks/useVocabularyDeduplication";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaginatedVocabularyGridProps {
  words: DeduplicatedVocabularyWord[];
}

const WORDS_PER_PAGE = 12;

// Image mapping for vital-signs category
const vitalSignsImages = {
  "Blutdruck": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", // blood pressure monitor
  "Puls": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop", // heartbeat monitor
  "Temperatur": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", // thermometer
  "Atmung": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop", // breathing/lungs
  "Sauerstoffsättigung": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop", // pulse oximeter
  "Herzfrequenz": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop", // heart rate
  "Fieber": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", // fever thermometer
  "systolisch": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", // blood pressure
  "diastolisch": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", // blood pressure
  "Hypertonie": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", // high blood pressure
};

const PaginatedVocabularyGrid: React.FC<PaginatedVocabularyGridProps> = ({ words }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { speak, hasSpeechSupport } = useTextToSpeech();
  const isMobile = useIsMobile();

  const totalPages = Math.ceil(words.length / WORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * WORDS_PER_PAGE;
  const endIndex = startIndex + WORDS_PER_PAGE;
  const currentWords = words.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSpeak = (word: string) => {
    if (hasSpeechSupport) {
      speak(word);
    }
  };

  const getWordImage = (word: DeduplicatedVocabularyWord) => {
    // Check if this word has an image mapping for vital signs
    if (word.categories.includes("vital-signs") && vitalSignsImages[word.german as keyof typeof vitalSignsImages]) {
      return vitalSignsImages[word.german as keyof typeof vitalSignsImages];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {words.length} Vokabeln gefunden
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-gray-600">
            Seite {currentPage} von {totalPages}
          </p>
        )}
      </div>

      {/* Vocabulary Grid */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
        {currentWords.map((word) => {
          const imageUrl = getWordImage(word);
          
          return (
            <Card key={word.id} className="hover:shadow-md transition-shadow overflow-hidden">
              {imageUrl && (
                <div className="h-32 overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={word.german}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-medical-800">
                      {word.german}
                    </h3>
                    {hasSpeechSupport && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeak(word.german)}
                        className="text-medical-600 hover:text-medical-700"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-gray-600 font-medium">{word.english}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {word.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  {word.example && (
                    <p className="text-sm italic text-gray-500 border-l-2 border-medical-200 pl-3">
                      {word.example}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? "bg-medical-500 hover:bg-medical-600" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Weiter
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginatedVocabularyGrid;
