'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserDropdown } from '@/components/auth/UserDropdown'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header() {
    const { user, openAuthModal, setAuthMode } = useAuth()

    const handleGetStarted = () => {
        if (!user) {
            console.log('[HEADER] User not authenticated, opening auth modal')
            setAuthMode('signup')
            openAuthModal()
        }
    }

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="h-6 w-6 bg-primary rounded-sm" />
                        <span className="hidden font-bold sm:inline-block">Kapsules</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Home
                        </Link>
                        <Link
                            href="/supabase"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/docs"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Docs
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other components can go here */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        {!user && (
                            <Button onClick={handleGetStarted} size="sm">
                                Get Started
                            </Button>
                        )}
                        <UserDropdown />
                    </nav>
                </div>
            </div>
        </header>
    )
}
