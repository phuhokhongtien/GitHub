/**
 * Voice Command Parser
 * Parses voice input and detects intents
 */

import type {VoiceCommand} from '../types/voice.types';

interface CommandPattern {
  intent: string;
  patterns: RegExp[];
  handler: (matches: RegExpMatchArray) => Record<string, any>;
}

class VoiceCommandParser {
  private commandPatterns: CommandPattern[] = [];

  constructor() {
    this.initializeDefaultPatterns();
  }

  /**
   * Initialize default command patterns
   */
  private initializeDefaultPatterns() {
    // Greeting patterns
    this.registerPattern({
      intent: 'greeting',
      patterns: [
        /^(hello|hi|hey|greetings)/i,
        /^good (morning|afternoon|evening)/i,
      ],
      handler: () => ({}),
    });

    // Help patterns
    this.registerPattern({
      intent: 'help',
      patterns: [
        /^help/i,
        /^what can (you|I) do/i,
        /^show me commands/i,
      ],
      handler: () => ({}),
    });

    // Confirmation patterns
    this.registerPattern({
      intent: 'confirm',
      patterns: [
        /^(yes|yeah|yep|sure|okay|ok|correct|right)/i,
      ],
      handler: () => ({}),
    });

    // Denial patterns
    this.registerPattern({
      intent: 'deny',
      patterns: [
        /^(no|nope|not|never|negative)/i,
      ],
      handler: () => ({}),
    });

    // Cancel patterns
    this.registerPattern({
      intent: 'cancel',
      patterns: [
        /^(cancel|stop|abort|exit|quit)/i,
      ],
      handler: () => ({}),
    });

    // Repeat patterns
    this.registerPattern({
      intent: 'repeat',
      patterns: [
        /^(repeat|say that again|what did you say)/i,
      ],
      handler: () => ({}),
    });
  }

  /**
   * Register a new command pattern
   */
  registerPattern(pattern: CommandPattern) {
    this.commandPatterns.push(pattern);
  }

  /**
   * Parse voice input and return command with intent
   */
  parseCommand(input: string): VoiceCommand | null {
    const normalizedInput = input.trim();

    // Try to match against all patterns
    for (const commandPattern of this.commandPatterns) {
      for (const pattern of commandPattern.patterns) {
        const matches = normalizedInput.match(pattern);
        if (matches) {
          return {
            intent: commandPattern.intent,
            parameters: commandPattern.handler(matches),
            confidence: this.calculateConfidence(normalizedInput, pattern),
          };
        }
      }
    }

    // If no pattern matches, return unknown intent
    return {
      intent: 'unknown',
      parameters: {rawInput: normalizedInput},
      confidence: 0,
    };
  }

  /**
   * Calculate confidence score based on match quality
   */
  private calculateConfidence(input: string, pattern: RegExp): number {
    const matches = input.match(pattern);
    if (!matches) return 0;

    // Base confidence
    let confidence = 0.7;

    // Increase confidence if the match is the entire input
    if (matches[0].length === input.length) {
      confidence = 0.95;
    } else if (matches[0].length > input.length * 0.8) {
      confidence = 0.85;
    }

    return confidence;
  }

  /**
   * Get all registered intents
   */
  getAvailableIntents(): string[] {
    return Array.from(new Set(this.commandPatterns.map(p => p.intent)));
  }

  /**
   * Clear all custom patterns
   */
  clearCustomPatterns() {
    this.commandPatterns = [];
    this.initializeDefaultPatterns();
  }
}

export default new VoiceCommandParser();
