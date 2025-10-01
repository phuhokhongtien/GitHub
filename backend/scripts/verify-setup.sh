#!/bin/bash

echo "🔍 Verifying Backend Setup..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi
echo "✅ Docker is running"

# Check if containers are running
POSTGRES_RUNNING=$(docker ps --filter "name=kendy-postgres" --format "{{.Names}}" 2>/dev/null)
REDIS_RUNNING=$(docker ps --filter "name=kendy-redis" --format "{{.Names}}" 2>/dev/null)

if [ -z "$POSTGRES_RUNNING" ]; then
    echo "❌ PostgreSQL container is not running"
    echo "   Run: make dev-up"
    exit 1
fi
echo "✅ PostgreSQL container is running"

if [ -z "$REDIS_RUNNING" ]; then
    echo "❌ Redis container is not running"
    echo "   Run: make dev-up"
    exit 1
fi
echo "✅ Redis container is running"

# Check PostgreSQL connection
if docker exec kendy-postgres pg_isready -U kendy_user > /dev/null 2>&1; then
    echo "✅ PostgreSQL is accepting connections"
else
    echo "❌ PostgreSQL is not accepting connections"
    exit 1
fi

# Check Redis connection
if docker exec kendy-redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is accepting connections"
else
    echo "❌ Redis is not accepting connections"
    exit 1
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ Node dependencies are installed"
else
    echo "⚠️  Node dependencies not installed"
    echo "   Run: npm install"
fi

# Check if TypeScript compiles
if [ -d "node_modules" ]; then
    if npm run build > /dev/null 2>&1; then
        echo "✅ TypeScript code compiles successfully"
    else
        echo "⚠️  TypeScript compilation has issues"
        echo "   Run: npm run build"
    fi
fi

echo ""
echo "🎉 Setup verification complete!"
echo ""
echo "Next steps:"
echo "  1. Start the development server: npm run dev"
echo "  2. Test the health endpoint: curl http://localhost:3000/api/health"
echo ""
