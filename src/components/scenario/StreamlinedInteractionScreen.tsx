import React, { useState, useEffect } from "react";
import { Scenario, DialogueLine } from "@/data/scenarios";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import { toast } from "sonner";
import { createPatientProfile } from "@/utils/patientProfiles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, RotateCcw, MessageCircle, CheckCircle, X, Volume2, VolumeX, User, Lightbulb, Heart, Calendar, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import CheckpointTracker from "./CheckpointTracker";
import ExitConfirmationDialog from "./ExitConfirmationDialog";
import { PerformanceInsightsModal } from "./PerformanceInsightsModal";

interface Checkpoint {
  id: string;
  description: string;
  completed: boolean;
  attempts: number;
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
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionInsights, setCompletionInsights] = useState("");
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);
  const [suggestionMessage, setSuggestionMessage] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionOptions, setSuggestionOptions] = useState<string[]>([]);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [conversationBlocked, setConversationBlocked] = useState(false);

  // Create consistent patient profile that won't change during the interaction
  const [patientProfile] = useState(() => createPatientProfile(scenario.category, scenario));

  const { speak, isSpeaking, stop } = useTextToSpeech({
    voice: 'Sarah',
    onError: (error) => {
      console.error("TTS Error:", error);
    }
  });

  const {
    generateUnifiedResponse,
    isLoading: isLLMLoading,
    reset: resetLLM,
    isConversationComplete
  } = useUnifiedMedicalLLM({
    scenarioType: scenario.category as any || 'patient-care',
    scenarioDescription: scenario.description || '',
    difficultyLevel: 'intermediate',
    patientContext: patientProfile, // Use the consistent patient profile
    userLanguage: 'en',
    onError: (error) => {
      console.error("LLM Error:", error);
      toast.error("Ein Fehler ist beim Generieren der Antwort aufgetreten.");
      setConversationBlocked(false);
    },
    onConversationComplete: () => {
      toast.success("Gespräch erfolgreich abgeschlossen!");
      setConversationBlocked(false);
    }
  });

  // Initialize checkpoints based on scenario
  useEffect(() => {
    const getCheckpointsForScenario = () => {
      switch (scenario.id) {
        case 'handover':
          return [
            { id: '1', description: 'Patientenidentifikation bestätigen', completed: false, attempts: 0 },
            { id: '2', description: 'Aktuelle Situation beschreiben (SBAR)', completed: false, attempts: 0 },
            { id: '3', description: 'Medikation und Änderungen kommunizieren', completed: false, attempts: 0 },
            { id: '4', description: 'Besondere Vorkommnisse erwähnen', completed: false, attempts: 0 },
            { id: '5', description: 'Rückfragen beantworten', completed: false, attempts: 0 }
          ];
        case 'admission':
          return [
            { id: '1', description: 'Freundliche Begrüßung und Vorstellung', completed: false, attempts: 0 },
            { id: '2', description: 'Persönliche Daten aufnehmen', completed: false, attempts: 0 },
            { id: '3', description: 'Anamnese erheben', completed: false, attempts: 0 },
            { id: '4', description: 'Abläufe und Regeln erklären', completed: false, attempts: 0 },
            { id: '5', description: 'Fragen beantworten und beruhigen', completed: false, attempts: 0 }
          ];
        case 'medication':
          return [
            { id: '1', description: 'Patientenidentifikation prüfen', completed: false, attempts: 0 },
            { id: '2', description: 'Medikament und Dosierung erklären', completed: false, attempts: 0 },
            { id: '3', description: 'Allergien und Unverträglichkeiten erfragen', completed: false, attempts: 0 },
            { id: '4', description: 'Wirkung und Nebenwirkungen erläutern', completed: false, attempts: 0 },
            { id: '5', description: 'Einnahme überwachen', completed: false, attempts: 0 }
          ];
        case 'dementia-care':
          return [
            { id: '1', description: 'Ruhige und respektvolle Begrüßung', completed: false, attempts: 0 },
            { id: '2', description: 'Einfache und klare Sprache verwenden', completed: false, attempts: 0 },
            { id: '3', description: 'Geduld und Empathie zeigen', completed: false, attempts: 0 },
            { id: '4', description: 'Sicherheit und Komfort gewährleisten', completed: false, attempts: 0 },
            { id: '5', description: 'Würde des Patienten respektieren', completed: false, attempts: 0 }
          ];
        default:
          return [
            { id: '1', description: 'Professionellen Kontakt herstellen', completed: false, attempts: 0 },
            { id: '2', description: 'Bedürfnisse erfassen', completed: false, attempts: 0 },
            { id: '3', description: 'Informationen vermitteln', completed: false, attempts: 0 },
            { id: '4', description: 'Empathisch reagieren', completed: false, attempts: 0 },
            { id: '5', description: 'Situation erfolgreich abschließen', completed: false, attempts: 0 }
          ];
      }
    };

    setCheckpoints(getCheckpointsForScenario());
  }, [scenario.id]);

  // Enhanced function to intelligently check and update checkpoints
  const updateCheckpoints = (userMessage: string, aiResponse: string) => {
    setCheckpoints(prev => {
      const updated = [...prev];
      const message = userMessage.toLowerCase();
      const messageWords = message.split(' ');
      
      // Find the current active checkpoint (first incomplete one)
      const currentIndex = updated.findIndex(cp => !cp.completed);
      if (currentIndex === -1) return updated; // All completed
      
      // Increment attempts for current checkpoint
      updated[currentIndex].attempts += 1;
      
      let checkpointCompleted = false;
      
      // Enhanced evaluation logic based on scenario type
      switch (scenario.id) {
        case 'admission':
          // Check for friendly greeting and introduction
          if (currentIndex === 0 && (
            message.includes('hallo') || message.includes('guten') ||
            message.includes('willkommen') || message.includes('name') ||
            message.includes('ich bin') || message.includes('mein name')
          )) {
            updated[0].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for personal data collection
          if (currentIndex === 1 && (
            message.includes('name') || message.includes('geburtsdatum') ||
            message.includes('adresse') || message.includes('versicherung') ||
            message.includes('personalien') || message.includes('daten') ||
            message.includes('wie heißen sie') || message.includes('geboren') ||
            message.includes('alter') || message.includes('wohnen')
          )) {
            updated[1].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for medical history
          if (currentIndex === 2 && (
            message.includes('anamnese') || message.includes('vorerkrankung') ||
            message.includes('medikament') || message.includes('allergie') ||
            message.includes('beschwerden') || message.includes('symptom') ||
            message.includes('krank') || message.includes('gesundheit')
          )) {
            updated[2].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for explaining procedures
          if (currentIndex === 3 && (
            message.includes('ablauf') || message.includes('regel') ||
            message.includes('besuchszeit') || message.includes('station') ||
            message.includes('erklär') || message.includes('inform') ||
            message.includes('routine') || message.includes('zeitplan')
          )) {
            updated[3].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for answering questions and reassuring
          if (currentIndex === 4 && (
            message.includes('frage') || message.includes('sorge') ||
            message.includes('beruhig') || message.includes('keine angst') ||
            message.includes('verstehe') || message.includes('hilfe') ||
            message.includes('unterstütz') || message.includes('da sein')
          )) {
            updated[4].completed = true;
            checkpointCompleted = true;
          }
          break;
          
        case 'handover':
          if (!updated[0].completed && (
            message.includes('name') || message.includes('frau') || message.includes('herr') ||
            message.includes('patient') || /\b(ich bin|mein name|heiße)\b/.test(message)
          )) {
            updated[0].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for SBAR methodology
          if (!updated[1].completed && (
            message.includes('zustand') || message.includes('situation') || 
            message.includes('background') || message.includes('assessment') ||
            messageWords.length > 15 && (message.includes('patient') || message.includes('diagnose'))
          )) {
            updated[1].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for medication communication
          if (!updated[2].completed && (
            message.includes('medikament') || message.includes('therapie') || 
            message.includes('tablette') || message.includes('dosierung') ||
            message.includes('mg') || message.includes('behandlung')
          )) {
            updated[2].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for special incidents
          if (!updated[3].completed && (
            message.includes('vorkommnis') || message.includes('besonder') ||
            message.includes('auffällig') || message.includes('ereignis') ||
            message.includes('problem') || message.includes('schwierig')
          )) {
            updated[3].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for answering questions (if AI asked questions)
          if (!updated[4].completed && conversation.length > 6) {
            updated[4].completed = true;
            checkpointCompleted = true;
          }
          break;
          
        case 'dementia-care':
          // Check for calm and respectful greeting
          if (!updated[0].completed && (
            message.includes('hallo') || message.includes('guten') ||
            message.includes('schön') || /\b(ruhe|ruhig|sanft)\b/.test(message) ||
            messageWords.length < 10 // Simple, not overwhelming greeting
          )) {
            updated[0].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for simple and clear language (short sentences, common words)
          if (!updated[1].completed && messageWords.length < 15 && 
              !message.includes('kompliziert') && !message.includes('schwierig')) {
            updated[1].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for patience and empathy
          if (!updated[2].completed && (
            message.includes('verstehe') || message.includes('geduld') ||
            message.includes('zeit') || message.includes('langsam') ||
            message.includes('gefühl') || message.includes('sorge')
          )) {
            updated[2].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for safety and comfort
          if (!updated[3].completed && (
            message.includes('sicher') || message.includes('komfort') ||
            message.includes('wohl') || message.includes('hilfe') ||
            message.includes('unterstütz')
          )) {
            updated[3].completed = true;
            checkpointCompleted = true;
          }
          
          // Check for respecting dignity
          if (!updated[4].completed && (
            message.includes('respekt') || message.includes('würde') ||
            message.includes('selbstbestimm') || message.includes('entscheid') ||
            !message.includes('können sie nicht') // Avoiding negative phrasing
          )) {
            updated[4].completed = true;
            checkpointCompleted = true;
          }
          break;
      }
      
      // If checkpoint wasn't completed and we've reached 2 attempts, show suggestion
      if (!checkpointCompleted && updated[currentIndex].attempts >= 2) {
        const suggestions = getSuggestionsForCheckpoint(scenario.id, currentIndex);
        setSuggestionMessage(`Hier sind einige Vorschläge, um das Lernziel zu erreichen:`);
        setSuggestionOptions(suggestions);
        setShowSuggestion(true);
        // Reset attempts to give user another chance after suggestion
        updated[currentIndex].attempts = 0;
      }
      
      return updated;
    });
  };

  const getSuggestionsForCheckpoint = (scenarioId: string, checkpointIndex: number): string[] => {
    const suggestions = {
      'admission': [
        ['Guten Tag, mein Name ist [Ihr Name]. Ich bin Ihre Pflegekraft heute.', 'Hallo! Schön, Sie kennenzulernen. Wie kann ich Ihnen helfen?'],
        ['Können Sie mir bitte Ihren vollständigen Namen und Ihr Geburtsdatum nennen?', 'Für unsere Unterlagen benötige ich Ihre persönlichen Daten.'],
        ['Erzählen Sie mir von Ihren aktuellen Beschwerden. Nehmen Sie regelmäßig Medikamente?', 'Haben Sie Allergien oder Vorerkrankungen, die ich wissen sollte?'],
        ['Lassen Sie mich Ihnen kurz erklären, wie der Tagesablauf hier auf der Station ist.', 'Die Besuchszeiten sind von 14-18 Uhr. Haben Sie Familie, die Sie besuchen wird?'],
        ['Haben Sie noch Fragen? Ich verstehe, dass die neue Situation beunruhigend sein kann.', 'Sie können mich jederzeit rufen, wenn Sie Hilfe brauchen.']
      ],
      'handover': [
        ['Ich übergebe Ihnen Frau/Herrn [Name], Zimmer [Nummer].', 'Hier ist die Übergabe für unseren Patienten.'],
        ['Situation: Der Patient ist wegen [Diagnose] hier. Background: Relevante Vorgeschichte...', 'Der aktuelle Zustand ist stabil, aber es gibt folgende Punkte zu beachten...'],
        ['Aktuelle Medikation: [Medikament], [Dosierung], letzte Gabe um [Zeit].', 'Heute wurden folgende Medikamente verabreicht...'],
        ['Besondere Vorkommnisse: [Ereignis] um [Zeit].', 'In der letzten Schicht gab es folgende Auffälligkeiten...'],
        ['Gibt es noch Fragen zur Übergabe?', 'Ist alles klar soweit? Brauchen Sie noch weitere Informationen?']
      ],
      'dementia-care': [
        ['Guten Tag, [Name]. Ich bin hier, um Ihnen zu helfen.', 'Hallo! Wie geht es Ihnen heute?'],
        ['Verstehen Sie mich gut? Ich spreche langsam und deutlich.', 'Können Sie mir folgen? Wir gehen Schritt für Schritt vor.'],
        ['Ich verstehe, dass das verwirrend sein kann. Lassen Sie sich Zeit.', 'Sie machen das gut. Keine Eile.'],
        ['Fühlen Sie sich sicher hier? Ich bleibe bei Ihnen.', 'Brauchen Sie etwas, um sich wohler zu fühlen?'],
        ['Sie sind eine wertvolle Person. Ihre Gefühle sind wichtig.', 'Ich respektiere Ihre Entscheidungen. Was möchten Sie?']
      ]
    };
    
    return suggestions[scenarioId]?.[checkpointIndex] || ['Versuchen Sie es mit einer anderen Formulierung.', 'Seien Sie direkter in Ihrer Kommunikation.'];
  };

  const handleUseSuggestion = (suggestion: string) => {
    setCurrentMessage(suggestion);
    setShowSuggestion(false);
  };

  // Check if all checkpoints are completed
  useEffect(() => {
    const allCompleted = checkpoints.length > 0 && checkpoints.every(cp => cp.completed);
    if (allCompleted && !showCompletionModal && conversation.length > 0) {
      const insights = generateCompletionInsights();
      setCompletionInsights(insights);
      setShowCompletionModal(true);
    }
  }, [checkpoints, showCompletionModal, conversation.length]);

  const generateCompletionInsights = () => {
    const scenarioSpecificInsights = {
      'handover': 'Ausgezeichnet! Sie haben alle wichtigen Aspekte einer professionellen Schichtübergabe berücksichtigt. Ihre strukturierte Herangehensweise und die Verwendung des SBAR-Schemas zeigen, dass Sie die Patientensicherheit ernst nehmen.',
      'dementia-care': 'Wunderbar! Sie haben mit großer Empathie und Professionalität gehandelt. Ihre ruhige Art und die einfache Sprache sind genau das, was Patienten mit Demenz brauchen.',
      'admission': 'Sehr gut! Sie haben den Patienten herzlich empfangen und alle notwendigen Informationen gesammelt. Ihre freundliche Art hilft dabei, Ängste abzubauen.',
      'medication': 'Perfekt! Sie haben alle Sicherheitsaspekte der Medikamentengabe beachtet. Ihre sorgfältige Vorgehensweise schützt den Patienten vor Fehlern.'
    };
    
    return scenarioSpecificInsights[scenario.id] || 'Herzlichen Glückwunsch! Sie haben alle Lernziele erfolgreich erreicht und gezeigt, dass Sie die Situation professionell meistern können.';
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLLMLoading || conversationBlocked) return;

    try {
      setConversationBlocked(true);
      
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
      
      // Text-to-speech for patient responses
      if (isTTSEnabled && response.patientReply) {
        speak(response.patientReply);
      }
      
      if (response.briefFeedback) {
        setFeedback(response.briefFeedback);
      }

      // Update checkpoints based on the conversation
      updateCheckpoints(currentMessage, response.patientReply);
      
      setConversationBlocked(false);

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Fehler beim Senden der Nachricht");
      setConversationBlocked(false);
    }
  };

  const handleRestart = () => {
    setConversation([]);
    setCurrentMessage("");
    setFeedback("");
    setShowCompletionModal(false);
    setConversationBlocked(false);
    resetLLM();
    // Reset checkpoints
    setCheckpoints(prev => prev.map(cp => ({ ...cp, completed: false, attempts: 0 })));
    toast.success("Gespräch wurde zurückgesetzt");
  };

  const handleExit = () => {
    setShowExitConfirmation(false);
    onExit();
  };

  const handleCompletionClose = () => {
    setShowCompletionModal(false);
    onExit();
  };

  const handleNextExercise = () => {
    setShowCompletionModal(false);
    // For now, go back to exercises - in future this could navigate to next scenario
    onExit();
  };

  const completedCount = checkpoints.filter(cp => cp.completed).length;

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
            {/* TTS Toggle */}
            <div className="flex items-center gap-2">
              <VolumeX className="h-4 w-4 text-medical-600" />
              <Switch
                checked={isTTSEnabled}
                onCheckedChange={setIsTTSEnabled}
                className="data-[state=checked]:bg-medical-600"
              />
              <Volume2 className="h-4 w-4 text-medical-600" />
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
              <div className="flex items-center justify-between">
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
                {/* Enhanced Patient Info with Avatar */}
                <div className="flex items-center gap-3 bg-medical-50 rounded-lg px-4 py-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" alt={patientProfile.name} />
                    <AvatarFallback className={`bg-gradient-to-br ${patientProfile.avatar_color} text-white font-semibold`}>
                      {patientProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium text-medical-800">{patientProfile.name}</div>
                    <div className="flex items-center gap-3 text-medical-600 text-xs mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {patientProfile.age} Jahre
                      </span>
                      {patientProfile.condition && (
                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {patientProfile.condition}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversation.length === 0 && (
                  <div className="text-center text-medical-500 py-8">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-base">Beginnen Sie das Gespräch mit {patientProfile.name}...</p>
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
                        "max-w-[80%] p-4 rounded-lg text-base leading-relaxed",
                        line.speaker === 'user'
                          ? "bg-medical-600 text-white"
                          : "bg-white border border-medical-200 text-medical-800 shadow-sm"
                      )}
                    >
                      <div className="mb-2">
                        <span className="text-sm font-medium opacity-70">
                          {line.speaker === 'user' 
                            ? 'Sie' 
                            : patientProfile.name
                          }
                        </span>
                      </div>
                      {line.text}
                    </div>
                  </div>
                ))}
                {isLLMLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-medical-200 text-medical-800 p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-medical-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-medical-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-medical-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                {isSpeaking && (
                  <div className="flex justify-start">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-2 rounded-lg text-sm flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <span>Sprachausgabe aktiv...</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={stop}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Enhanced Suggestion Display */}
            {showSuggestion && (
              <div className="p-4 bg-amber-50 border-t border-amber-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-800 mb-1">Hilfestellung</h4>
                    <p className="text-sm text-amber-700 mb-3">{suggestionMessage}</p>
                    <div className="grid gap-2">
                      {suggestionOptions.map((option, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={() => handleUseSuggestion(option)}
                          className="border-amber-300 text-amber-700 hover:bg-amber-100 text-left justify-start h-auto p-3 whitespace-normal"
                        >
                          {option}
                        </Button>
                      ))}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowSuggestion(false)}
                        className="text-amber-600 mt-2"
                      >
                        Selbst versuchen
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-medical-200 flex-shrink-0">
              <div className="flex gap-2">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ihre Antwort eingeben..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none text-base"
                  disabled={isLLMLoading || conversationBlocked}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLLMLoading || conversationBlocked}
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

      <PerformanceInsightsModal
        isOpen={showCompletionModal}
        insights={completionInsights}
        completedGoals={completedCount}
        totalGoals={checkpoints.length}
        scenarioType={scenario.category}
        onClose={handleCompletionClose}
        onRestart={handleNextExercise}
      />
    </div>
  );
};

export default StreamlinedInteractionScreen;
