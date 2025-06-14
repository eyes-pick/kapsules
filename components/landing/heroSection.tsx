import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="min-h-[calc(60vh-4rem)] bg-gradient-to-br from-green-400/20 via-zinc-950 to-zinc-950 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="mb-2 text-4xl md:text-9xl font-bold bg-gradient-to-b from-green-400/90 to-green-600/10 bg-clip-text text-transparent leading-40">
            Kapsules
          </h1>
          <h2 className="mb-8 text-2xl md:text-3xl text-zinc-300 font-light leading-12">
            Build, Tinker and Deploy Fullstack React/Node.js Applications with AI Agents!
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto"></p>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm max-w-2xl mx-auto mb-33">
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Build me an app that..."
                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-200 h-[70px] placeholder:text-zinc-500"
              />
              <Button className="bg-zinc-800 hover:bg-green-700 text-slate-200/30 hover:text-green-100/90 px-6 h-[70px]">
                Generate
              </Button>
            </div>
            <div className="flex items-center justify-center text-zinc-500 text-sm gap-4">
              <Button className="w-[1fr] bg-zinc-800 hover:bg-green-600/80 text-slate-200/30 hover:text-green-100/90 font-medium">
                Connect Github
              </Button>
              <Button className="w-[1fr] bg-zinc-800 hover:bg-green-700/70 text-slate-200/30 hover:text-green-100/90 font-medium">
                Upload Images
              </Button>
              <Button className="w-[1fr] bg-zinc-800 hover:bg-green-700/70 text-slate-200/30 hover:text-green-100/90 font-medium">
                Upload Files
              </Button>
              <Button className="w-[1fr] bg-zinc-800 hover:bg-green-600/80 text-slate-200/30 hover:text-green-100/90 font-medium">
                Edit Setup Script
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
