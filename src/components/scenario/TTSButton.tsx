
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

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!textToRead.trim()) {
      console.log('No text to read');
      return;
    }
    
    console.log('TTS Button clicked - Text:', textToRead.substring(0, 50));
    console.log('TTS enabled:', isEnabled);
    console.log('Current speaker:', speaker);
    
    if (isSpeaking) {
      console.log('Stopping current speech');
      stop();
    } else {
      console.log('Starting speech with speaker:', speaker);
      try {
        await speak(textToRead, speaker);
      } catch (error) {
        console.error('Failed to speak:', error);
      }
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
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled || !textToRead.trim()}
      className={cn(
        "touch-action-manipulation flex-shrink-0 cursor-pointer",
        error && "text-red-500 hover:text-red-600",
        !isEnabled && "opacity-50",
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
