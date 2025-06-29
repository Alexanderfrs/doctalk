
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Volume2 } from "lucide-react";
import ConversationInput from "../ConversationInput";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import TTSSettings from "../TTSSettings";
import TTSButton from "../TTSButton";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  speaker: 'user' | 'patient' | 'doctor' | 'colleague';
  text: string;
  timestamp: Date;
  isAI?: boolean;
}

interface ConversationTabProps {
  scenario: any;
  onSendMessage: (message: string) => void;
  aiResponse?: string;
  isAIResponding?: boolean;
}

const ConversationTab: React.FC<ConversationTabProps> = ({
  scenario,
  onSendMessage,
  aiResponse,
  isAIResponding = false
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAIMessageRef = useRef<string>('');
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

  const { 
    speak, 
    isSpeaking, 
    isEnabled: ttsEnabled, 
    setEnabled: setTTSEnabled 
  } = useTextToSpeech({
    autoPlay: true,
    onError: (error) => console.error('TTS Error:', error)
  });

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle new AI responses with automatic TTS
  useEffect(() => {
    if (aiResponse && aiResponse !== lastAIMessageRef.current) {
      // Add AI message to conversation
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        speaker: 'patient', // Default AI speaker
        text: aiResponse,
        timestamp: new Date(),
        isAI: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Auto-play TTS for AI response with a small delay
      if (ttsEnabled) {
        // Clear any existing timeout
        if (autoPlayTimeoutRef.current) {
          clearTimeout(autoPlayTimeoutRef.current);
        }
        
        // Set a timeout to auto-play after message is rendered
        autoPlayTimeoutRef.current = setTimeout(() => {
          speak(aiResponse, 'patient');
        }, 500);
      }
      
      lastAIMessageRef.current = aiResponse;
    }
  }, [aiResponse, speak, ttsEnabled]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      speaker: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    onSendMessage(message);
  };

  const getSpeakerBadgeColor = (speaker: string) => {
    switch (speaker) {
      case 'patient': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'doctor': return 'bg-green-100 text-green-800 border-green-200';
      case 'colleague': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpeakerName = (speaker: string) => {
    switch (speaker) {
      case 'patient': return 'Patient';
      case 'doctor': return 'Arzt';
      case 'colleague': return 'Kollege';
      default: return 'Sie';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-medical-600" />
            <CardTitle className="text-lg">Gespräch</CardTitle>
          </div>
          <TTSSettings 
            isEnabled={ttsEnabled}
            onToggle={setTTSEnabled}
          />
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col space-y-2 p-3 rounded-lg",
                  message.speaker === 'user' 
                    ? "bg-medical-50 ml-8" 
                    : "bg-gray-50 mr-8"
                )}
              >
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={getSpeakerBadgeColor(message.speaker)}
                  >
                    {getSpeakerName(message.speaker)}
                  </Badge>
                  
                  <div className="flex items-center space-x-2">
                    <TTSButton
                      textToRead={message.text}
                      speaker={message.speaker}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                    />
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString('de-DE', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            ))}
            
            {/* AI Response Loading */}
            {isAIResponding && (
              <div className="bg-gray-50 mr-8 p-3 rounded-lg">
                <div className="flex items-center space-y-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Patient
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-500">antwortet...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Section */}
          <ConversationInput
            onSendMessage={handleSendMessage}
            disabled={isAIResponding}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationTab;
