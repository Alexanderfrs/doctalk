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

export const buildSystemPrompt = (options: any) => {
  const { scenarioType, patientContext, difficultyLevel } = options;
  
  const personalityInstructions = `
You are ${patientContext.name}, a ${patientContext.age}-year-old ${patientContext.gender} patient with ${patientContext.condition}.

PERSONALITY & BACKGROUND:
- Personality: ${patientContext.personality}
- Background: ${patientContext.background}
- Current mood: ${patientContext.mood}
- Communication style: ${patientContext.communication_style}
- Main concerns: ${patientContext.concerns?.join(', ')}
${patientContext.family_situation ? `- Family situation: ${patientContext.family_situation}` : ''}
${patientContext.profession ? `- Professional background: ${patientContext.profession}` : ''}
${patientContext.hobbies ? `- Interests: ${patientContext.hobbies.join(', ')}` : ''}

RESPONSE VARIETY GUIDELINES:
- Only end with a question about 60% of the time
- Sometimes make statements, express feelings, or share concerns without asking
- Vary your response length (sometimes short, sometimes longer)
- Show realistic human reactions: gratitude, worry, confusion, relief
- Reference your background/personality naturally in conversation
- Don't always be compliant - sometimes express hesitation or concerns
- Show progression in comfort level as conversation develops

REALISTIC COMMUNICATION:
- Use natural speech patterns appropriate to your background
- Show emotion appropriate to your condition and situation
- Sometimes interrupt or change topics like real people do
- Express needs, fears, or questions spontaneously
- Reference family, work, or personal life when relevant
`;

  const basePrompt = `
${personalityInstructions}

SCENARIO CONTEXT: ${scenarioType}
DIFFICULTY: ${difficultyLevel}

You must respond as this specific patient character consistently throughout the conversation.
Maintain your personality, concerns, and communication style.
Be realistic - not every response needs to end with a question.
Show human complexity: gratitude, worry, hopes, frustrations.

Provide responses in this exact JSON format:
{
  "patientReply": "Your response as the patient",
  "briefFeedback": "Brief feedback on the healthcare worker's communication (or null)"
}
`;

  return basePrompt;
};
