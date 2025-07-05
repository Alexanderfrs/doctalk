import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react";

interface TrialFeedbackWidgetProps {
  onSubmit: (feedback: TrialFeedback) => void;
  isSubmitting?: boolean;
}

export interface TrialFeedback {
  wasHelpful: boolean;
  whatHelpedMost: string[];
  improvementSuggestion: string;
}

const TrialFeedbackWidget: React.FC<TrialFeedbackWidgetProps> = ({
  onSubmit,
  isSubmitting = false
}) => {
  const [wasHelpful, setWasHelpful] = useState<boolean | null>(null);
  const [whatHelpedMost, setWhatHelpedMost] = useState<string[]>([]);
  const [improvementSuggestion, setImprovementSuggestion] = useState<string>("");

  const handleSubmit = () => {
    if (wasHelpful === null) return;
    
    onSubmit({
      wasHelpful,
      whatHelpedMost,
      improvementSuggestion
    });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setWhatHelpedMost(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(item => item !== value)
    );
  };

  const isFormValid = wasHelpful !== null;

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-medical-800">Simulation Complete!</h2>
        </div>
        <p className="text-medical-600">Help us improve your learning experience</p>
      </div>

      <div className="space-y-6">
        {/* Question 1: Was this helpful? */}
        <div className="space-y-3">
          <h3 className="font-medium text-medical-800">Was this simulation helpful?</h3>
          <div className="flex gap-4">
            <Button
              variant={wasHelpful === true ? "default" : "outline"}
              onClick={() => setWasHelpful(true)}
              className="flex-1 flex items-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              Yes
            </Button>
            <Button
              variant={wasHelpful === false ? "default" : "outline"}
              onClick={() => setWasHelpful(false)}
              className="flex-1 flex items-center gap-2"
            >
              <ThumbsDown className="h-4 w-4" />
              No
            </Button>
          </div>
        </div>

        {/* Question 2: What helped most? */}
        {wasHelpful !== null && (
          <div className="space-y-3">
            <h3 className="font-medium text-medical-800">What helped most? (Select all that apply)</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="realistic-dialogue" 
                  checked={whatHelpedMost.includes("realistic-dialogue")}
                  onCheckedChange={(checked) => handleCheckboxChange("realistic-dialogue", checked as boolean)}
                />
                <Label htmlFor="realistic-dialogue">Realistic dialogue and conversation flow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="practical-vocabulary" 
                  checked={whatHelpedMost.includes("practical-vocabulary")}
                  onCheckedChange={(checked) => handleCheckboxChange("practical-vocabulary", checked as boolean)}
                />
                <Label htmlFor="practical-vocabulary">Practical medical vocabulary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="feedback-clarity" 
                  checked={whatHelpedMost.includes("feedback-clarity")}
                  onCheckedChange={(checked) => handleCheckboxChange("feedback-clarity", checked as boolean)}
                />
                <Label htmlFor="feedback-clarity">Clear feedback and guidance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="scenario-structure" 
                  checked={whatHelpedMost.includes("scenario-structure")}
                  onCheckedChange={(checked) => handleCheckboxChange("scenario-structure", checked as boolean)}
                />
                <Label htmlFor="scenario-structure">Structured scenario progression</Label>
              </div>
            </div>
          </div>
        )}

        {/* Question 3: Improvement suggestion */}
        {wasHelpful !== null && (
          <div className="space-y-3">
            <h3 className="font-medium text-medical-800">How can we improve? (Optional)</h3>
            <Textarea
              placeholder="Share one improvement suggestion..."
              value={improvementSuggestion}
              onChange={(e) => setImprovementSuggestion(e.target.value)}
              className="min-h-[80px]"
              maxLength={500}
            />
            <p className="text-xs text-medical-500">
              {improvementSuggestion.length}/500 characters
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white py-3"
          size="lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </Card>
  );
};

export default TrialFeedbackWidget;