# Backend Setup Guide

This document describes how to set up and run the Kendy MCP Assistant backend locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **Docker** and **Docker Compose** - [Download](https://www.docker.com/get-started)
- **npm** or **yarn** package manager

## Architecture Overview

The backend consists of:

- **Express.js** server with TypeScript
- **PostgreSQL** database (v16)
- **Redis** cache (v7)
- **Prisma ORM** for database management
- **Docker Compose** for local development

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GitHub
```

### 2. Set Up Environment Variables

Navigate to the backend directory and create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration (the defaults work for local development):

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kendy_mcp?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### 3. Start Services with Docker Compose

From the project root directory:

```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Or start all services including the backend
docker-compose up -d
```

This will start:
- PostgreSQL on port `5432`
- Redis on port `6379`
- Backend API on port `3000` (if using full docker-compose)

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Set Up the Database

Generate Prisma Client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

You'll be prompted to name your migration. For the initial setup, you can use "init".

### 6. Start the Development Server

```bash
npm run dev
```

The API server will start on `http://localhost:3000`.

## Verify the Setup

### Health Check

Visit or curl the health check endpoint:

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

### API Info

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

## Available Scripts

In the `backend` directory:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── index.ts     # Main config
│   │   ├── database.ts  # Prisma client
│   │   └── redis.ts     # Redis client
│   ├── middleware/      # Express middleware
│   │   └── errorHandler.ts
│   ├── routes/          # API routes
│   │   ├── index.ts     # Route registry
│   │   └── health.ts    # Health check endpoint
│   ├── models/          # Data models (future)
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Prisma schema
├── .env.example         # Environment variables template
├── Dockerfile           # Docker image definition
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Database Management

### View Database with Prisma Studio

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555` to browse and edit your database.

### Create a New Migration

After modifying the Prisma schema:

```bash
npm run prisma:migrate
```

### Reset Database

⚠️ **Warning**: This will delete all data!

```bash
npx prisma migrate reset
```

## Docker Commands

### Start Services

```bash
# Start all services
docker-compose up -d

# Start specific services
docker-compose up -d postgres redis
```

### Stop Services

```bash
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Rebuild Backend Container

```bash
docker-compose up -d --build backend
```

## Connecting to Services

### PostgreSQL

Using psql:

```bash
docker-compose exec postgres psql -U postgres -d kendy_mcp
```

Or connect with your favorite database client:

- **Host**: localhost
- **Port**: 5432
- **Username**: postgres
- **Password**: postgres
- **Database**: kendy_mcp

### Redis

Using redis-cli:

```bash
docker-compose exec redis redis-cli
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `DATABASE_URL` | PostgreSQL connection string | postgresql://postgres:postgres@localhost:5432/kendy_mcp |
| `REDIS_HOST` | Redis host | localhost |
| `REDIS_PORT` | Redis port | 6379 |
| `REDIS_PASSWORD` | Redis password (optional) | - |

## Troubleshooting

### Port Already in Use

If you see "port already in use" errors:

1. Check what's using the port:
   ```bash
   lsof -i :3000  # or :5432 or :6379
   ```

2. Stop the conflicting process or change the port in `.env`

### Database Connection Issues

1. Ensure PostgreSQL container is running:
   ```bash
   docker-compose ps
   ```

2. Check PostgreSQL logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify DATABASE_URL in `.env` matches your setup

### Redis Connection Issues

1. Ensure Redis container is running:
   ```bash
   docker-compose ps
   ```

2. Test Redis connection:
   ```bash
   docker-compose exec redis redis-cli ping
   ```

   Should return `PONG`

### Prisma Issues

If you encounter Prisma errors:

1. Regenerate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

2. Reset and recreate migrations:
   ```bash
   npx prisma migrate reset
   npm run prisma:migrate
   ```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use secure passwords for PostgreSQL and Redis
3. Build the application:
   ```bash
   npm run build
   ```
4. Run with:
   ```bash
   npm start
   ```

Or use Docker:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Next Steps

- Add authentication and authorization
- Implement business logic and additional endpoints
- Add comprehensive testing (unit and integration tests)
- Set up CI/CD pipeline
- Configure monitoring and logging
- Implement rate limiting and security headers

## Support

For issues or questions:
- Check the [troubleshooting section](#troubleshooting)
- Review application logs
- Open an issue in the repository
