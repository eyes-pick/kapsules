'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react'

export function AuthModal() {
    const {
        authModalOpen,
        closeAuthModal,
        signIn,
        signUp,
        authMode,
        setAuthMode
    } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setError(null)
        setMessage(null)
        setLoading(false)
    }

    const handleClose = () => {
        resetForm()
        closeAuthModal()
    }

    const handleTabChange = (value: string) => {
        setAuthMode(value as 'signin' | 'signup')
        resetForm()
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        console.log('[AUTH MODAL] Attempting sign in for:', email)

        const { error } = await signIn(email, password)

        if (error) {
            console.error('[AUTH MODAL] Sign in error:', error.message)
            setError(error.message)
            setLoading(false)
        } else {
            console.log('[AUTH MODAL] Sign in successful')
            resetForm()
            // Modal will close automatically via AuthContext
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        console.log('[AUTH MODAL] Attempting sign up for:', email)

        const { error } = await signUp(email, password)

        if (error) {
            console.error('[AUTH MODAL] Sign up error:', error.message)
            setError(error.message)
            setLoading(false)
        } else {
            console.log('[AUTH MODAL] Sign up successful')
            setMessage('Check your email for a confirmation link!')
            setLoading(false)
            // Don't reset form immediately to show the message
        }
    }

    return (
        <Dialog open={authModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Welcome to Kapsules
                    </DialogTitle>
                    <DialogDescription>
                        Sign in to your account or create a new one to get started.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={authMode} onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin" className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="signup" className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Sign Up
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="space-y-4">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert className="border-red-200 bg-red-50">
                                    <AlertDescription className="text-red-700">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Sign In
                                    </>
                                )}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Choose a password (min 6 characters)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert className="border-red-200 bg-red-50">
                                    <AlertDescription className="text-red-700">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {message && (
                                <Alert className="border-green-200 bg-green-50">
                                    <AlertDescription className="text-green-700">
                                        {message}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Create Account
                                    </>
                                )}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="text-center text-xs text-gray-500">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                </div>
            </DialogContent>
        </Dialog>
    )
}
