# Contributing to Kendy MCP Assistant

Thank you for your interest in contributing to Kendy MCP Assistant! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Git installed and configured
- Node.js (v18 or higher)
- React Native development environment set up
- Backend development environment (TBD based on tech stack decision)
- A GitHub account

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GitHub.git
   cd GitHub
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/phuhokhongtien/GitHub.git
   ```
4. Install dependencies (once available):
   ```bash
   npm install
   # or
   yarn install
   ```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### 2. Make Your Changes

- Write clean, readable code
- Follow the project's coding standards
- Add tests for new functionality
- Update documentation as needed

### 3. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 4. Run Tests

Before committing, ensure all tests pass:

```bash
npm test
# or
yarn test
```

## Coding Standards

### General Guidelines

- Write self-documenting code with clear variable and function names
- Keep functions small and focused on a single task
- Avoid deep nesting (max 3-4 levels)
- Comment complex logic, but prefer clear code over comments
- Remove commented-out code and debug statements

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for anonymous functions
- Use async/await over raw promises
- Use destructuring where appropriate

### React Native

- Use functional components with hooks
- Follow component composition patterns
- Keep components small and reusable
- Use proper prop types or TypeScript interfaces
- Avoid inline styles (use StyleSheet)
- Follow React hooks rules

### Backend (Guidelines TBD)

Backend coding standards will be defined once the backend framework is chosen.

## Commit Guidelines

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples:**

```
feat(mobile): add voice recording UI component

Implement audio recording button and waveform visualization
for the voice input feature.

Closes #123
```

```
fix(backend): resolve tenant isolation bug

Fix issue where tenant data was leaking across boundaries
due to incorrect query filtering.

Fixes #456
```

### Commit Best Practices

- Make atomic commits (one logical change per commit)
- Write clear, descriptive commit messages
- Reference issue numbers when applicable
- Keep commits focused and small

## Pull Request Process

### Before Submitting

1. ✅ Ensure your code follows the coding standards
2. ✅ All tests pass
3. ✅ Update documentation if needed
4. ✅ Rebase on latest `main` branch
5. ✅ Verify no merge conflicts

### Creating a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a pull request on GitHub with:
   - Clear title describing the change
   - Detailed description of what and why
   - Reference to related issues
   - Screenshots for UI changes
   - Testing instructions

### Pull Request Template

```markdown
## Description
Brief description of changes

## Related Issues
Closes #issue_number

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No breaking changes (or clearly documented)
```

### Review Process

- At least one maintainer must review the PR
- Address all review comments
- Be open to feedback and suggestions
- CI/CD checks must pass
- Maintainers will merge approved PRs

## Testing

### Writing Tests

- Write unit tests for all new functions
- Write integration tests for features
- Aim for high test coverage (>80%)
- Test edge cases and error conditions
- Keep tests simple and focused

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- path/to/test.spec.ts

# Run with coverage
npm test -- --coverage
```

## Documentation

### Types of Documentation

1. **Code Documentation**: JSDoc comments for functions and classes
2. **API Documentation**: OpenAPI/Swagger specs for backend APIs
3. **User Documentation**: Guides and tutorials
4. **Architecture Documentation**: System design and architecture docs

### Documentation Guidelines

- Keep documentation up-to-date with code changes
- Use clear, concise language
- Include code examples
- Add diagrams where helpful
- Update ROADMAP.md for progress tracking

## Questions?

If you have questions about contributing:
1. Check existing issues and discussions
2. Review project documentation
3. Open a new issue with the `question` label

## Recognition

All contributors will be recognized in our README and release notes. Thank you for helping make Kendy MCP Assistant better!

---

**Last Updated**: 2024-09-30
