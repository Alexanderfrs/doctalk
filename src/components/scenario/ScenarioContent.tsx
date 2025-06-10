
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
import ProgressTracker from "./ProgressTracker";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import { PatientProfileDisplay } from "./PatientProfileDisplay";
import { ConnectionStatus } from "./ConnectionStatus";
import { PerformanceInsightsModal } from "./PerformanceInsightsModal";
import { ScenarioHeaderControls } from "./ScenarioHeaderControls";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogueLine } from "@/data/scenarios";
import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import { toast } from "sonner";
import { createPatientProfile, PatientProfile } from "@/utils/patientProfiles";

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
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'testing' | 'connected' | 'failed'>('unknown');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [performanceInsights, setPerformanceInsights] = useState<string>("");
  const [showInsights, setShowInsights] = useState(false);
  const [progressData, setProgressData] = useState({
    completedGoals: 0,
    totalGoals: 7,
    currentObjective: "Start the conversation",
    isComplete: false
  });
  const isMobile = useIsMobile();

  // Initialize patient profile when scenario changes
  useEffect(() => {
    if (scenario) {
      const profile = createPatientProfile(scenario.category || 'patient-care', scenario);
      setPatientProfile(profile);
      console.log("Patient profile set:", profile);
    }
  }, [scenario]);

  // Detect user language from browser
  const userLanguage = navigator.language.split('-')[0] || 'en';
  
  const { 
    generateUnifiedResponse, 
    isLoading,
    error: llmError,
    testConnection,
    reset: resetLLM,
    isConversationComplete
  } = useUnifiedMedicalLLM({
    scenarioType: scenario?.category || 'patient-care',
    scenarioDescription: scenario?.description || 'Medical scenario',
    difficultyLevel: scenario?.difficulty || 'intermediate',
    patientContext: patientProfile,
    userLanguage,
    onError: (error) => toast.error(`Response error: ${error}`),
    onConversationComplete: (insights) => {
      setPerformanceInsights(insights);
      setShowInsights(true);
    }
  });
  
  useEffect(() => {
    if (scenario?.dialogue && scenario.dialogue.length > 0) {
      const initialLines = scenario.dialogue.slice(0, 2);
      setConversation(initialLines);
      setCurrentDialogueIndex(initialLines.length);
    }
  }, [scenario]);

  // Set initial suggestion when conversation starts
  useEffect(() => {
    if (conversation.length <= 2 && !suggestion) {
      setSuggestion("Start by greeting the patient professionally and introducing yourself");
    }
  }, [conversation.length, suggestion]);

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    const isConnected = await testConnection();
    setConnectionStatus(isConnected ? 'connected' : 'failed');
    
    if (isConnected) {
      toast.success("OpenAI connection successful!");
    } else {
      toast.error("OpenAI connection failed. Check logs for details.");
    }
  };

  const handleSendMessage = async (message: string) => {
    if (isConversationComplete) {
      toast.warning("This conversation has ended. Please restart to continue.");
      return;
    }

    const userMessage: DialogueLine = {
      speaker: "user",
      text: message
    };
    
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    
    // Check if we have predefined dialogue to continue with
    if (scenario?.dialogue && currentDialogueIndex < scenario.dialogue.length && updatedConversation.length <= 4) {
      const nextDialogueLine = scenario.dialogue[currentDialogueIndex];
      
      setTimeout(() => {
        setConversation([...updatedConversation, nextDialogueLine]);
        setCurrentDialogueIndex(currentDialogueIndex + 1);
      }, 1500);
    } else {
      // Use the unified LLM for dynamic responses with feedback and guidance
      try {
        console.log("Generating unified LLM response for:", message);
        const response = await generateUnifiedResponse(message, updatedConversation);
        
        const responseMessage: DialogueLine = {
          speaker: patientProfile?.name === 'Dr. Weber' ? "doctor" : "patient",
          text: response.patientReply,
          translation: ""
        };
        
        setConversation([...updatedConversation, responseMessage]);
        
        // Update feedback and guidance
        if (response.briefFeedback) {
          setFeedback(response.briefFeedback);
          setShowFeedback(true);
        }
        
        if (response.suggestionForNext) {
          setSuggestion(response.suggestionForNext);
        } else {
          setSuggestion(""); // Clear suggestion if conversation is ending
        }
        
        // Update progress
        setProgressData(response.progressUpdate);
        
      } catch (error) {
        console.error("Error generating unified LLM response:", error);
        toast.error("Failed to generate response");
      }
    }
  };

  const handleQuickReply = (text: string) => {
    if (isConversationComplete) {
      toast.warning("This conversation has ended. Please restart to continue.");
      return;
    }
    handleSendMessage(text);
  };

  const handleUserVoiceResponse = (text: string) => {
    if (isConversationComplete) {
      toast.warning("This conversation has ended. Please restart to continue.");
      return;
    }
    handleSendMessage(text);
  };

  const handleResetConversation = () => {
    if (scenario?.dialogue) {
      const initialLines = scenario.dialogue.slice(0, 2);
      setConversation(initialLines);
      setCurrentDialogueIndex(initialLines.length);
    } else {
      setConversation([]);
      setCurrentDialogueIndex(0);
    }
    setShowFeedback(false);
    setFeedback("");
    setSuggestion("Start by greeting the patient professionally and introducing yourself");
    setShowInsights(false);
    setPerformanceInsights("");
    setProgressData({
      completedGoals: 0,
      totalGoals: 7,
      currentObjective: "Start the conversation",
      isComplete: false
    });
    resetLLM();
    toast.success("Conversation reset");
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

  const tabIndex = activeTab === "conversation" ? 0 : (activeTab === "resources" ? 1 : 2);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Performance Insights Modal */}
      <PerformanceInsightsModal
        isOpen={showInsights}
        insights={performanceInsights}
        completedGoals={progressData.completedGoals}
        totalGoals={progressData.totalGoals}
        scenarioType={scenario?.category || 'patient-care'}
        onClose={() => setShowInsights(false)}
        onRestart={handleResetConversation}
      />

      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {activeTab === "conversation" ? "Interactive Dialogue" : (activeTab === "resources" ? "Help Resources" : "Personal Notes")}
            {activeTab === "conversation" && patientProfile && (
              <div className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
                <User className="h-3 w-3" />
                {patientProfile.name}
              </div>
            )}
          </CardTitle>
          
          {activeTab === "conversation" && (
            <ScenarioHeaderControls
              connectionStatus={connectionStatus}
              conversationLength={conversation.length}
              onTestConnection={handleTestConnection}
              onResetConversation={handleResetConversation}
            />
          )}
        </CardHeader>
        
        {/* Connection Status Alert */}
        {activeTab === "conversation" && (
          <CardContent className="pt-0">
            <ConnectionStatus status={connectionStatus} />
          </CardContent>
        )}

        {/* Progress Tracker */}
        {activeTab === "conversation" && (
          <CardContent className="pt-0">
            <ProgressTracker 
              completedGoals={progressData.completedGoals}
              totalGoals={progressData.totalGoals}
              currentObjective={progressData.currentObjective}
            />
          </CardContent>
        )}

        {/* Patient Profile Display */}
        {activeTab === "conversation" && patientProfile && (
          <CardContent className="pt-0">
            <PatientProfileDisplay patientProfile={patientProfile} />
          </CardContent>
        )}

        {/* Error Display */}
        {llmError && activeTab === "conversation" && (
          <CardContent className="pt-0">
            <Alert className="border-red-200 bg-red-50">
              <AlertTitle>AI Error</AlertTitle>
              <AlertDescription>{llmError}</AlertDescription>
            </Alert>
          </CardContent>
        )}
        
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
                    isProcessingResponse={isLoading}
                    suggestion={suggestion}
                    onQuickReply={handleQuickReply}
                    feedback={showFeedback ? feedback : undefined}
                    onDismissFeedback={() => setShowFeedback(false)}
                    conversationHistory={conversation}
                    scenarioType={scenario?.category || 'patient-care'}
                  />
                  <ResourcesTab />
                  <NotesTab />
                </SwipeableContainer>
              </div>
            </CardContent>
            
            {activeTab === "conversation" && !isConversationComplete && (
              <ConversationInput 
                onSendMessage={handleSendMessage} 
                disabled={isLoading}
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
                  isProcessingResponse={isLoading}
                  suggestion={suggestion}
                  onQuickReply={handleQuickReply}
                  feedback={showFeedback ? feedback : undefined}
                  onDismissFeedback={() => setShowFeedback(false)}
                  conversationHistory={conversation}
                  scenarioType={scenario?.category || 'patient-care'}
                />
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <ResourcesTab />
              </TabsContent>
              
              <TabsContent value="notes" className="mt-0">
                <NotesTab />
              </TabsContent>
            </CardContent>
            
            {activeTab === "conversation" && !isConversationComplete && (
              <ConversationInput 
                onSendMessage={handleSendMessage} 
                disabled={isLoading}
              />
            )}
          </Tabs>
        )}
        
        {isLoading && (
          <CardFooter className="pt-0 pb-2">
            <div className="w-full flex justify-center">
              <div className="text-xs text-muted-foreground flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Generating response and feedback...
              </div>
            </div>
          </CardFooter>
        )}

        {isConversationComplete && activeTab === "conversation" && (
          <CardFooter className="pt-0 pb-4">
            <div className="w-full text-center">
              <p className="text-sm text-medical-700 mb-2">
                Conversation completed! 🎉
              </p>
              <Button 
                onClick={() => setShowInsights(true)}
                variant="outline"
                size="sm"
              >
                View Performance Report
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
