#!/bin/bash

# Run Kapsules in Production Mode
set -e

echo "🚀 Starting Kapsules Production Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build images if they don't exist
if ! docker images | grep -q "kapsules/app:latest"; then
    echo "📦 Building production images..."
    ./scripts/build-docker.sh
fi

# Start production environment
echo "🏃 Starting production containers..."
docker-compose up -d

echo "✅ Production environment started!"
echo "📱 Application: http://localhost:3000"
echo "📊 Health check: http://localhost:3000/api/health"

# Show running containers
echo "📋 Running containers:"
docker-compose ps
