
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, MicVocal } from "lucide-react";
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

  // First voice recognition hook for transcription to text area
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

  // Second voice recognition hook for direct chat input
  const {
    text: directSpeechText,
    isListening: isDirectListening,
    startListening: startDirectListening,
    stopListening: stopDirectListening,
    resetText: resetDirectText,
    error: directSpeechError
  } = useVoiceRecognition({
    language: 'de-DE',
    continuous: true,
    interimResults: true,
    onResult: (result, isFinal) => {
      if (isFinal && result.trim()) {
        // Add a small delay to ensure the user has finished speaking
        setTimeout(() => {
          onSendMessage(result.trim());
          resetDirectText();
        }, 500);
      }
    },
    onError: (error) => {
      console.error("Direct speech error:", error);
      toast.error("Direkte Spracheingabe fehlgeschlagen: " + error);
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

  const handleDirectSpeechMouseDown = async () => {
    if (!isDirectListening) {
      try {
        await startDirectListening();
        toast.info("Halten Sie gedrückt und sprechen Sie...");
      } catch (error) {
        console.error("Failed to start direct speech:", error);
        toast.error("Direkte Spracheingabe konnte nicht gestartet werden");
      }
    }
  };

  const handleDirectSpeechMouseUp = () => {
    if (isDirectListening) {
      stopDirectListening();
      toast.info("Verarbeitung...");
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
          {(transcriptionError || directSpeechError) && (
            <p className="text-xs text-red-500 mt-1">
              {transcriptionError || directSpeechError}
            </p>
          )}
        </div>
        
        <div className="flex flex-col space-y-2">
          {hasRecognitionSupport && (
            <>
              {/* Transcription to text area button */}
              <Button 
                variant={isTranscribing ? "destructive" : "outline"}
                size="sm" 
                onClick={toggleTranscription}
                disabled={disabled || isDirectListening}
                className="touch-action-manipulation h-10 w-10 p-0"
                aria-label={isTranscribing ? "Transkription stoppen" : "Transkription starten"}
                title="Transkription in Textfeld"
              >
                {isTranscribing ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>

              {/* Direct speech input button */}
              <Button 
                variant={isDirectListening ? "default" : "secondary"}
                size="sm" 
                onMouseDown={handleDirectSpeechMouseDown}
                onMouseUp={handleDirectSpeechMouseUp}
                onMouseLeave={handleDirectSpeechMouseUp}
                onTouchStart={handleDirectSpeechMouseDown}
                onTouchEnd={handleDirectSpeechMouseUp}
                disabled={disabled || isTranscribing}
                className="touch-action-manipulation h-10 w-10 p-0"
                aria-label="Direkt sprechen (halten)"
                title="Halten und sprechen - direkt senden"
              >
                <MicVocal className="h-4 w-4" />
              </Button>
            </>
          )}
          
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
