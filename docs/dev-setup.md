# Development Environment Setup

This guide will help you set up your local development environment for the GitHub Out-Sourcing project.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Backend Setup](#backend-setup)
- [Mobile App Setup](#mobile-app-setup)
- [Docker Setup](#docker-setup)
- [VS Code Configuration](#vs-code-configuration)
- [Verification](#verification)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Required Tools

1. **Node.js and npm**
   - Version: Node.js 18.x or higher
   - Download: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Version: 2.x or higher
   - Download: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

3. **Docker Desktop**
   - Version: Latest stable
   - Download: https://www.docker.com/products/docker-desktop
   - Verify installation:
     ```bash
     docker --version
     docker-compose --version
     ```

4. **React Native CLI**
   - Install globally:
     ```bash
     npm install -g react-native-cli
     ```

5. **Expo CLI** (if using Expo)
   - Install globally:
     ```bash
     npm install -g expo-cli
     ```

### Platform-Specific Tools

#### For iOS Development (macOS only)

1. **Xcode**
   - Version: 14.x or higher
   - Install from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **CocoaPods**
   - Install via Homebrew:
     ```bash
     brew install cocoapods
     ```
   - Or via Ruby gems:
     ```bash
     sudo gem install cocoapods
     ```

#### For Android Development (All platforms)

1. **Android Studio**
   - Download: https://developer.android.com/studio
   - Install required SDK components:
     - Android SDK Platform 33 (or latest)
     - Android SDK Build-Tools
     - Android Emulator
     - Android SDK Platform-Tools

2. **Java Development Kit (JDK)**
   - Version: JDK 11 or higher
   - Download: https://www.oracle.com/java/technologies/downloads/

3. **Environment Variables**
   - Add to your `.bashrc`, `.zshrc`, or system environment:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
     export ANDROID_HOME=$HOME/Android/Sdk          # Linux
     export ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk  # Windows
     
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

## Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phuhokhongtien/GitHub.git
   cd GitHub
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Set up environment files**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Mobile App
   cp app/.env.example app/.env
   ```
   
   Edit the `.env` files with your local configuration values.

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database**
   - Start PostgreSQL using Docker (recommended):
     ```bash
     cd ..
     npm run docker:up
     ```
   - Or install PostgreSQL locally and update `backend/.env` with your credentials

4. **Run database migrations** (when available)
   ```bash
   npm run migrate
   ```

5. **Seed database** (optional, when available)
   ```bash
   npm run seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```
   
   The backend API should now be running at `http://localhost:3000`

## Mobile App Setup

1. **Navigate to app directory**
   ```bash
   cd app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on specific platform**
   
   **iOS** (macOS only):
   ```bash
   npm run ios
   ```
   
   **Android**:
   ```bash
   npm run android
   ```
   
   **Web** (if supported):
   ```bash
   npm run web
   ```

## Docker Setup

The project includes Docker Compose configuration for running backend services.

### Starting Services

```bash
# Start all services
npm run docker:up

# Or from root directory
docker-compose up -d
```

### Stopping Services

```bash
# Stop all services
npm run docker:down

# Or from root directory
docker-compose down
```

### View Logs

```bash
npm run docker:logs
```

### Services Included

- **PostgreSQL**: Database server (port 5432)
- **Redis**: Cache server (port 6379)

## VS Code Configuration

The repository includes VS Code configuration for a better development experience.

### Recommended Extensions

When you open the project in VS Code, you'll be prompted to install recommended extensions. These include:

- ESLint - JavaScript/TypeScript linting
- Prettier - Code formatting
- React Native Tools - React Native debugging and IntelliSense
- Docker - Docker file support
- GitLens - Enhanced Git capabilities
- Tailwind CSS IntelliSense - If using Tailwind
- And more...

### Workspace Settings

The workspace settings include:
- Format on save
- ESLint auto-fix on save
- Proper file associations
- Emmet support for JSX/TSX

## Verification

### Check Backend

1. Visit http://localhost:3000 in your browser
2. You should see the API response or health check

### Check Mobile App

1. The app should open in your simulator/emulator
2. Verify that the app can connect to the backend API
3. Check the console for any errors

### Run Tests

```bash
# From root directory
npm test

# Backend only
npm run test:backend

# App only
npm run test:app
```

### Lint Code

```bash
# From root directory
npm run lint

# Backend only
npm run lint:backend

# App only
npm run lint:app
```

## Next Steps

- Review the [Troubleshooting Guide](./troubleshooting.md) if you encounter any issues
- Check the main [README.md](../README.md) for project overview
- Explore the codebase and start contributing!

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [VS Code Documentation](https://code.visualstudio.com/docs)
