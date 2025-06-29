
import { useState, useCallback, useRef } from 'react';
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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    localStorage.getItem('tts-enabled') !== 'false'
  );
  const audioCache = useRef<Map<string, string>>(new Map());

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
      setCurrentAudio(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  };

  const speak = useCallback(async (text: string, speakerOverride?: string, retryCount = 0) => {
    if (!isEnabled) return;
    
    const maxRetries = 2;
    const cacheKey = `${text}-${speakerOverride || speaker}`;
    
    try {
      stopCurrentAudio();
      setIsLoading(true);
      
      if (onStart) onStart();
      setError(null);

      const currentSpeaker = speakerOverride || speaker;
      console.log(`Speaking with ${currentSpeaker} voice:`, text.substring(0, 50));

      // Check cache first
      let audioContent = audioCache.current.get(cacheKey);
      
      if (!audioContent) {
        const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
          body: { 
            text, 
            speaker: currentSpeaker,
            language: 'de'
          }
        });

        if (apiError) {
          throw new Error(apiError.message || 'TTS API Fehler');
        }
        
        if (!data?.audioContent) {
          throw new Error('Keine Audiodaten erhalten');
        }

        audioContent = data.audioContent;
        // Cache the audio content
        audioCache.current.set(cacheKey, audioContent);
      }

      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      
      audio.onloadstart = () => {
        setIsLoading(true);
      };

      audio.oncanplaythrough = () => {
        setIsLoading(false);
        setIsSpeaking(true);
      };

      audio.onended = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        const errorMsg = 'Sprachausgabe-Fehler: Wiedergabe fehlgeschlagen';
        console.error('Audio playback error:', e);
        setError(errorMsg);
        setIsSpeaking(false);
        setIsLoading(false);
        if (onError) onError(errorMsg);
        else toast.error(errorMsg);
      };

      setCurrentAudio(audio);
      await audio.play();
      
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Sprachausgabe-Fehler';
      console.error('TTS Error:', e);
      
      // Retry logic
      if (retryCount < maxRetries) {
        console.log(`Retrying TTS (attempt ${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          speak(text, speakerOverride, retryCount + 1);
        }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
        return;
      }

      // Final error handling
      setError('Sprachausgabe-Fehler');
      setIsSpeaking(false);
      setIsLoading(false);
      
      if (onError) {
        onError('Sprachausgabe-Fehler');
      } else {
        toast.error('Sprachausgabe-Fehler', {
          description: 'Die Sprachausgabe ist momentan nicht verfügbar.'
        });
      }
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
    isLoading,
  };
};

export default useTextToSpeech;
