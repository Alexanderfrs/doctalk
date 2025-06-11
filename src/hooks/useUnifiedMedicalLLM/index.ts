
import { useState, useCallback } from 'react';
import { DialogueLine } from '@/data/scenarios';
import { toast } from 'sonner';
import { 
  UnifiedMedicalLLMOptions, 
  UseUnifiedMedicalLLMReturn, 
  PatientProfile, 
  UnifiedResponse 
} from './types';
import { UnifiedMedicalLLMService } from './apiService';
import { createFallbackResponse, validateUserInput } from './utils';

const useUnifiedMedicalLLM = ({
  scenarioType,
  scenarioDescription,
  difficultyLevel = 'intermediate',
  patientContext,
  userLanguage = 'en',
  onError,
  onConversationComplete,
}: UnifiedMedicalLLMOptions): UseUnifiedMedicalLLMReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPatientProfile, setCurrentPatientProfile] = useState<PatientProfile | null>(null);
  const [isConversationComplete, setIsConversationComplete] = useState<boolean>(false);

  const testConnection = useCallback(async (): Promise<boolean> => {
    return UnifiedMedicalLLMService.testConnection();
  }, []);

  const generateUnifiedResponse = useCallback(async (
    userInput: string,
    conversationHistory: DialogueLine[] = []
  ): Promise<UnifiedResponse> => {
    if (isConversationComplete) {
      throw new Error('Conversation has already ended');
    }

    setIsLoading(true);
    setError(null);

    try {
      validateUserInput(userInput);

      console.log(`Generating unified medical dialogue response for scenario: ${scenarioType}`);

      const data = await UnifiedMedicalLLMService.generateResponse(
        userInput,
        conversationHistory,
        {
          scenarioType,
          scenarioDescription,
          difficultyLevel,
          patientContext,
          userLanguage
        }
      );

      // Update patient profile if received
      if (data.patientProfile) {
        setCurrentPatientProfile(data.patientProfile);
      }

      // Handle conversation completion
      if (data.conversationComplete && data.performanceInsights) {
        setIsConversationComplete(true);
        if (onConversationComplete) {
          onConversationComplete(data.performanceInsights);
        }
        toast.success("Gespräch abgeschlossen! Leistungsbericht verfügbar.");
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
      
      return createFallbackResponse(scenarioType);
    }
  }, [scenarioType, scenarioDescription, difficultyLevel, patientContext, userLanguage, onError, onConversationComplete, isConversationComplete]);

  const reset = useCallback(() => {
    setError(null);
    setCurrentPatientProfile(null);
    setIsConversationComplete(false);
  }, []);

  return {
    generateUnifiedResponse,
    currentPatientProfile,
    isLoading,
    error,
    reset,
    testConnection,
    isConversationComplete
  };
};

export default useUnifiedMedicalLLM;
