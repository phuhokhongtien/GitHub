# Kendy MCP Assistant - Backend

Backend API service for the Kendy MCP Assistant project.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL and Redis with Docker:
   ```bash
   cd ..
   docker-compose up -d postgres redis
   ```

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000/api/health` to verify the setup.

## Documentation

For detailed setup instructions, see [Backend Setup Guide](../docs/backend-setup.md).

## Tech Stack

- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Cache**: Redis 7
- **Containerization**: Docker

## API Endpoints

- `GET /api` - API information
- `GET /api/health` - Health check endpoint

## License

ISC
