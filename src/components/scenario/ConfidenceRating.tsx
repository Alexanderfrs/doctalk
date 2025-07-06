
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ConfidenceRatingProps {
  onSubmit: (score: number) => void;
  isSubmitting?: boolean;
}

const ConfidenceRating: React.FC<ConfidenceRatingProps> = ({
  onSubmit,
  isSubmitting = false
}) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedScore !== null) {
      onSubmit(selectedScore);
    }
  };

  const getScoreLabel = (score: number) => {
    switch (score) {
      case 1: return "Not confident";
      case 2: return "Slightly confident";
      case 3: return "Moderately confident";
      case 4: return "Very confident";
      case 5: return "Extremely confident";
      default: return "";
    }
  };

  const displayScore = hoveredScore || selectedScore;

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-medical-800">
          How confident do you feel?
        </h3>
        <p className="text-sm text-medical-600">
          Rate your confidence in this conversation
        </p>
      </div>

      <div className="space-y-4">
        {/* Star rating */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => setSelectedScore(score)}
              onMouseEnter={() => setHoveredScore(score)}
              onMouseLeave={() => setHoveredScore(null)}
              className="p-1 transition-transform hover:scale-110"
              disabled={isSubmitting}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  score <= (hoveredScore || selectedScore || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Score label */}
        {displayScore && (
          <div className="text-center">
            <p className="text-sm font-medium text-medical-700">
              {getScoreLabel(displayScore)}
            </p>
          </div>
        )}

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={selectedScore === null || isSubmitting}
          className="w-full bg-medical-600 hover:bg-medical-700 text-white"
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </Button>
      </div>
    </Card>
  );
};

export default ConfidenceRating;
