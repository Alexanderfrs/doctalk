
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings, Zap, Sparkles, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TTSModelSelectorProps {
  currentModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
  quotaExceeded?: boolean;
}

const TTS_MODELS = {
  'turbo': {
    name: 'Turbo',
    description: 'Schnell & Sparsam',
    icon: Zap,
    badge: 'Empfohlen',
    badgeColor: 'bg-green-100 text-green-800 border-green-200'
  },
  'multilingual': {
    name: 'Premium',
    description: 'Höchste Qualität',
    icon: Sparkles,
    badge: 'Premium',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  'monolingual': {
    name: 'Basic',
    description: 'Englisch Only',
    icon: Globe,
    badge: 'Basic',
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-200'
  }
};

const TTSModelSelector: React.FC<TTSModelSelectorProps> = ({
  currentModel,
  onModelChange,
  disabled = false,
  quotaExceeded = false
}) => {
  const currentModelInfo = TTS_MODELS[currentModel] || TTS_MODELS['turbo'];
  const CurrentIcon = currentModelInfo.icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled}
          className={cn(
            "h-8 px-2 text-xs flex items-center gap-1",
            quotaExceeded && "text-red-500 hover:text-red-600"
          )}
          title="TTS-Modell wählen"
        >
          <CurrentIcon className="h-3 w-3" />
          <span className="hidden sm:inline">{currentModelInfo.name}</span>
          <Settings className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="end">
        <div className="space-y-2">
          <h4 className="font-medium text-sm mb-3">TTS-Modell auswählen</h4>
          
          {quotaExceeded && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
              <p className="text-red-800 text-xs">
                ⚠️ Kontingent aufgebraucht. Turbo-Modell empfohlen.
              </p>
            </div>
          )}
          
          {Object.entries(TTS_MODELS).map(([key, model]) => {
            const Icon = model.icon;
            const isSelected = key === currentModel;
            
            return (
              <Button
                key={key}
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                onClick={() => onModelChange(key)}
                className={cn(
                  "w-full justify-start h-auto p-3 text-left",
                  isSelected && "bg-medical-100 border-medical-200"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{model.name}</span>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs px-1.5 py-0", model.badgeColor)}
                      >
                        {model.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-medical-600 rounded-full flex-shrink-0" />
                  )}
                </div>
              </Button>
            );
          })}
          
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Turbo-Modell spart Credits und ist für die meisten Anwendungen ausreichend.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TTSModelSelector;
