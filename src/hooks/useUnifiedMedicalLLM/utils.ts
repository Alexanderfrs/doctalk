
import { UnifiedResponse } from "./types";

export const createFallbackResponse = (scenarioType: string): UnifiedResponse => {
  const fallbackResponses = {
    'patient-care': "Entschuldigung, ich habe Sie nicht verstanden. Können Sie das bitte wiederholen?",
    'emergency': "Ich brauche Hilfe! Können Sie mir bitte helfen?",
    'handover': "Könnten Sie die Information bitte wiederholen?",
    'elderly-care': "Wie bitte? Ich habe Sie nicht ganz verstanden.",
    'disability-care': "Ich verstehe nicht. Können Sie das einfacher sagen?"
  };
  
  return {
    patientReply: fallbackResponses[scenarioType as keyof typeof fallbackResponses] || "Entschuldigung, ich konnte keine Antwort generieren.",
    briefFeedback: "Sorry, I couldn't generate feedback at this time.",
    suggestionForNext: "Try to rephrase your response or ask a clarifying question.",
    progressUpdate: {
      completedGoals: 0,
      totalGoals: 7,
      currentObjective: "Continue the conversation",
      isComplete: false
    },
    scenarioType,
    timestamp: new Date().toISOString()
  };
};

export const validateUserInput = (userInput: string): void => {
  if (!userInput.trim()) {
    throw new Error('Bitte geben Sie eine Nachricht ein.');
  }
};
