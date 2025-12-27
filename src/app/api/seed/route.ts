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

    // Create table if it doesn't exist
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Project" (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          image TEXT,
          link TEXT,
          index INTEGER DEFAULT 0,
          type TEXT DEFAULT 'DEVELOPMENT',
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `);
    } catch (schemaError: any) {
      // Table might already exist, that's okay
      if (!schemaError?.message?.includes('already exists')) {
        console.warn('Schema creation warning:', schemaError.message);
      }
    }

    // Delete existing projects
    try {
      await prisma!.project.deleteMany({});
    } catch (deleteError: any) {
      // If delete fails, table might be empty or not exist - continue
      console.warn('Delete warning:', deleteError?.message);
    }

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

    // Insert projects using raw SQL to avoid Prisma schema issues
    const insertSQL = `
      INSERT INTO "Project" (title, description, image, link, index, type, "createdAt", "updatedAt")
      VALUES 
        ($1, $2, $3, $4, $5, $6, NOW(), NOW()),
        ($7, $8, $9, $10, $11, $12, NOW(), NOW()),
        ($13, $14, $15, $16, $17, $18, NOW(), NOW())
    `;
    
    await prisma.$executeRawUnsafe(
      insertSQL,
      projectsData[0].title,
      projectsData[0].description,
      projectsData[0].image,
      projectsData[0].link,
      projectsData[0].index,
      projectsData[0].type,
      projectsData[1].title,
      projectsData[1].description,
      projectsData[1].image,
      projectsData[1].link,
      projectsData[1].index,
      projectsData[1].type,
      projectsData[2].title,
      projectsData[2].description,
      projectsData[2].image,
      projectsData[2].link,
      projectsData[2].index,
      projectsData[2].type
    );

    // Fetch created projects to return
    const createdProjects = await prisma.$queryRawUnsafe<Array<{id: number, title: string}>>(
      'SELECT id, title FROM "Project" ORDER BY index ASC'
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
        details: errorMessage, // Show error details in production for debugging
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined
      },
      { status: 500 }
    );
  }
}

