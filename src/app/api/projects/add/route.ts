import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Simple API key authentication - in production, use proper auth (NextAuth, etc.)
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;
  
  // If no API key is set, only allow in development
  if (!apiKey) {
    return process.env.NODE_ENV === "development";
  }
  
  // Check for Bearer token or API key header
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7) === apiKey;
  }
  
  // Check for X-API-Key header
  const apiKeyHeader = request.headers.get("x-api-key");
  if (apiKeyHeader) {
    return apiKeyHeader === apiKey;
  }
  
  return false;
}

// Input validation helper
function validateProjectData(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: "Invalid request body" };
  }
  
  if (data.title && (typeof data.title !== 'string' || data.title.trim().length === 0)) {
    return { valid: false, error: "Title must be a non-empty string" };
  }
  
  if (data.title && data.title.length > 200) {
    return { valid: false, error: "Title must be less than 200 characters" };
  }
  
  if (data.description && typeof data.description !== 'string') {
    return { valid: false, error: "Description must be a string" };
  }
  
  if (data.description && data.description.length > 2000) {
    return { valid: false, error: "Description must be less than 2000 characters" };
  }
  
  if (data.link && typeof data.link !== 'string') {
    return { valid: false, error: "Link must be a string" };
  }
  
  if (data.link && !/^https?:\/\/.+/.test(data.link)) {
    return { valid: false, error: "Link must be a valid URL" };
  }
  
  if (data.index !== undefined && (typeof data.index !== 'number' || data.index < 0)) {
    return { valid: false, error: "Index must be a non-negative number" };
  }
  
  return { valid: true };
}

export async function POST(request: Request) {
  // Check authorization
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    // Delete all existing projects
    await prisma.project.deleteMany({});

    // Project data with validation
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

    // Validate all project data
    for (const projectData of projectsData) {
      const validation = validateProjectData(projectData);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
    }

    // Create projects
    const createdProjects = await Promise.all(
      projectsData.map((data) => prisma.project.create({ data }))
    );

    return NextResponse.json(
      {
        message: "Projects updated successfully",
        projects: createdProjects,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error updating projects:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Don't expose internal error details in production
    return NextResponse.json(
      { 
        error: "Failed to update projects",
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 500 }
    );
  }
}

