import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (data) => {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('currentTenant');
  },

  getCurrentUser: async () => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export const tenantService = {
  getMyTenants: async () => {
    const response = await apiClient.get('/tenants');
    return response.data;
  },

  getTenant: async (id) => {
    const response = await apiClient.get(`/tenants/${id}`);
    return response.data;
  },

  createTenant: async (data) => {
    const response = await apiClient.post('/tenants', data);
    return response.data;
  },

  updateTenant: async (id, data) => {
    const response = await apiClient.put(`/tenants/${id}`, data);
    return response.data;
  },

  deleteTenant: async (id) => {
    await apiClient.delete(`/tenants/${id}`);
  },

  getMembers: async (tenantId) => {
    const response = await apiClient.get(`/tenants/${tenantId}/members`);
    return response.data;
  },

  addMember: async (tenantId, data) => {
    const response = await apiClient.post(`/tenants/${tenantId}/members`, data);
    return response.data;
  },

  updateMemberRole: async (tenantId, memberId, data) => {
    const response = await apiClient.put(`/tenants/${tenantId}/members/${memberId}`, data);
    return response.data;
  },

  removeMember: async (tenantId, memberId) => {
    await apiClient.delete(`/tenants/${tenantId}/members/${memberId}`);
  },

  setCurrentTenant: async (tenant) => {
    await AsyncStorage.setItem('currentTenant', JSON.stringify(tenant));
  },

  getCurrentTenant: async () => {
    const tenantStr = await AsyncStorage.getItem('currentTenant');
    return tenantStr ? JSON.parse(tenantStr) : null;
  },
};

export default apiClient;
