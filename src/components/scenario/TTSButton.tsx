
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import useTextToSpeech from '@/hooks/useTextToSpeech';

interface TTSButtonProps {
  textToRead: string;
  speaker?: 'user' | 'patient' | 'doctor' | 'colleague';
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
}

const TTSButton: React.FC<TTSButtonProps> = ({
  textToRead,
  speaker = 'user',
  variant = 'ghost',
  size = 'sm',
  className,
  disabled = false
}) => {
  const { 
    speak, 
    stop, 
    isSpeaking, 
    isLoading, 
    isEnabled, 
    error 
  } = useTextToSpeech({
    speaker,
    onError: (error) => {
      console.error('TTS Button Error:', error);
    }
  });

  const handleClick = async () => {
    if (!textToRead.trim()) return;
    
    if (isSpeaking) {
      stop();
    } else {
      await speak(textToRead, speaker);
    }
  };

  const getIcon = () => {
    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    
    if (!isEnabled || error) {
      return <VolumeX className="h-4 w-4" />;
    }
    
    return <Volume2 className={cn("h-4 w-4", isSpeaking && "animate-pulse")} />;
  };

  const getTitle = () => {
    if (!isEnabled) return 'Sprachausgabe deaktiviert';
    if (error) return 'Sprachausgabe-Fehler';
    if (isLoading) return 'Lädt...';
    if (isSpeaking) return 'Stopp';
    return 'Vorlesen';
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled || !textToRead.trim() || (!isEnabled && !isSpeaking)}
      className={cn(
        "touch-action-manipulation flex-shrink-0",
        error && "text-red-500 hover:text-red-600",
        className
      )}
      title={getTitle()}
      aria-label={getTitle()}
    >
      {getIcon()}
    </Button>
  );
};

export default TTSButton;
