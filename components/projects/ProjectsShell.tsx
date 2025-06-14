import { ReactNode } from 'react';
import SiteHeader from '@/components/landing/siteHeader';
import { ProjectsContent } from './ProjectsContent';

export default function ProjectsShell({ children }: { children?: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <ProjectsContent />
      {children}
    </>
  );
}
