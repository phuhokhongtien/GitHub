# Voice Processing - Usage Examples

This file contains practical examples for using the voice processing features.

## Example 1: Simple Voice Command App

```tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useVoice} from './src/hooks/useVoice';
import {MicButton, VoiceFeedback} from './src/components';

export default function SimpleVoiceApp() {
  const {
    isListening,
    recognizedText,
    partialText,
    error,
    startListening,
    stopListening,
  } = useVoice();

  const handleToggle = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Command</Text>
      
      <MicButton
        isListening={isListening}
        onPress={handleToggle}
      />
      
      <VoiceFeedback
        isListening={isListening}
        partialText={partialText}
        recognizedText={recognizedText}
        error={error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
```

## Example 2: Voice-Controlled Navigation

```tsx
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useVoice} from './src/hooks/useVoice';
import VoiceCommandParser from './src/services/VoiceCommandParser';

// Register navigation patterns
VoiceCommandParser.registerPattern({
  intent: 'navigate',
  patterns: [
    /go to (home|settings|profile)/i,
    /navigate to (home|settings|profile)/i,
    /open (home|settings|profile)/i,
  ],
  handler: (matches) => ({
    screen: matches[1].toLowerCase(),
  }),
});

export function VoiceNavigationButton() {
  const navigation = useNavigation();
  const {lastCommand, startListening, speak} = useVoice();

  useEffect(() => {
    if (lastCommand?.intent === 'navigate') {
      const screen = lastCommand.parameters.screen;
      speak(`Navigating to ${screen}`);
      
      // Navigate based on screen name
      switch (screen) {
        case 'home':
          navigation.navigate('Home');
          break;
        case 'settings':
          navigation.navigate('Settings');
          break;
        case 'profile':
          navigation.navigate('Profile');
          break;
      }
    }
  }, [lastCommand, navigation, speak]);

  return (
    <MicButton
      onPress={startListening}
      isListening={false}
    />
  );
}
```

## Example 3: Voice-Activated Search

```tsx
import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text} from 'react-native';
import {useVoice} from './src/hooks/useVoice';
import VoiceCommandParser from './src/services/VoiceCommandParser';

// Register search pattern
VoiceCommandParser.registerPattern({
  intent: 'search',
  patterns: [
    /search for (.+)/i,
    /find (.+)/i,
    /look for (.+)/i,
  ],
  handler: (matches) => ({
    query: matches[1],
  }),
});

export function VoiceSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const {lastCommand, isListening, startListening} = useVoice();

  useEffect(() => {
    if (lastCommand?.intent === 'search') {
      const searchQuery = lastCommand.parameters.query;
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [lastCommand]);

  const performSearch = (searchQuery: string) => {
    // Implement your search logic here
    console.log('Searching for:', searchQuery);
    // setResults(searchResults);
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
        />
        <MicButton
          size={40}
          isListening={isListening}
          onPress={startListening}
        />
      </View>
      <FlatList
        data={results}
        renderItem={({item}) => <Text>{item}</Text>}
      />
    </View>
  );
}
```

## Example 4: Voice-Controlled Form

```tsx
import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useVoice} from './src/hooks/useVoice';
import VoiceCommandParser from './src/services/VoiceCommandParser';

// Register form patterns
VoiceCommandParser.registerPattern({
  intent: 'setName',
  patterns: [/my name is (.+)/i, /I am (.+)/i],
  handler: (matches) => ({name: matches[1]}),
});

VoiceCommandParser.registerPattern({
  intent: 'setEmail',
  patterns: [/my email is (.+)/i, /email (.+)/i],
  handler: (matches) => ({email: matches[1]}),
});

export function VoiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const {lastCommand, startListening, speak} = useVoice();

  useEffect(() => {
    if (!lastCommand) return;

    switch (lastCommand.intent) {
      case 'setName':
        const name = lastCommand.parameters.name;
        setFormData(prev => ({...prev, name}));
        speak(`Name set to ${name}`);
        break;
      
      case 'setEmail':
        const email = lastCommand.parameters.email;
        setFormData(prev => ({...prev, email}));
        speak(`Email set to ${email}`);
        break;
    }
  }, [lastCommand, speak]);

  const handleSubmit = () => {
    speak(`Submitting form for ${formData.name}`);
    // Submit form
  };

  return (
    <View>
      <Text>Voice Form Example</Text>
      <Text>Name: {formData.name}</Text>
      <Text>Email: {formData.email}</Text>
      
      <Button title="Start Voice Input" onPress={startListening} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
```

## Example 5: Confirmation Dialog with Voice

```tsx
import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Button} from 'react-native';
import {useVoice} from './src/hooks/useVoice';

export function VoiceConfirmationDialog({
  visible,
  message,
  onConfirm,
  onCancel,
}) {
  const {lastCommand, startListening, speak} = useVoice();

  useEffect(() => {
    if (visible) {
      speak(`${message}. Say yes to confirm or no to cancel.`);
      startListening();
    }
  }, [visible, message, speak, startListening]);

  useEffect(() => {
    if (!lastCommand) return;

    if (lastCommand.intent === 'confirm') {
      speak('Confirmed');
      onConfirm();
    } else if (lastCommand.intent === 'deny') {
      speak('Cancelled');
      onCancel();
    }
  }, [lastCommand, onConfirm, onCancel, speak]);

  return (
    <Modal visible={visible} transparent>
      <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text>{message}</Text>
          <Button title="Yes" onPress={onConfirm} />
          <Button title="No" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
}

// Usage
function MyApp() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <View>
      <Button title="Delete Item" onPress={() => setShowDialog(true)} />
      
      <VoiceConfirmationDialog
        visible={showDialog}
        message="Are you sure you want to delete this item?"
        onConfirm={() => {
          console.log('Deleting...');
          setShowDialog(false);
        }}
        onCancel={() => setShowDialog(false)}
      />
    </View>
  );
}
```

## Example 6: Custom TTS Settings

```tsx
import React, {useState} from 'react';
import {View, Button, Slider, Text} from 'react-native';
import VoiceService from './src/services/VoiceService';

export function TTSSettings() {
  const [rate, setRate] = useState(0.5);
  const [pitch, setPitch] = useState(1.0);

  const testSpeech = async () => {
    await VoiceService.speak('This is a test of the text to speech system', {
      rate,
      pitch,
      language: 'en-US',
    });
  };

  return (
    <View>
      <Text>Speech Rate: {rate.toFixed(2)}</Text>
      <Slider
        value={rate}
        onValueChange={setRate}
        minimumValue={0.1}
        maximumValue={2.0}
      />

      <Text>Pitch: {pitch.toFixed(2)}</Text>
      <Slider
        value={pitch}
        onValueChange={setPitch}
        minimumValue={0.5}
        maximumValue={2.0}
      />

      <Button title="Test Speech" onPress={testSpeech} />
    </View>
  );
}
```

## Example 7: Multi-Language Support

```tsx
import React, {useState} from 'react';
import {View, Button, Picker} from 'react-native';
import {useVoice} from './src/hooks/useVoice';

const LANGUAGES = {
  'en-US': 'English (US)',
  'es-ES': 'Spanish',
  'fr-FR': 'French',
  'de-DE': 'German',
};

export function MultiLanguageVoice() {
  const [language, setLanguage] = useState('en-US');
  const {speak} = useVoice();

  const greetings = {
    'en-US': 'Hello, how are you?',
    'es-ES': 'Hola, ¿cómo estás?',
    'fr-FR': 'Bonjour, comment allez-vous?',
    'de-DE': 'Hallo, wie geht es dir?',
  };

  const handleSpeak = () => {
    speak(greetings[language], {language});
  };

  return (
    <View>
      <Picker selectedValue={language} onValueChange={setLanguage}>
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <Picker.Item key={code} label={name} value={code} />
        ))}
      </Picker>
      <Button title="Speak Greeting" onPress={handleSpeak} />
    </View>
  );
}
```

## Example 8: Voice Memo Recorder

```tsx
import React, {useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useVoice} from './src/hooks/useVoice';

export function VoiceMemoRecorder() {
  const [memos, setMemos] = useState([]);
  const {
    isListening,
    recognizedText,
    startListening,
    stopListening,
    speak,
  } = useVoice();

  const saveMemo = () => {
    if (recognizedText) {
      const memo = {
        id: Date.now(),
        text: recognizedText,
        timestamp: new Date().toLocaleString(),
      };
      setMemos(prev => [memo, ...prev]);
      speak('Memo saved');
    }
  };

  const playMemo = (memoText: string) => {
    speak(memoText);
  };

  return (
    <View>
      <MicButton
        isListening={isListening}
        onPress={isListening ? stopListening : startListening}
      />
      
      {recognizedText && (
        <View>
          <Text>{recognizedText}</Text>
          <Button title="Save Memo" onPress={saveMemo} />
        </View>
      )}

      <FlatList
        data={memos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.text}</Text>
            <Text>{item.timestamp}</Text>
            <Button title="Play" onPress={() => playMemo(item.text)} />
          </View>
        )}
      />
    </View>
  );
}
```

## Testing Your Implementation

To test the voice features:

1. **Grant Permissions**: Ensure microphone and speech recognition permissions are granted
2. **Test STT**: Tap the mic button and speak clearly
3. **Test TTS**: Use the speak function with various texts
4. **Test Commands**: Try different command patterns
5. **Error Handling**: Test with denied permissions, no internet, etc.

## Best Practices

1. **Always request permissions** before using voice features
2. **Provide visual feedback** during voice recognition
3. **Handle errors gracefully** with user-friendly messages
4. **Clean up resources** when components unmount
5. **Test on real devices** for best results
6. **Consider noise cancellation** in noisy environments
7. **Provide fallback text input** for accessibility

## Common Patterns

### Start Listening on Mount
```tsx
useEffect(() => {
  startListening();
  return () => stopListening();
}, []);
```

### Continuous Listening
```tsx
const {onSpeechEnd} = handlers;

handlers.onSpeechEnd = () => {
  onSpeechEnd?.();
  setTimeout(() => startListening(), 500);
};
```

### Voice Feedback Loop
```tsx
useEffect(() => {
  if (lastCommand) {
    const response = getResponseForIntent(lastCommand.intent);
    speak(response).then(() => startListening());
  }
}, [lastCommand]);
```
