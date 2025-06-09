
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { DialogueLine } from '@/data/scenarios';
import { toast } from 'sonner';

interface PatientContext {
  name?: string;
  age?: number;
  condition?: string;
  mood?: string;
}

interface MedicalLLMOptions {
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: PatientContext;
  onError?: (error: string) => void;
}

interface UseMedicalLLMReturn {
  generateResponse: (userInput: string, conversationHistory: DialogueLine[]) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

const useMedicalLLM = ({
  scenarioType,
  scenarioDescription,
  difficultyLevel = 'intermediate',
  patientContext,
  onError,
}: MedicalLLMOptions): UseMedicalLLMReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(async (
    userInput: string,
    conversationHistory: DialogueLine[] = []
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!userInput.trim()) {
        throw new Error('Bitte geben Sie eine Nachricht ein.');
      }

      console.log(`Generating medical dialogue response for scenario: ${scenarioType}`);

      const { data, error } = await supabase.functions.invoke("medical-dialogue", {
        body: {
          userMessage: userInput,
          scenarioType,
          scenarioDescription,
          conversationHistory,
          difficultyLevel,
          patientContext
        }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || 'Failed to get response from medical dialogue service');
      }

      if (!data?.response) {
        throw new Error('No response received from medical dialogue service');
      }

      console.log("Medical dialogue response received successfully");
      setIsLoading(false);
      return data.response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten beim Generieren der Antwort.';
      console.error("Error in medical LLM:", errorMessage);
      setError(errorMessage);
      
      if (onError) onError(errorMessage);
      else toast.error(errorMessage);
      
      setIsLoading(false);
      
      // Return a fallback response in German
      return "Entschuldigung, ich konnte keine Antwort generieren. Bitte versuchen Sie es erneut.";
    }
  }, [scenarioType, scenarioDescription, difficultyLevel, patientContext, onError]);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateResponse,
    isLoading,
    error,
    reset
  };
};

export default useMedicalLLM;
