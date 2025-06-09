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

interface MedicalDialogueRequest {
  userMessage: string;
  scenarioType: 'patient-care' | 'emergency' | 'handover' | 'elderly-care' | 'disability-care';
  scenarioDescription: string;
  conversationHistory: DialogueLine[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  patientContext?: {
    name?: string;
    age?: number;
    condition?: string;
    mood?: string;
  };
}

const getSystemPrompt = (scenarioType: string, scenarioDescription: string, difficultyLevel: string, patientContext?: any) => {
  const basePrompt = `Du bist ein erfahrener Schauspieler, der verschiedene Rollen in deutschen medizinischen Szenarien spielt. Du antwortest IMMER auf Deutsch und bleibst in deiner Rolle.

Szenario: ${scenarioDescription}
Schwierigkeitsgrad: ${difficultyLevel}
Szenario-Typ: ${scenarioType}`;

  const rolePrompts = {
    'patient-care': `Du spielst einen Patienten in einem deutschen Krankenhaus. Du bist höflich aber manchmal besorgt oder ängstlich. Stelle gelegentlich Fragen über deine Behandlung oder Medikamente.`,
    'emergency': `Du spielst einen Patienten in einer Notfallsituation. Du bist gestresst, möglicherweise verängstigt, und antwortest kurz und direkt. Zeige Schmerz oder Unbehagen wenn angemessen.`,
    'handover': `Du spielst einen Kollegen (Arzt oder Pflegekraft) bei der Schichtübergabe. Du bist professionell, stellst relevante Fragen und gibst wichtige medizinische Informationen weiter.`,
    'elderly-care': `Du spielst einen älteren Bewohner in einem Pflegeheim. Du bist manchmal verwirrt, freundlich aber auch eigensinnig. Erwähne gelegentlich Familie oder Vergangenheit.`,
    'disability-care': `Du spielst einen Bewohner mit geistiger Behinderung. Du antwortest einfach und direkt, manchmal mit begrenztem Wortschatz. Du bist freundlich aber manchmal unsicher.`
  };

  const difficultyInstructions = {
    'beginner': 'Verwende einfache, klare Sprache. Sprich langsam und deutlich.',
    'intermediate': 'Verwende normales medizinisches Fachvokabular, aber erkläre komplexe Begriffe.',
    'advanced': 'Verwende authentisches medizinisches Fachvokabular und komplexere Satzstrukturen.'
  };

  let contextInfo = '';
  if (patientContext) {
    contextInfo = `
Patientendetails:
${patientContext.name ? `Name: ${patientContext.name}` : ''}
${patientContext.age ? `Alter: ${patientContext.age}` : ''}
${patientContext.condition ? `Zustand: ${patientContext.condition}` : ''}
${patientContext.mood ? `Stimmung: ${patientContext.mood}` : ''}`;
  }

  return `${basePrompt}

${rolePrompts[scenarioType] || rolePrompts['patient-care']}

${difficultyInstructions[difficultyLevel] || difficultyInstructions['intermediate']}

${contextInfo}

Wichtige Regeln:
- Antworte IMMER auf Deutsch
- Bleibe in deiner Rolle
- Halte Antworten unter 3 Sätzen
- Sei authentisch und natürlich
- Reagiere angemessen auf medizinische Situationen
- Verwende keine englischen Begriffe`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      userMessage,
      scenarioType,
      scenarioDescription,
      conversationHistory,
      difficultyLevel,
      patientContext
    }: MedicalDialogueRequest = await req.json();

    if (!userMessage || !scenarioType) {
      throw new Error('UserMessage and scenarioType are required');
    }

    if (!OPENAI_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log(`Processing medical dialogue request for scenario: ${scenarioType}`);

    const systemPrompt = getSystemPrompt(scenarioType, scenarioDescription, difficultyLevel, patientContext);

    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    // Add conversation history (last 6 messages to keep context manageable)
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach(line => {
      if (line.speaker === 'user') {
        messages.push({
          role: "assistant",
          content: line.text
        });
      } else {
        messages.push({
          role: "user",
          content: line.text
        });
      }
    });

    // Add current user message
    messages.push({
      role: "user",
      content: userMessage
    });

    console.log("Sending request to OpenAI");

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
      const errorData = await response.text();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const result = await response.json();
    const aiResponse = result.choices[0].message.content;

    console.log("Medical dialogue response generated successfully");

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        scenarioType,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in medical dialogue function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: "Failed to generate medical dialogue response. Please try again." 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
