import React, { useState, useEffect, useRef } from "react";
import { Scenario, DialogueLine } from "@/data/scenarios";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import { toast } from "sonner";
import { createPatientProfile } from "@/utils/patientProfiles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, RotateCcw, MessageCircle, CheckCircle, X, Volume2, VolumeX, User, Lightbulb, Heart, Calendar, Activity, Mic, MicOff, Plus, Minus, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import CheckpointTracker from "./CheckpointTracker";
import ExitConfirmationDialog from "./ExitConfirmationDialog";
import { PerformanceInsightsModal } from "./PerformanceInsightsModal";
import TTSButton from "./TTSButton";

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
  const [showGuidanceNotification, setShowGuidanceNotification] = useState(false);
  const [guidanceText, setGuidanceText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [waitingForCheckpointCompletion, setWaitingForCheckpointCompletion] = useState(false);
  const [languageFeedback, setLanguageFeedback] = useState<string>("");

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Create consistent patient profile that won't change during the interaction
  const [patientProfile] = useState(() => createPatientProfile(scenario.category, scenario));

  const { speak, isSpeaking, stop } = useTextToSpeech({
    autoPlay: true,
    onError: (error) => {
      console.error("TTS Error:", error);
      toast.error("Sprachausgabe-Fehler");
    }
  });

  const {
    text: recognizedText,
    isListening,
    startListening,
    stopListening,
    resetText,
    hasRecognitionSupport,
    error: voiceError
  } = useVoiceRecognition({
    language: 'de-DE',
    continuous: false,
    interimResults: false,
    onResult: (result, isFinal) => {
      if (isFinal && result.trim()) {
        setCurrentMessage(prev => prev + ' ' + result.trim());
        resetText();
      }
    },
    onError: (error) => {
      console.error("Voice recognition error:", error);
      toast.error("Spracherkennung-Fehler: " + error);
      setIsRecording(false);
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
    patientContext: patientProfile,
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

  // Fixed handleSendMessage function
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLLMLoading || conversationBlocked) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage("");

    // Add user message to conversation
    const newUserMessage: DialogueLine = {
      speaker: 'user',
      text: userMessage
    };

    setConversation(prev => [...prev, newUserMessage]);

    // Generate language feedback
    const langFeedback = generateLanguageFeedback(userMessage);
    setLanguageFeedback(langFeedback);

    // Check and update checkpoints
    const shouldContinue = updateCheckpoints(userMessage);

    if (!shouldContinue) {
      // If checkpoint logic is blocking, don't generate AI response yet
      return;
    }

    try {
      setConversationBlocked(true);

      // Generate AI response - pass userMessage as string and conversation history
      const response = await generateUnifiedResponse(
        userMessage,
        [...conversation, newUserMessage]
      );

      if (response?.patientReply) {
        const aiMessage: DialogueLine = {
          speaker: 'patient',
          text: response.patientReply
        };

        setConversation(prev => [...prev, aiMessage]);

        // Auto-play TTS for AI response if enabled
        if (isTTSEnabled) {
          speak(response.patientReply, 'patient');
        }

        // Set feedback if provided
        if (response.briefFeedback) {
          setFeedback(response.briefFeedback);
        }
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast.error("Fehler beim Generieren der Antwort");
    } finally {
      setConversationBlocked(false);
    }
  };

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [conversation, showGuidanceNotification, showSuggestion]);

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

  // Generate language feedback based on user input
  const generateLanguageFeedback = (userMessage: string): string => {
    const feedback: string[] = [];

    // Check capitalization of nouns (basic check for German)
    const germanNouns = ['Patient', 'Krankenhaus', 'Medikament', 'Arzt', 'Schwester', 'Behandlung', 'Therapie', 'Diagnose'];
    germanNouns.forEach(noun => {
      const lowerNoun = noun.toLowerCase();
      if (userMessage.includes(lowerNoun) && !userMessage.includes(noun)) {
        feedback.push(`Substantive werden großgeschrieben: "${lowerNoun}" → "${noun}"`);
      }
    });

    // Check formal address
    if (userMessage.includes('du') || userMessage.includes('dich') || userMessage.includes('dir')) {
      feedback.push('Verwenden Sie die höfliche Anrede "Sie" statt "du"');
    }

    // Check sentence structure
    if (userMessage.split('.').length === 1 && userMessage.length > 50) {
      feedback.push('Verwenden Sie kürzere Sätze für bessere Verständlichkeit');
    }

    // Check punctuation
    if (userMessage && !userMessage.trim().endsWith('.') && !userMessage.trim().endsWith('?') && !userMessage.trim().endsWith('!')) {
      feedback.push('Vergessen Sie nicht die Interpunktion am Satzende');
    }

    // Check for professional language
    if (userMessage.includes('ähm') || userMessage.includes('äh')) {
      feedback.push('Vermeiden Sie Füllwörter in der professionellen Kommunikation');
    }

    return feedback.length > 0 ? feedback.join('. ') : 'Gute Sprachverwendung!';
  };

  const getGuidanceText = (scenarioId: string, checkpointIndex: number): string => {
    const guidanceMap = {
      'admission': [
        'Focus on making a professional first impression. Introduce yourself with your name and role. Use a warm, friendly greeting and show that you are there for the patient.',
        'Now you need to systematically collect patient data. Ask specifically for full name, date of birth, and important contact details. Be structured and friendly.',
        'The medical history is crucial for further treatment. Ask about current complaints, previous illnesses, medications, and allergies. Listen actively and ask follow-up questions.',
        'Patients need orientation in the hospital. Explain the most important procedures, visiting hours, and how they can call for help. Be patient and understandable.',
        'Show empathy and understanding. Address concerns, reassure, and ensure your support. An open ear is often the most important thing.'
      ],
      'handover': [
        'Start with clear patient identification. State the full name, age, and room number. This prevents mix-ups.',
        'Use the proven SBAR method: Situation (what\'s happening?), Background (history), Assessment (evaluation), Recommendation (recommendation). This structures the handover professionally.',
        'All medications must be communicated precisely. State name, dosage, and time of last administration. This is essential for patient safety.',
        'Special events can be important for the next shift. Report on abnormalities, patient reactions, or special incidents.',
        'Ask actively if everything was understood. A good handover is a dialogue, not a monologue. Clarify uncertainties immediately.'
      ],
      'medication': [
        'Patient identification is the first step of any medication administration. Check name and date of birth - never just the name alone. This prevents dangerous mix-ups.',
        'Explain to the patient what they are receiving and why. Patients have the right to know which medications they receive. This creates trust and safety.',
        'Allergies can be life-threatening. Always ask about known intolerances before giving medication. Document the response.',
        'Inform about effects and possible side effects. The patient should know what to expect and what to watch out for.',
        'Monitor intake and document it correctly. Documentation is legally important and essential for further treatment.'
      ],
      'dementia-care': [
        'Patients with dementia need special attention. Approach slowly, speak calmly, and use their name. Create a trusting atmosphere.',
        'Your language must be simple and clear. Avoid complicated sentences, speak slowly and clearly. Repeat important information patiently.',
        'Patience and empathy are especially important here. Don\'t become impatient with repetitions or confusion. Show understanding for the patient\'s situation.',
        'Ensure a safe, calming environment. Remove hazards, ensure good lighting, and a quiet atmosphere.',
        'Respect the patient\'s dignity. People with dementia also have feelings and needs. Treat them with the same appreciation as any other patient.'
      ]
    };

    return guidanceMap[scenarioId]?.[checkpointIndex] || 'Focus on empathetic and professional communication. Think about what is most important for the patient in this situation.';
  };

  // Enhanced function to intelligently check and update checkpoints
  const updateCheckpoints = (userMessage: string): boolean => {
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
            (messageWords.length > 15 && (message.includes('patient') || message.includes('diagnose')))
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

      // Handle failed attempts with different responses
      if (!checkpointCompleted) {
        if (updated[currentIndex].attempts === 1) {
          // After first failed attempt: Show guidance notification
          setGuidanceText(getGuidanceText(scenario.id, currentIndex));
          setShowGuidanceNotification(true);
          setWaitingForCheckpointCompletion(true);
          return updated; // Block AI response
        } else if (updated[currentIndex].attempts >= 2) {
          // After second failed attempt: Show specific suggestions and auto-complete after use
          const suggestions = getConcreteCheckpointSuggestions(scenario.id, currentIndex);
          setSuggestionMessage(`Use one of these concrete formulations:`);
          setSuggestionOptions(suggestions);
          setShowSuggestion(true);
          setWaitingForCheckpointCompletion(true);
          return updated; // Block AI response
        }
      } else {
        // Checkpoint completed - allow AI to respond
        setWaitingForCheckpointCompletion(false);
        setShowGuidanceNotification(false);
        setShowSuggestion(false);
      }

      return updated;
    });

    return !waitingForCheckpointCompletion;
  };

  const getConcreteCheckpointSuggestions = (scenarioId: string, checkpointIndex: number): string[] => {
    const suggestions = {
      'admission': [
        [
          'Guten Tag! Mein Name ist Schwester/Pfleger [Ihr Name]. Ich werde Sie heute betreuen.',
          'Hallo, schön Sie kennenzulernen. Ich bin [Ihr Name] und arbeite hier als Pflegekraft.',
          'Willkommen auf unserer Station! Ich bin [Ihr Name] und kümmere mich um Sie.'
        ],
        [
          'Können Sie mir bitte Ihren vollständigen Namen und Ihr Geburtsdatum nennen?',
          'Für unsere Aufnahme brauche ich noch Ihre persönlichen Daten - wie ist Ihr vollständiger Name?',
          'Ich muss noch einige Angaben von Ihnen aufnehmen. Wie heißen Sie mit vollem Namen?'
        ],
        [
          'Erzählen Sie mir bitte von Ihren aktuellen Beschwerden. Welche Medikamente nehmen Sie regelmäßig?',
          'Was für gesundheitliche Probleme haben Sie? Haben Sie bekannte Allergien?',
          'Können Sie mir Ihre Krankengeschichte kurz erläutern? Welche Vorerkrankungen haben Sie?'
        ],
        [
          'Lassen Sie mich Ihnen erklären, wie der Tagesablauf hier auf der Station ist.',
          'Ich erkläre Ihnen gerne unsere Stationsregeln und die Besuchszeiten.',
          'Damit Sie sich orientieren können: Die Besuchszeiten sind von 14 bis 18 Uhr.'
        ],
        [
          'Haben Sie noch Fragen? Ich verstehe, dass eine Krankenhausaufnahme beunruhigend sein kann.',
          'Falls Sie Sorgen haben, können Sie mich jederzeit ansprechen. Ich bin für Sie da.',
          'Lassen Sie mich wissen, wenn Sie Hilfe brauchen - klingeln Sie einfach.'
        ]
      ],
      'handover': [
        [
          'Ich übergebe Ihnen Frau/Herrn [Patientenname], 58 Jahre, Zimmer 12.',
          'Hier die Übergabe: Patient [Name], aufgenommen wegen [Diagnose].',
          'Schichtübergabe für [Patientenname]: 58-jährige Patientin mit [Hauptdiagnose].'
        ],
        [
          'Situation: Patientin ist stabil, aber hat nächtliche Unruhe gezeigt. Background: Bekannte Herzinsuffizienz.',
          'Assessment: Derzeit schmerzfrei, aber Kreislauf muss überwacht werden. Recommendation: Vitalzeichen alle 4 Stunden.',
          'SBAR: Situation stabil, Background Diabetes, Assessment zeigt gute Blutzuckerwerte, Recommendation normale Kontrollen.'
        ],
        [
          'Aktuelle Medikation: Ramipril 5mg morgens, Metformin 1000mg zu den Mahlzeiten, letzte Gabe um 8 Uhr.',
          'Medikamente heute: Blutdrucksenker um 6 Uhr gegeben, Schmerzmittel bei Bedarf verfügbar.',
          'Therapie: Antibiotikum läuft noch bis morgen, Dosierung wurde nicht geändert.'
        ],
        [
          'Besondere Vorkommnisse: Um 3 Uhr nachts Verwirrtheit, hat sich nach Gespräch beruhigt.',
          'Auffälligkeiten: Patientin klagt über Übelkeit, Arzt ist informiert.',
          'Wichtiger Hinweis: Familie kommt heute Nachmittag zu Besuch, Patient freut sich sehr.'
        ],
        [
          'Haben Sie noch Fragen zur Übergabe? Ist alles verständlich?',
          'Brauchen Sie noch weitere Informationen zu diesem Patienten?',
          'Gibt es etwas Unklares? Soll ich noch etwas ergänzen?'
        ]
      ],
      'dementia-care': [
        [
          'Guten Tag, Frau/Herr [Name]. Ich bin [Ihr Name] und möchte Ihnen helfen.',
          'Hallo! Schön, Sie zu sehen. Mein Name ist [Name], ich kümmere mich um Sie.',
          'Guten Morgen! Ich bin hier, um Ihnen zu helfen. Mein Name ist [Name].'
        ],
        [
          'Können Sie mich gut verstehen? Ich spreche extra langsam für Sie.',
          'Verstehen Sie, was ich sage? Wir machen alles ganz in Ruhe.',
          'Ich erkläre Ihnen alles Schritt für Schritt. Können Sie mir folgen?'
        ],
        [
          'Das macht nichts, wenn Sie etwas vergessen. Wir haben alle Zeit der Welt.',
          'Ich verstehe, dass das verwirrend ist. Das ist völlig normal.',
          'Sie machen das gut. Lassen Sie sich nicht stressen.'
        ],
        [
          'Fühlen Sie sich hier sicher? Ich bleibe bei Ihnen.',
          'Ist Ihnen warm genug? Brauchen Sie eine Decke?',
          'Möchten Sie sich hinsetzen? Ich helfe Ihnen dabei.'
        ],
        [
          'Ihre Gefühle sind wichtig. Was beschäftigt Sie gerade?',
          'Sie sind ein wertvoller Mensch. Was möchten Sie jetzt gerne machen?',
          'Ihre Meinung zählt. Wie sehen Sie das?'
        ]
      ]
    };

    return suggestions[scenarioId]?.[checkpointIndex] || [
      'Versuchen Sie es mit einer direkteren Formulierung.',
      'Seien Sie konkreter in Ihrer Kommunikation.'
    ];
  };

  const handleUseSuggestion = (suggestion: string) => {
    setCurrentMessage(suggestion);
    setShowSuggestion(false);

    // Auto-complete the current checkpoint when suggestion is used
    setCheckpoints(prev => {
      const updated = [...prev];
      const currentIndex = updated.findIndex(cp => !cp.completed);
      if (currentIndex !== -1) {
        updated[currentIndex].completed = true;
      }
      return updated;
    });

    setWaitingForCheckpointCompletion(false);
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

  // Handle voice recording
  const handleVoiceRecording = async () => {
    if (isListening) {
      stopListening();
      setIsRecording(false);
    } else {
      try {
        setIsRecording(true);
        await startListening();
      } catch (error) {
        console.error("Error starting voice recording:", error);
        setIsRecording(false);
        toast.error("Spracherkennung konnte nicht gestartet werden");
      }
    }
  };

  // Font size controls
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 14));
  };

  const handleRestart = () => {
    setConversation([]);
    setCurrentMessage("");
    setFeedback("");
    setLanguageFeedback("");
    setShowCompletionModal(false);
    setConversationBlocked(false);
    setShowGuidanceNotification(false);
    setShowSuggestion(false);
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
  const currentCheckpoint = checkpoints.find(cp => !cp.completed);

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
            {/* Font Size Controls */}
            <div className="flex items-center gap-1 bg-medical-50 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={decreaseFontSize}
                className="h-6 w-6 p-0 text-medical-600"
                disabled={fontSize <= 14}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Type className="h-4 w-4 text-medical-600" />
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseFontSize}
                className="h-6 w-6 p-0 text-medical-600"
                disabled={fontSize >= 24}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

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
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={patientProfile.avatar_url} alt={patientProfile.name} />
                    <AvatarFallback className={`bg-gradient-to-br ${patientProfile.avatar_color} text-white font-semibold text-lg`}>
                      {patientProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium text-medical-800 text-lg">{patientProfile.name}</div>
                    <div className="flex items-center gap-3 text-medical-600 text-sm mt-1">
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
                    {patientProfile.previous_conditions && patientProfile.previous_conditions.length > 0 && (
                      <div className="text-xs text-medical-500 mt-1">
                        Vorerkrankungen: {patientProfile.previous_conditions.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {conversation.length === 0 && (
                  <div className="text-center text-medical-500 py-8">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-lg">Beginnen Sie das Gespräch mit {patientProfile.name}...</p>
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
                        "max-w-[80%] p-4 rounded-lg leading-relaxed",
                        line.speaker === 'user'
                          ? "bg-medical-600 text-white"
                          : "bg-white border border-medical-200 text-medical-800 shadow-sm"
                      )}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium opacity-70">
                          {line.speaker === 'user'
                            ? 'Sie'
                            : patientProfile.name
                          }
                        </span>
                        <TTSButton
                          textToRead={line.text}
                          speaker={line.speaker}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 ml-2"
                        />
                      </div>
                      {line.text}
                    </div>
                  </div>
                ))}

                {/* Unobtrusive Guidance Notification */}
                {showGuidanceNotification && (
                  <div className="flex justify-center">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg max-w-[80%] shadow-sm">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Guidance</p>
                          <p className="text-xs">{guidanceText}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowGuidanceNotification(false)}
                            className="mt-2 h-6 text-xs text-blue-700 hover:text-blue-800"
                          >
                            Got it
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                    <h4 className="font-medium text-amber-800 mb-1">Concrete Solution Suggestions</h4>
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
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area with Voice Recording */}
            <div className="p-4 border-t border-medical-200 flex-shrink-0">
              <div className="flex gap-2">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ihre Antwort eingeben oder per Sprache aufnehmen..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                  style={{ fontSize: `${fontSize}px` }}
                  disabled={isLLMLoading || conversationBlocked}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex flex-col space-y-2">
                  {/* TTS Button for current message */}
                  <TTSButton
                    textToRead={currentMessage}
                    speaker="user"
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0"
                    disabled={isLLMLoading || conversationBlocked || !currentMessage.trim()}
                  />

                  {hasRecognitionSupport && (
                    <Button 
                      onClick={handleVoiceRecording}
                      disabled={isLLMLoading || conversationBlocked}
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      className={cn(
                        "h-10 w-10 p-0",
                        isListening && "animate-pulse"
                      )}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isLLMLoading || conversationBlocked}
                    className="bg-medical-600 hover:bg-medical-700 h-10 w-10 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {isListening && (
                <div className="mt-2 text-sm text-medical-600 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Höre zu... Sprechen Sie jetzt
                </div>
              )}
              {voiceError && (
                <div className="mt-2 text-sm text-red-600">
                  Sprach-Fehler: {voiceError}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          {/* Checkpoint Tracker */}
          <CheckpointTracker checkpoints={checkpoints} />

          {/* Enhanced Language Feedback */}
          <Card className="flex-1">
            <div className="p-4 border-b border-medical-200">
              <h3 className="font-medium text-medical-800">Language Feedback</h3>
            </div>
            <div className="p-4">
              {languageFeedback ? (
                <div className={cn(
                  "border rounded-lg p-3",
                  languageFeedback.includes('Gute Sprachverwendung')
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-orange-50 border-orange-200 text-orange-800"
                )}>
                  <p className="text-sm">{languageFeedback}</p>
                </div>
              ) : (
                <p className="text-sm text-medical-500">
                  Your language feedback will appear here after your responses.
                </p>
              )}
            </div>
          </Card>

          {/* Content Feedback */}
          <Card>
            <div className="p-4 border-b border-medical-200">
              <h3 className="font-medium text-medical-800">Content Feedback</h3>
            </div>
            <div className="p-4">
              {feedback ? (
                <div className="bg-medical-50 border border-medical-200 rounded-lg p-3">
                  <p className="text-sm text-medical-700">{feedback}</p>
                </div>
              ) : (
                <p className="text-sm text-medical-500">
                  Content feedback will appear here after your responses.
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
