import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import ProjectsShell from '@/components/projects/ProjectsShell';

export default function ProjectsPage() {
  return (
    <AuthProvider>
      <ProjectsShell />
      <AuthModal />
    </AuthProvider>
  );
}
