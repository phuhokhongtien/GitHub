#!/bin/bash

echo "🔄 Initializing database..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until pg_isready -h localhost -p 5432 -U kendy_user; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

# Run Prisma migrations
echo "🔄 Running Prisma migrations..."
cd /app
npm run prisma:migrate

echo "✅ Database initialized successfully!"
