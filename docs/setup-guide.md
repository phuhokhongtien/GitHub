# Quick Setup Guide

This guide helps you get started with the CI/CD pipeline.

## Initial Repository Setup

### 1. Enable GitHub Actions

GitHub Actions should be enabled by default. Verify at:
**Settings** → **Actions** → **General** → Allow all actions

### 2. Configure Branch Protection

Follow the detailed instructions in [ci-cd.md](ci-cd.md#branch-protection) to set up branch protection rules for `main` and `develop` branches.

**Quick checklist:**
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date

### 3. Set Up Codecov

1. Visit [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Enable Codecov for this repository
4. No additional configuration needed (uses `.github/codecov.yml`)

### 4. Prepare Your Codebase

#### For Mobile Development

Create a `mobile/` directory with React Native project:

```bash
# Initialize React Native project
npx react-native init YourApp
mv YourApp mobile

# Add required scripts to mobile/package.json
```

Required scripts in `mobile/package.json`:
```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format:check": "prettier --check '**/*.{js,jsx,ts,tsx,json,css,md}'",
    "typecheck": "tsc --noEmit",
    "test": "jest --coverage"
  }
}
```

See [examples/mobile-package.json](examples/mobile-package.json) for a complete example.

#### For Backend Development

Create a `backend/` directory with Node.js/TypeScript project:

```bash
# Create backend directory
mkdir backend
cd backend
npm init -y

# Install TypeScript and dependencies
npm install --save-dev typescript @types/node
npm install express

# Initialize TypeScript
npx tsc --init
```

Required scripts in `backend/package.json`:
```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts",
    "format:check": "prettier --check '**/*.{js,ts,json,md}'",
    "typecheck": "tsc --noEmit",
    "test": "jest --coverage",
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}
```

See [examples/backend-package.json](examples/backend-package.json) for a complete example.

Create `backend/Dockerfile` (see [examples/backend-Dockerfile](examples/backend-Dockerfile) for full example):
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

### 5. Update Workflow Configuration

#### Mobile Workflow

If your iOS app name is different from "YourApp", update `.github/workflows/mobile-ci-cd.yml`:

```yaml
# Find and replace YourApp with your actual app name
- name: Build iOS
  working-directory: mobile/ios
  run: |
    xcodebuild -workspace YourAppName.xcworkspace \
      -scheme YourAppName \
      ...
```

### 6. Test Your Setup

1. Create a feature branch:
   ```bash
   git checkout -b feature/test-ci
   ```

2. Make a small change to mobile or backend code

3. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify CI/CD setup"
   git push origin feature/test-ci
   ```

4. Open a pull request and verify:
   - Lint job passes ✓
   - Type check job passes ✓
   - Test job passes ✓
   - Coverage report appears on PR

### 7. Configure Secrets (Optional)

For production deployments, you may need to add secrets:

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Common secrets:
- `ANDROID_KEYSTORE`: Base64 encoded Android keystore
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `IOS_CERTIFICATE`: iOS signing certificate
- `IOS_PROVISIONING_PROFILE`: iOS provisioning profile

## Troubleshooting

### Workflow Not Running

**Problem:** Push to branch but workflow doesn't start

**Solutions:**
1. Check if changes affect `mobile/**` or `backend/**` directories
2. Verify GitHub Actions are enabled
3. Check workflow file syntax with YAML validator

### Coverage Not Uploading

**Problem:** Coverage report not appearing on Codecov

**Solutions:**
1. Verify Codecov is enabled for repository
2. Check Jest is configured to generate coverage
3. Ensure coverage directory matches workflow path

### Build Failures

**Problem:** Jobs fail in CI but work locally

**Solutions:**
1. Check Node.js version matches (18.x)
2. Verify all dependencies are in `package.json`
3. Run `npm ci` locally instead of `npm install`
4. Check for platform-specific issues

## Next Steps

1. Review [CI/CD documentation](ci-cd.md) for complete details
2. Set up branch protection rules
3. Configure Codecov
4. Create your first pull request
5. Monitor CI/CD runs and adjust as needed

## Support

For issues or questions:
1. Check workflow logs in Actions tab
2. Review documentation
3. Create an issue with relevant logs
