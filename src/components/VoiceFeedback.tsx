/**
 * VoiceFeedback Component
 * Displays voice recognition feedback and results
 */

import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

interface VoiceFeedbackProps {
  isListening: boolean;
  partialText: string;
  recognizedText: string;
  error: string | null;
}

export const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({
  isListening,
  partialText,
  recognizedText,
  error,
}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isListening || partialText || recognizedText || error) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isListening, partialText, recognizedText, error, fadeAnim]);

  if (!isListening && !partialText && !recognizedText && !error) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {isListening && (
            <View style={styles.listeningContainer}>
              <Text style={styles.listeningIcon}>👂</Text>
              <Text style={styles.listeningText}>Listening...</Text>
            </View>
          )}
          
          {partialText && (
            <View style={styles.partialContainer}>
              <Text style={styles.partialLabel}>Hearing:</Text>
              <Text style={styles.partialText}>{partialText}</Text>
            </View>
          )}
          
          {recognizedText && (
            <View style={styles.recognizedContainer}>
              <Text style={styles.recognizedIcon}>✓</Text>
              <View style={styles.recognizedContent}>
                <Text style={styles.recognizedLabel}>You said:</Text>
                <Text style={styles.recognizedText}>{recognizedText}</Text>
              </View>
            </View>
          )}
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listeningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listeningIcon: {
    fontSize: 24,
  },
  listeningText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  partialContainer: {
    marginTop: 8,
  },
  partialLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  partialText: {
    fontSize: 14,
    color: '#000000',
    fontStyle: 'italic',
  },
  recognizedContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recognizedIcon: {
    fontSize: 20,
    color: '#34C759',
  },
  recognizedContent: {
    flex: 1,
  },
  recognizedLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  recognizedText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  errorIcon: {
    fontSize: 24,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#FF3B30',
  },
});
