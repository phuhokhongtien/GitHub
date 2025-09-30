// Jest setup file
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-permissions
jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: {
    IOS: {
      MICROPHONE: 'ios.permission.MICROPHONE',
      SPEECH_RECOGNITION: 'ios.permission.SPEECH_RECOGNITION',
    },
    ANDROID: {
      RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    UNAVAILABLE: 'unavailable',
  },
}));

// Mock @react-native-voice/voice
jest.mock('@react-native-voice/voice', () => ({
  start: jest.fn(),
  stop: jest.fn(),
  cancel: jest.fn(),
  destroy: jest.fn(),
  removeAllListeners: jest.fn(),
  onSpeechStart: null,
  onSpeechEnd: null,
  onSpeechResults: null,
  onSpeechError: null,
  onSpeechPartialResults: null,
}));

// Mock react-native-tts
jest.mock('react-native-tts', () => ({
  getInitStatus: jest.fn(() => Promise.resolve()),
  setDefaultLanguage: jest.fn(() => Promise.resolve()),
  setDefaultRate: jest.fn(() => Promise.resolve()),
  setDefaultPitch: jest.fn(() => Promise.resolve()),
  speak: jest.fn(() => Promise.resolve()),
  stop: jest.fn(() => Promise.resolve()),
  voices: jest.fn(() => Promise.resolve([])),
  setDefaultVoice: jest.fn(() => Promise.resolve()),
  addEventListener: jest.fn(),
  removeAllListeners: jest.fn(),
}));

// Mock PermissionsAndroid
jest.mock('react-native/Libraries/PermissionsAndroid/PermissionsAndroid', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: {
    RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    NEVER_ASK_AGAIN: 'never_ask_again',
  },
}));
