
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface TextToSpeechOptions {
  speaker?: 'user' | 'patient' | 'doctor' | 'colleague';
  model?: 'turbo' | 'multilingual' | 'monolingual';
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseTextToSpeechReturn {
  speak: (text: string, speaker?: string, model?: string) => Promise<void>;
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
  currentModel: string;
  setModel: (model: string) => void;
  quotaExceeded: boolean;
}

const useTextToSpeech = ({
  speaker = 'user',
  model = 'turbo',
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
  const [currentModel, setCurrentModel] = useState<string>(model);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    localStorage.getItem('tts-enabled') !== 'false'
  );

  // Enhanced cache with size limits and model-aware keys
  const audioCache = useRef<Map<string, { audio: string; timestamp: number; size: number }>>(new Map());
  const maxCacheSize = 50 * 1024 * 1024; // 50MB cache limit
  const maxCacheAge = 30 * 60 * 1000; // 30 minutes

  // Rate limiting
  const lastRequestTime = useRef<number>(0);
  const minRequestInterval = 500; // 500ms between requests

  const cleanCache = useCallback(() => {
    const now = Date.now();
    let totalSize = 0;
    const entries = Array.from(audioCache.current.entries());
    
    // Remove expired entries
    entries.forEach(([key, value]) => {
      if (now - value.timestamp > maxCacheAge) {
        audioCache.current.delete(key);
      } else {
        totalSize += value.size;
      }
    });

    // Remove oldest entries if cache is too large
    if (totalSize > maxCacheSize) {
      const sortedEntries = entries
        .filter(([key]) => audioCache.current.has(key))
        .sort(([,a], [,b]) => a.timestamp - b.timestamp);

      while (totalSize > maxCacheSize * 0.8 && sortedEntries.length > 0) {
        const [key, value] = sortedEntries.shift()!;
        audioCache.current.delete(key);
        totalSize -= value.size;
      }
    }
  }, []);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
      setCurrentAudio(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, [currentAudio]);

  const speak = useCallback(async (text: string, speakerOverride?: string, modelOverride?: string) => {
    if (!isEnabled || quotaExceeded) return;
    
    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime.current < minRequestInterval) {
      return;
    }
    lastRequestTime.current = now;
    
    const effectiveModel = modelOverride || currentModel;
    const effectiveSpeaker = speakerOverride || speaker;
    const cacheKey = `${text.trim()}-${effectiveSpeaker}-${effectiveModel}`;
    
    try {
      stopCurrentAudio();
      setIsLoading(true);
      setError(null);
      
      if (onStart) onStart();

      console.log(`Speaking with ${effectiveModel} model, ${effectiveSpeaker} voice:`, text.substring(0, 50));

      // Clean and check cache
      cleanCache();
      const cached = audioCache.current.get(cacheKey);
      let audioContent: string;

      if (cached) {
        console.log('Using cached audio');
        audioContent = cached.audio;
      } else {
        const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
          body: { 
            text: text.trim(), 
            speaker: effectiveSpeaker,
            model: effectiveModel,
            language: 'de'
          }
        });

        if (apiError) {
          throw new Error(apiError.message || 'TTS API Fehler');
        }
        
        if (data?.error) {
          if (data.error === 'QUOTA_EXCEEDED') {
            setQuotaExceeded(true);
            throw new Error('ElevenLabs-Kontingent aufgebraucht');
          } else if (data.error === 'RATE_LIMITED') {
            throw new Error('Zu viele Anfragen - bitte warten');
          } else {
            throw new Error(data.message || 'TTS Fehler');
          }
        }
        
        if (!data?.audioContent) {
          throw new Error('Keine Audiodaten erhalten');
        }

        audioContent = data.audioContent;
        
        // Cache with size tracking
        const audioSize = audioContent.length * 0.75; // Approximate byte size from base64
        audioCache.current.set(cacheKey, {
          audio: audioContent,
          timestamp: now,
          size: audioSize
        });
      }

      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      
      audio.onloadstart = () => setIsLoading(true);
      audio.oncanplaythrough = () => {
        setIsLoading(false);
        setIsSpeaking(true);
      };
      audio.onended = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        const errorMsg = 'Audio-Wiedergabe fehlgeschlagen';
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
      
      setError(errorMsg);
      setIsSpeaking(false);
      setIsLoading(false);
      
      if (onError) {
        onError(errorMsg);
      } else {
        toast.error('Sprachausgabe-Fehler', {
          description: errorMsg
        });
      }
    }
  }, [speaker, currentModel, isEnabled, quotaExceeded, onStart, onEnd, onError, cleanCache, stopCurrentAudio]);

  const stop = useCallback(() => {
    stopCurrentAudio();
  }, [stopCurrentAudio]);

  const pause = useCallback(() => {
    if (currentAudio && !isPaused) {
      currentAudio.pause();
      setIsPaused(true);
    }
  }, [currentAudio, isPaused]);

  const resume = useCallback(() => {
    if (currentAudio && isPaused) {
      currentAudio.play();
      setIsPaused(false);
    }
  }, [currentAudio, isPaused]);

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    localStorage.setItem('tts-enabled', enabled.toString());
    if (!enabled) {
      stopCurrentAudio();
    }
    if (enabled && quotaExceeded) {
      setQuotaExceeded(false); // Reset quota flag when re-enabling
    }
  }, [stopCurrentAudio, quotaExceeded]);

  const setModel = useCallback((newModel: string) => {
    setCurrentModel(newModel);
    localStorage.setItem('tts-model', newModel);
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
    currentModel,
    setModel,
    quotaExceeded,
  };
};

export default useTextToSpeech;
