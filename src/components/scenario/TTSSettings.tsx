
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import TTSModelSelector from './TTSModelSelector';
import { cn } from '@/lib/utils';

interface TTSSettingsProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  currentModel?: string;
  onModelChange?: (model: string) => void;
  quotaExceeded?: boolean;
  className?: string;
}

const TTSSettings: React.FC<TTSSettingsProps> = ({
  isEnabled,
  onToggle,
  currentModel = 'turbo',
  onModelChange,
  quotaExceeded = false,
  className
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* TTS Toggle */}
      <div className="flex items-center gap-2">
        <VolumeX className="h-4 w-4 text-medical-600" />
        <Switch
          checked={isEnabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-medical-600"
          disabled={quotaExceeded}
        />
        <Volume2 className={cn(
          "h-4 w-4",
          isEnabled ? "text-medical-600" : "text-gray-400",
          quotaExceeded && "text-red-500"
        )} />
      </div>

      {/* Model Selector */}
      {onModelChange && (
        <TTSModelSelector
          currentModel={currentModel}
          onModelChange={onModelChange}
          disabled={!isEnabled}
          quotaExceeded={quotaExceeded}
        />
      )}

      {/* Quota Warning */}
      {quotaExceeded && (
        <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
          Kontingent aufgebraucht
        </div>
      )}
    </div>
  );
};

export default TTSSettings;
