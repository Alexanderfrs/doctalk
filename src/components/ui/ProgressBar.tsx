
import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max: number;
  showValue?: boolean;
  label?: string;
  color?: "default" | "success" | "warning";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ProgressBar = ({
  value,
  max,
  showValue = false,
  label,
  color = "default",
  className,
  size = "md",
}: ProgressBarProps) => {
  // Ensure value is within bounds
  const safeValue = Math.max(0, Math.min(value, max));
  const percentage = (safeValue / max) * 100;

  // Determine the color of the progress bar
  const getBarColor = () => {
    switch (color) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-medical-500";
    }
  };

  // Determine height based on size
  const getHeight = () => {
    switch (size) {
      case "sm":
        return "h-1.5";
      case "lg":
        return "h-3";
      default:
        return "h-2";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-neutral-500">{label}</span>
          {showValue && (
            <span className="text-xs font-medium">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-neutral-100 rounded-full", getHeight())}>
        <div
          className={cn("rounded-full transition-all duration-500", getBarColor(), getHeight())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
