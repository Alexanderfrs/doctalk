
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useUnifiedMedicalLLM from "@/hooks/useUnifiedMedicalLLM";
import { DialogueLine } from "@/data/scenarios";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import AudioPlayButton from "./AudioPlayButton";
import TTSSettings from "./TTSSettings";

interface StreamlinedInteractionScreenProps {
  scenario: any;
  onBack: () => void;
  onComplete: () => void;
}

interface ExtendedDialogueLine extends DialogueLine {
  id: string;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  onBack,
  onComplete
}) => {
  const [conversation, setConversation] = useState<ExtendedDialogueLine[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  const { 
    generateUnifiedResponse
  } = useUnifiedMedicalLLM({
    scenarioType: scenario.category,
    scenarioDescription: scenario.description,
    difficultyLevel: 'intermediate',
    userLanguage: 'de'
  });

  const { 
    speak, 
    isSpeaking, 
    isLoadingAudio,
    currentMessageId,
    isEnabled: ttsEnabled, 
    setEnabled: setTTSEnabled 
  } = useTextToSpeech({
    autoPlay: true,
    onError: (error) => console.error('TTS Error:', error)
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize conversation with the initial dialogue
    if (scenario.initialDialogue && conversation.length === 0) {
      const extendedDialogue = scenario.initialDialogue.map((line: DialogueLine, index: number) => ({
        ...line,
        id: `initial-${index}`
      }));
      setConversation(extendedDialogue);
      
      // Optionally, trigger TTS for the initial AI message
      const initialAiMessage = extendedDialogue.find(line => line.speaker === 'patient');
      if (initialAiMessage && ttsEnabled) {
        speak(initialAiMessage.text, 'patient', initialAiMessage.id);
      }
    }
  }, [scenario.initialDialogue, conversation.length, ttsEnabled, speak]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCurrentInput(text);
    setCharCount(text.length);
  };

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ExtendedDialogueLine = {
      speaker: 'user',
      text: message,
      id: `user-${Date.now()}`
    };
    
    setConversation(prev => [...prev, userMessage]);
    setCurrentInput('');
    setCharCount(0);
    setIsLoading(true);

    try {
      console.log('Sending user message to LLM:', message);
      const response = await generateUnifiedResponse(
        message,
        conversation
      );
      
      if (response?.patientReply) {
        const aiMessage: ExtendedDialogueLine = {
          speaker: 'patient',
          text: response.patientReply,
          id: `ai-${Date.now()}`
        };
        
        setConversation(prev => [...prev, aiMessage]);
        
        // Auto-play TTS for AI response if enabled
        if (ttsEnabled) {
          speak(response.patientReply, 'patient', aiMessage.id);
        }
        
        if (response.briefFeedback) {
          setFeedback(response.briefFeedback);
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Fehler beim Generieren der Antwort');
    } finally {
      setIsLoading(false);
    }
  }, [conversation, isLoading, generateUnifiedResponse, ttsEnabled, speak]);

  const handlePlayAudio = (text: string, speaker: string, messageId?: string) => {
    speak(text, speaker, messageId);
  };

  const getSpeakerBadgeColor = (speaker: string) => {
    switch (speaker) {
      case 'patient': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'doctor': return 'bg-green-100 text-green-800 border-green-200';
      case 'colleague': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpeakerName = (speaker: string) => {
    switch (speaker) {
      case 'patient': return 'Patient';
      case 'doctor': return 'Arzt';
      case 'colleague': return 'Kollege';
      default: return 'Sie';
    }
  };

  const feedbackItems = feedback ? feedback.split(';').map(item => item.trim()) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-medical-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-medical-600 hover:text-medical-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Zurück
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-medical-800">
                  {scenario.title}
                </h1>
                <p className="text-sm text-medical-600">
                  {scenario.description}
                </p>
              </div>
            </div>
            
            <TTSSettings 
              isEnabled={ttsEnabled}
              onToggle={setTTSEnabled}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-2 py-4">
                <MessageSquare className="h-5 w-5 text-medical-600" />
                <CardTitle className="text-lg">Gespräch</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {conversation.map((line) => (
                    <div
                      key={line.id}
                      className={cn(
                        "flex flex-col space-y-2 p-3 rounded-lg",
                        line.speaker === 'user' 
                          ? "bg-medical-50 ml-8" 
                          : "bg-gray-50 mr-8"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={getSpeakerBadgeColor(line.speaker)}
                        >
                          {getSpeakerName(line.speaker)}
                        </Badge>
                        
                        <div className="flex items-center space-x-2">
                          <AudioPlayButton
                            text={line.text}
                            speaker={line.speaker}
                            messageId={line.id}
                            onPlay={handlePlayAudio}
                            isPlaying={isSpeaking && currentMessageId === line.id}
                            isLoading={isLoadingAudio && currentMessageId === line.id}
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed">{line.text}</p>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="bg-gray-50 mr-8 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Patient
                        </Badge>
                        <div className="animate-pulse flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-500">antwortet...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <div className="border-t pt-4">
                  <div className="space-y-3">
                    <Textarea
                      value={currentInput}
                      onChange={handleInputChange}
                      placeholder="Ihre Antwort eingeben..."
                      className="min-h-[80px] resize-none"
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(currentInput);
                        }
                      }}
                    />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {charCount}/500 Zeichen
                      </span>
                      
                      <Button
                        onClick={() => handleSendMessage(currentInput)}
                        disabled={!currentInput.trim() || isLoading}
                        size="sm"
                        className="bg-medical-600 hover:bg-medical-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Senden
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {feedback && (
              <Card>
                <CardHeader>
                  <CardTitle>Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {feedbackItems.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Fortschritt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Hier könnte eine Fortschrittsanzeige oder ein Fortschrittsbalken sein.
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={onComplete}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Szenario abschließen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamlinedInteractionScreen;
