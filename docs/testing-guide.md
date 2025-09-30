# Testing Guide

This document describes how to test the Kendy MCP Assistant backend infrastructure.

## Automated Infrastructure Tests

We provide an automated test script to verify the infrastructure setup:

```bash
bash scripts/test-infrastructure.sh
```

This script tests:
1. Docker services health status
2. PostgreSQL database connectivity
3. Redis cache connectivity
4. Backend dependencies installation
5. TypeScript compilation
6. Build output generation

## Manual Testing

### 1. Test Docker Services

Check service status:
```bash
docker compose ps
```

Expected output should show both `kendy-postgres` and `kendy-redis` as "healthy".

### 2. Test PostgreSQL

Connect to PostgreSQL:
```bash
docker compose exec postgres psql -U postgres -d kendy_mcp
```

Run a test query:
```sql
SELECT version();
\q
```

### 3. Test Redis

Connect to Redis:
```bash
docker compose exec redis redis-cli
```

Test Redis commands:
```
PING
SET test "hello"
GET test
DEL test
EXIT
```

### 4. Test Backend Compilation

Check TypeScript compilation:
```bash
cd backend
npx tsc --noEmit
```

Build the project:
```bash
npm run build
```

Verify dist folder was created:
```bash
ls -la dist/
```

### 5. Test Backend Server (When Prisma is Available)

**Note**: Full server testing requires Prisma binaries which need internet access. In environments with restricted network access, you can verify the infrastructure is ready but cannot run the server until network access is granted to download Prisma engines.

When network access is available:

1. Generate Prisma client:
```bash
npm run prisma:generate
```

2. Run database migrations:
```bash
npm run prisma:migrate
```

3. Start development server:
```bash
npm run dev
```

4. Test health endpoint:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

5. Test API info endpoint:
```bash
curl http://localhost:3000/api
```

Expected response:
```json
{
  "name": "Kendy MCP Assistant API",
  "version": "1.0.0",
  "status": "running"
}
```

## Integration Tests

### Test Database Operations with Prisma Studio

When Prisma is available, you can use Prisma Studio to interact with the database:

```bash
cd backend
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555` where you can:
- View all tables
- Create, read, update, and delete records
- Test database relationships

## Load Testing

For production readiness, consider load testing the API:

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3000/api/health

# Using wrk
wrk -t4 -c100 -d30s http://localhost:3000/api/health
```

## Common Test Scenarios

### Scenario 1: Fresh Installation

1. Clone repository
2. Start Docker services: `docker compose up -d postgres redis`
3. Install dependencies: `cd backend && npm install`
4. Run tests: `cd .. && bash scripts/test-infrastructure.sh`

### Scenario 2: After Code Changes

1. Run TypeScript compilation: `cd backend && npx tsc --noEmit`
2. Build project: `npm run build`
3. Restart dev server (if running): `npm run dev`

### Scenario 3: Database Schema Changes

1. Modify `backend/prisma/schema.prisma`
2. Generate new migration: `npm run prisma:migrate`
3. Apply migrations: Check they apply successfully
4. Test with Prisma Studio: `npm run prisma:studio`

## Troubleshooting Tests

### Docker Services Not Healthy

If services show "unhealthy" status:
```bash
docker compose logs postgres
docker compose logs redis
```

Restart services:
```bash
docker compose restart postgres redis
```

### TypeScript Compilation Errors

Clean and rebuild:
```bash
cd backend
rm -rf dist/
npm run build
```

### Connection Refused Errors

Ensure services are running and ports are not blocked:
```bash
docker compose ps
netstat -tulpn | grep -E '(5432|6379|3000)'
```

## Continuous Integration

For CI/CD pipelines, create a test workflow that:

1. Starts Docker services
2. Runs automated tests
3. Builds the application
4. Runs integration tests (when Prisma is available)
5. Cleans up containers

Example GitHub Actions workflow snippet:

```yaml
- name: Start services
  run: docker compose up -d postgres redis

- name: Wait for services
  run: sleep 10

- name: Install dependencies
  run: cd backend && npm install

- name: Run tests
  run: bash scripts/test-infrastructure.sh

- name: Cleanup
  run: docker compose down -v
```

## Test Coverage

Current test coverage:
- ✅ Docker service health checks
- ✅ Database connectivity
- ✅ Redis connectivity
- ✅ TypeScript compilation
- ✅ Build process
- ⏳ API endpoint tests (requires Prisma)
- ⏳ Integration tests (requires Prisma)
- ⏳ Unit tests (to be added)

## Next Steps

- Add Jest or Mocha for unit testing
- Implement integration tests for API endpoints
- Add end-to-end tests with Supertest
- Set up code coverage reporting
- Add performance benchmarks
