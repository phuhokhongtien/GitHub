/**
 * Voice Recorder Component
 * Provides speech-to-text functionality with Vietnamese support
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  cancelVoiceRecognition,
  destroyVoiceRecognition,
  isVoiceRecognitionAvailable,
  VoiceRecognitionResult,
  VoiceError,
} from '../utils/voiceUtils';
import { SupportedLanguage } from '../config/languages';

interface VoiceRecorderProps {
  language: SupportedLanguage;
  onResult: (result: VoiceRecognitionResult) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  language,
  onResult,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAvailability();
    setupVoiceRecognition();

    return () => {
      destroyVoiceRecognition();
    };
  }, []);

  const checkAvailability = async () => {
    try {
      const available = await isVoiceRecognitionAvailable();
      setIsAvailable(available);
      setIsLoading(false);
      
      if (!available) {
        Alert.alert(
          'Voice Recognition Unavailable',
          'Speech recognition is not available on this device.',
        );
      }
    } catch (error) {
      setIsLoading(false);
      setIsAvailable(false);
    }
  };

  const setupVoiceRecognition = () => {
    initializeVoiceRecognition(
      (result: VoiceRecognitionResult) => {
        setIsRecording(false);
        onResult({ ...result, language });
      },
      (error: VoiceError) => {
        setIsRecording(false);
        Alert.alert('Recognition Error', error.message);
      },
    );
  };

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      await startVoiceRecognition(language);
    } catch (error) {
      setIsRecording(false);
      Alert.alert('Error', 'Failed to start voice recognition');
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopVoiceRecognition();
      setIsRecording(false);
    } catch (error) {
      setIsRecording(false);
      Alert.alert('Error', 'Failed to stop voice recognition');
    }
  };

  const handleCancelRecording = async () => {
    try {
      await cancelVoiceRecognition();
      setIsRecording(false);
    } catch (error) {
      setIsRecording(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text style={styles.unavailableText}>
          Voice recognition is not available on this device
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {language === 'vi-VN' ? 'Ghi âm giọng nói' : 'Voice Recording'}
      </Text>
      
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingButton]}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
        accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
        accessibilityRole="button"
      >
        <View style={[styles.recordIcon, isRecording && styles.recordingIcon]} />
        <Text style={styles.recordButtonText}>
          {isRecording
            ? language === 'vi-VN'
              ? 'Nhấn để dừng'
              : 'Tap to Stop'
            : language === 'vi-VN'
            ? 'Nhấn để ghi âm'
            : 'Tap to Record'}
        </Text>
      </TouchableOpacity>

      {isRecording && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelRecording}
          accessibilityLabel="Cancel recording"
          accessibilityRole="button"
        >
          <Text style={styles.cancelButtonText}>
            {language === 'vi-VN' ? 'Hủy' : 'Cancel'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  recordingButton: {
    backgroundColor: '#FF3B30',
  },
  recordIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  recordingIcon: {
    borderRadius: 8,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  unavailableText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
