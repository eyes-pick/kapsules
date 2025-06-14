export interface ProjectPlan {
  name: string;
  description: string;
  features: string[];
  structure: {
    files: ProjectFile[];
    dependencies: Record<string, string>;
  };
}

export interface ProjectFile {
  path: string;
  content?: string;
  description: string;
  updates?: {
    type: 'create' | 'modify' | 'delete';
    content?: string;
  };
}

export interface GenerationStep {
  type: 'create' | 'modify' | 'delete';
  path: string;
  content?: string;
  description: string;
}

export interface GenerationPlan {
  projectName: string;
  baseTemplate: string;
  steps: GenerationStep[];
  dependencies: Record<string, string>;
}
