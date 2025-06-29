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

  // Enhanced cache with better error handling
  const audioCache = useRef<Map<string, { audio: string; timestamp: number; size: number }>>(new Map());
  const maxCacheSize = 25 * 1024 * 1024; // Reduced to 25MB for better performance
  const maxCacheAge = 15 * 60 * 1000; // Reduced to 15 minutes

  // Rate limiting with better controls
  const lastRequestTime = useRef<number>(0);
  const minRequestInterval = 1000; // Increased to 1 second between requests
  const maxRetries = 2;

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

      while (totalSize > maxCacheSize * 0.7 && sortedEntries.length > 0) {
        const [key, value] = sortedEntries.shift()!;
        audioCache.current.delete(key);
        totalSize -= value.size;
      }
    }
  }, []);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
      } catch (err) {
        console.warn('Error stopping audio:', err);
      }
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setIsLoading(false);
  }, [currentAudio]);

  const speak = useCallback(async (text: string, speakerOverride?: string, modelOverride?: string) => {
    if (!isEnabled || quotaExceeded || !text?.trim()) {
      console.log('TTS disabled or no text:', { isEnabled, quotaExceeded, hasText: !!text?.trim() });
      return;
    }
    
    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime.current < minRequestInterval) {
      console.log('Rate limited, skipping TTS request');
      return;
    }
    lastRequestTime.current = now;
    
    const effectiveModel = modelOverride || currentModel;
    const effectiveSpeaker = speakerOverride || speaker;
    const cleanText = text.trim().substring(0, 500); // Limit text length
    const cacheKey = `${cleanText}-${effectiveSpeaker}-${effectiveModel}`;
    
    let retryCount = 0;
    
    const attemptSpeak = async (): Promise<void> => {
      try {
        stopCurrentAudio();
        setIsLoading(true);
        setError(null);
        
        if (onStart) onStart();

        console.log(`TTS attempt ${retryCount + 1} with ${effectiveModel} model, ${effectiveSpeaker} voice:`, cleanText.substring(0, 50));

        // Clean and check cache
        cleanCache();
        const cached = audioCache.current.get(cacheKey);
        let audioContent: string;

        if (cached && retryCount === 0) {
          console.log('Using cached audio');
          audioContent = cached.audio;
        } else {
          console.log('Fetching new audio from API');
          
          const { data, error: apiError } = await supabase.functions.invoke('text-to-speech', {
            body: { 
              text: cleanText, 
              speaker: effectiveSpeaker,
              model: effectiveModel,
              language: 'de'
            }
          });

          if (apiError) {
            throw new Error(`API Error: ${apiError.message || 'Unknown API error'}`);
          }
          
          if (data?.error) {
            if (data.error === 'QUOTA_EXCEEDED') {
              setQuotaExceeded(true);
              throw new Error('ElevenLabs quota exceeded - please check your API key or credits');
            } else if (data.error === 'RATE_LIMITED') {
              throw new Error('Too many requests - please wait a moment');
            } else {
              throw new Error(data.message || `TTS API Error: ${data.error}`);
            }
          }
          
          if (!data?.audioContent) {
            throw new Error('No audio data received from API');
          }

          audioContent = data.audioContent;
          
          // Cache with size tracking
          const audioSize = audioContent.length * 0.75;
          audioCache.current.set(cacheKey, {
            audio: audioContent,
            timestamp: now,
            size: audioSize
          });
        }

        // Create and play audio with better error handling
        const audio = new Audio();
        let audioLoaded = false;
        
        // Set up event listeners before setting src
        audio.onloadstart = () => {
          console.log('Audio loading started');
          setIsLoading(true);
        };
        
        audio.oncanplaythrough = () => {
          console.log('Audio can play through');
          audioLoaded = true;
          setIsLoading(false);
          setIsSpeaking(true);
        };
        
        audio.onended = () => {
          console.log('Audio playback ended');
          setIsSpeaking(false);
          setIsLoading(false);
          setCurrentAudio(null);
          if (onEnd) onEnd();
        };
        
        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          const errorMsg = 'Audio playback failed - please try again';
          setError(errorMsg);
          setIsSpeaking(false);
          setIsLoading(false);
          setCurrentAudio(null);
          
          // Retry logic
          if (retryCount < maxRetries) {
            console.log(`Retrying TTS (attempt ${retryCount + 2})`);
            retryCount++;
            setTimeout(() => attemptSpeak(), 1000);
            return;
          }
          
          if (onError) onError(errorMsg);
          else toast.error('Speech Error', { description: errorMsg });
        };

        // Set audio source and attempt playback
        setCurrentAudio(audio);
        audio.src = `data:audio/mp3;base64,${audioContent}`;
        
        // Wait a bit for loading then play
        setTimeout(async () => {
          try {
            if (audio && !audio.ended) {
              await audio.play();
              console.log('Audio playback started successfully');
            }
          } catch (playError) {
            console.error('Audio play error:', playError);
            
            // Handle autoplay restrictions
            if (playError.name === 'NotAllowedError') {
              const errorMsg = 'Audio blocked - please interact with the page first';
              setError(errorMsg);
              if (onError) onError(errorMsg);
              else toast.error('Audio Blocked', { description: errorMsg });
            } else if (retryCount < maxRetries) {
              retryCount++;
              setTimeout(() => attemptSpeak(), 1000);
              return;
            } else {
              const errorMsg = 'Audio playback failed';
              setError(errorMsg);
              if (onError) onError(errorMsg);
              else toast.error('Speech Error', { description: errorMsg });
            }
            
            setIsSpeaking(false);
            setIsLoading(false);
            setCurrentAudio(null);
          }
        }, 100);
        
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : 'Unknown TTS error occurred';
        console.error('TTS Error:', e);
        
        setError(errorMsg);
        setIsSpeaking(false);
        setIsLoading(false);
        setCurrentAudio(null);
        
        // Retry logic for network errors
        if (retryCount < maxRetries && !errorMsg.includes('quota') && !errorMsg.includes('Quota')) {
          retryCount++;
          console.log(`Retrying TTS due to error (attempt ${retryCount + 1})`);
          setTimeout(() => attemptSpeak(), 2000);
          return;
        }
        
        if (onError) {
          onError(errorMsg);
        } else {
          toast.error('Speech Output Error', {
            description: errorMsg.length > 50 ? errorMsg.substring(0, 50) + '...' : errorMsg
          });
        }
      }
    };

    await attemptSpeak();
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
      setQuotaExceeded(false);
    }
  }, [stopCurrentAudio, quotaExceeded]);

  const setModel = useCallback((newModel: string) => {
    setCurrentModel(newModel);
    localStorage.setItem('tts-model', newModel);
  }, []);

  return {
    speak,
    stop: stopCurrentAudio,
    isPaused,
    isSpeaking,
    pause: useCallback(() => {
      if (currentAudio && !isPaused) {
        currentAudio.pause();
        setIsPaused(true);
      }
    }, [currentAudio, isPaused]),
    resume: useCallback(() => {
      if (currentAudio && isPaused) {
        currentAudio.play();
        setIsPaused(false);
      }
    }, [currentAudio, isPaused]),
    hasSpeechSupport: true,
    error,
    isEnabled,
    setEnabled: useCallback((enabled: boolean) => {
      setIsEnabled(enabled);
      localStorage.setItem('tts-enabled', enabled.toString());
      if (!enabled) {
        stopCurrentAudio();
      }
      if (enabled && quotaExceeded) {
        setQuotaExceeded(false);
      }
    }, [stopCurrentAudio, quotaExceeded]),
    isLoading,
    currentModel,
    setModel: useCallback((newModel: string) => {
      setCurrentModel(newModel);
      localStorage.setItem('tts-model', newModel);
    }, []),
    quotaExceeded,
  };
};

export default useTextToSpeech;
