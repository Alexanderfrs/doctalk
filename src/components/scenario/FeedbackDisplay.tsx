
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

interface FeedbackDisplayProps {
  feedback?: string;
  onDismiss: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  onDismiss
}) => {
  if (!feedback) return null;

  // Determine feedback type based on content
  const isPositive = feedback.toLowerCase().includes('good') || 
                    feedback.toLowerCase().includes('well') ||
                    feedback.toLowerCase().includes('correct') ||
                    feedback.toLowerCase().includes('richtig') ||
                    feedback.toLowerCase().includes('gut');

  const icon = isPositive ? (
    <CheckCircle className="h-4 w-4 text-green-600" />
  ) : (
    <AlertTriangle className="h-4 w-4 text-orange-600" />
  );

  const bgColor = isPositive ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200';
  const textColor = isPositive ? 'text-green-800' : 'text-orange-800';

  return (
    <Card className={`${bgColor} mt-4`}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1">
            {icon}
            <div>
              <h5 className={`text-sm font-medium ${textColor} mb-1`}>
                {isPositive ? 'Great job!' : 'Quick tip:'}
              </h5>
              <p className={`text-xs ${textColor}`}>{feedback}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDismiss}
            className="h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackDisplay;
