
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface TextToSpeechOptions {
  speaker?: 'user' | 'patient' | 'doctor' | 'colleague';
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseTextToSpeechReturn {
  speak: (text: string, speaker?: string) => Promise<void>;
  stop: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  pause: () => void;
  resume: () => void;
  hasSpeechSupport: boolean;
  error: string | null;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const useTextToSpeech = ({
  speaker = 'user',
  autoPlay = true,
  onStart,
  onEnd,
  onError,
}: TextToSpeechOptions = {}): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    localStorage.getItem('tts-enabled') !== 'false'
  );

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
      setCurrentAudio(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const speak = useCallback(async (text: string, speakerOverride?: string) => {
    if (!isEnabled) return;
    
    try {
      stopCurrentAudio();
      
      if (onStart) onStart();
      setIsSpeaking(true);
      setError(null);

      const currentSpeaker = speakerOverride || speaker;
      console.log(`Speaking with ${currentSpeaker} voice:`, text.substring(0, 50));

      const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text, 
          speaker: currentSpeaker,
          language: 'de'
        }
      });

      if (apiError) throw new Error(apiError.message);
      if (!data?.audioContent) throw new Error('No audio content received from ElevenLabs');

      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      
      audio.onended = () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        const errorMsg = `German TTS playback error: ${e}`;
        setError(errorMsg);
        setIsSpeaking(false);
        if (onError) onError(errorMsg);
      };

      setCurrentAudio(audio);
      await audio.play();
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Failed to generate German speech';
      setError(errorMsg);
      setIsSpeaking(false);
      if (onError) onError(errorMsg);
      else toast.error(errorMsg);
    }
  }, [speaker, isEnabled, onStart, onEnd, onError]);

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

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    localStorage.setItem('tts-enabled', enabled.toString());
    if (!enabled) {
      stopCurrentAudio();
    }
  }, []);

  return {
    speak,
    stop,
    isPaused,
    isSpeaking,
    pause,
    resume,
    hasSpeechSupport: true,
    error,
    isEnabled,
    setEnabled,
  };
};

export default useTextToSpeech;
