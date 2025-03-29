
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import { toast } from "sonner";

interface ConversationInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ConversationInput: React.FC<ConversationInputProps> = ({ 
  onSendMessage,
  disabled = false 
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const { 
    text: recognizedText, 
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useVoiceRecognition({
    language: 'de-DE',
    onResult: (result, isFinal) => {
      if (isFinal) {
        setMessage(prev => prev ? `${prev} ${result}` : result);
      }
    },
    onError: (error) => toast.error(error)
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const toggleListening = async () => {
    if (isListening) {
      stopListening();
    } else {
      try {
        await startListening();
      } catch (error) {
        toast.error("Failed to start voice recognition");
      }
    }
  };

  return (
    <CardFooter>
      <div className="flex w-full items-center space-x-2">
        <Textarea
          placeholder={t("scenario.type_message")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        
        {hasRecognitionSupport && (
          <Button 
            variant={isListening ? "destructive" : "outline"}
            size="icon" 
            onClick={toggleListening}
            disabled={disabled}
            className="touch-action-manipulation"
            aria-label={isListening ? t("scenario.stop_listening") : t("scenario.start_speaking")}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isListening ? t("scenario.stop_listening") : t("scenario.start_speaking")}
            </span>
          </Button>
        )}
        
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          disabled={disabled || !message.trim()}
          className="touch-action-manipulation"
          aria-label={t("common.send")}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{t("common.send")}</span>
        </Button>
      </div>
    </CardFooter>
  );
};

export default ConversationInput;
