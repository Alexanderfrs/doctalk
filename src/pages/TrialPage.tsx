import React from "react";
import { useNavigate } from "react-router-dom";
import scenarios from "@/data/scenarios";
import TrialScenarioContainer from "@/components/trial/TrialScenarioContainer";

const TrialPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Use the handover scenario for trial
  const handoverScenario = scenarios.find(s => s.id === 'handover');
  
  if (!handoverScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-medical-800 mb-4">Scenario Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-medical-600 text-white rounded-lg hover:bg-medical-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleExit = () => {
    navigate('/');
  };

  return (
    <TrialScenarioContainer
      scenario={handoverScenario}
      onExit={handleExit}
    />
  );
};

export default TrialPage;