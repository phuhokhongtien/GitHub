/**
 * Voice Permission Handler
 * Manages voice recording and speech recognition permissions for iOS and Android
 */

import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import type {VoicePermissionStatus} from '../types/voice.types';

class PermissionManager {
  /**
   * Request microphone permission based on platform
   */
  async requestMicrophonePermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for voice commands.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.OS === 'ios') {
        // For iOS, we use react-native-permissions
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
        return result === RESULTS.GRANTED;
      }
      return false;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      return false;
    }
  }

  /**
   * Request speech recognition permission (primarily for iOS)
   */
  async requestSpeechRecognitionPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
        return result === RESULTS.GRANTED;
      }
      // Android handles speech recognition through RECORD_AUDIO permission
      return true;
    } catch (error) {
      console.error('Error requesting speech recognition permission:', error);
      return false;
    }
  }

  /**
   * Check current permission status
   */
  async checkPermissions(): Promise<VoicePermissionStatus> {
    const status: VoicePermissionStatus = {
      microphone: false,
      speechRecognition: false,
    };

    try {
      if (Platform.OS === 'android') {
        const micGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        status.microphone = micGranted;
        status.speechRecognition = micGranted; // Same permission on Android
      } else if (Platform.OS === 'ios') {
        const micResult = await check(PERMISSIONS.IOS.MICROPHONE);
        const speechResult = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION);
        status.microphone = micResult === RESULTS.GRANTED;
        status.speechRecognition = speechResult === RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }

    return status;
  }

  /**
   * Request all required permissions
   */
  async requestAllPermissions(): Promise<boolean> {
    const micPermission = await this.requestMicrophonePermission();
    if (!micPermission) {
      Alert.alert(
        'Permission Required',
        'Microphone permission is required for voice commands.',
      );
      return false;
    }

    if (Platform.OS === 'ios') {
      const speechPermission = await this.requestSpeechRecognitionPermission();
      if (!speechPermission) {
        Alert.alert(
          'Permission Required',
          'Speech recognition permission is required for voice commands.',
        );
        return false;
      }
    }

    return true;
  }
}

export default new PermissionManager();
