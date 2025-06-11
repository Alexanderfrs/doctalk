
import React, { useState, useEffect } from "react";
import { Scenario, DialogueLine } from "@/data/scenarios";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import { toast } from "sonner";
import { createPatientProfile } from "@/utils/patientProfiles";
import ScenarioTabs from "./ScenarioTabs";
import ScenarioProgressSection from "./ScenarioProgressSection";

interface ScenarioContainerProps {
  scenario: Scenario;
}

const ScenarioContainer: React.FC<ScenarioContainerProps> = ({ scenario }) => {
  const [activeTab, setActiveTab] = useState("conversation");
  const [conversation, setConversation] = useState<DialogueLine[]>([]);
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [showInsights, setShowInsights] = useState(false);
  const [performanceInsights, setPerformanceInsights] = useState<string>("");

  const {
    generateUnifiedResponse,
    isLoading: isLLMLoading,
    reset: resetLLM,
    isConversationComplete
  } = useUnifiedMedicalLLM({
    scenarioType: scenario.category as any || 'patient-care',
    scenarioDescription: scenario.description || '',
    difficultyLevel: 'intermediate',
    patientContext: createPatientProfile(scenario.category, scenario),
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
    setConversation([]);
    setNotes("");
    setFeedback("");
    setSuggestion("");
    resetLLM();
  }, [scenario, resetLLM]);

  const handleSendMessage = async (message: string) => {
    if (isLLMLoading || isConversationComplete) return;

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

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
  };

  const handleRestart = () => {
    setConversation([]);
    setNotes("");
    setFeedback("");
    setSuggestion("");
    setShowInsights(false);
    resetLLM();
  };

  const completedGoals = Math.min(Math.floor(conversation.length / 2), 7);
  const totalGoals = 7;
  const currentObjective = isConversationComplete 
    ? "Gespräch abgeschlossen" 
    : "Führen Sie das Gespräch fort";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <ScenarioProgressSection
        completedGoals={completedGoals}
        totalGoals={totalGoals}
        currentObjective={currentObjective}
        showInsights={showInsights}
        performanceInsights={performanceInsights}
        scenarioCategory={scenario.category}
        onCloseInsights={() => setShowInsights(false)}
        onRestart={handleRestart}
      />
      
      <ScenarioTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        conversation={conversation}
        onSendMessage={handleSendMessage}
        isLLMLoading={isLLMLoading}
        suggestion={suggestion}
        onQuickReply={handleQuickReply}
        feedback={feedback}
        onDismissFeedback={handleDismissFeedback}
        scenarioCategory={scenario.category}
        notes={notes}
        onNotesChange={handleNotesChange}
        isConversationComplete={isConversationComplete}
      />
    </div>
  );
};

export default ScenarioContainer;
