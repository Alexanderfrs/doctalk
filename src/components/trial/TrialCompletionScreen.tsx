import React, { useState } from "react";
import TrialFeedbackWidget, { TrialFeedback } from "./TrialFeedbackWidget";
import waitlist from '@zootools/waitlist-js';

interface TrialCompletionScreenProps {
  onExit: () => void;
}

const TrialCompletionScreen: React.FC<TrialCompletionScreenProps> = ({
  onExit
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const handleFeedbackSubmit = async (feedback: TrialFeedback) => {
    setIsSubmittingFeedback(true);
    
    try {
      // In a real app, you'd store this feedback somewhere
      console.log("Trial feedback:", feedback);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeedbackSubmitted(true);
      
      // Show waitlist popup after a brief delay
      setTimeout(() => {
        waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
        // Exit after showing waitlist
        setTimeout(() => {
          onExit();
        }, 1000);
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-scale-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-medical-800">Thank you for your feedback!</h2>
          <p className="text-medical-600">This helps us improve the learning experience.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <TrialFeedbackWidget
        onSubmit={handleFeedbackSubmit}
        isSubmitting={isSubmittingFeedback}
      />
    </div>
  );
};

export default TrialCompletionScreen;