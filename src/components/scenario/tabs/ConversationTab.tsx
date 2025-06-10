
import React from "react";
import { DialogueLine } from "@/data/scenarios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot, Loader2, Stethoscope, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import FeedbackDisplay from "../FeedbackDisplay";
import ResponseGuidance from "../ResponseGuidance";

interface ConversationTabProps {
  conversation: DialogueLine[];
  onUserResponse?: (text: string) => void;
  isProcessingResponse?: boolean;
  suggestion?: string;
  onQuickReply?: (text: string) => void;
  feedback?: string;
  onDismissFeedback?: () => void;
  conversationHistory?: DialogueLine[];
  scenarioType?: string;
}

const ConversationTab: React.FC<ConversationTabProps> = ({
  conversation,
  onUserResponse,
  isProcessingResponse = false,
  suggestion,
  onQuickReply,
  feedback,
  onDismissFeedback,
  conversationHistory = [],
  scenarioType = 'patient-care'
}) => {
  const getSpeakerIcon = (speaker: string) => {
    switch (speaker) {
      case "user":
        return <User className="h-4 w-4" />;
      case "patient":
        return <Bot className="h-4 w-4" />;
      case "doctor":
        return <Stethoscope className="h-4 w-4" />;
      case "colleague":
        return <Users className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const getSpeakerLabel = (speaker: string) => {
    switch (speaker) {
      case "user":
        return "You";
      case "patient":
        return "Patient";
      case "doctor":
        return "Doctor";
      case "colleague":
        return "Colleague";
      default:
        return "Speaker";
    }
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case "user":
        return "bg-medical-100 border-medical-200";
      case "patient":
        return "bg-blue-100 border-blue-200";
      case "doctor":
        return "bg-green-100 border-green-200";
      case "colleague":
        return "bg-purple-100 border-purple-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Conversation Display */}
      <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg bg-white">
        {conversation.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Bot className="h-12 w-12 mx-auto mb-4 text-medical-400" />
            <p>Start the conversation by typing a message or using a suggested response below.</p>
          </div>
        ) : (
          conversation.map((line, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 p-3 rounded-lg border",
                getSpeakerColor(line.speaker)
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-white">
                  {getSpeakerIcon(line.speaker)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {getSpeakerLabel(line.speaker)}
                  </span>
                </div>
                <p className="text-sm">{line.text}</p>
                {line.translation && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    Translation: {line.translation}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        
        {/* Processing indicator */}
        {isProcessingResponse && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Patient is responding...</span>
          </div>
        )}
      </div>

      {/* Feedback Display */}
      {feedback && (
        <FeedbackDisplay 
          feedback={feedback} 
          onDismiss={onDismissFeedback}
        />
      )}

      {/* Response Guidance - Always shown */}
      <ResponseGuidance
        suggestion={suggestion}
        scenarioType={scenarioType}
        conversationHistory={conversationHistory}
        onQuickReply={onQuickReply}
      />
    </div>
  );
};

export default ConversationTab;
