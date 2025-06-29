
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

interface TextToSpeechOptions {
  speaker?: 'user' | 'patient' | 'doctor' | 'colleague';
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  maxRetries?: number;
}

interface UseTextToSpeechReturn {
  speak: (text: string, speaker?: string, messageId?: string) => Promise<void>;
  stop: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  pause: () => void;
  resume: () => void;
  hasSpeechSupport: boolean;
  error: string | null;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  isLoadingAudio: boolean;
  currentMessageId: string | null;
}

const useTextToSpeech = ({
  speaker = 'user',
  autoPlay = true,
  onStart,
  onEnd,
  onError,
  maxRetries = 2,
}: TextToSpeechOptions = {}): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    localStorage.getItem('tts-enabled') !== 'false'
  );
  
  const audioCache = useRef<Map<string, string>>(new Map());
  const retryCount = useRef<number>(0);

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.remove();
      setCurrentAudio(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoadingAudio(false);
    setCurrentMessageId(null);
  };

  const generateAudioWithRetry = async (text: string, speakerVoice: string): Promise<string> => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`TTS attempt ${attempt + 1}/${maxRetries + 1} for speaker: ${speakerVoice}`);
        
        const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
          body: { 
            text, 
            speaker: speakerVoice,
            language: 'de'
          }
        });

        if (apiError) throw new Error(apiError.message);
        if (!data?.audioContent) throw new Error('Keine Audiodaten von ElevenLabs erhalten');

        const audioUrl = `data:audio/mp3;base64,${data.audioContent}`;
        console.log("TTS Audio erfolgreich generiert");
        return audioUrl;
        
      } catch (e) {
        lastError = e instanceof Error ? e : new Error('Unbekannter TTS-Fehler');
        console.error(`TTS Versuch ${attempt + 1} fehlgeschlagen:`, lastError.message);
        
        if (attempt < maxRetries) {
          // Exponential backoff: wait 500ms, then 1s, then 2s
          const delay = Math.min(500 * Math.pow(2, attempt), 2000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError || new Error('TTS nach mehreren Versuchen fehlgeschlagen');
  };

  const speak = useCallback(async (text: string, speakerOverride?: string, messageId?: string) => {
    if (!isEnabled || !text.trim()) return;
    
    try {
      stopCurrentAudio();
      
      if (onStart) onStart();
      setIsSpeaking(true);
      setIsLoadingAudio(true);
      setError(null);
      setCurrentMessageId(messageId || null);
      retryCount.current = 0;

      const currentSpeaker = speakerOverride || speaker;
      const cacheKey = `${currentSpeaker}-${text.substring(0, 100)}`;
      
      let audioUrl: string;
      
      // Check cache first
      if (audioCache.current.has(cacheKey)) {
        audioUrl = audioCache.current.get(cacheKey)!;
        console.log("TTS Audio aus Cache geladen");
      } else {
        audioUrl = await generateAudioWithRetry(text, currentSpeaker);
        // Cache the audio URL (limit cache size to 50 entries)
        if (audioCache.current.size >= 50) {
          const firstKey = audioCache.current.keys().next().value;
          audioCache.current.delete(firstKey);
        }
        audioCache.current.set(cacheKey, audioUrl);
      }

      setIsLoadingAudio(false);
      
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        setCurrentMessageId(null);
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        const errorMsg = `Audio-Wiedergabe fehlgeschlagen`;
        setError(errorMsg);
        setIsSpeaking(false);
        setIsLoadingAudio(false);
        setCurrentMessageId(null);
        if (onError) onError(errorMsg);
      };

      setCurrentAudio(audio);
      await audio.play();
      
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Sprachausgabe-Fehler';
      setError(errorMsg);
      setIsSpeaking(false);
      setIsLoadingAudio(false);
      setCurrentMessageId(null);
      if (onError) onError(errorMsg);
      else {
        console.error('TTS Error:', errorMsg);
        // Don't show toast for every error, just log it
      }
    }
  }, [speaker, isEnabled, onStart, onEnd, onError, maxRetries]);

  const stop = useCallback(() => {
    stopCurrentAudio();
  }, []);

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

  const setEnabledWithStorage = useCallback((enabled: boolean) => {
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
    setEnabled: setEnabledWithStorage,
    isLoadingAudio,
    currentMessageId,
  };
};

export default useTextToSpeech;
