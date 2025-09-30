/**
 * MicButton Component
 * Voice input button with visual feedback
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

interface MicButtonProps {
  isListening: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: number;
}

export const MicButton: React.FC<MicButtonProps> = ({
  isListening,
  onPress,
  disabled = false,
  size = 80,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: size, height: size, borderRadius: size / 2},
        isListening && styles.listening,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <View style={styles.innerCircle}>
        {isListening ? (
          <View style={styles.pulseContainer}>
            <View style={[styles.pulse, styles.pulse1]} />
            <View style={[styles.pulse, styles.pulse2]} />
            <View style={[styles.pulse, styles.pulse3]} />
            <View style={styles.micIcon}>
              <Text style={styles.micText}>🎤</Text>
            </View>
          </View>
        ) : (
          <View style={styles.micIcon}>
            <Text style={styles.micText}>🎤</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  listening: {
    backgroundColor: '#FF3B30',
  },
  disabled: {
    backgroundColor: '#C7C7CC',
    opacity: 0.5,
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#FF3B30',
    opacity: 0,
  },
  pulse1: {
    animation: 'pulse 1.5s infinite',
  },
  pulse2: {
    animation: 'pulse 1.5s infinite 0.5s',
  },
  pulse3: {
    animation: 'pulse 1.5s infinite 1s',
  },
  micIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  micText: {
    fontSize: 32,
  },
});
