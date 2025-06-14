import { createClient } from '@/utils/supabase/server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Shield, Database } from 'lucide-react';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

interface SecurityLintResult {
    name: string;
    title: string;
    level: 'WARN' | 'ERROR' | 'INFO';
    facing: string;
    categories: string[];
    description: string;
    detail: string;
    remediation: string;
    metadata: {
        name: string;
        type: string;
        schema: string;
    };
}

export default async function SupabasePage() {
    const supabase = await createClient();

    // Fetch todos to demonstrate working connection
    const { data: todos } = await supabase.from('todos').select();

    // Simulate the security lint result you provided
    const securityLintResult: SecurityLintResult = {
        name: "function_search_path_mutable",
        title: "Function Search Path Mutable",
        level: "WARN",
        facing: "EXTERNAL",
        categories: ["SECURITY"],
        description: "Detects functions where the search_path parameter is not set.",
        detail: "Function `next_auth.uid` has a role mutable search_path",
        remediation: "https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable",
        metadata: {
            name: "uid",
            type: "function",
            schema: "next_auth"
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Database className="h-8 w-8 text-green-600" />
                <h1 className="text-3xl font-bold">Supabase Security Dashboard</h1>
            </div>

            {/* Security Warning Alert */}
            <Alert className="border-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Security Warning Detected</AlertTitle>
                <AlertDescription className="text-yellow-700">
                    A function with mutable search_path has been detected in your database. This poses a security risk.
                </AlertDescription>
            </Alert>

            {/* Security Issue Details */}
            <Card className="border-yellow-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-yellow-600" />
                        Security Lint Result
                        <Badge variant="outline" className="ml-2 border-yellow-500 text-yellow-700">
                            {securityLintResult.level}
                        </Badge>
                    </CardTitle>
                    <CardDescription>{securityLintResult.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{securityLintResult.description}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Details</h4>
                        <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                            {securityLintResult.detail}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Affected Function</h4>
                        <div className="text-sm text-gray-600">
                            <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                                {securityLintResult.metadata.schema}.{securityLintResult.metadata.name}()
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                                ({securityLintResult.metadata.type})
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-1">Categories</h4>
                        <div className="flex gap-2">
                            {securityLintResult.categories.map((category) => (
                                <Badge key={category} variant="secondary" className="text-xs">
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Solution Card */}
            <Card className="border-green-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Security Fix Applied
                    </CardTitle>
                    <CardDescription>
                        A migration has been created to fix this security vulnerability.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Migration File Created</h4>
                        <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                            supabase/migrations/20240614000001_fix_uid_function_security.sql
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">What the fix does:</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Sets explicit <code className="bg-gray-100 px-1 rounded">search_path = &apos;&apos;</code> to prevent injection attacks</li>
                            <li>Recreates the function with <code className="bg-gray-100 px-1 rounded">SECURITY DEFINER</code></li>
                            <li>Maintains proper permissions for authenticated users</li>
                            <li>Adds documentation explaining the security improvement</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Next Steps:</h4>
                        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                            <li>Run the migration in your Supabase dashboard or CLI</li>
                            <li>Verify the function works correctly</li>
                            <li>Re-run the database linter to confirm the warning is resolved</li>
                        </ol>
                    </div>

                    <Alert className="border-blue-200 bg-blue-50">
                        <AlertDescription className="text-blue-700">
                            <strong>CLI Command:</strong> <code className="bg-blue-100 px-2 py-1 rounded">supabase db push</code>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            {/* Sample Data Display */}
            <Card>
                <CardHeader>
                    <CardTitle>Sample Todo Data</CardTitle>
                    <CardDescription>
                        Demonstrating that Supabase connection is working correctly
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {todos && todos.length > 0 ? (
                        <ul className="space-y-2">
                            {todos.map((todo: Todo) => (
                                <li key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                    <span className="text-sm font-medium">#{todo.id}</span>
                                    <span className="text-sm">{todo.task}</span>
                                    <Badge variant={todo.completed ? "default" : "secondary"} className="ml-auto">
                                        {todo.completed ? "Completed" : "Pending"}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            No todos found. This is expected if you haven&apos;t set up the todos table yet.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card>
                <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <a
                        href={securityLintResult.remediation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline block"
                    >
                        📖 Supabase Database Linter Documentation
                    </a>
                    <a
                        href="https://supabase.com/docs/guides/database/functions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline block"
                    >
                        📚 Database Functions Best Practices
                    </a>
                    <a
                        href="https://supabase.com/docs/guides/auth/auth-helpers/nextjs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline block"
                    >
                        🔐 Next.js Auth Helper Documentation
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}
