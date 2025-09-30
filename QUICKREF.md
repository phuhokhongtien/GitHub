# Vietnamese Voice Support - Quick Reference

A quick reference guide for common tasks and commands.

## Installation

```bash
npm install
cd ios && pod install && cd ..  # iOS only
```

## Run App

```bash
npm run ios      # iOS
npm run android  # Android
npm start        # Start Metro bundler
```

## Import Components

```typescript
// Import individual components
import { LanguageSwitcher } from './src/components/LanguageSwitcher';
import { VoiceRecorder } from './src/components/VoiceRecorder';
import { TextToSpeech } from './src/components/TextToSpeech';

// Or import from index
import {
  LanguageSwitcher,
  VoiceRecorder,
  TextToSpeech,
  LANGUAGES,
  speak,
  startVoiceRecognition,
} from './src';
```

## Quick Start - STT (Speech-to-Text)

```typescript
import { startVoiceRecognition, stopVoiceRecognition } from './src/utils/voiceUtils';

// Start recording
await startVoiceRecognition('vi-VN');

// Stop recording
await stopVoiceRecognition();
```

## Quick Start - TTS (Text-to-Speech)

```typescript
import { speak, stopSpeaking } from './src/utils/voiceUtils';

// Speak Vietnamese
await speak('Xin chào', 'vi-VN', 0.5);

// Speak English
await speak('Hello', 'en-US', 0.5);

// Stop speaking
await stopSpeaking();
```

## Language Codes

| Language | Code | Display Name |
|----------|------|--------------|
| Vietnamese | vi-VN | Tiếng Việt |
| English (US) | en-US | English |

## Common Patterns

### Pattern 1: Simple Voice Recognition

```typescript
import React, { useEffect, useState } from 'react';
import { initializeVoiceRecognition, startVoiceRecognition } from './src/utils/voiceUtils';

const MyComponent = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    initializeVoiceRecognition(
      (res) => setResult(res.text),
      (err) => console.error(err)
    );
  }, []);

  return <Button onPress={() => startVoiceRecognition('vi-VN')} />;
};
```

### Pattern 2: Simple TTS

```typescript
import React from 'react';
import { speak } from './src/utils/voiceUtils';

const MyComponent = () => {
  const handleSpeak = () => {
    speak('Xin chào', 'vi-VN');
  };

  return <Button onPress={handleSpeak} />;
};
```

### Pattern 3: Language Switcher

```typescript
import React, { useState } from 'react';
import { LanguageSwitcher } from './src/components/LanguageSwitcher';

const MyComponent = () => {
  const [lang, setLang] = useState('vi-VN');

  return (
    <LanguageSwitcher
      currentLanguage={lang}
      onLanguageChange={setLang}
    />
  );
};
```

## Voice Utilities API

### Speech Recognition

```typescript
// Initialize
initializeVoiceRecognition(onResult, onError)

// Start
await startVoiceRecognition(language, continuous?)

// Stop
await stopVoiceRecognition()

// Cancel
await cancelVoiceRecognition()

// Destroy
await destroyVoiceRecognition()

// Check availability
await isVoiceRecognitionAvailable()
```

### Text-to-Speech

```typescript
// Initialize
await initializeTts()

// Speak
await speak(text, language, rate?)

// Stop
await stopSpeaking()

// Get voices
await getAvailableVoices(language?)

// Check support
await isTtsLanguageSupported(language)

// Cleanup
cleanupTts()
```

## Configuration

### TTS Settings

```typescript
import Tts from 'react-native-tts';

await Tts.setDefaultRate(0.5);   // 0.01 - 0.99
await Tts.setDefaultPitch(1.0);  // 0.5 - 2.0
```

### STT Settings

```typescript
import Voice from '@react-native-voice/voice';

await Voice.start('vi-VN', {
  RECOGNIZER_ENGINE: 'GOOGLE',
  EXTRA_PARTIAL_RESULTS: true,
  EXTRA_MAX_RESULTS: 5,
});
```

## Common Vietnamese Phrases

For testing TTS:

```typescript
// Greetings
"Xin chào"                          // Hello
"Chào buổi sáng"                   // Good morning
"Tạm biệt"                         // Goodbye

// Common phrases
"Cảm ơn"                           // Thank you
"Xin lỗi"                          // Sorry
"Không sao"                        // No problem
"Vâng"                             // Yes
"Không"                            // No

// Questions
"Bạn khỏe không?"                  // How are you?
"Tên bạn là gì?"                   // What's your name?
"Bây giờ mấy giờ?"                 // What time is it?

// Numbers
"Một hai ba bốn năm"               // 1 2 3 4 5
```

## Permissions

### iOS (Info.plist)

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Microphone access for voice recognition</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Speech recognition access</string>
```

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

## Error Codes

Common error codes and solutions:

| Code | Meaning | Solution |
|------|---------|----------|
| PERMISSION_DENIED | No microphone permission | Grant permission in settings |
| NETWORK_ERROR | No internet | Check connection |
| NOT_AVAILABLE | Service unavailable | Install language pack |
| TIMEOUT | Recognition timeout | Try again, speak clearer |

## Debugging

### Enable Logs

```typescript
if (__DEV__) {
  console.log('Voice debugging enabled');
}
```

### View Logs

```bash
# iOS
npx react-native log-ios

# Android
npx react-native log-android

# Or use adb
adb logcat | grep -i voice
```

## Testing Commands

```bash
# Run tests
npm test

# Run linter
npm run lint

# Build iOS
cd ios && xcodebuild

# Build Android
cd android && ./gradlew assembleDebug
```

## Troubleshooting Quick Fixes

### Issue: "Voice not recognized"
```bash
# Check internet
ping google.com

# Restart app
# Try speaking slower/clearer
# Check microphone permissions
```

### Issue: "TTS not working"
```bash
# iOS: Download Vietnamese voice in Settings
# Android: Update Google TTS Engine
# Restart device
```

### Issue: "App crashes on voice"
```bash
# Clean build
cd android && ./gradlew clean
cd ios && xcodebuild clean

# Reinstall dependencies
rm -rf node_modules && npm install
```

## Common Component Props

### LanguageSwitcher

```typescript
interface LanguageSwitcherProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}
```

### VoiceRecorder

```typescript
interface VoiceRecorderProps {
  language: SupportedLanguage;
  onResult: (result: VoiceRecognitionResult) => void;
}
```

### TextToSpeech

```typescript
interface TextToSpeechProps {
  language: SupportedLanguage;
}
```

## File Structure

```
src/
├── components/
│   ├── LanguageSwitcher.tsx    # Language selector
│   ├── VoiceRecorder.tsx       # STT component
│   └── TextToSpeech.tsx        # TTS component
├── config/
│   └── languages.ts            # Language configs
├── screens/
│   └── VoiceScreen.tsx         # Demo screen
└── utils/
    └── voiceUtils.ts           # Voice functions
```

## Useful Links

- [Documentation](./README.md)
- [Setup Guide](./SETUP.md)
- [Configuration](./CONFIGURATION.md)
- [Examples](./EXAMPLES.md)
- [Testing Guide](./TESTING.md)

## Dependencies

```json
{
  "@react-native-voice/voice": "^3.2.4",
  "react-native-tts": "^4.1.0",
  "react": "18.2.0",
  "react-native": "0.72.0"
}
```

## Support

- GitHub Issues: Create an issue for bugs
- Documentation: Check README and guides
- Stack Overflow: Tag with `react-native` and `vietnamese-voice`

## License

MIT License - See LICENSE file for details
