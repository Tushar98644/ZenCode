'use client'
import { ProjectCard } from "@/components/dashboard/project/project-card";
import Layout from "@/components/Layout/layout";
import { Project } from "@/types/project";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const { data: session } = useSession();
    
    const fetchProjects = async () => {
        try {
            const userEmail = session?.user?.email;
            const params = new URLSearchParams({ user: userEmail as string });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const res = await axios.get(`/api/projects?${params}`, config);
            setProjects(res.data.projects);
        } catch (error) {
            console.error(`There was an error fetching the projects: ${error}`);
        }
    }

    useEffect(() => {
        fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            {
                projects.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-2xl font-semibold">No Projects Found</h1>
                    </div>
                ) : (
                    <div className={`p-12 grid grid-cols-3 min-h-fit`}>
                        {projects.map((project) => (
                            <ProjectCard key={project._id} {...project} />
                        ))}
                    </div>
                )
            }
        </Layout>
    );
}

export default ProjectList;