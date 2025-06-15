import fs from 'fs-extra';
import path from 'path';

export interface DockerBuildResult {
  containerId: string;
  port: number;
  imageId: string;
}

export interface ContainerInfo {
  id: string;
  status: string;
  port: number;
  url: string;
}

export class DockerService {
  private basePort = 8080;
  private maxPort = 9000;
  private usedPorts = new Set<number>();

  async buildProjectContainer(
    projectId: string,
    sourceFiles: Record<string, string>
  ): Promise<DockerBuildResult> {
    const projectPath = path.resolve(process.cwd(), 'generated', projectId);
    const templatePath = path.resolve(process.cwd(), 'templates', 'default');

    try {
      // 1. Create project directory
      await fs.ensureDir(projectPath);

      // 2. Copy template files
      await fs.copy(templatePath, projectPath);

      // 3. Write generated source files
      for (const [filePath, content] of Object.entries(sourceFiles)) {
        const fullPath = path.join(projectPath, filePath);
        await fs.ensureDir(path.dirname(fullPath));
        await fs.writeFile(fullPath, content, 'utf8');
      }

      // 4. Get available port
      const port = this.getAvailablePort();

      // 5. Build Docker image
      const imageId = await this.buildImage(projectId, projectPath);

      // 6. Run container
      const containerId = await this.runContainer(imageId, port, projectId);

      return {
        containerId,
        port,
        imageId,
      };
    } catch (error) {
      console.error(`Failed to build project container: ${error}`);
      throw error;
    }
  }
  private async buildImage(projectId: string, projectPath: string): Promise<string> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // In development/test, simulate the build
      console.log(`Simulating Docker build for project ${projectId} at ${projectPath}`);
      return `kapsules-project-${projectId}:latest`;
    }

    // In production, this would execute actual Docker commands
    // For now, we'll use the Docker API or spawn docker commands

    // Example implementation using child_process:
    // const { exec } = require('child_process');
    // const buildCommand = `docker build -t kapsules-project-${projectId} ${projectPath}`;
    // const result = await new Promise((resolve, reject) => {
    //   exec(buildCommand, (error, stdout, stderr) => {
    //     if (error) reject(error);
    //     else resolve(stdout);
    //   });
    // });

    return `kapsules-project-${projectId}:latest`;
  }
  private async runContainer(imageId: string, port: number, projectId: string): Promise<string> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // In development/test, simulate the container run
      console.log(`Simulating Docker run for ${imageId} on port ${port}`);
      this.usedPorts.add(port);
      return `container-${projectId}-${Date.now()}`;
    }

    // In production, this would start the actual container
    // Example implementation:
    // const runCommand = `docker run -d -p ${port}:80 --name ${projectId} ${imageId}`;
    // const containerId = await new Promise((resolve, reject) => {
    //   exec(runCommand, (error, stdout, stderr) => {
    //     if (error) reject(error);
    //     else resolve(stdout.trim());
    //   });
    // });

    this.usedPorts.add(port);
    return `container-${projectId}-${Date.now()}`;
  }
  async getContainerInfo(containerId: string): Promise<ContainerInfo | null> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      // Simulate container info
      const port = Array.from(this.usedPorts)[0] || this.basePort;
      return {
        id: containerId,
        status: 'running',
        port,
        url: `http://localhost:${port}`,
      };
    }

    // In production, query actual Docker daemon
    // docker inspect containerId
    return null;
  }
  async stopContainer(containerId: string): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log(`Simulating stop for container ${containerId}`);
      return;
    }

    // In production: docker stop containerId
  }

  async removeContainer(containerId: string): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log(`Simulating remove for container ${containerId}`);
      return;
    }

    // In production: docker rm containerId
  }

  private getAvailablePort(): number {
    for (let port = this.basePort; port <= this.maxPort; port++) {
      if (!this.usedPorts.has(port)) {
        return port;
      }
    }
    throw new Error('No available ports');
  }
  // Clean up unused containers (to be called periodically)
  async cleanupContainers(): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log('Simulating container cleanup');
      this.usedPorts.clear();
      return;
    }

    // In production: docker container prune -f
  }

  // Build the template base image
  async buildTemplateImage(): Promise<string> {
    const templatePath = path.resolve(process.cwd(), 'templates', 'default');

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      console.log(`Simulating template image build at ${templatePath}`);
      return 'kapsules/vite-template:latest';
    }

    // In production: docker build -t kapsules/vite-template:latest templates/default
    return 'kapsules/vite-template:latest';
  }
}

export const dockerService = new DockerService();
