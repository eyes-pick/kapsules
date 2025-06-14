import { ReactNode } from "react";
import SiteHeader from "./siteHeader";
import HeroSection from "./heroSection";
// import FeatureSection from "./featureSection";
// import FooterSection from "./footerSection";
/**
 * LandingLayout Component
 * This component serves as the main layout for the landing page of the application.
 * It includes a site header, hero section, feature section, and footer section.
 *
 * @param {Object} props - The properties for the LandingLayout component.
 * @param {ReactNode} [props.siteHeader] - The site header component.
 * @param {ReactNode} [props.heroSection] - The hero section component.
 * @param {ReactNode} [props.featureSection] - The feature section component.
 * @param {ReactNode} [props.footerSection] - The footer section component.
 *
 * @returns {JSX.Element} The rendered LandingLayout component.
 */

// This is the main layout for the landing page
export default function LandingLayout({
    siteHeader = <SiteHeader />,
    heroSection = <HeroSection />,
    // featureSection = <FeatureSection />,
    // footerSection = <FooterSection />
}: {
    siteHeader?: ReactNode;
    heroSection?: ReactNode;
    // featureSection?: ReactNode;
    // footerSection?: ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white">
            {siteHeader}
            <main className="flex-1">
                {heroSection}
                {/* featureSection */}
                {/* footerSection */}
            </main>
        </div>
    );
};
