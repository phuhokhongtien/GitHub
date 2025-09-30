# Setup Guide

This guide will help you set up the Voice Processing Integration project on your development machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package manager
- **React Native CLI**: `npm install -g react-native-cli`
- **Xcode**: Latest version (for iOS development on macOS)
- **Android Studio**: Latest version (for Android development)
- **CocoaPods**: For iOS dependencies (`sudo gem install cocoapods`)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GitHub
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all the required packages including:
- `react-native`
- `@react-native-voice/voice`
- `react-native-tts`
- `react-native-permissions`

### 3. iOS Setup

#### Install Pods

```bash
cd ios
pod install
cd ..
```

#### Verify Info.plist

The `ios/VoiceApp/Info.plist` file should already contain:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to your microphone for voice commands and speech recognition.</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app needs access to speech recognition to process your voice commands.</string>
```

#### Additional iOS Configuration (if needed)

If you need to link the native modules manually:

```bash
cd ios
pod install --repo-update
cd ..
```

### 4. Android Setup

#### Verify AndroidManifest.xml

The `android/app/src/main/AndroidManifest.xml` should already contain:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

#### Build the Android App

```bash
cd android
./gradlew clean
cd ..
```

### 5. Running the App

#### iOS

```bash
npm run ios
# or for a specific device/simulator
npx react-native run-ios --device "iPhone 14 Pro"
```

#### Android

```bash
npm run android
# or for a specific device
npx react-native run-android --deviceId=<device-id>
```

## Troubleshooting

### Common Issues

#### 1. Pod Install Fails (iOS)

```bash
cd ios
pod deintegrate
pod install --repo-update
cd ..
```

#### 2. Build Fails Due to Missing Dependencies

```bash
rm -rf node_modules
npm install
cd ios && pod install && cd ..
```

#### 3. Android Build Errors

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### 4. Metro Bundler Issues

```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### 5. Permissions Not Working

**iOS:**
1. Reset the app by deleting it from the device
2. Rebuild and reinstall
3. When prompted, allow microphone and speech recognition permissions

**Android:**
1. Go to Settings > Apps > VoiceApp > Permissions
2. Manually grant microphone permission
3. Restart the app

#### 6. Voice Recognition Not Working

**iOS:**
- Ensure you're testing on a real device (simulators may have limited voice support)
- Check that Siri is enabled in Settings
- Verify internet connection (required for speech recognition)

**Android:**
- Ensure Google app is installed and updated
- Check internet connection
- Verify microphone permission is granted

#### 7. TTS Not Working

**iOS:**
- Check device volume
- Ensure device is not on silent mode
- Test with different TTS voices

**Android:**
- Install Google Text-to-Speech engine
- Check system TTS settings
- Verify device volume

### Development Tips

#### Hot Reloading

Press `r` in the Metro terminal or shake the device to open the developer menu and enable "Hot Reloading".

#### Debugging

1. **Chrome DevTools:**
   - Shake device > "Debug"
   - Open Chrome DevTools at `chrome://inspect`

2. **React Native Debugger:**
   ```bash
   npm install -g react-native-debugger
   ```

3. **Flipper:**
   - Download from [https://fbflipper.com/](https://fbflipper.com/)
   - Enable plugins for network, layout, and logs

#### Testing on Real Devices

For best voice recognition results, always test on real devices as simulators/emulators have limited voice capabilities.

**iOS:**
1. Connect iPhone/iPad via USB
2. Trust the computer on the device
3. Select the device in Xcode
4. Run: `npx react-native run-ios --device "Your Device Name"`

**Android:**
1. Enable Developer Options on Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run: `npx react-native run-android`

## Environment Variables

You can configure the following environment variables in a `.env` file (optional):

```bash
# API endpoints for custom voice services
VOICE_API_ENDPOINT=https://your-api.com
VOICE_API_KEY=your-api-key

# Default language
DEFAULT_LANGUAGE=en-US

# TTS settings
DEFAULT_TTS_RATE=0.5
DEFAULT_TTS_PITCH=1.0
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- VoiceCommandParser.test.ts

# Generate coverage report
npm test -- --coverage
```

## Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix

# Format code with Prettier (if script is added)
npx prettier --write "src/**/*.{ts,tsx}"
```

## Building for Production

### iOS

1. Open `ios/VoiceApp.xcworkspace` in Xcode
2. Select "Generic iOS Device" or your connected device
3. Product > Archive
4. Follow Xcode's instructions to distribute

### Android

```bash
cd android
./gradlew assembleRelease
```

The APK will be in `android/app/build/outputs/apk/release/`

## Next Steps

1. Read the [VOICE_DOCUMENTATION.md](./VOICE_DOCUMENTATION.md) for detailed API reference
2. Check [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) for practical examples
3. Customize voice commands for your use case
4. Add your own UI components and styling

## Getting Help

- Check existing GitHub issues
- Review React Native documentation
- Consult library-specific documentation:
  - [@react-native-voice/voice](https://github.com/react-native-voice/voice)
  - [react-native-tts](https://github.com/ak1394/react-native-tts)
  - [react-native-permissions](https://github.com/zoontek/react-native-permissions)

## License

See repository license for details.
