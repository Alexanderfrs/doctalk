
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, X, Settings, Volume2, VolumeX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import useUnifiedMedicalLLM from '@/hooks/useUnifiedMedicalLLM';
import TTSButton from './TTSButton';
import TTSSettings from './TTSSettings';
import useTextToSpeech from '@/hooks/useTextToSpeech';

interface StreamlinedInteractionScreenProps {
  scenario: any;
  onBack: () => void;
  onExit: () => void;
}

interface Message {
  id: string;
  text: string;
  speaker: 'user' | 'patient';
  timestamp: Date;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  onBack,
  onExit
}) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationBlocked, setConversationBlocked] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAIResponseRef = useRef<string>('');

  const { 
    sendMessage, 
    isLoading: isLLMLoading, 
    error: llmError, 
    conversationHistory 
  } = useUnifiedMedicalLLM();

  const { 
    speak, 
    isEnabled: isTTSEnabled, 
    setEnabled: setTTSEnabled 
  } = useTextToSpeech({
    autoPlay: true,
    onError: (error) => console.error('TTS Error in StreamlinedScreen:', error)
  });

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle LLM errors
  useEffect(() => {
    if (llmError) {
      console.error('LLM Error:', llmError);
      toast.error('Fehler bei der KI-Antwort: ' + llmError);
      setConversationBlocked(false);
    }
  });

  // Fixed handleSendMessage function with automatic TTS
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLLMLoading || conversationBlocked) return;

    console.log('Sending message:', currentMessage);

    // Add user message to local state
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: currentMessage.trim(),
      speaker: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage.trim();
    setCurrentMessage('');
    setConversationBlocked(true);

    try {
      console.log('Calling LLM with scenario:', scenario.id);
      const response = await sendMessage(
        messageToSend,
        scenario.id,
        scenario.context || scenario.description || '',
        scenario.patientProfile || {}
      );

      console.log('LLM Response received:', response);

      if (response?.patientReply) {
        // Add AI message to local state
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: response.patientReply,
          speaker: 'patient',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);

        // Auto-play TTS for AI response if enabled
        if (isTTSEnabled) {
          console.log('Auto-playing TTS for AI response');
          // Small delay to ensure the UI is updated before starting TTS
          setTimeout(async () => {
            try {
              await speak(response.patientReply, 'patient');
            } catch (error) {
              console.error('Failed to auto-play TTS:', error);
            }
          }, 300);
        }

        // Set feedback if provided
        if (response.feedback) {
          setFeedback(response.feedback);
          setTimeout(() => setFeedback(''), 8000);
        }

        lastAIResponseRef.current = response.patientReply;
      } else {
        console.warn('No patient reply in response:', response);
        toast.error('Keine Antwort vom Patienten erhalten');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Fehler beim Senden der Nachricht');
    } finally {
      setConversationBlocked(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {scenario.title}
              </h1>
              <p className="text-sm text-gray-600">
                {scenario.department}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TTSSettings 
              isEnabled={isTTSEnabled}
              onToggle={setTTSEnabled}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onExit}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col p-4">
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col space-y-2 p-4 rounded-lg",
                    message.speaker === 'user'
                      ? "bg-medical-50 ml-8"
                      : "bg-gray-50 mr-8"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={
                        message.speaker === 'user'
                          ? "bg-gray-100 text-gray-800 border-gray-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      {message.speaker === 'user' ? 'Sie' : 'Patient'}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <TTSButton
                        textToRead={message.text}
                        speaker={message.speaker}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                      />
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString('de-DE', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              ))}

              {/* Loading indicator */}
              {isLLMLoading && (
                <div className="bg-gray-50 mr-8 p-4 rounded-lg">
                  <div className="flex items-center space-y-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Patient
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-500">Patient antwortet...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ihre Antwort eingeben oder per Sprache aufnehmen..."
                  className="flex-1"
                  disabled={isLLMLoading || conversationBlocked}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLLMLoading || conversationBlocked}
                  className="bg-medical-600 hover:bg-medical-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Feedback Display */}
              {feedback && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">{feedback}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StreamlinedInteractionScreen;
