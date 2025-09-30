# Vietnamese Voice Support - React Native

A React Native application with comprehensive Vietnamese language support for voice features including Speech-to-Text (STT) and Text-to-Speech (TTS).

## Features

- ✅ **Vietnamese Speech Recognition (STT)** - Convert spoken Vietnamese to text
- ✅ **Vietnamese Text-to-Speech (TTS)** - Convert Vietnamese text to speech
- ✅ **Bilingual Support** - Seamlessly switch between Vietnamese and English
- ✅ **Intelligent Fallback** - Automatic fallback to English when Vietnamese is not available
- ✅ **User-Friendly UI** - Intuitive interface with language switching
- ✅ **Cross-Platform** - Works on both iOS and Android

## Prerequisites

- Node.js >= 16
- React Native development environment setup
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and SDK

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/phuhokhongtien/GitHub.git
   cd GitHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS specific setup**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Android specific setup**
   
   Add permissions to `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.INTERNET" />
   ```

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Voice Features Configuration

### Speech-to-Text (STT)

The app uses `@react-native-voice/voice` for speech recognition:

**Vietnamese Configuration:**
- Language Code: `vi-VN`
- Locale: `vi_VN`
- Engine: Google Speech Recognition

**English Configuration:**
- Language Code: `en-US`
- Locale: `en_US`

### Text-to-Speech (TTS)

The app uses `react-native-tts` for speech synthesis:

**Vietnamese Configuration:**
- Voice Code: `vi-VN`
- Sample Rate: 0.5 (adjustable)
- Pitch: 1.0

**English Configuration:**
- Voice Code: `en-US`

## Usage

### Language Switching

Users can switch between Vietnamese and English using the language switcher at the top of the screen:

```typescript
import { LanguageSwitcher } from './src/components/LanguageSwitcher';

<LanguageSwitcher
  currentLanguage={currentLanguage}
  onLanguageChange={(language) => setCurrentLanguage(language)}
/>
```

### Speech Recognition

Use the VoiceRecorder component to capture speech:

```typescript
import { VoiceRecorder } from './src/components/VoiceRecorder';

<VoiceRecorder
  language="vi-VN"
  onResult={(result) => console.log(result.text)}
/>
```

### Text-to-Speech

Use the TextToSpeech component to convert text to speech:

```typescript
import { TextToSpeech } from './src/components/TextToSpeech';

<TextToSpeech language="vi-VN" />
```

### Direct API Usage

You can also use the voice utilities directly:

```typescript
import {
  startVoiceRecognition,
  stopVoiceRecognition,
  speak,
  stopSpeaking,
} from './src/utils/voiceUtils';

// Start speech recognition
await startVoiceRecognition('vi-VN');

// Stop speech recognition
await stopVoiceRecognition();

// Speak text
await speak('Xin chào', 'vi-VN', 0.5);

// Stop speaking
await stopSpeaking();
```

## Fallback Logic

The application implements intelligent fallback mechanisms:

1. **Language Detection**: Checks if Vietnamese TTS/STT is available on the device
2. **Automatic Fallback**: Falls back to English if Vietnamese is not supported
3. **User Notification**: Alerts users when their preferred language is unavailable
4. **Graceful Degradation**: Continues to function even with limited language support

Example fallback implementation:

```typescript
const voices = await getAvailableVoices('vi-VN');
if (voices.length === 0) {
  // Fallback to English
  await speak(text, 'en-US');
  Alert.alert('Language Not Supported', 'Falling back to English');
}
```

## Project Structure

```
src/
├── components/
│   ├── LanguageSwitcher.tsx    # Language selection component
│   ├── VoiceRecorder.tsx       # Speech-to-text component
│   └── TextToSpeech.tsx        # Text-to-speech component
├── config/
│   └── languages.ts            # Language configurations
├── screens/
│   └── VoiceScreen.tsx         # Main demo screen
└── utils/
    └── voiceUtils.ts           # Voice utility functions
```

## API Reference

### Language Configuration

```typescript
export type SupportedLanguage = 'vi-VN' | 'en-US';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  displayName: string;
  voiceCode: string;
  locale: string;
}
```

### Voice Utilities

#### `initializeVoiceRecognition(onResult, onError)`
Initialize speech recognition with result and error callbacks.

#### `startVoiceRecognition(language, continuous?)`
Start speech recognition for the specified language.

#### `stopVoiceRecognition()`
Stop active speech recognition.

#### `initializeTts()`
Initialize text-to-speech engine.

#### `speak(text, language, rate?)`
Speak the provided text in the specified language.

#### `isTtsLanguageSupported(language)`
Check if TTS is available for the specified language.

## Permissions

### iOS (ios/Info.plist)
```xml
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone for voice recognition</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>We need access to speech recognition for voice features</string>
```

### Android (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

## Testing

The voice features should be tested on physical devices as emulators/simulators may not fully support voice recognition and synthesis.

### Manual Testing Checklist

- [ ] Test Vietnamese speech recognition with various phrases
- [ ] Test English speech recognition
- [ ] Test Vietnamese text-to-speech
- [ ] Test English text-to-speech
- [ ] Test language switching during active recording
- [ ] Test language switching during speech playback
- [ ] Test fallback behavior when Vietnamese is not available
- [ ] Test error handling and user notifications
- [ ] Test on both iOS and Android devices
- [ ] Test with different accents and speaking speeds

### Sample Test Phrases

**Vietnamese:**
- "Xin chào, tôi tên là..."
- "Hôm nay thời tiết thế nào?"
- "Tôi muốn đặt hàng"

**English:**
- "Hello, my name is..."
- "How is the weather today?"
- "I would like to place an order"

## Troubleshooting

### Voice Recognition Not Working

1. Check microphone permissions
2. Ensure device has internet connection (required for Google Speech Recognition)
3. Verify language code is correct
4. Check if Google Speech Recognition is available on device

### Text-to-Speech Not Working

1. Check if TTS engine is installed on device
2. Verify language packs are installed
3. For Vietnamese: Some devices may need additional Vietnamese language pack
4. Try increasing speech rate if speech is too fast/slow

### Vietnamese Not Available

1. Install Vietnamese language pack on device
2. Check system language settings
3. Update Google TTS or device TTS engine
4. Use fallback to English if Vietnamese is not supported

## Dependencies

- `react-native`: ^0.72.0
- `@react-native-voice/voice`: ^3.2.4 - Speech recognition
- `react-native-tts`: ^4.1.0 - Text-to-speech

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review troubleshooting guide

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Acknowledgments

- @react-native-voice/voice for STT capabilities
- react-native-tts for TTS functionality
- React Native community
