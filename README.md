# Kendy MCP Assistant

Out-Sourcing project for MCP Assistant.

## Project Structure

- **backend/** - Node.js/TypeScript API server with Express, PostgreSQL, and Redis
- **docs/** - Project documentation

## Getting Started

### Backend Setup

See the [Backend Setup Guide](docs/backend-setup.md) for detailed instructions.

Quick start:

```bash
# Start services with Docker
docker-compose up -d

# Install backend dependencies
cd backend
npm install

# Set up database
npm run prisma:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000/api/health` to verify the backend is running.

## Documentation

- [Backend Setup Guide](docs/backend-setup.md) - Complete backend setup and usage instructions

## Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose

## License

ISC
