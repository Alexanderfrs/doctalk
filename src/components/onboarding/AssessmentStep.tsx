
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Target, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AssessmentStepProps {
  currentStep: number;
  formData: any;
  onUpdateFormData: (field: string, value: any) => void;
  onToggleArrayItem: (field: string, item: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isStepValid: boolean;
  totalSteps: number;
}

const AssessmentStep: React.FC<AssessmentStepProps> = ({
  currentStep,
  formData,
  onUpdateFormData,
  onToggleArrayItem,
  onNext,
  onPrevious,
  isStepValid,
  totalSteps
}) => {
  const { translate } = useLanguage();

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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
                    onClick={() => onUpdateFormData('profession', profession.value)}
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
                    onClick={() => onUpdateFormData('germanLevel', level.value)}
                  >
                    <div className="font-medium">{level.value}</div>
                    <div className="text-xs text-gray-600">{translate(level.labelKey)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
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
                  onClick={() => onToggleArrayItem('helpAreas', area)}
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
        );

      case 3:
        return (
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
                  onClick={() => onToggleArrayItem('objectives', objective)}
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStepContent()}

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="border-gray-200"
        >
          {translate('back')}
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!isStepValid}
          className="bg-medical-500 hover:bg-medical-600"
        >
          {currentStep === totalSteps ? translate('finish') : translate('next')}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentStep;
