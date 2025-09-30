# Project Structure Overview

## 📁 Complete Directory Structure

```
GitHub/
│
├── 📱 src/                          # Source code
│   ├── components/                  # Reusable UI components
│   │   ├── Button.tsx              # Custom button component
│   │   └── index.ts                # Component exports
│   │
│   ├── screens/                     # Screen components
│   │   ├── HomeScreen.tsx          # Home screen (Trang Chủ)
│   │   ├── SettingsScreen.tsx      # Settings screen (Cài Đặt)
│   │   └── index.ts                # Screen exports
│   │
│   ├── navigation/                  # Navigation configuration
│   │   └── AppNavigator.tsx        # Stack navigator setup
│   │
│   ├── services/                    # Business logic & API
│   │   ├── StorageService.ts       # AsyncStorage wrapper
│   │   └── index.ts                # Service exports
│   │
│   ├── contexts/                    # React contexts
│   │   ├── LanguageContext.tsx     # Language management
│   │   └── index.ts                # Context exports
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useNetworkStatus.ts     # Network monitoring hook
│   │   └── index.ts                # Hook exports
│   │
│   ├── utils/                       # Utility functions
│   │   ├── i18n.ts                 # Vietnamese translations
│   │   └── index.ts                # Utility exports
│   │
│   └── types/                       # TypeScript types
│       ├── navigation.ts           # Navigation types
│       └── index.ts                # Type exports
│
├── 🤖 android/                      # Android native code
│   ├── app/                        # Android app module
│   │   ├── src/main/               # Main source
│   │   └── build.gradle            # App build config
│   ├── gradle/                     # Gradle wrapper
│   └── build.gradle                # Project build config
│
├── 🍎 ios/                          # iOS native code
│   ├── GitHubApp/                  # iOS app
│   │   ├── AppDelegate.swift      # App delegate
│   │   ├── Images.xcassets/       # Image assets
│   │   └── Info.plist             # App configuration
│   ├── GitHubApp.xcodeproj/       # Xcode project
│   └── Podfile                    # CocoaPods dependencies
│
├── 🧪 __tests__/                    # Test files
│   └── App.test.tsx               # App component test
│
├── 🔧 .vscode/                      # VS Code configuration
│   ├── launch.json                # Debug configurations
│   ├── settings.json              # Editor settings
│   └── extensions.json            # Recommended extensions
│
├── 📄 Configuration Files
│   ├── App.tsx                    # Main app component
│   ├── index.js                   # Entry point
│   ├── package.json               # Dependencies & scripts
│   ├── tsconfig.json              # TypeScript config
│   ├── jest.config.js             # Jest config
│   ├── jest.setup.js              # Jest mocks
│   ├── metro.config.js            # Metro bundler config
│   ├── babel.config.js            # Babel config
│   ├── .eslintrc.js               # ESLint config
│   ├── .prettierrc.js             # Prettier config
│   ├── .gitignore                 # Git ignore rules
│   └── .watchmanconfig            # Watchman config
│
└── 📚 Documentation
    ├── README.md                  # Main documentation
    ├── QUICKSTART.md              # Quick start guide
    ├── EXAMPLES.md                # Code examples
    ├── IMPLEMENTATION_SUMMARY.md  # Implementation details
    └── PROJECT_STRUCTURE.md       # This file
```

## 🎯 Key Files & Their Purpose

### Entry Points
- **index.js** - React Native entry point, registers the app
- **App.tsx** - Main app component with navigation setup

### Configuration
- **tsconfig.json** - TypeScript with strict mode + path aliases
- **jest.config.js** - Test configuration with mocks
- **metro.config.js** - Metro bundler configuration
- **.eslintrc.js** - Linting rules and settings

### Source Code Organization
- **src/components/** - Shared UI components (Button, etc.)
- **src/screens/** - Full screen components
- **src/navigation/** - Navigation structure
- **src/services/** - Business logic, API calls
- **src/contexts/** - App-wide state management
- **src/hooks/** - Custom React hooks
- **src/utils/** - Helper functions, i18n
- **src/types/** - TypeScript type definitions

## 🔄 Data Flow

```
index.js
   ↓
App.tsx (with SafeAreaProvider)
   ↓
AppNavigator (Stack Navigator)
   ↓
Screens (HomeScreen, SettingsScreen)
   ↓
Components (Button, etc.)
   ↓
Services/Hooks (StorageService, useNetworkStatus)
```

## 🎨 Component Hierarchy

```
App
└── SafeAreaProvider
    └── AppNavigator (NavigationContainer + Stack)
        ├── HomeScreen
        │   └── Button (navigate to Settings)
        └── SettingsScreen
            └── Button (go back)
```

## 📦 Dependencies Overview

### Core
- **react-native** (0.81.4) - Framework
- **react** (19.1.0) - React library
- **typescript** (5.8.3) - Type safety

### Navigation
- **@react-navigation/native** - Navigation framework
- **@react-navigation/stack** - Stack navigator
- **react-native-screens** - Native screens
- **react-native-gesture-handler** - Touch gestures

### Features
- **@react-native-voice/voice** - Voice recognition
- **react-native-tts** - Text-to-speech
- **@react-native-async-storage** - Local storage
- **@react-native-community/netinfo** - Network status
- **react-native-keychain** - Secure storage

### Development
- **jest** - Testing framework
- **eslint** - Code linting
- **prettier** - Code formatting

## 🌐 Internationalization

All Vietnamese translations in `src/utils/i18n.ts`:
- Common UI strings
- Screen titles
- Error messages

Used via:
```typescript
import { vi } from '@utils';
console.log(vi.common.home); // "Trang Chủ"
```

## 🧪 Testing Structure

```
__tests__/
└── App.test.tsx        # Main app test

jest.config.js          # Test configuration
jest.setup.js           # Mocks for native modules
```

## 🚀 Build Targets

### iOS
- Minimum iOS version: 13.0
- Built with Swift
- CocoaPods for dependencies

### Android
- Minimum SDK: 21 (Android 5.0)
- Target SDK: Latest
- Gradle build system
- Kotlin for native code

## 📝 Path Aliases

Configured in `tsconfig.json`:
```typescript
@components/* → src/components/*
@screens/*    → src/screens/*
@services/*   → src/services/*
@utils/*      → src/utils/*
@types/*      → src/types/*
@contexts/*   → src/contexts/*
@hooks/*      → src/hooks/*
```

## 🔐 Environment Files

- **.gitignore** - Prevents committing sensitive files
- **node_modules/** - Ignored (339MB)
- **ios/Pods/** - Ignored (created on pod install)
- **android/build/** - Ignored (created on build)

## 📊 File Count Summary

- **Source files**: 16 TypeScript files
- **Tests**: 1 test suite
- **Config files**: 10+
- **Documentation**: 4 markdown files
- **Total tracked files**: 76 (excluding node_modules)

---

This structure follows React Native best practices and is ready for scaling to a production application.
