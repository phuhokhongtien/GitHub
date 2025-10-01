# Contributing Guide

Thank you for your interest in contributing to the GitHub Out-Sourcing project! 🎉

## Getting Started

1. **Set up your development environment**
   - Follow the [Quick Start Guide](./docs/QUICK-START.md) for a 5-minute setup
   - Or see the [Development Setup Guide](./docs/dev-setup.md) for detailed instructions

2. **Familiarize yourself with the codebase**
   - Review the project structure in [README.md](./README.md)
   - Explore the backend and app directories

3. **Check existing issues**
   - Look for issues labeled `good first issue` or `help wanted`
   - Comment on the issue you want to work on

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Keep changes focused and atomic

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run tests
npm test

# Test both backend and app
npm run test:backend
npm run test:app
```

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add user authentication"
# or
git commit -m "fix: resolve login redirect issue"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what changed and why
- Reference to related issues (e.g., "Closes #123")
- Screenshots for UI changes

## Code Style Guidelines

### JavaScript/TypeScript

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use meaningful variable names
- Follow ESLint rules (will auto-fix on save in VS Code)

### React/React Native

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

### Backend

- Use async/await instead of callbacks
- Handle errors properly
- Validate input data
- Write descriptive API documentation

## Pull Request Guidelines

### Before Submitting

- ✅ Code follows the project's style guidelines
- ✅ All tests pass
- ✅ New tests added for new features
- ✅ Documentation updated if needed
- ✅ No console.log or debug code left in
- ✅ Branch is up to date with main

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
How to test the changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
```

## Review Process

1. **Automated Checks**: CI/CD will run tests and linting
2. **Code Review**: At least one team member will review
3. **Feedback**: Address any comments or requested changes
4. **Approval**: Once approved, your PR will be merged

## Need Help?

- **Setup Issues?** → Check [Troubleshooting Guide](./docs/troubleshooting.md)
- **Questions?** → Ask in the issue or PR comments
- **Stuck?** → Reach out to the team

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Recognition

All contributors will be recognized in:
- Project contributors list
- Release notes for significant contributions

Thank you for contributing! 🚀
