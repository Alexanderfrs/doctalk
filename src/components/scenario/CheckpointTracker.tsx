
import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface Checkpoint {
  id: string;
  description: string;
  completed: boolean;
}

interface CheckpointTrackerProps {
  checkpoints: Checkpoint[];
  className?: string;
}

const CheckpointTracker: React.FC<CheckpointTrackerProps> = ({
  checkpoints,
  className
}) => {
  const completedCount = checkpoints.filter(cp => cp.completed).length;
  const totalCount = checkpoints.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-medical-600" />
        <h4 className="font-medium text-medical-800">Lernziele</h4>
        <span className="text-xs text-medical-600 ml-auto">
          {completedCount}/{totalCount}
        </span>
      </div>
      
      <div className="w-full bg-medical-100 rounded-full h-2 mb-4">
        <div 
          className="bg-medical-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="space-y-2">
        {checkpoints.map((checkpoint) => (
          <div key={checkpoint.id} className="flex items-start gap-2">
            {checkpoint.completed ? (
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-medical-300 mt-0.5 flex-shrink-0" />
            )}
            <p className={cn(
              "text-xs",
              checkpoint.completed 
                ? "text-medical-700 line-through" 
                : "text-medical-600"
            )}>
              {checkpoint.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CheckpointTracker;
