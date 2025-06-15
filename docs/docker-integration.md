# Docker Integration Guide

## Overview

This document outlines how to integrate Docker containers for project previews in the Kapsules platform.

## Current Implementation

The current implementation simulates Docker container builds and deployments. The actual integration points are:

### 1. Project Pipeline (`lib/project-pipeline.ts`)

- `buildDockerContainer()` - Currently simulated
- `deployToSandbox()` - Currently returns preview API endpoint

### 2. Preview API (`app/api/preview/[id]/route.ts`)

- Handles different build states
- Can redirect to actual container URLs when available

## Real Docker Integration Steps

### Step 1: Docker API Integration

```typescript
// lib/docker-service.ts
import Docker from 'dockerode';

export class DockerService {
  private docker = new Docker();

  async buildContainer(projectId: string, sourceFiles: Record<string, string>) {
    // 1. Create temporary directory
    // 2. Write source files
    // 3. Generate Dockerfile
    // 4. Build image
    // 5. Start container
    // 6. Return container info
  }
}
```

### Step 2: Container Lifecycle Management

- Start containers on demand
- Stop containers after inactivity
- Health checks and monitoring
- Port management and conflict resolution

### Step 3: Networking and Security

- Container isolation
- Network policies
- Resource limits
- Security scanning

### Step 4: Load Balancing and Scaling

- Container orchestration (Docker Compose or Kubernetes)
- Load balancing between multiple instances
- Auto-scaling based on demand

## Environment Variables Needed

```env
DOCKER_HOST=unix:///var/run/docker.sock
DOCKER_REGISTRY_URL=your-registry.com
CONTAINER_PORT_RANGE_START=3000
CONTAINER_PORT_RANGE_END=4000
```

## Directory Structure for Real Implementation

```
lib/
  docker/
    DockerService.ts
    DockerfileGenerator.ts
    ContainerManager.ts
scripts/
  docker/
    cleanup.sh
    monitor.sh
```

## Security Considerations

1. Container resource limits
2. Network isolation
3. File system permissions
4. User namespace mapping
5. Secret management

## Monitoring and Logging

1. Container health checks
2. Resource usage monitoring
3. Log aggregation
4. Performance metrics

## Development vs Production

- Development: Local Docker daemon
- Production: Container orchestration platform (Kubernetes, ECS, etc.)
