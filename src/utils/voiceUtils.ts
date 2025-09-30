/**
 * Voice utilities for Speech-to-Text (STT) and Text-to-Speech (TTS)
 * Supports Vietnamese and English languages with fallback logic
 */

import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
} from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { SupportedLanguage, getLanguageConfig, FALLBACK_LANGUAGE } from '../config/languages';

export interface VoiceRecognitionResult {
  text: string;
  confidence?: number;
  language: SupportedLanguage;
}

export interface VoiceError {
  code: string;
  message: string;
}

/**
 * Initialize Voice Recognition
 */
export const initializeVoiceRecognition = (
  onResult: (result: VoiceRecognitionResult) => void,
  onError: (error: VoiceError) => void,
) => {
  Voice.onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      onResult({
        text: e.value[0],
        language: 'vi-VN', // Current language from context
      });
    }
  };

  Voice.onSpeechError = (e: SpeechErrorEvent) => {
    onError({
      code: e.error?.code || 'UNKNOWN_ERROR',
      message: e.error?.message || 'Speech recognition error',
    });
  };
};

/**
 * Start speech recognition for a specific language
 */
export const startVoiceRecognition = async (
  language: SupportedLanguage,
  continuous = false,
): Promise<void> => {
  try {
    const langConfig = getLanguageConfig(language);
    await Voice.start(langConfig.code, {
      RECOGNIZER_ENGINE: 'GOOGLE',
    });
  } catch (error) {
    console.error('Error starting voice recognition:', error);
    throw error;
  }
};

/**
 * Stop speech recognition
 */
export const stopVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.stop();
  } catch (error) {
    console.error('Error stopping voice recognition:', error);
    throw error;
  }
};

/**
 * Cancel speech recognition
 */
export const cancelVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.cancel();
  } catch (error) {
    console.error('Error canceling voice recognition:', error);
    throw error;
  }
};

/**
 * Destroy voice recognition instance
 */
export const destroyVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.destroy();
  } catch (error) {
    console.error('Error destroying voice recognition:', error);
  }
};

/**
 * Check if speech recognition is available
 */
export const isVoiceRecognitionAvailable = async (): Promise<boolean> => {
  try {
    return await Voice.isAvailable();
  } catch (error) {
    console.error('Error checking voice recognition availability:', error);
    return false;
  }
};

/**
 * Initialize Text-to-Speech
 */
export const initializeTts = async () => {
  try {
    await Tts.setDefaultRate(0.5);
    await Tts.setDefaultPitch(1.0);
    
    // Set up event listeners
    Tts.addEventListener('tts-start', () => console.log('TTS started'));
    Tts.addEventListener('tts-finish', () => console.log('TTS finished'));
    Tts.addEventListener('tts-cancel', () => console.log('TTS cancelled'));
  } catch (error) {
    console.error('Error initializing TTS:', error);
  }
};

/**
 * Speak text in the specified language
 * Falls back to default language if the specified language is not available
 */
export const speak = async (
  text: string,
  language: SupportedLanguage,
  rate = 0.5,
): Promise<void> => {
  try {
    const langConfig = getLanguageConfig(language);
    
    // Check available voices
    const voices = await Tts.voices();
    const languageVoices = voices.filter(
      (v: any) => v.language === langConfig.code || v.language.startsWith(langConfig.code.split('-')[0]),
    );

    if (languageVoices.length > 0) {
      // Use the first available voice for the language
      await Tts.setDefaultLanguage(langConfig.code);
    } else {
      // Fallback to English if Vietnamese is not available
      console.warn(`Language ${langConfig.code} not available, falling back to ${FALLBACK_LANGUAGE}`);
      const fallbackConfig = getLanguageConfig(FALLBACK_LANGUAGE);
      await Tts.setDefaultLanguage(fallbackConfig.code);
    }

    await Tts.setDefaultRate(rate);
    await Tts.speak(text);
  } catch (error) {
    console.error('Error speaking text:', error);
    throw error;
  }
};

/**
 * Stop current speech
 */
export const stopSpeaking = async (): Promise<void> => {
  try {
    await Tts.stop();
  } catch (error) {
    console.error('Error stopping speech:', error);
  }
};

/**
 * Get available voices for a specific language
 */
export const getAvailableVoices = async (
  language?: SupportedLanguage,
): Promise<any[]> => {
  try {
    const voices = await Tts.voices();
    
    if (language) {
      const langConfig = getLanguageConfig(language);
      return voices.filter(
        (v: any) => v.language === langConfig.code || 
                   v.language.startsWith(langConfig.code.split('-')[0]),
      );
    }
    
    return voices;
  } catch (error) {
    console.error('Error getting available voices:', error);
    return [];
  }
};

/**
 * Check if a language is supported for TTS
 */
export const isTtsLanguageSupported = async (
  language: SupportedLanguage,
): Promise<boolean> => {
  try {
    const voices = await getAvailableVoices(language);
    return voices.length > 0;
  } catch (error) {
    console.error('Error checking TTS language support:', error);
    return false;
  }
};

/**
 * Cleanup TTS resources
 */
export const cleanupTts = () => {
  Tts.removeAllListeners('tts-start');
  Tts.removeAllListeners('tts-finish');
  Tts.removeAllListeners('tts-cancel');
};
