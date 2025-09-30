import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài Đặt</Text>
      <Text style={styles.subtitle}>Settings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default SettingsScreen;
