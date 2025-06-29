
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TTSSettingsProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  className?: string;
}

const TTSSettings: React.FC<TTSSettingsProps> = ({
  isEnabled,
  onToggle,
  className
}) => {
  return (
    <Button
      variant={isEnabled ? "default" : "outline"}
      size="sm"
      onClick={() => onToggle(!isEnabled)}
      className={cn("flex items-center gap-2", className)}
      title={isEnabled ? "Auto-Sprache ausschalten" : "Auto-Sprache einschalten"}
    >
      {isEnabled ? (
        <>
          <Volume2 className="h-4 w-4" />
          <span className="hidden sm:inline">Auto-Sprache</span>
        </>
      ) : (
        <>
          <VolumeX className="h-4 w-4" />
          <span className="hidden sm:inline">Stumm</span>
        </>
      )}
    </Button>
  );
};

export default TTSSettings;
