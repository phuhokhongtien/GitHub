# CI/CD Documentation

This document provides comprehensive information about the Continuous Integration and Continuous Deployment (CI/CD) pipelines configured for this project.

## Table of Contents

1. [Overview](#overview)
2. [Workflows](#workflows)
3. [Mobile CI/CD](#mobile-cicd)
4. [Backend CI/CD](#backend-cicd)
5. [Branch Protection](#branch-protection)
6. [Required Secrets](#required-secrets)
7. [Testing and Coverage](#testing-and-coverage)
8. [Deployment Process](#deployment-process)
9. [Troubleshooting](#troubleshooting)

## Overview

Our CI/CD pipeline is built using GitHub Actions and consists of three main workflows:

- **Mobile CI** (`mobile-ci.yml`): Handles React Native app builds, tests, and artifact generation
- **Backend CI** (`backend-ci.yml`): Manages backend API tests, builds, and Docker image creation
- **CD Deploy** (`cd-deploy.yml`): Automates deployment to production environments

### Architecture

```
Pull Request → CI Checks (lint, test, type-check) → Build Artifacts → Code Review → Merge
Main Branch Push → CI Checks → Build → Deploy to Production
Tagged Release → CI Checks → Build → Deploy to App Stores
```

## Workflows

### Mobile CI Workflow

**Trigger Conditions:**
- Pull requests to `main` or `develop` branches
- Pushes to `main` or `develop` branches
- Only when changes are made to `mobile/**` directory or the workflow file itself

**Jobs:**

1. **lint-and-test**
   - Runs on: `ubuntu-latest`
   - Steps:
     - Checkout code
     - Setup Node.js (v18)
     - Install dependencies
     - Run ESLint
     - Run TypeScript type checking
     - Run unit tests with coverage
     - Upload coverage to Codecov

2. **build-android**
   - Runs on: `ubuntu-latest`
   - Depends on: `lint-and-test`
   - Steps:
     - Checkout code
     - Setup Node.js and Java (v17)
     - Install dependencies
     - Build Android APK
     - Upload APK as artifact (30-day retention)

3. **build-ios**
   - Runs on: `macos-latest`
   - Depends on: `lint-and-test`
   - Steps:
     - Checkout code
     - Setup Node.js
     - Install dependencies
     - Install CocoaPods
     - Build iOS app
     - Upload build artifacts (30-day retention)

### Backend CI Workflow

**Trigger Conditions:**
- Pull requests to `main` or `develop` branches
- Pushes to `main` or `develop` branches
- Only when changes are made to `backend/**` directory or the workflow file itself

**Jobs:**

1. **lint-and-test**
   - Runs on: `ubuntu-latest`
   - Steps:
     - Checkout code
     - Setup Node.js (v18)
     - Install dependencies
     - Run ESLint
     - Run TypeScript type checking
     - Run unit tests with coverage
     - Upload coverage to Codecov

2. **build**
   - Runs on: `ubuntu-latest`
   - Depends on: `lint-and-test`
   - Steps:
     - Checkout code
     - Setup Docker Buildx
     - Build Docker image
     - Save and upload Docker image as artifact

3. **integration-tests**
   - Runs on: `ubuntu-latest`
   - Depends on: `build`
   - Services: PostgreSQL 15, Redis 7
   - Steps:
     - Checkout code
     - Setup Node.js
     - Install dependencies
     - Run integration tests

### CD Deploy Workflow

**Trigger Conditions:**
- Pushes to `main` branch
- Tagged releases (e.g., `v1.0.0`)

**Jobs:**

1. **deploy-backend**
   - Runs on: `ubuntu-latest`
   - Triggered on: `main` branch pushes or version tags
   - Steps:
     - Build and push Docker image to Docker Hub
     - Deploy to production server via SSH

2. **deploy-mobile-android**
   - Runs on: `ubuntu-latest`
   - Triggered on: version tags only
   - Steps:
     - Build signed Android App Bundle (AAB)
     - Upload to Google Play (internal track)

3. **deploy-mobile-ios**
   - Runs on: `macos-latest`
   - Triggered on: version tags only
   - Steps:
     - Build iOS archive
     - Export IPA
     - Upload to TestFlight

## Mobile CI/CD

### Prerequisites

Ensure your React Native project has the following npm scripts in `mobile/package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Android Build Configuration

1. The workflow expects a standard React Native Android project structure
2. Gradle wrapper must be present at `mobile/android/gradlew`
3. For release builds, configure signing in `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('KEYSTORE_FILE')) {
                storeFile file(KEYSTORE_FILE)
                storePassword KEYSTORE_PASSWORD
                keyAlias KEY_ALIAS
                keyPassword KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### iOS Build Configuration

1. The workflow expects an Xcode workspace at `mobile/ios/YourApp.xcworkspace`
2. Update the workspace and scheme names in the workflow file
3. For App Store builds, configure signing and provisioning profiles

### Testing Requirements

- Unit tests should be written using Jest
- Tests should be placed in `__tests__` directories or have `.test.js`/`.spec.js` extensions
- Aim for minimum 80% code coverage

## Backend CI/CD

### Prerequisites

Ensure your backend project has the following npm scripts in `backend/package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:integration": "jest --testPathPattern=integration",
    "test:coverage": "jest --coverage"
  }
}
```

### Docker Configuration

Create a `Dockerfile` in the `backend/` directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Database and Service Dependencies

The integration tests run with:
- PostgreSQL 15 (accessible at `localhost:5432`)
- Redis 7 (accessible at `localhost:6379`)

Configure your tests to use these services via environment variables:
- `DATABASE_URL`
- `REDIS_URL`

### Testing Strategy

1. **Unit Tests**: Test individual functions and modules in isolation
2. **Integration Tests**: Test API endpoints and database interactions
3. **Coverage**: Maintain minimum 80% code coverage

## Branch Protection

### Recommended Settings

Configure branch protection rules for `main` and `develop` branches:

1. **Required Reviews**
   - Require at least 1 approval before merging
   - Dismiss stale reviews when new commits are pushed

2. **Required Status Checks**
   - Mobile: `lint-and-test`, `build-android`, `build-ios`
   - Backend: `lint-and-test`, `build`, `integration-tests`
   - Require branches to be up to date before merging

3. **Additional Rules**
   - Require linear history
   - Include administrators in restrictions
   - Allow force pushes: **disabled**
   - Allow deletions: **disabled**

### Setting Up Branch Protection

1. Go to Settings → Branches
2. Click "Add rule"
3. Enter branch name pattern (e.g., `main`)
4. Enable the following:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
5. Add required status checks from the list above
6. Save changes

## Required Secrets

Configure the following secrets in your GitHub repository (Settings → Secrets and variables → Actions):

### Docker Hub (Backend Deployment)
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password or access token

### Server Deployment
- `DEPLOY_HOST`: Production server hostname/IP
- `DEPLOY_USER`: SSH username
- `DEPLOY_SSH_KEY`: Private SSH key for server access

### Android Deployment
- `ANDROID_KEYSTORE_BASE64`: Base64-encoded release keystore file
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `ANDROID_KEY_ALIAS`: Key alias
- `ANDROID_KEY_PASSWORD`: Key password
- `GOOGLE_PLAY_SERVICE_ACCOUNT`: Google Play service account JSON (plain text)

### iOS Deployment
- `IOS_CERTIFICATES_P12`: Base64-encoded P12 certificate file
- `IOS_CERTIFICATES_PASSWORD`: Certificate password
- `IOS_PROVISIONING_PROFILE_BASE64`: Base64-encoded provisioning profile
- `APPSTORE_ISSUER_ID`: App Store Connect issuer ID
- `APPSTORE_API_KEY_ID`: App Store Connect API key ID
- `APPSTORE_API_PRIVATE_KEY`: App Store Connect API private key

### Codecov (Optional)
- `CODECOV_TOKEN`: Codecov upload token (if repository is private)

### Encoding Secrets

To encode files to base64:

```bash
# For keystore/certificates
base64 -i your-file.keystore -o encoded.txt

# On macOS
base64 -i your-file.keystore -o encoded.txt

# Then copy the contents of encoded.txt to GitHub secrets
```

## Testing and Coverage

### Code Coverage with Codecov

The project is configured to automatically upload test coverage to Codecov:

1. **Configuration**: See `codecov.yml` for coverage targets and rules
2. **Targets**: 80% coverage required for project and patches
3. **Flags**: Separate coverage tracking for `mobile` and `backend`
4. **Comments**: Codecov automatically comments on PRs with coverage changes

### Coverage Reports

Coverage reports are generated during CI runs and include:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

### Running Tests Locally

**Mobile:**
```bash
cd mobile
npm test -- --coverage
```

**Backend:**
```bash
cd backend
npm test -- --coverage
npm run test:integration
```

## Deployment Process

### Backend Deployment Flow

1. **Development**
   - Create feature branch from `develop`
   - Make changes
   - Push to GitHub
   - CI runs automatically

2. **Pull Request**
   - Create PR to `develop`
   - CI checks must pass
   - Code review required
   - Merge to `develop`

3. **Staging/Production**
   - Create PR from `develop` to `main`
   - CI checks must pass
   - Code review required
   - Merge to `main`
   - CD workflow automatically deploys to production

### Mobile App Release Flow

1. **Prepare Release**
   - Update version in `package.json` and native configs
   - Update changelog
   - Create PR to `main`
   - Get approval and merge

2. **Create Release Tag**
   ```bash
   git checkout main
   git pull origin main
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Automated Deployment**
   - CD workflow builds signed apps
   - Android: Uploads to Google Play (internal track)
   - iOS: Uploads to TestFlight
   - Manual promotion to production required

### Manual Deployment Steps

**Backend (if automation fails):**
```bash
cd backend
docker build -t your-username/backend:latest .
docker push your-username/backend:latest

# On production server
ssh user@your-server
cd /app
docker-compose pull backend
docker-compose up -d backend
```

**Android (if automation fails):**
```bash
cd mobile/android
./gradlew bundleRelease
# Upload manually via Google Play Console
```

**iOS (if automation fails):**
```bash
cd mobile/ios
# Use Xcode to archive and upload to App Store Connect
```

## Troubleshooting

### Common Issues

#### 1. Workflow Not Triggering

**Problem**: CI doesn't run on PR
**Solution**: 
- Check that changes are in `mobile/` or `backend/` directories
- Verify branch names match trigger conditions
- Check GitHub Actions is enabled for the repository

#### 2. Build Failures

**Problem**: Android build fails
**Solution**:
- Ensure `gradlew` has execute permissions
- Check Java version compatibility
- Verify Gradle wrapper is present
- Clear Gradle cache and retry

**Problem**: iOS build fails
**Solution**:
- Verify workspace and scheme names
- Check CocoaPods installation
- Ensure Xcode version compatibility

#### 3. Test Failures

**Problem**: Tests fail in CI but pass locally
**Solution**:
- Check Node.js version matches CI (v18)
- Verify all dependencies are in `package.json`
- Check for environment-specific code
- Review test logs in GitHub Actions

#### 4. Docker Build Issues

**Problem**: Docker image build fails
**Solution**:
- Verify `Dockerfile` exists in `backend/`
- Check for syntax errors in `Dockerfile`
- Ensure all required files are copied
- Review build context

#### 5. Deployment Failures

**Problem**: Deployment to server fails
**Solution**:
- Verify SSH credentials are correct
- Check server connectivity
- Ensure docker-compose.yml exists on server
- Review deployment script paths

### Getting Help

1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review workflow run logs in the Actions tab
3. Check secret configuration in repository settings
4. Verify all prerequisites are met
5. Contact the DevOps team

### Debugging Tips

1. **Enable Debug Logging**
   - Add secret `ACTIONS_STEP_DEBUG` with value `true`
   - Add secret `ACTIONS_RUNNER_DEBUG` with value `true`

2. **Run Workflows Locally**
   ```bash
   # Using act (https://github.com/nektos/act)
   act pull_request
   ```

3. **View Detailed Logs**
   - Click on failed workflow run
   - Click on failed job
   - Expand failed step
   - Review detailed error messages

## Best Practices

1. **Keep Workflows Fast**
   - Use caching for dependencies
   - Run jobs in parallel where possible
   - Only run tests relevant to changed code

2. **Security**
   - Never commit secrets to repository
   - Use GitHub Secrets for sensitive data
   - Rotate credentials regularly
   - Limit secret access scope

3. **Maintainability**
   - Keep workflow files organized
   - Add comments for complex logic
   - Use reusable workflows for common tasks
   - Document custom actions

4. **Testing**
   - Write tests before code
   - Maintain high coverage (>80%)
   - Run tests locally before pushing
   - Fix failing tests immediately

5. **Versioning**
   - Use semantic versioning (semver)
   - Tag releases consistently
   - Maintain CHANGELOG.md
   - Document breaking changes

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Native CI/CD Guide](https://reactnative.dev/docs/running-on-device)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Codecov Documentation](https://docs.codecov.com/)
- [Fastlane for Mobile CI/CD](https://fastlane.tools/)

## Changelog

### 2024-09-30
- Initial CI/CD setup
- Added Mobile CI workflow
- Added Backend CI workflow
- Added CD deployment workflow
- Configured Codecov integration
- Created documentation
