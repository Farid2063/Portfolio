import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Get visitor count
export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database client not initialized" },
        { status: 503 }
      )
    }

    const count = await prisma.visitor.count()

    return NextResponse.json({ count })
  } catch (error: unknown) {
    console.error("Error fetching visitor count:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json(
      { 
        error: "Failed to fetch visitor count",
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 500 }
    )
  }
}

// Track a new visitor
export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database client not initialized" },
        { status: 503 }
      )
    }

    // Get IP address and user agent from request
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : 
                     request.headers.get("x-real-ip") || 
                     request.headers.get("cf-connecting-ip") ||
                     "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Create a new visitor record (allow duplicates for accurate counting)
    await prisma.visitor.create({
      data: {
        ipAddress,
        userAgent,
      },
    })

    // Get updated count
    const count = await prisma.visitor.count()

    return NextResponse.json({ count, success: true })
  } catch (error: unknown) {
    console.error("Error tracking visitor:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json(
      { 
        error: "Failed to track visitor",
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 500 }
    )
  }
}

