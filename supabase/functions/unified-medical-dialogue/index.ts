
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

interface DialogueLine {
  speaker: 'user' | 'patient' | 'doctor' | 'colleague';
  text: string;
  translation?: string;
}

interface PatientProfile {
  name?: string;
  age?: number;
  condition?: string;
  mood?: string;
  personality?: string;
  medicalHistory?: string;
  communicationStyle?: string;
}

interface UnifiedRequest {
  userMessage: string;
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  conversationHistory: DialogueLine[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: PatientProfile;
  userLanguage?: string;
}

interface UnifiedResponse {
  patientReply: string;
  briefFeedback?: string;
  suggestionForNext?: string;
  progressUpdate: {
    completedGoals: number;
    totalGoals: number;
    currentObjective: string;
    isComplete: boolean;
  };
  conversationComplete?: boolean;
  performanceInsights?: string;
  patientProfile?: {
    name: string;
    mood: string;
    personality: string;
  };
  scenarioType: string;
  timestamp: string;
}

const createPatientProfile = (scenarioType: string, patientContext?: PatientProfile): PatientProfile => {
  const baseProfiles = {
    'patient-care': {
      personality: 'höflich aber manchmal besorgt',
      communicationStyle: 'direkt aber respektvoll',
      mood: 'leicht ängstlich'
    },
    'emergency': {
      personality: 'gestresst und ängstlich',
      communicationStyle: 'kurz und direkt durch Stress',
      mood: 'panisch oder schmerzerfüllt'
    },
    'handover': {
      personality: 'professionell und sachlich',
      communicationStyle: 'medizinisch präzise',
      mood: 'konzentriert'
    },
    'elderly-care': {
      personality: 'freundlich aber manchmal verwirrt',
      communicationStyle: 'langsam und bedacht',
      mood: 'nostalgisch oder unsicher'
    },
    'disability-care': {
      personality: 'freundlich aber unsicher',
      communicationStyle: 'einfach und direkt',
      mood: 'hilfesuchend'
    }
  };

  const baseProfile = baseProfiles[scenarioType] || baseProfiles['patient-care'];
  
  return {
    ...baseProfile,
    ...patientContext,
    name: patientContext?.name || 'Patient',
    age: patientContext?.age || 45,
    condition: patientContext?.condition || 'allgemeine Untersuchung'
  };
};

const getDialogueSystemPrompt = (
  scenarioType: string, 
  scenarioDescription: string, 
  difficultyLevel: string, 
  patientProfile: PatientProfile,
  conversationHistory: DialogueLine[]
) => {
  const basePrompt = `Du bist ein erfahrener Schauspieler, der verschiedene Rollen in deutschen medizinischen Szenarien spielt. Du antwortest IMMER auf Deutsch und bleibst KONSEQUENT in deiner Rolle während des GESAMTEN Gesprächs.

SZENARIO: ${scenarioDescription}
SCHWIERIGKEITSGRAD: ${difficultyLevel}
SZENARIO-TYP: ${scenarioType}

PATIENTENPROFIL:
- Name: ${patientProfile.name}
- Alter: ${patientProfile.age}
- Zustand: ${patientProfile.condition}
- Persönlichkeit: ${patientProfile.personality}
- Kommunikationsstil: ${patientProfile.communicationStyle}
- Aktuelle Stimmung: ${patientProfile.mood}`;

  const rolePrompts = {
    'patient-care': `Du spielst einen Patienten in einem deutschen Krankenhaus. Du bist ${patientProfile.personality}. Stelle gelegentlich Fragen über deine Behandlung oder Medikamente. WICHTIG: Du bleibst IMMER ein Patient, nie ein Arzt oder Kollege.`,
    'emergency': `Du spielst einen Patienten in einer Notfallsituation. Du bist ${patientProfile.personality} und antwortest ${patientProfile.communicationStyle}. WICHTIG: Du bleibst IMMER ein Patient in Not, nie ein medizinischer Fachmann.`,
    'handover': `Du spielst einen Kollegen (Arzt oder Pflegekraft) bei der Schichtübergabe. Du bist ${patientProfile.personality} und kommunizierst ${patientProfile.communicationStyle}. WICHTIG: Du bleibst IMMER ein medizinischer Kollege, nie ein Patient.`,
    'elderly-care': `Du spielst einen älteren Bewohner (${patientProfile.age} Jahre) in einem Pflegeheim. Du bist ${patientProfile.personality} und sprichst ${patientProfile.communicationStyle}. WICHTIG: Du bleibst IMMER ein älterer Bewohner, nie Personal.`,
    'disability-care': `Du spielst einen Bewohner mit geistiger Behinderung. Du bist ${patientProfile.personality} und kommunizierst ${patientProfile.communicationStyle}. WICHTIG: Du bleibst IMMER ein Bewohner mit Behinderung, nie Personal.`
  };

  const difficultyInstructions = {
    'beginner': 'Verwende einfache, klare Sprache. Sprich langsam und deutlich.',
    'intermediate': 'Verwende normales medizinisches Fachvokabular.',
    'advanced': 'Verwende authentisches medizinisches Fachvokabular und komplexere Satzstrukturen.'
  };

  // Check conversation length and add ending instructions
  const turnCount = conversationHistory.length;
  let endingInstructions = '';
  
  if (turnCount >= 8) {
    endingInstructions = '\nWICHTIG: Das Gespräch nähert sich seinem natürlichen Ende. Wenn alle wichtigen Punkte besprochen wurden, bringe das Gespräch zu einem angemessenen Abschluss (z.B. "Vielen Dank für das Gespräch" oder "Ich denke, wir haben alles Wichtige besprochen").';
  }

  // Add persona consistency reminder based on conversation history
  let consistencyReminder = '';
  if (conversationHistory.length > 2) {
    const firstRole = conversationHistory[1]?.speaker || 'patient';
    consistencyReminder = `\nWICHTIG: Du hast als ${firstRole} begonnen und MUSST diese Rolle bis zum Ende des Gesprächs beibehalten. Wechsle NIEMALS die Rolle!`;
  }

  return `${basePrompt}

ROLLENVERHALTEN:
${rolePrompts[scenarioType] || rolePrompts['patient-care']}

SPRACHLICHE ANFORDERUNGEN:
${difficultyInstructions[difficultyLevel] || difficultyInstructions['intermediate']}

WICHTIGE REGELN:
- Antworte IMMER auf Deutsch
- Bleibe konsequent in deiner Rolle
- Halte Antworten zwischen 1-2 Sätzen
- Sei authentisch und natürlich
- Wechsle NIEMALS die Rolle während des Gesprächs${consistencyReminder}${endingInstructions}`;
};

const getFeedbackSystemPrompt = (userLanguage: string = 'en', wasQuickReply: boolean = false) => {
  const prompts = {
    'en': `You are a German language tutor for medical professionals. Provide VERY BRIEF feedback (maximum 1 sentence) ONLY for significant grammatical errors or medical communication issues. 
    
IMPORTANT RULES:
- If the response is grammatically correct, say "Good German!" or give brief positive feedback
- Do NOT provide feedback on punctuation unless it's a serious error
- Do NOT suggest improvements to phrases that are already correct
- If this was a suggested quick reply${wasQuickReply ? ' (which it was)' : ''}, do NOT criticize it
- Focus only on major errors that would confuse meaning
- Use English for feedback.`,
    
    'de': `Du bist ein Deutschlehrer für medizinische Fachkräfte. Gib NUR SEHR KURZES Feedback (maximal 1 Satz) und NUR bei wichtigen grammatischen Fehlern oder medizinischen Kommunikationsproblemen.
    
WICHTIGE REGELN:
- Bei korrekten Antworten sage "Gutes Deutsch!" oder gib kurze positive Rückmeldung
- Gib KEINE Rückmeldung zu Interpunktion, außer bei schweren Fehlern
- Schlage KEINE Verbesserungen für bereits korrekte Phrasen vor
- Falls dies eine vorgeschlagene Schnellantwort war${wasQuickReply ? ' (was der Fall war)' : ''}, kritisiere sie NICHT
- Konzentriere dich nur auf große Fehler, die die Bedeutung verwirren würden
- Verwende Deutsch für das Feedback.`
  };
  
  return prompts[userLanguage] || prompts['en'];
};

const getContextAwareSuggestion = (scenarioType: string, conversationHistory: DialogueLine[]): string => {
  const turnCount = conversationHistory.length;
  const lastUserMessage = conversationHistory[conversationHistory.length - 1]?.text || '';
  const lastPatientMessage = conversationHistory[conversationHistory.length - 2]?.text || '';

  // Dynamic suggestions based on conversation phase and content
  const suggestionsByPhase = {
    'patient-care': {
      opening: ["Begrüßen Sie den Patienten höflich", "Stellen Sie sich vor", "Fragen Sie nach dem Befinden"],
      middle: ["Fragen Sie nach spezifischen Symptomen", "Hören Sie empathisch zu", "Erklären Sie die nächsten Schritte"],
      closing: ["Fassen Sie das Gespräch zusammen", "Fragen Sie nach offenen Fragen", "Verabschieden Sie sich freundlich"]
    },
    'emergency': {
      opening: ["Beruhigen Sie den Patienten", "Erfassen Sie die Situation schnell", "Fragen Sie nach Schmerzen"],
      middle: ["Priorisieren Sie Lebenswichtige Funktionen", "Geben Sie klare Anweisungen", "Überprüfen Sie Allergien"],
      closing: ["Informieren Sie über weitere Schritte", "Übergeben Sie an Kollegen", "Dokumentieren Sie wichtige Infos"]
    },
    'handover': {
      opening: ["Beginnen Sie mit Patientendaten", "Nennen Sie den aktuellen Zustand", "Erwähnen Sie wichtige Ereignisse"],
      middle: ["Diskutieren Sie Medikation", "Besprechen Sie Besonderheiten", "Klären Sie offene Punkte"],
      closing: ["Fassen Sie Aufgaben zusammen", "Besprechen Sie Prioritäten", "Bestätigen Sie Übergabe"]
    },
    'elderly-care': {
      opening: ["Sprechen Sie langsam und deutlich", "Zeigen Sie Geduld und Respekt", "Fragen Sie nach Wohlbefinden"],
      middle: ["Erklären Sie Dinge einfach", "Wiederholen Sie wichtige Punkte", "Hören Sie aufmerksam zu"],
      closing: ["Versichern Sie sich des Verständnisses", "Bieten Sie Hilfe an", "Verabschieden Sie sich warmherzig"]
    },
    'disability-care': {
      opening: ["Verwenden Sie einfache Sprache", "Sprechen Sie direkt mit der Person", "Zeigen Sie Respekt und Geduld"],
      middle: ["Fragen Sie nach, ob alles verstanden wurde", "Bieten Sie Hilfe an", "Erklären Sie Schritt für Schritt"],
      closing: ["Überprüfen Sie das Verständnis", "Bieten Sie weitere Unterstützung an", "Verabschieden Sie sich freundlich"]
    }
  };

  const phase = turnCount <= 4 ? 'opening' : (turnCount <= 10 ? 'middle' : 'closing');
  const suggestions = suggestionsByPhase[scenarioType]?.[phase] || suggestionsByPhase['patient-care'][phase];
  
  // Additional context-aware logic
  if (lastPatientMessage.includes('Schmerz') || lastPatientMessage.includes('weh')) {
    return "Fragen Sie nach der Schmerzstärke von 1-10";
  }
  if (lastPatientMessage.includes('Angst') || lastPatientMessage.includes('Sorge')) {
    return "Bieten Sie Beruhigung und Erklärungen an";
  }
  if (lastPatientMessage.includes('Medikament') || lastPatientMessage.includes('Tablette')) {
    return "Erklären Sie Wirkung und Nebenwirkungen";
  }
  
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  return suggestions[randomIndex];
};

const calculateProgress = (conversationHistory: DialogueLine[], scenarioType: string) => {
  const turnCount = conversationHistory.length;
  
  // Define expected conversation length by scenario type
  const expectedLengths = {
    'patient-care': 12,
    'emergency': 8,
    'handover': 10,
    'elderly-care': 14,
    'disability-care': 12
  };
  
  const expectedLength = expectedLengths[scenarioType] || 12;
  const completedGoals = Math.min(Math.floor(turnCount / 2), 7);
  const isComplete = turnCount >= expectedLength;
  
  const objectives = {
    'patient-care': isComplete ? "Gespräch erfolgreich abgeschlossen" : "Bauen Sie Vertrauen auf und erfassen Sie Patientenbedürfnisse",
    'emergency': isComplete ? "Notfall erfolgreich bearbeitet" : "Stabilisieren Sie den Patienten schnell und effektiv",
    'handover': isComplete ? "Übergabe erfolgreich abgeschlossen" : "Tauschen Sie vollständige Patienteninformationen aus",
    'elderly-care': isComplete ? "Gespräch erfolgreich beendet" : "Bieten Sie einfühlsame, geduldige Betreuung",
    'disability-care': isComplete ? "Betreuung erfolgreich abgeschlossen" : "Kommunizieren Sie klar und bieten Sie Unterstützung"
  };
  
  return {
    completedGoals,
    totalGoals: 7,
    currentObjective: objectives[scenarioType] || objectives['patient-care'],
    isComplete
  };
};

const generatePerformanceInsights = async (conversationHistory: DialogueLine[], scenarioType: string): Promise<string> => {
  const userMessages = conversationHistory.filter(msg => msg.speaker === 'user').map(msg => msg.text);
  
  const insightsPrompt = `Analyze this medical conversation in German and provide a brief performance summary (2-3 sentences) in English:

Scenario Type: ${scenarioType}
User's German responses: ${userMessages.join(' | ')}

Focus on:
- Communication effectiveness
- Medical appropriateness  
- German language quality
- Professional behavior

Provide constructive, encouraging feedback with specific examples.`;

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: insightsPrompt }],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    const result = await response.json();
    return result.choices?.[0]?.message?.content || "Great job completing this scenario! Your communication was professional and appropriate.";
  } catch (error) {
    console.error("Error generating performance insights:", error);
    return "Excellent work! You successfully completed this medical dialogue scenario.";
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("=== Unified Medical Dialogue Function Started ===");
    
    if (!OPENAI_KEY) {
      console.error("CRITICAL: OpenAI API key is not configured");
      throw new Error('OpenAI API key is not configured');
    }

    const requestData: UnifiedRequest = await req.json();
    console.log("Request received:", {
      scenarioType: requestData.scenarioType,
      userMessageLength: requestData.userMessage?.length,
      historyLength: requestData.conversationHistory?.length,
      userLanguage: requestData.userLanguage
    });

    const {
      userMessage,
      scenarioType,
      scenarioDescription,
      conversationHistory = [],
      difficultyLevel = 'intermediate',
      patientContext,
      userLanguage = 'en'
    } = requestData;

    if (!userMessage || !scenarioType) {
      throw new Error('UserMessage and scenarioType are required');
    }

    const patientProfile = createPatientProfile(scenarioType, patientContext);
    console.log("Patient profile created");

    // Check if conversation should end
    const progressUpdate = calculateProgress(conversationHistory, scenarioType);
    
    // Check if this was a quick reply suggestion
    const wasQuickReply = userMessage.includes("Wie fühlen Sie sich") || 
                         userMessage.includes("Können Sie mir") || 
                         userMessage.includes("Haben Sie noch") ||
                         userMessage.includes("Wo tut es") ||
                         userMessage.includes("Bleiben Sie ruhig") ||
                         userMessage.includes("Brauchen Sie Hilfe");

    const dialogueSystemPrompt = getDialogueSystemPrompt(scenarioType, scenarioDescription, difficultyLevel, patientProfile, conversationHistory);
    const feedbackSystemPrompt = getFeedbackSystemPrompt(userLanguage, wasQuickReply);

    const dialogueMessages = [
      { role: "system", content: dialogueSystemPrompt }
    ];

    // Add recent conversation history with role consistency
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach(line => {
      if (line.speaker === 'user') {
        dialogueMessages.push({ role: "user", content: line.text });
      } else {
        dialogueMessages.push({ role: "assistant", content: line.text });
      }
    });

    dialogueMessages.push({ role: "user", content: userMessage });

    const feedbackMessages = [
      { role: "system", content: feedbackSystemPrompt },
      { role: "user", content: `User's German response: "${userMessage}"\n\nScenario context: ${scenarioDescription}\n\nProvide brief feedback (max 1 sentence) or positive reinforcement.` }
    ];

    console.log("Making parallel OpenAI requests");

    // Generate performance insights if conversation is complete
    let performanceInsights: string | undefined;
    if (progressUpdate.isComplete) {
      performanceInsights = await generatePerformanceInsights([...conversationHistory, { speaker: 'user', text: userMessage }], scenarioType);
    }

    // Make both requests in parallel for better performance
    const [dialogueResponse, feedbackResponse] = await Promise.all([
      fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: dialogueMessages,
          temperature: 0.8,
          max_tokens: 150,
          frequency_penalty: 0.3,
          presence_penalty: 0.3
        })
      }),
      fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: feedbackMessages,
          temperature: 0.2,
          max_tokens: 80
        })
      })
    ]);

    if (!dialogueResponse.ok || !feedbackResponse.ok) {
      const dialogueError = !dialogueResponse.ok ? await dialogueResponse.text() : null;
      const feedbackError = !feedbackResponse.ok ? await feedbackResponse.text() : null;
      console.error("OpenAI API Error:", { dialogueError, feedbackError });
      throw new Error(`OpenAI API error: ${dialogueError || feedbackError}`);
    }

    const [dialogueResult, feedbackResult] = await Promise.all([
      dialogueResponse.json(),
      feedbackResponse.json()
    ]);

    if (!dialogueResult.choices?.[0]?.message?.content) {
      console.error("Invalid dialogue response structure:", dialogueResult);
      throw new Error('Invalid dialogue response from OpenAI');
    }

    const patientReply = dialogueResult.choices[0].message.content;
    const briefFeedback = feedbackResult.choices?.[0]?.message?.content || undefined;
    const suggestionForNext = progressUpdate.isComplete ? undefined : getContextAwareSuggestion(scenarioType, [...conversationHistory, { speaker: 'user', text: userMessage }]);

    console.log("Unified response generated successfully");

    const response: UnifiedResponse = {
      patientReply,
      briefFeedback,
      suggestionForNext,
      progressUpdate,
      conversationComplete: progressUpdate.isComplete,
      performanceInsights,
      patientProfile: {
        name: patientProfile.name!,
        mood: patientProfile.mood!,
        personality: patientProfile.personality!
      },
      scenarioType,
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("=== Unified Medical Dialogue Function Error ===");
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    let userMessage = "Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
    
    if (error.message.includes('quota')) {
      userMessage = "Die API-Limits wurden erreicht. Bitte kontaktieren Sie den Administrator.";
    } else if (error.message.includes('API key')) {
      userMessage = "API-Konfigurationsfehler. Bitte kontaktieren Sie den Administrator.";
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        userMessage,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
