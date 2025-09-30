/**
 * Voice Service Types
 */

export interface VoiceResult {
  value: string[];
}

export interface VoiceError {
  code?: string;
  message?: string;
}

export interface VoiceEventHandler {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onSpeechResults?: (e: VoiceResult) => void;
  onSpeechError?: (e: VoiceError) => void;
  onSpeechPartialResults?: (e: VoiceResult) => void;
}

export interface TTSOptions {
  language?: string;
  pitch?: number;
  rate?: number;
}

export interface VoiceCommand {
  intent: string;
  parameters: Record<string, any>;
  confidence: number;
}

export interface VoicePermissionStatus {
  microphone: boolean;
  speechRecognition: boolean;
}
