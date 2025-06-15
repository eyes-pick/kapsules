'use client';

import React, { useEffect, useState } from 'react';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { createClient } from '@/utils/supabase/client';
import { AIChatInterface } from './AIChatInterface';
import { Project } from '@/hooks/use-projects';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const supabase = createClient();

export function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [iframeKey, setIframeKey] = useState(0); // Key to force iframe refresh

  useEffect(() => {
    // Fetch projects from Supabase
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setProjects(data || []);
    };
    fetchProjects();

    // Set up real-time subscription for project updates
    const subscription = supabase
      .channel('projects_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const updatedProject = payload.new as Project;
            const oldProject = payload.old as Project;

            setProjects(prev =>
              prev.map(p => p.id === updatedProject.id ? updatedProject : p)
            );

            // Update selected project if it's the one that was updated
            if (selectedProject?.id === updatedProject.id) {
              setSelectedProject(updatedProject);

              // Force iframe refresh if project just became built
              if (oldProject.build_status !== 'built' && updatedProject.build_status === 'built') {
                setIframeKey(prev => prev + 1);
              }
            }
          } else if (payload.eventType === 'INSERT') {
            const newProject = payload.new as Project;
            setProjects(prev => [newProject, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [selectedProject?.id]);

  // Select first project by default
  useEffect(() => {
    if (projects.length && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  // Handle project generation from AI Chat
  const handleProjectGenerated = (projectId: string) => {
    // Find the project in the list or fetch it if not found
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    } else {
      // Fetch the specific project
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (!error && data) {
          setProjects(prev => [data, ...prev]);
          setSelectedProject(data);
        }
      };
      fetchProject();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'built':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'building':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getProjectUrl = (project: Project) => {
    // If project is built and has a preview URL, use it
    if (project.build_status === 'built' && project.preview_url) {
      return project.preview_url;
    }
    // Otherwise use the preview API endpoint
    return `/api/preview/${project.id}`;
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={30} minSize={20} className="flex flex-col min-h-screen">
        <AIChatInterface onProjectGenerated={handleProjectGenerated} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} minSize={50} className="flex flex-col min-h-screen">
        <ResizablePanelGroup direction="vertical" className="flex-1 min-h-screen">
          <ResizablePanel defaultSize={30} minSize={20} className="flex flex-col">
            <div className="flex-1 overflow-auto">
              <h2 className="text-lg font-semibold p-4">Projects</h2>
              <ul>
                {projects.map(project => (
                  <li
                    key={project.id}
                    className={`p-4 cursor-pointer hover:bg-zinc-700/50 ${selectedProject?.id === project.id ? 'bg-zinc-800' : ''
                      }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(project.build_status)}
                      <Badge variant="secondary" className="text-xs">
                        {project.build_status}
                      </Badge>
                    </div>
                    <div className="font-medium truncate">{project.title}</div>
                    {project.description && (
                      <div className="text-sm text-zinc-400 truncate mt-1">
                        {project.description}
                      </div>
                    )}
                    <div className="text-xs text-zinc-500 mt-1">
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70} minSize={50} className="flex flex-col min-h-screen">
            {selectedProject ? (
              <div className="flex flex-col h-full">
                <div className="border-b border-zinc-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(selectedProject.build_status)}
                    <h3 className="font-semibold">{selectedProject.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {selectedProject.build_status}
                    </Badge>
                  </div>
                  {selectedProject.description && (
                    <p className="text-sm text-zinc-400">{selectedProject.description}</p>
                  )}
                </div>
                {selectedProject.build_status === 'built' || selectedProject.preview_url ? (
                  <iframe
                    key={iframeKey} // Add key here to force refresh
                    src={getProjectUrl(selectedProject)}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    allow="clipboard-write; camera; microphone; geolocation; midi; vr; xr-spatial-tracking"
                    className="flex-1 w-full border-none"
                    title={`${selectedProject.title} - Preview`}
                  />
                ) : selectedProject.build_status === 'building' ? (
                  <div className="flex-1 flex items-center justify-center text-zinc-400">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                      <p>Building your project...</p>
                      <p className="text-sm mt-2">This may take a few minutes</p>
                    </div>
                  </div>
                ) : selectedProject.build_status === 'failed' ? (
                  <div className="flex-1 flex items-center justify-center text-zinc-400">
                    <div className="text-center">
                      <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p>Build failed</p>
                      <p className="text-sm mt-2">Please try regenerating the project</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-zinc-400">
                    <div className="text-center">
                      <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <p>Project is pending build</p>
                      <p className="text-sm mt-2">The build process will start automatically</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-screen text-zinc-400">
                Select a project to view its dev environment or ask the AI to create a new one.
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
