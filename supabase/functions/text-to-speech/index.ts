
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, speaker = 'user', language = 'de' } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key is not configured');
    }

    console.log(`Processing TTS for speaker: ${speaker}, text: ${text.substring(0, 50)}...`);

    // Select appropriate German voice based on speaker
    const voiceId = GERMAN_VOICES[speaker] || GERMAN_VOICES['user'];

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ElevenLabs API Error:", errorBody);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    );

    console.log("German TTS audio generated successfully");

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error in text-to-speech function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: "Failed to generate German audio. Please check your ElevenLabs API key." 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
