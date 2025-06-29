
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, MessageCircle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import TTSSettings from "./TTSSettings";
import TTSButton from "./TTSButton";
import { useTTS } from "@/contexts/TTSContext";

interface Message {
  id: string;
  speaker: 'user' | 'patient' | 'doctor' | 'colleague';
  text: string;
  timestamp: Date;
  isAI?: boolean;
}

interface StreamlinedInteractionScreenProps {
  scenario: any;
  onSendMessage: (message: string) => void;
  aiResponse?: string;
  isAIResponding?: boolean;
  onBack?: () => void;
  onExit?: () => void;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  onSendMessage,
  aiResponse,
  isAIResponding = false,
  onBack,
  onExit
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAIMessageRef = useRef<string>('');
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

  const { speak, isEnabled: ttsEnabled, quotaExceeded, currentModel } = useTTS();

  // Voice recognition for transcription
  const { 
    isListening: isTranscribing,
    startListening: startTranscribing,
    stopListening: stopTranscribing,
    resetText: resetTranscriptionText,
    hasRecognitionSupport,
    error: transcriptionError
  } = useVoiceRecognition({
    language: 'de-DE',
    continuous: false,
    interimResults: true,
    onResult: (result, isFinal) => {
      if (isFinal) {
        setMessage(prev => {
          const newText = prev ? `${prev} ${result}` : result;
          return newText;
        });
        resetTranscriptionText();
      }
    },
    onError: (error) => {
      console.error("Voice transcription error:", error);
      toast.error("Spracherkennung fehlgeschlagen: " + error);
    }
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
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        speaker: 'patient',
        text: aiResponse,
        timestamp: new Date(),
        isAI: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Auto-play TTS for AI response
      if (ttsEnabled && !quotaExceeded) {
        if (autoPlayTimeoutRef.current) {
          clearTimeout(autoPlayTimeoutRef.current);
        }
        
        autoPlayTimeoutRef.current = setTimeout(() => {
          speak(aiResponse, 'patient', currentModel);
        }, 500);
      }
      
      lastAIMessageRef.current = aiResponse;
    }
  }, [aiResponse, speak, ttsEnabled, currentModel, quotaExceeded]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      speaker: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    onSendMessage(message);
    setMessage("");
  };

  const toggleTranscription = async () => {
    if (isTranscribing) {
      stopTranscribing();
    } else {
      try {
        await startTranscribing();
        toast.info("Sprechen Sie jetzt...");
      } catch (error) {
        console.error("Failed to start voice transcription:", error);
        toast.error("Spracherkennung konnte nicht gestartet werden");
      }
    }
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
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-medical-800">{scenario?.title}</h1>
              <p className="text-medical-600">{scenario?.description}</p>
            </div>
          </div>
          <TTSSettings />
        </div>

        {/* Main Chat Interface */}
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-medical-600" />
              <CardTitle className="text-lg">Medizinisches Gespräch</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Initial scenario message */}
              {messages.length === 0 && (
                <div className="bg-blue-50 mr-8 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Szenario
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {scenario?.initialMessage || "Beginnen Sie das Gespräch..."}
                  </p>
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col space-y-2 p-3 rounded-lg",
                    msg.speaker === 'user' 
                      ? "bg-medical-50 ml-8" 
                      : "bg-gray-50 mr-8"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={getSpeakerBadgeColor(msg.speaker)}
                    >
                      {getSpeakerName(msg.speaker)}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <TTSButton
                        textToRead={msg.text}
                        speaker={msg.speaker}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      />
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString('de-DE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed">{msg.text}</p>
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
            <div className="border-t p-4">
              <div className="flex w-full items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Ihre Nachricht eingeben..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[80px] resize-none"
                    disabled={isAIResponding}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  {transcriptionError && (
                    <p className="text-xs text-red-500 mt-1">
                      {transcriptionError}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  {/* Voice transcription button */}
                  {hasRecognitionSupport && (
                    <Button 
                      variant={isTranscribing ? "destructive" : "outline"}
                      size="sm" 
                      onClick={toggleTranscription}
                      disabled={isAIResponding}
                      className="touch-action-manipulation h-10 w-10 p-0"
                      aria-label={isTranscribing ? "Transkription stoppen" : "Transkription starten"}
                      title="Sprache zu Text"
                    >
                      {isTranscribing ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  
                  {/* Send button */}
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    disabled={isAIResponding || !message.trim()}
                    className="touch-action-manipulation bg-medical-600 hover:bg-medical-700 h-10 w-10 p-0"
                    aria-label="Senden"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StreamlinedInteractionScreen;
