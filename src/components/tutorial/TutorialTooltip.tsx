
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTutorial } from '@/contexts/TutorialContext';

interface TutorialTooltipProps {
  targetElement: HTMLElement | null;
}

const TutorialTooltip: React.FC<TutorialTooltipProps> = ({ targetElement }) => {
  const navigate = useNavigate();
  const { 
    getCurrentStepData, 
    nextStep, 
    previousStep, 
    skipTutorial, 
    currentStep, 
    steps 
  } = useTutorial();
  
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const stepData = getCurrentStepData();

  useEffect(() => {
    if (!targetElement || !stepData) return;

    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    let top = 0;
    let left = 0;
    
    switch (stepData.position) {
      case 'bottom':
        top = rect.bottom + scrollTop + 16;
        left = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'top':
        top = rect.top + scrollTop - 16;
        left = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollTop + rect.height / 2;
        left = rect.left + scrollLeft - 16;
        break;
      case 'right':
        top = rect.top + scrollTop + rect.height / 2;
        left = rect.right + scrollLeft + 16;
        break;
    }

    setTooltipStyle({
      position: 'absolute',
      top,
      left,
      transform: stepData.position === 'left' || stepData.position === 'right' 
        ? 'translateY(-50%)' 
        : 'translateX(-50%)',
      zIndex: 1002,
      maxWidth: '320px',
      width: 'auto'
    });
  }, [targetElement, stepData]);

  const handleNext = () => {
    if (stepData?.action === 'navigate' && stepData.nextPage) {
      navigate(stepData.nextPage);
      // Small delay to ensure page loads before proceeding
      setTimeout(() => {
        nextStep();
      }, 100);
    } else {
      nextStep();
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  if (!stepData) return null;

  return (
    <Card className="shadow-lg border-2 border-blue-200" style={tooltipStyle}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-700">
            {stepData.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={skipTutorial}
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          {stepData.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Schritt {currentStep + 1} von {steps.length}
          </div>
          
          <div className="flex gap-2">
            {!isFirstStep && (
              <Button
                variant="outline"
                size="sm"
                onClick={previousStep}
                className="text-xs"
              >
                <ChevronLeft className="h-3 w-3 mr-1" />
                Zurück
              </Button>
            )}
            
            <Button
              size="sm"
              onClick={handleNext}
              className="text-xs bg-blue-600 hover:bg-blue-700"
            >
              {stepData.action === 'navigate' ? 'Weiter' : isLastStep ? 'Fertig' : 'Weiter'}
              {!isLastStep && <ChevronRight className="h-3 w-3 ml-1" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialTooltip;
