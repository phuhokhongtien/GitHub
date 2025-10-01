/**
 * Utility functions for the application
 */

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('vi-VN');
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
