# GitHub
Out-Sourcing

[![Mobile CI](https://github.com/phuhokhongtien/GitHub/actions/workflows/mobile-ci.yml/badge.svg)](https://github.com/phuhokhongtien/GitHub/actions/workflows/mobile-ci.yml)
[![Backend CI](https://github.com/phuhokhongtien/GitHub/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/phuhokhongtien/GitHub/actions/workflows/backend-ci.yml)
[![PR Checks](https://github.com/phuhokhongtien/GitHub/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/phuhokhongtien/GitHub/actions/workflows/pr-checks.yml)
[![codecov](https://codecov.io/gh/phuhokhongtien/GitHub/branch/main/graph/badge.svg)](https://codecov.io/gh/phuhokhongtien/GitHub)

## Overview

This repository contains a full-stack application with:
- **Mobile App**: React Native application (iOS & Android)
- **Backend API**: Node.js/Express backend service
- **CI/CD**: Automated testing, building, and deployment pipelines

## Project Structure

```
.
├── mobile/          # React Native mobile application
├── backend/         # Node.js backend API
├── docs/            # Project documentation
└── .github/         # GitHub Actions workflows and templates
```

## Quick Start

### Mobile App
```bash
cd mobile
npm install
npm run ios     # Run on iOS simulator
npm run android # Run on Android emulator
```

### Backend API
```bash
cd backend
npm install
npm run dev     # Start development server
```

## Documentation

### 📖 Getting Started
- **[Quick Setup Guide](docs/QUICK_SETUP.md)** - Step-by-step setup instructions
- **[Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md)** - Overview of what's included
- **[Setup Checklist](docs/CHECKLIST.md)** - Complete checklist for CI/CD setup

### 🔧 Technical Guides
- **[CI/CD Documentation](docs/ci-cd.md)** - Comprehensive guide to our CI/CD pipelines
- **[Project Structure](docs/project-structure.md)** - Detailed project organization and setup
- **[Environment Variables](docs/environment-variables.md)** - Environment configuration guide
- **[Workflow Diagrams](docs/workflow-diagrams.md)** - Visual representation of CI/CD flows

### 🤝 Contributing
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to this project

## CI/CD Pipeline

Our CI/CD pipeline automatically:
- ✅ Runs linters and type checks on all PRs
- ✅ Executes unit and integration tests
- ✅ Builds Android APK and iOS apps
- ✅ Generates Docker images for backend
- ✅ Uploads test coverage to Codecov
- ✅ Deploys to production on merge to main
- ✅ Publishes mobile apps on tagged releases

See the [CI/CD documentation](docs/ci-cd.md) for more details.

## Development Workflow

1. Create a feature branch from `develop`
2. Make your changes with tests
3. Push and create a Pull Request
4. Wait for automated CI checks to pass
5. Get code review approval
6. Merge to `develop`
7. Create PR to `main` for production deployment

## Testing

Run tests for both mobile and backend:

```bash
# Mobile
cd mobile && npm test

# Backend
cd backend && npm test
cd backend && npm run test:integration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- All tests pass
- Code coverage is maintained (>80%)
- Code follows project style guidelines
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)

## Code of Conduct

Please note that this project follows a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- 🐛 [Report a bug](https://github.com/phuhokhongtien/GitHub/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/phuhokhongtien/GitHub/issues/new?template=feature_request.md)
- 📖 [Read the docs](docs/)

## Team

Maintained by @phuhokhongtien

---

**Note**: This repository uses automated CI/CD pipelines. All changes must pass automated checks before merging.