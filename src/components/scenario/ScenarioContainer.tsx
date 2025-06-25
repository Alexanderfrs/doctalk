
import React, { useState } from "react";
import { Scenario } from "@/data/scenarios";
import { createPatientProfile } from "@/utils/patientProfiles";
import ScenarioBriefingScreen from "./ScenarioBriefingScreen";
import StreamlinedInteractionScreen from "./StreamlinedInteractionScreen";

interface ScenarioContainerProps {
  scenario: Scenario;
}

const ScenarioContainer: React.FC<ScenarioContainerProps> = ({ scenario }) => {
  const [showBriefing, setShowBriefing] = useState(true);
  
  const patientProfile = createPatientProfile(scenario.category, scenario);

  const handleBeginInteraction = () => {
    setShowBriefing(false);
  };

  const handleBackToBriefing = () => {
    setShowBriefing(true);
  };

  if (showBriefing) {
    return (
      <ScenarioBriefingScreen
        scenario={scenario}
        patientProfile={patientProfile}
        onBeginInteraction={handleBeginInteraction}
      />
    );
  }

  return (
    <StreamlinedInteractionScreen
      scenario={scenario}
      onBack={handleBackToBriefing}
    />
  );
};

export default ScenarioContainer;
