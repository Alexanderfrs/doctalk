
import React, { useState } from "react";
import { Scenario } from "@/data/scenarios";
import { createPatientProfile } from "@/utils/patientProfiles";
import ScenarioBriefingScreen from "./ScenarioBriefingScreen";
import StreamlinedInteractionScreen from "./StreamlinedInteractionScreen";
import { useNavigate } from "react-router-dom";

interface ScenarioContainerProps {
  scenario: Scenario;
}

const ScenarioContainer: React.FC<ScenarioContainerProps> = ({ scenario }) => {
  const [showBriefing, setShowBriefing] = useState(true);
  const navigate = useNavigate();
  
  const patientProfile = createPatientProfile(scenario.category, scenario);

  const handleBeginInteraction = () => {
    setShowBriefing(false);
  };

  const handleBackToBriefing = () => {
    setShowBriefing(true);
  };

  const handleExit = () => {
    navigate('/practice');
  };

  const handleComplete = () => {
    navigate('/practice');
  };

  if (showBriefing) {
    return (
      <ScenarioBriefingScreen
        scenario={scenario}
        patientProfile={patientProfile}
        onBeginInteraction={handleBeginInteraction}
        onExit={handleExit}
      />
    );
  }

  return (
    <StreamlinedInteractionScreen
      scenario={scenario}
      onBack={handleBackToBriefing}
      onComplete={handleComplete}
    />
  );
};

export default ScenarioContainer;
