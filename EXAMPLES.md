# Code Examples and Usage Guide

## 📚 Table of Contents
- [Navigation](#navigation)
- [Storage Service](#storage-service)
- [Network Status Hook](#network-status-hook)
- [Language Context](#language-context)
- [Vietnamese i18n](#vietnamese-i18n)
- [Custom Components](#custom-components)

## Navigation

### Using Navigation in Screens

```typescript
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@types';

type MyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MyScreen: React.FC = () => {
  const navigation = useNavigation<MyScreenNavigationProp>();

  return (
    <Button 
      title="Go to Settings"
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
```

### Adding New Screens

1. Create screen in `src/screens/NewScreen.tsx`:
```typescript
import React from 'react';
import {View, Text} from 'react-native';

const NewScreen: React.FC = () => {
  return (
    <View>
      <Text>New Screen</Text>
    </View>
  );
};

export default NewScreen;
```

2. Export from `src/screens/index.ts`:
```typescript
export {default as NewScreen} from './NewScreen';
```

3. Add to navigation types in `src/types/navigation.ts`:
```typescript
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  NewScreen: undefined; // Add this
};
```

4. Add to navigator in `src/navigation/AppNavigator.tsx`:
```typescript
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{title: 'New Screen'}}
/>
```

## Storage Service

### Saving Data
```typescript
import {StorageService} from '@services';

// Save user preference
await StorageService.setItem('user_name', 'John Doe');

// Save JSON data
const userData = {name: 'John', age: 30};
await StorageService.setItem('user', JSON.stringify(userData));
```

### Retrieving Data
```typescript
// Get simple string
const userName = await StorageService.getItem('user_name');

// Get and parse JSON
const userDataString = await StorageService.getItem('user');
if (userDataString) {
  const userData = JSON.parse(userDataString);
  console.log(userData.name);
}
```

### Removing Data
```typescript
// Remove specific item
await StorageService.removeItem('user_name');

// Clear all data
await StorageService.clear();
```

## Network Status Hook

```typescript
import {useNetworkStatus} from '@hooks';
import {View, Text} from 'react-native';

const MyComponent: React.FC = () => {
  const {isConnected, connectionType} = useNetworkStatus();

  return (
    <View>
      <Text>
        Connected: {isConnected ? 'Yes' : 'No'}
      </Text>
      <Text>
        Type: {connectionType}
      </Text>
    </View>
  );
};
```

## Language Context

### Using Language Context
```typescript
import {useLanguage} from '@contexts';

const MyScreen: React.FC = () => {
  const {language} = useLanguage();

  return (
    <View>
      <Text>{language.common.home}</Text>
      <Text>{language.screens.home.title}</Text>
    </View>
  );
};
```

### Wrapping App with Language Provider
```typescript
import {LanguageProvider} from '@contexts';

function App() {
  return (
    <LanguageProvider>
      {/* Your app content */}
    </LanguageProvider>
  );
}
```

## Vietnamese i18n

### Current Vietnamese Strings
Located in `src/utils/i18n.ts`:

```typescript
import {vi} from '@utils';

// Common strings
vi.common.home         // "Trang Chủ"
vi.common.settings     // "Cài Đặt"
vi.common.welcome      // "Chào mừng"
vi.common.back         // "Quay lại"

// Screen strings
vi.screens.home.title      // "Trang Chủ"
vi.screens.home.subtitle   // "Chào mừng bạn đến với ứng dụng"

vi.screens.settings.title     // "Cài Đặt"
vi.screens.settings.subtitle  // "Tùy chỉnh ứng dụng của bạn"

// Error messages
vi.errors.generic   // "Đã xảy ra lỗi"
vi.errors.network   // "Lỗi kết nối mạng"
```

### Adding New Translations
Edit `src/utils/i18n.ts`:

```typescript
export const vi = {
  common: {
    // ... existing translations
    save: 'Lưu',
    cancel: 'Hủy',
  },
  screens: {
    myNewScreen: {
      title: 'Màn Hình Mới',
      description: 'Mô tả màn hình',
    },
  },
};
```

## Custom Components

### Using the Button Component
```typescript
import {Button} from '@components';

const MyScreen: React.FC = () => {
  const handlePress = () => {
    console.log('Button pressed');
  };

  return (
    <Button 
      title="Click Me"
      onPress={handlePress}
      style={{backgroundColor: 'red'}}
    />
  );
};
```

### Creating New Components
Create in `src/components/MyComponent.tsx`:

```typescript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MyComponentProps {
  title: string;
  subtitle?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyComponent;
```

Export from `src/components/index.ts`:
```typescript
export {default as MyComponent} from './MyComponent';
```

## Voice Recognition Example

```typescript
import Voice from '@react-native-voice/voice';
import {useEffect, useState} from 'react';

const VoiceComponent: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      setResults(e.value || []);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('vi-VN'); // Vietnamese
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // Your UI here
  );
};
```

## Text-to-Speech Example

```typescript
import Tts from 'react-native-tts';
import {useEffect} from 'react';

const TtsComponent: React.FC = () => {
  useEffect(() => {
    Tts.setDefaultLanguage('vi-VN'); // Vietnamese
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.0);
  }, []);

  const speak = (text: string) => {
    Tts.speak(text);
  };

  const stopSpeaking = () => {
    Tts.stop();
  };

  return (
    // Your UI here
  );
};
```

## Secure Storage with Keychain

```typescript
import * as Keychain from 'react-native-keychain';

// Save credentials
const saveCredentials = async (username: string, password: string) => {
  try {
    await Keychain.setGenericPassword(username, password);
    console.log('Credentials saved');
  } catch (error) {
    console.error('Could not save credentials', error);
  }
};

// Get credentials
const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Username:', credentials.username);
      console.log('Password:', credentials.password);
      return credentials;
    }
  } catch (error) {
    console.error('Could not get credentials', error);
  }
};

// Reset credentials
const resetCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Credentials reset');
  } catch (error) {
    console.error('Could not reset credentials', error);
  }
};
```

## Testing Examples

### Component Test
```typescript
import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Trang Chủ')).toBeTruthy();
  });
});
```

### Service Test
```typescript
import {StorageService} from '../src/services';

describe('StorageService', () => {
  beforeEach(async () => {
    await StorageService.clear();
  });

  it('stores and retrieves data', async () => {
    await StorageService.setItem('test', 'value');
    const value = await StorageService.getItem('test');
    expect(value).toBe('value');
  });
});
```

## Best Practices

1. **Always use TypeScript types** for props and state
2. **Use path aliases** (`@components`, `@screens`, etc.) for imports
3. **Extract reusable logic** into custom hooks
4. **Keep components small** and focused
5. **Write tests** for critical functionality
6. **Use Vietnamese translations** from i18n utility
7. **Handle errors** appropriately with try-catch
8. **Follow React Native best practices** for performance

---

For more information, see:
- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - What's been implemented
