import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/use-projects';
import { ExternalLink, Play, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ProjectSection() {
  const { user, openAuthModal, setAuthMode } = useAuth();
  const { projects, loading, deleteProject } = useProjects();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'building':
        return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'built':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(projectId);
    }
  };

  const handleLoginPrompt = () => {
    setAuthMode('signin');
    openAuthModal();
  };

  return (
    <section className="py-22 px-4">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="projects" className="w-full ">
          <TabsList className="flex w-full gap-6 grid-cols-1 bg-white/0 pt-0 mb-7 max-w-[100%] justify-center">
            <TabsTrigger
              value="projects"
              className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 transition-all focus ease-in duration-150"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 transition-all ease-in duration-150"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 transition-all ease-in duration-150"
            >
              Community
            </TabsTrigger>
            <TabsTrigger
              value="discover"
              className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 data-[state=active]:bg-green-600/30 transition-all ease-in duration-150"
            >
              Discover
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="projects"
            className="flex flex-col mt-4 p-8 bg-green-900/20 shadow-green-900/15 shadow-2xl rounded-lg text-zinc-200 gap-6"
          >
            {!user ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">Sign in to view your projects</h3>
                <p className="text-zinc-400 mb-6">Create an account to start building AI-powered applications</p>
                <Button onClick={handleLoginPrompt} className="bg-green-600 hover:bg-green-700">
                  Sign In
                </Button>
              </div>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-zinc-400">Loading your projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">No projects yet</h3>
                <p className="text-zinc-400 mb-6">Start by creating your first AI-powered application above</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.build_status)}
                        <Badge variant="secondary" className="text-xs">
                          {project.build_status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mb-4">
                      <Image
                        alt={`${project.title} preview`}
                        src={project.preview_url || "/images/placeholder.png"}
                        width={300}
                        height={200}
                        className="w-full rounded-lg bg-blend-overlay hover:opacity-80 opacity-90 ease-out transition-opacity duration-300 shadow-lg shadow-zinc-800/50"
                      />
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-zinc-200 truncate">{project.title}</h3>

                      {project.description && (
                        <p className="text-sm text-zinc-400 line-clamp-2">{project.description}</p>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-zinc-500">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          {project.preview_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(project.preview_url!, '_blank')}
                              className="text-green-400 hover:text-green-300"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
