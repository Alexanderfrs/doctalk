
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

interface UnifiedMedicalLLMOptions {
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: PatientProfile;
  userLanguage?: string;
  onError?: (error: string) => void;
}

interface UnifiedResponse {
  patientReply: string;
  briefFeedback?: string;
  suggestionForNext?: string;
  progressUpdate: {
    completedGoals: number;
    totalGoals: number;
    currentObjective: string;
  };
  patientProfile?: {
    name: string;
    mood: string;
    personality: string;
  };
  scenarioType: string;
  timestamp: string;
}

interface UseUnifiedMedicalLLMReturn {
  generateUnifiedResponse: (userInput: string, conversationHistory: DialogueLine[]) => Promise<UnifiedResponse>;
  currentPatientProfile: PatientProfile | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
  testConnection: () => Promise<boolean>;
}

const useUnifiedMedicalLLM = ({
  scenarioType,
  scenarioDescription,
  difficultyLevel = 'intermediate',
  patientContext,
  userLanguage = 'en',
  onError,
}: UnifiedMedicalLLMOptions): UseUnifiedMedicalLLMReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPatientProfile, setCurrentPatientProfile] = useState<PatientProfile | null>(null);

  const testConnection = useCallback(async (): Promise<boolean> => {
    try {
      console.log("Testing unified OpenAI connection...");
      
      const { data, error } = await supabase.functions.invoke("unified-medical-dialogue", {
        body: {
          userMessage: "Hallo",
          scenarioType: "patient-care",
          scenarioDescription: "Test connection",
          conversationHistory: [],
          difficultyLevel: "beginner",
          patientContext: { name: "Test Patient" },
          userLanguage: "en"
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

  const generateUnifiedResponse = useCallback(async (
    userInput: string,
    conversationHistory: DialogueLine[] = []
  ): Promise<UnifiedResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!userInput.trim()) {
        throw new Error('Bitte geben Sie eine Nachricht ein.');
      }

      console.log(`Generating unified medical dialogue response for scenario: ${scenarioType}`);

      const { data, error } = await supabase.functions.invoke("unified-medical-dialogue", {
        body: {
          userMessage: userInput,
          scenarioType,
          scenarioDescription,
          conversationHistory,
          difficultyLevel,
          patientContext: patientContext || {},
          userLanguage
        }
      });

      if (error) {
        console.error("Supabase function error:", error);
        
        if (error.message?.includes('quota')) {
          throw new Error('API-Limits erreicht. Bitte kontaktieren Sie den Administrator.');
        } else if (error.message?.includes('API key')) {
          throw new Error('API-Konfigurationsfehler. Bitte kontaktieren Sie den Administrator.');
        } else {
          throw new Error(error.message || 'Fehler beim Verbinden mit dem Dialogue-Service');
        }
      }

      if (!data?.patientReply) {
        throw new Error('Keine Antwort vom Medical Dialogue Service erhalten');
      }

      // Update patient profile if received
      if (data.patientProfile) {
        setCurrentPatientProfile(data.patientProfile);
      }

      console.log("Unified medical dialogue response received successfully");
      setIsLoading(false);
      return data;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten beim Generieren der Antwort.';
      console.error("Error in unified medical LLM:", errorMessage);
      setError(errorMessage);
      
      if (onError) onError(errorMessage);
      else toast.error(errorMessage);
      
      setIsLoading(false);
      
      // Return fallback response
      const fallbackResponses = {
        'patient-care': "Entschuldigung, ich habe Sie nicht verstanden. Können Sie das bitte wiederholen?",
        'emergency': "Ich brauche Hilfe! Können Sie mir bitte helfen?",
        'handover': "Könnten Sie die Information bitte wiederholen?",
        'elderly-care': "Wie bitte? Ich habe Sie nicht ganz verstanden.",
        'disability-care': "Ich verstehe nicht. Können Sie das einfacher sagen?"
      };
      
      return {
        patientReply: fallbackResponses[scenarioType] || "Entschuldigung, ich konnte keine Antwort generieren.",
        briefFeedback: "Sorry, I couldn't generate feedback at this time.",
        suggestionForNext: "Try to rephrase your response or ask a clarifying question.",
        progressUpdate: {
          completedGoals: 0,
          totalGoals: 7,
          currentObjective: "Continue the conversation"
        },
        scenarioType,
        timestamp: new Date().toISOString()
      };
    }
  }, [scenarioType, scenarioDescription, difficultyLevel, patientContext, userLanguage, onError]);

  const reset = useCallback(() => {
    setError(null);
    setCurrentPatientProfile(null);
  }, []);

  return {
    generateUnifiedResponse,
    currentPatientProfile,
    isLoading,
    error,
    reset,
    testConnection
  };
};

export default useUnifiedMedicalLLM;
