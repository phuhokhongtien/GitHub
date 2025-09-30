import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { tenantService } from '../services/api';

export default function TenantDetailScreen({ route, navigation }) {
  const { tenantId } = route.params;
  const [tenant, setTenant] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTenantData();
  }, [tenantId]);

  const loadTenantData = async () => {
    try {
      const [tenantData, membersData] = await Promise.all([
        tenantService.getTenant(tenantId),
        tenantService.getMembers(tenantId),
      ]);
      setTenant(tenantData);
      setMembers(membersData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load tenant details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    navigation.navigate('AddMember', { tenantId });
  };

  const handleEditTenant = () => {
    navigation.navigate('EditTenant', { tenantId });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Owner': return '#FF9500';
      case 'Admin': return '#FF3B30';
      case 'Member': return '#007AFF';
      case 'Viewer': return '#34C759';
      default: return '#999';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!tenant) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Tenant not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tenant Information</Text>
        <View style={styles.infoCard}>
          <Text style={styles.tenantName}>{tenant.name}</Text>
          {tenant.description && (
            <Text style={styles.tenantDescription}>{tenant.description}</Text>
          )}
          <Text style={styles.tenantSlug}>Slug: {tenant.slug}</Text>
          <View style={styles.roleContainer}>
            <Text style={styles.yourRole}>Your Role: </Text>
            <View style={[styles.roleBadge, { backgroundColor: getRoleColor(tenant.userRole) }]}>
              <Text style={styles.roleBadgeText}>{tenant.userRole}</Text>
            </View>
          </View>
        </View>

        {(tenant.userRole === 'Owner' || tenant.userRole === 'Admin') && (
          <TouchableOpacity style={styles.editButton} onPress={handleEditTenant}>
            <Text style={styles.editButtonText}>Edit Tenant</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Members ({members.length})</Text>
          {(tenant.userRole === 'Owner' || tenant.userRole === 'Admin') && (
            <TouchableOpacity onPress={handleAddMember}>
              <Text style={styles.addMemberButton}>+ Add</Text>
            </TouchableOpacity>
          )}
        </View>

        {members.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>
                {member.user.firstName} {member.user.lastName}
              </Text>
              <Text style={styles.memberEmail}>{member.user.email}</Text>
            </View>
            <View style={[styles.roleBadge, { backgroundColor: getRoleColor(member.role) }]}>
              <Text style={styles.roleBadgeText}>{member.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tenantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tenantDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  tenantSlug: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  yourRole: {
    fontSize: 16,
    fontWeight: '600',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  roleBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addMemberButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 14,
    color: '#666',
  },
});
