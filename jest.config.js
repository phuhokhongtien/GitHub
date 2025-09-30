module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-gesture-handler|@react-navigation|react-native-screens|react-native-safe-area-context|@react-native-voice|react-native-tts|@react-native-async-storage|@react-native-community|react-native-keychain)/)',
  ],
};
