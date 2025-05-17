import { NextResponse } from "next/server";
import Project from "@/models/project";
import { connectToDb } from "@/lib/mongoose";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { title, description, techstack, user } = body;

    if (!title || !description || !techstack || !user) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProject = await Project.create({
      title,
      description,
      techstack,
      user,
    });

    return NextResponse.json(
      { success: true, project: newProject },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err: "Failed to add project" }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");

    if (!user) {
      return NextResponse.json(
        { error: "User parameter is required" },
        { status: 400 }
      );
    }

    await connectToDb();
    const projects = await Project.find({ user });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err: "Failed to fetch projects" },
      { status: 500 }
    );
  }
};
