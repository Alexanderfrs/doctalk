
import { supabase } from "@/integrations/supabase/client";
import { UnifiedResponse, UnifiedMedicalLLMOptions } from "./types";
import { DialogueLine } from '@/data/scenarios';

export class UnifiedMedicalLLMService {
  static async testConnection(): Promise<boolean> {
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
  }

  static async generateResponse(
    userInput: string,
    conversationHistory: DialogueLine[],
    options: UnifiedMedicalLLMOptions
  ): Promise<UnifiedResponse> {
    const { data, error } = await supabase.functions.invoke("unified-medical-dialogue", {
      body: {
        userMessage: userInput,
        scenarioType: options.scenarioType,
        scenarioDescription: options.scenarioDescription,
        conversationHistory,
        difficultyLevel: options.difficultyLevel,
        patientContext: options.patientContext || {},
        userLanguage: options.userLanguage
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

    return data;
  }
}
