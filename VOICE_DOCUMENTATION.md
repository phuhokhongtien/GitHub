# Voice Processing Integration - Documentation

This project implements basic Speech-to-Text (STT) and Text-to-Speech (TTS) features for React Native applications.

## Features

- **Speech-to-Text (STT)**: Voice recognition using @react-native-voice/voice
- **Text-to-Speech (TTS)**: Voice synthesis using react-native-tts
- **Permission Handling**: Robust permission management for iOS and Android
- **Audio Session Management**: Optimized audio configuration
- **Voice Command Parsing**: Intent detection and command parsing
- **UI Components**: Pre-built components for voice interaction
- **Feedback System**: Visual and audio feedback for user interactions

## Installation

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. iOS Setup

```bash
cd ios
pod install
cd ..
```

Make sure the following permissions are added to your `Info.plist`:
- `NSMicrophoneUsageDescription`
- `NSSpeechRecognitionUsageDescription`

These are already configured in `ios/VoiceApp/Info.plist`.

### 3. Android Setup

Permissions are already configured in `android/app/src/main/AndroidManifest.xml`:
- `RECORD_AUDIO`
- `INTERNET`

## Usage

### Basic Voice Recognition

```tsx
import {useVoice} from './src/hooks/useVoice';

function MyComponent() {
  const {
    isListening,
    recognizedText,
    startListening,
    stopListening,
    speak,
  } = useVoice();

  const handleMicPress = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  return (
    <View>
      <Button title="Start" onPress={handleMicPress} />
      <Text>{recognizedText}</Text>
    </View>
  );
}
```

### Using Voice Service Directly

```tsx
import VoiceService from './src/services/VoiceService';

// Start listening
await VoiceService.startListening({
  onSpeechResults: (e) => {
    console.log('Recognized:', e.value);
  },
  onSpeechError: (e) => {
    console.error('Error:', e);
  },
});

// Stop listening
await VoiceService.stopListening();

// Speak text
await VoiceService.speak('Hello, world!');
```

### Voice Command Parsing

```tsx
import VoiceCommandParser from './src/services/VoiceCommandParser';

const command = VoiceCommandParser.parseCommand('hello there');
console.log(command.intent); // 'greeting'
console.log(command.confidence); // 0.95

// Register custom patterns
VoiceCommandParser.registerPattern({
  intent: 'search',
  patterns: [/search for (.+)/i],
  handler: (matches) => ({ query: matches[1] }),
});
```

### Using UI Components

```tsx
import {MicButton, VoiceFeedback, VoiceCommandDisplay} from './src/components';

function App() {
  const {
    isListening,
    recognizedText,
    partialText,
    error,
    lastCommand,
    startListening,
    stopListening,
  } = useVoice();

  return (
    <View>
      <MicButton
        isListening={isListening}
        onPress={async () => {
          isListening ? await stopListening() : await startListening();
        }}
      />
      
      <VoiceFeedback
        isListening={isListening}
        partialText={partialText}
        recognizedText={recognizedText}
        error={error}
      />
      
      <VoiceCommandDisplay command={lastCommand} />
    </View>
  );
}
```

## Components

### MicButton

A microphone button with visual feedback.

**Props:**
- `isListening: boolean` - Whether the app is currently listening
- `onPress: () => void` - Callback when button is pressed
- `disabled?: boolean` - Whether the button is disabled
- `size?: number` - Size of the button (default: 80)

### VoiceFeedback

Displays voice recognition feedback and results.

**Props:**
- `isListening: boolean` - Whether the app is listening
- `partialText: string` - Partial recognition results
- `recognizedText: string` - Final recognized text
- `error: string | null` - Error message if any

### VoiceCommandDisplay

Displays parsed voice command with intent and confidence.

**Props:**
- `command: VoiceCommand | null` - The parsed voice command

## Services

### VoiceService

Main service for STT and TTS functionality.

**Methods:**
- `startListening(handlers?: VoiceEventHandler): Promise<boolean>`
- `stopListening(): Promise<void>`
- `cancelListening(): Promise<void>`
- `speak(text: string, options?: TTSOptions): Promise<void>`
- `stopSpeaking(): Promise<void>`
- `getAvailableVoices(): Promise<any[]>`
- `setVoice(voiceId: string): Promise<void>`

### PermissionManager

Manages microphone and speech recognition permissions.

**Methods:**
- `requestMicrophonePermission(): Promise<boolean>`
- `requestSpeechRecognitionPermission(): Promise<boolean>`
- `checkPermissions(): Promise<VoicePermissionStatus>`
- `requestAllPermissions(): Promise<boolean>`

### VoiceCommandParser

Parses voice commands and detects intents.

**Methods:**
- `parseCommand(input: string): VoiceCommand | null`
- `registerPattern(pattern: CommandPattern): void`
- `getAvailableIntents(): string[]`

### AudioSessionManager

Manages audio session configuration.

**Methods:**
- `configureForRecording(): Promise<void>`
- `configureForPlayback(): Promise<void>`
- `deactivate(): Promise<void>`
- `optimizeForVoice(): Promise<void>`

## Default Voice Commands

The app recognizes the following intents by default:

- **greeting**: "hello", "hi", "hey"
- **help**: "help", "what can you do"
- **confirm**: "yes", "yeah", "okay"
- **deny**: "no", "nope", "not"
- **cancel**: "cancel", "stop", "quit"
- **repeat**: "repeat", "say that again"

## Customization

### Adding Custom Commands

```tsx
import VoiceCommandParser from './src/services/VoiceCommandParser';

VoiceCommandParser.registerPattern({
  intent: 'navigate',
  patterns: [
    /go to (.+)/i,
    /navigate to (.+)/i,
  ],
  handler: (matches) => ({
    destination: matches[1],
  }),
});
```

### Customizing TTS

```tsx
import VoiceService from './src/services/VoiceService';

// Set language
await VoiceService.speak('Bonjour le monde', {
  language: 'fr-FR',
  rate: 0.5,
  pitch: 1.2,
});

// Get available voices
const voices = await VoiceService.getAvailableVoices();

// Set specific voice
await VoiceService.setVoice(voices[0].id);
```

## Error Handling

All services include error handling. Check the `error` state in `useVoice` hook:

```tsx
const {error} = useVoice();

if (error) {
  console.error('Voice error:', error);
  // Handle error appropriately
}
```

## Performance Optimization

1. **Audio Session**: Automatically configured for optimal performance
2. **Permission Caching**: Permissions are checked before each operation
3. **Resource Cleanup**: Always cleanup when component unmounts
4. **Debouncing**: Built-in debouncing for voice events

## Troubleshooting

### iOS Issues

1. **Permissions not working**:
   - Check Info.plist contains usage descriptions
   - Verify app has been granted permissions in Settings

2. **No sound**:
   - Check device is not on silent mode
   - Verify audio session is properly configured

### Android Issues

1. **Permissions denied**:
   - Ensure RECORD_AUDIO permission in AndroidManifest.xml
   - Request permissions at runtime

2. **Speech recognition not working**:
   - Verify Google app is installed and updated
   - Check internet connection (required for recognition)

## Testing

Run the demo app:

```bash
# iOS
npm run ios

# Android
npm run android
```

The demo app (`App.tsx`) showcases all features with a complete UI.

## API Reference

See individual service files for detailed API documentation:
- `src/services/VoiceService.ts`
- `src/services/PermissionManager.ts`
- `src/services/VoiceCommandParser.ts`
- `src/services/AudioSessionManager.ts`

## License

This project is part of the GitHub repository and follows the repository's license.

## Support

For issues or questions, please file an issue on the GitHub repository.
