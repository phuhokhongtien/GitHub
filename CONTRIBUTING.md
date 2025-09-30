# Contributing to Vietnamese Voice Support

Thank you for your interest in contributing to the Vietnamese Voice Support project! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation](#documentation)
8. [Submitting Changes](#submitting-changes)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- Node.js >= 16
- React Native development environment
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/GitHub.git
   cd GitHub
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/phuhokhongtien/GitHub.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check existing issues to avoid duplicates
- Collect relevant information (device, OS, steps to reproduce)

**Bug Report Template:**

```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Device: [e.g., iPhone 12]
- OS: [e.g., iOS 15.0]
- App Version: [e.g., 1.0.0]

**Screenshots:**
If applicable

**Additional Context:**
Any other relevant information
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Use a clear and descriptive title
- Provide detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include examples if possible

**Enhancement Template:**

```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should it work?

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Any other information
```

### Adding New Languages

To add support for a new language:

1. **Update language configuration** in `src/config/languages.ts`:
   ```typescript
   THAI: {
     code: 'th-TH',
     name: 'Thai',
     displayName: 'ภาษาไทย',
     voiceCode: 'th-TH',
     locale: 'th_TH',
   },
   ```

2. **Test on physical devices** with the language installed

3. **Update documentation** to reflect the new language

4. **Submit a pull request** with test results

### Improving Documentation

Documentation improvements are highly valued:
- Fix typos or unclear explanations
- Add examples
- Improve organization
- Translate to other languages

## Development Workflow

### 1. Sync with Upstream

Before starting work:
```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes

### 3. Make Changes

- Write clean, readable code
- Follow coding standards (see below)
- Add comments where necessary
- Update documentation

### 4. Test Changes

```bash
# Run linter
npm run lint

# Run tests
npm test

# Test on device
npm run ios     # or
npm run android
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add Thai language support"
```

Commit message format:
```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat: add offline speech recognition
fix: resolve TTS crash on Android 10
docs: update setup guide for iOS
```

### 6. Push Changes

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Fill in PR template
4. Submit for review

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible

```typescript
// Good
interface VoiceResult {
  text: string;
  confidence: number;
}

// Bad
const result: any = { ... };
```

### Naming Conventions

- Components: PascalCase (`VoiceRecorder`)
- Functions: camelCase (`startVoiceRecognition`)
- Constants: UPPER_SNAKE_CASE (`DEFAULT_LANGUAGE`)
- Files: PascalCase for components, camelCase for utilities

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use arrow functions
- Keep functions small and focused

```typescript
// Good
const speak = async (text: string, language: SupportedLanguage) => {
  try {
    await Tts.speak(text);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Bad
function speak(text,language){
  Tts.speak(text)
}
```

### Component Structure

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  // Props definition
}

export const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleAction = () => {
    // Handler logic
  };

  // Render
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles
  },
});
```

### Comments

Add comments for:
- Complex logic
- Non-obvious code
- API documentation
- TODOs

```typescript
/**
 * Converts speech to text with Vietnamese support
 * @param language - Language code (vi-VN or en-US)
 * @returns Promise with recognized text
 */
export const startVoiceRecognition = async (
  language: SupportedLanguage
): Promise<void> => {
  // Implementation
};
```

## Testing Guidelines

### Unit Tests

- Test all utility functions
- Test component logic
- Aim for >80% code coverage

```typescript
describe('voiceUtils', () => {
  test('should start voice recognition', async () => {
    await startVoiceRecognition('vi-VN');
    expect(Voice.start).toHaveBeenCalledWith('vi-VN');
  });
});
```

### Component Tests

```typescript
describe('VoiceRecorder', () => {
  test('should render record button', () => {
    const { getByText } = render(
      <VoiceRecorder language="vi-VN" onResult={jest.fn()} />
    );
    expect(getByText('Tap to Record')).toBeTruthy();
  });
});
```

### Manual Testing

- Test on real devices
- Test both iOS and Android
- Test various scenarios
- Document test results

## Documentation

### Code Documentation

- Add JSDoc comments to functions
- Document component props
- Explain complex logic

### User Documentation

When adding features:
- Update README.md
- Add examples to EXAMPLES.md
- Update CONFIGURATION.md if needed
- Update SETUP.md for new requirements

### Documentation Style

- Use clear, concise language
- Provide code examples
- Include screenshots for UI changes
- Keep formatting consistent

## Submitting Changes

### Pull Request Process

1. **Update documentation**
2. **Add tests**
3. **Run linter and tests**
4. **Update CHANGELOG.md**
5. **Fill in PR template**
6. **Request review**

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Tested on iOS
- [ ] Tested on Android

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No new warnings

## Related Issues
Fixes #123
```

### Review Process

1. Maintainers will review your PR
2. Address feedback if requested
3. Once approved, PR will be merged
4. Your contribution will be credited

### After Merge

1. Delete your feature branch
2. Sync your fork with upstream
3. Celebrate! 🎉

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in CHANGELOG.md

## Questions?

If you have questions:
- Check existing documentation
- Search existing issues
- Create a new issue with "question" label
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Vietnamese Voice Support! 🙏
