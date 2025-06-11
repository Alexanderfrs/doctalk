
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Help } from 'lucide-react';
import { useTutorial } from '@/contexts/TutorialContext';

const HelpButton: React.FC = () => {
  const { restartTutorial, isActive } = useTutorial();

  if (isActive) return null; // Don't show help button during tutorial

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={restartTutorial}
            className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-50 border-2 border-blue-200"
          >
            <Help className="h-5 w-5 text-blue-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tutorial neu starten</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HelpButton;
