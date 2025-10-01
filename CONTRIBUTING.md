# Contributing to GitHub

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤔 How Can I Contribute?

### Reporting Bugs

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/phuhokhongtien/GitHub/issues)
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/phuhokhongtien/GitHub/issues/new)
- Be sure to include:
  - A **clear and descriptive title**
  - **Detailed steps to reproduce** the problem
  - **Expected behavior** and **actual behavior**
  - **Screenshots** if applicable
  - **Environment details** (OS, Node version, etc.)

### Suggesting Enhancements

- Open a new issue with your suggestion
- Provide a clear and detailed explanation of the feature
- Explain why this enhancement would be useful to most users
- List any alternatives you've considered

### Contributing Code

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Test your changes thoroughly
5. Submit a pull request

## 🔧 Development Process

### Setting Up Your Development Environment

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR-USERNAME/GitHub.git
   cd GitHub
   ```

2. **Add the upstream repository**

   ```bash
   git remote add upstream https://github.com/phuhokhongtien/GitHub.git
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

### Making Changes

- Write clear, concise, and well-documented code
- Follow the existing code style and conventions
- Add tests for new features or bug fixes
- Update documentation as needed
- Ensure all tests pass before submitting

### Testing Your Changes

```bash
# Run tests
npm test

# Run linter
npm run lint

# Run type checker (if using TypeScript)
npm run type-check
```

## 🎨 Style Guidelines

### JavaScript/TypeScript Style Guide

- Use **ES6+** features where appropriate
- Use **TypeScript** for type safety when applicable
- Use **meaningful variable and function names**
- Keep functions small and focused on a single task
- Add comments for complex logic
- Follow **Prettier** formatting (configuration will be added)
- Follow **ESLint** rules (configuration will be added)

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` - Improving structure / format of the code
  - ⚡️ `:zap:` - Improving performance
  - 🔥 `:fire:` - Removing code or files
  - 🐛 `:bug:` - Fixing a bug
  - ✨ `:sparkles:` - Introducing new features
  - 📝 `:memo:` - Writing docs
  - 🚀 `:rocket:` - Deploying stuff
  - 💄 `:lipstick:` - Updating the UI and style files
  - ✅ `:white_check_mark:` - Adding tests
  - 🔒 `:lock:` - Fixing security issues
  - ⬆️ `:arrow_up:` - Upgrading dependencies
  - ⬇️ `:arrow_down:` - Downgrading dependencies
  - 🔧 `:wrench:` - Changing configuration files

### Example Commit Messages

```
✨ Add user authentication feature
🐛 Fix navigation bug on mobile devices
📝 Update installation instructions in README
♻️ Refactor API service layer
✅ Add unit tests for user service
```

## 🔀 Pull Request Process

1. **Update documentation** - Ensure the README.md and any other relevant documentation is updated with details of changes
2. **Add tests** - Include appropriate test coverage for your changes
3. **Update the CHANGELOG** - Add a note about your changes (if applicable)
4. **Ensure all tests pass** - Run the full test suite before submitting
5. **One feature per PR** - Keep pull requests focused on a single feature or bug fix
6. **Provide a clear description** - Explain what changes you made and why
7. **Reference related issues** - Link to any related issues in your PR description
8. **Be responsive** - Be prepared to make changes based on feedback
9. **Wait for review** - A maintainer will review your PR and may request changes
10. **Squash commits** - Maintainers may ask you to squash commits before merging

### Pull Request Template

When creating a pull request, please include:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
Describe the tests you've added or run

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

## 🙏 Recognition

Contributors will be recognized in our README.md and release notes. Thank you for making this project better!

## ❓ Questions?

If you have any questions or need help, please:
- Open an issue for general questions
- Join our discussions on GitHub Discussions (if available)
- Contact the maintainers

---

Thank you for contributing! 🎉
