import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Drop Visitor table from browser
// Visit: /api/visitors/drop in your browser or call with POST request
export async function POST() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          success: false,
          error: "DATABASE_URL not configured" 
        },
        { status: 503 }
      )
    }

    if (!prisma) {
      return NextResponse.json(
        { 
          success: false,
          error: "Prisma client not initialized" 
        },
        { status: 503 }
      )
    }

    console.log("[DROP /api/visitors/drop] Attempting to drop Visitor table...")

    // Drop Visitor table using raw SQL
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "Visitor"`)

    console.log("[DROP /api/visitors/drop] Visitor table dropped successfully")

    return NextResponse.json({
      success: true,
      message: "Visitor table dropped successfully",
      note: "The table has been removed from the database. You can now remove the Visitor model from prisma/schema.prisma"
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[DROP /api/visitors/drop] Error dropping table:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to drop Visitor table",
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

