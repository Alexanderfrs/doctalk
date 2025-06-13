
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Lightbulb, AlertCircle, User, Target, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OnboardingAssessmentProps {
  onComplete: (data: any) => void;
}

const OnboardingAssessment: React.FC<OnboardingAssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const { translate } = useLanguage();
  const totalSteps = 3;

  // Limited profession options as requested
  const professions = [
    { key: 'professionNurse', value: 'Krankenpfleger/in' },
    { key: 'professionDoctor', value: 'Arzt/Ärztin' },
    { key: 'professionStudent', value: 'Student/in' },
    { key: 'professionOtherMedical', value: 'Andere medizinische Fachkraft' }
  ];

  const germanLevels = [
    { value: "A1", labelKey: "germanLevelA1" },
    { value: "A2", labelKey: "germanLevelA2" },
    { value: "B1", labelKey: "germanLevelB1" },
    { value: "B2", labelKey: "germanLevelB2" },
    { value: "C1", labelKey: "germanLevelC1" },
    { value: "C2", labelKey: "germanLevelC2" }
  ];

  const helpAreas = [
    'supportPatientConversations',
    'supportMedicalDocumentation',
    'supportColleagueCommunication',
    'supportEmergencySituations',
    'supportMedicalVocabulary',
    'supportAnamnesisExamination',
    'supportInformationConversations',
    'supportShiftHandovers',
    'supportDepartmentCalls',
    'supportRelativesCommunication'
  ];

  const objectives = [
    'goalProfessionalRecognition',
    'goalImproveGermanSkills',
    'goalPrepareLanguageExam',
    'goalBetterTeamIntegration',
    'goalIncreasePatientSafety',
    'goalCommunicationConfidence'
  ];

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

  const progress = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-4">
              <Lightbulb className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">{translate('importantNotice')}</h4>
                <p className="text-blue-700 text-sm">
                  {translate('b1RequirementNotice')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">
                  <User className="inline h-4 w-4 mr-2" />
                  {translate('whatIsYourMedicalProfession')}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {professions.map((profession) => (
                    <button
                      key={profession.value}
                      type="button"
                      className={`p-3 text-left border rounded-lg transition-colors ${
                        formData.profession === profession.value
                          ? "border-medical-500 bg-medical-50"
                          : "border-gray-200 hover:border-medical-200"
                      }`}
                      onClick={() => updateFormData('profession', profession.value)}
                    >
                      {translate(profession.key)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  {translate('howDoYouAssessGermanLevel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {germanLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      className={`p-3 text-left border rounded-lg transition-colors ${
                        formData.germanLevel === level.value
                          ? "border-medical-500 bg-medical-50"
                          : "border-gray-200 hover:border-medical-200"
                      }`}
                      onClick={() => updateFormData('germanLevel', level.value)}
                    >
                      <div className="font-medium">{level.value}</div>
                      <div className="text-xs text-gray-600">{translate(level.labelKey)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">
                <Target className="inline h-4 w-4 mr-2" />
                {translate('whichAreasNeedSupport')}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {helpAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    className={`p-3 text-left border rounded-lg transition-colors flex items-center ${
                      formData.helpAreas?.includes(area)
                        ? "border-medical-500 bg-medical-50"
                        : "border-gray-200 hover:border-medical-200"
                    }`}
                    onClick={() => toggleArrayItem('helpAreas', area)}
                  >
                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                      formData.helpAreas?.includes(area)
                        ? "border-medical-500 bg-medical-500"
                        : "border-gray-300"
                    }`}>
                      {formData.helpAreas?.includes(area) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    {translate(area)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">
                <Target className="inline h-4 w-4 mr-2" />
                {translate('whatAreYourMainGoals')}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {objectives.map((objective) => (
                  <button
                    key={objective}
                    type="button"
                    className={`p-3 text-left border rounded-lg transition-colors flex items-center ${
                      formData.objectives?.includes(objective)
                        ? "border-medical-500 bg-medical-50"
                        : "border-gray-200 hover:border-medical-200"
                    }`}
                    onClick={() => toggleArrayItem('objectives', objective)}
                  >
                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                      formData.objectives?.includes(objective)
                        ? "border-medical-500 bg-medical-500"
                        : "border-gray-300"
                    }`}>
                      {formData.objectives?.includes(objective) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    {translate(objective)}
                  </button>
                ))}
              </div>
            </div>

            {formData.germanLevel && ['A1', 'A2'].includes(formData.germanLevel) && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 mr-3" />
                  <div className="text-sm">
                    <p className="text-amber-800 mb-1 font-medium">{translate('recommendation')}:</p>
                    <p className="text-amber-700">
                      {translate('lowerLevelRecommendation')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return translate('yourProfile');
      case 2:
        return translate('supportAreas');
      case 3:
        return translate('yourGoals');
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return translate('tellUsSomethingAboutYou');
      case 2:
        return translate('howCanWeHelpYou');
      case 3:
        return translate('whatDoYouWantToAchieve');
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">
            {translate('stepOf').replace('{current}', currentStep.toString()).replace('{total}', totalSteps.toString())}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">{getStepTitle()}</h3>
        <p className="text-gray-600">{getStepDescription()}</p>
      </div>

      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="border-gray-200"
        >
          {translate('back')}
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="bg-medical-500 hover:bg-medical-600"
        >
          {currentStep === totalSteps ? translate('finish') : translate('next')}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingAssessment;
