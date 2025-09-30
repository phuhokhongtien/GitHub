# Contributing to GitHub Project

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Messages](#commit-messages)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- For mobile development:
  - Xcode (for iOS development on macOS)
  - Android Studio (for Android development)
- For backend development:
  - Docker and Docker Compose (optional but recommended)
  - PostgreSQL (if not using Docker)
  - Redis (if not using Docker)

### Initial Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
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
   # Mobile
   cd mobile
   npm install
   cd ios && pod install && cd .. # macOS only
   
   # Backend
   cd ../backend
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   # Copy example env files
   cp mobile/.env.example mobile/.env
   cp backend/.env.example backend/.env
   ```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions or updates
- `chore/description` - Maintenance tasks

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the project's coding standards
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass locally

### 3. Commit Your Changes

Follow our [commit message guidelines](#commit-messages):

```bash
git add .
git commit -m "feat: add user authentication"
```

### 4. Keep Your Branch Updated

Regularly sync with the upstream repository:

```bash
git fetch upstream
git rebase upstream/develop
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template completely
5. Submit the pull request

## Coding Standards

### General Guidelines

- Write self-documenting code with clear variable and function names
- Keep functions small and focused on a single responsibility
- Avoid deep nesting (max 3 levels)
- Use meaningful comments for complex logic
- Remove commented-out code before committing
- No console.log statements in production code (use proper logging)

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use const by default, let when necessary, never var
- Prefer functional programming patterns
- Use async/await over promises when possible
- Handle errors properly (no empty catch blocks)

**Example**:
```typescript
// Good
const getUserById = async (id: string): Promise<User> => {
  try {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error('Failed to fetch user', { id, error });
    throw error;
  }
};

// Bad
function getUserById(id) {
  return userRepository.findById(id);
}
```

### React Native

- Use functional components with hooks
- Follow React best practices
- Keep components small and reusable
- Use proper prop types (TypeScript interfaces)
- Implement proper error boundaries
- Optimize performance (use React.memo, useMemo, useCallback when needed)

**Example**:
```typescript
// Good
interface UserCardProps {
  user: User;
  onPress: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(user.id);
  }, [user.id, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
};

// Bad
export const UserCard = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.user.id)}>
      <Text>{props.user.name}</Text>
    </TouchableOpacity>
  );
};
```

### Backend API

- Use RESTful conventions
- Implement proper error handling
- Validate all inputs
- Use dependency injection
- Follow SOLID principles
- Implement proper logging

**Example**:
```typescript
// Good
@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

  @Get('/:id')
  @ValidateParams(UserIdSchema)
  async getUser(@Param('id') id: string): Promise<UserDto> {
    this.logger.info('Fetching user', { id });
    const user = await this.userService.findById(id);
    return UserMapper.toDto(user);
  }
}

// Bad
app.get('/users/:id', async (req, res) => {
  const user = await db.users.findOne({ id: req.params.id });
  res.json(user);
});
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Revert a previous commit

### Scopes

- `mobile`: Mobile app changes
- `backend`: Backend API changes
- `ci`: CI/CD pipeline changes
- `docs`: Documentation changes
- `deps`: Dependency updates

### Examples

```bash
# Feature
feat(mobile): add user profile screen

# Bug fix
fix(backend): resolve authentication token expiration issue

# Documentation
docs: update API documentation for user endpoints

# Breaking change
feat(backend)!: change authentication flow

BREAKING CHANGE: Authentication now requires email verification
```

### Rules

1. **Subject line**:
   - Use imperative mood ("add" not "added" or "adds")
   - Don't capitalize first letter
   - No period at the end
   - Max 72 characters

2. **Body** (optional):
   - Explain what and why, not how
   - Wrap at 72 characters

3. **Footer** (optional):
   - Reference issues: `Fixes #123`, `Closes #456`
   - Note breaking changes: `BREAKING CHANGE: description`

## Pull Request Process

### Before Submitting

- [ ] All tests pass locally
- [ ] Code follows project style guidelines
- [ ] You've added tests for new functionality
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with develop
- [ ] No merge conflicts

### PR Template

Fill out all sections of the pull request template:
- Description of changes
- Type of change
- Related issues
- Testing instructions
- Screenshots (for UI changes)
- Checklist items

### Review Process

1. **Automated Checks**: CI/CD pipelines will run automatically
2. **Code Review**: At least one approval required
3. **Address Feedback**: Make requested changes
4. **Final Approval**: Maintainer approves and merges

### After Merge

- Delete your feature branch
- Pull the latest develop branch
- Start working on the next feature

## Testing Guidelines

### Test Coverage

Maintain minimum 80% code coverage for:
- Unit tests
- Integration tests
- E2E tests (where applicable)

### Writing Tests

#### Unit Tests

Test individual functions and components in isolation:

```typescript
describe('UserService', () => {
  let userService: UserService;
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
    } as any;
    userService = new UserService(mockRepository);
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      const mockUser = { id: '1', name: 'John' };
      mockRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.findById('1');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw error when user not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(userService.findById('1')).rejects.toThrow();
    });
  });
});
```

#### Integration Tests

Test API endpoints and database interactions:

```typescript
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const userData = { name: 'John', email: 'john@example.com' };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      name: userData.name,
      email: userData.email,
    });

    const user = await db.users.findOne({ email: userData.email });
    expect(user).toBeTruthy();
  });
});
```

#### Component Tests (React Native)

Test React components:

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('UserCard', () => {
  it('should call onPress when tapped', () => {
    const onPress = jest.fn();
    const user = { id: '1', name: 'John' };

    const { getByText } = render(
      <UserCard user={user} onPress={onPress} />
    );

    fireEvent.press(getByText('John'));

    expect(onPress).toHaveBeenCalledWith('1');
  });
});
```

### Running Tests

```bash
# Mobile
cd mobile
npm test                # Run all tests
npm test -- --watch    # Watch mode
npm run test:coverage  # With coverage

# Backend
cd backend
npm test                      # Unit tests
npm run test:integration      # Integration tests
npm run test:coverage         # With coverage
```

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex algorithms
- Explain non-obvious code decisions
- Keep comments up to date with code changes

**Example**:
```typescript
/**
 * Calculates the total price including tax and discounts
 * @param basePrice - The original price before any adjustments
 * @param taxRate - Tax rate as a decimal (e.g., 0.1 for 10%)
 * @param discountCode - Optional discount code to apply
 * @returns The final price after tax and discounts
 * @throws {InvalidDiscountError} If the discount code is invalid
 */
export const calculateTotalPrice = (
  basePrice: number,
  taxRate: number,
  discountCode?: string
): number => {
  // Implementation
};
```

### API Documentation

- Document all endpoints in Swagger/OpenAPI format
- Include request/response examples
- Document error responses
- Keep documentation in sync with code

### README Updates

Update README.md when:
- Adding new features
- Changing setup instructions
- Modifying architecture
- Adding dependencies

## Questions?

- Check existing issues and discussions
- Review documentation in `/docs`
- Ask in pull request comments
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
