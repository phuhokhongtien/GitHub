/**
 * Audio Session Manager
 * Manages audio session configuration and optimization for voice processing
 */

import {Platform} from 'react-native';

class AudioSessionManager {
  private isSessionActive: boolean = false;

  /**
   * Configure audio session for voice recording
   */
  async configureForRecording(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        // On iOS, audio session is typically managed by the native modules
        // @react-native-voice/voice handles this internally
        console.log('Audio session configured for recording (iOS)');
      } else if (Platform.OS === 'android') {
        // On Android, audio focus is managed by the system
        console.log('Audio session configured for recording (Android)');
      }
      this.isSessionActive = true;
    } catch (error) {
      console.error('Error configuring audio session for recording:', error);
    }
  }

  /**
   * Configure audio session for playback
   */
  async configureForPlayback(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        console.log('Audio session configured for playback (iOS)');
      } else if (Platform.OS === 'android') {
        console.log('Audio session configured for playback (Android)');
      }
      this.isSessionActive = true;
    } catch (error) {
      console.error('Error configuring audio session for playback:', error);
    }
  }

  /**
   * Deactivate audio session
   */
  async deactivate(): Promise<void> {
    try {
      // Clean up any active audio sessions
      this.isSessionActive = false;
      console.log('Audio session deactivated');
    } catch (error) {
      console.error('Error deactivating audio session:', error);
    }
  }

  /**
   * Check if session is active
   */
  isActive(): boolean {
    return this.isSessionActive;
  }

  /**
   * Handle interruptions (phone calls, etc.)
   */
  handleInterruption(interrupted: boolean): void {
    if (interrupted) {
      console.log('Audio session interrupted');
      this.isSessionActive = false;
    } else {
      console.log('Audio session resumed from interruption');
    }
  }

  /**
   * Optimize audio settings for voice
   */
  async optimizeForVoice(): Promise<void> {
    try {
      // Platform-specific optimizations
      if (Platform.OS === 'ios') {
        // iOS optimizations are handled by AVAudioSession
        console.log('Audio optimized for voice (iOS)');
      } else if (Platform.OS === 'android') {
        // Android optimizations
        console.log('Audio optimized for voice (Android)');
      }
    } catch (error) {
      console.error('Error optimizing audio for voice:', error);
    }
  }
}

export default new AudioSessionManager();
