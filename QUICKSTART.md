# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Metro Bundler
```bash
npm start
```

### 3. Run the App
In a new terminal:

**For iOS (macOS only):**
```bash
# First time only - install CocoaPods dependencies
cd ios && pod install && cd ..

# Run the app
npm run ios
```

**For Android:**
```bash
npm run android
```

## 📂 Project Structure Quick Reference

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen components (HomeScreen, SettingsScreen)
├── navigation/      # Navigation setup (AppNavigator)
├── services/        # Business logic (StorageService)
├── contexts/        # React Context (LanguageContext)
├── hooks/          # Custom hooks (useNetworkStatus)
├── utils/          # Utilities (i18n Vietnamese support)
└── types/          # TypeScript types
```

## 🛠️ Development Commands

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run linter
npm run lint

# Run tests
npm test
```

## 📱 Available Screens

1. **Home Screen** (Trang Chủ)
   - Located at: `src/screens/HomeScreen.tsx`
   - Navigate to Settings button

2. **Settings Screen** (Cài Đặt)
   - Located at: `src/screens/SettingsScreen.tsx`
   - Shows app information
   - Back button to return

## 🌐 Vietnamese Language Support

```typescript
import { vi } from './src/utils/i18n';

// Use Vietnamese strings
console.log(vi.common.home);        // "Trang Chủ"
console.log(vi.common.settings);    // "Cài Đặt"
```

## 🧩 Core Dependencies Available

- **Voice Recognition**: `@react-native-voice/voice`
- **Text-to-Speech**: `react-native-tts`
- **Storage**: `@react-native-async-storage/async-storage`
- **Navigation**: `@react-navigation/native` + `@react-navigation/stack`
- **Network Status**: `@react-native-community/netinfo`
- **Secure Storage**: `react-native-keychain`

## 🔧 Useful TypeScript Paths

Use these aliases in imports:
```typescript
import { Button } from '@components';
import { HomeScreen } from '@screens';
import { StorageService } from '@services';
import { vi } from '@utils';
import { RootStackParamList } from '@types';
import { useLanguage } from '@contexts';
import { useNetworkStatus } from '@hooks';
```

## 🐛 VS Code Debugging

1. Press `Cmd/Ctrl + Shift + D`
2. Select debug configuration:
   - "Run iOS" or "Run Android"
   - "Attach to packager"
3. Press F5 to start debugging

## ✅ Verification

Everything should be working:
- ✅ `npm run lint` - No errors
- ✅ `npm test` - All tests pass
- ✅ TypeScript compilation works
- ✅ Navigation works between screens

## 📚 Next Steps

1. Add more screens to `src/screens/`
2. Create components in `src/components/`
3. Implement services in `src/services/`
4. Write tests in `__tests__/`
5. Add more language strings to `src/utils/i18n.ts`

## 🆘 Troubleshooting

**Metro bundler issues:**
```bash
npm start -- --reset-cache
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
```

**Android build issues:**
```bash
cd android && ./gradlew clean && cd ..
```

For more help, see the main [README.md](README.md)
