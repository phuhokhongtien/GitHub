# Kendy MCP Assistant - Backend

Backend API service for Kendy MCP Assistant.

## Quick Start

### Using Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d
```

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

## Documentation

For detailed setup instructions, API documentation, and troubleshooting, see [Backend Setup Documentation](../docs/backend-setup.md).

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run lint` - Lint code
- `npm run format` - Format code

## Health Check

Once running, test the health endpoint:

```bash
curl http://localhost:3000/api/health
```

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 16 + Prisma ORM
- **Cache**: Redis 7
- **Container**: Docker
