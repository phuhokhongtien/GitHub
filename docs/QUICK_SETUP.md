# Quick Setup Guide

This guide will help you quickly set up your project with the CI/CD pipeline.

## Prerequisites

- Node.js 18+
- Git
- Docker (for backend)
- Xcode (for iOS development)
- Android Studio (for Android development)

## Step 1: Create Your Project Structure

### Option A: Start from Scratch

1. **Create Mobile App**:
   ```bash
   npx react-native init mobile --template react-native-template-typescript
   cd mobile
   # Copy example files
   cp ../examples/mobile/.env.example .env
   cp ../examples/mobile/package.json.example package.json
   npm install
   ```

2. **Create Backend API**:
   ```bash
   mkdir -p backend/src
   cd backend
   # Copy example files
   cp ../examples/backend/.env.example .env
   cp ../examples/backend/package.json.example package.json
   cp ../examples/backend/Dockerfile.example Dockerfile
   cp ../examples/backend/docker-compose.yml.example docker-compose.yml
   npm install
   ```

### Option B: Use Existing Projects

1. **Move existing mobile app** to `mobile/` directory
2. **Move existing backend** to `backend/` directory
3. **Update package.json** in each project to include required scripts:

   Mobile scripts (required):
   ```json
   "scripts": {
     "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
     "type-check": "tsc --noEmit",
     "test": "jest"
   }
   ```

   Backend scripts (required):
   ```json
   "scripts": {
     "lint": "eslint . --ext .js,.ts",
     "type-check": "tsc --noEmit",
     "test": "jest",
     "test:integration": "jest --testPathPattern=integration"
   }
   ```

## Step 2: Configure GitHub Secrets

Go to your repository Settings → Secrets and variables → Actions, and add:

### Essential Secrets (Start with these)

```
# For Docker deployment (if using)
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password-or-token

# For server deployment (if using)
DEPLOY_HOST=your-server-ip
DEPLOY_USER=your-ssh-user
DEPLOY_SSH_KEY=your-private-ssh-key
```

### Mobile Deployment Secrets (Add later when ready to deploy)

<details>
<summary>Android Secrets</summary>

```
ANDROID_KEYSTORE_BASE64=base64-encoded-keystore
ANDROID_KEYSTORE_PASSWORD=your-keystore-password
ANDROID_KEY_ALIAS=your-key-alias
ANDROID_KEY_PASSWORD=your-key-password
GOOGLE_PLAY_SERVICE_ACCOUNT=service-account-json
```

To create Android keystore:
```bash
keytool -genkey -v -keystore release.keystore -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
base64 -i release.keystore > keystore.base64.txt
```
</details>

<details>
<summary>iOS Secrets</summary>

```
IOS_CERTIFICATES_P12=base64-encoded-p12-certificate
IOS_CERTIFICATES_PASSWORD=certificate-password
IOS_PROVISIONING_PROFILE_BASE64=base64-encoded-provisioning-profile
APPSTORE_ISSUER_ID=app-store-connect-issuer-id
APPSTORE_API_KEY_ID=app-store-connect-api-key-id
APPSTORE_API_PRIVATE_KEY=app-store-connect-api-private-key
```
</details>

## Step 3: Update Workflow Files

### Mobile Workflow Updates

Edit `.github/workflows/mobile-ci.yml` and `.github/workflows/cd-deploy.yml`:

1. **Replace app name**:
   - Find: `YourApp`
   - Replace with: Your actual app name

2. **Update iOS workspace** (if different):
   ```yaml
   # Find this line:
   xcodebuild -workspace YourApp.xcworkspace
   # Update to match your workspace name
   ```

3. **Update Android package name** (for deployment):
   ```yaml
   # In cd-deploy.yml:
   packageName: com.yourapp  # Change to your package
   ```

### Backend Workflow Updates

Edit `.github/workflows/backend-ci.yml` and `.github/workflows/cd-deploy.yml`:

1. **Update Docker image name**:
   ```yaml
   # Find:
   images: ${{ secrets.DOCKER_USERNAME }}/backend
   # Optionally change 'backend' to your preferred name
   ```

2. **Update deployment path** (if different):
   ```yaml
   # In cd-deploy.yml, find:
   script: |
     cd /app  # Change if your app is in a different directory
   ```

## Step 4: Configure Codecov (Optional)

1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Add your repository
4. Copy the upload token
5. Add to GitHub Secrets as `CODECOV_TOKEN` (only needed for private repos)

## Step 5: Set Up Branch Protection

1. Go to repository Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
5. Select status checks:
   - `lint-and-test` (for both mobile and backend)
   - `build-android`
   - `build-ios`
   - `build` (backend)
   - `integration-tests`
6. Save changes
7. Repeat for `develop` branch

## Step 6: Test the CI/CD Pipeline

### Test Mobile CI

1. Make a small change in `mobile/` directory:
   ```bash
   git checkout -b test/mobile-ci
   echo "// Test comment" >> mobile/App.tsx
   git add mobile/App.tsx
   git commit -m "test: trigger mobile CI"
   git push origin test/mobile-ci
   ```

2. Create a Pull Request
3. Check Actions tab to see workflows running
4. Verify all checks pass

### Test Backend CI

1. Make a small change in `backend/` directory:
   ```bash
   git checkout -b test/backend-ci
   echo "// Test comment" >> backend/src/index.ts
   git add backend/src/index.ts
   git commit -m "test: trigger backend CI"
   git push origin test/backend-ci
   ```

2. Create a Pull Request
3. Check Actions tab
4. Verify all checks pass

## Step 7: First Deployment

### Backend Deployment

1. Merge your PR to `main` branch
2. CI/CD will automatically:
   - Build Docker image
   - Push to Docker Hub
   - Deploy to your server (if configured)

### Mobile App Deployment

1. Update version numbers:
   ```bash
   # In mobile/package.json
   "version": "1.0.0"
   
   # In mobile/android/app/build.gradle
   versionCode 1
   versionName "1.0.0"
   
   # In mobile/ios/YourApp/Info.plist
   CFBundleShortVersionString: 1.0.0
   CFBundleVersion: 1
   ```

2. Create and push a version tag:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. CI/CD will automatically:
   - Build signed apps
   - Upload to Google Play (internal track)
   - Upload to TestFlight

## Common Issues and Solutions

### Issue: Workflow doesn't trigger

**Solution**: 
- Ensure changes are in `mobile/` or `backend/` directories
- Check that you're pushing to `main` or `develop` branch
- Verify GitHub Actions is enabled

### Issue: Mobile build fails - Gradle

**Solution**:
```bash
cd mobile/android
chmod +x gradlew
./gradlew clean
```

### Issue: Mobile build fails - CocoaPods

**Solution**:
```bash
cd mobile/ios
pod deintegrate
pod install
```

### Issue: Tests fail in CI but pass locally

**Solution**:
- Check Node.js version (should be 18)
- Verify all dependencies are in package.json
- Check for environment-specific code

### Issue: Docker build fails

**Solution**:
- Ensure Dockerfile exists in backend/
- Check that all source files are copied
- Verify .dockerignore doesn't exclude necessary files

## Next Steps

1. **Write Tests**: Add comprehensive test coverage
2. **Add Documentation**: Document your API and app features
3. **Set Up Monitoring**: Configure error tracking (Sentry, etc.)
4. **Enable Notifications**: Set up Slack/email notifications for deployments
5. **Optimize Builds**: Add caching for faster builds
6. **Set Up Staging**: Create a staging environment

## Getting Help

- 📖 Read [CI/CD Documentation](ci-cd.md)
- 📖 Check [Project Structure Guide](project-structure.md)
- 📖 Review [Contributing Guide](../CONTRIBUTING.md)
- 🐛 [Report an issue](https://github.com/phuhokhongtien/GitHub/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/phuhokhongtien/GitHub/issues/new?template=feature_request.md)

## Checklist

Use this checklist to track your setup progress:

- [ ] Created mobile/ directory with React Native app
- [ ] Created backend/ directory with Node.js API
- [ ] Added required npm scripts to both projects
- [ ] Created .env files from examples
- [ ] Configured GitHub secrets for deployment
- [ ] Updated workflow files with actual app names
- [ ] Set up branch protection rules
- [ ] Configured Codecov (optional)
- [ ] Tested mobile CI with a test PR
- [ ] Tested backend CI with a test PR
- [ ] Successfully deployed backend to production
- [ ] Successfully deployed mobile app to stores
- [ ] Added comprehensive tests
- [ ] Updated documentation

---

**Congratulations!** 🎉 Your CI/CD pipeline is now set up and ready to use!
