
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabNavigation from "./TabNavigation";
import ConversationTab from "./tabs/ConversationTab";
import ResourcesTab from "./tabs/ResourcesTab";
import NotesTab from "./tabs/NotesTab";
import ConversationInput from "./ConversationInput";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogueLine } from "@/data/scenarios";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import useAIFeedback from "@/hooks/useAIFeedback";
import useSimpleLLM from "@/hooks/useSimpleLLM";
import { toast } from "sonner";

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
  const [conversation, setConversation] = useState<DialogueLine[]>([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const isMobile = useIsMobile();
  
  // AI feedback hook
  const { getFeedback, isLoading: isFeedbackLoading } = useAIFeedback({
    onError: (error) => toast.error(`Feedback error: ${error}`)
  });
  
  // Dialogue AI generation hook for creating dynamic responses
  const { generateResponse, isLoading: isGeneratingResponse } = useSimpleLLM({
    systemPrompt: "You are a patient or healthcare colleague in a German medical scenario. Respond naturally in German, keeping responses under 3 sentences.",
    onError: (error) => toast.error(`Response error: ${error}`)
  });
  
  // Initialize conversation from scenario when it loads
  useEffect(() => {
    if (scenario?.dialogue && scenario.dialogue.length > 0) {
      // Start with the first 2 dialogue lines (if available)
      const initialLines = scenario.dialogue.slice(0, 2);
      setConversation(initialLines);
      setCurrentDialogueIndex(initialLines.length);
    }
  }, [scenario]);

  const handleSendMessage = async (message: string) => {
    // Add user message to conversation
    const userMessage: DialogueLine = {
      speaker: "user",
      text: message
    };
    
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setIsProcessingResponse(true);
    
    // Generate feedback for the user's message
    try {
      const feedbackText = await getFeedback(
        updatedConversation, 
        message, 
        scenario?.description
      );
      setFeedback(feedbackText);
      setShowFeedback(true);
    } catch (error) {
      console.error("Error getting feedback:", error);
    }
    
    // Check if there's a next pre-defined dialogue line
    if (scenario?.dialogue && currentDialogueIndex < scenario.dialogue.length) {
      // Use the next pre-defined line from the scenario
      const nextDialogueLine = scenario.dialogue[currentDialogueIndex];
      
      setTimeout(() => {
        setConversation([...updatedConversation, nextDialogueLine]);
        setCurrentDialogueIndex(currentDialogueIndex + 1);
        setIsProcessingResponse(false);
      }, 1500);
    } else {
      // Generate a dynamic response using AI
      try {
        const aiResponse = await generateResponse(
          message, 
          scenario?.description || "medical scenario"
        );
        
        const responseMessage: DialogueLine = {
          speaker: "patient",
          text: aiResponse,
          translation: "" // Translation could be added here if needed
        };
        
        setConversation([...updatedConversation, responseMessage]);
      } catch (error) {
        console.error("Error generating response:", error);
        toast.error("Failed to generate response");
      } finally {
        setIsProcessingResponse(false);
      }
    }
  };

  const handleUserVoiceResponse = (text: string) => {
    // Process the voice input the same way as text input
    handleSendMessage(text);
  };

  const handleResetConversation = () => {
    // Reset to initial state
    if (scenario?.dialogue) {
      const initialLines = scenario.dialogue.slice(0, 2);
      setConversation(initialLines);
      setCurrentDialogueIndex(initialLines.length);
      setShowFeedback(false);
    } else {
      setConversation([]);
      setCurrentDialogueIndex(0);
      setShowFeedback(false);
    }
    toast.success(t("scenario.conversation_reset"));
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("scenario.interactive_session")}</CardTitle>
        
        {activeTab === "conversation" && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetConversation}
            disabled={conversation.length <= 2}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> {t("common.reset")}
          </Button>
        )}
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
                <ConversationTab 
                  conversation={conversation} 
                  onUserResponse={handleUserVoiceResponse}
                  isProcessingResponse={isProcessingResponse}
                />
                <ResourcesTab />
                <NotesTab />
              </SwipeableContainer>
            </div>
            
            {showFeedback && activeTab === "conversation" && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="text-sm font-medium mb-1 text-blue-800">Feedback:</h4>
                <p className="text-sm text-blue-700">{feedback}</p>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFeedback(false)}
                  >
                    {t("common.dismiss")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          
          {activeTab === "conversation" && (
            <ConversationInput 
              onSendMessage={handleSendMessage} 
              disabled={isProcessingResponse || isFeedbackLoading}
            />
          )}
        </>
      ) : (
        <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab}>
          <CardContent>
            <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
            
            <TabsContent value="conversation" className="mt-0">
              <ConversationTab 
                conversation={conversation} 
                onUserResponse={handleUserVoiceResponse}
                isProcessingResponse={isProcessingResponse}
              />
              
              {showFeedback && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="text-sm font-medium mb-1 text-blue-800">Feedback:</h4>
                  <p className="text-sm text-blue-700">{feedback}</p>
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowFeedback(false)}
                    >
                      {t("common.dismiss")}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <ResourcesTab />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <NotesTab />
            </TabsContent>
          </CardContent>
          
          {activeTab === "conversation" && (
            <ConversationInput 
              onSendMessage={handleSendMessage} 
              disabled={isProcessingResponse || isFeedbackLoading}
            />
          )}
        </Tabs>
      )}
      
      {(isProcessingResponse || isFeedbackLoading) && (
        <CardFooter className="pt-0 pb-2">
          <div className="w-full flex justify-center">
            <div className="text-xs text-muted-foreground flex items-center">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              {isProcessingResponse ? t("scenario.generating_response") : t("scenario.generating_feedback")}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
