# Vietnamese Voice Support - Usage Examples

This document provides practical examples for integrating Vietnamese voice support into your React Native application.

## Basic Usage

### Example 1: Simple Voice Recognition

```typescript
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  destroyVoiceRecognition,
} from './src/utils/voiceUtils';

const SimpleVoiceRecognition = () => {
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Initialize voice recognition
    initializeVoiceRecognition(
      (result) => {
        setResult(result.text);
        setIsListening(false);
      },
      (error) => {
        console.error('Error:', error.message);
        setIsListening(false);
      }
    );

    return () => {
      destroyVoiceRecognition();
    };
  }, []);

  const handleStart = async () => {
    setIsListening(true);
    await startVoiceRecognition('vi-VN');
  };

  const handleStop = async () => {
    await stopVoiceRecognition();
    setIsListening(false);
  };

  return (
    <View>
      <Button
        title={isListening ? 'Stop' : 'Start Recording'}
        onPress={isListening ? handleStop : handleStart}
      />
      <Text>Result: {result}</Text>
    </View>
  );
};

export default SimpleVoiceRecognition;
```

### Example 2: Simple Text-to-Speech

```typescript
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { initializeTts, speak, stopSpeaking } from './src/utils/voiceUtils';

const SimpleTextToSpeech = () => {
  const [text, setText] = useState('Xin chào, đây là ví dụ');

  useEffect(() => {
    initializeTts();
  }, []);

  const handleSpeak = async () => {
    await speak(text, 'vi-VN', 0.5);
  };

  const handleStop = async () => {
    await stopSpeaking();
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter Vietnamese text"
      />
      <Button title="Speak" onPress={handleSpeak} />
      <Button title="Stop" onPress={handleStop} />
    </View>
  );
};

export default SimpleTextToSpeech;
```

## Advanced Usage

### Example 3: Voice-Controlled Form

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  destroyVoiceRecognition,
} from './src/utils/voiceUtils';

const VoiceControlledForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [activeField, setActiveField] = useState<'name' | 'address' | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    initializeVoiceRecognition(
      (result) => {
        if (activeField === 'name') {
          setName(result.text);
        } else if (activeField === 'address') {
          setAddress(result.text);
        }
        setIsListening(false);
        setActiveField(null);
      },
      (error) => {
        console.error('Voice error:', error);
        setIsListening(false);
      }
    );

    return () => {
      destroyVoiceRecognition();
    };
  }, [activeField]);

  const startRecording = async (field: 'name' | 'address') => {
    setActiveField(field);
    setIsListening(true);
    await startVoiceRecognition('vi-VN');
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nhập tên của bạn"
        />
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => startRecording('name')}
        >
          <Text>🎤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Nhập địa chỉ của bạn"
        />
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => startRecording('address')}
        >
          <Text>🎤</Text>
        </TouchableOpacity>
      </View>

      {isListening && (
        <Text style={styles.listening}>
          Đang nghe {activeField === 'name' ? 'tên' : 'địa chỉ'}...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: 70,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
  },
  micButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  listening: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});

export default VoiceControlledForm;
```

### Example 4: Voice Commands Handler

```typescript
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  destroyVoiceRecognition,
} from './src/utils/voiceUtils';

const VoiceCommandHandler = ({ onCommand }: { onCommand: (cmd: string) => void }) => {
  useEffect(() => {
    initializeVoiceRecognition(
      (result) => {
        const text = result.text.toLowerCase();
        
        // Vietnamese commands
        if (text.includes('mở trang chủ') || text.includes('về trang chủ')) {
          onCommand('HOME');
        } else if (text.includes('cài đặt')) {
          onCommand('SETTINGS');
        } else if (text.includes('tìm kiếm')) {
          onCommand('SEARCH');
        } else if (text.includes('quay lại')) {
          onCommand('BACK');
        } else {
          Alert.alert('Lệnh không được nhận dạng', text);
        }
      },
      (error) => {
        console.error('Command error:', error);
      }
    );

    return () => {
      destroyVoiceRecognition();
    };
  }, [onCommand]);

  const startListening = async () => {
    await startVoiceRecognition('vi-VN');
  };

  return null; // This is a utility component
};

// Usage in main app
const App = () => {
  const handleCommand = (command: string) => {
    switch (command) {
      case 'HOME':
        // Navigate to home
        break;
      case 'SETTINGS':
        // Navigate to settings
        break;
      case 'SEARCH':
        // Open search
        break;
      case 'BACK':
        // Go back
        break;
    }
  };

  return <VoiceCommandHandler onCommand={handleCommand} />;
};
```

### Example 5: Multilingual Chat Assistant

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  destroyVoiceRecognition,
  initializeTts,
  speak,
} from './src/utils/voiceUtils';
import { SupportedLanguage } from './src/config/languages';

interface Message {
  text: string;
  language: SupportedLanguage;
  isUser: boolean;
}

const VoiceChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('vi-VN');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    initializeTts();
    initializeVoiceRecognition(
      async (result) => {
        const userMessage: Message = {
          text: result.text,
          language: currentLanguage,
          isUser: true,
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsListening(false);

        // Generate response
        const response = generateResponse(result.text, currentLanguage);
        const assistantMessage: Message = {
          text: response,
          language: currentLanguage,
          isUser: false,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Speak response
        await speak(response, currentLanguage);
      },
      (error) => {
        console.error('Voice error:', error);
        setIsListening(false);
      }
    );

    return () => {
      destroyVoiceRecognition();
    };
  }, [currentLanguage]);

  const generateResponse = (input: string, lang: SupportedLanguage): string => {
    // Simple response generator
    const responses = {
      'vi-VN': {
        greeting: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        time: `Bây giờ là ${new Date().toLocaleTimeString('vi-VN')}`,
        default: 'Tôi đã hiểu. Còn gì khác không?',
      },
      'en-US': {
        greeting: 'Hello! How can I help you?',
        time: `It's ${new Date().toLocaleTimeString('en-US')}`,
        default: 'I understand. Anything else?',
      },
    };

    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('xin chào') || lowerInput.includes('hello')) {
      return responses[lang].greeting;
    } else if (lowerInput.includes('mấy giờ') || lowerInput.includes('time')) {
      return responses[lang].time;
    }
    return responses[lang].default;
  };

  const startListening = async () => {
    setIsListening(true);
    await startVoiceRecognition(currentLanguage);
  };

  const stopListeningHandler = async () => {
    await stopVoiceRecognition();
    setIsListening(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.langButton,
            currentLanguage === 'vi-VN' && styles.activeLang,
          ]}
          onPress={() => setCurrentLanguage('vi-VN')}
        >
          <Text>Tiếng Việt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.langButton,
            currentLanguage === 'en-US' && styles.activeLang,
          ]}
          onPress={() => setCurrentLanguage('en-US')}
        >
          <Text>English</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.message,
              msg.isUser ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.micButton, isListening && styles.listening]}
        onPress={isListening ? stopListeningHandler : startListening}
      >
        <Text style={styles.micButtonText}>
          {isListening ? '⏹ Dừng' : '🎤 Nói'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  langButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  activeLang: {
    backgroundColor: '#007AFF',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  messageText: {
    fontSize: 16,
  },
  micButton: {
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    alignItems: 'center',
  },
  listening: {
    backgroundColor: '#FF3B30',
  },
  micButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VoiceChatAssistant;
```

### Example 6: Voice-Enabled Note Taking

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  destroyVoiceRecognition,
  speak,
} from './src/utils/voiceUtils';
import { SupportedLanguage } from './src/config/languages';

interface Note {
  id: string;
  title: string;
  content: string;
  language: SupportedLanguage;
  timestamp: Date;
}

const VoiceNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('vi-VN');

  useEffect(() => {
    initializeVoiceRecognition(
      (result) => {
        setCurrentNote((prev) => prev + ' ' + result.text);
        setIsRecording(false);
      },
      (error) => {
        console.error('Error:', error);
        setIsRecording(false);
      }
    );

    return () => {
      destroyVoiceRecognition();
    };
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    await startVoiceRecognition(language);
  };

  const stopRecording = async () => {
    await stopVoiceRecognition();
    setIsRecording(false);
  };

  const saveNote = () => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: currentTitle || 'Ghi chú không có tiêu đề',
      content: currentNote,
      language,
      timestamp: new Date(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setCurrentNote('');
    setCurrentTitle('');
  };

  const readNote = async (note: Note) => {
    await speak(note.content, note.language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.editor}>
        <TextInput
          style={styles.titleInput}
          placeholder={language === 'vi-VN' ? 'Tiêu đề...' : 'Title...'}
          value={currentTitle}
          onChangeText={setCurrentTitle}
        />
        <TextInput
          style={styles.contentInput}
          placeholder={
            language === 'vi-VN' ? 'Nội dung ghi chú...' : 'Note content...'
          }
          value={currentNote}
          onChangeText={setCurrentNote}
          multiline
        />
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, isRecording && styles.recording]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Text style={styles.buttonText}>
              {isRecording ? '⏹' : '🎤'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveNote}>
            <Text style={styles.buttonText}>💾</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteItem}
            onPress={() => readNote(item)}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent} numberOfLines={2}>
              {item.content}
            </Text>
            <Text style={styles.noteTime}>
              {item.timestamp.toLocaleString(
                item.language === 'vi-VN' ? 'vi-VN' : 'en-US'
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  editor: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5,
  },
  contentInput: {
    fontSize: 16,
    minHeight: 100,
    padding: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 24,
  },
  noteItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  noteTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default VoiceNotes;
```

## Utility Functions Examples

### Example 7: Custom Hook for Voice Recognition

```typescript
import { useState, useEffect, useCallback } from 'react';
import {
  initializeVoiceRecognition,
  startVoiceRecognition,
  stopVoiceRecognition,
  destroyVoiceRecognition,
  VoiceRecognitionResult,
  VoiceError,
} from './src/utils/voiceUtils';
import { SupportedLanguage } from './src/config/languages';

export const useVoiceRecognition = (language: SupportedLanguage) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<VoiceError | null>(null);

  useEffect(() => {
    initializeVoiceRecognition(
      (res: VoiceRecognitionResult) => {
        setResult(res.text);
        setIsListening(false);
        setError(null);
      },
      (err: VoiceError) => {
        setError(err);
        setIsListening(false);
      }
    );

    return () => {
      destroyVoiceRecognition();
    };
  }, []);

  const start = useCallback(async () => {
    setIsListening(true);
    setError(null);
    await startVoiceRecognition(language);
  }, [language]);

  const stop = useCallback(async () => {
    await stopVoiceRecognition();
    setIsListening(false);
  }, []);

  const clear = useCallback(() => {
    setResult('');
    setError(null);
  }, []);

  return {
    isListening,
    result,
    error,
    start,
    stop,
    clear,
  };
};

// Usage
const MyComponent = () => {
  const { isListening, result, start, stop } = useVoiceRecognition('vi-VN');

  return (
    <View>
      <Button title={isListening ? 'Stop' : 'Start'} onPress={isListening ? stop : start} />
      <Text>{result}</Text>
    </View>
  );
};
```

### Example 8: Custom Hook for Text-to-Speech

```typescript
import { useState, useEffect, useCallback } from 'react';
import {
  initializeTts,
  speak,
  stopSpeaking,
  cleanupTts,
} from './src/utils/voiceUtils';
import { SupportedLanguage } from './src/config/languages';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    initializeTts();
    return () => {
      cleanupTts();
    };
  }, []);

  const speakText = useCallback(
    async (text: string, language: SupportedLanguage, rate = 0.5) => {
      try {
        setIsSpeaking(true);
        await speak(text, language, rate);
        setIsSpeaking(false);
      } catch (error) {
        console.error('TTS error:', error);
        setIsSpeaking(false);
      }
    },
    []
  );

  const stop = useCallback(async () => {
    await stopSpeaking();
    setIsSpeaking(false);
  }, []);

  return {
    isSpeaking,
    speak: speakText,
    stop,
  };
};

// Usage
const MyComponent = () => {
  const { isSpeaking, speak, stop } = useTextToSpeech();

  const handleSpeak = () => {
    speak('Xin chào, đây là ví dụ', 'vi-VN');
  };

  return (
    <View>
      <Button title="Speak" onPress={handleSpeak} disabled={isSpeaking} />
      <Button title="Stop" onPress={stop} disabled={!isSpeaking} />
    </View>
  );
};
```

## Integration Examples

These examples demonstrate various ways to integrate Vietnamese voice support into your application. Choose the approach that best fits your use case and customize as needed.

For more detailed configuration options, see [CONFIGURATION.md](./CONFIGURATION.md).
For setup instructions, see [SETUP.md](./SETUP.md).
