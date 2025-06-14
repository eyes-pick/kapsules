'use client';

import { Suspense } from 'react';
import { AIChatShell } from '@/components/ai-chat/AIChatShell';
import { AIChatContent } from '@/components/ai-chat/AIChatContent';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AIChatPage() {
    const { user, loading, openAuthModal, setAuthMode } = useAuth();
    const router = useRouter();

    // Handle authentication
    const handleSignIn = () => {
        setAuthMode('signin');
        openAuthModal();
    };

    const handleSignUp = () => {
        setAuthMode('signup');
        openAuthModal();
    };

    // If loading, show a spinner
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    // If not authenticated, show a prompt to sign in or sign up
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 p-4">
                <div className="max-w-md w-full bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold mb-6 text-white">AI Project Generator</h1>
                    <p className="text-zinc-400 mb-8">
                        Please sign in or create an account to access the AI chat and project generator.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleSignIn}
                            className="w-full sm:w-auto"
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                        </Button>
                        <Button
                            onClick={handleSignUp}
                            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Sign Up
                        </Button>
                    </div>
                    <Button
                        variant="link"
                        className="mt-6 text-zinc-500 hover:text-zinc-400"
                        onClick={() => router.push('/')}
                    >
                        Return to Home
                    </Button>
                </div>
            </div>
        );
    }

    // If authenticated, show the chat interface
    return (
        <AIChatShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold mb-2">AI Project Generator</h1>
                    <p className="text-zinc-400">
                        Chat with AI to build and iterate on web projects in real-time. Ask the AI to create a project or improve an existing one.
                    </p>
                </div>

                <Suspense fallback={
                    <div className="flex items-center justify-center h-[600px] border border-zinc-800 rounded-lg">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                            <p className="text-zinc-500">Loading AI Chat...</p>
                        </div>
                    </div>
                }>
                    <AIChatContent />
                </Suspense>
            </div>
        </AIChatShell>
    );
}
