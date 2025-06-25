
import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Checkpoint {
  id: string;
  description: string;
  completed: boolean;
  attempts?: number;
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
  
  // Find the current active checkpoint (first incomplete one)
  const currentCheckpointIndex = checkpoints.findIndex(cp => !cp.completed);

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
        {checkpoints.map((checkpoint, index) => {
          const isCurrent = index === currentCheckpointIndex;
          const showAttempts = isCurrent && checkpoint.attempts > 0;
          
          return (
            <div key={checkpoint.id} className={cn(
              "flex items-start gap-2 p-2 rounded-lg transition-colors",
              isCurrent && "bg-medical-50 border border-medical-200"
            )}>
              {checkpoint.completed ? (
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className={cn(
                  "h-4 w-4 mt-0.5 flex-shrink-0",
                  isCurrent ? "text-medical-600" : "text-medical-300"
                )} />
              )}
              <div className="flex-1">
                <p className={cn(
                  "text-xs",
                  checkpoint.completed 
                    ? "text-medical-700 line-through" 
                    : isCurrent
                      ? "text-medical-700 font-medium"
                      : "text-medical-600"
                )}>
                  {checkpoint.description}
                </p>
                {showAttempts && (
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-amber-500" />
                    <span className="text-xs text-amber-600">
                      {checkpoint.attempts} Versuche
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {currentCheckpointIndex !== -1 && (
        <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700">
            <strong>Aktuelles Ziel:</strong> {checkpoints[currentCheckpointIndex]?.description}
          </p>
        </div>
      )}
    </Card>
  );
};

export default CheckpointTracker;
