'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code, Loader2 } from 'lucide-react';

interface AIIframeContentProps {
    projectId: string | null;
    projectUrl: string | null;
}

export function AIIframeContent({ projectId, projectUrl }: AIIframeContentProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Reset loading state when URL changes
    useEffect(() => {
        if (projectUrl) {
            setIsLoading(true);
            setError(null);
        }
    }, [projectUrl]);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setError('Failed to load the project preview. Please try again later.');
    };

    return (
        <Card className="h-full border-none rounded-none bg-transparent">
            <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-xl">Project Preview</CardTitle>
                <CardDescription>
                    {projectId
                        ? `Viewing project #${projectId.substring(0, 8)}...`
                        : 'Your generated project will appear here'}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4 h-[calc(100%-90px)]">
                {projectUrl ? (
                    <>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 z-10">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                                    <p className="text-sm text-zinc-400">Loading preview...</p>
                                </div>
                            </div>
                        )}
                        <iframe
                            src={projectUrl}
                            className="w-full h-full border border-zinc-800 rounded-md bg-white"
                            title="Project Preview"
                            sandbox="allow-same-origin allow-scripts allow-forms"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                        />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center border border-zinc-800 rounded-md bg-zinc-900/50">
                        <div className="text-center p-6">
                            <Code className="h-10 w-10 text-zinc-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-300 mb-2">No Project Yet</h3>
                            <p className="text-sm text-zinc-500 max-w-md">
                                Ask the AI to build something for you, and the preview will appear here. Try saying &quot;Build me a...&quot;
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-10 rounded-md">
                        <div className="bg-zinc-800 p-6 rounded-lg border border-red-500/30 max-w-md">
                            <h3 className="text-lg font-medium text-red-400 mb-2">Error Loading Preview</h3>
                            <p className="text-sm text-zinc-400">{error}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}