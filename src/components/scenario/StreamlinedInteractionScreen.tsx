
import React, { useState, useEffect, useRef } from "react";
import { Scenario } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, CheckCircle } from "lucide-react";
import { default as useUnifiedMedicalLLM } from "@/hooks/useUnifiedMedicalLLM";
import ConversationInput from "./ConversationInput";
import FeedbackDisplay from "./FeedbackDisplay";
import { toast } from "sonner";
import ConfidenceRating from "./ConfidenceRating";
import { useProgressTracking } from "@/hooks/useProgressTracking";

interface StreamlinedInteractionScreenProps {
  scenario: Scenario;
  onBack: () => void;
  onExit: () => void;
  onComplete?: () => void;
}

interface ConversationMessage {
  id: string;
  type: 'user' | 'patient' | 'system';
  content: string;
  timestamp: Date;
  feedback?: string;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  onBack,
  onExit,
  onComplete
}) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfidenceRating, setShowConfidenceRating] = useState(false);
  const [isSubmittingConfidence, setIsSubmittingConfidence] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<Date>(new Date());
  
  const { recordScenarioAttempt } = useProgressTracking();
  
  // Create mock checkpoints for conversation flow
  const totalSteps = 3;
  const mockCheckpoints = [
    { description: "Initiate conversation and gather initial information" },
    { description: "Discuss main concerns and provide guidance" },
    { description: "Conclude conversation and provide next steps" }
  ];
  
  const {
    generateUnifiedResponse,
    isLoading,
    error
  } = useUnifiedMedicalLLM({
    scenarioType: scenario.category,
    onPatientResponse: (response) => {
      const patientMessage: ConversationMessage = {
        id: `patient-${Date.now()}`,
        type: 'patient',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, patientMessage]);
      
      // Check if we've completed all steps
      if (currentStep >= totalSteps - 1) {
        setIsComplete(true);
        setShowConfidenceRating(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    },
    onError: (error) => {
      toast.error("Connection error. Please try again.");
      console.error("LLM Error:", error);
    }
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with scenario introduction
  useEffect(() => {
    const patientName = scenario.title.includes('patient') ? 'the patient' : 'Patient';
    const introMessage: ConversationMessage = {
      id: 'intro',
      type: 'system',
      content: `You are now speaking with ${patientName}. Begin the conversation.`,
      timestamp: new Date()
    };
    setMessages([introMessage]);
  }, [scenario]);

  const handleUserMessage = async (message: string) => {
    // Add user message to conversation
    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send to LLM for processing
    try {
      await generateUnifiedResponse(message, messages);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response. Please try again.");
    }
  };

  const handleConfidenceSubmit = async (confidenceScore: number) => {
    setIsSubmittingConfidence(true);
    
    try {
      const duration = Math.round((new Date().getTime() - startTime.current.getTime()) / (1000 * 60));
      
      // Record scenario attempt with confidence score
      await recordScenarioAttempt({
        scenario_id: scenario.id,
        scenario_type: scenario.category,
        duration_minutes: duration,
        confidence_score: confidenceScore,
        notes: `Completed ${scenario.title} simulation`
      });
      
      toast.success("Thank you for your feedback!");
      
      // Complete the scenario
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error recording confidence score:", error);
      toast.error("Failed to save your feedback. Please try again.");
    } finally {
      setIsSubmittingConfidence(false);
    }
  };

  if (showConfidenceRating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold text-medical-800">Scenario Complete!</h2>
            </div>
            <p className="text-medical-600">
              You've successfully completed the {scenario.title} simulation.
            </p>
          </div>
          
          <ConfidenceRating
            onSubmit={handleConfidenceSubmit}
            isSubmitting={isSubmittingConfidence}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100">
      {/* Header */}
      <div className="bg-white border-b border-medical-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-medical-600 hover:text-medical-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="font-semibold text-medical-800">{scenario.title}</h1>
              <p className="text-sm text-medical-600">
                Step {currentStep + 1} of {totalSteps}
                {isComplete && " - Complete!"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-medical-600 hover:text-medical-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {/* Current Objective */}
          {!isComplete && (
            <Card className="p-4 bg-medical-50 border-medical-200">
              <h3 className="font-medium text-medical-800 mb-2">Current Objective:</h3>
              <p className="text-medical-700">{mockCheckpoints[currentStep]?.description}</p>
            </Card>
          )}

          {/* Messages */}
          <Card className="min-h-[400px] max-h-[500px] overflow-y-auto">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-medical-600 text-white'
                        : message.type === 'patient'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-medical-100 text-medical-800 text-center italic'
                    }`}
                  >
                    {message.type === 'patient' && (
                      <div className="text-xs font-medium mb-1 opacity-70">
                        Patient
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.feedback && (
                      <FeedbackDisplay feedback={message.feedback} />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Card>

          {/* Input Area */}
          {!isComplete && (
            <ConversationInput
              onSendMessage={handleUserMessage}
              placeholder="Respond to the patient..."
            />
          )}

          {/* Completion Message */}
          {isComplete && !showConfidenceRating && (
            <Card className="p-6 text-center bg-green-50 border-green-200">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Scenario Complete!
              </h3>
              <p className="text-green-700 mb-4">
                You've successfully navigated through all conversation steps.
              </p>
            </Card>
          )}
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default StreamlinedInteractionScreen;
