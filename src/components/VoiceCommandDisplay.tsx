/**
 * VoiceCommandDisplay Component
 * Displays parsed voice command and intent
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {VoiceCommand} from '../types/voice.types';

interface VoiceCommandDisplayProps {
  command: VoiceCommand | null;
}

export const VoiceCommandDisplay: React.FC<VoiceCommandDisplayProps> = ({
  command,
}) => {
  if (!command) {
    return null;
  }

  const getIntentColor = (intent: string): string => {
    switch (intent) {
      case 'greeting':
        return '#34C759';
      case 'help':
        return '#007AFF';
      case 'confirm':
        return '#34C759';
      case 'deny':
        return '#FF3B30';
      case 'cancel':
        return '#FF9500';
      case 'unknown':
        return '#8E8E93';
      default:
        return '#5856D6';
    }
  };

  const getIntentEmoji = (intent: string): string => {
    switch (intent) {
      case 'greeting':
        return '👋';
      case 'help':
        return '❓';
      case 'confirm':
        return '✅';
      case 'deny':
        return '❌';
      case 'cancel':
        return '🛑';
      case 'repeat':
        return '🔁';
      case 'unknown':
        return '❓';
      default:
        return '💬';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Command Detected</Text>
      
      <View style={styles.intentContainer}>
        <Text style={styles.emoji}>{getIntentEmoji(command.intent)}</Text>
        <View style={styles.intentInfo}>
          <Text style={styles.intentLabel}>Intent:</Text>
          <Text style={[styles.intentText, {color: getIntentColor(command.intent)}]}>
            {command.intent}
          </Text>
        </View>
      </View>

      <View style={styles.confidenceContainer}>
        <Text style={styles.confidenceLabel}>Confidence:</Text>
        <View style={styles.confidenceBarContainer}>
          <View
            style={[
              styles.confidenceBar,
              {
                width: `${command.confidence * 100}%`,
                backgroundColor: command.confidence > 0.7 ? '#34C759' : '#FF9500',
              },
            ]}
          />
        </View>
        <Text style={styles.confidenceText}>
          {Math.round(command.confidence * 100)}%
        </Text>
      </View>

      {Object.keys(command.parameters).length > 0 && (
        <View style={styles.parametersContainer}>
          <Text style={styles.parametersLabel}>Parameters:</Text>
          {Object.entries(command.parameters).map(([key, value]) => (
            <View key={key} style={styles.parameterRow}>
              <Text style={styles.parameterKey}>{key}:</Text>
              <Text style={styles.parameterValue}>{String(value)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  intentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 28,
  },
  intentInfo: {
    flex: 1,
  },
  intentLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  intentText: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  confidenceContainer: {
    marginBottom: 12,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 6,
  },
  confidenceBarContainer: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  confidenceBar: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
  },
  parametersContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
  },
  parametersLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  parameterRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  parameterKey: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
    marginRight: 8,
  },
  parameterValue: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
