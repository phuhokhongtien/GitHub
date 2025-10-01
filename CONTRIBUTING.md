# Contributing to Kendy MCP Assistant

First off, thank you for considering contributing to Kendy MCP Assistant! It's people like you that make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/GitHub.git
   cd GitHub
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/phuhokhongtien/GitHub.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include environment details**: OS, Node version, React Native version

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any similar features** in other apps if applicable

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Add tests if applicable
4. Ensure the test suite passes
5. Make sure your code lints
6. Update documentation if needed
7. Issue the pull request

## Development Workflow

### Setting Up Your Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Linting and Formatting

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format
```

## Style Guidelines

### TypeScript Style Guide

- Use **TypeScript** for all new code
- Define proper **types and interfaces** for all data structures
- Avoid using `any` type unless absolutely necessary
- Use **meaningful variable and function names**
- Keep functions **small and focused**

### Code Formatting

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons** at the end of statements
- Keep line length under **100 characters** when possible
- Use **trailing commas** in multi-line objects and arrays

### Component Guidelines

```typescript
// Use functional components with hooks
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Screens**: PascalCase (e.g., `HomeScreen.tsx`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE in files (e.g., `API_CONSTANTS.ts`)

## Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

#### Examples

```
feat(auth): add user login functionality

Implement login screen with email/password authentication
using Firebase Auth integration.

Closes #123
```

```
fix(navigation): resolve navigation stack overflow

Fixed issue where rapid navigation between screens
caused stack overflow error.

Fixes #456
```

## Pull Request Process

1. **Update documentation** for any changed functionality
2. **Add tests** for new features
3. **Ensure all tests pass** before submitting
4. **Update the README.md** if needed
5. **Link related issues** in the PR description
6. **Request review** from maintainers
7. **Address review feedback** promptly

### PR Title Format

Use the same format as commit messages:
```
feat(component): add new feature
fix(screen): resolve bug
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #issue_number
```

## Code Review Process

- All PRs require at least one approval from a maintainer
- Address all review comments before merging
- Keep PRs focused and reasonably sized
- Be respectful and constructive in reviews

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers directly.

## Recognition

Contributors will be recognized in the project README and release notes.

---

Thank you for contributing to Kendy MCP Assistant! 🎉
