# GitHub
Out-Sourcing

## Project Structure

```
├── mobile/          # React Native mobile application
├── backend/         # Backend API server
├── docs/            # Project documentation
│   └── ci-cd.md    # CI/CD pipeline documentation
└── .github/
    ├── workflows/   # GitHub Actions workflows
    └── PULL_REQUEST_TEMPLATE/
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The CI/CD pipeline automatically:

- **For Pull Requests:**
  - Runs code linting and formatting checks
  - Performs TypeScript type checking
  - Executes unit tests with coverage reporting
  - Reports coverage to Codecov

- **For Main/Develop Branch:**
  - All PR checks plus:
  - Builds Android APK and iOS archives (mobile)
  - Builds and pushes Docker images (backend)
  - Uploads build artifacts

### Quick Links

- 📖 [Complete CI/CD Documentation](docs/ci-cd.md)
- 🔄 [View Workflows](.github/workflows/)
- 📊 [Coverage Reports](https://codecov.io) (once configured)

### Getting Started

1. Set up your development environment for [mobile](mobile/README.md) and [backend](backend/README.md)
2. Create a feature branch from `develop`
3. Make your changes following the project guidelines
4. Run tests and checks locally before pushing
5. Open a pull request using the [PR template](.github/PULL_REQUEST_TEMPLATE/pull_request_template.md)
6. Wait for CI checks to pass
7. Request review from team members

For detailed workflow information, see [docs/ci-cd.md](docs/ci-cd.md).
