
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
  germanLevel?: string;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  currentStep,
  totalSteps,
  germanLevel
}) => {
  const { translate } = useLanguage();
  const progress = (currentStep / totalSteps) * 100;

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

      {currentStep === 1 && (
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-4">
          <Lightbulb className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">{translate('importantNotice')}</h4>
            <p className="text-blue-700 text-sm">
              {translate('b1RequirementNotice')}
            </p>
          </div>
        </div>
      )}

      {currentStep === 3 && germanLevel && ['A1', 'A2'].includes(germanLevel) && (
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
};

export default AssessmentHeader;
