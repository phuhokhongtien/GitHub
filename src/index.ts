/**
 * Main export index for Vietnamese Voice Support
 * Provides easy access to all voice-related components and utilities
 */

// Components
export { LanguageSwitcher } from './components/LanguageSwitcher';
export { VoiceRecorder } from './components/VoiceRecorder';
export { TextToSpeech } from './components/TextToSpeech';

// Screens
export { VoiceScreen } from './screens/VoiceScreen';

// Configuration
export {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  getLanguageConfig,
  getAvailableLanguages,
  type SupportedLanguage,
  type LanguageConfig,
} from './config/languages';

// Utilities
export {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  cancelVoiceRecognition,
  destroyVoiceRecognition,
  isVoiceRecognitionAvailable,
  initializeTts,
  speak,
  stopSpeaking,
  getAvailableVoices,
  isTtsLanguageSupported,
  cleanupTts,
  type VoiceRecognitionResult,
  type VoiceError,
} from './utils/voiceUtils';
