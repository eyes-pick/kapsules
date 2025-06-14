import { ReactNode } from 'react';
import { ProjectsContent } from './ProjectsContent';

export default function ProjectsShell({ children }: { children?: ReactNode }) {
    return (
        <div>
            <ProjectsContent />
            {children}
        </div>
    );
}
