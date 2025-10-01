# GitHub Out-Sourcing

A modern full-stack application with React Native mobile app and Node.js backend.

## 📋 Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Support](#support)

## 🎯 Overview

This project consists of:
- **Mobile App**: React Native application (iOS & Android)
- **Backend API**: Node.js/Express REST API
- **Database**: PostgreSQL with Redis caching
- **Infrastructure**: Docker Compose for local development

## 🚀 Quick Start

### 1. Prerequisites

Ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn
- Docker Desktop
- Git

For mobile development, you'll also need:
- **iOS**: Xcode (macOS only), CocoaPods
- **Android**: Android Studio, JDK 11+

See [detailed prerequisites](./docs/dev-setup.md#prerequisites) for complete list.

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/phuhokhongtien/GitHub.git
cd GitHub

# Install dependencies
npm install
npm run setup
```

### 3. Configure Environment

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp app/.env.example app/.env

# Edit the .env files with your configuration
```

### 4. Start Development

```bash
# Start Docker services (database, cache)
npm run docker:up

# Start both backend and app
npm run dev

# Or start them separately:
npm run dev:backend  # Backend on http://localhost:3000
npm run dev:app      # Mobile app
```

### 5. Run the Mobile App

```bash
# iOS (macOS only)
cd app && npm run ios

# Android
cd app && npm run android
```

## 📦 Prerequisites

### Required Software

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18.x+ | Runtime environment |
| npm | 8.x+ | Package manager |
| Docker | Latest | Container orchestration |
| Git | 2.x+ | Version control |

### Mobile Development

#### iOS Development (macOS only)
- Xcode 14.x or higher
- Xcode Command Line Tools
- CocoaPods

#### Android Development
- Android Studio
- Android SDK (API 33+)
- JDK 11 or higher
- Android Emulator or physical device

### Optional Tools
- VS Code (recommended editor)
- Postman or Insomnia (API testing)
- React Native Debugger

For detailed installation instructions, see [Development Setup Guide](./docs/dev-setup.md).

## 📁 Project Structure

```
.
├── app/                    # React Native mobile application
│   ├── .env.example       # App environment variables template
│   └── ...                # App source code
├── backend/               # Node.js backend API
│   ├── .env.example      # Backend environment variables template
│   └── ...               # Backend source code
├── docs/                  # Documentation
│   ├── dev-setup.md      # Detailed setup guide
│   └── troubleshooting.md # Common issues and solutions
├── .vscode/              # VS Code workspace configuration
│   ├── extensions.json   # Recommended extensions
│   └── settings.json     # Workspace settings
├── docker-compose.yml    # Docker services configuration
├── package.json          # Root package configuration
└── README.md            # This file
```

## 🛠️ Development

### Backend Development

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

The backend API will be available at `http://localhost:3000`.

### Mobile App Development

```bash
# Navigate to app
cd app

# Install dependencies
npm install

# For iOS, also install pods (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS (macOS only)
npm run ios

# Run on Android
npm run android

# Run tests
npm test
```

### Using Docker

Docker Compose is configured to run PostgreSQL and Redis:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (clean slate)
docker-compose down -v
```

## 📜 Available Scripts

### Root Level Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | Install all dependencies (backend + app) |
| `npm run dev` | Start both backend and app in development mode |
| `npm run dev:backend` | Start backend only |
| `npm run dev:app` | Start mobile app only |
| `npm test` | Run all tests |
| `npm run lint` | Lint all code |
| `npm run docker:up` | Start Docker services |
| `npm run docker:down` | Stop Docker services |
| `npm run clean` | Clean all node_modules and build artifacts |

### Backend Scripts

```bash
cd backend
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests
npm run lint         # Lint code
npm run build        # Build for production
```

### App Scripts

```bash
cd app
npm start            # Start Metro bundler
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm test             # Run tests
npm run lint         # Lint code
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Development Setup Guide](./docs/dev-setup.md)**: Complete guide for setting up your development environment
- **[Troubleshooting Guide](./docs/troubleshooting.md)**: Solutions to common issues

### Quick Links
- [Prerequisites Setup](./docs/dev-setup.md#prerequisites)
- [Backend Setup](./docs/dev-setup.md#backend-setup)
- [Mobile App Setup](./docs/dev-setup.md#mobile-app-setup)
- [Docker Setup](./docs/dev-setup.md#docker-setup)
- [Common Issues](./docs/troubleshooting.md)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes** and commit: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/your-feature`
5. **Submit a pull request**

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🆘 Support

If you encounter any issues:

1. Check the [Troubleshooting Guide](./docs/troubleshooting.md)
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Reach out to the team

### Helpful Resources
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📄 License

This project is private and proprietary.

---

**Note**: Make sure to review the `.env.example` files and configure your environment variables before starting development.

Happy coding! 🚀
