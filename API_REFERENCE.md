# API Reference

Complete API reference for the Voice Processing Integration.

## Table of Contents

- [Hooks](#hooks)
- [Services](#services)
- [Components](#components)
- [Types](#types)

---

## Hooks

### useVoice

The main React hook for voice functionality.

#### Import

```typescript
import {useVoice} from './src/hooks/useVoice';
```

#### Returns

```typescript
interface UseVoiceReturn {
  isListening: boolean;
  isSpeaking: boolean;
  recognizedText: string;
  partialText: string;
  error: string | null;
  lastCommand: VoiceCommand | null;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => Promise<void>;
  reset: () => void;
}
```

#### Properties

- **isListening**: `boolean` - Whether the app is currently listening for voice input
- **isSpeaking**: `boolean` - Whether the app is currently speaking via TTS
- **recognizedText**: `string` - The final recognized text from voice input
- **partialText**: `string` - Partial recognition results (real-time updates)
- **error**: `string | null` - Error message if any error occurred
- **lastCommand**: `VoiceCommand | null` - The last parsed voice command

#### Methods

- **startListening()**: `Promise<void>`
  - Starts voice recognition
  - Requests permissions if needed
  - Stops any ongoing TTS

- **stopListening()**: `Promise<void>`
  - Stops voice recognition
  - Processes final results

- **speak(text: string)**: `Promise<void>`
  - Speaks the given text using TTS
  - Stops any ongoing voice recognition
  - Parameters:
    - `text`: The text to speak

- **stopSpeaking()**: `Promise<void>`
  - Stops any ongoing TTS

- **reset()**: `void`
  - Resets all state values to initial state
  - Clears recognized text, errors, and commands

#### Example

```typescript
const {
  isListening,
  recognizedText,
  startListening,
  speak,
} = useVoice();

// Start listening
await startListening();

// Speak text
await speak('Hello, world!');
```

---

## Services

### VoiceService

Main service for Speech-to-Text and Text-to-Speech.

#### Import

```typescript
import VoiceService from './src/services/VoiceService';
```

#### Methods

##### startListening(handlers?)

Starts voice recognition.

```typescript
startListening(handlers?: VoiceEventHandler): Promise<boolean>
```

**Parameters:**
- `handlers`: Optional event handlers object
  ```typescript
  interface VoiceEventHandler {
    onSpeechStart?: () => void;
    onSpeechEnd?: () => void;
    onSpeechResults?: (e: VoiceResult) => void;
    onSpeechError?: (e: VoiceError) => void;
    onSpeechPartialResults?: (e: VoiceResult) => void;
  }
  ```

**Returns:** `Promise<boolean>` - `true` if started successfully

**Example:**
```typescript
await VoiceService.startListening({
  onSpeechResults: (e) => console.log(e.value),
  onSpeechError: (e) => console.error(e),
});
```

##### stopListening()

Stops voice recognition.

```typescript
stopListening(): Promise<void>
```

##### cancelListening()

Cancels voice recognition without processing results.

```typescript
cancelListening(): Promise<void>
```

##### speak(text, options?)

Speaks text using TTS.

```typescript
speak(text: string, options?: TTSOptions): Promise<void>
```

**Parameters:**
- `text`: The text to speak
- `options`: Optional TTS configuration
  ```typescript
  interface TTSOptions {
    language?: string;  // e.g., 'en-US', 'es-ES'
    pitch?: number;     // 0.5 to 2.0
    rate?: number;      // 0.1 to 2.0
  }
  ```

**Example:**
```typescript
await VoiceService.speak('Hello', {
  language: 'en-US',
  rate: 0.5,
  pitch: 1.0,
});
```

##### getAvailableVoices()

Gets list of available TTS voices.

```typescript
getAvailableVoices(): Promise<any[]>
```

**Returns:** Array of available voice objects

##### setVoice(voiceId)

Sets the TTS voice.

```typescript
setVoice(voiceId: string): Promise<void>
```

---

### PermissionManager

Manages microphone and speech recognition permissions.

#### Import

```typescript
import PermissionManager from './src/services/PermissionManager';
```

#### Methods

##### requestMicrophonePermission()

Requests microphone permission.

```typescript
requestMicrophonePermission(): Promise<boolean>
```

**Returns:** `true` if permission granted

##### requestSpeechRecognitionPermission()

Requests speech recognition permission (iOS only).

```typescript
requestSpeechRecognitionPermission(): Promise<boolean>
```

**Returns:** `true` if permission granted

##### checkPermissions()

Checks current permission status.

```typescript
checkPermissions(): Promise<VoicePermissionStatus>
```

**Returns:**
```typescript
interface VoicePermissionStatus {
  microphone: boolean;
  speechRecognition: boolean;
}
```

##### requestAllPermissions()

Requests all required permissions.

```typescript
requestAllPermissions(): Promise<boolean>
```

**Returns:** `true` if all permissions granted

---

### VoiceCommandParser

Parses voice input and detects intents.

#### Import

```typescript
import VoiceCommandParser from './src/services/VoiceCommandParser';
```

#### Methods

##### parseCommand(input)

Parses voice input and returns command with intent.

```typescript
parseCommand(input: string): VoiceCommand | null
```

**Parameters:**
- `input`: The voice input text

**Returns:**
```typescript
interface VoiceCommand {
  intent: string;
  parameters: Record<string, any>;
  confidence: number;  // 0 to 1
}
```

**Example:**
```typescript
const cmd = VoiceCommandParser.parseCommand('hello there');
console.log(cmd.intent);      // 'greeting'
console.log(cmd.confidence);  // 0.95
```

##### registerPattern(pattern)

Registers a custom command pattern.

```typescript
registerPattern(pattern: CommandPattern): void
```

**Parameters:**
```typescript
interface CommandPattern {
  intent: string;
  patterns: RegExp[];
  handler: (matches: RegExpMatchArray) => Record<string, any>;
}
```

**Example:**
```typescript
VoiceCommandParser.registerPattern({
  intent: 'navigate',
  patterns: [/go to (.+)/i],
  handler: (matches) => ({destination: matches[1]}),
});
```

##### getAvailableIntents()

Gets all registered intents.

```typescript
getAvailableIntents(): string[]
```

**Returns:** Array of intent names

##### clearCustomPatterns()

Clears all custom patterns, keeping defaults.

```typescript
clearCustomPatterns(): void
```

---

### AudioSessionManager

Manages audio session configuration.

#### Import

```typescript
import AudioSessionManager from './src/services/AudioSessionManager';
```

#### Methods

##### configureForRecording()

Configures audio session for voice recording.

```typescript
configureForRecording(): Promise<void>
```

##### configureForPlayback()

Configures audio session for TTS playback.

```typescript
configureForPlayback(): Promise<void>
```

##### deactivate()

Deactivates the audio session.

```typescript
deactivate(): Promise<void>
```

##### optimizeForVoice()

Optimizes audio settings for voice.

```typescript
optimizeForVoice(): Promise<void>
```

---

## Components

### MicButton

Microphone button with visual feedback.

#### Props

```typescript
interface MicButtonProps {
  isListening: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: number;
}
```

- **isListening**: Whether the app is currently listening
- **onPress**: Callback when button is pressed
- **disabled**: Whether button is disabled (default: `false`)
- **size**: Button size in pixels (default: `80`)

#### Example

```typescript
<MicButton
  isListening={isListening}
  onPress={handlePress}
  size={100}
/>
```

---

### VoiceFeedback

Displays voice recognition feedback.

#### Props

```typescript
interface VoiceFeedbackProps {
  isListening: boolean;
  partialText: string;
  recognizedText: string;
  error: string | null;
}
```

#### Example

```typescript
<VoiceFeedback
  isListening={isListening}
  partialText={partialText}
  recognizedText={recognizedText}
  error={error}
/>
```

---

### VoiceCommandDisplay

Displays parsed voice command with intent and confidence.

#### Props

```typescript
interface VoiceCommandDisplayProps {
  command: VoiceCommand | null;
}
```

#### Example

```typescript
<VoiceCommandDisplay command={lastCommand} />
```

---

## Types

### VoiceResult

```typescript
interface VoiceResult {
  value: string[];
}
```

### VoiceError

```typescript
interface VoiceError {
  code?: string;
  message?: string;
}
```

### VoiceCommand

```typescript
interface VoiceCommand {
  intent: string;
  parameters: Record<string, any>;
  confidence: number;
}
```

### TTSOptions

```typescript
interface TTSOptions {
  language?: string;
  pitch?: number;
  rate?: number;
}
```

### VoicePermissionStatus

```typescript
interface VoicePermissionStatus {
  microphone: boolean;
  speechRecognition: boolean;
}
```

---

## Default Intents

The following intents are available by default:

| Intent | Example Phrases |
|--------|----------------|
| `greeting` | "hello", "hi", "hey" |
| `help` | "help", "what can you do" |
| `confirm` | "yes", "okay", "sure" |
| `deny` | "no", "nope" |
| `cancel` | "cancel", "stop" |
| `repeat` | "repeat", "say that again" |
| `unknown` | Any unrecognized input |

---

## Error Handling

All async methods can throw errors. Always use try-catch:

```typescript
try {
  await VoiceService.startListening();
} catch (error) {
  console.error('Voice error:', error);
}
```

Or use the error state from `useVoice`:

```typescript
const {error} = useVoice();

if (error) {
  console.error('Voice error:', error);
}
```

---

## Platform Differences

### iOS
- Requires both microphone and speech recognition permissions
- Better offline support for some languages
- Uses Apple's Speech Framework

### Android
- Requires only microphone permission
- Requires internet for speech recognition
- Uses Google's Speech Recognition API

---

## Best Practices

1. **Always check permissions** before starting voice recognition
2. **Provide visual feedback** during voice operations
3. **Handle errors gracefully** with user-friendly messages
4. **Clean up resources** when components unmount
5. **Test on real devices** for best results
6. **Consider accessibility** and provide text alternatives
7. **Manage audio sessions** properly to avoid conflicts
