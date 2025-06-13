
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import OnboardingLanguageSelector from "@/components/onboarding/OnboardingLanguageSelector";
import OnboardingLanguageSelect from "@/components/onboarding/OnboardingLanguageSelect";
import OnboardingPersonalization from "@/components/onboarding/OnboardingPersonalization";
import OnboardingAssessment from "@/components/onboarding/OnboardingAssessment";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState('setup');
  const [onboardingData, setOnboardingData] = useState<any>({});
  const { completeOnboarding, skipOnboarding } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const handleSkip = async () => {
    await skipOnboarding();
    navigate('/dashboard');
  };

  const handleStepComplete = async (stepData: any) => {
    const updatedData = { ...onboardingData, ...stepData };
    setOnboardingData(updatedData);

    switch (currentStep) {
      case 'setup':
        setCurrentStep('language');
        break;
      case 'language':
        setCurrentStep('personalization');
        break;
      case 'personalization':
        setCurrentStep('assessment');
        break;
      case 'assessment':
        // Complete onboarding
        await completeOnboarding(updatedData);
        navigate('/dashboard');
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'setup':
        return (
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{translate('onboardingSetup')}</h2>
              <p className="text-gray-600">{translate('tellUsAboutBackground')}</p>
            </div>
            <Button 
              onClick={() => handleStepComplete({})}
              className="bg-medical-500 hover:bg-medical-600"
            >
              {translate('next')}
            </Button>
          </div>
        );
      case 'language':
        return <OnboardingLanguageSelect onComplete={handleStepComplete} />;
      case 'personalization':
        return <OnboardingPersonalization onComplete={handleStepComplete} />;
      case 'assessment':
        return <OnboardingAssessment onComplete={handleStepComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Header with language selector and skip button */}
        <div className="flex justify-between items-center mb-8">
          <OnboardingLanguageSelector />
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            {translate('skip')}
          </Button>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
