/**
 * Main Voice Features Screen
 * Demonstrates Vietnamese and English voice support
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { TextToSpeech } from '../components/TextToSpeech';
import { SupportedLanguage, DEFAULT_LANGUAGE } from '../config/languages';
import { VoiceRecognitionResult } from '../utils/voiceUtils';

export const VoiceScreen: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [recognizedText, setRecognizedText] = useState<string>('');

  const handleLanguageChange = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    setRecognizedText(''); // Clear recognized text when switching languages
  };

  const handleVoiceResult = (result: VoiceRecognitionResult) => {
    setRecognizedText(result.text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {currentLanguage === 'vi-VN'
              ? 'Hỗ trợ Giọng nói Tiếng Việt'
              : 'Vietnamese Voice Support'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {currentLanguage === 'vi-VN'
              ? 'Nhận dạng giọng nói và chuyển văn bản thành giọng nói'
              : 'Speech Recognition and Text-to-Speech'}
          </Text>
        </View>

        <LanguageSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'vi-VN'
              ? '1. Nhận dạng Giọng nói (STT)'
              : '1. Speech Recognition (STT)'}
          </Text>
          <VoiceRecorder
            language={currentLanguage}
            onResult={handleVoiceResult}
          />
          {recognizedText ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>
                {currentLanguage === 'vi-VN' ? 'Kết quả:' : 'Result:'}
              </Text>
              <Text style={styles.resultText}>{recognizedText}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'vi-VN'
              ? '2. Chuyển Văn bản thành Giọng nói (TTS)'
              : '2. Text-to-Speech (TTS)'}
          </Text>
          <TextToSpeech language={currentLanguage} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {currentLanguage === 'vi-VN'
              ? '✓ Hỗ trợ tiếng Việt và tiếng Anh'
              : '✓ Supports Vietnamese and English'}
          </Text>
          <Text style={styles.footerText}>
            {currentLanguage === 'vi-VN'
              ? '✓ Tự động dự phòng khi không hỗ trợ'
              : '✓ Automatic fallback when not supported'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  resultContainer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#1B5E20',
    lineHeight: 24,
  },
  footer: {
    marginTop: 24,
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
});
