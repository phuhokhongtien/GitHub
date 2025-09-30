# Kendy MCP Assistant

A React Native mobile application for Kendy MCP Assistant with voice interaction and Vietnamese language support.

## Features

- 🎙️ Voice input support
- 🔊 Text-to-speech functionality
- 🌍 Multi-language support (English & Vietnamese)
- 💬 Chat interface
- ⚙️ Configurable settings
- 📱 Cross-platform (iOS & Android)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **CocoaPods** (for iOS): `gem install cocoapods`

### For Android Development:
- **Android Studio** with Android SDK
- **Java Development Kit (JDK)** 11 or newer
- Set up `ANDROID_HOME` environment variable

### For iOS Development (macOS only):
- **Xcode** 12 or newer
- **Xcode Command Line Tools**

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phuhokhongtien/GitHub.git
   cd GitHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **In another terminal, run:**
   ```bash
   npm run android
   ```

   Or use the full command:
   ```bash
   npx react-native run-android
   ```

### iOS (macOS only)

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **In another terminal, run:**
   ```bash
   npm run ios
   ```

   Or use the full command:
   ```bash
   npx react-native run-ios
   ```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run type-check` - Run TypeScript type checking
- `npm run start:reset` - Start Metro with cleared cache
- `npm run clean:android` - Clean Android build
- `npm run clean:ios` - Clean iOS build

## Project Structure

```
.
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── locales/          # i18n translation files
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── services/         # Service modules (Voice, TTS, etc.)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── android/              # Android native code
├── ios/                  # iOS native code
├── __tests__/            # Test files
├── App.tsx               # Main application component
├── index.js              # Application entry point
└── package.json          # Dependencies and scripts
```

## Configuration

### TypeScript

The project uses strict TypeScript configuration. See `tsconfig.json` for details.

### Metro Bundler

Metro is configured with optimizations for better performance. See `metro.config.js`.

### Debugging

VS Code debugging configurations are available in `.vscode/launch.json`:

- **Debug Android** - Debug on Android device/emulator
- **Debug iOS** - Debug on iOS simulator/device
- **Attach to packager** - Attach debugger to running Metro bundler

## Language Support

The app supports English and Vietnamese languages. Language files are located in `src/locales/`:

- `en.json` - English translations
- `vi.json` - Vietnamese translations

To switch languages, use the Settings screen in the app.

## Dependencies

### Core Dependencies:
- **react-native** - Core framework
- **@react-navigation** - Navigation library
- **react-native-safe-area-context** - Safe area handling
- **@react-native-voice/voice** - Voice recognition
- **react-native-tts** - Text-to-speech
- **@react-native-async-storage/async-storage** - Local storage
- **@react-native-community/netinfo** - Network info
- **i18next** & **react-i18next** - Internationalization

### Development Dependencies:
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## Troubleshooting

### Android

**Build issues:**
```bash
npm run clean:android
cd android && ./gradlew clean && cd ..
npm run android
```

**Metro bundler cache:**
```bash
npm run start:reset
```

### iOS

**CocoaPods issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Xcode build issues:**
```bash
npm run clean:ios
npm run ios
```

### General

**Clear all caches:**
```bash
watchman watch-del-all
rm -rf node_modules
npm install
npm run start:reset
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, please contact the development team or open an issue in the repository.
