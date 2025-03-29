
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { DialogueLine } from '@/data/scenarios';
import { toast } from 'sonner';

interface UseAIFeedbackOptions {
  onError?: (error: string) => void;
}

interface UseAIFeedbackReturn {
  getFeedback: (conversation: DialogueLine[], userResponse: string, scenarioContext?: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

const useAIFeedback = ({
  onError,
}: UseAIFeedbackOptions = {}): UseAIFeedbackReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getFeedback = useCallback(async (
    conversation: DialogueLine[], 
    userResponse: string,
    scenarioContext?: string
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-feedback", {
        body: {
          conversation,
          userResponse,
          scenarioContext
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setIsLoading(false);
      return data.feedback;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error generating feedback';
      setError(errorMessage);
      
      if (onError) onError(errorMessage);
      else toast.error(errorMessage);
      
      setIsLoading(false);
      return "Sorry, I couldn't generate feedback at this time.";
    }
  }, [onError]);

  return {
    getFeedback,
    isLoading,
    error
  };
};

export default useAIFeedback;
