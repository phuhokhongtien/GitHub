import React from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useApp} from '../context/AppContext';
import i18n from '../locales/i18n';

const SettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  const {settings, updateSettings} = useApp();

  const toggleLanguage = () => {
    const newLanguage = settings.language === 'en' ? 'vi' : 'en';
    updateSettings({language: newLanguage});
    i18n.changeLanguage(newLanguage);
  };

  const toggleVoiceInput = (value: boolean) => {
    updateSettings({voiceEnabled: value});
  };

  const toggleTTS = (value: boolean) => {
    updateSettings({ttsEnabled: value});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>{t('language')}</Text>
        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
          <Text style={styles.languageText}>
            {settings.language === 'en' ? 'English' : 'Tiếng Việt'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>{t('voiceInput')}</Text>
        <Switch
          value={settings.voiceEnabled}
          onValueChange={toggleVoiceInput}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>{t('textToSpeech')}</Text>
        <Switch value={settings.ttsEnabled} onValueChange={toggleTTS} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingLabel: {
    fontSize: 16,
  },
  languageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  languageText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SettingsScreen;
