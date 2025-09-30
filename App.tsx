import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import './src/locales/i18n';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;

