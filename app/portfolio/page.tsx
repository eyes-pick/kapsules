import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import PortfolioShell from '@/components/portfolio/PortfolioShell';

export default function PortfolioPage() {
  return (
    <AuthProvider>
      <PortfolioShell />
      <AuthModal />
    </AuthProvider>
  );
}
