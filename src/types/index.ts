// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  About: undefined;
};

// Common types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppSettings {
  language: 'vi' | 'en';
  theme: 'light' | 'dark';
  voiceEnabled: boolean;
}
