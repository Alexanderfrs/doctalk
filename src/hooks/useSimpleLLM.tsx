
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface LLMOptions {
  systemPrompt?: string;
  language?: string;
  onError?: (error: string) => void;
}

interface UseLLMReturn {
  generateResponse: (userInput: string, context?: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

// A simple hook to simulate LLM responses for dialogue exercises
// This can be replaced with a real API call to any LLM service
const useSimpleLLM = ({
  systemPrompt = "Du bist ein medizinischer Assistent, der Pflegekräften hilft, ihr Deutsch zu verbessern.",
  language = 'de-DE',
  onError,
}: LLMOptions = {}): UseLLMReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-defined medical responses for common scenarios
  const medicalResponses = {
    greeting: [
      "Guten Tag, wie kann ich Ihnen helfen?",
      "Hallo, was kann ich für Sie tun?",
      "Grüß Gott, womit kann ich Ihnen behilflich sein?"
    ],
    pain: [
      "Können Sie mir sagen, wo genau die Schmerzen sind?",
      "Auf einer Skala von 0 bis 10, wie stark sind Ihre Schmerzen?",
      "Seit wann haben Sie diese Schmerzen?"
    ],
    medication: [
      "Haben Sie Ihre Medikamente regelmäßig eingenommen?",
      "Haben Sie irgendwelche Nebenwirkungen bemerkt?",
      "Nehmen Sie noch andere Medikamente ein?"
    ],
    vitals: [
      "Ich muss jetzt Ihre Vitalzeichen kontrollieren.",
      "Ich möchte Ihren Blutdruck und Puls messen.",
      "Wir sollten Ihre Temperatur überprüfen."
    ],
    aftercare: [
      "Bitte ruhen Sie sich aus und trinken Sie viel Wasser.",
      "Bei Verschlechterung Ihres Zustands rufen Sie bitte sofort an.",
      "Haben Sie noch Fragen zur Nachsorge?"
    ],
    default: [
      "Könnten Sie das bitte näher erläutern?",
      "Ich verstehe. Erzählen Sie mir mehr darüber.",
      "Das ist wichtig zu wissen. Was ist danach passiert?"
    ]
  };

  // Function to classify user input into categories
  const classifyInput = (input: string): string => {
    input = input.toLowerCase();
    
    if (input.includes('hallo') || input.includes('tag') || input.includes('morgen') || input.includes('abend')) {
      return 'greeting';
    }
    if (input.includes('schmerz') || input.includes('weh') || input.includes('schmerzt')) {
      return 'pain';
    }
    if (input.includes('medikament') || input.includes('tablette') || input.includes('medizin') || input.includes('pille')) {
      return 'medication';
    }
    if (input.includes('blutdruck') || input.includes('puls') || input.includes('temperatur') || input.includes('fieber')) {
      return 'vitals';
    }
    if (input.includes('nachsorge') || input.includes('zuhause') || input.includes('entlassung')) {
      return 'aftercare';
    }
    
    return 'default';
  };

  // Generate a response based on user input
  const generateResponse = useCallback(async (userInput: string, context?: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));

      if (!userInput.trim()) {
        throw new Error('Bitte geben Sie eine Nachricht ein.');
      }

      // Classify the input and get appropriate responses
      const category = classifyInput(userInput);
      const possibleResponses = medicalResponses[category];
      
      // Get a random response from the category
      const responseIndex = Math.floor(Math.random() * possibleResponses.length);
      const response = possibleResponses[responseIndex];

      // If we have context, make the response more personalized
      let finalResponse = response;
      if (context) {
        // Add context-specific details if provided
        const contextPrefix = Math.random() > 0.5 ? 
          "In Bezug auf " + context + ", " : 
          "Was " + context + " betrifft, ";
        
        finalResponse = contextPrefix + response.charAt(0).toLowerCase() + response.slice(1);
      }

      setIsLoading(false);
      return finalResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
      return "Entschuldigung, ich konnte keine Antwort generieren.";
    }
  }, [onError]);

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

export default useSimpleLLM;
