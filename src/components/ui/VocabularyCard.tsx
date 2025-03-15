
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { VocabularyWord } from "@/data/vocabulary";
import { Check, Volume2, BookOpen, Plus } from "lucide-react";
import { toast } from "sonner";
import useTextToSpeech from "@/hooks/useTextToSpeech";

interface VocabularyCardProps {
  word: VocabularyWord;
  onPractice?: () => void;
  className?: string;
  isSuggested?: boolean;
  onUse?: () => void;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  onPractice,
  className,
  isSuggested = false,
  onUse,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState(word.mastered || false);
  
  const { speak, isSpeaking } = useTextToSpeech({
    language: 'de-DE',
    rate: 0.8, // Slightly slower to be clearer
    onStart: () => console.log('Started speaking:', word.german),
    onEnd: () => console.log('Finished speaking'),
    onError: (error) => toast.error(`Fehler bei der Aussprache: ${error}`)
  });

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMastered(!mastered);
    if (!mastered) {
      toast.success(`"${word.german}" als gemeistert markiert`);
    }
  };

  const playPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Play the pronunciation of the German word
    if (word.german) {
      console.log('Playing pronunciation for:', word.german);
      speak(word.german);
      
      // Notify the parent component if needed
      if (onPractice) {
        onPractice();
      }
    }
  };

  const handleUseWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUse) {
      onUse();
      toast.success(`Vokabel "${word.german}" zum Text hinzugefügt`);
    }
  };

  return (
    <div 
      className={cn(
        "relative h-[180px] w-full cursor-pointer perspective",
        mastered && "ring-1 ring-green-500 ring-offset-1",
        isSuggested && "border border-medical-300 shadow-sm",
        className
      )}
      onClick={handleFlip}
    >
      <div 
        className={cn(
          "absolute inset-0 w-full h-full preserve-3d transition-transform duration-500 ease-in-out rounded-lg shadow-sm",
          flipped ? "rotate-y-180" : ""
        )}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-white border border-neutral-200 rounded-lg p-3 flex flex-col"
          style={{
            backfaceVisibility: "hidden"
          }}
        >
          <div className="flex justify-between items-start">
            <span className="px-1.5 py-0.5 text-xs bg-medical-100 text-medical-700 rounded-full mb-2">
              {word.category}
            </span>
            
            <button 
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center transition-colors",
                mastered ? "bg-green-100" : "bg-neutral-100 hover:bg-neutral-200"
              )}
              onClick={handleMastered}
              aria-label={mastered ? "Mark as not mastered" : "Mark as mastered"}
            >
              <Check className={cn("h-3 w-3", mastered ? "text-green-600" : "text-neutral-400")} />
            </button>
          </div>
          
          <h3 className="text-lg font-semibold text-center my-auto">
            {word.german}
          </h3>
          
          {/* Display abbreviation if available */}
          {word.abbreviation && (
            <div className="mt-1 flex justify-center">
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                {word.abbreviation}
              </span>
            </div>
          )}
          
          <div className="mt-auto flex justify-center gap-2">
            <button 
              className={cn(
                "text-neutral-500 hover:text-medical-600 transition-colors p-2 rounded-full hover:bg-medical-50",
                isSpeaking && "text-medical-600 bg-medical-50"
              )}
              onClick={playPronunciation}
              aria-label="Play pronunciation"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            
            {isSuggested && onUse && (
              <button 
                className="text-medical-500 hover:text-medical-600 transition-colors p-2 rounded-full hover:bg-medical-50"
                onClick={handleUseWord}
                aria-label="Use word in response"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-white border border-neutral-200 rounded-lg p-3 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <span className="px-1.5 py-0.5 text-xs self-start bg-neutral-100 text-neutral-600 rounded-full mb-2">
            English
          </span>
          
          <h3 className="text-base font-medium text-center mb-1">
            {word.english}
          </h3>
          
          {word.pronunciation && (
            <p className="text-xs text-neutral-500 text-center italic mb-1">
              /{word.pronunciation}/
            </p>
          )}
          
          {word.example && (
            <div className="mt-1 mb-auto">
              <p className="text-xs text-neutral-600 italic border-l-2 border-medical-300 pl-2">
                "{word.example}"
              </p>
            </div>
          )}
          
          {word.notes && (
            <p className="text-xs text-neutral-500 mt-1">
              {word.notes}
            </p>
          )}
          
          {mastered && (
            <div className="absolute top-2 right-2 bg-green-100 p-0.5 rounded-full">
              <Check className="h-3 w-3 text-green-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
