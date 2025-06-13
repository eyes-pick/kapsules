import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel } from "@/components/ui/menubar";
import { Label } from "@/components/ui/label";

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-zinc-900 backdrop-blur-md border-b border-zinc-800 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-cols-[3fr] h-16 px-6">
                {/* Center: Navigation */}
                <div className="flex items-center gap-2">
                    <Menubar className="bg-transparent justify-between flex items-center gap-6 text-green-700 focus:text-green-700/60  max-w-[73px] outline-0 border-0 shadow-0">
                        <MenubarMenu>
                            <MenubarTrigger className="bg-none text-green-700 focus:text-green-700/60 text-2xl max-w-[28px] hover:text-3xl outline-0 border-0 shadow-0">◱</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>Home</MenubarItem>
                                <MenubarItem>Starters</MenubarItem>
                                <MenubarItem>Pro</MenubarItem>
                                <MenubarItem>Discover</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                {/* Left: Logo/Brand */}
                <div className="flex items-center gap-2">
                    <Label className="text-2xl font-bold px-3 py-2 tracking-tight text-green-300">Kapsules</Label>
                </div>

                {/* Right: Account/Settings */}
                <div className="flex items-center gap-2">
                    <Menubar className="bg-transparent justify-between md:flex items-center gap-6 text-green-700 focus:text-green-700/60 hover:text-lg max-w-[73px] outline-0 border-0 shadow-0">
                        <MenubarMenu>
                            <MenubarTrigger className="text-green-700 focus:text-green-700/60 hover:text-lg max-w-[73px] outline-0 border-0 sgadow-0">Profile</MenubarTrigger>
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