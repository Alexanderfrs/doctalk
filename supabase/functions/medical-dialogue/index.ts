
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

interface MedicalDialogueRequest {
  userMessage: string;
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  conversationHistory: DialogueLine[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: PatientProfile;
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

const getSystemPrompt = (
  scenarioType: string, 
  scenarioDescription: string, 
  difficultyLevel: string, 
  patientProfile: PatientProfile
) => {
  const basePrompt = `Du bist ein erfahrener Schauspieler, der verschiedene Rollen in deutschen medizinischen Szenarien spielt. Du antwortest IMMER auf Deutsch und bleibst konsequent in deiner Rolle.

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
    'patient-care': `Du spielst einen Patienten in einem deutschen Krankenhaus. Du bist ${patientProfile.personality}. Stelle gelegentlich Fragen über deine Behandlung oder Medikamente. Reagiere auf Schmerzen oder Unbehagen wenn angemessen.`,
    
    'emergency': `Du spielst einen Patienten in einer Notfallsituation. Du bist ${patientProfile.personality} und antwortest ${patientProfile.communicationStyle}. Zeige deutlich Schmerz oder Unbehagen. Manchmal unterbrichst du oder wiederholst wichtige Informationen.`,
    
    'handover': `Du spielst einen Kollegen (Arzt oder Pflegekraft) bei der Schichtübergabe. Du bist ${patientProfile.personality} und kommunizierst ${patientProfile.communicationStyle}. Stelle relevante medizinische Fragen und gib wichtige Informationen strukturiert weiter.`,
    
    'elderly-care': `Du spielst einen älteren Bewohner (${patientProfile.age} Jahre) in einem Pflegeheim. Du bist ${patientProfile.personality} und sprichst ${patientProfile.communicationStyle}. Erwähne gelegentlich Familie, Vergangenheit oder vergiss kurzzeitig worum es geht.`,
    
    'disability-care': `Du spielst einen Bewohner mit geistiger Behinderung. Du bist ${patientProfile.personality} und kommunizierst ${patientProfile.communicationStyle}. Verwende einfache Sätze und manchmal begrenztes Vokabular. Wiederhole wichtige Informationen.`
  };

  const difficultyInstructions = {
    'beginner': 'Verwende einfache, klare Sprache. Sprich langsam und deutlich. Wiederhole wichtige medizinische Begriffe.',
    'intermediate': 'Verwende normales medizinisches Fachvokabular. Erkläre komplexe Begriffe wenn nötig.',
    'advanced': 'Verwende authentisches medizinisches Fachvokabular und komplexere Satzstrukturen. Nutze regionale Ausdrücke.'
  };

  return `${basePrompt}

ROLLENVERHALTEN:
${rolePrompts[scenarioType] || rolePrompts['patient-care']}

SPRACHLICHE ANFORDERUNGEN:
${difficultyInstructions[difficultyLevel] || difficultyInstructions['intermediate']}

WICHTIGE REGELN:
- Antworte IMMER auf Deutsch
- Bleibe konsequent in deiner Rolle und Persönlichkeit
- Halte Antworten zwischen 1-3 Sätzen (je nach Situation)
- Sei authentisch und natürlich
- Reagiere angemessen auf medizinische Situationen
- Verwende keine englischen Begriffe
- Zeige Emotionen entsprechend deiner Stimmung: ${patientProfile.mood}
- Behalte deinen Kommunikationsstil bei: ${patientProfile.communicationStyle}`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("=== Medical Dialogue Function Started ===");
    
    if (!OPENAI_KEY) {
      console.error("CRITICAL: OpenAI API key is not configured");
      throw new Error('OpenAI API key is not configured. Please add OPENAI_API_KEY to Supabase secrets.');
    }

    const requestData: MedicalDialogueRequest = await req.json();
    console.log("Request received:", {
      scenarioType: requestData.scenarioType,
      userMessageLength: requestData.userMessage?.length,
      historyLength: requestData.conversationHistory?.length,
      difficultyLevel: requestData.difficultyLevel
    });

    const {
      userMessage,
      scenarioType,
      scenarioDescription,
      conversationHistory = [],
      difficultyLevel = 'intermediate',
      patientContext
    } = requestData;

    if (!userMessage || !scenarioType) {
      throw new Error('UserMessage and scenarioType are required');
    }

    // Create enhanced patient profile
    const patientProfile = createPatientProfile(scenarioType, patientContext);
    console.log("Patient profile created:", patientProfile);

    const systemPrompt = getSystemPrompt(scenarioType, scenarioDescription, difficultyLevel, patientProfile);

    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    // Add conversation history (last 8 messages for better context)
    const recentHistory = conversationHistory.slice(-8);
    recentHistory.forEach(line => {
      if (line.speaker === 'user') {
        messages.push({
          role: "user",
          content: line.text
        });
      } else {
        messages.push({
          role: "assistant",
          content: line.text
        });
      }
    });

    // Add current user message
    messages.push({
      role: "user",
      content: userMessage
    });

    console.log("Sending request to OpenAI with", messages.length, "messages");

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.8,
        max_tokens: 200,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error("Invalid OpenAI response structure:", result);
      throw new Error('Invalid response structure from OpenAI');
    }

    const aiResponse = result.choices[0].message.content;
    console.log("OpenAI response received successfully, length:", aiResponse.length);

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        scenarioType,
        patientProfile: {
          name: patientProfile.name,
          mood: patientProfile.mood,
          personality: patientProfile.personality
        },
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("=== Medical Dialogue Function Error ===");
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Provide specific error messages based on error type
    let userMessage = "Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
    
    if (error.message.includes('quota')) {
      userMessage = "Die API-Limits wurden erreicht. Bitte kontaktieren Sie den Administrator.";
    } else if (error.message.includes('API key')) {
      userMessage = "API-Konfigurationsfehler. Bitte kontaktieren Sie den Administrator.";
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      userMessage = "Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.";
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
