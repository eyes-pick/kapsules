'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useProjects } from '@/hooks/use-projects';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onProjectGenerated: (projectId: string) => void;
}

export function AIChatInterface({ onProjectGenerated }: AIChatInterfaceProps) {
  const { user } = useAuth();
  const { createProject } = useProjects();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm your AI assistant. Tell me what kind of project you'd like to build, and I'll help you create it.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    if (!user) {
      // Add error message for unauthenticated users
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Please sign in to create projects. You need to be authenticated to use this feature.",
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if the user is asking to create a new project
      const isProjectCreationRequest =
        input.toLowerCase().includes('create') ||
        input.toLowerCase().includes('build') ||
        input.toLowerCase().includes('make') ||
        input.toLowerCase().includes('generate') ||
        input.toLowerCase().includes('new project');

      if (isProjectCreationRequest) {
        // Create a new project
        const title = `Project: ${input.substring(0, 50)}${input.length > 50 ? '...' : ''}`;
        const description = `AI-generated project from prompt: ${input}`;

        // Add AI response indicating project creation
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            content: "I'll create a new project for you based on your requirements. This may take a few minutes to build and deploy...",
            role: 'assistant',
            timestamp: new Date(),
          },
        ]);

        const project = await createProject(title, description, input);

        if (project) {
          // Notify parent component about the new project
          onProjectGenerated(project.id);

          // Add success message
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              content: `Great! I've created your project "${project.title}". It's now building and will be available shortly. You can see the progress in the project panel.`,
              role: 'assistant',
              timestamp: new Date(),
            },
          ]);
        } else {
          throw new Error('Failed to create project');
        }
      } else {
        // Handle general conversation (future enhancement)
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            content: "I'd be happy to help! To create a new project, please describe what you'd like to build. For example: 'Create a todo app' or 'Build a portfolio website'.",
            role: 'assistant',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error in AI chat:', error);

      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "I'm sorry, I encountered an error while creating your project. Please try again.",
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">AI Chat</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMessages([
              {
                id: '1',
                content:
                  "Hello! I'm your AI assistant. Tell me what kind of project you'd like to build, and I'll help you create it.",
                role: 'assistant',
                timestamp: new Date(),
              },
            ]);
          }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 mb-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3 rounded-lg p-3',
                message.role === 'assistant' ? 'bg-zinc-800' : 'bg-green-700/20'
              )}
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-zinc-700">
                {message.role === 'assistant' ? (
                  <Bot className="h-5 w-5 text-zinc-300" />
                ) : (
                  <User className="h-5 w-5 text-green-300" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm text-zinc-200">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-24 resize-none pr-12 bg-zinc-800 border-zinc-700 text-zinc-200"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="absolute bottom-3 right-3 bg-green-700 hover:bg-green-600"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
