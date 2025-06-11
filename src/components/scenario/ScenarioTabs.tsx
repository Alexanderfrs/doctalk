
import React from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import ConversationTab from "./tabs/ConversationTab";
import ConversationInput from "./ConversationInput";
import { DialogueLine } from "@/data/scenarios";

interface ScenarioTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  conversation: DialogueLine[];
  onSendMessage: (message: string) => void;
  isLLMLoading: boolean;
  suggestion: string;
  onQuickReply: (text: string) => void;
  feedback: string;
  onDismissFeedback: () => void;
  scenarioCategory: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  isConversationComplete: boolean;
}

const ScenarioTabs: React.FC<ScenarioTabsProps> = ({
  conversation,
  onSendMessage,
  isLLMLoading,
  suggestion,
  onQuickReply,
  feedback,
  onDismissFeedback,
  scenarioCategory,
  isConversationComplete
}) => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <MessageSquare className="h-5 w-5 text-medical-600" />
        <h3 className="font-semibold text-medical-800">Gespräch</h3>
      </div>
      
      <div className="p-6">
        <ConversationTab 
          conversation={conversation}
          onUserResponse={onSendMessage}
          isProcessingResponse={isLLMLoading}
          suggestion={suggestion}
          onQuickReply={onQuickReply}
          feedback={feedback}
          onDismissFeedback={onDismissFeedback}
          conversationHistory={conversation}
          scenarioType={scenarioCategory}
        />
      </div>
      
      {!isConversationComplete && (
        <ConversationInput 
          onSendMessage={onSendMessage}
          disabled={isLLMLoading}
        />
      )}
    </Card>
  );
};

export default ScenarioTabs;
