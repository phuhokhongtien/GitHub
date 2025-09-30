/**
 * VoiceCommandParser Tests
 */

import VoiceCommandParser from '../VoiceCommandParser';

describe('VoiceCommandParser', () => {
  beforeEach(() => {
    VoiceCommandParser.clearCustomPatterns();
  });

  describe('parseCommand', () => {
    it('should parse greeting commands', () => {
      const command = VoiceCommandParser.parseCommand('hello');
      expect(command).not.toBeNull();
      expect(command?.intent).toBe('greeting');
      expect(command?.confidence).toBeGreaterThan(0);
    });

    it('should parse help commands', () => {
      const command = VoiceCommandParser.parseCommand('help');
      expect(command?.intent).toBe('help');
    });

    it('should parse confirmation commands', () => {
      const command = VoiceCommandParser.parseCommand('yes');
      expect(command?.intent).toBe('confirm');
    });

    it('should parse denial commands', () => {
      const command = VoiceCommandParser.parseCommand('no');
      expect(command?.intent).toBe('deny');
    });

    it('should parse cancel commands', () => {
      const command = VoiceCommandParser.parseCommand('cancel');
      expect(command?.intent).toBe('cancel');
    });

    it('should parse repeat commands', () => {
      const command = VoiceCommandParser.parseCommand('repeat');
      expect(command?.intent).toBe('repeat');
    });

    it('should return unknown intent for unrecognized commands', () => {
      const command = VoiceCommandParser.parseCommand('some random text');
      expect(command?.intent).toBe('unknown');
      expect(command?.parameters.rawInput).toBe('some random text');
    });

    it('should be case insensitive', () => {
      const command1 = VoiceCommandParser.parseCommand('HELLO');
      const command2 = VoiceCommandParser.parseCommand('hello');
      expect(command1?.intent).toBe(command2?.intent);
    });

    it('should handle variations of the same intent', () => {
      const commands = ['hi', 'hello', 'hey'];
      commands.forEach(cmd => {
        const command = VoiceCommandParser.parseCommand(cmd);
        expect(command?.intent).toBe('greeting');
      });
    });

    it('should calculate higher confidence for exact matches', () => {
      const exactMatch = VoiceCommandParser.parseCommand('hello');
      const partialMatch = VoiceCommandParser.parseCommand('hello there everyone');
      expect(exactMatch?.confidence).toBeGreaterThan(partialMatch?.confidence || 0);
    });
  });

  describe('registerPattern', () => {
    it('should register custom patterns', () => {
      VoiceCommandParser.registerPattern({
        intent: 'custom',
        patterns: [/test pattern/i],
        handler: () => ({}),
      });

      const command = VoiceCommandParser.parseCommand('test pattern');
      expect(command?.intent).toBe('custom');
    });

    it('should handle patterns with capture groups', () => {
      VoiceCommandParser.registerPattern({
        intent: 'navigate',
        patterns: [/go to (.+)/i],
        handler: (matches) => ({destination: matches[1]}),
      });

      const command = VoiceCommandParser.parseCommand('go to home');
      expect(command?.intent).toBe('navigate');
      expect(command?.parameters.destination).toBe('home');
    });
  });

  describe('getAvailableIntents', () => {
    it('should return all available intents', () => {
      const intents = VoiceCommandParser.getAvailableIntents();
      expect(intents).toContain('greeting');
      expect(intents).toContain('help');
      expect(intents).toContain('confirm');
      expect(intents).toContain('deny');
      expect(intents).toContain('cancel');
      expect(intents).toContain('repeat');
    });

    it('should include custom intents', () => {
      VoiceCommandParser.registerPattern({
        intent: 'custom',
        patterns: [/custom/i],
        handler: () => ({}),
      });

      const intents = VoiceCommandParser.getAvailableIntents();
      expect(intents).toContain('custom');
    });
  });

  describe('clearCustomPatterns', () => {
    it('should remove custom patterns and keep defaults', () => {
      VoiceCommandParser.registerPattern({
        intent: 'custom',
        patterns: [/custom/i],
        handler: () => ({}),
      });

      VoiceCommandParser.clearCustomPatterns();

      const customCommand = VoiceCommandParser.parseCommand('custom');
      expect(customCommand?.intent).toBe('unknown');

      const defaultCommand = VoiceCommandParser.parseCommand('hello');
      expect(defaultCommand?.intent).toBe('greeting');
    });
  });
});
