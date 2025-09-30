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
