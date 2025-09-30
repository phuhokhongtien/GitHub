# Project Structure Guide

This document describes the recommended project structure for this repository.

## Directory Structure

```
.
├── .github/                      # GitHub configuration
│   ├── workflows/               # GitHub Actions workflows
│   │   ├── mobile-ci.yml       # Mobile CI pipeline
│   │   ├── backend-ci.yml      # Backend CI pipeline
│   │   ├── cd-deploy.yml       # Deployment pipeline
│   │   └── pr-checks.yml       # PR validation
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   ├── pull_request_template.md # PR template
│   └── CODEOWNERS              # Code ownership
├── docs/                        # Documentation
│   ├── ci-cd.md                # CI/CD documentation
│   ├── api/                    # API documentation
│   ├── mobile/                 # Mobile app documentation
│   └── deployment/             # Deployment guides
├── mobile/                      # React Native application
│   ├── android/                # Android native code
│   ├── ios/                    # iOS native code
│   ├── src/                    # Application source code
│   │   ├── components/         # React components
│   │   ├── screens/            # Screen components
│   │   ├── navigation/         # Navigation configuration
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # React context providers
│   │   └── types/              # TypeScript types
│   ├── __tests__/              # Test files
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   ├── jest.config.js          # Jest configuration
│   └── .eslintrc.js            # ESLint configuration
├── backend/                     # Backend API
│   ├── src/                    # Application source code
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Express middleware
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration
│   │   └── types/              # TypeScript types
│   ├── tests/                  # Test files
│   │   ├── unit/               # Unit tests
│   │   └── integration/        # Integration tests
│   ├── migrations/             # Database migrations
│   ├── Dockerfile              # Docker configuration
│   ├── docker-compose.yml      # Local development setup
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   ├── jest.config.js          # Jest configuration
│   └── .eslintrc.js            # ESLint configuration
├── codecov.yml                  # Codecov configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

## Mobile Application Structure

### Recommended Technologies
- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: Redux Toolkit / Zustand / React Context
- **Navigation**: React Navigation
- **API Client**: Axios / React Query
- **Testing**: Jest, React Native Testing Library
- **Linting**: ESLint, Prettier

### Key Directories

**`src/components/`** - Reusable UI components
```
components/
├── common/           # Shared components (Button, Input, etc.)
├── forms/            # Form components
└── layouts/          # Layout components
```

**`src/screens/`** - Screen-level components
```
screens/
├── Auth/             # Authentication screens
├── Home/             # Home screen
├── Profile/          # Profile screens
└── Settings/         # Settings screens
```

**`src/services/`** - API and external service integrations
```
services/
├── api/              # API client configuration
├── auth/             # Authentication service
└── storage/          # Local storage service
```

## Backend Application Structure

### Recommended Technologies
- **Runtime**: Node.js
- **Framework**: Express.js / NestJS / Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL / MongoDB
- **ORM**: Prisma / TypeORM / Sequelize
- **Caching**: Redis
- **Testing**: Jest, Supertest
- **API Documentation**: Swagger / OpenAPI

### Key Directories

**`src/controllers/`** - Request handlers
```typescript
// Example: userController.ts
export const getUsers = async (req: Request, res: Response) => {
  // Handle request
};
```

**`src/routes/`** - API route definitions
```typescript
// Example: userRoutes.ts
router.get('/users', authenticate, getUsers);
router.post('/users', validate(userSchema), createUser);
```

**`src/models/`** - Data models and schemas
```typescript
// Example: User model
export interface User {
  id: string;
  email: string;
  name: string;
}
```

**`src/middleware/`** - Express middleware
```typescript
// Example: auth middleware, error handlers, validators
```

**`src/services/`** - Business logic layer
```typescript
// Example: userService.ts
export class UserService {
  async findById(id: string): Promise<User> {
    // Business logic
  }
}
```

## Configuration Files

### Mobile (package.json)
```json
{
  "name": "mobile-app",
  "version": "1.0.0",
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Backend (package.json)
```json
{
  "name": "backend-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "lint": "eslint . --ext .js,.ts",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration"
  },
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "nodemon": "^3.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts", "**/*.spec.ts"]
}
```

### Jest Configuration (jest.config.js)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### ESLint Configuration (.eslintrc.js)
```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
```

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml (Backend Development)
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@postgres:5432/dbname
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./src:/app/src
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dbname
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Getting Started

### Mobile App Setup
```bash
cd mobile
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

### Backend Setup
```bash
cd backend
npm install

# Development
npm run dev

# Production build
npm run build
npm start

# With Docker
docker-compose up
```

## Testing

### Run All Tests
```bash
# Mobile
cd mobile && npm test

# Backend
cd backend && npm test
```

### Coverage Reports
```bash
# Mobile
cd mobile && npm run test:coverage

# Backend
cd backend && npm run test:coverage
```

## Environment Variables

### Mobile (.env)
```
API_URL=https://api.example.com
API_KEY=your_api_key
```

### Backend (.env)
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Create a pull request
6. Wait for CI checks to pass
7. Request code review

See [CI/CD Documentation](./docs/ci-cd.md) for more details on the development workflow.
