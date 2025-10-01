# Quick Start Guide

Get up and running with Kendy MCP Assistant in 5 minutes!

## Prerequisites Check

Make sure you have the following installed:

```bash
# Check Node.js version (should be v16+)
node --version

# Check npm version
npm --version

# Check Git
git --version
```

## Installation

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/phuhokhongtien/GitHub.git
cd GitHub

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

### 3. Run on Your Device

Choose one of these options:

**Option A: Physical Device**
- Install Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Scan the QR code from the terminal

**Option B: iOS Simulator (macOS only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

**Option D: Web Browser**
```bash
npm run web
```

## Verify Installation

If everything is set up correctly, you should see:
- ✅ The app launches without errors
- ✅ "Kendy MCP Assistant" title is displayed
- ✅ Welcome message appears

## Next Steps

1. 📖 Read the [README](README.md) for a complete overview
2. 🏗️ Check out the [Architecture](docs/ARCHITECTURE.md) documentation
3. 🤝 Review the [Contributing Guidelines](CONTRIBUTING.md)
4. 💻 Start coding!

## Common Issues

### "npm install" fails
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Metro bundler issues
```bash
# Clear Metro cache
npm start -- --clear
```

### Port already in use
```bash
# Kill process on port 19000
lsof -ti:19000 | xargs kill -9
npm start
```

## Getting Help

- 📝 [Full Setup Guide](docs/SETUP.md)
- 🐛 [Report Issues](https://github.com/phuhokhongtien/GitHub/issues)
- 💬 [Discussions](https://github.com/phuhokhongtien/GitHub/discussions)

---

Happy coding! 🚀
