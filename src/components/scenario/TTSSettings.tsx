
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Volume2, VolumeX } from 'lucide-react';
import TTSModelSelector from './TTSModelSelector';
import { cn } from '@/lib/utils';
import { useTTS } from '@/contexts/TTSContext';

interface TTSSettingsProps {
  className?: string;
}

const TTSSettings: React.FC<TTSSettingsProps> = ({ className }) => {
  const { 
    isEnabled, 
    setEnabled, 
    currentModel, 
    setModel, 
    quotaExceeded,
    error 
  } = useTTS();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* TTS Toggle */}
      <div className="flex items-center gap-2">
        <VolumeX className="h-4 w-4 text-medical-600" />
        <Switch
          checked={isEnabled}
          onCheckedChange={setEnabled}
          className="data-[state=checked]:bg-medical-600"
          disabled={quotaExceeded}
        />
        <Volume2 className={cn(
          "h-4 w-4",
          isEnabled ? "text-medical-600" : "text-gray-400",
          (quotaExceeded || error) && "text-red-500"
        )} />
      </div>

      {/* Model Selector */}
      <TTSModelSelector
        currentModel={currentModel}
        onModelChange={setModel}
        disabled={!isEnabled}
        quotaExceeded={quotaExceeded}
      />

      {/* Status Messages */}
      {quotaExceeded && (
        <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
          Kontingent aufgebraucht
        </div>
      )}
      {error && !quotaExceeded && (
        <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
          TTS-Fehler
        </div>
      )}
    </div>
  );
};

export default TTSSettings;
