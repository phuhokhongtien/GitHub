# Voice Processing Integration

A React Native application with comprehensive voice processing capabilities including Speech-to-Text (STT) and Text-to-Speech (TTS).

## Features

✅ **Speech-to-Text (STT)** - Voice recognition using @react-native-voice/voice  
✅ **Text-to-Speech (TTS)** - Voice synthesis using react-native-tts  
✅ **Permission Handling** - Robust permission management for iOS and Android  
✅ **Audio Session Management** - Optimized audio configuration  
✅ **Voice Command Parsing** - Intent detection and command parsing  
✅ **UI Components** - Pre-built components (MicButton, VoiceFeedback, VoiceCommandDisplay)  
✅ **Feedback System** - Visual and audio feedback for user interactions  
✅ **Documentation** - Comprehensive documentation and usage examples  

## Quick Start

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Basic Usage

```tsx
import {useVoice} from './src/hooks/useVoice';
import {MicButton, VoiceFeedback} from './src/components';

function App() {
  const {
    isListening,
    recognizedText,
    startListening,
    stopListening,
  } = useVoice();

  return (
    <View>
      <MicButton
        isListening={isListening}
        onPress={isListening ? stopListening : startListening}
      />
      <Text>{recognizedText}</Text>
    </View>
  );
}
```

## Documentation

📖 **Complete Documentation**
- 🚀 [Setup Guide](./SETUP_GUIDE.md) - Installation and configuration instructions
- 📚 [API Reference](./API_REFERENCE.md) - Detailed API documentation
- 💡 [Usage Examples](./USAGE_EXAMPLES.md) - Practical examples and code snippets
- 🎤 [Voice Documentation](./VOICE_DOCUMENTATION.md) - Voice features guide

## Quick Start

```
├── src/
│   ├── components/          # UI components
│   │   ├── MicButton.tsx
│   │   ├── VoiceFeedback.tsx
│   │   └── VoiceCommandDisplay.tsx
│   ├── hooks/               # React hooks
│   │   └── useVoice.ts
│   ├── services/            # Core services
│   │   ├── VoiceService.ts
│   │   ├── PermissionManager.ts
│   │   ├── VoiceCommandParser.ts
│   │   └── AudioSessionManager.ts
│   └── types/               # TypeScript types
│       └── voice.types.ts
├── android/                 # Android configuration
├── ios/                     # iOS configuration
└── App.tsx                  # Demo application
```

## Supported Voice Commands

The app recognizes the following intents by default:

- **Greeting**: "hello", "hi", "hey"
- **Help**: "help", "what can you do"
- **Confirm**: "yes", "okay", "sure"
- **Deny**: "no", "nope"
- **Cancel**: "cancel", "stop"
- **Repeat**: "repeat", "say that again"

## Permissions

### iOS (Info.plist)
- `NSMicrophoneUsageDescription` - Required for voice recording
- `NSSpeechRecognitionUsageDescription` - Required for speech recognition

### Android (AndroidManifest.xml)
- `RECORD_AUDIO` - Required for voice recording
- `INTERNET` - Required for speech recognition services

All permissions are pre-configured in this project.

## Dependencies

- `react-native`: ^0.76.5
- `@react-native-voice/voice`: ^3.2.4
- `react-native-tts`: ^4.1.0
- `react-native-permissions`: ^4.1.5

## License

This project is part of an outsourcing demonstration.

## Support

For detailed documentation and examples, see:
- [VOICE_DOCUMENTATION.md](./VOICE_DOCUMENTATION.md)
- [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)

