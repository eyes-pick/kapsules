'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Project {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  description: string | null;
  prompt: string;
  docker_image_id: string | null;
  build_status: 'pending' | 'building' | 'built' | 'failed';
  build_logs: string | null;
  vite_config: Record<string, unknown>;
  package_json: Record<string, unknown>;
  source_files: Record<string, unknown>;
  ai_interpretation: Record<string, unknown>;
  ai_modifications: Record<string, unknown>[];
  preview_url: string | null;
  is_public: boolean;
  tags: string[];
  technologies: string[];
  created_at: string;
  updated_at: string;
  last_built_at: string | null;
}

export interface BuildLog {
  id: string;
  project_id: string;
  stage: string;
  status: 'started' | 'completed' | 'failed';
  message: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export function useProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const createProject = async (
    title: string,
    description: string,
    prompt: string,
    projectId?: string
  ): Promise<Project | null> => {
    if (!user) {
      setError('User must be authenticated');
      return null;
    }

    try {
      const { data, error } = await supabase.rpc('create_project_with_pipeline', {
        p_title: title,
        p_description: description,
        p_prompt: prompt,
        p_project_id: projectId,
      });

      if (error) throw error;

      // Fetch the created project
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', data)
        .single();

      if (fetchError) throw fetchError;

      setProjects(prev => [project, ...prev]);
      return project;
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err instanceof Error ? err.message : 'Failed to create project');
      return null;
    }
  };
  const updateBuildStatus = async (
    projectId: string,
    stage: string,
    status: 'started' | 'completed' | 'failed',
    message?: string,
    metadata?: Record<string, unknown>
  ) => {
    try {
      const { error } = await supabase.rpc('update_build_status', {
        p_project_id: projectId,
        p_stage: stage,
        p_status: status,
        p_message: message,
        p_metadata: metadata || {},
      });

      if (error) throw error;

      // Refresh projects to get updated status
      fetchProjects();
    } catch (err) {
      console.error('Error updating build status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update build status');
    }
  };

  const getBuildLogs = async (projectId: string): Promise<BuildLog[]> => {
    try {
      const { data, error } = await supabase
        .from('build_logs')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching build logs:', err);
      return [];
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [user, fetchProjects]);

  return {
    projects,
    loading,
    error,
    createProject,
    updateBuildStatus,
    getBuildLogs,
    deleteProject,
    refetch: fetchProjects,
  };
}
