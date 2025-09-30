/**
 * useVoice Hook
 * Custom React hook for voice functionality
 */

import {useState, useEffect, useCallback} from 'react';
import VoiceService from '../services/VoiceService';
import VoiceCommandParser from '../services/VoiceCommandParser';
import AudioSessionManager from '../services/AudioSessionManager';
import type {VoiceCommand, VoiceError, VoiceResult} from '../types/voice.types';

interface UseVoiceReturn {
  isListening: boolean;
  isSpeaking: boolean;
  recognizedText: string;
  partialText: string;
  error: string | null;
  lastCommand: VoiceCommand | null;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => Promise<void>;
  reset: () => void;
}

export const useVoice = (): UseVoiceReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [partialText, setPartialText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setRecognizedText('');
      setPartialText('');
      
      await AudioSessionManager.configureForRecording();

      const success = await VoiceService.startListening({
        onSpeechStart: () => {
          setIsListening(true);
        },
        onSpeechEnd: () => {
          setIsListening(false);
        },
        onSpeechResults: (e: VoiceResult) => {
          if (e.value && e.value.length > 0) {
            const text = e.value[0];
            setRecognizedText(text);
            
            // Parse command
            const command = VoiceCommandParser.parseCommand(text);
            setLastCommand(command);
          }
        },
        onSpeechError: (e: VoiceError) => {
          setIsListening(false);
          setError(e.message || 'Speech recognition error');
        },
        onSpeechPartialResults: (e: VoiceResult) => {
          if (e.value && e.value.length > 0) {
            setPartialText(e.value[0]);
          }
        },
      });

      if (!success) {
        setError('Failed to start listening. Please check permissions.');
      }
    } catch (err) {
      setError('Error starting voice recognition');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await VoiceService.stopListening();
      setIsListening(false);
    } catch (err) {
      setError('Error stopping voice recognition');
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    try {
      setError(null);
      setIsSpeaking(true);
      
      await AudioSessionManager.configureForPlayback();
      await VoiceService.speak(text);
      
      // TTS events will update isSpeaking state
      setTimeout(() => setIsSpeaking(false), 100);
    } catch (err) {
      setError('Error speaking text');
      setIsSpeaking(false);
    }
  }, []);

  const stopSpeaking = useCallback(async () => {
    try {
      await VoiceService.stopSpeaking();
      setIsSpeaking(false);
    } catch (err) {
      setError('Error stopping speech');
    }
  }, []);

  const reset = useCallback(() => {
    setRecognizedText('');
    setPartialText('');
    setError(null);
    setLastCommand(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      VoiceService.cleanup();
      AudioSessionManager.deactivate();
    };
  }, []);

  return {
    isListening,
    isSpeaking,
    recognizedText,
    partialText,
    error,
    lastCommand,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    reset,
  };
};
