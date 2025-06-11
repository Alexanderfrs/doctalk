
import React from "react";
import ProgressTracker from "./ProgressTracker";
import { PerformanceInsightsModal } from "./PerformanceInsightsModal";

interface ScenarioProgressSectionProps {
  completedGoals: number;
  totalGoals: number;
  currentObjective: string;
  showInsights: boolean;
  performanceInsights: string;
  scenarioCategory: string;
  onCloseInsights: () => void;
  onRestart: () => void;
}

const ScenarioProgressSection: React.FC<ScenarioProgressSectionProps> = ({
  completedGoals,
  totalGoals,
  currentObjective,
  showInsights,
  performanceInsights,
  scenarioCategory,
  onCloseInsights,
  onRestart
}) => {
  return (
    <>
      <ProgressTracker 
        completedGoals={completedGoals}
        totalGoals={totalGoals}
        currentObjective={currentObjective}
      />
      
      <PerformanceInsightsModal
        isOpen={showInsights}
        onClose={onCloseInsights}
        insights={performanceInsights}
        completedGoals={completedGoals}
        totalGoals={totalGoals}
        scenarioType={scenarioCategory}
        onRestart={onRestart}
      />
    </>
  );
};

export default ScenarioProgressSection;
