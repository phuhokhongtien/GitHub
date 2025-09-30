import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService, tenantService } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
        await loadTenants();
        const tenant = await tenantService.getCurrentTenant();
        setCurrentTenant(tenant);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTenants = async () => {
    try {
      const tenantsData = await tenantService.getMyTenants();
      setTenants(tenantsData);
    } catch (error) {
      console.error('Error loading tenants:', error);
    }
  };

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    setUser(data.user);
    await loadTenants();
    return data;
  };

  const register = async (email, password, firstName, lastName) => {
    const data = await authService.register({ email, password, firstName, lastName });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setCurrentTenant(null);
    setTenants([]);
  };

  const switchTenant = async (tenant) => {
    await tenantService.setCurrentTenant(tenant);
    setCurrentTenant(tenant);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentTenant,
        tenants,
        loading,
        login,
        register,
        logout,
        switchTenant,
        loadTenants,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
