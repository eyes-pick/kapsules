'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  fallback = null,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, loading, openAuthModal, setAuthMode } = useAuth();

  useEffect(() => {
    // If auth is required but user is not logged in and not loading
    if (requireAuth && !user && !loading) {
      console.log('[PROTECTED ROUTE] User not authenticated, opening auth modal');
      setAuthMode('signin');
      openAuthModal();
    }
  }, [user, loading, requireAuth, openAuthModal, setAuthMode]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // If auth is required and user is not authenticated
  if (requireAuth && !user) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center space-y-4">
            <p className="text-gray-500">Please sign in to access this content.</p>
          </div>
        </div>
      )
    );
  }

  // If auth is not required or user is authenticated
  return <>{children}</>;
}
