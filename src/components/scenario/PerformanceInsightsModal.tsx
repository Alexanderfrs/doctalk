
import React from "react";
import PerformanceInsights from "./PerformanceInsights";

interface PerformanceInsightsModalProps {
  isOpen: boolean;
  insights: string;
  completedGoals: number;
  totalGoals: number;
  scenarioType: string;
  onClose: () => void;
  onRestart: () => void;
}

export const PerformanceInsightsModal: React.FC<PerformanceInsightsModalProps> = ({
  isOpen,
  insights,
  completedGoals,
  totalGoals,
  scenarioType,
  onClose,
  onRestart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full">
        <PerformanceInsights
          insights={insights}
          completedGoals={completedGoals}
          totalGoals={totalGoals}
          scenarioType={scenarioType}
          onClose={onClose}
          onRestart={onRestart}
        />
      </div>
    </div>
  );
};
