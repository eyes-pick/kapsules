import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

export default function ProjectSection() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Featured Projects
                </h2>
                <Tabs defaultValue="projects" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 bg-zinc-800">
                        <TabsTrigger value="projects" className="text-zinc-200 hover:bg-zinc-700 focus:bg-zinc-600">
                            Projects
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="projects" className="mt-4 p-4 bg-zinc-900 rounded-lg text-zinc-200">
                        <div className="text-center">
                            <Image
                                alt="project placeholder"
                                src="/images/placeholder.png"
                                width={400}
                                height={300}
                                className="mx-auto rounded-lg"
                            />
                            <p className="mt-4 text-zinc-400">Project showcase coming soon...</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};