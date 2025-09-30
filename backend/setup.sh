#!/bin/bash

# Backend Setup Script
echo "🚀 Starting Backend Setup..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run prisma:generate

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your database and Redis configuration"
echo "2. Start PostgreSQL and Redis (or use docker-compose up -d postgres redis)"
echo "3. Run migrations: npm run prisma:migrate"
echo "4. Start development server: npm run dev"
echo ""
echo "Or use Docker Compose to start everything:"
echo "   docker-compose up -d"
