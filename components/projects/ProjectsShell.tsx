import { ReactNode } from 'react';
import SiteHeader from '@/components/landing/siteHeader';
import { ProjectsContent } from './ProjectsContent';

export default function ProjectsShell({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 min-h-screen px-4 py-2">
        <ProjectsContent />
        {children}
      </main>
    </div>
  );
}
