import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Create Visitor table if it doesn't exist
export async function POST() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL not configured" },
        { status: 503 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Prisma client not initialized" },
        { status: 503 }
      )
    }

    // Create Visitor table using raw SQL
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Visitor" (
        id SERIAL PRIMARY KEY,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "visitedAt" TIMESTAMP DEFAULT NOW(),
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `)

    // Verify table exists by trying to count
    const count = await prisma.visitor.count()

    return NextResponse.json({
      success: true,
      message: "Visitor table created successfully",
      currentCount: count
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Migration error:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create Visitor table",
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

