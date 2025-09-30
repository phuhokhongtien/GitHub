# Vietnamese Voice Support - Setup Guide

This guide provides step-by-step instructions for setting up and configuring Vietnamese voice support in the application.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [iOS Configuration](#ios-configuration)
3. [Android Configuration](#android-configuration)
4. [Testing Voice Features](#testing-voice-features)
5. [Common Issues](#common-issues)

## Initial Setup

### 1. Install Node Dependencies

```bash
npm install
```

This will install:
- `@react-native-voice/voice` - For speech-to-text functionality
- `react-native-tts` - For text-to-speech functionality

### 2. Link Native Dependencies (React Native < 0.60)

For older React Native versions:
```bash
react-native link @react-native-voice/voice
react-native link react-native-tts
```

For React Native >= 0.60, dependencies are auto-linked.

## iOS Configuration

### 1. Install CocoaPods

```bash
cd ios
pod install
cd ..
```

### 2. Update Info.plist

Add the following permissions to `ios/YourApp/Info.plist`:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to your microphone for voice recognition</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>This app needs access to speech recognition for converting speech to text</string>
```

### 3. Build and Run

```bash
npm run ios
```

Or open `ios/YourApp.xcworkspace` in Xcode and run from there.

### 4. Vietnamese Language Pack (iOS)

Vietnamese TTS is built into iOS 13+. To ensure it's available:

1. Go to Settings > General > Language & Region
2. Add Vietnamese to your preferred languages
3. Go to Settings > Accessibility > Spoken Content
4. Tap on Voices > Vietnamese
5. Download the Vietnamese voice pack

## Android Configuration

### 1. Update AndroidManifest.xml

Add permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- Add these permissions -->
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.INTERNET" />
    
    <application>
        ...
    </application>
</manifest>
```

### 2. Update build.gradle (if needed)

Ensure you have the correct minSdkVersion in `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
    }
}
```

### 3. ProGuard Configuration (Release builds)

If using ProGuard, add to `android/app/proguard-rules.pro`:

```
-keep class com.wenkesj.voice.** { *; }
-keep class net.jhooker.** { *; }
```

### 4. Build and Run

```bash
npm run android
```

### 5. Vietnamese Language Pack (Android)

To enable Vietnamese TTS on Android:

1. Open Settings > System > Languages & input
2. Tap on "Text-to-speech output"
3. Tap on the settings icon next to "Google Text-to-speech Engine"
4. Tap on "Install voice data"
5. Download the Vietnamese voice pack

**Alternative Method:**
1. Open Google Play Store
2. Search for "Google Text-to-speech Engine"
3. Tap "Install" or "Update"
4. Open the app and download Vietnamese voice data

## Testing Voice Features

### Pre-flight Checklist

Before testing, ensure:
- [ ] Physical device is connected (not emulator/simulator)
- [ ] Microphone permissions are granted
- [ ] Internet connection is available
- [ ] Vietnamese language pack is installed (for TTS)

### Testing Speech-to-Text (STT)

1. Launch the app
2. Select "Tiếng Việt" (Vietnamese) language
3. Tap the record button
4. Speak clearly in Vietnamese: "Xin chào, tôi tên là..."
5. Tap stop
6. Verify the recognized text appears correctly

**Test Phrases:**
- "Xin chào" (Hello)
- "Hôm nay trời đẹp" (Nice weather today)
- "Một hai ba bốn năm" (One two three four five)

### Testing Text-to-Speech (TTS)

1. Select "Tiếng Việt" (Vietnamese) language
2. Enter text: "Xin chào, đây là ví dụ về chuyển văn bản thành giọng nói tiếng Việt"
3. Tap "Đọc" (Speak) button
4. Listen to the Vietnamese speech output
5. Verify pronunciation and intonation

**Or use the sample text button:**
- Tap "Dùng văn bản mẫu" (Use Sample Text)
- Tap "Đọc" (Speak)

### Testing Language Switching

1. Start with Vietnamese selected
2. Record a Vietnamese phrase
3. Switch to English
4. Record an English phrase
5. Verify both languages work independently
6. Test TTS in both languages

### Testing Fallback Behavior

**If Vietnamese is not available:**
1. The app should display a warning message
2. TTS should fall back to English
3. App should continue to function normally

## Common Issues

### Issue: "Microphone Permission Denied"

**Solution:**
- **iOS:** Go to Settings > Privacy > Microphone > YourApp > Enable
- **Android:** Go to Settings > Apps > YourApp > Permissions > Microphone > Allow

### Issue: "Speech Recognition Not Available"

**Solution:**
1. Ensure you're using a physical device (not simulator)
2. Check internet connection
3. Verify Google Speech Services is installed (Android)
4. Restart the app

### Issue: "Vietnamese Voice Not Found"

**Solution:**
- **iOS:**
  1. Settings > Accessibility > Spoken Content > Voices
  2. Download Vietnamese voice pack
  
- **Android:**
  1. Update Google Text-to-speech Engine
  2. Download Vietnamese voice data
  3. Set as default TTS engine

### Issue: "Recognition Stops Immediately"

**Solution:**
1. Check microphone permissions
2. Ensure no other app is using microphone
3. Restart device
4. Clear app cache (Android)

### Issue: "Poor Recognition Accuracy"

**Solution:**
1. Speak clearly and slowly
2. Reduce background noise
3. Hold device closer to mouth (but not too close)
4. Check microphone is not blocked
5. Try different recording environments

### Issue: "TTS Speaks Wrong Language"

**Solution:**
1. Verify correct language is selected in app
2. Check device language settings
3. Clear TTS cache: Settings > Apps > Google Text-to-speech > Clear Cache
4. Restart app

## Advanced Configuration

### Custom Voice Recognition Settings

You can customize voice recognition in `src/utils/voiceUtils.ts`:

```typescript
await Voice.start(langConfig.code, {
  RECOGNIZER_ENGINE: 'GOOGLE',
  EXTRA_PARTIAL_RESULTS: true,
  EXTRA_MAX_RESULTS: 5,
  EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000,
});
```

### Custom TTS Settings

Adjust TTS parameters in your components:

```typescript
await Tts.setDefaultRate(0.5);  // 0.01 to 0.99, slower to faster
await Tts.setDefaultPitch(1.0); // 0.5 to 2.0, lower to higher pitch
```

### Adding More Languages

To add support for additional languages:

1. Update `src/config/languages.ts`:
   ```typescript
   THAI: {
     code: 'th-TH',
     name: 'Thai',
     displayName: 'ภาษาไทย',
     voiceCode: 'th-TH',
     locale: 'th_TH',
   },
   ```

2. Update the `SupportedLanguage` type
3. Install language packs on devices
4. Test thoroughly

## Performance Optimization

### Reducing Recognition Latency

1. Use Google's online recognition (requires internet)
2. Optimize network connection
3. Pre-initialize Voice in app startup

### Improving TTS Performance

1. Preload common phrases
2. Use local TTS voices instead of network-based
3. Cache synthesized speech for repeated phrases

## Debugging

### Enable Debug Logging

Add to your app's entry point:

```typescript
if (__DEV__) {
  console.log('Voice debugging enabled');
}
```

### Common Debug Commands

```bash
# iOS: View console logs
npx react-native log-ios

# Android: View logcat
npx react-native log-android

# Or use adb directly
adb logcat | grep -i "voice\|tts\|speech"
```

## Next Steps

After successful setup:

1. ✅ Customize UI to match your app design
2. ✅ Implement user preferences for voice settings
3. ✅ Add analytics to track voice feature usage
4. ✅ Consider offline speech recognition for better privacy
5. ✅ Implement voice commands for app navigation

## Support

If you encounter issues not covered here:
1. Check the main README.md
2. Review the troubleshooting section
3. Create an issue on GitHub with:
   - Device model and OS version
   - React Native version
   - Error messages and logs
   - Steps to reproduce

## Resources

- [React Native Voice Documentation](https://github.com/react-native-voice/voice)
- [React Native TTS Documentation](https://github.com/ak1394/react-native-tts)
- [Google Speech Recognition](https://cloud.google.com/speech-to-text)
- [iOS Speech Framework](https://developer.apple.com/documentation/speech)
