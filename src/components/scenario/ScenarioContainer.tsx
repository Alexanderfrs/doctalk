
import React, { useState, useEffect } from "react";
import { Scenario, DialogueLine } from "@/data/scenarios";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import { toast } from "sonner";
import { createPatientProfile } from "@/utils/patientProfiles";
import ScenarioTabs from "./ScenarioTabs";
import ScenarioProgressSection from "./ScenarioProgressSection";
import { Card } from "@/components/ui/card";
import { AlertCircle, Users, Target, Lightbulb } from "lucide-react";

interface ScenarioContainerProps {
  scenario: Scenario;
}

const ScenarioContainer: React.FC<ScenarioContainerProps> = ({ scenario }) => {
  const [conversation, setConversation] = useState<DialogueLine[]>([]);
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

  const handleRestart = () => {
    setConversation([]);
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

  // Scenario context information
  const getScenarioContext = () => {
    switch (scenario.id) {
      case 'admission':
        return {
          setting: "Krankenstation - Patientenaufnahme",
          participants: "Sie (Pflegekraft) und Herr Müller (neuer Patient)",
          objective: "Vollständige Aufnahme des Patienten durchführen",
          considerations: ["Anamnese erheben", "Vertrauen aufbauen", "Schmerzsituation erfassen", "Beruhigend wirken"]
        };
      case 'medication':
        return {
          setting: "Patientenzimmer - Medikamentenverabreichung",
          participants: "Sie (Pflegekraft) und Frau Schmidt (Patientin)",
          objective: "Sichere Medikamentenverabreichung und Patientenaufklärung",
          considerations: ["Medikamentencheck", "Nebenwirkungen erklären", "Compliance sicherstellen", "Fragen beantworten"]
        };
      case 'emergency':
        return {
          setting: "Notfallsituation - Akute Brustschmerzen",
          participants: "Sie (Pflegekraft) und Herr Weber (Patient in Not)",
          objective: "Schnelle Erstversorgung und Stabilisierung",
          considerations: ["Ruhe bewahren", "Vitalzeichen überwachen", "Notarzt alarmieren", "Sofortmaßnahmen einleiten"]
        };
      case 'handover':
        return {
          setting: "Schichtübergabe - Patientenübergabe",
          participants: "Sie (Pflegekraft) und Maria (Kollegin)",
          objective: "Vollständige und sichere Patientenübergabe",
          considerations: ["Alle relevanten Infos übermitteln", "Strukturiert vorgehen", "Nachfragen beantworten", "Kontinuität sicherstellen"]
        };
      case 'dementia-care':
        return {
          setting: "Pflegeheim - Demenzbetreuung",
          participants: "Sie (Pflegekraft) und Frau Becker (Bewohnerin mit Demenz)",
          objective: "Einfühlsame Betreuung und Orientierungshilfe",
          considerations: ["Validation anwenden", "Realitätsorientierung", "Beruhigend wirken", "Biografiearbeit nutzen"]
        };
      case 'mobility-assistance':
        return {
          setting: "Patientenzimmer - Mobilitätshilfe",
          participants: "Sie (Pflegekraft) und Herr Schmidt (älterer Patient)",
          objective: "Sichere Mobilisierung und Sturzprävention",
          considerations: ["Sicherheit priorisieren", "Patientenpace respektieren", "Hilfsmittel einsetzen", "Motivation fördern"]
        };
      case 'communication-disability':
        return {
          setting: "Wohngruppe - Behindertenbetreuung",
          participants: "Sie (Betreuer) und Thomas (Bewohner mit geistiger Behinderung)",
          objective: "Kommunikation und Selbstbestimmung fördern",
          considerations: ["Unterstützte Kommunikation", "Geduld aufbringen", "Wahlmöglichkeiten anbieten", "Respekt zeigen"]
        };
      default:
        return {
          setting: "Medizinische Einrichtung",
          participants: "Sie und der Patient/Kollege",
          objective: "Professionelle medizinische Kommunikation",
          considerations: ["Empathie zeigen", "Fachlich korrekt handeln", "Verständlich kommunizieren"]
        };
    }
  };

  const context = getScenarioContext();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Scenario Introduction */}
      <Card className="p-6 bg-gradient-to-br from-medical-50 to-medical-100 border-medical-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-medical-600" />
            <h3 className="font-semibold text-medical-800">Szenario-Einführung</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-medical-200 rounded-lg">
                <Target className="h-4 w-4 text-medical-700" />
              </div>
              <div>
                <p className="font-medium text-medical-700 mb-1">Setting</p>
                <p className="text-medical-600">{context.setting}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-medical-200 rounded-lg">
                <Users className="h-4 w-4 text-medical-700" />
              </div>
              <div>
                <p className="font-medium text-medical-700 mb-1">Beteiligte</p>
                <p className="text-medical-600">{context.participants}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-medical-200 rounded-lg">
                <Target className="h-4 w-4 text-medical-700" />
              </div>
              <div>
                <p className="font-medium text-medical-700 mb-1">Ziel</p>
                <p className="text-medical-600">{context.objective}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-medical-200 rounded-lg">
                <Lightbulb className="h-4 w-4 text-medical-700" />
              </div>
              <div>
                <p className="font-medium text-medical-700 mb-1">Wichtige Aspekte</p>
                <ul className="text-medical-600 text-xs space-y-1">
                  {context.considerations.map((consideration, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-medical-400 rounded-full"></span>
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

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
        activeTab="conversation"
        onTabChange={() => {}}
        conversation={conversation}
        onSendMessage={handleSendMessage}
        isLLMLoading={isLLMLoading}
        suggestion={suggestion}
        onQuickReply={handleQuickReply}
        feedback={feedback}
        onDismissFeedback={handleDismissFeedback}
        scenarioCategory={scenario.category}
        notes=""
        onNotesChange={() => {}}
        isConversationComplete={isConversationComplete}
      />
    </div>
  );
};

export default ScenarioContainer;
