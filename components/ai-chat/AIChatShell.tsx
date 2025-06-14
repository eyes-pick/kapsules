'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Github,
    Sparkles,
    Settings,
    ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AIChatShellProps {
    children: React.ReactNode;
}

export function AIChatShell({ children }: AIChatShellProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Prevent hydration errors by not rendering anything server-side
    }

    return (
        <div className="bg-zinc-950 min-h-screen flex flex-col">
            <header className="border-b border-zinc-800 py-4">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => router.push('/')}
                            >
                                <ArrowLeft className="h-5 w-5 text-zinc-400" />
                            </Button>

                            <Link href="/" className="flex items-center gap-2">
                                <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                    Kapsules
                                </span>
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    AI
                                </Badge>
                            </Link>
                        </div>

                        <Separator orientation="vertical" className="h-6" />

                        <nav className="hidden md:flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                                Projects
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                                Templates
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                                Documentation
                            </Button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        {user && (
                            <>
                                <Button variant="outline" size="sm" className="text-xs gap-1 hidden sm:flex">
                                    <Github className="h-3 w-3" />
                                    Connect GitHub
                                </Button>

                                <Button variant="outline" size="sm" className="text-xs gap-1 hidden sm:flex">
                                    <Settings className="h-3 w-3" />
                                    Settings
                                </Button>

                                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-xs gap-1">
                                    <ExternalLink className="h-3 w-3" />
                                    View Docs
                                </Button>

                                <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-300">
                                    {user.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 container py-6">
                {children}
            </main>

            <footer className="border-t border-zinc-800 py-4">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xs text-zinc-500">
                            &copy; {new Date().getFullYear()} Kapsules • AI-powered development environment
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="link" size="sm" className="text-zinc-500 hover:text-zinc-300 h-auto p-0">
                                Privacy
                            </Button>
                            <Separator orientation="vertical" className="h-4" />
                            <Button variant="link" size="sm" className="text-zinc-500 hover:text-zinc-300 h-auto p-0">
                                Terms
                            </Button>
                            <Separator orientation="vertical" className="h-4" />
                            <Button variant="link" size="sm" className="text-zinc-500 hover:text-zinc-300 h-auto p-0">
                                Support
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
