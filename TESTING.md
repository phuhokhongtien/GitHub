# Vietnamese Voice Support - Testing Guide

This guide provides comprehensive testing instructions for Vietnamese voice features.

## Table of Contents

1. [Testing Prerequisites](#testing-prerequisites)
2. [Manual Testing](#manual-testing)
3. [Automated Testing](#automated-testing)
4. [Testing Checklist](#testing-checklist)
5. [Common Test Scenarios](#common-test-scenarios)

## Testing Prerequisites

### Required Hardware
- **Physical Device**: Voice features must be tested on real devices (not emulators/simulators)
- **Microphone**: Functional microphone for STT testing
- **Speakers**: Working speakers or headphones for TTS testing
- **Internet Connection**: Required for online speech recognition

### Required Software
- React Native development environment set up
- Vietnamese language pack installed on test devices
- Google TTS Engine (Android) or iOS Speech (iOS) updated

### Test Devices Recommended

**iOS:**
- iPhone 8 or newer (iOS 13+)
- iPad Pro (iOS 13+)

**Android:**
- Samsung Galaxy S10 or newer (Android 8.0+)
- Google Pixel 3 or newer (Android 8.0+)

## Manual Testing

### Test 1: Vietnamese Speech Recognition (STT)

**Objective:** Verify Vietnamese speech is correctly recognized

**Steps:**
1. Launch the app
2. Select "Tiếng Việt" (Vietnamese) from language switcher
3. Tap the record button in the Voice Recognition section
4. Speak clearly in Vietnamese: "Xin chào, tôi tên là Nguyễn Văn An"
5. Tap stop button
6. Verify the recognized text appears in the result section

**Expected Result:**
- Recording indicator appears while speaking
- Recognized text matches spoken words (allowing for minor variations)
- Result is displayed in Vietnamese
- No errors or crashes

**Test Cases:**

| Test Case | Input Speech | Expected Output |
|-----------|--------------|-----------------|
| TC1.1 | "Xin chào" | "Xin chào" or "xin chào" |
| TC1.2 | "Hôm nay thời tiết thế nào" | Similar text |
| TC1.3 | "Một hai ba bốn năm" | "1 2 3 4 5" or "Một hai ba bốn năm" |
| TC1.4 | "Tôi muốn đặt hàng" | Similar text |
| TC1.5 | Long sentence (20+ words) | Full sentence captured |

**Pass Criteria:**
- At least 80% of words recognized correctly
- No app crashes
- Results appear within 2 seconds of stopping

### Test 2: English Speech Recognition (STT)

**Objective:** Verify English speech is correctly recognized

**Steps:**
1. Select "English" from language switcher
2. Tap the record button
3. Speak clearly in English: "Hello, my name is John Smith"
4. Tap stop button
5. Verify the recognized text

**Test Cases:**

| Test Case | Input Speech | Expected Output |
|-----------|--------------|-----------------|
| TC2.1 | "Hello" | "Hello" or "hello" |
| TC2.2 | "How are you today" | Similar text |
| TC2.3 | "One two three four five" | "1 2 3 4 5" or text |
| TC2.4 | "I would like to order" | Similar text |

### Test 3: Vietnamese Text-to-Speech (TTS)

**Objective:** Verify Vietnamese text is correctly spoken

**Steps:**
1. Select "Tiếng Việt" from language switcher
2. Navigate to Text-to-Speech section
3. Tap "Dùng văn bản mẫu" to use sample text
4. Tap "Đọc" button
5. Listen to the speech output

**Expected Result:**
- Speech begins within 1 second
- Vietnamese pronunciation is correct
- Speaking button is disabled while speaking
- Stop button appears and works

**Test Cases:**

| Test Case | Input Text | Expected Behavior |
|-----------|------------|-------------------|
| TC3.1 | "Xin chào" | Clear Vietnamese pronunciation |
| TC3.2 | "Hôm nay trời đẹp" | Correct tones |
| TC3.3 | Long text (50+ words) | Complete reading |
| TC3.4 | Text with numbers: "123" | Reads as "một hai ba" |
| TC3.5 | Empty text | Error message, no speech |

### Test 4: English Text-to-Speech (TTS)

**Objective:** Verify English text is correctly spoken

**Steps:**
1. Select "English" from language switcher
2. Enter text: "Hello, this is a test of text to speech"
3. Tap "Speak" button
4. Listen to the speech output

**Expected Result:**
- Clear English pronunciation
- Natural intonation
- Complete sentence spoken

### Test 5: Language Switching

**Objective:** Verify seamless language switching

**Steps:**
1. Start with Vietnamese selected
2. Record a Vietnamese phrase
3. Verify result appears
4. Switch to English
5. Record an English phrase
6. Verify result appears
7. Switch back to Vietnamese
8. Use TTS with Vietnamese text
9. Switch to English
10. Use TTS with English text

**Expected Result:**
- Language switches immediately
- Previous results are cleared (by design)
- STT and TTS work correctly in both languages
- No errors or crashes during switching

### Test 6: Fallback Behavior

**Objective:** Verify fallback to English when Vietnamese is unavailable

**Setup:**
1. Use a device without Vietnamese language pack installed
2. Or temporarily disable Vietnamese TTS

**Steps:**
1. Select "Tiếng Việt"
2. Try to use TTS
3. Observe warning message
4. Verify fallback to English occurs

**Expected Result:**
- Warning message displayed about Vietnamese not being available
- App falls back to English TTS
- Text is still spoken (in English)
- No crashes

### Test 7: Error Handling

**Objective:** Verify proper error handling

**Test Cases:**

| Test Case | Scenario | Expected Behavior |
|-----------|----------|-------------------|
| TC7.1 | Deny microphone permission | Error message displayed |
| TC7.2 | No internet connection | Error message for STT |
| TC7.3 | Very loud background noise | Recognition completes with low accuracy |
| TC7.4 | Extremely quiet speech | Error or no recognition |
| TC7.5 | Cancel during recording | Recording stops, no result |

### Test 8: Edge Cases

**Test Cases:**

| Test Case | Scenario | Expected Behavior |
|-----------|----------|-------------------|
| TC8.1 | Speak in wrong language | Recognition may fail or produce incorrect result |
| TC8.2 | Very fast speech | May reduce accuracy but should work |
| TC8.3 | Very slow speech | Should work correctly |
| TC8.4 | Mix Vietnamese and English | Unpredictable, but no crash |
| TC8.5 | Special characters in TTS | Should handle or skip gracefully |
| TC8.6 | Very long text (1000+ words) | TTS completes or appropriate handling |

## Automated Testing

### Unit Tests Example

Create `__tests__/voiceUtils.test.ts`:

```typescript
import {
  getLanguageConfig,
  getAvailableLanguages,
  LANGUAGES,
} from '../src/config/languages';

describe('Language Configuration', () => {
  test('should return Vietnamese language config', () => {
    const config = getLanguageConfig('vi-VN');
    expect(config.code).toBe('vi-VN');
    expect(config.name).toBe('Vietnamese');
  });

  test('should return English language config', () => {
    const config = getLanguageConfig('en-US');
    expect(config.code).toBe('en-US');
    expect(config.name).toBe('English');
  });

  test('should return all available languages', () => {
    const languages = getAvailableLanguages();
    expect(languages.length).toBe(2);
    expect(languages[0].code).toBe('vi-VN');
    expect(languages[1].code).toBe('en-US');
  });
});
```

### Component Tests Example

Create `__tests__/LanguageSwitcher.test.tsx`:

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LanguageSwitcher } from '../src/components/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  test('should render both language options', () => {
    const { getByText } = render(
      <LanguageSwitcher
        currentLanguage="vi-VN"
        onLanguageChange={jest.fn()}
      />
    );

    expect(getByText('Tiếng Việt')).toBeTruthy();
    expect(getByText('English')).toBeTruthy();
  });

  test('should call onLanguageChange when language is selected', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <LanguageSwitcher
        currentLanguage="vi-VN"
        onLanguageChange={mockOnChange}
      />
    );

    fireEvent.press(getByText('English'));
    expect(mockOnChange).toHaveBeenCalledWith('en-US');
  });

  test('should highlight current language', () => {
    const { getByText } = render(
      <LanguageSwitcher
        currentLanguage="vi-VN"
        onLanguageChange={jest.fn()}
      />
    );

    // Vietnamese button should be active
    const vnButton = getByText('Tiếng Việt').parent;
    // Check for active styling (implementation depends on test setup)
  });
});
```

## Testing Checklist

### Pre-Release Testing Checklist

**Setup:**
- [ ] Vietnamese language pack installed on iOS device
- [ ] Vietnamese TTS data downloaded on Android device
- [ ] Microphone permissions granted
- [ ] Internet connection active

**Vietnamese STT:**
- [ ] Simple phrases recognized correctly
- [ ] Complex sentences recognized
- [ ] Numbers recognized
- [ ] Special Vietnamese characters (ă, â, ê, ô, ơ, ư) handled
- [ ] Tones recognized correctly
- [ ] Background noise handling acceptable

**English STT:**
- [ ] Simple phrases recognized correctly
- [ ] Complex sentences recognized
- [ ] Numbers recognized

**Vietnamese TTS:**
- [ ] Sample text spoken correctly
- [ ] Custom text spoken correctly
- [ ] Pronunciation accurate
- [ ] Tones correct
- [ ] Numbers spoken in Vietnamese
- [ ] Special characters handled

**English TTS:**
- [ ] Sample text spoken correctly
- [ ] Custom text spoken correctly
- [ ] Pronunciation accurate

**UI/UX:**
- [ ] Language switcher works
- [ ] Buttons respond correctly
- [ ] Visual feedback during recording
- [ ] Visual feedback during speech
- [ ] Results display correctly
- [ ] Error messages appear when needed

**Fallback:**
- [ ] Warning shown when Vietnamese unavailable
- [ ] Fallback to English works
- [ ] App continues functioning

**Performance:**
- [ ] STT response time < 2 seconds
- [ ] TTS starts within 1 second
- [ ] No memory leaks during extended use
- [ ] No crashes in any scenario

**Cross-Platform:**
- [ ] All features work on iOS
- [ ] All features work on Android
- [ ] Consistent behavior across platforms

## Common Test Scenarios

### Scenario 1: First-Time User

**User Story:** New user opens app for first time

**Test Steps:**
1. Fresh install of app
2. Grant permissions
3. Try Vietnamese STT
4. Try Vietnamese TTS
5. Switch to English
6. Try English features

**Expected:** Smooth onboarding, all features work

### Scenario 2: Offline User

**User Story:** User tries to use app without internet

**Test Steps:**
1. Disable internet connection
2. Try STT (should fail with appropriate error)
3. Try TTS (should work as it's offline)

**Expected:** Clear error for STT, TTS works

### Scenario 3: User Switches Languages Frequently

**User Story:** Bilingual user switches between languages

**Test Steps:**
1. Use Vietnamese STT
2. Switch to English
3. Use English TTS
4. Switch to Vietnamese
5. Use Vietnamese TTS
6. Repeat 5 times

**Expected:** No crashes, consistent behavior

### Scenario 4: User on Device Without Vietnamese Support

**User Story:** User on old device without Vietnamese

**Test Steps:**
1. Try to use Vietnamese TTS
2. Observe warning
3. Continue using app
4. Verify fallback to English

**Expected:** Warning shown, fallback works, app usable

## Test Reporting

### Bug Report Template

```
**Bug Title:** [Brief description]

**Severity:** Critical / High / Medium / Low

**Platform:** iOS / Android
**Device:** [Model]
**OS Version:** [Version]
**App Version:** [Version]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**


**Actual Result:**


**Screenshots/Logs:**


**Additional Notes:**

```

### Test Results Template

```
**Test Date:** YYYY-MM-DD
**Tester:** [Name]
**Platform:** iOS / Android
**Device:** [Model and OS]

**Test Results:**
- Vietnamese STT: Pass / Fail
- English STT: Pass / Fail
- Vietnamese TTS: Pass / Fail
- English TTS: Pass / Fail
- Language Switching: Pass / Fail
- Fallback Logic: Pass / Fail
- Error Handling: Pass / Fail

**Issues Found:**
1. 
2. 

**Overall Status:** Pass / Fail / Partial

**Notes:**

```

## Performance Benchmarks

### Target Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| STT Response Time | < 2s | Time from stop to result |
| TTS Start Time | < 1s | Time from tap to speech |
| Language Switch Time | < 500ms | Time to switch UI |
| Memory Usage | < 100MB | During active use |
| Battery Impact | < 5% per hour | During continuous use |

## Conclusion

Thorough testing ensures Vietnamese voice features work reliably. Focus on:
1. **Accuracy** - Both languages recognized/spoken correctly
2. **Reliability** - Consistent behavior across scenarios
3. **Performance** - Fast response times
4. **Usability** - Intuitive interface
5. **Robustness** - Graceful error handling

For issues during testing, refer to:
- [SETUP.md](./SETUP.md) for configuration help
- [CONFIGURATION.md](./CONFIGURATION.md) for advanced options
- [README.md](./README.md) for general documentation
