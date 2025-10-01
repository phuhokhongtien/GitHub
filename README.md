# Kendy MCP Assistant

A full-stack application for the Kendy MCP Assistant with a modern backend infrastructure.

## 🏗️ Architecture

- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **ORM**: Prisma
- **Container**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [Docker](https://www.docker.com/) v24 or higher
- [Docker Compose](https://docs.docker.com/compose/) v2 or higher

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GitHub
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Start the infrastructure**
   
   Option A - Full stack with Docker:
   ```bash
   docker compose up -d
   ```
   
   Option B - Development mode (databases only):
   ```bash
   make dev-up
   cd backend
   npm install
   npm run dev
   ```

4. **Verify the setup**
   ```bash
   curl http://localhost:3000/api/health
   ```

## 📖 Documentation

- **Backend Setup**: See [docs/backend-setup.md](docs/backend-setup.md) for detailed backend documentation
- **API Documentation**: Available at `/api` endpoint when server is running

## 🛠️ Development

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start development server (requires databases running)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Docker Commands

```bash
# Start all services
docker compose up -d

# Start only databases (for local development)
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Clean up (removes volumes)
docker compose down -v
```

### Using Makefile

```bash
# View available commands
make help

# Install dependencies
make install

# Start databases
make dev-up

# Stop databases
make dev-down

# Build backend
make build
```

## 📁 Project Structure

```
.
├── backend/              # Backend API service
│   ├── src/             # TypeScript source code
│   ├── prisma/          # Database schema and migrations
│   ├── scripts/         # Utility scripts
│   └── Dockerfile       # Backend container definition
├── docs/                # Documentation
├── docker-compose.yml   # Full stack Docker setup
├── docker-compose.dev.yml # Development Docker setup (databases only)
├── Makefile            # Common commands
└── README.md           # This file
```

## 🔧 Available Services

When running with Docker:

- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **Prisma Studio**: `cd backend && npm run prisma:studio` (http://localhost:5555)

## 🧪 Health Check

Test the API health endpoint:

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

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read the documentation before submitting PRs.
