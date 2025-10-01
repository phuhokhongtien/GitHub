# GitHub - React Native Application

A React Native application with TypeScript, featuring Vietnamese language support and a comprehensive folder structure for scalable development.

## 📋 Project Overview

This React Native project is bootstrapped with TypeScript in strict mode, providing a solid foundation for building mobile applications. The application includes navigation, state management, and essential services for a complete mobile app experience.

## 🎯 Features

- ✅ TypeScript with strict mode enabled
- ✅ React Navigation (Stack Navigator)
- ✅ Context API for state management
- ✅ Vietnamese language support
- ✅ Network connectivity monitoring
- ✅ Local storage service
- ✅ VS Code debug configuration
- ✅ Comprehensive folder structure

## 📁 Folder Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   └── index.ts
├── contexts/         # React Context providers
│   ├── AppContext.tsx
│   └── index.ts
├── hooks/            # Custom React hooks
│   ├── useNetworkStatus.ts
│   └── index.ts
├── navigation/       # Navigation configuration
│   ├── RootNavigator.tsx
│   └── index.ts
├── screens/          # Application screens
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── AboutScreen.tsx
│   └── index.ts
├── services/         # Business logic and API services
│   ├── StorageService.ts
│   └── index.ts
├── types/            # TypeScript type definitions
│   └── index.ts
└── utils/            # Utility functions
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

- Node.js >= 20
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install iOS dependencies (macOS only):**

   ```bash
   # Install Ruby dependencies
   bundle install

   # Install CocoaPods dependencies
   cd ios
   bundle exec pod install
   cd ..
   ```

### Running the Application

#### Start Metro Bundler

```bash
npm start
```

#### Run on Android

```bash
npm run android
```

#### Run on iOS (macOS only)

```bash
npm run ios
```

## 🔧 Development

### TypeScript Configuration

The project uses TypeScript in strict mode with the following compiler options:
- `strict`: true
- `noImplicitAny`: true
- `strictNullChecks`: true
- All strict mode checks enabled

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

## 📦 Core Dependencies

### Production Dependencies

- **@react-native-voice/voice** (^3.2.4) - Voice recognition
- **react-native-tts** (^4.1.0) - Text-to-speech
- **@react-native-async-storage/async-storage** (^2.1.0) - Local storage
- **@react-navigation/native** (^7.1.6) - Navigation library
- **@react-navigation/stack** (^7.1.1) - Stack navigation
- **@react-native-community/netinfo** (^11.4.1) - Network info
- **react-native-keychain** (^8.2.0) - Secure storage for credentials
- **react-native-gesture-handler** (^2.21.2) - Gesture handling
- **react-native-screens** (^4.6.0) - Native screen optimization

## 🌍 Vietnamese Language Support

The application includes Vietnamese language support throughout:

- Screen titles are in Vietnamese (Trang Chủ, Cài Đặt, Giới Thiệu)
- Date formatting uses Vietnamese locale
- Default language setting is 'vi'
- Language can be toggled in AppContext

## 🐛 Debugging

### VS Code

The project includes VS Code debug configurations for:
- Debug Android
- Debug iOS
- Attach to packager
- Run on physical devices

Use the Run and Debug panel (Ctrl+Shift+D / Cmd+Shift+D) to start debugging.

### Dev Menu

- **Android**: Shake device or press <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS)
- **iOS**: Shake device or press <kbd>Cmd ⌘</kbd> + <kbd>D</kbd>

## 🔄 Hot Reloading

React Native supports Fast Refresh, which automatically reloads your app when you save changes. To perform a full reload:

- **Android**: Press <kbd>R</kbd> twice or select "Reload" from Dev Menu
- **iOS**: Press <kbd>R</kbd> in iOS Simulator

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Navigation Documentation](https://reactnavigation.org/)

## 🤝 Contributing

When contributing to this project, please:
1. Follow the existing code style
2. Write TypeScript with strict type checking
3. Test on both iOS and Android platforms
4. Update documentation as needed

## 📝 License

This project is private and proprietary.

---

Made with ❤️ using React Native and TypeScript
