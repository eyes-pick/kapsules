import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import SettingsShell from '@/components/settings/SettingsShell';

export default function SettingsPage() {
  return (
    <AuthProvider>
      <SettingsShell />
      <AuthModal />
    </AuthProvider>
  );
}
