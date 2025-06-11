
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Book, Lightbulb } from "lucide-react";
import ConversationTab from "./tabs/ConversationTab";
import ResourcesTab from "./tabs/ResourcesTab";
import NotesTab from "./tabs/NotesTab";
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
  activeTab,
  onTabChange,
  conversation,
  onSendMessage,
  isLLMLoading,
  suggestion,
  onQuickReply,
  feedback,
  onDismissFeedback,
  scenarioCategory,
  notes,
  onNotesChange,
  isConversationComplete
}) => {
  return (
    <Card className="w-full">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-3 mb-4 touch-action-manipulation">
          <TabsTrigger value="conversation" className="md:text-sm text-xs">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="md:inline hidden">Conversation</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="md:text-sm text-xs">
            <Book className="mr-2 h-4 w-4" />
            <span className="md:inline hidden">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="md:text-sm text-xs">
            <Lightbulb className="mr-2 h-4 w-4" />
            <span className="md:inline hidden">Notes</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="conversation">
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
          </TabsContent>
          
          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>
          
          <TabsContent value="notes">
            <NotesTab 
              notes={notes} 
              onNotesChange={onNotesChange} 
            />
          </TabsContent>
        </div>
        
        {activeTab === "conversation" && !isConversationComplete && (
          <ConversationInput 
            onSendMessage={onSendMessage}
            disabled={isLLMLoading}
          />
        )}
      </Tabs>
    </Card>
  );
};

export default ScenarioTabs;
