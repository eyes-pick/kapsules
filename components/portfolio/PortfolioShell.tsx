import { ReactNode } from 'react';
import { PortfolioContent } from './PortfolioContent';
import SiteHeader from '@/components/landing/siteHeader';

export default function PortfolioShell({ children }: { children?: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <PortfolioContent />
      {children}
    </>
  );
}
