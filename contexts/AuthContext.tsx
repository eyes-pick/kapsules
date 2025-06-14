'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User, Session, AuthError } from '@supabase/supabase-js'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>
    signIn: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>
    signOut: () => Promise<{ error: AuthError | null }>
    openAuthModal: () => void
    closeAuthModal: () => void
    authModalOpen: boolean
    authMode: 'signin' | 'signup'
    setAuthMode: (mode: 'signin' | 'signup') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

    const supabase = createClient()

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }

        getSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('[AUTH]', event, session?.user?.email)
                setSession(session)
                setUser(session?.user ?? null)
                setLoading(false)

                // Close auth modal on successful auth
                if (event === 'SIGNED_IN') {
                    setAuthModalOpen(false)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (data.user && !error) {
            console.log('[AUTH] Sign up successful', data.user.email)
        }

        return { user: data.user, error }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (data.user && !error) {
            console.log('[AUTH] Sign in successful', data.user.email)
        }

        return { user: data.user, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            console.log('[AUTH] Sign out successful')
        }

        return { error }
    }

    const openAuthModal = () => {
        console.log('[AUTH] Opening auth modal')
        setAuthModalOpen(true)
    }

    const closeAuthModal = () => {
        console.log('[AUTH] Closing auth modal')
        setAuthModalOpen(false)
    }

    const value = {
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        openAuthModal,
        closeAuthModal,
        authModalOpen,
        authMode,
        setAuthMode
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
