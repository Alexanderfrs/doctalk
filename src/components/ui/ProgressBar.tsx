
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: "default" | "success" | "warning";
  showValue?: boolean;
  label?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = "default",
  showValue = false,
  label,
  className,
}) => {
  const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  
  const colorClasses = {
    default: "bg-medical-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
  };

  const progressClass = colorClasses[color] || colorClasses.default;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        {label && <div className="text-sm text-neutral-600">{label}</div>}
        {showValue && <div className="text-sm font-medium">{percentage}%</div>}
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${color === "default" ? "" : "[&>div]:bg-transparent"}`}
      >
        {color !== "default" && (
          <div 
            className={`h-full rounded-full ${progressClass}`} 
            style={{ width: `${percentage}%` }}
          />
        )}
      </Progress>
    </div>
  );
};

export default ProgressBar;
