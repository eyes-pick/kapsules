'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/use-projects';
import { Loader2, Sparkles, Github, Upload, FileText, Settings, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const { user, openAuthModal, setAuthMode } = useAuth();
  const { createProject } = useProjects();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!user) {
      // Prompt for authentication if not logged in
      setAuthMode('signup'); // Encourage signup for new users
      openAuthModal();
      return;
    }

    if (!prompt.trim()) {
      return;
    }

    setIsGenerating(true);

    try {
      // Create project with AI pipeline
      const title = `App from: ${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}`;
      const description = `Generated from prompt: ${prompt}`;

      const project = await createProject(title, description, prompt);

      if (project) {
        console.log('Project created:', project);
        // TODO: Navigate to project view or show success message
        // You could add a toast notification here or redirect to project page
      }
    } catch (error) {
      console.error('Error creating project:', error);
      // TODO: Show error message to user
    } finally {
      setIsGenerating(false);
      setPrompt(''); // Clear the prompt after generation
    }
  };

  const handleAdvancedFeature = (featureName: string) => {
    if (!user) {
      console.log(`[HERO] User clicked ${featureName} - prompting for auth`);
      setAuthMode('signin');
      openAuthModal();
      return;
    }

    // Handle the feature for authenticated users
    console.log(`[HERO] Authenticated user accessing ${featureName}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-400/20 via-zinc-950 to-zinc-950 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="mb-2 text-4xl md:text-9xl font-bold bg-gradient-to-b from-green-400/90 to-green-600/10 bg-clip-text text-transparent leading-40">
              Kapsules
            </h1>
            {user && (
              <Badge
                variant="secondary"
                className="bg-green-600/20 text-green-400 border-green-600/30"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            )}
          </div>
          <h2 className="mb-8 text-2xl md:text-3xl text-zinc-300 font-light leading-12">
            Build, Tinker and Deploy Fullstack React/Node.js Applications with AI Agents!
          </h2>
          {user && (
            <p className="text-lg text-green-400/80 max-w-xl mx-auto">
              Welcome back, {user.email?.split('@')[0]}! Ready to build something amazing?
            </p>
          )}
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm max-w-2xl mx-auto mb-33">
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder={user ? 'Build me an app that...' : 'Sign in to start building...'}
                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-200 h-[70px] placeholder:text-zinc-500"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                disabled={!user || isGenerating}
              />
              <Button
                className="bg-zinc-800 hover:bg-green-700 text-slate-200/30 hover:text-green-100/90 px-6 h-[70px]"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center justify-center text-zinc-500 text-sm gap-4">
              <Link href="/ai-chat">
                <Button
                  className="w-[1fr] bg-green-600/30 hover:bg-green-600 text-green-100/80 hover:text-green-100 font-medium"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Chat
                </Button>
              </Link>
              <Button
                className="w-[1fr] bg-zinc-800 hover:bg-green-600/80 text-slate-200/30 hover:text-green-100/90 font-medium"
                onClick={() => handleAdvancedFeature('Github Connection')}
              >
                <Github className="w-4 h-4 mr-2" />
                Connect Github
              </Button>
              <Button
                className="w-[1fr] bg-zinc-800 hover:bg-green-700/70 text-slate-200/30 hover:text-green-100/90 font-medium"
                onClick={() => handleAdvancedFeature('Image Upload')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
              <Button
                className="w-[1fr] bg-zinc-800 hover:bg-green-700/70 text-slate-200/30 hover:text-green-100/90 font-medium"
                onClick={() => handleAdvancedFeature('File Upload')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
              <Button
                className="w-[1fr] bg-zinc-800 hover:bg-green-600/80 text-slate-200/30 hover:text-green-100/90 font-medium"
                onClick={() => handleAdvancedFeature('Setup Script')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Setup Script
              </Button>
            </div>
            {!user && (
              <div className="text-center text-sm text-zinc-400 pt-2">
                <p>
                  <span className="text-green-400">Sign up free</span> to start building with AI •
                  No credit card required
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
