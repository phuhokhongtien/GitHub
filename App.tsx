/**
 * Voice App Demo
 * Demonstrates voice processing capabilities
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {useVoice} from './src/hooks/useVoice';
import {MicButton, VoiceFeedback, VoiceCommandDisplay} from './src/components';

const RESPONSES: Record<string, string> = {
  greeting: "Hello! How can I help you today?",
  help: "You can say commands like: hello, help, yes, no, cancel, or repeat.",
  confirm: "Great! I've confirmed that.",
  deny: "Okay, I understand. Let me know if you need anything else.",
  cancel: "Action cancelled. What would you like to do?",
  repeat: "I'm sorry, could you please say that again?",
  unknown: "I didn't understand that. Try saying 'help' to see available commands.",
};

function App(): React.JSX.Element {
  const {
    isListening,
    isSpeaking,
    recognizedText,
    partialText,
    error,
    lastCommand,
    startListening,
    stopListening,
    speak,
    reset,
  } = useVoice();

  // Respond to commands
  useEffect(() => {
    if (lastCommand && recognizedText) {
      const response = RESPONSES[lastCommand.intent] || RESPONSES.unknown;
      speak(response);
    }
  }, [lastCommand, recognizedText, speak]);

  const handleMicPress = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const handleTestTTS = async () => {
    await speak("This is a test of the text to speech system. How does it sound?");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Voice Assistant Demo</Text>
          <Text style={styles.subtitle}>
            Tap the microphone to start voice commands
          </Text>
        </View>

        <View style={styles.micButtonContainer}>
          <MicButton
            isListening={isListening}
            onPress={handleMicPress}
            disabled={isSpeaking}
            size={100}
          />
          <Text style={styles.micLabel}>
            {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
          </Text>
        </View>

        <View style={styles.feedbackSection}>
          <VoiceFeedback
            isListening={isListening}
            partialText={partialText}
            recognizedText={recognizedText}
            error={error}
          />
        </View>

        {lastCommand && (
          <View style={styles.commandSection}>
            <VoiceCommandDisplay command={lastCommand} />
          </View>
        )}

        <View style={styles.actionsSection}>
          <Button title="Test TTS" onPress={handleTestTTS} />
          <View style={styles.spacer} />
          <Button title="Reset" onPress={reset} color="#FF3B30" />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Try saying:</Text>
          <View style={styles.commandsList}>
            {[
              '• "Hello" or "Hi"',
              '• "Help" to see commands',
              '• "Yes" or "No" for confirmation',
              '• "Cancel" to stop',
              '• "Repeat" to hear again',
            ].map((cmd, idx) => (
              <Text key={idx} style={styles.commandItem}>{cmd}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  micButtonContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  micLabel: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  feedbackSection: {
    paddingHorizontal: 20,
  },
  commandSection: {
    paddingHorizontal: 20,
  },
  actionsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  spacer: {
    width: 12,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  commandsList: {
    gap: 8,
  },
  commandItem: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
  },
});

export default App;
