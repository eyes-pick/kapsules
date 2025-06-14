import { ReactNode } from 'react';
import { SettingsContent } from './SettingsContent';
import SiteHeader from '@/components/landing/siteHeader';

export default function SettingsShell({ children }: { children?: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <SettingsContent />
      {children}
    </>
  );
}
