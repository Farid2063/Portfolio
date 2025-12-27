import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      )
    }

    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error: unknown) {
    console.error("Error fetching project:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Don't expose internal error details in production
    return NextResponse.json(
      { 
        error: "Failed to fetch project",
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 500 }
    )
  }
}

