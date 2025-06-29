
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface TTSContextType {
  speak: (text: string, speaker?: string, model?: string) => Promise<void>;
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [currentModel, setCurrentModel] = useState(
    localStorage.getItem('tts-model') || 'turbo'
  );
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(
    localStorage.getItem('tts-enabled') !== 'false'
  );

  const audioCache = useRef<Map<string, { audio: string; timestamp: number }>>(new Map());
  const lastRequestTime = useRef<number>(0);
  const minRequestInterval = 500;

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

  const speak = useCallback(async (text: string, speaker = 'user', model?: string) => {
    if (!isEnabled || quotaExceeded || !text?.trim()) return;
    
    const now = Date.now();
    if (now - lastRequestTime.current < minRequestInterval) {
      console.log('Rate limited - skipping TTS request');
      return;
    }
    lastRequestTime.current = now;
    
    const effectiveModel = model || currentModel;
    const cacheKey = `${text.trim()}-${speaker}-${effectiveModel}`;
    
    try {
      stopCurrentAudio();
      setIsLoading(true);
      setError(null);

      console.log(`TTS: Speaking with ${effectiveModel} model, ${speaker} voice`);

      const cached = audioCache.current.get(cacheKey);
      let audioContent: string;

      if (cached && (now - cached.timestamp < 30 * 60 * 1000)) {
        console.log('Using cached audio');
        audioContent = cached.audio;
      } else {
        console.log('Making TTS API request...');
        const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
          body: { 
            text: text.trim(), 
            speaker,
            model: effectiveModel,
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
            throw new Error('💳 ElevenLabs-Kontingent aufgebraucht! Bitte Credits aufladen.');
          } else if (data.error === 'RATE_LIMITED') {
            throw new Error('⏳ Zu viele Anfragen - bitte kurz warten');
          } else if (data.error === 'API_KEY_MISSING') {
            throw new Error('🔑 ElevenLabs API-Schlüssel fehlt');
          } else {
            throw new Error(`❌ ${data.message || 'TTS Fehler'}`);
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
      }

      const audio = new Audio();
      
      audio.onloadstart = () => setIsLoading(true);
      audio.oncanplaythrough = () => {
        setIsLoading(false);
        setIsSpeaking(true);
      };
      audio.onplay = () => {
        setIsSpeaking(true);
        setIsLoading(false);
      };
      audio.onended = () => {
        setIsSpeaking(false);
        setCurrentAudio(null);
      };
      audio.onerror = () => {
        const errorMsg = 'Audio-Wiedergabe fehlgeschlagen';
        setError(errorMsg);
        setIsSpeaking(false);
        setIsLoading(false);
        setCurrentAudio(null);
        toast.error(errorMsg);
      };

      audio.src = `data:audio/mp3;base64,${audioContent}`;
      setCurrentAudio(audio);
      
      try {
        await audio.play();
      } catch (playError) {
        if (playError.name === 'NotAllowedError') {
          toast.error('🔊 Bitte einmal auf die Seite klicken, um Audio zu aktivieren');
          setError('Autoplay blockiert - bitte Seite anklicken');
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
      
      toast.error('TTS Fehler', {
        description: errorMsg
      });
    }
  }, [isEnabled, quotaExceeded, currentModel, stopCurrentAudio]);

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
      setQuotaExceeded(false);
    }
  }, [stopCurrentAudio, quotaExceeded]);

  const setModel = useCallback((newModel: string) => {
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
