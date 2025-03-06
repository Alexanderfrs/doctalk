
import React from "react";
import { BookOpen } from "lucide-react";

interface VocabularyProgressProps {
  masteredCount: number;
  totalCount: number;
}

const VocabularyProgress: React.FC<VocabularyProgressProps> = ({
  masteredCount,
  totalCount
}) => {
  const progressPercentage = Math.round((masteredCount / totalCount) * 100);

  return (
    <div className="bg-white rounded-lg p-4 mb-6 border border-neutral-100">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-5 w-5 text-medical-500" />
        <h2 className="text-lg font-medium">Vokabel-Fortschritt</h2>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="bg-neutral-100 h-2 rounded-full flex-grow">
          <div 
            className="bg-medical-500 h-2 rounded-full" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
        <span className="text-sm text-neutral-600 whitespace-nowrap">
          {masteredCount} von {totalCount} beherrscht ({progressPercentage}%)
        </span>
      </div>
    </div>
  );
};

export default VocabularyProgress;
