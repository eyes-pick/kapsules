'use client'
import { ReactNode } from "react";
import SiteHeader from "./siteHeader";
import HeroSection from "./heroSection";
import ProjectSection from "./projectSection";
// import FooterSection from "./footerSection";
/**
 * LandingLayout Component
 * This component serves as the main layout for the landing page of the application.
 * It includes a site header, hero section, project section, and footer section.
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
        <div className="min-h-screen w-full bg-zinc-950 text-white overflow-y-scroll overflow-x-hidden">
            {siteHeader}
            <main className="flex-1">
                {heroSection}
                {projectSection}
                {/* footerSection */}
            </main>
        </div>
    );
};
