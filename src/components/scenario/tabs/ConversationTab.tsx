
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2, Volume2, VolumeX, Mic, MicOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogueLine } from "@/data/scenarios";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ResponseGuidance from "../ResponseGuidance";
import FeedbackDisplay from "../FeedbackDisplay";

interface ConversationTabProps {
  conversation: Array<DialogueLine>;
  onUserResponse?: (text: string) => void;
  isProcessingResponse?: boolean;
  suggestion?: string;
  onQuickReply?: (text: string) => void;
  feedback?: string;
  onDismissFeedback?: () => void;
}

const ConversationTab: React.FC<ConversationTabProps> = ({ 
  conversation, 
  onUserResponse,
  isProcessingResponse = false,
  suggestion,
  onQuickReply,
  feedback,
  onDismissFeedback
}) => {
  const { t } = useTranslation();
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Voice synthesis setup
  const { speak, stop, isSpeaking } = useTextToSpeech({
    voice: "Sarah", // Default voice
    onEnd: () => setActiveVoiceId(null),
    onError: (error) => {
      toast.error(`Speech error: ${error}`);
      setActiveVoiceId(null);
    }
  });
  
  // Voice recognition setup
  const { 
    text: recognizedText, 
    isListening,
    startListening,
    stopListening,
    resetText,
    error: recognitionError
  } = useVoiceRecognition({
    language: 'de-DE',
    onResult: (result, isFinal) => {
      if (isFinal && onUserResponse) {
        onUserResponse(result);
      }
    }
  });

  // Automatically scroll to bottom when conversation updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100);
      }
    }
  }, [conversation]);

  // Stop any active speech when recognition starts
  useEffect(() => {
    if (isListening && isSpeaking) {
      stop();
      setActiveVoiceId(null);
    }
  }, [isListening, isSpeaking, stop]);

  // Show errors from speech recognition
  useEffect(() => {
    if (recognitionError) {
      toast.error(recognitionError);
    }
  }, [recognitionError]);

  const handlePlayVoice = async (message: DialogueLine) => {
    if (isSpeaking) {
      stop();
      setActiveVoiceId(null);
      return;
    }
    
    setActiveVoiceId(message.speaker);
    
    try {
      // Use the German text for speech
      await speak(message.text);
    } catch (error) {
      toast.error("Failed to play audio");
      setActiveVoiceId(null);
    }
  };

  const handleStartListening = async () => {
    try {
      await startListening();
    } catch (error) {
      toast.error("Failed to start voice recognition");
    }
  };

  // Determine current scenario type for suggestions
  const getCurrentScenarioType = (): string => {
    // You can determine this from conversation context or pass it as prop
    return 'patient-care'; // Default fallback
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <ScrollArea ref={scrollAreaRef} className="h-[400px] px-1">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.speaker === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.speaker !== "user" && (
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{message.speaker.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.speaker === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="pb-1">{message.text}</p>
                  {message.translation && (
                    <p className="text-xs text-muted-foreground border-t border-muted-foreground/30 pt-1">
                      {message.translation}
                    </p>
                  )}
                  
                  {message.speaker !== "user" && (
                    <div className="flex justify-end mt-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0" 
                            onClick={() => handlePlayVoice(message)}
                          >
                            {isSpeaking && activeVoiceId === message.speaker ? (
                              <VolumeX className="h-3 w-3" />
                            ) : (
                              <Volume2 className="h-3 w-3" />
                            )}
                            <span className="sr-only">
                              {isSpeaking && activeVoiceId === message.speaker ? "Stop" : "Play"}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isSpeaking && activeVoiceId === message.speaker ? "Stop Audio" : "Play Audio"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
                
                {message.speaker === "user" && (
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      <User2 className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          
          {/* Show suggestions within chat when it's user's turn */}
          {!isProcessingResponse && !isListening && suggestion && conversation.length > 0 && (
            <div className="mb-4">
              <ResponseGuidance 
                suggestion={suggestion}
                scenarioType={getCurrentScenarioType()}
                onQuickReply={onQuickReply}
              />
            </div>
          )}
          
          {/* Show feedback within chat */}
          {feedback && (
            <div className="mb-4">
              <FeedbackDisplay 
                feedback={feedback}
                onDismiss={onDismissFeedback || (() => {})}
              />
            </div>
          )}
          
          {isListening && (
            <div className="flex justify-center my-4">
              <div className="px-4 py-2 bg-medical-100 text-medical-700 rounded-lg flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-medical-500"></span>
                </span>
                {recognizedText ? recognizedText : "Listening"}...
              </div>
            </div>
          )}
          
          {isProcessingResponse && (
            <div className="flex justify-center my-4">
              <div className="px-4 py-2 bg-muted rounded-lg flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </div>
            </div>
          )}
        </ScrollArea>
        
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              isListening && "bg-medical-100 text-medical-700 border-medical-300"
            )}
            onClick={isListening ? stopListening : handleStartListening}
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Speaking
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationTab;
