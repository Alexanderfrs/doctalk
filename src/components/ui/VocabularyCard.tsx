
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { VocabularyWord } from "@/data/vocabulary";
import { Check, Volume2, BookOpen, Plus } from "lucide-react";
import { toast } from "sonner";

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
    // This would connect to a TTS API in a real implementation
    console.log('Playing pronunciation for:', word.german);
    if (onPractice) {
      onPractice();
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
        "relative h-[200px] w-full cursor-pointer perspective group",
        mastered && "ring-2 ring-green-500 ring-offset-2",
        isSuggested && "border-2 border-medical-300 shadow-md",
        className
      )}
      onClick={handleFlip}
    >
      <div 
        className={cn(
          "absolute inset-0 preserve-3d transition-transform duration-500 ease-in-out rounded-2xl shadow-md",
          flipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col">
          <div className="flex justify-between items-start">
            <span className="px-2 py-0.5 text-xs bg-medical-100 text-medical-700 rounded-full mb-3">
              {word.category}
            </span>
            
            <button 
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                mastered ? "bg-green-100" : "bg-neutral-100 hover:bg-neutral-200"
              )}
              onClick={handleMastered}
              aria-label={mastered ? "Mark as not mastered" : "Mark as mastered"}
            >
              <Check className={cn("h-4 w-4", mastered ? "text-green-600" : "text-neutral-400")} />
            </button>
          </div>
          
          <h3 className="text-2xl font-semibold text-center my-auto">
            {word.german}
          </h3>
          
          <div className="mt-auto flex justify-center gap-2">
            <button 
              className="text-neutral-500 hover:text-medical-600 transition-colors"
              onClick={playPronunciation}
              aria-label="Play pronunciation"
            >
              <Volume2 className="h-5 w-5" />
            </button>
            
            {isSuggested && onUse && (
              <button 
                className="text-medical-500 hover:text-medical-600 transition-colors"
                onClick={handleUseWord}
                aria-label="Use word in response"
              >
                <Plus className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col">
          <span className="px-2 py-0.5 text-xs self-start bg-neutral-100 text-neutral-600 rounded-full mb-3">
            English
          </span>
          
          <h3 className="text-xl font-medium text-center mb-2">
            {word.english}
          </h3>
          
          {word.pronunciation && (
            <p className="text-sm text-neutral-500 text-center italic mb-2">
              /{word.pronunciation}/
            </p>
          )}
          
          {word.example && (
            <div className="mt-2 mb-auto">
              <p className="text-sm text-neutral-600 italic border-l-2 border-medical-300 pl-2">
                "{word.example}"
              </p>
            </div>
          )}
          
          {word.notes && (
            <p className="text-xs text-neutral-500 mt-auto">
              {word.notes}
            </p>
          )}
          
          {mastered && (
            <div className="absolute top-2 right-2 bg-green-100 p-1 rounded-full">
              <Check className="h-4 w-4 text-green-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
