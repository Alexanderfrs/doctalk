import React, { useState, useEffect } from "react";
import { Scenario, DialogueLine } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TabNavigation from "./TabNavigation";
import ConversationTab from "./tabs/ConversationTab";
import ResourcesTab from "./tabs/ResourcesTab";
import NotesTab from "./tabs/NotesTab";
import ConversationInput from "./ConversationInput";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import { toast } from "sonner";
import ProgressTracker from "./ProgressTracker";
import { PerformanceInsightsModal } from "./PerformanceInsightsModal";
import { createPatientProfile } from "@/utils/patientProfiles";

interface ScenarioContentProps {
  scenario: Scenario | null;
  loading: boolean;
}

export const ScenarioContent: React.FC<ScenarioContentProps> = ({
  scenario,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("conversation");
  const [conversation, setConversation] = useState<DialogueLine[]>([]);
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [showInsights, setShowInsights] = useState(false);
  const [performanceInsights, setPerformanceInsights] = useState<string>("");

  const {
    generateUnifiedResponse,
    currentPatientProfile,
    isLoading: isLLMLoading,
    error: llmError,
    reset: resetLLM,
    isConversationComplete
  } = useUnifiedMedicalLLM({
    scenarioType: scenario?.category as any || 'patient-care',
    scenarioDescription: scenario?.description || '',
    difficultyLevel: 'intermediate',
    patientContext: scenario ? createPatientProfile(scenario.category, scenario) : undefined,
    userLanguage: 'en',
    onError: (error) => {
      console.error("LLM Error:", error);
      toast.error("Ein Fehler ist beim Generieren der Antwort aufgetreten.");
    },
    onConversationComplete: (insights) => {
      setPerformanceInsights(insights);
      setShowInsights(true);
    }
  });

  useEffect(() => {
    if (scenario) {
      setConversation([]);
      setNotes("");
      setFeedback("");
      setSuggestion("");
      resetLLM();
    }
  }, [scenario, resetLLM]);

  const handleSendMessage = async (message: string) => {
    if (!scenario || isLLMLoading || isConversationComplete) return;

    try {
      const userMessage: DialogueLine = {
        speaker: 'user',
        text: message
      };

      const updatedConversation = [...conversation, userMessage];
      setConversation(updatedConversation);

      const response = await generateUnifiedResponse(message, conversation);

      const aiMessage: DialogueLine = {
        speaker: scenario.category === 'teamwork' ? 'colleague' : 'patient',
        text: response.patientReply
      };

      setConversation(prev => [...prev, aiMessage]);
      
      if (response.briefFeedback) {
        setFeedback(response.briefFeedback);
      }
      
      if (response.suggestionForNext) {
        setSuggestion(response.suggestionForNext);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Fehler beim Senden der Nachricht");
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const handleDismissFeedback = () => {
    setFeedback("");
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Szenario nicht gefunden.</p>
        </Card>
      </div>
    );
  }

  const completedGoals = Math.min(Math.floor(conversation.length / 2), 7);
  const totalGoals = 7;
  const currentObjective = isConversationComplete 
    ? "Gespräch abgeschlossen" 
    : "Führen Sie das Gespräch fort";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <ProgressTracker 
        completedGoals={completedGoals}
        totalGoals={totalGoals}
        currentObjective={currentObjective}
      />
      
      <Card className="w-full">
        <TabNavigation 
          activeTab={activeTab} 
          onChange={setActiveTab}
        />
        
        <div className="p-6">
          {activeTab === "conversation" && (
            <ConversationTab 
              conversation={conversation}
              onUserResponse={handleSendMessage}
              isProcessingResponse={isLLMLoading}
              suggestion={suggestion}
              onQuickReply={handleQuickReply}
              feedback={feedback}
              onDismissFeedback={handleDismissFeedback}
              conversationHistory={conversation}
              scenarioType={scenario.category}
            />
          )}
          
          {activeTab === "resources" && <ResourcesTab />}
          
          {activeTab === "notes" && <NotesTab />}
        </div>
        
        {activeTab === "conversation" && !isConversationComplete && (
          <ConversationInput 
            onSendMessage={handleSendMessage}
            disabled={isLLMLoading}
          />
        )}
      </Card>

      <PerformanceInsightsModal
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
        insights={performanceInsights}
        completedGoals={completedGoals}
        totalGoals={totalGoals}
        scenarioType={scenario.category}
        onRestart={() => {
          setConversation([]);
          setNotes("");
          setFeedback("");
          setSuggestion("");
          setShowInsights(false);
          resetLLM();
        }}
      />
    </div>
  );
};

export default ScenarioContent;
