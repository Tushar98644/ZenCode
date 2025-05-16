'use client'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSession } from "next-auth/react"

export const ProjectForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [techstack, setTechstack] = useState<string>('');

  const createProject = async (e: any) => {
    try {
      e.preventDefault();
      const user = session?.user?.email;
      const data = {
        title,
        description,
        techstack,
        user
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.post('/api/projects', data, config);
      const project_id = res.data.project._id;
      startEditor(project_id);
    }
    catch (error) {
      console.error("Failed to create project", error);
    }
  };

  const startEditor = async (project_id:string) => {
    alert("Starting editor...");
    router.push(`/playground/${project_id}`);
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Start your new project in one-click.</CardDescription>
      </CardHeader>
      <form onSubmit={createProject}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Name of your project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Describe your project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select onValueChange={(value) => setTechstack(value)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Start</Button>
        </CardFooter>
      </form>
    </Card>
  )
}