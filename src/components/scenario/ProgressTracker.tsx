
import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Target } from "lucide-react";

interface ProgressTrackerProps {
  completedGoals: number;
  totalGoals: number;
  currentObjective: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedGoals,
  totalGoals,
  currentObjective
}) => {
  const progressPercentage = (completedGoals / totalGoals) * 100;

  return (
    <div className="bg-gradient-to-r from-medical-50 to-blue-50 border border-medical-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Target className="h-4 w-4 text-medical-600" />
        <h4 className="text-sm font-medium text-medical-800">Scenario Progress</h4>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-medical-700">
          <span>Goals Completed</span>
          <span className="font-medium">{completedGoals}/{totalGoals}</span>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-medical-700">{currentObjective}</p>
        </div>
        
        {progressPercentage === 100 && (
          <div className="text-xs text-green-700 font-medium">
            🎉 Scenario completed! Well done!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
