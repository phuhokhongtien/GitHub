/**
 * React Native App with Vietnamese Language Support
 * 
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from './src/contexts';
import {RootNavigator} from './src/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
