
import { useState, useCallback } from 'react';

interface TextToSpeechOptions {
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
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

  // Check if browser supports speech synthesis
  const hasSpeechSupport = 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!hasSpeechSupport) {
      const errorMsg = 'Speech synthesis is not supported in this browser';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Find a German voice if available
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang.includes('de-'));
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      const errorMsg = `Speech synthesis error: ${event.error}`;
      setError(errorMsg);
      setIsSpeaking(false);
      if (onError) onError(errorMsg);
    };

    window.speechSynthesis.speak(utterance);
  }, [language, rate, pitch, volume, hasSpeechSupport, onStart, onEnd, onError]);

  const stop = useCallback(() => {
    if (hasSpeechSupport) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [hasSpeechSupport]);

  const pause = useCallback(() => {
    if (hasSpeechSupport && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [hasSpeechSupport, isSpeaking]);

  const resume = useCallback(() => {
    if (hasSpeechSupport && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [hasSpeechSupport, isPaused]);

  return {
    speak,
    stop,
    isPaused,
    isSpeaking,
    pause,
    resume,
    hasSpeechSupport,
    error,
  };
};

export default useTextToSpeech;
