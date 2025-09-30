import Voice from '@react-native-voice/voice';

class VoiceService {
  private isListening = false;

  async initialize(): Promise<void> {
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  async startListening(onResult: (text: string) => void): Promise<void> {
    try {
      if (!this.isListening) {
        this.isListening = true;
        Voice.onSpeechResults = (e: any) => {
          if (e.value && e.value[0]) {
            onResult(e.value[0]);
          }
        };
        await Voice.start('en-US');
      }
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      this.isListening = false;
    }
  }

  async stopListening(): Promise<void> {
    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  }

  async destroy(): Promise<void> {
    try {
      await Voice.destroy();
      this.isListening = false;
    } catch (error) {
      console.error('Error destroying voice recognition:', error);
    }
  }

  private onSpeechStart(): void {
    console.log('Speech started');
  }

  private onSpeechEnd(): void {
    console.log('Speech ended');
    this.isListening = false;
  }

  private onSpeechError(e: any): void {
    console.error('Speech error:', e);
    this.isListening = false;
  }

  private onSpeechResults(e: any): void {
    console.log('Speech results:', e);
  }

  getIsListening(): boolean {
    return this.isListening;
  }
}

export default new VoiceService();
