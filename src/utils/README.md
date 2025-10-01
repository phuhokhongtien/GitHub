# Utils

This directory contains utility functions and helpers.

## Examples

```typescript
// formatDate.ts
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// validation.ts
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

## Guidelines

- Keep functions pure and testable
- Export functions as named exports
- Add comprehensive tests for utility functions
- Document complex logic with comments
