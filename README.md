# GitHub App

A React Native application with TypeScript, featuring Vietnamese language support and modern navigation.

## 📱 Features

- **TypeScript** with strict mode enabled
- **React Navigation** for screen navigation
- **Vietnamese Language Support** (i18n)
- Voice recognition with `@react-native-voice/voice`
- Text-to-speech with `react-native-tts`
- Secure storage with `react-native-keychain`
- Network status monitoring
- Persistent data storage with AsyncStorage

## 🏗️ Project Structure

```
.
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # Business logic and API calls
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions and helpers
│   └── types/           # TypeScript type definitions
├── android/             # Android native code
├── ios/                 # iOS native code
└── __tests__/           # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and JDK

### Installation

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
   cd ios
   pod install
   cd ..
   ```

### Running the App

#### iOS (macOS only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Start Metro Bundler
```bash
npm start
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run app on Android
- `npm run ios` - Run app on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Path aliases are configured for cleaner imports:

- `@components/*` → `src/components/*`
- `@screens/*` → `src/screens/*`
- `@services/*` → `src/services/*`
- `@utils/*` → `src/utils/*`
- `@types/*` → `src/types/*`
- `@contexts/*` → `src/contexts/*`
- `@hooks/*` → `src/hooks/*`

### VS Code Setup

The project includes VS Code configuration for:
- Debugging React Native apps
- ESLint and Prettier integration
- TypeScript IntelliSense
- Recommended extensions

Install recommended extensions when prompted by VS Code.

## 📦 Core Dependencies

### Production Dependencies
- **@react-native-voice/voice** - Voice recognition
- **react-native-tts** - Text-to-speech
- **@react-native-async-storage/async-storage** - Persistent storage
- **@react-navigation/native** - Navigation framework
- **@react-navigation/stack** - Stack navigator
- **@react-native-community/netinfo** - Network status
- **react-native-keychain** - Secure credential storage
- **react-native-gesture-handler** - Touch gesture system
- **react-native-screens** - Native navigation primitives

### Development Dependencies
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 🌐 Vietnamese Language Support

The app includes built-in Vietnamese language support through the i18n utility:

```typescript
import { vi } from '@utils/i18n';

console.log(vi.common.home); // "Trang Chủ"
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🐛 Debugging

### VS Code
1. Open the Debug panel (Cmd/Ctrl + Shift + D)
2. Select a debug configuration:
   - "Run Android" or "Run iOS" to run with debugging
   - "Attach to packager" to attach to a running app
   - "Debug Android" or "Debug iOS" for advanced debugging

### React Native Debugger
The app supports React Native Debugger. Install it separately and it will connect automatically.

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ using React Native
