'use client';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar';
import { useAuth } from '@/contexts/AuthContext';
import { UserDropdown } from '@/components/auth/UserDropdown';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

export default function SiteHeader() {
  const { user, openAuthModal, setAuthMode } = useAuth();

  const handleSignIn = () => {
    setAuthMode('signin');
    openAuthModal();
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    openAuthModal();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-4">
          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="bg-transparent text-green-500 hover:text-green-400 text-2xl p-2 border-none">
                ◱
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <a href="/subscribe">Pricing</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/learn">Learning</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/templates">Templates</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/compete">Competitions</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/docs">Documentation</a>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <a
            href="./"
            className="text-2xl md:text-3xl font-bold text-green-50 hover:text-green-200 transition-colors"
          >
            Kapsules
          </a>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="./learn" className="text-zinc-300 hover:text-green-400 transition-colors">
              Discover
            </a>
            <a href="/templates" className="text-zinc-300 hover:text-green-400 transition-colors">
              Templates
            </a>
          </nav>

          {/* Auth Section */}
          {user ? (
            // Show user dropdown when authenticated
            <UserDropdown />
          ) : (
            // Show login/signup buttons when not authenticated
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignIn}
                className="text-zinc-300 hover:text-green-400 hover:bg-zinc-800"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={handleSignUp}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
