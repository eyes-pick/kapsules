'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Send,
    Bot,
    User,
    RefreshCw,
    Clipboard,
    Check,
    Sparkles,
    PanelRight,
    PanelLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from '@/components/ui/resizable';
import { useProjects } from '@/hooks/use-projects';
import { AIIframeContent } from './AIIframeContent';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    projectId?: string;
}

export function AIChatContent() {
    const { user } = useAuth();
    const { createProject } = useProjects() || {};
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hello! I'm your AI assistant. I can help you build web projects and make iterations. Try asking me to build something!",
            role: 'assistant',
            timestamp: new Date(),
        },
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [currentProjectUrl, setCurrentProjectUrl] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of messages when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const generateResponse = async (userMessage: string): Promise<{ content: string; projectId?: string; projectUrl?: string }> => {
        // Check if it's a project generation request
        const isProjectRequest = /build|create|generate|make/i.test(userMessage);

        if (isProjectRequest) {
            try {
                // If we detect a project generation request, try to create a project
                if (createProject) {
                    const title = `AI Generated: ${userMessage.substring(0, 30)}${userMessage.length > 30 ? '...' : ''}`;
                    const description = `Generated from chat: ${userMessage}`;

                    const project = await createProject(title, description, userMessage);

                    if (project) {
                        return {
                            content: `I've created a new project based on your request! You can see it in the preview panel. The project ID is ${project.id}.`,
                            projectId: project.id,
                            projectUrl: project.preview_url || `/api/preview/${project.id}`
                        };
                    }
                }
            } catch (error) {
                console.error('Error creating project:', error);
                throw new Error('Failed to create project. Please try again.');
            }
        }

        // Default responses if no project was created
        const responses = [
            `I understand you're asking about "${userMessage.slice(0, 30)}...". Let me help with that. You can approach this by using React hooks with a clean component structure.`,
            `That's a great question about ${userMessage.split(' ').slice(0, 3).join(' ')}. I can help you build this as a project. Just ask me to "generate a project" with your requirements.`,
            `I can help you with that. To create a project based on your requirements, type something like "build me a [your idea]" and I'll generate it for you.`,
            `Based on your question, I'd recommend using a combination of Next.js and Tailwind CSS. Would you like me to generate a sample project demonstrating this approach?`,
        ];

        return {
            content: responses[Math.floor(Math.random() * responses.length)]
        };
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Get AI response
            const response = await generateResponse(input);

            // Add AI message
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response.content,
                role: 'assistant',
                timestamp: new Date(),
                projectId: response.projectId
            };

            setMessages(prev => [...prev, aiMessage]);

            // If we got a project back, update the iframe
            if (response.projectId && response.projectUrl) {
                setCurrentProjectId(response.projectId);
                setCurrentProjectUrl(response.projectUrl);
            }
        } catch (error) {
            console.error('Error generating response:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to get a response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), 2000);
                toast.success('Copied to clipboard');
            },
            () => {
                toast.error('Failed to copy text');
            }
        );
    };

    const togglePanelCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleIterate = async (projectId: string, improvement: string) => {
        if (!projectId) return;

        setIsLoading(true);

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: `Please improve this project: ${improvement}`,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);

        try {
            // Call the AI iteration middleware API
            const response = await fetch('/api/ai-iterate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId,
                    iterationPrompt: improvement,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update the project');
            }
            await response.json();

            // Add AI response message
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `I've updated the project based on your request to "${improvement}". You can see the changes in the preview panel.`,
                role: 'assistant',
                timestamp: new Date(),
                projectId: projectId
            };

            setMessages(prev => [...prev, aiMessage]);

            // Force refresh the iframe by updating the URL with a timestamp
            setCurrentProjectUrl(prev => {
                if (prev) {
                    // Add a timestamp query param to force iframe refresh
                    return prev.includes('?')
                        ? `${prev}&t=${Date.now()}`
                        : `${prev}?t=${Date.now()}`;
                }
                return prev;
            });

            toast.success('Project updated!');
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update the project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ResizablePanelGroup direction="horizontal" className="min-h-[85vh] rounded-lg border border-zinc-800">
            <ResizablePanel
                defaultSize={50}
                minSize={30}
                maxSize={isCollapsed ? 95 : 70}
                className="min-h-[85vh]"
            >
                <Card className="h-full border-none rounded-none bg-transparent">
                    <CardHeader className="px-4 pt-4 pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">AI Chat Assistant</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePanelCollapse}
                                className="h-8 w-8"
                            >
                                {isCollapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
                            </Button>
                        </div>
                        <CardDescription>
                            Chat with AI to build and iterate on your projects
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4 overflow-hidden flex-grow h-[calc(100%-140px)]">
                        <div className="h-full overflow-y-auto pr-2 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'
                                        }`}
                                >
                                    {msg.role === 'assistant' && (
                                        <Avatar className="h-8 w-8 bg-green-700/30 border border-green-700/20">
                                            <AvatarFallback>AI</AvatarFallback>
                                            <AvatarImage>
                                                <Bot className="h-4 w-4" />
                                            </AvatarImage>
                                        </Avatar>
                                    )}

                                    <div className="flex flex-col max-w-[80%]">
                                        <div
                                            className={`py-2 px-3 rounded-lg ${msg.role === 'assistant'
                                                    ? 'bg-zinc-800 text-zinc-200 border border-zinc-700/50'
                                                    : 'bg-green-700/20 text-green-100 border border-green-700/30'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

                                            {msg.projectId && msg.role === 'assistant' && (
                                                <div className="mt-2 pt-2 border-t border-zinc-700/30">
                                                    <p className="text-xs text-zinc-400 mb-2">What would you like to change?</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['Improve UI', 'Add dark mode', 'Fix responsive layout', 'Add features', 'Optimize code'].map((improvement) => (
                                                            <Button
                                                                key={improvement}
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-7 text-xs bg-zinc-800/50 border-zinc-700/50 hover:bg-green-800/20 hover:text-green-100"
                                                                onClick={() => handleIterate(msg.projectId!, improvement)}
                                                                disabled={isLoading}
                                                            >
                                                                <Sparkles className="h-3 w-3 mr-1" />
                                                                {improvement}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-zinc-500">
                                                {msg.timestamp.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>

                                            {msg.role === 'assistant' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0 text-zinc-500 hover:text-zinc-300"
                                                    onClick={() => copyToClipboard(msg.content, msg.id)}
                                                >
                                                    {copiedId === msg.id ? (
                                                        <Check className="h-3 w-3" />
                                                    ) : (
                                                        <Clipboard className="h-3 w-3" />
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {msg.role === 'user' && (
                                        <Avatar className="h-8 w-8 bg-zinc-700/30 border border-zinc-700/20">
                                            <AvatarFallback>{user?.email?.charAt(0) || 'U'}</AvatarFallback>
                                            <AvatarImage>
                                                <User className="h-4 w-4" />
                                            </AvatarImage>
                                        </Avatar>
                                    )}
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </div>
                    </CardContent>

                    <CardFooter className="px-4 py-3 border-t border-zinc-800">
                        <div className="flex w-full gap-2">
                            <Input
                                placeholder="Ask AI to build or improve your project..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                                className="flex-1 bg-zinc-800 border-zinc-700"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={isLoading || !input.trim()}
                                className="bg-green-700 hover:bg-green-600 text-white"
                            >
                                {isLoading ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />
            <ResizablePanel
                defaultSize={50}
                minSize={isCollapsed ? 5 : 30}
                maxSize={70}
                className={isCollapsed ? 'min-w-[50px]' : ''}
            >
                <AIIframeContent projectId={currentProjectId} projectUrl={currentProjectUrl} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
