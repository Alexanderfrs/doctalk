
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

    console.log("Processing AI feedback request");

    // Format conversation history for the AI
    const messages = [
      {
        role: "system",
        content: `You are a helpful German language tutor for healthcare professionals. 
        You provide feedback on learners' responses in medical scenarios.
        
        You should evaluate:
        1. Grammar and vocabulary usage
        2. Professional tone and appropriateness
        3. Clinical accuracy (if applicable)
        4. Suggest improvements
        
        Be encouraging but thorough. Focus on helping the learner improve their German language skills specifically for healthcare contexts.
        
        Additional context about this scenario: ${scenarioContext || "A healthcare professional speaking with a patient or colleague."}`
      }
    ];

    // Add the conversation history
    conversation.forEach(message => {
      const role = message.speaker === "user" ? "user" : "assistant";
      messages.push({
        role,
        content: message.text
      });
    });

    // Add the user's latest response
    messages.push({
      role: "user",
      content: `Please evaluate my response in German: "${userResponse}"`
    });

    console.log("Sending request to OpenAI");

    // Send to OpenAI
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

    // Return the AI response
    return new Response(
      JSON.stringify({ feedback }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in AI feedback function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
