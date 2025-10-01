# Setup Guide

This guide will help you set up the Kendy MCP Assistant development environment.

## Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   ```bash
   node --version  # Should be v16.x or higher
   ```

2. **npm or yarn**
   ```bash
   npm --version   # Should be 8.x or higher
   ```

3. **Git**
   ```bash
   git --version
   ```

4. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

### Platform-Specific Requirements

#### iOS Development (macOS only)

1. **Xcode** (latest version from Mac App Store)
2. **Xcode Command Line Tools**
   ```bash
   xcode-select --install
   ```
3. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

#### Android Development

1. **Android Studio** (latest version)
2. **Android SDK** (API level 29 or higher)
3. **Android Emulator** or physical device

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/phuhokhongtien/GitHub.git
cd GitHub
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the project root (optional):

```env
API_URL=https://api.example.com
API_KEY=your_api_key_here
```

### 4. Start Development Server

```bash
npm start
# or
yarn start
```

## Running on Different Platforms

### iOS Simulator (macOS only)

```bash
npm run ios
# or
yarn ios
```

### Android Emulator

```bash
npm run android
# or
yarn android
```

### Web Browser

```bash
npm run web
# or
yarn web
```

### Physical Device

1. Install **Expo Go** app on your device
2. Scan the QR code displayed in the terminal

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in the `src/` directory

### 3. Test Your Changes

```bash
npm test
npm run lint
npm run type-check
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## Troubleshooting

### Common Issues

#### Node modules issues

```bash
rm -rf node_modules package-lock.json
npm install
```

#### Metro bundler cache issues

```bash
npm start -- --clear
```

#### iOS build issues

```bash
cd ios
pod install
cd ..
npm run ios
```

#### Android build issues

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Getting Help

- Check the [GitHub Issues](https://github.com/phuhokhongtien/GitHub/issues)
- Review the [Contributing Guide](../CONTRIBUTING.md)
- Ask in project discussions

## Next Steps

- Read the [Architecture Overview](ARCHITECTURE.md)
- Review the [Contributing Guidelines](../CONTRIBUTING.md)
- Check out the [Code of Conduct](../CODE_OF_CONDUCT.md)

---

Happy coding! 🚀
