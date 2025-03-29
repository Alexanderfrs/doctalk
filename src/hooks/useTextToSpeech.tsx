
import { useState, useCallback } from 'react';

interface TextToSpeechOptions {
  language?: string;
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
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
  language = 'de-DE',
  voice = 'Sarah', // Default ElevenLabs voice
  rate = 1,
  pitch = 1,
  volume = 1,
  onStart,
  onEnd,
  onError,
}: TextToSpeechOptions = {}): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const voices = {
    'Sarah': 'EXAVITQu4vr4xnSDxMaL',
    'Laura': 'FGY2WhTYpPnrIDTdsKH5',
    'Charlotte': 'XB0fDUnXU5powFXDhCwa',
  };

  const speak = useCallback(async (text: string) => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: voices[voice] || voices['Sarah'],
          model: 'eleven_multilingual_v2'
        })
      });

      if (!response.ok) {
        throw new Error('Text-to-speech generation failed');
      }

      const { audioContent } = await response.json();
      const audioBlob = new Blob([Buffer.from(audioContent, 'base64')], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => {
        setIsSpeaking(true);
        if (onStart) onStart();
      };
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        if (onEnd) onEnd();
      };
      
      audio.onerror = (e) => {
        const errorMsg = `Audio playback error: ${e}`;
        setError(errorMsg);
        if (onError) onError(errorMsg);
      };

      await audio.play();
    } catch (e) {
      const errorMsg = `Speech synthesis error: ${e.message}`;
      setError(errorMsg);
      if (onError) onError(errorMsg);
    }
  }, [voice, onStart, onEnd, onError]);

  const stop = useCallback(() => {
    // Implementation of stop functionality
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    // Implementation of pause functionality
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    // Implementation of resume functionality
    setIsPaused(false);
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
  };
};

export default useTextToSpeech;
