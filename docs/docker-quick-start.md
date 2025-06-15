# Docker Quick Start Guide

## 🚀 Getting Started with Docker

### Prerequisites

- Docker installed and running
- Docker Compose (usually included with Docker Desktop)
- Node.js 18+ (for development)

### 1. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in your configuration:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Development

#### Option A: Docker Development

```bash
# Start the complete development environment
docker-compose -f docker-compose.dev.yml up

# Or use the helper script
./scripts/dev.sh
```

#### Option B: Local Development

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

### 3. Production

#### Build Images

```bash
# Linux/macOS
./scripts/build-docker.sh

# Windows
./scripts/build-docker.bat
```

#### Start Production

```bash
# Start all services
docker-compose up

# Or use the helper script
./scripts/start.sh
```

### 4. Common Commands

#### Container Management

```bash
# View running containers
docker ps

# View logs
docker-compose logs kapsules-app

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build
```

#### Development Workflow

```bash
# Run tests
npm test

# Check container health
curl http://localhost:3000/api/health

# Access the application
open http://localhost:3000
```

### 5. Troubleshooting

#### Port Conflicts

If port 3000 is in use, modify `docker-compose.yml`:

```yaml
ports:
  - '3001:3000' # Change external port
```

#### Container Build Issues

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### Permission Issues (Linux/macOS)

```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### 6. File Structure

```
├── docker-compose.yml          # Production orchestration
├── docker-compose.dev.yml      # Development environment
├── Dockerfile                  # Main app production image
├── Dockerfile.dev             # Development image
├── .dockerignore              # Docker build exclusions
├── scripts/
│   ├── build-docker.sh        # Build script (Linux/macOS)
│   ├── build-docker.bat       # Build script (Windows)
│   ├── dev.sh                 # Development startup
│   └── start.sh               # Production startup
└── templates/default/
    ├── Dockerfile             # Template image
    └── nginx.conf             # Nginx configuration
```

This setup provides a complete containerized environment for the Kapsules AI-driven project generation platform.
