
import React, { useState, useEffect } from "react";
import { Scenario, DialogueLine } from "@/data/scenarios";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import { toast } from "sonner";
import { createPatientProfile } from "@/utils/patientProfiles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, RotateCcw, MessageCircle, Target, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import CheckpointTracker from "./CheckpointTracker";
import ExitConfirmationDialog from "./ExitConfirmationDialog";

interface Checkpoint {
  id: string;
  description: string;
  completed: boolean;
}

interface StreamlinedInteractionScreenProps {
  scenario: Scenario;
  onBack: () => void;
  onExit: () => void;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  onBack,
  onExit
}) => {
  const [conversation, setConversation] = useState<DialogueLine[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [feedback, setFeedback] = useState<string>("");
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

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
    onConversationComplete: () => {
      toast.success("Gespräch erfolgreich abgeschlossen!");
    }
  });

  // Initialize checkpoints based on scenario
  useEffect(() => {
    const getCheckpointsForScenario = () => {
      switch (scenario.id) {
        case 'handover':
          return [
            { id: '1', description: 'Patientenidentifikation bestätigen', completed: false },
            { id: '2', description: 'Aktuelle Situation beschreiben (SBAR)', completed: false },
            { id: '3', description: 'Medikation und Änderungen kommunizieren', completed: false },
            { id: '4', description: 'Besondere Vorkommnisse erwähnen', completed: false },
            { id: '5', description: 'Rückfragen beantworten', completed: false }
          ];
        case 'admission':
          return [
            { id: '1', description: 'Freundliche Begrüßung und Vorstellung', completed: false },
            { id: '2', description: 'Persönliche Daten aufnehmen', completed: false },
            { id: '3', description: 'Anamnese erheben', completed: false },
            { id: '4', description: 'Abläufe und Regeln erklären', completed: false },
            { id: '5', description: 'Fragen beantworten und beruhigen', completed: false }
          ];
        case 'medication':
          return [
            { id: '1', description: 'Patientenidentifikation prüfen', completed: false },
            { id: '2', description: 'Medikament und Dosierung erklären', completed: false },
            { id: '3', description: 'Allergien und Unverträglichkeiten erfragen', completed: false },
            { id: '4', description: 'Wirkung und Nebenwirkungen erläutern', completed: false },
            { id: '5', description: 'Einnahme überwachen', completed: false }
          ];
        default:
          return [
            { id: '1', description: 'Professionellen Kontakt herstellen', completed: false },
            { id: '2', description: 'Bedürfnisse erfassen', completed: false },
            { id: '3', description: 'Informationen vermitteln', completed: false },
            { id: '4', description: 'Empathisch reagieren', completed: false },
            { id: '5', description: 'Situation erfolgreich abschließen', completed: false }
          ];
      }
    };

    setCheckpoints(getCheckpointsForScenario());
  }, [scenario.id]);

  // Function to check and update checkpoints based on conversation
  const updateCheckpoints = (userMessage: string, aiResponse: string) => {
    setCheckpoints(prev => {
      const updated = [...prev];
      
      // Simple keyword-based checkpoint completion logic
      // In a real implementation, this would be more sophisticated
      const message = userMessage.toLowerCase();
      
      switch (scenario.id) {
        case 'handover':
          if (message.includes('name') || message.includes('frau') || message.includes('herr')) {
            updated[0].completed = true;
          }
          if (message.includes('zustand') || message.includes('situation') || message.includes('patient')) {
            updated[1].completed = true;
          }
          if (message.includes('medikament') || message.includes('therapie') || message.includes('tablette')) {
            updated[2].completed = true;
          }
          break;
        case 'admission':
          if (message.includes('hallo') || message.includes('guten') || message.includes('name')) {
            updated[0].completed = true;
          }
          if (message.includes('adresse') || message.includes('geboren') || message.includes('versicherung')) {
            updated[1].completed = true;
          }
          break;
        // Add more scenario-specific logic as needed
      }
      
      return updated;
    });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLLMLoading || isConversationComplete) return;

    try {
      const userMessage: DialogueLine = {
        speaker: 'user',
        text: currentMessage.trim()
      };

      const updatedConversation = [...conversation, userMessage];
      setConversation(updatedConversation);
      setCurrentMessage("");

      const response = await generateUnifiedResponse(currentMessage, conversation);

      const aiMessage: DialogueLine = {
        speaker: scenario.category === 'teamwork' ? 'colleague' : 'patient',
        text: response.patientReply
      };

      setConversation(prev => [...prev, aiMessage]);
      
      if (response.briefFeedback) {
        setFeedback(response.briefFeedback);
      }

      // Update checkpoints based on the conversation
      updateCheckpoints(currentMessage, response.patientReply);

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Fehler beim Senden der Nachricht");
    }
  };

  const handleRestart = () => {
    setConversation([]);
    setCurrentMessage("");
    setFeedback("");
    resetLLM();
    // Reset checkpoints
    setCheckpoints(prev => prev.map(cp => ({ ...cp, completed: false })));
    toast.success("Gespräch wurde zurückgesetzt");
  };

  const handleExit = () => {
    setShowExitConfirmation(false);
    onExit();
  };

  const completedTurns = Math.floor(conversation.length / 2);
  const progressPercentage = Math.min((completedTurns / 5) * 100, 100);

  return (
    <div className="h-screen bg-gradient-to-br from-medical-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-medical-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-medical-600"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Zurück
            </Button>
            <div>
              <h1 className="font-semibold text-medical-800">{scenario.title}</h1>
              <p className="text-sm text-medical-600">{scenario.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-medical-600" />
              <div className="w-24 bg-medical-100 rounded-full h-2">
                <div 
                  className="bg-medical-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm text-medical-700">{completedTurns}/5</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="border-medical-200"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Neustart
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExitConfirmation(true)}
              className="text-medical-600 hover:text-medical-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 min-h-0">
        {/* Conversation Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-medical-200 flex-shrink-0">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-medical-600" />
                <h3 className="font-medium text-medical-800">Gespräch</h3>
                {isConversationComplete && (
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Abgeschlossen
                  </Badge>
                )}
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversation.length === 0 && (
                  <div className="text-center text-medical-500 py-8">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>Beginnen Sie das Gespräch...</p>
                  </div>
                )}
                {conversation.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      line.speaker === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg text-sm",
                        line.speaker === 'user'
                          ? "bg-medical-600 text-white"
                          : "bg-white border border-medical-200 text-medical-800"
                      )}
                    >
                      <div className="mb-1">
                        <span className="text-xs opacity-70">
                          {line.speaker === 'user' 
                            ? 'Sie' 
                            : scenario.category === 'teamwork' 
                              ? 'Kollegin' 
                              : 'Patient'
                          }
                        </span>
                      </div>
                      {line.text}
                    </div>
                  </div>
                ))}
                {isLLMLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-medical-200 text-medical-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-medical-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-medical-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-medical-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-medical-200 flex-shrink-0">
              <div className="flex gap-2">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ihre Antwort eingeben..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                  disabled={isLLMLoading || isConversationComplete}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLLMLoading || isConversationComplete}
                  className="bg-medical-600 hover:bg-medical-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          {/* Checkpoint Tracker */}
          <CheckpointTracker checkpoints={checkpoints} />
          
          {/* Feedback */}
          <Card className="flex-1">
            <div className="p-4 border-b border-medical-200">
              <h3 className="font-medium text-medical-800">Live-Feedback</h3>
            </div>
            <div className="p-4">
              {feedback ? (
                <div className="bg-medical-50 border border-medical-200 rounded-lg p-3">
                  <p className="text-sm text-medical-700">{feedback}</p>
                </div>
              ) : (
                <p className="text-sm text-medical-500">
                  Ihr Feedback erscheint hier nach Ihren Antworten.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <ExitConfirmationDialog
        isOpen={showExitConfirmation}
        onClose={() => setShowExitConfirmation(false)}
        onConfirm={handleExit}
      />
    </div>
  );
};

export default StreamlinedInteractionScreen;
