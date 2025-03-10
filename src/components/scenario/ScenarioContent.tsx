
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabNavigation from "./TabNavigation";
import ConversationTab from "./tabs/ConversationTab";
import ResourcesTab from "./tabs/ResourcesTab";
import NotesTab from "./tabs/NotesTab";
import ConversationInput from "./ConversationInput";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScenarioContentProps {
  scenario: any;
  loading: boolean;
}

export const ScenarioContent: React.FC<ScenarioContentProps> = ({
  scenario,
  loading
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("conversation");
  const [conversation, setConversation] = useState([
    {
      role: "system",
      content: "This is a simulated medical scenario. I'll be acting as your patient. What questions would you like to ask?"
    }
  ]);
  const isMobile = useIsMobile();

  const handleSendMessage = (message: string) => {
    // Add user message to conversation
    const newConversation = [
      ...conversation,
      { role: "user", content: message }
    ];
    
    setConversation(newConversation);
    
    // Simulate response (in a real app, this would call an API)
    setTimeout(() => {
      setConversation([
        ...newConversation,
        { 
          role: "system", 
          content: "I'm experiencing a sharp pain in my chest. It started about an hour ago and it's getting worse when I breathe deeply."
        }
      ]);
    }, 1000);
  };

  const handleSwipe = (index: number) => {
    const tabs = ["conversation", "resources", "notes"];
    setActiveTab(tabs[index]);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-1/3 bg-muted animate-pulse rounded mb-2" />
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  // Index of current tab
  const tabIndex = activeTab === "conversation" ? 0 : (activeTab === "resources" ? 1 : 2);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("scenario.interactive_session")}</CardTitle>
      </CardHeader>
      
      {isMobile ? (
        <>
          <CardContent>
            <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
            
            <div className="mt-4">
              <SwipeableContainer
                initialIndex={tabIndex}
                onSwipe={handleSwipe}
                showIndicators={false}
                className="min-h-[300px]"
              >
                <ConversationTab conversation={conversation} />
                <ResourcesTab />
                <NotesTab />
              </SwipeableContainer>
            </div>
          </CardContent>
          
          {activeTab === "conversation" && (
            <ConversationInput onSendMessage={handleSendMessage} />
          )}
        </>
      ) : (
        <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab}>
          <CardContent>
            <TabNavigation activeTab={activeTab} />
            
            <TabsContent value="conversation" className="mt-0">
              <ConversationTab conversation={conversation} />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <ResourcesTab />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <NotesTab />
            </TabsContent>
          </CardContent>
          
          {activeTab === "conversation" && (
            <ConversationInput onSendMessage={handleSendMessage} />
          )}
        </Tabs>
      )}
    </Card>
  );
};
