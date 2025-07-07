import React, { useState } from "react";
import TrialFeedbackWidget, { TrialFeedback } from "./TrialFeedbackWidget";
import { supabase } from "@/integrations/supabase/client";
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
      // Generate a unique session ID for this trial user
      const userSessionId = crypto.randomUUID();
      
      // Get user agent for analytics
      const userAgent = navigator.userAgent;
      
      // Store feedback in Supabase
      const { error } = await supabase
        .from('trial_feedback')
        .insert({
          was_helpful: feedback.wasHelpful,
          what_helped_most: feedback.whatHelpedMost,
          improvement_suggestion: feedback.improvementSuggestion || null,
          user_session_id: userSessionId,
          user_agent: userAgent
        });

      if (error) {
        console.error("Error storing trial feedback:", error);
        throw error;
      }

      console.log("Trial feedback successfully stored in Supabase");
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
      // Still proceed with the flow even if feedback storage fails
      setFeedbackSubmitted(true);
      setTimeout(() => {
        waitlist.openPopup("pw4BglxIAKRzobt7xjV6");
        setTimeout(() => {
          onExit();
        }, 1000);
      }, 1500);
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
