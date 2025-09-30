# Development Setup Guide

This guide will help you set up your development environment for the Kendy MCP Assistant project.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Git** - Version control
- **Node.js** (v18+) - JavaScript runtime
- **npm** or **yarn** - Package manager

### For Mobile Development (Phase 1.2+)
- **React Native CLI**
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)

### For Backend Development (Phase 1.3+)
- Backend runtime (Node.js/Python/Go - TBD)
- **Docker** & **Docker Compose** - Container runtime
- Database client tools

### Optional but Recommended
- **VS Code** - Code editor
- **Git GUI** client (e.g., GitKraken, SourceTree)
- **Postman** or **Insomnia** - API testing

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/phuhokhongtien/GitHub.git
cd GitHub
```

### 2. Set Up Git Hooks (Coming Soon)

```bash
# Will be available in Phase 1.1
npm run prepare
```

### 3. Environment Configuration (Coming Soon)

Copy the example environment files:

```bash
# Mobile
cp mobile/.env.example mobile/.env.local

# Backend
cp backend/.env.example backend/.env.local
```

Update the `.env.local` files with your configuration.

## Development Workflow

### Mobile App (Coming in Phase 1.2)

```bash
cd mobile

# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Backend Services (Coming in Phase 1.3)

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Run in Docker
docker-compose up
```

## Troubleshooting

### Common Issues

**Issue**: Module not found errors
**Solution**: Run `npm install` in the appropriate directory

**Issue**: Port already in use
**Solution**: Change the port in your `.env.local` file or stop the conflicting process

**Issue**: Database connection errors
**Solution**: Ensure Docker containers are running and check your database credentials

## Getting Help

If you encounter issues:

1. Check the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
2. Search existing [GitHub Issues](https://github.com/phuhokhongtien/GitHub/issues)
3. Create a new issue with the `question` label

## Next Steps

- Read the [ROADMAP.md](ROADMAP.md) to understand project phases
- Review [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines

---

**Last Updated**: 2024-09-30

**Note**: This guide will be updated as each phase of the project is implemented.
