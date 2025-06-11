
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
    resetText,
    hasRecognitionSupport,
    error
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
        resetText();
      }
    },
    onError: (error) => {
      console.error("Voice recognition error:", error);
      toast.error("Spracherkennung fehlgeschlagen: " + error);
    }
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
        toast.info("Sprechen Sie jetzt...");
      } catch (error) {
        console.error("Failed to start voice recognition:", error);
        toast.error("Spracherkennung konnte nicht gestartet werden");
      }
    }
  };

  return (
    <CardFooter className="p-4">
      <div className="flex w-full items-end space-x-2">
        <div className="flex-1">
          <Textarea
            placeholder={t("scenario.type_message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px] resize-none"
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-2">
          {hasRecognitionSupport && (
            <Button 
              variant={isListening ? "destructive" : "outline"}
              size="icon" 
              onClick={toggleListening}
              disabled={disabled}
              className="touch-action-manipulation"
              aria-label={isListening ? "Aufnahme stoppen" : "Sprachaufnahme starten"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
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
          </Button>
        </div>
      </div>
    </CardFooter>
  );
};

export default ConversationInput;
