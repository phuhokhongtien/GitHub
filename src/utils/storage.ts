import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SETTINGS: '@kendy_settings',
  MESSAGES: '@kendy_messages',
};

export const storage = {
  async saveSettings(settings: any): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(settings),
      );
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  async loadSettings(): Promise<any> {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  },

  async saveMessages(messages: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.MESSAGES,
        JSON.stringify(messages),
      );
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },

  async loadMessages(): Promise<any[]> {
    try {
      const messages = await AsyncStorage.getItem(STORAGE_KEYS.MESSAGES);
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
