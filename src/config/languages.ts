/**
 * Language configuration for Vietnamese and English voice support
 */

export type SupportedLanguage = 'vi-VN' | 'en-US';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  displayName: string;
  voiceCode: string; // For TTS
  locale: string; // For STT
}

export const LANGUAGES: Record<string, LanguageConfig> = {
  VIETNAMESE: {
    code: 'vi-VN',
    name: 'Vietnamese',
    displayName: 'Tiếng Việt',
    voiceCode: 'vi-VN',
    locale: 'vi_VN',
  },
  ENGLISH: {
    code: 'en-US',
    name: 'English',
    displayName: 'English',
    voiceCode: 'en-US',
    locale: 'en_US',
  },
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'vi-VN';

export const FALLBACK_LANGUAGE: SupportedLanguage = 'en-US';

/**
 * Get language config by code
 */
export const getLanguageConfig = (code: SupportedLanguage): LanguageConfig => {
  return Object.values(LANGUAGES).find(lang => lang.code === code) || LANGUAGES.VIETNAMESE;
};

/**
 * Get all available languages
 */
export const getAvailableLanguages = (): LanguageConfig[] => {
  return Object.values(LANGUAGES);
};
