import { ReactNode } from "react";
import SiteHeader from "./siteHeader";

export default function LandingLayout({
    siteHeader = <SiteHeader />,
    heroSection,
    featureSection,
    footerSection
}: {
    siteHeader?: ReactNode;
    heroSection?: ReactNode;
    featureSection?: ReactNode;
    footerSection?: ReactNode;
}) {
    return (
        <div className="m-0 p-0 h-screen w-screen grid grid-rows-1 overflow-y-scroll overflow-x-hidden bg-zinc-950 ">
            {siteHeader}
            {heroSection}
            {featureSection}
            {footerSection}
        </div>
    );
};
