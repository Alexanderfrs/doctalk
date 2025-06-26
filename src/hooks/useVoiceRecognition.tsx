
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface VoiceRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (result: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

interface UseVoiceRecognitionReturn {
  text: string;
  isListening: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetText: () => void;
  hasRecognitionSupport: boolean;
  error: string | null;
}

// Define the SpeechRecognition type with browser prefixes
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

// For TypeScript to recognize the window.SpeechRecognition object
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const useVoiceRecognition = ({
  language = 'de-DE',
  continuous = false,
  interimResults = true,
  onResult,
  onError,
}: VoiceRecognitionOptions = {}): UseVoiceRecognitionReturn => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Check if browser supports speech recognition or if we can use fallback
  const hasRecognitionSupport = !!window.SpeechRecognition || !!window.webkitSpeechRecognition || !!navigator.mediaDevices;

  // Initialize speech recognition
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = language;
        recognitionRef.current.continuous = continuous;
        recognitionRef.current.interimResults = interimResults;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const resultIndex = event.resultIndex;
          const transcript = event.results[resultIndex][0].transcript;
          const isFinal = event.results[resultIndex].isFinal;

          if (isFinal) {
            setText((prev) => prev + ' ' + transcript);
            if (onResult) onResult(transcript, true);
          } else {
            if (onResult) onResult(transcript, false);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setError(`Speech recognition error: ${event.error}`);
          if (onError) onError(`Speech recognition error: ${event.error}`);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } catch (err) {
        console.error("Error initializing speech recognition:", err);
        setError('Failed to initialize speech recognition');
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [language, continuous, interimResults, onResult, onError]);

  // Fallback transcription using Supabase Edge Function
  const transcribeWithFallback = async (audioBlob: Blob) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const base64Audio = btoa(
          String.fromCharCode(...new Uint8Array(arrayBuffer))
        );

        const { data, error } = await supabase.functions.invoke('voice-to-text', {
          body: { audio: base64Audio }
        });

        if (error) throw new Error(error.message);
        if (data?.text) {
          setText(data.text);
          if (onResult) onResult(data.text, true);
        }
      };
      reader.readAsArrayBuffer(audioBlob);
    } catch (error) {
      console.error("Fallback transcription error:", error);
      setError("Transcription failed");
      if (onError) onError("Transcription failed");
    }
  };

  const startListening = useCallback(async () => {
    setError(null);
    
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Try native speech recognition first
      if (recognitionRef.current) {
        setText('');
        
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping non-started recognition
        }
        
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch (err) {
            console.error('Native speech recognition failed, using fallback:', err);
            startFallbackRecording();
          }
        }, 100);
      } else {
        // Use fallback recording method
        startFallbackRecording();
      }
    } catch (permissionErr) {
      console.error('Microphone permission denied:', permissionErr);
      setError('Mikrofonzugriff verweigert. Bitte erlauben Sie den Mikrofonzugriff.');
      if (onError) onError('Mikrofonzugriff verweigert');
    }
  }, [onError]);

  const startFallbackRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        transcribeWithFallback(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Fallback recording failed:', error);
      setError('Aufnahme fehlgeschlagen');
      if (onError) onError('Aufnahme fehlgeschlagen');
    }
  };

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    setIsListening(false);
  }, []);

  const resetText = useCallback(() => {
    setText('');
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    resetText,
    hasRecognitionSupport,
    error,
  };
};

export default useVoiceRecognition;
