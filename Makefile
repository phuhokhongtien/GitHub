.PHONY: help install dev-up dev-down dev-logs build test clean

help:
	@echo "Kendy MCP Assistant - Backend Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make install     - Install backend dependencies"
	@echo "  make dev-up      - Start PostgreSQL and Redis in Docker"
	@echo "  make dev-down    - Stop Docker services"
	@echo "  make dev-logs    - View Docker logs"
	@echo "  make build       - Build TypeScript code"
	@echo "  make clean       - Clean build artifacts and stop services"
	@echo ""
	@echo "Backend development:"
	@echo "  cd backend && npm run dev     - Start development server"
	@echo "  cd backend && npm run build   - Build for production"
	@echo ""
	@echo "Full stack:"
	@echo "  docker compose up -d          - Start all services (full stack)"
	@echo "  docker compose down           - Stop all services"

install:
	cd backend && npm install

dev-up:
	docker compose -f docker-compose.dev.yml up -d

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

build:
	cd backend && npm run build

clean:
	docker compose -f docker-compose.dev.yml down -v
	cd backend && rm -rf dist node_modules
