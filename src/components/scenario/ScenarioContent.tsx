
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
import { Loader2, RefreshCw, TestTube, User, Stethoscope } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useAIFeedback from "@/hooks/useAIFeedback";
import useMedicalLLM from "@/hooks/useMedicalLLM";
import { toast } from "sonner";

interface ScenarioContentProps {
  scenario: any;
  loading: boolean;
}

const createPatientProfile = (scenarioType: string, scenario: any) => {
  const profiles = {
    'patient-care': {
      name: 'Frau Müller',
      age: 65,
      condition: scenario?.description || 'Routineuntersuchung',
      mood: 'leicht besorgt',
      personality: 'höflich aber ängstlich',
      communicationStyle: 'direkt aber respektvoll'
    },
    'emergency': {
      name: 'Herr Schmidt',
      age: 45,
      condition: 'Brustschmerzen',
      mood: 'panisch',
      personality: 'gestresst und ängstlich',
      communicationStyle: 'kurz und abgehackt durch Schmerz'
    },
    'handover': {
      name: 'Dr. Weber',
      age: 38,
      condition: 'Schichtübergabe',
      mood: 'konzentriert',
      personality: 'professionell und sachlich',
      communicationStyle: 'medizinisch präzise'
    },
    'elderly-care': {
      name: 'Herr Hoffmann',
      age: 82,
      condition: 'Demenz, leichte Verwirrung',
      mood: 'verwirrt aber freundlich',
      personality: 'freundlich aber vergesslich',
      communicationStyle: 'langsam und manchmal wiederholt'
    },
    'disability-care': {
      name: 'Lisa',
      age: 28,
      condition: 'geistige Behinderung',
      mood: 'unsicher aber kooperativ',
      personality: 'freundlich aber hilfesuchend',
      communicationStyle: 'einfach und direkt'
    }
  };

  return profiles[scenarioType] || profiles['patient-care'];
};

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
  const [patientProfile, setPatientProfile] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'testing' | 'connected' | 'failed'>('unknown');
  const isMobile = useIsMobile();
  
  const tabTitles = {
    conversation: "Interactive Dialogue",
    resources: "Help Resources", 
    notes: "Personal Notes"
  };

  // Initialize patient profile when scenario changes
  useEffect(() => {
    if (scenario) {
      const profile = createPatientProfile(scenario.category || 'patient-care', scenario);
      setPatientProfile(profile);
      console.log("Patient profile set:", profile);
    }
  }, [scenario]);

  const { getFeedback, isLoading: isFeedbackLoading } = useAIFeedback({
    onError: (error) => toast.error(`Feedback error: ${error}`)
  });
  
  const { 
    generateResponse, 
    currentPatientProfile,
    isLoading: isGeneratingResponse,
    error: llmError,
    testConnection,
    reset: resetLLM
  } = useMedicalLLM({
    scenarioType: scenario?.category || 'patient-care',
    scenarioDescription: scenario?.description || 'Medical scenario',
    difficultyLevel: scenario?.difficulty || 'intermediate',
    patientContext: patientProfile,
    onError: (error) => toast.error(`Response error: ${error}`)
  });
  
  useEffect(() => {
    if (scenario?.dialogue && scenario.dialogue.length > 0) {
      const initialLines = scenario.dialogue.slice(0, 2);
      setConversation(initialLines);
      setCurrentDialogueIndex(initialLines.length);
    }
  }, [scenario]);

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
    const userMessage: DialogueLine = {
      speaker: "user",
      text: message
    };
    
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setIsProcessingResponse(true);
    
    try {
      // Get AI feedback for the user's message
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
    
    // Check if we have predefined dialogue to continue with
    if (scenario?.dialogue && currentDialogueIndex < scenario.dialogue.length) {
      const nextDialogueLine = scenario.dialogue[currentDialogueIndex];
      
      setTimeout(() => {
        setConversation([...updatedConversation, nextDialogueLine]);
        setCurrentDialogueIndex(currentDialogueIndex + 1);
        setIsProcessingResponse(false);
      }, 1500);
    } else {
      // Use the medical LLM for dynamic responses
      try {
        console.log("Generating LLM response for:", message);
        const aiResponse = await generateResponse(message, updatedConversation);
        
        const responseMessage: DialogueLine = {
          speaker: patientProfile?.name === 'Dr. Weber' ? "doctor" : "patient",
          text: aiResponse,
          translation: ""
        };
        
        setConversation([...updatedConversation, responseMessage]);
      } catch (error) {
        console.error("Error generating LLM response:", error);
        toast.error("Failed to generate response");
      } finally {
        setIsProcessingResponse(false);
      }
    }
  };

  const handleUserVoiceResponse = (text: string) => {
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
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {tabTitles[activeTab as keyof typeof tabTitles]}
          {activeTab === "conversation" && patientProfile && (
            <div className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
              <User className="h-3 w-3" />
              {patientProfile.name}
            </div>
          )}
        </CardTitle>
        
        {activeTab === "conversation" && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestConnection}
              disabled={connectionStatus === 'testing'}
            >
              {connectionStatus === 'testing' ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-1" />
              )}
              Test AI
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetConversation}
              disabled={conversation.length <= 2}
            >
              <RefreshCw className="h-4 w-4 mr-1" /> 
              Reset
            </Button>
          </div>
        )}
      </CardHeader>
      
      {/* Connection Status Alert */}
      {activeTab === "conversation" && connectionStatus !== 'unknown' && (
        <CardContent className="pt-0">
          <Alert className={connectionStatus === 'connected' ? 'border-green-200 bg-green-50' : 
                          connectionStatus === 'failed' ? 'border-red-200 bg-red-50' : 
                          'border-yellow-200 bg-yellow-50'}>
            <Stethoscope className="h-4 w-4" />
            <AlertTitle>
              {connectionStatus === 'connected' && "AI Connected"}
              {connectionStatus === 'failed' && "AI Connection Failed"}
              {connectionStatus === 'testing' && "Testing AI Connection..."}
            </AlertTitle>
            <AlertDescription>
              {connectionStatus === 'connected' && "OpenAI integration is working. You can now have realistic medical conversations."}
              {connectionStatus === 'failed' && "Could not connect to OpenAI. Check if OPENAI_API_KEY is properly configured in Supabase secrets."}
              {connectionStatus === 'testing' && "Verifying OpenAI API connection..."}
            </AlertDescription>
          </Alert>
        </CardContent>
      )}

      {/* Patient Profile Display */}
      {activeTab === "conversation" && patientProfile && (
        <CardContent className="pt-0">
          <div className="bg-medical-50 border border-medical-200 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-medium text-medical-800 mb-2">Patient Profile</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-medical-700">
              <div><strong>Name:</strong> {patientProfile.name}</div>
              <div><strong>Alter:</strong> {patientProfile.age}</div>
              <div><strong>Zustand:</strong> {patientProfile.condition}</div>
              <div><strong>Stimmung:</strong> {patientProfile.mood}</div>
            </div>
          </div>
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
                    Dismiss
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
                      Dismiss
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
              {isProcessingResponse ? "Generating response..." : "Generating feedback..."}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
