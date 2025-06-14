import { ReactNode } from 'react';
import { SettingsContent } from './SettingsContent';

export default function SettingsShell({ children }: { children?: ReactNode }) {
    return (
        <div>
            <SettingsContent />
            {children}
        </div>
    );
}
