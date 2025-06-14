'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { AuthModal } from '@/components/auth/AuthModal';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            {children}
            <AuthModal />
            <Toaster position="top-right" />
        </AuthProvider>
    );
}
