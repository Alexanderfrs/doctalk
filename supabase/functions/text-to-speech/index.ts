
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');

// German voices optimized for medical dialogue
const GERMAN_VOICES = {
  'patient': 'EXAVITQu4vr4xnSDxMaL', // Sarah - warm, patient-like
  'doctor': 'onwK4e9ZLuTAKqWW03F9', // Daniel - professional, authoritative
  'colleague': 'XB0fDUnXU5powFXDhCwa', // Charlotte - friendly, collaborative
  'user': 'EXAVITQu4vr4xnSDxMaL' // Default to Sarah
};

// Model configurations with cost optimization
const TTS_MODELS = {
  'turbo': {
    id: 'eleven_turbo_v2_5',
    name: 'Turbo (Fast & Economical)',
    cost: 'low'
  },
  'multilingual': {
    id: 'eleven_multilingual_v2',
    name: 'Multilingual (High Quality)',
    cost: 'high'
  },
  'monolingual': {
    id: 'eleven_monolingual_v1',
    name: 'English Only (Basic)',
    cost: 'low'
  }
};

// Optimize text for TTS to reduce costs
function optimizeTextForTTS(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Remove extra whitespace
    .replace(/\.{2,}/g, '.') // Replace multiple dots with single
    .substring(0, 1000); // Limit length to control costs
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, speaker = 'user', language = 'de', model = 'turbo' } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ 
          error: 'TEXT_REQUIRED',
          message: 'Text ist erforderlich' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'API_KEY_MISSING',
          message: 'ElevenLabs API-Schlüssel ist nicht konfiguriert' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Optimize text and validate length
    const optimizedText = optimizeTextForTTS(text);
    if (optimizedText.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'TEXT_TOO_SHORT',
          message: 'Text ist zu kurz oder leer' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing TTS - Model: ${model}, Speaker: ${speaker}, Text length: ${optimizedText.length}`);

    // Select model and voice
    const selectedModel = TTS_MODELS[model] || TTS_MODELS['turbo'];
    const voiceId = GERMAN_VOICES[speaker] || GERMAN_VOICES['user'];

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: optimizedText,
        model_id: selectedModel.id,
        voice_settings: {
          stability: model === 'turbo' ? 0.5 : 0.6, // Less processing for turbo
          similarity_boost: model === 'turbo' ? 0.7 : 0.8,
          style: 0.2,
          use_speaker_boost: model !== 'monolingual'
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API Error:", response.status, errorText);
      
      // Handle specific error types
      if (response.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: 'QUOTA_EXCEEDED',
            message: 'ElevenLabs-Kontingent aufgebraucht. Bitte API-Schlüssel überprüfen oder Credits aufladen.' 
          }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'RATE_LIMITED',
            message: 'Zu viele Anfragen. Bitte einen Moment warten.' 
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            error: 'API_ERROR',
            message: `ElevenLabs API-Fehler: ${response.status}` 
          }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    );

    console.log(`German TTS audio generated successfully with ${selectedModel.name}`);

    return new Response(
      JSON.stringify({ 
        audioContent: base64Audio,
        model: selectedModel.name,
        cost: selectedModel.cost,
        textLength: optimizedText.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error in text-to-speech function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'INTERNAL_ERROR',
        message: "Interner Server-Fehler bei der Sprachgenerierung" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
