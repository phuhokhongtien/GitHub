# Components

This directory contains reusable UI components for the application.

## Component Structure

Components should follow this structure:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  // Add other props here
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add styles here
  },
});
```

## Guidelines

- Keep components small and focused on a single responsibility
- Use TypeScript for type safety
- Export components as named exports
- Use StyleSheet.create for styling
- Add prop types using TypeScript interfaces
- Write unit tests for complex components
