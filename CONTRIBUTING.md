# Contributing to Kendy MCP Assistant

Thank you for your interest in contributing to Kendy MCP Assistant! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GitHub.git
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

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, Expo version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Rationale** for the enhancement
- **Possible implementation** approach (if you have ideas)
- **Examples** from other projects (if applicable)

### Code Contributions

1. **Find an issue** to work on or create a new one
2. **Comment on the issue** to let others know you're working on it
3. **Follow the development workflow** (see below)
4. **Submit a pull request**

## 💻 Development Workflow

1. **Keep your fork synchronized**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Make your changes** in your feature branch

3. **Test your changes**:
   ```bash
   npm test
   npm run lint
   ```

4. **Commit your changes** following our commit guidelines

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## 📝 Coding Standards

### TypeScript

- Use **TypeScript** for all new code
- Ensure all functions and components have **proper type annotations**
- Avoid using `any` type - use `unknown` or proper types instead
- Use **interfaces** for object shapes and **types** for unions/intersections

### Code Style

- Follow the existing code style in the project
- Use **ESLint** and **Prettier** for code formatting
- Run `npm run lint` to check for issues
- Use **meaningful variable and function names**
- Keep functions **small and focused** (single responsibility)
- Add **comments** for complex logic

### React Native / React

- Use **functional components** with hooks
- Keep components **small and reusable**
- Use **proper prop types** with TypeScript interfaces
- Implement **proper error handling**
- Follow React best practices and hooks rules

### File Organization

- Place components in `src/components/`
- Place screens in `src/screens/`
- Place utilities in `src/utils/`
- Place types in `src/types/`
- Use **index files** for clean imports

## 📏 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```
feat(auth): add user authentication flow

Implement login and registration screens with validation
and integration with authentication API.

Closes #123
```

```
fix(navigation): resolve navigation stack issue on Android

Fixed a bug where back navigation wasn't working properly
on Android devices.
```

## 🔄 Pull Request Process

1. **Update documentation** if you've changed APIs or added features

2. **Update the README.md** if necessary

3. **Ensure all tests pass**:
   ```bash
   npm test
   npm run lint
   ```

4. **Update your branch** with the latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Fill out the pull request template** completely

6. **Link related issues** in the PR description

7. **Request review** from maintainers

8. **Address review feedback** promptly

### Pull Request Requirements

- ✅ All tests pass
- ✅ Code follows style guidelines
- ✅ Documentation is updated
- ✅ Commit messages follow guidelines
- ✅ No merge conflicts
- ✅ Includes tests for new features
- ✅ Has been tested on multiple platforms (if applicable)

## 🧪 Testing

- Write **unit tests** for utilities and business logic
- Write **component tests** for React components
- Write **integration tests** for features
- Aim for **high code coverage** (>80%)
- Test on **multiple platforms** when possible

## 🎨 UI/UX Contributions

When contributing UI changes:

- Follow the existing **design system**
- Ensure **accessibility** (proper labels, contrast, etc.)
- Test on **different screen sizes**
- Include **screenshots** in your PR
- Consider **dark mode** support

## 📚 Documentation

- Update documentation for any changed functionality
- Use clear and concise language
- Include code examples where appropriate
- Keep documentation in sync with code

## ❓ Questions?

If you have questions about contributing:

- Check existing documentation
- Search through existing issues
- Open a new issue with the "question" label
- Reach out to maintainers

## 🙏 Thank You!

Your contributions make this project better. We appreciate your time and effort in making Kendy MCP Assistant a great tool for everyone!

---

**Happy Coding!** 🎉
