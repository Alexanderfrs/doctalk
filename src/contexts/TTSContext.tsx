
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface TTSContextType {
  speak: (text: string, speaker?: string) => Promise<void>;
  stop: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  pause: () => void;
  resume: () => void;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  isLoading: boolean;
  currentModel: string;
  setModel: (model: string) => void;
  quotaExceeded: boolean;
  error: string | null;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [currentModel, setCurrentModel] = useState<string>('turbo');
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    localStorage.getItem('tts-enabled') !== 'false'
  );

  const audioCache = useRef<Map<string, { audio: string; timestamp: number }>>(new Map());
  const maxCacheAge = 30 * 60 * 1000; // 30 minutes
  const lastRequestTime = useRef<number>(0);
  const minRequestInterval = 500; // 500ms between requests

  const cleanCache = useCallback(() => {
    const now = Date.now();
    audioCache.current.forEach((value, key) => {
      if (now - value.timestamp > maxCacheAge) {
        audioCache.current.delete(key);
      }
    });
  }, []);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.remove();
      setCurrentAudio(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, [currentAudio]);

  const speak = useCallback(async (text: string, speaker: string = 'user') => {
    if (!isEnabled || quotaExceeded || !text?.trim()) return;
    
    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime.current < minRequestInterval) {
      console.log('Rate limited - skipping TTS request');
      return;
    }
    lastRequestTime.current = now;
    
    const cacheKey = `${text.trim()}-${speaker}-${currentModel}`;
    
    try {
      stopCurrentAudio();
      setIsLoading(true);
      setError(null);

      console.log(`Speaking with ${currentModel} model, ${speaker} voice:`, text.substring(0, 50));

      // Clean and check cache
      cleanCache();
      const cached = audioCache.current.get(cacheKey);
      let audioContent: string;

      if (cached) {
        console.log('Using cached audio');
        audioContent = cached.audio;
      } else {
        console.log('Making TTS API request...');
        const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
          body: { 
            text: text.trim(), 
            speaker: speaker,
            model: currentModel,
            language: 'de'
          }
        });

        if (apiError) {
          console.error('TTS API Error:', apiError);
          throw new Error(apiError.message || 'TTS API Fehler');
        }
        
        if (data?.error) {
          console.error('TTS Service Error:', data.error, data.message);
          if (data.error === 'QUOTA_EXCEEDED') {
            setQuotaExceeded(true);
            throw new Error('ElevenLabs-Kontingent aufgebraucht. Bitte API-Schlüssel überprüfen oder Credits aufladen.');
          } else if (data.error === 'RATE_LIMITED') {
            throw new Error('Zu viele Anfragen - bitte einen Moment warten');
          } else if (data.error === 'API_KEY_MISSING') {
            throw new Error('ElevenLabs API-Schlüssel ist nicht konfiguriert');
          } else {
            throw new Error(data.message || 'TTS Fehler');
          }
        }
        
        if (!data?.audioContent) {
          throw new Error('Keine Audiodaten erhalten');
        }

        audioContent = data.audioContent;
        audioCache.current.set(cacheKey, {
          audio: audioContent,
          timestamp: now
        });
        
        console.log('TTS request successful, audio cached');
      }

      // Create and configure audio element
      const audio = new Audio();
      
      audio.onloadstart = () => {
        console.log('Audio loading started');
        setIsLoading(true);
      };
      
      audio.oncanplaythrough = () => {
        console.log('Audio can play through');
        setIsLoading(false);
        setIsSpeaking(true);
      };
      
      audio.onplay = () => {
        console.log('Audio started playing');
        setIsSpeaking(true);
        setIsLoading(false);
      };
      
      audio.onended = () => {
        console.log('Audio ended');
        setIsSpeaking(false);
        setIsLoading(false);
        setCurrentAudio(null);
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        const errorMsg = 'Audio-Wiedergabe fehlgeschlagen';
        setError(errorMsg);
        setIsSpeaking(false);
        setIsLoading(false);
        setCurrentAudio(null);
        toast.error(errorMsg);
      };

      audio.src = `data:audio/mp3;base64,${audioContent}`;
      audio.load();
      
      setCurrentAudio(audio);
      
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio playback started successfully');
        }
      } catch (playError) {
        console.error('Play failed:', playError);
        if (playError.name === 'NotAllowedError') {
          toast.error('Autoplay blockiert - bitte manuell auf Play klicken');
          setError('Autoplay blockiert');
        } else {
          throw playError;
        }
      }
      
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Sprachausgabe-Fehler';
      console.error('TTS Error:', e);
      
      setError(errorMsg);
      setIsSpeaking(false);
      setIsLoading(false);
      setCurrentAudio(null);
      
      toast.error('Sprachausgabe-Fehler', {
        description: errorMsg
      });
    }
  }, [isEnabled, quotaExceeded, currentModel, cleanCache, stopCurrentAudio]);

  const stop = useCallback(() => {
    console.log('Stopping TTS');
    stopCurrentAudio();
  }, [stopCurrentAudio]);

  const pause = useCallback(() => {
    if (currentAudio && !isPaused) {
      currentAudio.pause();
      setIsPaused(true);
      console.log('TTS paused');
    }
  }, [currentAudio, isPaused]);

  const resume = useCallback(() => {
    if (currentAudio && isPaused) {
      currentAudio.play();
      setIsPaused(false);
      console.log('TTS resumed');
    }
  }, [currentAudio, isPaused]);

  const setEnabled = useCallback((enabled: boolean) => {
    console.log('TTS enabled:', enabled);
    setIsEnabled(enabled);
    localStorage.setItem('tts-enabled', enabled.toString());
    if (!enabled) {
      stopCurrentAudio();
    }
    if (enabled && quotaExceeded) {
      setQuotaExceeded(false);
    }
  }, [stopCurrentAudio, quotaExceeded]);

  const setModel = useCallback((newModel: string) => {
    console.log('TTS model changed to:', newModel);
    setCurrentModel(newModel);
    localStorage.setItem('tts-model', newModel);
  }, []);

  return (
    <TTSContext.Provider value={{
      speak,
      stop,
      isPaused,
      isSpeaking,
      pause,
      resume,
      isEnabled,
      setEnabled,
      isLoading,
      currentModel,
      setModel,
      quotaExceeded,
      error,
    }}>
      {children}
    </TTSContext.Provider>
  );
};
