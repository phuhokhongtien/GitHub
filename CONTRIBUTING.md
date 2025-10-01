# Contributing to Kendy MCP Assistant

Thank you for your interest in contributing to the Kendy MCP Assistant project! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Issue Guidelines](#issue-guidelines)
- [Feature Requests](#feature-requests)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Personal attacks or insults
- Publishing others' private information without permission
- Other conduct that would be inappropriate in a professional setting

## Getting Started

### Prerequisites

*To be updated once technology stack is finalized*

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/GitHub.git
   cd GitHub
   ```

2. **Install dependencies**
   ```bash
   # Instructions will be added once project structure is established
   ```

3. **Configure development environment**
   ```bash
   # Configuration steps to be added
   ```

4. **Run tests**
   ```bash
   # Test commands to be added
   ```

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- **Clear title**: Briefly describe the bug
- **Description**: Detailed explanation of the issue
- **Steps to reproduce**: List steps to reproduce the behavior
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots**: If applicable, add screenshots
- **Environment**: Device, OS, app version, etc.
- **Additional context**: Any other relevant information

**Use the `bug` label for bug reports.**

### Suggesting Features

We welcome feature suggestions! Before creating a feature request:

1. Check the [ROADMAP.md](ROADMAP.md) to see if it's already planned
2. Search existing issues to avoid duplicates
3. Consider if the feature aligns with project goals

When creating a feature request, include:

- **Clear title**: Briefly describe the feature
- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should this feature work?
- **Alternatives**: Other solutions you've considered
- **Additional context**: Mockups, examples, etc.

**Use the `enhancement` label for feature requests.**

## Development Workflow

### Branch Naming Convention

Use descriptive branch names following this pattern:

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring
- `test/test-description` - Test additions or modifications

### Commit Message Guidelines

Write clear, concise commit messages:

**Format:**
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(voice): add wake word detection

fix(auth): resolve token expiration issue

docs(readme): update installation instructions
```

### Code Review Process

All submissions require review before merging:

1. Submit your pull request
2. Address any automated checks that fail
3. Respond to reviewer feedback
4. Make requested changes
5. Request re-review once changes are made

## Pull Request Process

### Before Submitting

- [ ] Code follows project coding standards
- [ ] All tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main branch

### Submitting a Pull Request

1. **Create Pull Request**
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Closes #123")
   - Provide detailed description of changes
   - Include screenshots for UI changes

2. **PR Template** (fill out when submitting):
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Related Issues
   Closes #(issue number)

   ## Testing
   Describe testing performed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tests added/updated
   - [ ] All tests pass
   ```

3. **After Submission**
   - Monitor for feedback
   - Respond to comments promptly
   - Make requested changes
   - Keep PR updated with main branch

### Merging

Pull requests are merged by maintainers once:

- All reviews are approved
- All automated checks pass
- No merge conflicts exist
- Changes align with project goals

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow DRY (Don't Repeat Yourself) principle
- Use meaningful variable and function names
- Keep functions small and focused
- Comment complex logic
- Handle errors gracefully
- Write tests for new functionality

### Language-Specific Standards

*To be defined based on chosen technology stack*

### File Organization

*To be defined based on project structure*

## Issue Guidelines

### Issue Labels

We use labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `roadmap` - Related to project roadmap
- `wontfix` - Will not be worked on
- `duplicate` - Issue already exists
- `invalid` - Invalid issue

### Working on Issues

1. **Find an issue**: Browse open issues or check [ROADMAP.md](ROADMAP.md)
2. **Ask to be assigned**: Comment on the issue expressing interest
3. **Wait for assignment**: Maintainers will assign the issue
4. **Start working**: Create a branch and begin development
5. **Submit PR**: Reference the issue in your pull request

### Issue Templates

When creating issues, use the appropriate template:

- Bug Report
- Feature Request
- Documentation Update
- Question

## Feature Requests

### Proposing New Features

1. Check [ROADMAP.md](ROADMAP.md) for existing plans
2. Search issues to avoid duplicates
3. Create detailed feature request
4. Engage in discussion
5. Wait for approval before implementing

### Feature Development

Once a feature is approved:

1. Break down into smaller tasks
2. Create sub-issues if needed
3. Implement incrementally
4. Submit PRs for review
5. Update documentation
6. Update ROADMAP.md when complete

## Documentation

### Types of Documentation

- **README.md** - Project overview and quick start
- **ROADMAP.md** - Feature tracking and milestones
- **API docs** - Technical API documentation
- **User guides** - End-user documentation
- **Architecture docs** - System design and architecture

### Writing Documentation

- Use clear, simple language
- Include code examples
- Add screenshots/diagrams where helpful
- Keep documentation up to date
- Follow existing documentation style

## Testing

### Test Requirements

- Unit tests for new functions/methods
- Integration tests for feature interactions
- End-to-end tests for critical user flows
- Test edge cases and error conditions
- Maintain test coverage above threshold (TBD)

### Running Tests

*Test commands and guidelines to be added*

## Questions?

If you have questions about contributing:

1. Check existing documentation
2. Search closed issues
3. Open a new issue with `question` label
4. Join project discussions (if available)

## Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Project credits

Thank you for contributing to Kendy MCP Assistant! 🎉
=======
# Contributing to GitHub Project

First off, thank you for considering contributing to this project! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why**.
* **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide mockups.
* **Describe the current behavior** and **explain which behavior you expected to see instead**.
* **Explain why this enhancement would be useful** to most users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the coding style used throughout the project
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

1. **Fork the repository** and create your branch from `main`.
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** following the code style guidelines.

3. **Test your changes** thoroughly.
   ```bash
   npm test
   ```

4. **Commit your changes** using a descriptive commit message.
   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to your fork** and submit a pull request.
   ```bash
   git push origin feature/my-new-feature
   ```

## Code Style Guidelines

### General

* Use meaningful variable and function names
* Write clear comments when necessary
* Keep functions small and focused on a single task
* Follow the DRY (Don't Repeat Yourself) principle

### JavaScript/TypeScript

* Use ES6+ syntax
* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Use camelCase for variable and function names
* Use PascalCase for class names
* Use UPPER_SNAKE_CASE for constants

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

## Project Structure

* `src/` - Main application source code
* `backend/` - Backend service code
* `docs/` - Documentation files
* `scripts/` - Utility scripts

## Testing

* Write tests for all new features and bug fixes
* Ensure all tests pass before submitting a pull request
* Aim for high test coverage

## Documentation

* Update the README.md if you change functionality
* Comment your code where necessary
* Update relevant documentation in the `docs/` folder

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

## Recognition

Contributors will be recognized in the project documentation and release notes.

Thank you for contributing! 🎉
=======
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
