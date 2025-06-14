import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
} from '@/components/ui/menubar';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-4">
          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="bg-transparent text-green-500 hover:text-green-400 text-2xl p-2 border-none">
                ◱
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <a href="/subscribe">Pricing</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/learn">Learning</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/templates">Templates</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/compete">Competitions</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="/docs">Documentation</a>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <a
            href="./"
            className="text-2xl md:text-3xl font-bold text-green-50 hover:text-green-200 transition-colors"
          >
            Kapsules
          </a>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="./learn" className="text-zinc-300 hover:text-green-400 transition-colors">
              Discover
            </a>
            <a href="/templates" className="text-zinc-300 hover:text-green-400 transition-colors">
              Templates
            </a>
          </nav>

          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger className="bg-transparent text-zinc-300 hover:text-green-400 border-none">
                Profile
              </MenubarTrigger>
              <MenubarContent align="end">
                <MenubarLabel>
                  <a href="./projects">Projects</a>
                </MenubarLabel>
                <MenubarItem>
                  <a href="./portfolio">Portfolio</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="./settings">Settings</a>
                </MenubarItem>
                <MenubarItem>
                  <a href="./">Logout</a>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
}
