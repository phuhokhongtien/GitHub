import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function TenantsScreen({ navigation }) {
  const { user, tenants, currentTenant, logout, switchTenant, loadTenants } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTenants();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout() },
    ]);
  };

  const handleTenantSelect = async (tenant) => {
    await switchTenant(tenant);
    navigation.navigate('TenantDetail', { tenantId: tenant.id });
  };

  const renderTenantItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tenantCard,
        currentTenant?.id === item.id && styles.currentTenantCard,
      ]}
      onPress={() => handleTenantSelect(item)}
    >
      <View style={styles.tenantHeader}>
        <Text style={styles.tenantName}>{item.name}</Text>
        {currentTenant?.id === item.id && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>Current</Text>
          </View>
        )}
      </View>
      {item.description && (
        <Text style={styles.tenantDescription}>{item.description}</Text>
      )}
      <Text style={styles.tenantRole}>Role: {item.userRole}</Text>
      <Text style={styles.tenantSlug}>Slug: {item.slug}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Tenants</Text>
          <Text style={styles.headerSubtitle}>Welcome, {user?.firstName}!</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tenants}
        renderItem={renderTenantItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tenants yet</Text>
            <Text style={styles.emptySubtext}>Create your first tenant to get started</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateTenant')}
      >
        <Text style={styles.createButtonText}>+ Create Tenant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
  },
  tenantCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  currentTenantCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  tenantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tenantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  tenantDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tenantRole: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  tenantSlug: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
