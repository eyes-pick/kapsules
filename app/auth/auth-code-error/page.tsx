import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-600">Authentication Error</CardTitle>
                    <CardDescription>
                        We encountered an issue while trying to sign you in.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">Sign-in failed</AlertTitle>
                        <AlertDescription className="text-red-700">
                            The authentication code was invalid or expired. This can happen if:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>The verification link is too old</li>
                                <li>The link has already been used</li>
                                <li>There was a network error during the process</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                        <Link href="/" className="w-full">
                            <Button className="w-full" variant="default">
                                <Home className="w-4 h-4 mr-2" />
                                Go to Homepage
                            </Button>
                        </Link>

                        <Link href="/" className="w-full">
                            <Button className="w-full" variant="outline">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Try Signing In Again
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        <p>
                            If you continue to experience issues, please{' '}
                            <a href="mailto:support@kapsules.com" className="text-blue-600 hover:underline">
                                contact support
                            </a>
                            .
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
