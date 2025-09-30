import Tts from 'react-native-tts';

class TTSService {
  async initialize(): Promise<void> {
    try {
      await Tts.setDefaultLanguage('en-US');
      await Tts.setDefaultRate(0.5);
      await Tts.setDefaultPitch(1.0);
    } catch (error) {
      console.error('Error initializing TTS:', error);
    }
  }

  async speak(text: string, language: string = 'en-US'): Promise<void> {
    try {
      await Tts.setDefaultLanguage(language);
      await Tts.speak(text);
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  }

  async stop(): Promise<void> {
    try {
      await Tts.stop();
    } catch (error) {
      console.error('Error stopping TTS:', error);
    }
  }

  async setLanguage(language: string): Promise<void> {
    try {
      await Tts.setDefaultLanguage(language);
    } catch (error) {
      console.error('Error setting TTS language:', error);
    }
  }
}

export default new TTSService();
