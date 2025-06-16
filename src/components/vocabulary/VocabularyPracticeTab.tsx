
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PracticeSetupDialog, { PracticeConfig } from "./PracticeSetupDialog";

interface VocabularyPracticeTabProps {
  availableCategories: string[];
  totalWords: number;
  onStartPractice: (config: PracticeConfig) => void;
}

const VocabularyPracticeTab: React.FC<VocabularyPracticeTabProps> = ({
  availableCategories,
  totalWords,
  onStartPractice
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm text-gray-600">
          {totalWords} Vokabeln verfügbar
        </p>
      </div>
      <PracticeSetupDialog
        availableCategories={availableCategories}
        onStartPractice={onStartPractice}
        totalWords={totalWords}
      />
    </div>
  );
};

export default VocabularyPracticeTab;
