
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface TextToSpeechOptions {
  language?: string;
  voice?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseTextToSpeechReturn {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  pause: () => void;
  resume: () => void;
  hasSpeechSupport: boolean;
  error: string | null;
}

const useTextToSpeech = ({
  voice = 'Sarah',
  onStart,
  onEnd,
  onError,
}: TextToSpeechOptions = {}): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
      setCurrentAudio(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const speak = useCallback(async (text: string) => {
    try {
      stopCurrentAudio();
      
      if (onStart) onStart();
      setIsSpeaking(true);
      setError(null);

      const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice: voices[voice] || voices['Sarah'] }
      });

      if (apiError) throw new Error(apiError.message);
      if (!data?.audioContent) throw new Error('No audio content received');

      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      
      audio.onended = () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        const errorMsg = `Audio playback error: ${e}`;
        setError(errorMsg);
        setIsSpeaking(false);
        if (onError) onError(errorMsg);
      };

      setCurrentAudio(audio);
      await audio.play();
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Failed to generate speech';
      setError(errorMsg);
      setIsSpeaking(false);
      if (onError) onError(errorMsg);
      else toast.error(errorMsg);
    }
  }, [voice, onStart, onEnd, onError]);

  const stop = useCallback(() => {
    stopCurrentAudio();
  }, []);

  const pause = useCallback(() => {
    if (currentAudio && !isPaused) {
      currentAudio.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  const resume = useCallback(() => {
    if (currentAudio && isPaused) {
      currentAudio.play();
      setIsPaused(false);
    }
  }, [isPaused]);

  return {
    speak,
    stop,
    isPaused,
    isSpeaking,
    pause,
    resume,
    hasSpeechSupport: true,
    error,
  };
};

export default useTextToSpeech;
