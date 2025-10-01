# Troubleshooting Guide

This guide helps you resolve common issues encountered during development setup and daily work.

## Table of Contents
- [Node.js and npm Issues](#nodejs-and-npm-issues)
- [React Native Issues](#react-native-issues)
- [Backend Issues](#backend-issues)
- [Docker Issues](#docker-issues)
- [iOS-Specific Issues](#ios-specific-issues)
- [Android-Specific Issues](#android-specific-issues)
- [VS Code Issues](#vs-code-issues)
- [Git Issues](#git-issues)

## Node.js and npm Issues

### Issue: `npm install` fails with permission errors

**Solution:**
```bash
# Don't use sudo! Fix npm permissions instead
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Issue: `EACCES` permission error when installing packages globally

**Solution:**
```bash
# Change npm's default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

### Issue: Module not found errors after installing dependencies

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear watchman (if using React Native)
watchman watch-del-all
```

### Issue: Different Node.js versions causing issues

**Solution:**
Use nvm (Node Version Manager):
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use specific Node version
nvm install 18
nvm use 18
nvm alias default 18
```

## React Native Issues

### Issue: Metro bundler won't start

**Solutions:**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Or clear watchman
watchman watch-del-all

# Clear all caches
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
npm start -- --reset-cache
```

### Issue: "Unable to resolve module" errors

**Solutions:**
```bash
# Step 1: Clear caches
npm start -- --reset-cache
watchman watch-del-all

# Step 2: Reinstall dependencies
rm -rf node_modules
npm install

# Step 3: Clear Metro bundler cache
rm -rf /tmp/metro-*
```

### Issue: App builds but crashes immediately

**Solutions:**
1. Check native logs:
   ```bash
   # iOS
   npx react-native log-ios
   
   # Android
   npx react-native log-android
   ```

2. Clear build folders:
   ```bash
   # iOS
   cd ios && rm -rf build && cd ..
   
   # Android
   cd android && ./gradlew clean && cd ..
   ```

### Issue: Changes not reflecting in the app

**Solutions:**
1. Enable Fast Refresh (should be enabled by default)
2. Force reload: Press `r` in Metro bundler
3. Restart bundler with cache clear:
   ```bash
   npm start -- --reset-cache
   ```

## Backend Issues

### Issue: Backend won't start - "Port already in use"

**Solution:**
```bash
# Find and kill process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Database connection errors

**Solutions:**
1. Verify Docker containers are running:
   ```bash
   docker ps
   ```

2. Check database credentials in `.env` file

3. Restart database container:
   ```bash
   docker-compose restart postgres
   ```

4. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

### Issue: Migration errors

**Solutions:**
```bash
# Reset database (WARNING: destroys data)
npm run db:reset

# Or manually in PostgreSQL
docker exec -it github_postgres psql -U postgres -d github_db
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
\q
```

## Docker Issues

### Issue: Docker daemon not running

**Solution:**
- **macOS/Windows**: Start Docker Desktop application
- **Linux**: 
  ```bash
  sudo systemctl start docker
  ```

### Issue: "Cannot connect to Docker daemon"

**Solutions:**
```bash
# Check Docker status
docker info

# Restart Docker service (Linux)
sudo systemctl restart docker

# Restart Docker Desktop (macOS/Windows)
# - Quit Docker Desktop
# - Start Docker Desktop again
```

### Issue: Port conflicts

**Solution:**
Change ports in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Use different host port
```

### Issue: Volume permission errors

**Solution:**
```bash
# Remove volumes and recreate
docker-compose down -v
docker-compose up -d
```

### Issue: Out of disk space

**Solutions:**
```bash
# Remove unused containers, images, and volumes
docker system prune -a --volumes

# Check disk usage
docker system df
```

## iOS-Specific Issues

### Issue: CocoaPods installation fails

**Solutions:**
```bash
# Update CocoaPods
sudo gem install cocoapods

# Clear CocoaPods cache
pod cache clean --all

# Reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Issue: "xcodebuild" command not found

**Solution:**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Set Xcode path
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### Issue: Build fails with code signing errors

**Solutions:**
1. Open `ios/<ProjectName>.xcworkspace` in Xcode
2. Select your project in the navigator
3. Go to "Signing & Capabilities"
4. Uncheck "Automatically manage signing"
5. Then check it again
6. Select your development team

### Issue: Simulator not starting

**Solutions:**
```bash
# List available simulators
xcrun simctl list devices

# Erase simulator
xcrun simctl erase all

# Kill all simulator processes
killall Simulator
```

## Android-Specific Issues

### Issue: Gradle build fails

**Solutions:**
```bash
# Clean Gradle cache
cd android
./gradlew clean
./gradlew --stop
cd ..

# Clear Gradle cache globally
rm -rf ~/.gradle/caches/
```

### Issue: SDK location not found

**Solution:**
Create `android/local.properties`:
```properties
sdk.dir=/Users/YourName/Library/Android/sdk  # macOS
sdk.dir=/home/YourName/Android/Sdk           # Linux
sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk  # Windows
```

### Issue: Emulator won't start

**Solutions:**
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_5_API_33

# If that fails, open Android Studio and start from AVD Manager
```

### Issue: "Unable to load script" error

**Solutions:**
```bash
# Create assets directory if missing
mkdir -p android/app/src/main/assets

# Bundle JavaScript manually
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

### Issue: Debug build installs but release build fails

**Solution:**
Check ProGuard/R8 configuration in `android/app/build.gradle`:
```gradle
buildTypes {
    release {
        minifyEnabled false
        shrinkResources false
    }
}
```

## VS Code Issues

### Issue: ESLint or Prettier not working

**Solutions:**
1. Install recommended extensions (CMD/CTRL + SHIFT + P → "Extensions: Show Recommended Extensions")
2. Reload VS Code window (CMD/CTRL + SHIFT + P → "Reload Window")
3. Check workspace settings in `.vscode/settings.json`

### Issue: IntelliSense not working

**Solutions:**
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Restart VS Code
3. Run "TypeScript: Restart TS Server" from command palette

### Issue: Debugger not attaching

**Solutions:**
1. Check React Native Tools extension is installed
2. Ensure Metro bundler is running
3. Try restarting VS Code
4. Check `.vscode/launch.json` configuration

## Git Issues

### Issue: Merge conflicts

**Solution:**
```bash
# See conflicted files
git status

# For simple cases, accept one version
git checkout --ours <file>    # Keep your changes
git checkout --theirs <file>  # Keep incoming changes

# Or manually resolve and:
git add <file>
git commit
```

### Issue: Accidentally committed large files or secrets

**Solution:**
```bash
# Remove from latest commit (before push)
git rm --cached <file>
git commit --amend

# If already pushed, use git-filter-branch or BFG Repo-Cleaner
# (Consult with team lead first!)
```

### Issue: Can't push - repository diverged

**Solution:**
```bash
# Pull with rebase
git pull --rebase origin main

# Resolve conflicts if any
# Then push
git push
```

## Still Having Issues?

If you're still experiencing problems:

1. **Check the logs**: Most tools provide detailed error logs
2. **Search for the error**: Copy the error message and search online
3. **Ask the team**: Reach out on your team's communication channel
4. **Check official documentation**: Links in [dev-setup.md](./dev-setup.md)
5. **Create an issue**: Document the problem for the team

## Useful Commands Reference

```bash
# Clean everything and start fresh
npm run clean
npm install
npm run setup

# Check environment
node --version
npm --version
docker --version
git --version

# Backend specific
npm run docker:up        # Start services
npm run dev:backend      # Start backend

# App specific
npm run dev:app          # Start app
npm run ios             # Run on iOS
npm run android         # Run on Android

# Maintenance
npm run lint            # Check code style
npm test                # Run tests
```
