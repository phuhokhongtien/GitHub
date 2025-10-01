# CI/CD Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipelines configured for this project.

## Overview

The project uses GitHub Actions for automated CI/CD workflows covering both the mobile application (React Native) and backend API. The workflows are designed to ensure code quality, run automated tests, and deploy artifacts automatically.

## Workflow Structure

### Mobile CI/CD Pipeline (`mobile-ci-cd.yml`)

**Triggers:**
- Pull requests affecting `mobile/**` directory
- Pushes to `main` and `develop` branches affecting `mobile/**` directory

**Jobs:**

#### 1. Lint
- Runs ESLint to check code style and potential errors
- Runs Prettier to ensure consistent code formatting
- **Requirements:** `npm run lint` and `npm run format:check` scripts in `mobile/package.json`

#### 2. Type Check
- Runs TypeScript compiler to verify type safety
- **Requirements:** `npm run typecheck` script in `mobile/package.json`

#### 3. Test
- Runs unit tests with coverage reporting
- Uploads coverage reports to Codecov
- **Requirements:** 
  - `npm run test` script in `mobile/package.json`
  - Jest configured to generate coverage reports

#### 4. Build Android
- **Triggered:** Only on push to `main` or `develop` branches
- **Dependencies:** Requires lint, typecheck, and test jobs to pass
- Builds Android APK using Gradle
- Uploads APK artifacts (retained for 30 days)
- **Requirements:**
  - Android project structure in `mobile/android/`
  - Gradle wrapper configured

#### 5. Build iOS
- **Triggered:** Only on push to `main` or `develop` branches
- **Dependencies:** Requires lint, typecheck, and test jobs to pass
- Builds iOS application using Xcode
- Uploads iOS archive artifacts (retained for 30 days)
- **Requirements:**
  - iOS project structure in `mobile/ios/`
  - Xcode workspace configured
  - Note: Update workspace/scheme names in workflow

### Backend CI/CD Pipeline (`backend-ci-cd.yml`)

**Triggers:**
- Pull requests affecting `backend/**` directory
- Pushes to `main` and `develop` branches affecting `backend/**` directory

**Jobs:**

#### 1. Lint
- Runs ESLint to check code style and potential errors
- Runs Prettier to ensure consistent code formatting
- **Requirements:** `npm run lint` and `npm run format:check` scripts in `backend/package.json`

#### 2. Type Check
- Runs TypeScript compiler to verify type safety
- **Requirements:** `npm run typecheck` script in `backend/package.json`

#### 3. Test
- Runs unit tests with coverage reporting
- Uploads coverage reports to Codecov
- **Requirements:**
  - `npm run test` script in `backend/package.json`
  - Jest configured to generate coverage reports

#### 4. Build
- **Dependencies:** Requires lint, typecheck, and test jobs to pass
- Builds the backend application
- Uploads build artifacts (retained for 7 days)
- **Requirements:** `npm run build` script in `backend/package.json`

#### 5. Docker Build and Push
- **Triggered:** Only on push to `main` or `develop` branches
- **Dependencies:** Requires build job to pass
- Builds Docker image for the backend
- Pushes image to GitHub Container Registry (ghcr.io)
- Tags images with branch name, commit SHA, and `latest` for main branch
- **Requirements:**
  - Dockerfile in `backend/` directory
  - No additional secrets needed (uses `GITHUB_TOKEN`)

## Code Coverage

### Codecov Integration

The project uses Codecov for tracking test coverage across both mobile and backend codebases.

**Configuration:** `.github/codecov.yml`

**Coverage Targets:**
- Project coverage: 80% (with 2% threshold)
- Patch coverage: 80% (with 2% threshold)

**Flags:**
- `mobile`: Tracks mobile app coverage
- `backend`: Tracks backend API coverage

**Setup:**
1. Sign up at [codecov.io](https://codecov.io)
2. Connect your GitHub repository
3. Coverage reports are automatically uploaded by CI workflows
4. No additional secrets required for public repositories

### Coverage Reports

Coverage reports are:
- Generated during test execution
- Uploaded to Codecov automatically
- Displayed on pull requests as status checks
- Available for review on the Codecov dashboard

## Branch Protection

### Recommended Settings

To ensure code quality and enforce CI checks, configure branch protection rules for `main` and `develop` branches:

1. Navigate to: **Repository Settings** → **Branches** → **Add rule**

2. **Branch name pattern:** `main` (repeat for `develop`)

3. **Protect matching branches:**
   - ✅ Require a pull request before merging
     - ✅ Require approvals (recommended: 1-2)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - **Required status checks:**
       - Mobile CI/CD:
         - `Lint Mobile Code`
         - `TypeScript Type Check`
         - `Unit Tests`
       - Backend CI/CD:
         - `Lint Backend Code`
         - `TypeScript Type Check`
         - `Unit Tests`
   - ✅ Require conversation resolution before merging
   - ✅ Include administrators (optional but recommended)

## Pull Request Template

A PR template is configured at `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md` to standardize pull request descriptions.

**Template includes:**
- Description of changes
- Type of change
- Related issues
- Testing checklist
- Code review checklist

## Required Package.json Scripts

### Mobile (`mobile/package.json`)

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format:check": "prettier --check '**/*.{js,jsx,ts,tsx,json,css,md}'",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "android": "react-native run-android",
    "ios": "react-native run-ios"
  }
}
```

### Backend (`backend/package.json`)

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts",
    "format:check": "prettier --check '**/*.{js,ts,json,md}'",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}
```

## Docker Configuration

### Backend Dockerfile Example

Create a `backend/Dockerfile`:

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

CMD ["node", "dist/index.js"]
```

## Artifact Access

### Mobile Artifacts

**Android APKs:**
- Available from the "Actions" tab
- Navigate to the successful workflow run
- Download from "Artifacts" section
- Retained for 30 days

**iOS Archives:**
- Available from the "Actions" tab
- Navigate to the successful workflow run
- Download from "Artifacts" section
- Retained for 30 days

### Backend Artifacts

**Build Output:**
- Available from the "Actions" tab
- Retained for 7 days

**Docker Images:**
- Pushed to GitHub Container Registry
- Available at: `ghcr.io/<owner>/<repo>/backend:<tag>`
- Pull with: `docker pull ghcr.io/<owner>/<repo>/backend:latest`

## Environment Variables and Secrets

### Current Configuration

The workflows use:
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
- No additional secrets required for basic functionality

### Future Considerations

When deploying to production, you may need to add:

**Mobile:**
- `ANDROID_KEYSTORE`: Android signing keystore (base64 encoded)
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `IOS_CERTIFICATE`: iOS signing certificate
- `IOS_PROVISIONING_PROFILE`: iOS provisioning profile

**Backend:**
- `DEPLOY_TOKEN`: For deployment to hosting services
- `DATABASE_URL`: Database connection string (for integration tests)
- `API_KEYS`: Third-party service credentials

**Add secrets at:** Repository Settings → Secrets and variables → Actions

## Troubleshooting

### Common Issues

#### 1. Workflow Not Triggering
- Verify file paths in `paths` filters match your directory structure
- Ensure changes are in the correct branch

#### 2. Test Failures
- Run tests locally first: `npm test`
- Check Node.js version matches workflow (currently 18.x)
- Verify all dependencies are in `package.json`

#### 3. Build Failures

**Android:**
- Ensure Gradle wrapper is committed
- Check Java version compatibility (currently 17)
- Verify Android SDK requirements

**iOS:**
- Update workspace/scheme names in workflow
- Ensure CocoaPods dependencies are specified

**Backend Docker:**
- Test Dockerfile locally: `docker build -t backend .`
- Verify all source files are copied correctly
- Check for missing dependencies

#### 4. Coverage Upload Issues
- Verify Jest is configured to output coverage
- Check coverage file paths in workflow
- Ensure codecov.io repository is configured

### Getting Help

1. Check workflow run logs in the "Actions" tab
2. Review job output for specific error messages
3. Verify local builds succeed before pushing
4. Consult GitHub Actions documentation

## Best Practices

1. **Run checks locally:** Before pushing, run lint, typecheck, and tests
2. **Keep dependencies updated:** Regularly update workflow actions
3. **Monitor coverage trends:** Use Codecov dashboard to track coverage
4. **Review artifacts:** Verify build artifacts work as expected
5. **Small, focused PRs:** Easier to review and less likely to fail CI
6. **Clear commit messages:** Help identify issues in workflow runs
7. **Fix broken builds quickly:** Don't let CI stay red

## Maintenance

### Updating Workflows

When modifying workflows:
1. Test changes in a feature branch first
2. Review workflow syntax with GitHub Actions validator
3. Monitor first runs after changes
4. Update this documentation accordingly

### Updating Dependencies

**GitHub Actions:**
- Use Dependabot to keep actions up to date
- Review changelogs before upgrading major versions

**Node.js Version:**
- Update `NODE_VERSION` environment variable in both workflows
- Test locally with new version first

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Native Documentation](https://reactnative.dev/)
- [Codecov Documentation](https://docs.codecov.com/)
- [Docker Documentation](https://docs.docker.com/)
