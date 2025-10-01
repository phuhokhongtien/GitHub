# Contributing Guidelines

Thank you for considering contributing to this project! This document outlines the process and guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch from `develop`
4. Make your changes
5. Ensure all tests pass locally
6. Push your changes and open a pull request

## Development Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features or enhancements
- `bugfix/*`: Bug fixes
- `hotfix/*`: Emergency fixes for production

### Making Changes

1. **Create a branch:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write clean, maintainable code
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test locally:**
   ```bash
   # Mobile
   cd mobile
   npm run lint
   npm run typecheck
   npm run test
   
   # Backend
   cd backend
   npm run lint
   npm run typecheck
   npm run test
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a pull request on GitHub

## Pull Request Process

### Before Opening a PR

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with `develop`

### PR Requirements

1. **Fill out the PR template completely**
   - Provide clear description of changes
   - List related issues
   - Describe testing performed
   - Check all applicable boxes

2. **Ensure CI checks pass**
   - Linting: Code style and quality checks
   - Type checking: TypeScript compilation
   - Tests: All unit tests must pass
   - Coverage: Maintain or improve code coverage

3. **Respond to review feedback**
   - Address all comments
   - Make requested changes
   - Re-request review when ready

4. **Keep PR focused**
   - One feature/fix per PR
   - Small, reviewable changes
   - Clear commit history

### CI/CD Checks

All pull requests trigger automated checks:

**Mobile CI:**
- ESLint and Prettier checks
- TypeScript type checking
- Jest unit tests with coverage
- Coverage report to Codecov

**Backend CI:**
- ESLint and Prettier checks
- TypeScript type checking
- Jest unit tests with coverage
- Coverage report to Codecov

See [CI/CD documentation](../docs/ci-cd.md) for details.

## Code Style

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful variable names
- Add comments for complex logic

### Testing

- Write unit tests for all new code
- Aim for >80% code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

Example:
```typescript
describe('UserService', () => {
  it('should create a new user with valid data', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' };
    
    // Act
    const user = await userService.create(userData);
    
    // Assert
    expect(user).toBeDefined();
    expect(user.name).toBe('John');
  });
});
```

### Documentation

- Update README if adding features
- Add JSDoc comments for public APIs
- Update CI/CD docs if changing workflows
- Include examples where helpful

## Review Process

1. **Automated checks:** CI/CD runs automatically
2. **Code review:** At least one approval required
3. **Changes requested:** Address feedback and update
4. **Approval:** Once approved and CI passes, ready to merge
5. **Merge:** Maintainers will merge to `develop`

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other contributors

## Questions?

- Check [CI/CD documentation](../docs/ci-cd.md)
- Review existing issues and PRs
- Open a new issue for questions
- Tag maintainers if needed

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
