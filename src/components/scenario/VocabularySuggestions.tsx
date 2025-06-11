
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, BookOpen } from "lucide-react";
import vocabularyCategories, { VocabularyWord } from "@/data/vocabulary";

interface VocabularySuggestionsProps {
  scenarioType: string;
  onVocabSelect: (word: string) => void;
}

const VocabularySuggestions: React.FC<VocabularySuggestionsProps> = ({
  scenarioType,
  onVocabSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [relevantWords, setRelevantWords] = useState<VocabularyWord[]>([]);

  useEffect(() => {
    // Get relevant vocabulary based on scenario type
    const getRelevantCategories = (type: string): string[] => {
      switch (type) {
        case 'patient-care':
          return ['vital-signs', 'medications', 'pain-scale', 'general-care'];
        case 'emergency':
          return ['vital-signs', 'emergency', 'medications', 'abbreviations'];
        case 'handover':
          return ['abbreviations', 'medications', 'diagnoses', 'documentation'];
        case 'elderly-care':
          return ['elderly-care', 'mobility', 'care-equipment', 'general-care'];
        case 'disability-care':
          return ['disability-care', 'communication', 'care-equipment'];
        default:
          return ['vital-signs', 'general-care'];
      }
    };

    const relevantCategories = getRelevantCategories(scenarioType);
    const allWords = vocabularyCategories.flatMap(cat => cat.words);
    const filtered = allWords.filter(word => 
      relevantCategories.includes(word.category)
    ).slice(0, 8); // Limit to 8 most relevant words

    setRelevantWords(filtered);
  }, [scenarioType]);

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-medical-600" />
                Hilfreiche Begriffe
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {relevantWords.map((word) => (
                <Button
                  key={word.id}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => onVocabSelect(word.german)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm">{word.german}</span>
                    <span className="text-xs text-gray-500">{word.english}</span>
                    {word.abbreviation && (
                      <span className="text-xs text-medical-600 font-mono">
                        {word.abbreviation}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Klicken Sie auf einen Begriff, um ihn zu verwenden
            </p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default VocabularySuggestions;
