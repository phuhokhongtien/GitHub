# Backend API

This is the backend service for the GitHub project, built with Node.js, Express, TypeScript, PostgreSQL, and Redis.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20 or higher
- Docker and Docker Compose
- npm or yarn

## Getting Started

### 1. Environment Setup

Copy the example environment file and configure your environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your specific configuration:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/github_db?schema=public

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 2. Installation

Install dependencies:

```bash
npm install
```

### 3. Database Setup

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

### 4. Running the Application

#### Development Mode (with hot-reload)

```bash
npm run dev
```

#### Production Mode

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Docker Setup

### Using Docker Compose

Start all services (PostgreSQL, Redis, and Backend):

```bash
docker-compose up -d
```

View logs:

```bash
docker-compose logs -f backend
```

Stop all services:

```bash
docker-compose down
```

Stop and remove volumes (WARNING: This will delete all data):

```bash
docker-compose down -v
```

### Building Individual Docker Image

```bash
docker build -t github-backend .
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations in development
- `npm run prisma:deploy` - Deploy migrations in production
- `npm run prisma:studio` - Open Prisma Studio (Database GUI)

## API Endpoints

### Health Check

**GET** `/api/v1/health`

Check the health status of the API and its dependencies.

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### Root Endpoint

**GET** `/`

Get basic API information.

Response:
```json
{
  "message": "Backend API is running",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/v1/health"
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # Prisma client setup
│   │   └── redis.ts      # Redis client setup
│   ├── middleware/       # Express middleware
│   │   └── errorHandler.ts
│   ├── routes/           # API routes
│   │   ├── health.ts     # Health check routes
│   │   └── index.ts      # Route aggregator
│   ├── types/            # TypeScript type definitions
│   └── index.ts          # Application entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment variables
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker image definition
├── nodemon.json          # Nodemon configuration
├── package.json          # NPM dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Database Migrations

### Create a New Migration

```bash
npm run prisma:migrate -- --name your_migration_name
```

### Apply Migrations (Development)

```bash
npm run prisma:migrate
```

### Apply Migrations (Production)

```bash
npm run prisma:deploy
```

### Reset Database (Development Only)

```bash
npx prisma migrate reset
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `API_PREFIX` | API route prefix | `/api/v1` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | - |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | `*` |

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-Origin Resource Sharing configuration
- **Environment Variables**: Secure configuration management
- **Input Validation**: Request validation (can be extended)
- **Error Handling**: Centralized error handling

## Development Guidelines

1. **Code Style**: Follow TypeScript best practices
2. **Commits**: Use conventional commits
3. **Branching**: Feature branches from `main`
4. **Testing**: Write tests for new features (add testing framework as needed)
5. **Documentation**: Update README for significant changes

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running:
   ```bash
   docker-compose ps postgres
   ```

2. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify DATABASE_URL in `.env` file

### Redis Connection Issues

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

### Port Already in Use

If port 3000 is already in use, change the `PORT` in `.env`:

```env
PORT=3001
```

## Production Deployment

1. Set environment variables in your deployment platform
2. Build the Docker image:
   ```bash
   docker build -t github-backend:latest .
   ```
3. Push to your container registry
4. Deploy using your preferred orchestration tool (Kubernetes, ECS, etc.)
5. Run migrations:
   ```bash
   npm run prisma:deploy
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue in the GitHub repository.
