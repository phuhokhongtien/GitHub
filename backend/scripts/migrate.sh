#!/bin/bash

# Database Migration Script
# This script helps set up and manage database migrations

set -e

echo "🗄️  Database Migration Script"
echo "=============================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your configuration."
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run prisma:generate
echo "✅ Prisma Client generated"
echo ""

# Run migrations
echo "🚀 Running database migrations..."
npm run prisma:migrate
echo ""

echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start the development server: npm run dev"
echo "  2. Check health endpoint: curl http://localhost:3000/api/health"
echo ""
