import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { tenantService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CreateTenantScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const { loadTenants } = useAuth();

  const handleCreate = async () => {
    if (!name || !slug) {
      Alert.alert('Error', 'Please fill in name and slug');
      return;
    }

    setLoading(true);
    try {
      await tenantService.createTenant({ name, description, slug });
      await loadTenants();
      Alert.alert('Success', 'Tenant created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create tenant');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (text) => {
    setName(text);
    if (!slug) {
      setSlug(text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Tenant</Text>

      <Text style={styles.label}>Tenant Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., My Company"
        value={name}
        onChangeText={handleNameChange}
      />

      <Text style={styles.label}>Slug * (used in URLs)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., my-company"
        value={slug}
        onChangeText={setSlug}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating...' : 'Create Tenant'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
});
