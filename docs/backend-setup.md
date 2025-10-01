# Backend Setup Documentation

## Overview

This document provides comprehensive instructions for setting up and running the Kendy MCP Assistant backend infrastructure.

## Architecture

The backend consists of:
- **API Server**: Express.js with TypeScript
- **Database**: PostgreSQL 16 with Prisma ORM
- **Cache**: Redis 7
- **Containerization**: Docker & Docker Compose

## Prerequisites

Before starting, ensure you have installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/) (v24 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (v2 or higher)
- [Git](https://git-scm.com/)

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files (database, redis, env)
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── app.ts          # Express app setup
│   └── index.ts        # Application entry point
├── prisma/
│   └── schema.prisma   # Database schema
├── scripts/
│   └── init-db.sh      # Database initialization script
├── Dockerfile          # Backend container definition
├── package.json        # Node.js dependencies
├── tsconfig.json       # TypeScript configuration
└── .env.example        # Environment variables template
```

## Quick Start with Docker

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GitHub
```

### 2. Set Up Environment Variables

Copy the example environment file and customize it:

```bash
cp .env.example .env
```

Default values in `.env.example`:
```env
POSTGRES_USER=kendy_user
POSTGRES_PASSWORD=kendy_password
POSTGRES_DB=kendy_db
POSTGRES_PORT=5432
REDIS_PORT=6379
NODE_ENV=production
BACKEND_PORT=3000
```

### 3. Start Services with Docker Compose

```bash
docker-compose up -d
```

This command will:
- Pull necessary Docker images (PostgreSQL, Redis)
- Build the backend application
- Start all services in detached mode

### 4. Verify Services are Running

Check that all containers are running:

```bash
docker-compose ps
```

Expected output:
```
NAME                COMMAND                  STATUS              PORTS
kendy-backend       "docker-entrypoint.s…"   Up 10 seconds       0.0.0.0:3000->3000/tcp
kendy-postgres      "docker-entrypoint.s…"   Up 10 seconds       0.0.0.0:5432->5432/tcp
kendy-redis         "docker-entrypoint.s…"   Up 10 seconds       0.0.0.0:6379->6379/tcp
```

### 5. Test the Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

## Local Development Setup

For local development without Docker:

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Local Environment

Copy the backend environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your local database credentials:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://kendy_user:kendy_password@localhost:5432/kendy_db
REDIS_URL=redis://localhost:6379
```

### 3. Start PostgreSQL and Redis

You can use Docker Compose for just the databases:

```bash
docker-compose up -d postgres redis
```

Or install and run PostgreSQL and Redis locally.

### 4. Initialize Database

Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start with hot-reload enabled at `http://localhost:3000`.

## Database Management

### Running Migrations

Create a new migration:

```bash
cd backend
npm run prisma:migrate
```

### Prisma Studio

Launch Prisma Studio to view and edit database data:

```bash
npm run prisma:studio
```

Access at `http://localhost:5555`

### Database Schema

The initial schema includes:

- **users**: User accounts
- **sessions**: User session management

To modify the schema, edit `backend/prisma/schema.prisma` and run migrations.

## API Endpoints

### Base URL

- Local: `http://localhost:3000/api`
- Docker: `http://localhost:3000/api`

### Available Endpoints

#### Health Check
```
GET /api/health
```

Returns the health status of the API and its dependencies.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

#### API Info
```
GET /api
```

Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Kendy MCP Assistant API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health"
  }
}
```

## Docker Commands

### Start All Services

```bash
docker-compose up -d
```

### Stop All Services

```bash
docker-compose down
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

### Rebuild Backend

After code changes:

```bash
docker-compose up -d --build backend
```

### Clean Up (Remove Volumes)

⚠️ **Warning**: This will delete all data!

```bash
docker-compose down -v
```

## Environment Variables

### Backend Service

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | See `.env.example` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |

### Docker Compose

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | `kendy_user` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `kendy_password` |
| `POSTGRES_DB` | PostgreSQL database name | `kendy_db` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `REDIS_PORT` | Redis port | `6379` |
| `BACKEND_PORT` | Backend API port | `3000` |

## Scripts

### Development

```bash
npm run dev          # Start development server with hot-reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
```

### Database

```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Troubleshooting

### Port Already in Use

If ports 3000, 5432, or 6379 are already in use, update the port mappings in `.env` or `docker-compose.yml`.

### Database Connection Failed

1. Ensure PostgreSQL is running:
   ```bash
   docker-compose ps postgres
   ```

2. Check PostgreSQL logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify connection string in `.env`

### Redis Connection Failed

1. Ensure Redis is running:
   ```bash
   docker-compose ps redis
   ```

2. Check Redis logs:
   ```bash
   docker-compose logs redis
   ```

3. Test Redis connection:
   ```bash
   docker-compose exec redis redis-cli ping
   ```

### Prisma Client Issues

Regenerate the Prisma client:

```bash
cd backend
npm run prisma:generate
```

### Docker Build Issues

Clean Docker cache and rebuild:

```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **Passwords**: Use strong passwords in production
3. **CORS**: Configure CORS for specific origins in production
4. **Helmet**: Helmet is configured for security headers
5. **Rate Limiting**: Consider adding rate limiting middleware for production

## Production Deployment

### Considerations

1. Use a managed PostgreSQL service (AWS RDS, Azure Database, etc.)
2. Use a managed Redis service (AWS ElastiCache, Redis Cloud, etc.)
3. Set `NODE_ENV=production`
4. Use strong, unique passwords
5. Configure proper CORS origins
6. Set up SSL/TLS certificates
7. Implement proper logging and monitoring
8. Use a reverse proxy (Nginx, Caddy)

### Docker Production Build

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Monitoring and Logs

### Application Logs

```bash
docker-compose logs -f backend
```

### Database Logs

```bash
docker-compose logs -f postgres
```

### Redis Logs

```bash
docker-compose logs -f redis
```

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Documentation](https://docs.docker.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

For issues or questions, please create an issue in the repository.
