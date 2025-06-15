'use client';

import React, { useEffect, useState } from 'react';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { createClient } from '@/utils/supabase/client';
import { AIChatInterface } from './AIChatInterface';

const supabase = createClient();

interface Project {
  id: string;
  name: string;
  type: string;
}

export function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Fetch projects from Supabase
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, type')
        .eq('type', 'vite'); // Only Vite projects
      if (!error) setProjects(data || []);
    };
    fetchProjects();
  }, []);

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
          .select('id, name, type')
          .eq('id', projectId)
          .single();

        if (!error && data) {
          setProjects(prev => [...prev, data]);
          setSelectedProject(data);
        }
      };
      fetchProject();
    }
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
                    className={`p-4 cursor-pointer ${selectedProject?.id === project.id ? 'bg-zinc-800' : ''}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.name}
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70} minSize={50} className="flex flex-col min-h-screen">
            {selectedProject ? (
              <iframe
                src="http://localhost:8080"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                allow="clipboard-write; camera; microphone; geolocation; midi; vr; xr-spatial-tracking"
                className="flex-1 w-full min-h-screen border-none"
                title="Sandbox Environment"
              />
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
