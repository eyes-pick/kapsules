'use client';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import SiteHeader from './siteHeader';
import HeroSection from './heroSection';
import ProjectSection from './projectSection';
// import FooterSection from "./footerSection";
/**
 * LandingLayout Component
 * This component serves as the main layout for the landing page of the application.
 * It includes a site header, hero section, project section, and footer section.
 * Now also includes authentication context and modal for user auth functionality.
 *
 * @param {Object} props - The properties for the LandingLayout component.
 * @param {ReactNode} [props.siteHeader] - The site header component.
 * @param {ReactNode} [props.heroSection] - The hero section component.
 * @param {ReactNode} [props.projectSection] - The project section component.
 * @param {ReactNode} [props.footerSection] - The footer section component.
 *
 * @returns {JSX.Element} The rendered LandingLayout component.
 */

// This is the main layout for the landing page
export default function LandingLayout({
  siteHeader = <SiteHeader />,
  heroSection = <HeroSection />,
  projectSection = <ProjectSection />,
  // footerSection = <FooterSection />
}: {
  siteHeader?: ReactNode;
  heroSection?: ReactNode;
  projectSection?: ReactNode;
  // footerSection?: ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen w-full bg-zinc-950 text-white overflow-y-scroll overflow-x-hidden flex flex-col">
        {siteHeader}
        <main className="flex-1 min-h-screen">
          {heroSection}
          {projectSection}
          {/* footerSection */}
        </main>
        {/* Auth Modal - Available globally within the auth context */}
        <AuthModal />
      </div>
    </AuthProvider>
  );
}
