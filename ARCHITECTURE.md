# Voice Processing Integration - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Native App                          │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      UI Layer                              │  │
│  │  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐    │  │
│  │  │ MicButton│  │VoiceFeedback │  │VoiceCommandDisplay│    │  │
│  │  └──────────┘  └──────────────┘  └──────────────────┘    │  │
│  │         │              │                    │              │  │
│  └─────────┼──────────────┼────────────────────┼──────────────┘  │
│            │              │                    │                  │
│  ┌─────────▼──────────────▼────────────────────▼──────────────┐  │
│  │                   React Hooks Layer                         │  │
│  │                   ┌──────────────┐                          │  │
│  │                   │  useVoice    │                          │  │
│  │                   └──────────────┘                          │  │
│  │                         │                                   │  │
│  └─────────────────────────┼───────────────────────────────────┘  │
│                            │                                      │
│  ┌─────────────────────────▼───────────────────────────────────┐  │
│  │                   Services Layer                             │  │
│  │  ┌──────────────┐  ┌─────────────────┐  ┌────────────────┐ │  │
│  │  │VoiceService  │  │PermissionManager│  │CommandParser   │ │  │
│  │  └──────────────┘  └─────────────────┘  └────────────────┘ │  │
│  │         │                  │                    │           │  │
│  │  ┌──────▼──────────────────▼────────────────────▼─────────┐│  │
│  │  │           AudioSessionManager                           ││  │
│  │  └─────────────────────────────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            │                                      │
│  ┌─────────────────────────▼───────────────────────────────────┐  │
│  │                Native Modules Layer                          │  │
│  │  ┌──────────────────────┐  ┌──────────────────────────────┐ │  │
│  │  │@react-native-voice   │  │   react-native-tts           │ │  │
│  │  │     /voice           │  │                              │ │  │
│  │  └──────────────────────┘  └──────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                ┌────────────▼──────────────┐
                │    Platform APIs          │
                │  ┌──────────┐ ┌─────────┐│
                │  │   iOS    │ │ Android ││
                │  │Speech Kit│ │Speech   ││
                │  │AVFoundtn │ │RecognSvc││
                │  └──────────┘ └─────────┘│
                └───────────────────────────┘
```

## Component Flow

### Voice Input Flow (STT)

```
User taps MicButton
        │
        ▼
useVoice.startListening()
        │
        ▼
PermissionManager.requestAllPermissions()
        │
        ▼
AudioSessionManager.configureForRecording()
        │
        ▼
VoiceService.startListening()
        │
        ▼
@react-native-voice/voice.start()
        │
        ├─► onSpeechStart ──────► Update UI (listening state)
        │
        ├─► onSpeechPartialResults ──► Display partial text
        │
        ├─► onSpeechResults ────────► Process final text
        │                                      │
        │                                      ▼
        │                         VoiceCommandParser.parseCommand()
        │                                      │
        │                                      ▼
        │                              Extract intent & parameters
        │                                      │
        │                                      ▼
        │                          Update lastCommand in state
        │                                      │
        └─► onSpeechError ──────────────────► Handle error
```

### Voice Output Flow (TTS)

```
useVoice.speak(text)
        │
        ▼
VoiceService.speak()
        │
        ▼
AudioSessionManager.configureForPlayback()
        │
        ▼
react-native-tts.speak()
        │
        ├─► onTtsStart ──────► Update UI (speaking state)
        │
        └─► onTtsFinish ─────► Reset speaking state
```

## Data Flow

### State Management

```
┌─────────────────────────────────────────────────┐
│              useVoice Hook State                 │
├─────────────────────────────────────────────────┤
│ isListening: boolean                            │
│ isSpeaking: boolean                             │
│ recognizedText: string                          │
│ partialText: string                             │
│ error: string | null                            │
│ lastCommand: VoiceCommand | null                │
├─────────────────────────────────────────────────┤
│ Actions:                                        │
│  - startListening()                             │
│  - stopListening()                              │
│  - speak(text)                                  │
│  - stopSpeaking()                               │
│  - reset()                                      │
└─────────────────────────────────────────────────┘
```

### Voice Command Processing

```
Voice Input: "hello there"
        │
        ▼
VoiceCommandParser.parseCommand("hello there")
        │
        ▼
Pattern Matching:
  /^(hello|hi|hey)/i  ✓ Match!
        │
        ▼
Extract Parameters:
  {}  (no parameters for greeting)
        │
        ▼
Calculate Confidence:
  0.85 (partial match)
        │
        ▼
Return VoiceCommand:
{
  intent: "greeting",
  parameters: {},
  confidence: 0.85
}
```

## Permission Flow

### iOS Permission Flow

```
requestAllPermissions()
        │
        ├─► requestMicrophonePermission()
        │          │
        │          ▼
        │   request(PERMISSIONS.IOS.MICROPHONE)
        │          │
        │          ├─► GRANTED ──────┐
        │          └─► DENIED ───────┤
        │                            │
        ├─► requestSpeechRecognitionPermission()
        │          │                 │
        │          ▼                 │
        │   request(PERMISSIONS.IOS.SPEECH_RECOGNITION)
        │          │                 │
        │          ├─► GRANTED ──────┤
        │          └─► DENIED ───────┤
        │                            │
        └────────────────────────────┼─► Return success/failure
```

### Android Permission Flow

```
requestAllPermissions()
        │
        └─► requestMicrophonePermission()
                   │
                   ▼
            PermissionsAndroid.request(RECORD_AUDIO)
                   │
                   ├─► GRANTED ──────► Return true
                   └─► DENIED ───────► Return false
```

## Service Relationships

```
┌──────────────────────────────────────────────────┐
│             VoiceService                         │
│  - Orchestrates STT/TTS                          │
│  - Manages voice state                           │
│  - Coordinates with other services               │
└──────────────────────────────────────────────────┘
                    ▲
                    │
        ┌───────────┼───────────┬───────────┐
        │           │           │           │
        ▼           ▼           ▼           ▼
┌─────────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
│Permission   │ │Audio     │ │Command  │ │React     │
│Manager      │ │Session   │ │Parser   │ │Components│
│             │ │Manager   │ │         │ │          │
│-Check perms │ │-Configure│ │-Parse   │ │-Display  │
│-Request     │ │-Optimize │ │-Detect  │ │-Interact │
│ permissions │ │ audio    │ │ intents │ │          │
└─────────────┘ └──────────┘ └─────────┘ └──────────┘
```

## Error Handling Architecture

```
Error Occurs
        │
        ├─► Permission Denied
        │        │
        │        ├─► Show Alert Dialog
        │        └─► Update error state
        │
        ├─► Speech Recognition Error
        │        │
        │        ├─► Log error
        │        ├─► Update error state
        │        └─► Stop listening
        │
        ├─► TTS Error
        │        │
        │        ├─► Log error
        │        ├─► Update error state
        │        └─► Stop speaking
        │
        └─► Network Error (Android)
                 │
                 ├─► Show error message
                 └─► Suggest checking connection
```

## Platform-Specific Implementations

### iOS
```
Info.plist Permissions
        │
        ├─► NSMicrophoneUsageDescription
        │        │
        │        └─► Requested by PermissionManager
        │
        └─► NSSpeechRecognitionUsageDescription
                 │
                 └─► Requested by PermissionManager
                          │
                          └─► Required for Voice Recognition
```

### Android
```
AndroidManifest.xml Permissions
        │
        ├─► RECORD_AUDIO
        │        │
        │        └─► Requested at runtime
        │                │
        │                └─► Required for STT
        │
        └─► INTERNET
                 │
                 └─► Required for Google Speech API
```

## Module Dependencies

```
App.tsx
  │
  ├─► useVoice (hook)
  │     │
  │     ├─► VoiceService
  │     │     │
  │     │     ├─► @react-native-voice/voice
  │     │     └─► react-native-tts
  │     │
  │     ├─► VoiceCommandParser
  │     │
  │     ├─► AudioSessionManager
  │     │
  │     └─► PermissionManager
  │           │
  │           └─► react-native-permissions
  │
  └─► Components
        │
        ├─► MicButton
        ├─► VoiceFeedback
        └─► VoiceCommandDisplay
```

## Testing Architecture

```
┌────────────────────────────────────┐
│         Jest Test Suite            │
├────────────────────────────────────┤
│  VoiceCommandParser.test.ts        │
│   - Intent detection               │
│   - Pattern matching               │
│   - Confidence scoring             │
│   - Custom patterns                │
│   - Parameter extraction           │
├────────────────────────────────────┤
│  Mock Setup (jest.setup.js)        │
│   - react-native-permissions       │
│   - @react-native-voice/voice      │
│   - react-native-tts               │
│   - PermissionsAndroid             │
└────────────────────────────────────┘
```

This architecture provides a clean separation of concerns, making the codebase maintainable, testable, and extensible.
