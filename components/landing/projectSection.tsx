import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";




export default function ProjectSection() {
    // Simulated user data
    const userId = {
        project: {
            projectId: "9384-ddds-2345-a5sf-77w8wbdhv7w6w"
        },
        projectId: {
            name: "Artificial Workflows",
            url: "https://example.com",
            openUrlIcon: "⋮⋮⋮",
            description: "This is a sample project description.",
            image: "/images/placeholder.png",
            select: "▢",
            selected: "▣"
        }
    };
    return (
        <section className="py-22 px-4">
            <div className="max-w-4xl mx-auto">
                <Tabs defaultValue="projects" className="w-full ">
                    <TabsList className="flex w-full gap-6 grid-cols-1 bg-white/0 pt-0 mb-7 max-w-[100%] justify-center">
                        <TabsTrigger value="projects" className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 transition-all focus ease-in duration-150">
                            Projects
                        </TabsTrigger>
                        <TabsTrigger value="templates" className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 transition-all ease-in duration-150">
                            Templates
                        </TabsTrigger>
                        <TabsTrigger value="community" className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 transition-all ease-in duration-150">
                            Community
                        </TabsTrigger>
                        <TabsTrigger value="discover" className="max-w-30 rounded-sm hover:bg-green-600/30 text-zinc-200 focus:bg-zinc-600 data-[state=active]:bg-green-600/30 transition-all ease-in duration-150">
                            Discover
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="projects" className="flex flex-col-[repeat(3 1fr)] mt-4 p-8 bg-green-900/20 shadow-green-900/15 shadow-2xl rounded-lg text-zinc-200 gap-12">
                        <div className="text-center">
                            <Image
                                alt="project placeholder"
                                src="/images/placeholder.png"
                                width={400}
                                height={300}
                                className="mx-auto rounded-lg bg-blend-overlay hover:opacity-80 opacity-50 ease-out transition-opacity duration-300 transform hover:scale-101 shadow-lg shadow-zinc-800/50"
                            />
                            <div className="flex flex-1 items-center mt-2 justify-center mx-auto p-1 gap-2">
                                <p className="mt-4 font-bold text-zinc-400">{userId.projectId.name}</p>
                                <Button variant="link" className="mt-3 text-2xl font-semibold">
                                    {userId.projectId.openUrlIcon}
                                </Button>
                                <Button variant="default" className="mt-3 bg-inherit text-3xl font-semibold">
                                    <p className="text-green-500">{userId.projectId.select}</p>
                                </Button>
                            </div>

                        </div>
                        <div className="text-center">
                            <Image
                                alt="project placeholder"
                                src="/images/placeholder.png"
                                width={400}
                                height={300}
                                className="mx-auto rounded-lg bg-blend-overlay hover:opacity-80 opacity-50 ease-out transition-opacity duration-300 transform hover:scale-101 shadow-lg shadow-zinc-800/50"
                            />
                            <div className="flex flex-1 items-center mt-2 justify-center mx-auto p-1 gap-2">
                                <p className="mt-4 font-bold text-zinc-400">{userId.projectId.name}</p>
                                <Button variant="link" className="mt-3 text-2xl font-semibold">
                                    {userId.projectId.openUrlIcon}
                                </Button>
                                <Button variant="default" className="mt-3 bg-inherit text-3xl font-semibold">
                                    <p className="text-green-500">{userId.projectId.select}</p>
                                </Button>
                            </div>

                        </div>
                        <div className="text-center">
                            <Image
                                alt="project placeholder"
                                src="/images/placeholder.png"
                                width={400}
                                height={300}
                                className="mx-auto rounded-lg bg-blend-overlay hover:opacity-80 opacity-50 ease-out transition-opacity duration-300 transform hover:scale-101 shadow-lg shadow-zinc-800/50"
                            />
                            <div className="flex flex-1 items-center mt-2 justify-center mx-auto p-1 gap-2">
                                <p className="mt-4 font-bold text-zinc-400">{userId.projectId.name}</p>
                                <Button variant="link" className="mt-3 text-2xl font-semibold">
                                    {userId.projectId.openUrlIcon}
                                </Button>
                                <Button variant="default" className="mt-3 bg-inherit text-3xl font-semibold">
                                    <p className="text-green-500">{userId.projectId.select}</p>
                                </Button>
                            </div>

                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};