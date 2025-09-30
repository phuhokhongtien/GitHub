# Vietnamese Voice Configuration Guide

This document provides detailed configuration options for Vietnamese voice support.

## Language Configuration

### Supported Languages

The application currently supports two languages:

| Language | Code | Display Name | Voice Code | Locale |
|----------|------|--------------|------------|--------|
| Vietnamese | vi-VN | Tiếng Việt | vi-VN | vi_VN |
| English | en-US | English | en-US | en_US |

### Default Settings

```typescript
DEFAULT_LANGUAGE = 'vi-VN'  // Vietnamese is default
FALLBACK_LANGUAGE = 'en-US' // English is fallback
```

### Adding New Languages

To add support for additional languages, edit `src/config/languages.ts`:

```typescript
export const LANGUAGES: Record<string, LanguageConfig> = {
  // ... existing languages
  
  FRENCH: {
    code: 'fr-FR',
    name: 'French',
    displayName: 'Français',
    voiceCode: 'fr-FR',
    locale: 'fr_FR',
  },
};
```

## Voice Recognition (STT) Configuration

### Engine Selection

The app uses Google Speech Recognition by default:

```typescript
await Voice.start(langConfig.code, {
  RECOGNIZER_ENGINE: 'GOOGLE',
});
```

### Advanced STT Options

Available options for voice recognition:

```typescript
await Voice.start(langConfig.code, {
  RECOGNIZER_ENGINE: 'GOOGLE',
  
  // Enable partial results during recognition
  EXTRA_PARTIAL_RESULTS: true,
  
  // Maximum number of recognition results
  EXTRA_MAX_RESULTS: 5,
  
  // Minimum speech length in milliseconds
  EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000,
  
  // Maximum speech length in milliseconds
  EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 2000,
  
  // Enable speech input possibly complete silence length
  EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 2000,
  
  // Language model (free_form or web_search)
  EXTRA_LANGUAGE_MODEL: 'free_form',
});
```

### Continuous Recognition

For continuous speech recognition:

```typescript
const startContinuousRecognition = async (language: SupportedLanguage) => {
  await startVoiceRecognition(language, true);
};
```

### Recognition Language Codes

Ensure proper language codes are used:

| Language | Code | Alternative |
|----------|------|-------------|
| Vietnamese | vi-VN | vi_VN |
| English (US) | en-US | en_US |
| English (UK) | en-GB | en_GB |

## Text-to-Speech (TTS) Configuration

### Voice Engine Settings

Default TTS configuration:

```typescript
await Tts.setDefaultRate(0.5);   // Speech rate (0.01 - 0.99)
await Tts.setDefaultPitch(1.0);  // Pitch (0.5 - 2.0)
await Tts.setDefaultLanguage('vi-VN');
```

### Rate Configuration

Speech rate recommendations:

| Rate | Speed | Use Case |
|------|-------|----------|
| 0.3 | Very Slow | Learning, difficult content |
| 0.5 | Slow | Normal reading, default |
| 0.7 | Medium | Quick reading |
| 0.9 | Fast | Experienced users |

### Pitch Configuration

Pitch recommendations:

| Pitch | Tone | Use Case |
|-------|------|----------|
| 0.5 | Very Low | Masculine voice |
| 1.0 | Normal | Default, natural |
| 1.5 | Higher | Feminine voice |
| 2.0 | Very High | Child voice, emphasis |

### Voice Selection

To use a specific voice:

```typescript
const voices = await Tts.voices();
const vietnameseVoices = voices.filter(v => v.language === 'vi-VN');

if (vietnameseVoices.length > 0) {
  // Use first Vietnamese voice
  await Tts.setDefaultVoice(vietnameseVoices[0].id);
}
```

### Custom Voice Settings Per Language

```typescript
const speakWithCustomSettings = async (
  text: string,
  language: SupportedLanguage
) => {
  if (language === 'vi-VN') {
    await Tts.setDefaultRate(0.4);  // Slower for Vietnamese
    await Tts.setDefaultPitch(1.1); // Slightly higher pitch
  } else {
    await Tts.setDefaultRate(0.5);  // Normal for English
    await Tts.setDefaultPitch(1.0); // Normal pitch
  }
  
  await speak(text, language);
};
```

## Fallback Behavior

### Automatic Language Fallback

The app automatically falls back to English when Vietnamese is not available:

```typescript
// In voiceUtils.ts
const languageVoices = voices.filter(v => 
  v.language === langConfig.code || 
  v.language.startsWith(langConfig.code.split('-')[0])
);

if (languageVoices.length > 0) {
  await Tts.setDefaultLanguage(langConfig.code);
} else {
  // Fallback to English
  await Tts.setDefaultLanguage(FALLBACK_LANGUAGE);
}
```

### Custom Fallback Logic

Implement custom fallback:

```typescript
const speakWithFallback = async (
  text: string,
  preferredLanguage: SupportedLanguage,
  fallbackLanguage: SupportedLanguage
) => {
  try {
    const supported = await isTtsLanguageSupported(preferredLanguage);
    
    if (supported) {
      await speak(text, preferredLanguage);
    } else {
      console.warn(`Falling back from ${preferredLanguage} to ${fallbackLanguage}`);
      await speak(text, fallbackLanguage);
    }
  } catch (error) {
    console.error('Speech error:', error);
  }
};
```

## Event Handling

### TTS Events

Available TTS events:

```typescript
// Speech started
Tts.addEventListener('tts-start', (event) => {
  console.log('TTS started:', event);
});

// Speech finished
Tts.addEventListener('tts-finish', (event) => {
  console.log('TTS finished:', event);
});

// Speech cancelled
Tts.addEventListener('tts-cancel', (event) => {
  console.log('TTS cancelled:', event);
});

// Speech progress (Android only)
Tts.addEventListener('tts-progress', (event) => {
  console.log('TTS progress:', event);
});
```

### Voice Recognition Events

Voice recognition provides several events:

```typescript
Voice.onSpeechStart = (e) => {
  console.log('Speech started');
};

Voice.onSpeechRecognized = (e) => {
  console.log('Speech recognized');
};

Voice.onSpeechEnd = (e) => {
  console.log('Speech ended');
};

Voice.onSpeechResults = (e) => {
  console.log('Results:', e.value);
};

Voice.onSpeechPartialResults = (e) => {
  console.log('Partial results:', e.value);
};

Voice.onSpeechError = (e) => {
  console.error('Error:', e.error);
};

Voice.onSpeechVolumeChanged = (e) => {
  console.log('Volume:', e.value);
};
```

## Performance Optimization

### Pre-initialization

Pre-initialize voice services on app startup:

```typescript
// In App.tsx
useEffect(() => {
  const initVoiceServices = async () => {
    await initializeTts();
    await isVoiceRecognitionAvailable();
  };
  
  initVoiceServices();
}, []);
```

### Debouncing Speech Input

Prevent rapid successive voice commands:

```typescript
import { debounce } from 'lodash';

const debouncedSpeak = debounce(
  (text: string, language: SupportedLanguage) => {
    speak(text, language);
  },
  1000,  // Wait 1 second
  { leading: true, trailing: false }
);
```

### Memory Management

Clean up resources when component unmounts:

```typescript
useEffect(() => {
  return () => {
    destroyVoiceRecognition();
    cleanupTts();
  };
}, []);
```

## Platform-Specific Configuration

### iOS Specific

#### Info.plist Requirements

```xml
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone for voice recognition</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>We need access to speech recognition</string>
```

#### Vietnamese Voice Quality

iOS provides high-quality Vietnamese voices:
- Enhanced voices (download required)
- Compact voices (pre-installed)

### Android Specific

#### Manifest Permissions

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

#### Google TTS Engine

Ensure Google TTS Engine is installed and updated for best Vietnamese support.

## Localization

### UI Text Localization

Example localization in components:

```typescript
const getLocalizedText = (language: SupportedLanguage) => {
  const texts = {
    'vi-VN': {
      record: 'Ghi âm',
      stop: 'Dừng',
      speak: 'Đọc',
      cancel: 'Hủy',
    },
    'en-US': {
      record: 'Record',
      stop: 'Stop',
      speak: 'Speak',
      cancel: 'Cancel',
    },
  };
  
  return texts[language];
};
```

### Error Messages

Localized error messages:

```typescript
const getErrorMessage = (code: string, language: SupportedLanguage) => {
  const messages = {
    'vi-VN': {
      'PERMISSION_DENIED': 'Quyền truy cập bị từ chối',
      'NETWORK_ERROR': 'Lỗi mạng',
      'NOT_AVAILABLE': 'Không khả dụng',
    },
    'en-US': {
      'PERMISSION_DENIED': 'Permission denied',
      'NETWORK_ERROR': 'Network error',
      'NOT_AVAILABLE': 'Not available',
    },
  };
  
  return messages[language][code] || 'Unknown error';
};
```

## Security Considerations

### Permission Handling

Always request permissions before using voice features:

```typescript
import { PermissionsAndroid, Platform } from 'react-native';

const requestMicrophonePermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'App needs access to your microphone',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};
```

### Privacy

- Voice data is processed by Google Speech Services (requires internet)
- No voice data is stored by the app
- Users should be informed about data processing
- Consider offline speech recognition for sensitive data

## Troubleshooting Configuration Issues

### Issue: Language Not Recognized

**Check:**
1. Language code format (use 'vi-VN' not 'vi')
2. Language pack installation on device
3. Internet connectivity for online recognition

### Issue: Poor Voice Quality

**Solutions:**
1. Increase TTS rate: `await Tts.setDefaultRate(0.3)`
2. Adjust pitch: `await Tts.setDefaultPitch(1.2)`
3. Use enhanced voices (iOS) or high-quality voices (Android)

### Issue: Recognition Timeouts

**Solutions:**
1. Increase timeout settings
2. Improve network connection
3. Use local recognition (if available)

## Best Practices

1. **Always provide fallback language**
   - Don't assume Vietnamese is always available
   - Gracefully degrade to English

2. **Test on real devices**
   - Simulators/emulators have limited voice support
   - Test on multiple device models

3. **Handle permissions properly**
   - Request permissions before using features
   - Provide clear explanations

4. **Optimize for performance**
   - Pre-initialize services
   - Clean up resources
   - Use debouncing

5. **Provide user feedback**
   - Show when recording
   - Display recognition results
   - Indicate errors clearly

## Resources

- [Voice Recognition API](https://github.com/react-native-voice/voice)
- [TTS API](https://github.com/ak1394/react-native-tts)
- [Vietnamese Language Support](https://support.google.com/accessibility/android/answer/6006983)
