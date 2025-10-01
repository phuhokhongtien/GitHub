import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * Custom hook to monitor network connectivity status
 */
export const useNetworkStatus = (): {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
} => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {isConnected, isInternetReachable};
};
