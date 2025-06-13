import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel } from "@/components/ui/menubar";
import { Label } from "@/components/ui/label";

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-zinc-900 backdrop-blur-md border-b border-zinc-800 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-cols-[3fr] h-16 px-6">
                {/* left: Navigation */}
                <div className="flex items-center gap-2">
                    <Menubar className="bg-transparent justify-between flex items-center gap-6 text-green-700 focus:text-green-700/60  max-w-[73px] outline-0 border-0 shadow-0">
                        <MenubarMenu>
                            <MenubarTrigger className="bg-none text-green-700 focus:text-green-700/60 text-xl max-w-[28px] hover:text-green-100/30 hover:text-2xl outline-0 border-0 shadow-0 mr-6">◱</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem><a href="/subscribe">Pricing</a></MenubarItem>
                                <MenubarItem><a href="/learn">Learning</a></MenubarItem>
                                <MenubarItem><a href="/templates">Templates</a></MenubarItem>
                                <MenubarItem><a href="/compete">Competitions</a></MenubarItem>
                                <MenubarItem><a href="/docs">Documentation</a></MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                {/* Left: Logo/Brand */}
                <div className="flex items-center gap-2">
                    <Label className="text-3xl font-bold px-3 py-2 tracking-tight text-green-50"><a href="./">Kapsules</a></Label>
                </div>

                {/* Right: Account/Settings */}
                <div className="flex items-center">
                    <Menubar className="bg-transparent justify-between md:flex items-center gap-8 text-green-700 focus:text-green-700/60 hover:text-green-100/30 max-w-[50px] outline-0 border-0 shadow-0">
                        <MenubarMenu>
                            <MenubarTrigger className="text-green-500/55 focus:text-green-700/60 hover:text-green-100/30 max-w-[50px] outline-0 border-0 shadow-0"><a href="./learn">Discover</a></MenubarTrigger>
                            <MenubarTrigger className="text-green-500/55 focus:text-green-700/60 hover:text-green-100/30 max-w-[50px] outline-0 border-0 shadow-0 mr-4"><a href="/templates">Templates</a></MenubarTrigger>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className="text-green-500/55 focus:text-green-700/60 hover:text-green-100/30 max-w-[50px] outline-0 border-0 shadow-0">Profile</MenubarTrigger>
                            <MenubarContent align="end">
                                <MenubarLabel><a href="./projects">Projects</a></MenubarLabel>
                                <MenubarItem><a href="./portfolio">Portfolio</a></MenubarItem>
                                <MenubarItem><a href="./settings">Settings</a></MenubarItem>
                                <MenubarItem><a href="./">Logout</a></MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
        </header>
    );
}