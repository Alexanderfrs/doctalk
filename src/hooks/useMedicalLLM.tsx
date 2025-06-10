
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { DialogueLine } from '@/data/scenarios';
import { toast } from 'sonner';

interface PatientProfile {
  name?: string;
  age?: number;
  condition?: string;
  mood?: string;
  personality?: string;
  medicalHistory?: string;
  communicationStyle?: string;
}

interface MedicalLLMOptions {
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: PatientProfile;
  onError?: (error: string) => void;
}

interface MedicalLLMResponse {
  response: string;
  patientProfile?: {
    name: string;
    mood: string;
    personality: string;
  };
  scenarioType: string;
  timestamp: string;
}

interface UseMedicalLLMReturn {
  generateResponse: (userInput: string, conversationHistory: DialogueLine[]) => Promise<string>;
  currentPatientProfile: PatientProfile | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
  testConnection: () => Promise<boolean>;
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
  const [currentPatientProfile, setCurrentPatientProfile] = useState<PatientProfile | null>(null);

  const testConnection = useCallback(async (): Promise<boolean> => {
    try {
      console.log("Testing OpenAI connection...");
      
      const { data, error } = await supabase.functions.invoke("medical-dialogue", {
        body: {
          userMessage: "Hallo",
          scenarioType: "patient-care",
          scenarioDescription: "Test connection",
          conversationHistory: [],
          difficultyLevel: "beginner",
          patientContext: { name: "Test Patient" }
        }
      });

      if (error) {
        console.error("Connection test failed:", error);
        return false;
      }

      console.log("Connection test successful:", data);
      return true;
    } catch (err) {
      console.error("Connection test error:", err);
      return false;
    }
  }, []);

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
      console.log("Patient context:", patientContext);

      const { data, error } = await supabase.functions.invoke("medical-dialogue", {
        body: {
          userMessage: userInput,
          scenarioType,
          scenarioDescription,
          conversationHistory,
          difficultyLevel,
          patientContext: patientContext || {}
        }
      });

      if (error) {
        console.error("Supabase function error:", error);
        
        // Handle specific error cases
        if (error.message?.includes('quota')) {
          throw new Error('API-Limits erreicht. Bitte kontaktieren Sie den Administrator.');
        } else if (error.message?.includes('API key')) {
          throw new Error('API-Konfigurationsfehler. Bitte kontaktieren Sie den Administrator.');
        } else {
          throw new Error(error.message || 'Fehler beim Verbinden mit dem Dialogue-Service');
        }
      }

      if (!data?.response) {
        throw new Error('Keine Antwort vom Medical Dialogue Service erhalten');
      }

      // Update patient profile if received
      if (data.patientProfile) {
        setCurrentPatientProfile(data.patientProfile);
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
      
      // Return appropriate fallback response based on scenario
      const fallbackResponses = {
        'patient-care': "Entschuldigung, ich habe Sie nicht verstanden. Können Sie das bitte wiederholen?",
        'emergency': "Ich brauche Hilfe! Können Sie mir bitte helfen?",
        'handover': "Könnten Sie die Information bitte wiederholen?",
        'elderly-care': "Wie bitte? Ich habe Sie nicht ganz verstanden.",
        'disability-care': "Ich verstehe nicht. Können Sie das einfacher sagen?"
      };
      
      return fallbackResponses[scenarioType] || "Entschuldigung, ich konnte keine Antwort generieren. Bitte versuchen Sie es erneut.";
    }
  }, [scenarioType, scenarioDescription, difficultyLevel, patientContext, onError]);

  const reset = useCallback(() => {
    setError(null);
    setCurrentPatientProfile(null);
  }, []);

  return {
    generateResponse,
    currentPatientProfile,
    isLoading,
    error,
    reset,
    testConnection
  };
};

export default useMedicalLLM;
