
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, Settings } from "lucide-react";
import { Scenario } from "@/data/scenarios";
import ConversationInput from "./ConversationInput";
import { useUnifiedMedicalLLM } from "@/hooks/useUnifiedMedicalLLM";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { createPatientProfile } from "@/utils/patientProfiles";
import TTSButton from "./TTSButton";
import TTSSettings from "./TTSSettings";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  speaker?: string;
}

interface StreamlinedInteractionScreenProps {
  scenario: Scenario;
  onBack: () => void;
  onExit: () => void;
  onSendMessage?: (message: string) => void;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  onBack,
  onExit,
  onSendMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const patientProfile = createPatientProfile(scenario.category, scenario);

  const { sendMessage, isLoading, error } = useUnifiedMedicalLLM({
    scenario: scenario,
    patientProfile: patientProfile,
    onResponse: (response) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
        speaker: "patient"
      }]);
      setIsTyping(false);
    },
    onError: (error) => {
      console.error("LLM Error:", error);
      toast.error("Fehler beim Verarbeiten der Nachricht: " + error);
      setIsTyping(false);
    }
  });

  useEffect(() => {
    if (scenario) {
      const initialMessage = {
        id: "initial",
        content: `Hallo, ich bin ${patientProfile.name}. ${scenario.initialMessage || "Wie kann ich Ihnen helfen?"}`,
        role: "assistant" as const,
        timestamp: new Date(),
        speaker: "patient"
      };
      setMessages([initialMessage]);
    }
  }, [scenario, patientProfile]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
      speaker: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      await sendMessage(message, messages);
      if (onSendMessage) {
        onSendMessage(message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }
  };

  const handleExit = () => {
    onExit();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {scenario.title}
              </h1>
              <p className="text-sm text-gray-600">
                Patient: {patientProfile.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* TTS Settings */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  TTS
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Sprachausgabe-Einstellungen</h4>
                  <TTSSettings />
                </div>
              </PopoverContent>
            </Popover>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 mx-4 my-4 flex flex-col">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-lg">Gesprächssimulation</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      message.role === "user"
                        ? "bg-medical-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {message.role === "assistant" && (
                        <TTSButton
                          textToRead={message.content}
                          speaker={message.speaker || "patient"}
                          size="sm"
                          variant="ghost"
                          className="ml-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Patient tippt...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <ConversationInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StreamlinedInteractionScreen;
