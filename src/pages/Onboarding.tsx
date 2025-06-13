
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import OnboardingAssessment from "@/components/onboarding/OnboardingAssessment";
import OnboardingLanguageSelect from "@/components/onboarding/OnboardingLanguageSelect";
import OnboardingPersonalization from "@/components/onboarding/OnboardingPersonalization";
import OnboardingLanguageSelector from "@/components/onboarding/OnboardingLanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AppLogo from "@/components/layout/AppLogo";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { translate } = useLanguage();
  const { user, completeOnboarding, skipOnboarding } = useAuth();
  const [userData, setUserData] = useState<any>({});
  
  const totalSteps = 3;
  
  const handleStepComplete = async (stepNumber: number, data?: any) => {
    console.log(`Step ${stepNumber} completed with data:`, data);
    
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    
    // Save step data for later use
    if (data) {
      setUserData(prev => ({ ...prev, ...data }));
    }
    
    // Save step data to profile
    if (user && data) {
      try {
        let updateData = {};
        
        if (stepNumber === 1) {
          // Background and objectives assessment
          updateData = { 
            profession: data.profession,
            german_level: data.germanLevel,
            preferences: {
              assessment_results: {
                profession: data.profession,
                germanLevel: data.germanLevel,
                helpAreas: data.helpAreas,
                objectives: data.objectives,
                acknowledgedB1Requirement: data.acknowledgedB1Requirement
              }
            }
          };
        } else if (stepNumber === 2 && data.language) {
          updateData = { native_language: data.language };
        } else if (stepNumber === 3 && data.preferences) {
          // Merge with existing preferences
          const existingPrefs = userData.preferences || {};
          updateData = { 
            preferences: {
              ...existingPrefs,
              ...data.preferences
            }
          };
        }
        
        if (Object.keys(updateData).length > 0) {
          const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating profile:', error);
          } else {
            console.log('Profile updated successfully:', updateData);
          }
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    
    if (stepNumber === totalSteps) {
      // Complete onboarding with collected data
      await completeOnboarding({
        name: userData.name || data?.name
      });
      
      // Show appropriate completion message based on German level
      const germanLevel = userData.germanLevel || data?.germanLevel;
      if (germanLevel && ['A1', 'A2'].includes(germanLevel)) {
        toast.info(`${translate('onboardingSetup')} ${translate('finish')}! ${translate('recommendation')}: ${germanLevel}. ${translate('lowerLevelRecommendation')}`);
      } else {
        toast.success(`${translate('onboardingSetup')} ${translate('finish')}!`);
      }
      
      navigate("/dashboard");
    } else {
      setCurrentStep(stepNumber + 1);
    }
  };

  const handleSkipOnboarding = async () => {
    await skipOnboarding();
    navigate("/dashboard");
  };
  
  const steps = [
    {
      title: translate('profileAndGoals'),
      component: <OnboardingAssessment onComplete={(data) => handleStepComplete(1, data)} />,
      description: translate('tellUsAboutBackground')
    },
    {
      title: translate('nativeLanguage'),
      component: <OnboardingLanguageSelect onComplete={(data) => handleStepComplete(2, data)} />,
      description: translate('selectYourNativeLanguage')
    },
    {
      title: translate('personalization'),
      component: <OnboardingPersonalization onComplete={(data) => handleStepComplete(3, data)} />,
      description: translate('customizeYourLearningGoals')
    }
  ];
  
  const currentStepData = steps[currentStep - 1];
  const progress = (completedSteps.length / totalSteps) * 100;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      <header className="py-4 px-6 flex items-center justify-between border-b">
        <AppLogo path="/" />
        <OnboardingLanguageSelector />
      </header>
      
      <main className="flex-grow flex flex-col items-center px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="w-full mb-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-medium">
              {translate('onboardingSetup')} ({currentStep}/{totalSteps})
            </h2>
            <span className="text-medical-600 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="w-full">
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center px-4 py-2 rounded-full border ${
                    currentStep === index + 1
                      ? "border-medical-500 bg-medical-50 text-medical-800"
                      : completedSteps.includes(index + 1)
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  {completedSteps.includes(index + 1) ? (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-current text-white mr-2 text-xs">
                      {index + 1}
                    </span>
                  )}
                  <span>{step.title}</span>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSkipOnboarding}
              className="text-neutral-600"
            >
              {translate('skip')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b">
              <h3 className="text-xl font-semibold text-medical-800">{currentStepData.title}</h3>
              <p className="text-gray-500 mt-1">{currentStepData.description}</p>
            </div>
            
            <div className="p-6">
              {currentStepData.component}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
