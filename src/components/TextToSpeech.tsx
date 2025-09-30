/**
 * Text-to-Speech Component
 * Provides text-to-speech functionality with Vietnamese support
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  initializeTts,
  speak,
  stopSpeaking,
  isTtsLanguageSupported,
  cleanupTts,
} from '../utils/voiceUtils';
import { SupportedLanguage } from '../config/languages';

interface TextToSpeechProps {
  language: SupportedLanguage;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ language }) => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setupTts();
    checkLanguageSupport();

    return () => {
      cleanupTts();
    };
  }, []);

  useEffect(() => {
    checkLanguageSupport();
  }, [language]);

  const setupTts = async () => {
    try {
      await initializeTts();
    } catch (error) {
      console.error('Failed to initialize TTS:', error);
    }
  };

  const checkLanguageSupport = async () => {
    try {
      const supported = await isTtsLanguageSupported(language);
      setIsSupported(supported);
      
      if (!supported) {
        Alert.alert(
          'Language Not Supported',
          `${language === 'vi-VN' ? 'Vietnamese' : 'English'} TTS is not available on this device. The app will use a fallback language.`,
        );
      }
    } catch (error) {
      console.error('Error checking TTS language support:', error);
    }
  };

  const handleSpeak = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please enter some text to speak');
      return;
    }

    try {
      setIsSpeaking(true);
      await speak(text, language);
      setIsSpeaking(false);
    } catch (error) {
      setIsSpeaking(false);
      Alert.alert('Error', 'Failed to speak text');
    }
  };

  const handleStop = async () => {
    try {
      await stopSpeaking();
      setIsSpeaking(false);
    } catch (error) {
      setIsSpeaking(false);
    }
  };

  const getPlaceholderText = () => {
    return language === 'vi-VN'
      ? 'Nhập văn bản để đọc...'
      : 'Enter text to speak...';
  };

  const getSampleText = () => {
    return language === 'vi-VN'
      ? 'Xin chào, đây là ví dụ về chuyển văn bản thành giọng nói tiếng Việt.'
      : 'Hello, this is an example of text-to-speech in English.';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {language === 'vi-VN' ? 'Chuyển văn bản thành giọng nói' : 'Text-to-Speech'}
      </Text>

      {!isSupported && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ {language === 'vi-VN' ? 'Ngôn ngữ này không được hỗ trợ' : 'Language not supported'}
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder={getPlaceholderText()}
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        accessibilityLabel="Text input for speech"
      />

      <TouchableOpacity
        style={styles.sampleButton}
        onPress={() => setText(getSampleText())}
        accessibilityLabel="Use sample text"
        accessibilityRole="button"
      >
        <Text style={styles.sampleButtonText}>
          {language === 'vi-VN' ? 'Dùng văn bản mẫu' : 'Use Sample Text'}
        </Text>
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.speakButton, isSpeaking && styles.disabledButton]}
          onPress={handleSpeak}
          disabled={isSpeaking}
          accessibilityLabel="Speak text"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>
            {isSpeaking
              ? language === 'vi-VN'
                ? 'Đang đọc...'
                : 'Speaking...'
              : language === 'vi-VN'
              ? 'Đọc'
              : 'Speak'}
          </Text>
        </TouchableOpacity>

        {isSpeaking && (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={handleStop}
            accessibilityLabel="Stop speaking"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {language === 'vi-VN' ? 'Dừng' : 'Stop'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  warningContainer: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  sampleButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    marginBottom: 16,
  },
  sampleButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  speakButton: {
    backgroundColor: '#007AFF',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
