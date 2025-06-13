import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel } from "@/components/ui/menubar";

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-cols-[3fr] items-center justify-between h-16 px-6">
                {/* Left: Logo/Brand */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="text-2xl font-bold px-3 py-2 tracking-tight text-white">Kapsules</Button>
                </div>
                {/* Center: Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="font-semibold outline-none border-none">Navigate</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>Home</MenubarItem>
                                <MenubarItem>Features</MenubarItem>
                                <MenubarItem>Pricing</MenubarItem>
                                <MenubarItem>Docs</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </nav>
                {/* Right: Account/Settings */}
                <div className="flex items-center gap-2">
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger asChild className="bg-inherit">
                                <Button variant="ghost" className="font-semibold outline-none border-none">Account</Button>
                            </MenubarTrigger>
                            <MenubarContent align="end">
                                <MenubarLabel>Account</MenubarLabel>
                                <MenubarItem>Profile</MenubarItem>
                                <MenubarItem>Settings</MenubarItem>
                                <MenubarItem>Logout</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
        </header>
    );
}