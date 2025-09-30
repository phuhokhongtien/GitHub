export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface AppSettings {
  language: 'en' | 'vi';
  voiceEnabled: boolean;
  ttsEnabled: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Settings: undefined;
};
