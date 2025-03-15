
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ChevronRight, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import OnboardingAssessment from "@/components/onboarding/OnboardingAssessment";
import OnboardingLanguageSelect from "@/components/onboarding/OnboardingLanguageSelect";
import OnboardingPersonalization from "@/components/onboarding/OnboardingPersonalization";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { userLanguage } = useLanguage();
  const { user, completeOnboarding, skipOnboarding } = useAuth();
  
  const totalSteps = 3;
  
  const handleStepComplete = async (stepNumber: number, data?: any) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    
    // Save step data to profile
    if (user && data) {
      try {
        let updateData = {};
        
        if (stepNumber === 1 && data.level) {
          updateData = { german_level: data.level };
        } else if (stepNumber === 2 && data.language) {
          updateData = { native_language: data.language };
        } else if (stepNumber === 3 && data.preferences) {
          updateData = { 
            preferences: data.preferences
          };
        }
        
        if (Object.keys(updateData).length > 0) {
          const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating profile:', error);
          }
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    
    if (stepNumber === totalSteps) {
      // Complete onboarding
      completeOnboarding();
      toast.success("Einrichtung abgeschlossen!");
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
      title: userLanguage === 'de' ? "Sprachniveau" : "Language Level",
      component: <OnboardingAssessment onComplete={(data) => handleStepComplete(1, data)} />,
      description: userLanguage === 'de' 
        ? "Wir ermitteln Ihr aktuelles Deutschniveau" 
        : "We'll assess your current German level"
    },
    {
      title: userLanguage === 'de' ? "Muttersprache" : "Native Language",
      component: <OnboardingLanguageSelect onComplete={(data) => handleStepComplete(2, data)} />,
      description: userLanguage === 'de' 
        ? "Wählen Sie Ihre Muttersprache aus" 
        : "Select your native language"
    },
    {
      title: userLanguage === 'de' ? "Personalisierung" : "Personalization",
      component: <OnboardingPersonalization onComplete={(data) => handleStepComplete(3, data)} />,
      description: userLanguage === 'de' 
        ? "Passen Sie Ihre Lernziele an" 
        : "Customize your learning goals"
    }
  ];
  
  const currentStepData = steps[currentStep - 1];
  const progress = (completedSteps.length / totalSteps) * 100;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      <header className="py-4 px-6 flex items-center justify-center border-b">
        <div className="flex items-center gap-2">
          <div className="bg-medical-500 text-white p-1.5 rounded-lg">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-medical-800">MedLingua</span>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="w-full mb-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-medium">
              {userLanguage === 'de' ? "Einrichtung" : "Setup"} ({currentStep}/{totalSteps})
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
              Überspringen
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
