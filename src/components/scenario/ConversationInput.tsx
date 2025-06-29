
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

  // Voice recognition for transcription to text area
  const { 
    text: recognizedText, 
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

  const handleSendMessage = () => {
    if (!message.trim()) return;
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
              disabled={disabled}
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
            disabled={disabled || !message.trim()}
            className="touch-action-manipulation bg-medical-600 hover:bg-medical-700 h-10 w-10 p-0"
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
