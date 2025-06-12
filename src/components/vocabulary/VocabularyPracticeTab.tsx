
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Vokabeltraining</h3>
          <p className="text-gray-600 mb-6">
            Testen Sie Ihr Wissen mit {totalWords} Vokabeln.
          </p>
          <PracticeSetupDialog
            availableCategories={availableCategories}
            onStartPractice={onStartPractice}
            totalWords={totalWords}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VocabularyPracticeTab;
