import { Tabs } from "@radix-ui/react-tabs";
import Image from "next/image";
import React from "react";
import { TabsTrigger, TabsContent } from "@/components/ui/tabs";


export default function ProjectSection() {
    return (
        <>
            <Tabs>
                <TabsTrigger value="projects" className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700 focus:bg-zinc-600">
                    Projects
                </TabsTrigger>
                <TabsContent value="projects" className="p-4 bg-zinc-900 text-zinc-200">
                    <Image alt="{project-title}" src="./images/placeholder.png" />
                </TabsContent>
            </Tabs>
        </>
    );
};