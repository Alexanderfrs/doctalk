
import React, { useState } from "react";
import AssessmentHeader from "./AssessmentHeader";
import AssessmentStep from "./AssessmentStep";

interface OnboardingAssessmentProps {
  onComplete: (data: any) => void;
}

const OnboardingAssessment: React.FC<OnboardingAssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the assessment
      onComplete({
        profession: formData.profession,
        germanLevel: formData.germanLevel,
        helpAreas: formData.helpAreas || [],
        objectives: formData.objectives || [],
        acknowledgedB1Requirement: true
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.profession && formData.germanLevel;
      case 2:
        return formData.helpAreas && formData.helpAreas.length > 0;
      case 3:
        return formData.objectives && formData.objectives.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <AssessmentHeader 
        currentStep={currentStep}
        totalSteps={totalSteps}
        germanLevel={formData.germanLevel}
      />
      
      <AssessmentStep
        currentStep={currentStep}
        formData={formData}
        onUpdateFormData={updateFormData}
        onToggleArrayItem={toggleArrayItem}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isStepValid={isStepValid()}
        totalSteps={totalSteps}
      />
    </div>
  );
};

export default OnboardingAssessment;
