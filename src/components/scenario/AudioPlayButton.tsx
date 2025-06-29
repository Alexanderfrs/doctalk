
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayButtonProps {
  text: string;
  speaker: string;
  messageId?: string;
  onPlay: (text: string, speaker: string, messageId?: string) => void;
  isPlaying?: boolean;
  isLoading?: boolean;
  className?: string;
  size?: 'sm' | 'default';
}

const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  text,
  speaker,
  messageId,
  onPlay,
  isPlaying = false,
  isLoading = false,
  className,
  size = 'sm'
}) => {
  const handleClick = () => {
    if (!isPlaying && !isLoading) {
      onPlay(text, speaker, messageId);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "h-6 w-6 p-0 hover:bg-medical-100 transition-colors",
        isPlaying && "text-medical-600",
        className
      )}
      title="Audio abspielen"
      aria-label={`Audio für ${speaker === 'user' ? 'Ihre Nachricht' : 'Antwort'} abspielen`}
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : isPlaying ? (
        <Volume2 className="h-3 w-3 animate-pulse" />
      ) : (
        <Play className="h-3 w-3" />
      )}
    </Button>
  );
};

export default AudioPlayButton;
