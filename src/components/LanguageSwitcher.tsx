/**
 * Language Switcher Component
 * Allows users to switch between Vietnamese and English
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SupportedLanguage, getAvailableLanguages } from '../config/languages';

interface LanguageSwitcherProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = getAvailableLanguages();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Language / Ngôn ngữ:</Text>
      <View style={styles.buttonsContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              currentLanguage === lang.code && styles.activeButton,
            ]}
            onPress={() => onLanguageChange(lang.code)}
            accessibilityLabel={`Switch to ${lang.name}`}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.buttonText,
                currentLanguage === lang.code && styles.activeButtonText,
              ]}
            >
              {lang.displayName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
});
