'use client';

import { createClient } from '@/utils/supabase/client';
import { Project } from '@/hooks/use-projects';
import { dockerService } from './docker-service';

export interface BuildStage {
  stage: 'docker_init' | 'ai_analysis' | 'code_gen' | 'build' | 'deploy';
  status: 'started' | 'completed' | 'failed';
  message?: string;
  metadata?: Record<string, unknown>;
}

class ProjectPipelineService {
  private supabase = createClient();

  async updateBuildStage(projectId: string, buildStage: BuildStage) {
    const { error } = await this.supabase.rpc('update_build_status', {
      p_project_id: projectId,
      p_stage: buildStage.stage,
      p_status: buildStage.status,
      p_message: buildStage.message,
      p_metadata: buildStage.metadata || {},
    });

    if (error) {
      console.error('Failed to update build stage:', error);
      throw error;
    }
  }

  async processProject(project: Project): Promise<void> {
    try {
      // Stage 1: AI Analysis
      await this.updateBuildStage(project.id, {
        stage: 'ai_analysis',
        status: 'started',
        message: 'Analyzing prompt with AI...',
      });

      const aiInterpretation = await this.analyzePromptWithAI(project.prompt);

      await this.updateBuildStage(project.id, {
        stage: 'ai_analysis',
        status: 'completed',
        message: 'AI analysis complete',
        metadata: { interpretation: aiInterpretation },
      });

      // Stage 2: Code Generation
      await this.updateBuildStage(project.id, {
        stage: 'code_gen',
        status: 'started',
        message: 'Generating Vite/TypeScript code...',
      });

      const generatedCode = await this.generateViteApp(aiInterpretation, project.prompt);

      await this.updateBuildStage(project.id, {
        stage: 'code_gen',
        status: 'completed',
        message: 'Code generation complete',
        metadata: { files: Object.keys(generatedCode) },
      });

      // Stage 3: Docker Build
      await this.updateBuildStage(project.id, {
        stage: 'build',
        status: 'started',
        message: 'Building Docker container...',
      });

      const dockerResult = await this.buildDockerContainer(project.id, generatedCode);

      await this.updateBuildStage(project.id, {
        stage: 'build',
        status: 'completed',
        message: 'Docker build complete',
        metadata: { containerId: dockerResult.containerId },
      });

      // Stage 4: Deploy
      await this.updateBuildStage(project.id, {
        stage: 'deploy',
        status: 'started',
        message: 'Deploying to sandbox environment...',
      });

      const previewUrl = await this.deployToSandbox(dockerResult.containerId, project.id);

      // Update project with preview URL
      await this.supabase
        .from('projects')
        .update({
          preview_url: previewUrl,
          docker_image_id: dockerResult.containerId,
          source_files: generatedCode,
          ai_interpretation: aiInterpretation,
        })
        .eq('id', project.id);

      await this.updateBuildStage(project.id, {
        stage: 'deploy',
        status: 'completed',
        message: 'Deployment complete',
        metadata: { previewUrl },
      });
    } catch (error) {
      console.error('Pipeline failed:', error);

      // Update with failure status
      await this.updateBuildStage(project.id, {
        stage: 'build',
        status: 'failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });

      throw error;
    }
  }

  private async analyzePromptWithAI(prompt: string): Promise<Record<string, unknown>> {
    // TODO: Integrate with your AI service (OpenAI, Claude, etc.)
    // This would analyze the prompt and return structured data about what to build

    // Simulated AI analysis for now
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          projectType: 'web-app',
          features: this.extractFeatures(prompt),
          components: this.suggestComponents(prompt),
          styling: 'tailwind',
          complexity: 'medium',
        });
      }, 2000);
    });
  }

  private async generateViteApp(
    aiInterpretation: Record<string, unknown>,
    prompt: string
  ): Promise<Record<string, string>> {
    // TODO: Generate actual Vite/TypeScript files based on AI interpretation
    // This would create the file structure and code

    // Simulated code generation for now
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          'package.json': JSON.stringify(
            {
              name: 'ai-generated-app',
              version: '1.0.0',
              type: 'module',
              scripts: {
                dev: 'vite',
                build: 'vite build',
                preview: 'vite preview',
              },
              dependencies: {
                react: '^18.2.0',
                'react-dom': '^18.2.0',
              },
              devDependencies: {
                '@types/react': '^18.2.0',
                '@types/react-dom': '^18.2.0',
                '@vitejs/plugin-react': '^4.0.0',
                typescript: '^5.0.0',
                vite: '^4.4.0',
              },
            },
            null,
            2
          ),
          'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  }
})`,
          'src/App.tsx': `export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">AI Generated App</h1>
        <p className="text-xl">Built from: "${prompt}"</p>
      </div>
    </div>
  )
}`,
          'src/main.tsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
          'src/index.css': `@import "tailwindcss/preflight";
@tailwind utilities;`,
          'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Generated App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
        });
      }, 3000);
    });
  }

  private async buildDockerContainer(
    projectId: string,
    sourceFiles: Record<string, string>
  ): Promise<{ containerId: string; port?: number }> {
    try {
      console.log(
        `Building Docker container for project ${projectId} with ${Object.keys(sourceFiles).length} source files`
      );

      // Use the Docker service to build and run the container
      const dockerResult = await dockerService.buildProjectContainer(projectId, sourceFiles);

      console.log(
        `Docker container built: ${dockerResult.containerId} on port ${dockerResult.port}`
      );

      return {
        containerId: dockerResult.containerId,
        port: dockerResult.port,
      };
    } catch (error) {
      console.error(`Failed to build Docker container: ${error}`);
      throw error;
    }
  }

  private async deployToSandbox(containerId: string, projectId: string): Promise<string> {
    try {
      // Get container information
      const containerInfo = await dockerService.getContainerInfo(containerId);

      if (containerInfo && containerInfo.status === 'running') {
        // Return the container URL if it's running
        return containerInfo.url;
      }

      // Fallback to preview API endpoint
      return `/api/preview/${projectId}`;
    } catch (error) {
      console.error(`Failed to deploy to sandbox: ${error}`);
      // Fallback to preview API endpoint
      return `/api/preview/${projectId}`;
    }
  }

  // Container management methods
  async stopProjectContainer(projectId: string): Promise<void> {
    try {
      // Get project to find container ID
      const { data: project } = await this.supabase
        .from('projects')
        .select('docker_image_id')
        .eq('id', projectId)
        .single();

      if (project?.docker_image_id) {
        await dockerService.stopContainer(project.docker_image_id);
        console.log(`Stopped container for project ${projectId}`);
      }
    } catch (error) {
      console.error(`Failed to stop container for project ${projectId}:`, error);
    }
  }

  async cleanupProject(projectId: string): Promise<void> {
    try {
      // Get project to find container ID
      const { data: project } = await this.supabase
        .from('projects')
        .select('docker_image_id')
        .eq('id', projectId)
        .single();

      if (project?.docker_image_id) {
        await dockerService.stopContainer(project.docker_image_id);
        await dockerService.removeContainer(project.docker_image_id);
        console.log(`Cleaned up container for project ${projectId}`);
      }
    } catch (error) {
      console.error(`Failed to cleanup project ${projectId}:`, error);
    }
  }

  async cleanupAllContainers(): Promise<void> {
    try {
      await dockerService.cleanupContainers();
      console.log('Cleaned up all containers');
    } catch (error) {
      console.error('Failed to cleanup containers:', error);
    }
  }

  private extractFeatures(prompt: string): string[] {
    // Simple keyword extraction - you'd use more sophisticated NLP here
    const features = [];
    const keywords = prompt.toLowerCase();

    if (keywords.includes('auth') || keywords.includes('login')) features.push('authentication');
    if (keywords.includes('database') || keywords.includes('data')) features.push('database');
    if (keywords.includes('api') || keywords.includes('backend')) features.push('api');
    if (keywords.includes('dashboard') || keywords.includes('admin')) features.push('dashboard');
    if (keywords.includes('chat') || keywords.includes('message')) features.push('chat');

    return features;
  }

  private suggestComponents(prompt: string): string[] {
    // Suggest React components based on prompt
    const components = ['App'];
    const keywords = prompt.toLowerCase();

    if (keywords.includes('header') || keywords.includes('nav')) components.push('Header');
    if (keywords.includes('sidebar')) components.push('Sidebar');
    if (keywords.includes('form')) components.push('Form');
    if (keywords.includes('table') || keywords.includes('list')) components.push('DataTable');
    if (keywords.includes('card')) components.push('Card');

    return components;
  }
}

export const projectPipelineService = new ProjectPipelineService();
