import React, {createContext, useContext, useState, ReactNode} from 'react';
import {AppSettings} from '../types';

interface AppContextType {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const defaultSettings: AppSettings = {
  language: 'vi',
  theme: 'light',
  voiceEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<AppSettings>): void => {
    setSettings(prev => ({...prev, ...newSettings}));
  };

  return (
    <AppContext.Provider value={{settings, updateSettings}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
