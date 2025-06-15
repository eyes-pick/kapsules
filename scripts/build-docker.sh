#!/bin/bash

# Build Kapsules Docker Images
set -e

echo "🐳 Building Kapsules Docker Images..."

# Build main application
echo "📦 Building main application..."
docker build -t kapsules/app:latest -f Dockerfile .

# Build template base image
echo "📦 Building template base image..."
docker build -t kapsules/vite-template:latest -f templates/default/Dockerfile templates/default

# Build development image
echo "📦 Building development image..."
docker build -t kapsules/app:dev -f Dockerfile.dev .

echo "✅ All images built successfully!"

# List built images
echo "📋 Built images:"
docker images | grep kapsules

echo "🚀 You can now run with:"
echo "  Production: docker-compose up"
echo "  Development: docker-compose -f docker-compose.dev.yml up"
