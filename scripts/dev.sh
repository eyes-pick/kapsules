#!/bin/bash

# Run Kapsules in Development Mode
set -e

echo "🚀 Starting Kapsules Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build images if they don't exist
if ! docker images | grep -q "kapsules/app:dev"; then
    echo "📦 Building development images..."
    ./scripts/build-docker.sh
fi

# Start development environment
echo "🏃 Starting development containers..."
docker-compose -f docker-compose.dev.yml up --build

echo "✅ Development environment stopped."
