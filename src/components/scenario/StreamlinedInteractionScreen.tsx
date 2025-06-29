
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Target, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Scenario } from "@/data/scenarios";
import { PatientProfile } from "@/utils/patientProfiles";
import ConversationTab from "./tabs/ConversationTab";
import FeedbackDisplay from "./FeedbackDisplay";
import CheckpointTracker from "./CheckpointTracker";
import { useTranslation } from "@/hooks/useTranslation";
import { getScenarioLearningObjectives, getScenarioTitle } from "@/utils/scenarioTranslations";

interface StreamlinedInteractionScreenProps {
  scenario: Scenario;
  patientProfile: PatientProfile;
  onExit: () => void;
}

const StreamlinedInteractionScreen: React.FC<StreamlinedInteractionScreenProps> = ({
  scenario,
  patientProfile,
  onExit
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [languageFeedback, setLanguageFeedback] = useState<string>("");
  const [contentFeedback, setContentFeedback] = useState<string>("");

  // Get translated learning objectives
  const learningObjectives = getScenarioLearningObjectives(scenario.id, t);
  const scenarioTitle = getScenarioTitle(scenario.id, t);

  // Create checkpoints from learning objectives
  const checkpoints = learningObjectives.map((objective, index) => ({
    id: `checkpoint-${index}`,
    description: objective,
    completed: false,
    attempts: 0
  }));

  const handleSendMessage = async (message: string) => {
    console.log("Sending message:", message);
    setIsAIResponding(true);
    
    try {
      // Simulate AI response - replace with actual implementation
      setTimeout(() => {
        setAiResponse("This is a simulated response from the AI system.");
        setLanguageFeedback("Good grammar and pronunciation.");
        setContentFeedback("Appropriate professional response.");
        setIsAIResponding(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsAIResponding(false);
    }
  };

  return (
    <div className="min-h-screen bg-medical-50">
      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="text-medical-600 hover:text-medical-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t('back')}
            </Button>
            <div>
              <h1 className="text-xl font-bold text-medical-800">{scenarioTitle}</h1>
              <p className="text-sm text-medical-600">{scenario.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-4 h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Patient Info & Learning Goals */}
          <div className="lg:col-span-1 space-y-3">
            {/* Patient Profile - Reduced Height */}
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-medical-600" />
                <h3 className="font-medium text-medical-800 text-sm">{t('patientInformation')}</h3>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-medical-600">{t('name')}:</span>
                  <span className="text-medical-800 font-medium">{patientProfile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medical-600">{t('age')}:</span>
                  <span className="text-medical-800">{patientProfile.age} {t('years')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medical-600">{t('condition')}:</span>
                  <span className="text-medical-800">{patientProfile.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medical-600">{t('mood')}:</span>
                  <span className="text-medical-800">{patientProfile.mood}</span>
                </div>
              </div>
            </Card>

            {/* Learning Goals - Expanded */}
            <div className="flex-1">
              <CheckpointTracker 
                checkpoints={checkpoints}
                className="h-full"
              />
            </div>
          </div>

          {/* Center - Conversation */}
          <div className="lg:col-span-2">
            <ConversationTab
              scenario={scenario}
              onSendMessage={handleSendMessage}
              aiResponse={aiResponse}
              isAIResponding={isAIResponding}
            />
          </div>

          {/* Right Sidebar - Feedback - Compact */}
          <div className="lg:col-span-1 space-y-3">
            <div className="space-y-2">
              {/* Language Feedback */}
              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {t('language')}
                  </Badge>
                </div>
                <div className="text-xs text-medical-600 min-h-[2rem]">
                  {languageFeedback || t('languageFeedbackWillAppear')}
                </div>
              </Card>

              {/* Content Feedback */}
              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {t('content')}
                  </Badge>
                </div>
                <div className="text-xs text-medical-600 min-h-[2rem]">
                  {contentFeedback || t('contentFeedbackWillAppear')}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamlinedInteractionScreen;
