
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { conversation, userResponse, scenarioContext } = await req.json();

    if (!conversation || !userResponse) {
      throw new Error('Conversation and userResponse are required');
    }

    if (!OPENAI_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log("Processing AI feedback request");

    const messages = [
      {
        role: "system",
        content: `You are a German language tutor specializing in medical and healthcare communication.
        Evaluate responses considering:
        1. Grammar and sentence structure
        2. Medical terminology usage
        3. Professional tone and bedside manner
        4. Clinical accuracy
        
        Provide specific, constructive feedback in German with English translations.
        Focus on helping healthcare professionals improve their German language skills.
        
        Context: ${scenarioContext || "A healthcare scenario in German"}`
      }
    ];

    conversation.forEach(message => {
      messages.push({
        role: message.speaker === "user" ? "user" : "assistant",
        content: message.text
      });
    });

    messages.push({
      role: "user",
      content: `Please evaluate my response in German: "${userResponse}"`
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
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const result = await response.json();
    const feedback = result.choices[0].message.content;

    console.log("Feedback generated successfully");

    return new Response(
      JSON.stringify({ feedback }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in AI feedback function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: "Failed to generate feedback. Please try again." 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
