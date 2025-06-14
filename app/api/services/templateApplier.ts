import fs from 'fs-extra';
import path from 'path';
import type { GenerationPlan, GenerationStep } from '../types/generation';

async function copyDirectory(src: string, dest: string) {
  // Recursively copy using fs-extra
  await fs.copy(src, dest);
}

export async function applyGenerationPlan(plan: GenerationPlan) {
  const projectDir = path.resolve(process.cwd(), 'generated', plan.projectName);
  const templateDir = path.resolve(process.cwd(), 'templates', 'default');

  // Step 1: Copy base template
  await copyDirectory(templateDir, projectDir);

  // Step 2: Apply code generation steps
  for (const step of plan.steps as GenerationStep[]) {
    const filePath = path.join(projectDir, step.path);
    switch (step.type) {
      case 'create':
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(filePath, step.content || '', 'utf8');
        break;
      case 'modify':
        await fs.writeFile(filePath, step.content || '', 'utf8');
        break;
      case 'delete':
        await fs.remove(filePath);
        break;
    }
  }

  // Step 3: Update dependencies in package.json
  const pkgPath = path.join(projectDir, 'package.json');
  try {
    const pkg = await fs.readJson(pkgPath);
    pkg.dependencies = {
      ...pkg.dependencies,
      ...plan.dependencies,
    };
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  } catch {
    // Skip if package.json not found
  }
}
