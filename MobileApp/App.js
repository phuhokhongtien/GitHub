import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TenantsScreen from './src/screens/TenantsScreen';
import CreateTenantScreen from './src/screens/CreateTenantScreen';
import TenantDetailScreen from './src/screens/TenantDetailScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ title: 'Register' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Tenants" 
              component={TenantsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="CreateTenant" 
              component={CreateTenantScreen}
              options={{ title: 'Create Tenant' }}
            />
            <Stack.Screen 
              name="TenantDetail" 
              component={TenantDetailScreen}
              options={{ title: 'Tenant Details' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

