
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
  label?: string;
}

const ProgressBar = ({
  value,
  max,
  showValue = false,
  size = 'md',
  color = 'default',
  className,
  label
}: ProgressBarProps) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };
  
  const colorClasses = {
    default: 'bg-medical-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="text-neutral-700">{label}</span>
          {showValue && (
            <span className="text-neutral-500 font-medium">{percentage}%</span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-neutral-200 rounded-full overflow-hidden", sizeClasses[size])}>
        <div 
          className={cn(
            "transition-all duration-500 ease-in-out rounded-full", 
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
