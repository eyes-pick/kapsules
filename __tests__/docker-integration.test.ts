import { dockerService } from '@/lib/docker-service';

describe('Docker Integration', () => {
  describe('DockerService', () => {
    it('should build project container in development mode', async () => {
      const mockSourceFiles = {
        'package.json': JSON.stringify({
          name: 'test-app',
          version: '1.0.0',
          scripts: { dev: 'vite', build: 'vite build' },
          dependencies: { react: '^18.2.0' },
        }),
        'src/App.tsx': 'export default function App() { return <div>Test</div> }',
        'index.html': '<!DOCTYPE html><html><body><div id="root"></div></body></html>',
      };

      const result = await dockerService.buildProjectContainer('test-project', mockSourceFiles);

      expect(result).toHaveProperty('containerId');
      expect(result).toHaveProperty('port');
      expect(result).toHaveProperty('imageId');
      expect(typeof result.port).toBe('number');
    });
    it('should get container info', async () => {
      // First build a container to get a valid container ID
      const mockSourceFiles = {
        'src/App.tsx': 'export default function App() { return <div>Test</div> }',
      };
      const buildResult = await dockerService.buildProjectContainer('test-info', mockSourceFiles);

      const containerInfo = await dockerService.getContainerInfo(buildResult.containerId);

      expect(containerInfo).toHaveProperty('id');
      expect(containerInfo).toHaveProperty('status');
      expect(containerInfo).toHaveProperty('port');
      expect(containerInfo).toHaveProperty('url');
    });

    it('should cleanup containers', async () => {
      await expect(dockerService.cleanupContainers()).resolves.not.toThrow();
    });

    it('should stop and remove containers', async () => {
      await expect(dockerService.stopContainer('test-container')).resolves.not.toThrow();
      await expect(dockerService.removeContainer('test-container')).resolves.not.toThrow();
    });

    it('should build template image', async () => {
      const imageId = await dockerService.buildTemplateImage();
      expect(typeof imageId).toBe('string');
      expect(imageId).toContain('kapsules/vite-template');
    });
  });
});
