# Quick Start Guide

Get up and running in 5 minutes! 🚀

## Prerequisites Check

Before you start, make sure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Docker Desktop running (`docker --version`)
- ✅ Git installed (`git --version`)

## 5-Minute Setup

### 1. Clone & Install (2 min)
```bash
git clone https://github.com/phuhokhongtien/GitHub.git
cd GitHub
npm install
npm run setup
```

### 2. Configure Environment (1 min)
```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp app/.env.example app/.env

# Edit if needed (default values work for local development)
```

### 3. Start Services (1 min)
```bash
# Start database and cache
npm run docker:up

# Wait ~30 seconds for services to be ready
```

### 4. Start Development (1 min)
```bash
# Start backend and app together
npm run dev

# Or start them separately:
npm run dev:backend  # Terminal 1
npm run dev:app      # Terminal 2
```

### 5. Run Mobile App
```bash
# In a new terminal
cd app

# For iOS (macOS only)
npm run ios

# For Android
npm run android
```

## Verify Everything Works

- **Backend**: Visit http://localhost:3000
- **Mobile App**: Check your simulator/emulator
- **Database**: Should be accessible on localhost:5432
- **Redis**: Should be accessible on localhost:6379

## Common Commands

```bash
# Development
npm run dev              # Start everything
npm run docker:up        # Start services
npm run docker:down      # Stop services

# Testing
npm test                 # Run all tests
npm run lint             # Check code style

# Cleanup
npm run clean            # Remove node_modules and build files
```

## Need Help?

- **Setup Issues?** → See [Development Setup Guide](./dev-setup.md)
- **Errors?** → Check [Troubleshooting Guide](./troubleshooting.md)
- **Questions?** → Create an issue or ask the team

## Next Steps

1. ✅ You're all set! Start coding
2. 📚 Read the full [Development Setup Guide](./dev-setup.md)
3. 🐛 Bookmark the [Troubleshooting Guide](./troubleshooting.md)
4. 🔧 Configure VS Code (it will prompt you to install recommended extensions)

---

**Pro Tip**: Run `npm run docker:up` once in the morning, and you're good for the day! The services will keep running in the background.
