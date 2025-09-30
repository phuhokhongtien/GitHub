/**
 * Voice Service
 * Manages Speech-to-Text (STT) and Text-to-Speech (TTS) functionality
 */

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import PermissionManager from './PermissionManager';
import type {VoiceEventHandler, TTSOptions} from '../types/voice.types';

class VoiceService {
  private isListening: boolean = false;
  private isSpeaking: boolean = false;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize voice services
   */
  private async initialize() {
    // Initialize TTS
    try {
      await Tts.getInitStatus();
      
      // Set default TTS settings
      Tts.setDefaultLanguage('en-US');
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1.0);

      // Add TTS event listeners
      Tts.addEventListener('tts-start', () => {
        this.isSpeaking = true;
      });
      
      Tts.addEventListener('tts-finish', () => {
        this.isSpeaking = false;
      });
      
      Tts.addEventListener('tts-cancel', () => {
        this.isSpeaking = false;
      });
    } catch (error) {
      console.error('Error initializing TTS:', error);
    }
  }

  /**
   * Start listening for speech
   */
  async startListening(handlers: VoiceEventHandler = {}): Promise<boolean> {
    try {
      // Check and request permissions
      const hasPermission = await PermissionManager.requestAllPermissions();
      if (!hasPermission) {
        return false;
      }

      // Stop any ongoing speech
      if (this.isSpeaking) {
        await this.stopSpeaking();
      }

      // Set up event handlers
      if (handlers.onSpeechStart) {
        Voice.onSpeechStart = handlers.onSpeechStart;
      }
      
      if (handlers.onSpeechEnd) {
        Voice.onSpeechEnd = handlers.onSpeechEnd;
      }
      
      if (handlers.onSpeechResults) {
        Voice.onSpeechResults = handlers.onSpeechResults;
      }
      
      if (handlers.onSpeechError) {
        Voice.onSpeechError = handlers.onSpeechError;
      }
      
      if (handlers.onSpeechPartialResults) {
        Voice.onSpeechPartialResults = handlers.onSpeechPartialResults;
      }

      // Start voice recognition
      await Voice.start('en-US');
      this.isListening = true;
      return true;
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      this.isListening = false;
      return false;
    }
  }

  /**
   * Stop listening for speech
   */
  async stopListening(): Promise<void> {
    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  }

  /**
   * Cancel voice recognition
   */
  async cancelListening(): Promise<void> {
    try {
      await Voice.cancel();
      this.isListening = false;
    } catch (error) {
      console.error('Error canceling voice recognition:', error);
    }
  }

  /**
   * Destroy voice recognition
   */
  async destroyVoice(): Promise<void> {
    try {
      await Voice.destroy();
      this.isListening = false;
      
      // Remove Voice event handlers
      Voice.removeAllListeners();
    } catch (error) {
      console.error('Error destroying voice:', error);
    }
  }

  /**
   * Speak text using TTS
   */
  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      // Stop any ongoing listening
      if (this.isListening) {
        await this.stopListening();
      }

      // Set TTS options if provided
      if (options.language) {
        await Tts.setDefaultLanguage(options.language);
      }
      if (options.rate !== undefined) {
        await Tts.setDefaultRate(options.rate);
      }
      if (options.pitch !== undefined) {
        await Tts.setDefaultPitch(options.pitch);
      }

      // Speak the text
      await Tts.speak(text);
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  }

  /**
   * Stop speaking
   */
  async stopSpeaking(): Promise<void> {
    try {
      await Tts.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  }

  /**
   * Check if currently listening
   */
  getIsListening(): boolean {
    return this.isListening;
  }

  /**
   * Check if currently speaking
   */
  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  /**
   * Get available TTS voices
   */
  async getAvailableVoices(): Promise<any[]> {
    try {
      const voices = await Tts.voices();
      return voices;
    } catch (error) {
      console.error('Error getting voices:', error);
      return [];
    }
  }

  /**
   * Set TTS voice
   */
  async setVoice(voiceId: string): Promise<void> {
    try {
      await Tts.setDefaultVoice(voiceId);
    } catch (error) {
      console.error('Error setting voice:', error);
    }
  }

  /**
   * Cleanup - call this when unmounting
   */
  async cleanup(): Promise<void> {
    await this.destroyVoice();
    Tts.removeAllListeners('tts-start');
    Tts.removeAllListeners('tts-finish');
    Tts.removeAllListeners('tts-cancel');
  }
}

export default new VoiceService();
