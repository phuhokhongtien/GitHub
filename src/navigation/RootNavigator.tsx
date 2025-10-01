import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, SettingsScreen, AboutScreen} from '../screens';
import {RootStackParamList} from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Trang Chủ'}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: 'Cài Đặt'}}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{title: 'Giới Thiệu'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
