
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
  onSendMessage,
  isLLMLoading,
  isConversationComplete
}) => {
  // Create a mock scenario object for ConversationTab
  const mockScenario = {
    category: 'patient-care',
    title: 'Medical Scenario',
    description: 'Practice scenario'
  };

  return (
    <Card className="w-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <MessageSquare className="h-5 w-5 text-medical-600" />
        <h3 className="font-semibold text-medical-800">Gespräch</h3>
      </div>
      
      <div className="p-6">
        <ConversationTab 
          scenario={mockScenario}
          onSendMessage={onSendMessage}
          isAIResponding={isLLMLoading}
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
