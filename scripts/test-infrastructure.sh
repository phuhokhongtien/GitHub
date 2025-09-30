#!/bin/bash

# Test script to verify backend infrastructure setup

set -e

echo "🧪 Testing Backend Infrastructure"
echo "=================================="
echo ""

echo "1️⃣  Checking Docker services..."
if docker compose ps | grep -q "healthy"; then
    echo "   ✅ Docker services are healthy"
else
    echo "   ❌ Docker services are not healthy"
    exit 1
fi
echo ""

echo "2️⃣  Testing PostgreSQL connection..."
if docker compose exec -T postgres psql -U postgres -d kendy_mcp -c "SELECT 1;" > /dev/null 2>&1; then
    echo "   ✅ PostgreSQL is accessible"
else
    echo "   ❌ PostgreSQL connection failed"
    exit 1
fi
echo ""

echo "3️⃣  Testing Redis connection..."
if docker compose exec -T redis redis-cli ping | grep -q "PONG"; then
    echo "   ✅ Redis is accessible"
else
    echo "   ❌ Redis connection failed"
    exit 1
fi
echo ""

echo "4️⃣  Checking backend dependencies..."
if [ -d "backend/node_modules" ]; then
    echo "   ✅ Backend dependencies installed"
else
    echo "   ⚠️  Backend dependencies not installed (run: cd backend && npm install)"
fi
echo ""

echo "5️⃣  Checking TypeScript compilation..."
cd backend
if npx tsc --noEmit > /dev/null 2>&1; then
    echo "   ✅ TypeScript compilation successful"
else
    echo "   ❌ TypeScript compilation failed"
    cd ..
    exit 1
fi
cd ..
echo ""

echo "6️⃣  Checking build output..."
if [ -d "backend/dist" ]; then
    echo "   ✅ Build output exists"
else
    echo "   ⚠️  Build output not found (run: cd backend && npm run build)"
fi
echo ""

echo "✅ All infrastructure tests passed!"
echo ""
echo "Next steps:"
echo "  - Run 'cd backend && npm run dev' to start the development server"
echo "  - Visit http://localhost:3000/api/health to check the API"
echo ""
