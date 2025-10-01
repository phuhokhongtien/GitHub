# Screens

This directory contains screen components for the application.

## Screen Structure

Screens should follow this structure:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## Guidelines

- Each screen should be in its own file
- Use SafeAreaView for proper insets
- Keep business logic in services or hooks
- Name screens with `Screen` suffix (e.g., `HomeScreen.tsx`)
