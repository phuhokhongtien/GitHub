# Kendy MCP Assistant - Architecture Documentation

## Project Structure

This document outlines the architecture and structure of the Kendy MCP Assistant mobile application.

## Directory Structure

```
.
├── src/                          # Source code directory
│   ├── components/               # Reusable UI components
│   │   ├── Loading.tsx          # Loading indicator component
│   │   └── index.ts             # Component exports
│   ├── context/                 # React Context API for state management
│   │   └── AppContext.tsx       # Global application context and provider
│   ├── locales/                 # Internationalization (i18n) files
│   │   ├── en.json              # English translations
│   │   ├── vi.json              # Vietnamese translations
│   │   └── i18n.ts              # i18n configuration
│   ├── navigation/              # Navigation setup
│   │   └── AppNavigator.tsx     # Main navigation stack
│   ├── screens/                 # Screen components
│   │   ├── HomeScreen.tsx       # Home/welcome screen
│   │   ├── ChatScreen.tsx       # Chat interface screen
│   │   └── SettingsScreen.tsx   # Settings screen
│   ├── services/                # Service modules for external APIs and native features
│   │   ├── voiceService.ts      # Voice recognition service
│   │   └── ttsService.ts        # Text-to-speech service
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # Shared types and interfaces
│   └── utils/                   # Utility functions
│       └── storage.ts           # AsyncStorage wrapper utilities
├── android/                     # Android native code
├── ios/                         # iOS native code
├── __tests__/                   # Test files
├── .vscode/                     # VS Code configuration
│   ├── launch.json              # Debugging configurations
│   ├── settings.json            # Editor settings
│   └── extensions.json          # Recommended extensions
├── App.tsx                      # Main application component
├── index.js                     # Application entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── babel.config.js              # Babel configuration
├── metro.config.js              # Metro bundler configuration
├── jest.config.js               # Jest testing configuration
└── jest.setup.js                # Jest setup and mocks

```

## Core Technologies

### Frontend
- **React Native** 0.81.4 - Mobile app framework
- **TypeScript** 5.8.3 - Static type checking
- **React Navigation** - Navigation library

### State Management
- **Context API** - Global state management using React's built-in Context API

### Internationalization
- **i18next** - i18n framework
- **react-i18next** - React bindings for i18next

### Native Features
- **@react-native-voice/voice** - Voice recognition
- **react-native-tts** - Text-to-speech
- **@react-native-async-storage/async-storage** - Local storage
- **@react-native-community/netinfo** - Network information

### UI & UX
- **react-native-gesture-handler** - Gesture handling
- **react-native-reanimated** - Animations
- **react-native-screens** - Native screen optimization
- **react-native-safe-area-context** - Safe area handling

## Key Components

### AppContext (Context API)

Provides global state management for:
- App settings (language, voice enabled, TTS enabled)
- Methods to update settings

**Usage:**
```typescript
import { useApp } from './src/context/AppContext';

const { settings, updateSettings } = useApp();
```

### Services

#### VoiceService
Handles voice recognition using @react-native-voice/voice:
- Initialize voice recognition
- Start/stop listening
- Handle speech results and errors

#### TTSService
Manages text-to-speech functionality:
- Initialize TTS engine
- Speak text with language support
- Stop speaking
- Set language

### Screens

#### HomeScreen
- Welcome screen with navigation to Chat and Settings
- Uses i18n for localized text

#### ChatScreen
- Chat interface with message history
- Input field for text messages
- Support for user and assistant messages

#### SettingsScreen
- Language toggle (English/Vietnamese)
- Voice input enable/disable
- TTS enable/disable

### Navigation

Uses React Navigation Stack Navigator with three main screens:
- Home
- Chat
- Settings

All screens have consistent styling with blue header (#007AFF).

## TypeScript Configuration

The project uses strict TypeScript mode with the following enabled:
- strict
- strictNullChecks
- strictFunctionTypes
- strictBindCallApply
- strictPropertyInitialization
- noImplicitThis
- noUnusedLocals
- noUnusedParameters
- noImplicitReturns
- noFallthroughCasesInSwitch

Path aliases:
- `@/*` maps to `src/*`

## Testing

- **Jest** - Testing framework
- **react-test-renderer** - Component testing

All major dependencies are mocked in `jest.setup.js` to enable unit testing.

## Build & Development

### Scripts
- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm test` - Run tests
- `npm run type-check` - TypeScript type checking

### Metro Bundler Optimization

Metro is configured with:
- Inline requires
- Experimental import support disabled
- Source extensions: jsx, js, ts, tsx, json

## Native Permissions

### Android (AndroidManifest.xml)
- `INTERNET` - Network access
- `RECORD_AUDIO` - Voice input
- `ACCESS_NETWORK_STATE` - Network state monitoring

### iOS (Info.plist)
- `NSMicrophoneUsageDescription` - Microphone access for voice input
- `NSSpeechRecognitionUsageDescription` - Speech recognition access

## Future Enhancements

Areas for potential expansion:
1. MCP (Model Context Protocol) integration
2. AI/ML model integration
3. Advanced chat features (history, export)
4. Cloud synchronization
5. Push notifications
6. More language support
7. Voice customization options
8. Theme customization (dark mode)
