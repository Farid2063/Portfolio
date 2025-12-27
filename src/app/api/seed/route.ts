import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Public endpoint to seed projects (one-time use)
export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    // Delete existing projects
    await prisma!.project.deleteMany({});

    // Add projects
    const projectsData = [
      {
        title: "REACH Journal Hub",
        description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
        image: null,
        link: "https://reach-hub.org/",
        index: 0,
        type: "DEVELOPMENT" as const,
      },
      {
        title: "IIIHWS - Integrative Healthcare",
        description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
        image: null,
        link: "https://integrative-care.org/",
        index: 1,
        type: "DEVELOPMENT" as const,
      },
      {
        title: "KLIBS Portal",
        description: "A comprehensive learning management system currently in high-fidelity prototyping phase. The design encompasses a complete user journey with 15+ screens including hero landing, secure authentication flows, course management, and community features. Built with modern UI/UX principles focusing on intuitive navigation and engaging user experience. Tech Highlight: Figma-based design system ready for Next.js implementation.",
        image: null,
        link: "https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1",
        index: 2,
        type: "DESIGN" as const,
      },
    ];

    const createdProjects = await Promise.all(
      projectsData.map((data) => prisma!.project.create({ data }))
    );

    return NextResponse.json(
      {
        message: "Projects seeded successfully",
        count: createdProjects.length,
        projects: createdProjects.map(p => ({ id: p.id, title: p.title })),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error seeding projects:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        error: "Failed to seed projects",
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 500 }
    );
  }
}

