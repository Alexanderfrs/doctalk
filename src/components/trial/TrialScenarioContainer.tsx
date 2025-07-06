import React, { useState } from "react";
import { Scenario } from "@/data/scenarios";
import { createPatientProfile } from "@/utils/patientProfiles";
import ScenarioBriefingScreen from "../scenario/ScenarioBriefingScreen";
import StreamlinedInteractionScreen from "../scenario/StreamlinedInteractionScreen";
import TrialCompletionScreen from "./TrialCompletionScreen";

interface TrialScenarioContainerProps {
  scenario: Scenario;
  onExit: () => void;
}

const TrialScenarioContainer: React.FC<TrialScenarioContainerProps> = ({ 
  scenario,
  onExit 
}) => {
  const [currentScreen, setCurrentScreen] = useState<'briefing' | 'interaction' | 'completion'>('briefing');
  
  const patientProfile = createPatientProfile(scenario.category, scenario);

  const handleBeginInteraction = () => {
    setCurrentScreen('interaction');
  };

  const handleBackToBriefing = () => {
    setCurrentScreen('briefing');
  };

  const handleInteractionComplete = () => {
    setCurrentScreen('completion');
  };

  const handleExit = () => {
    setCurrentScreen('completion');
  };

  if (currentScreen === 'briefing') {
    return (
      <ScenarioBriefingScreen
        scenario={scenario}
        patientProfile={patientProfile}
        onBeginInteraction={handleBeginInteraction}
        onExit={handleExit}
      />
    );
  }

  if (currentScreen === 'interaction') {
    return (
      <StreamlinedInteractionScreen
        scenario={scenario}
        onBack={handleBackToBriefing}
        onExit={handleExit}
        onComplete={handleInteractionComplete}
      />
    );
  }

  return (
    <TrialCompletionScreen
      onExit={onExit}
    />
  );
};

export default TrialScenarioContainer;