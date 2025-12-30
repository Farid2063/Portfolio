import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Get visitor count
export async function GET() {
  try {
    // Check database URL
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set")
      return NextResponse.json(
        { 
          count: 0,
          error: "Database not configured",
          fallback: true
        },
        { status: 200 } // Return 200 with fallback count
      )
    }

    // Check Prisma client
    if (!prisma) {
      console.error("Prisma client is not initialized")
      return NextResponse.json(
        { 
          count: 0,
          error: "Database client not initialized",
          fallback: true
        },
        { status: 200 } // Return 200 with fallback count
      )
    }

    // Try to connect and get count
    try {
      const count = await prisma.visitor.count()
      return NextResponse.json({ count, success: true })
    } catch (dbError: unknown) {
      console.error("Database query error:", dbError)
      const errorMessage = dbError instanceof Error ? dbError.message : "Unknown database error"
      
      // Check if it's a table doesn't exist error
      if (errorMessage.includes("does not exist") || errorMessage.includes("Unknown table")) {
        console.error("Visitor table does not exist. Run migrations first.")
        return NextResponse.json(
          { 
            count: 0,
            error: "Database table not found",
            fallback: true,
            message: "Please run database migrations"
          },
          { status: 200 }
        )
      }
      
      // Return fallback count instead of error
      return NextResponse.json(
        { 
          count: 0,
          error: "Database connection failed",
          fallback: true,
          ...(process.env.NODE_ENV === "development" && { details: errorMessage })
        },
        { status: 200 } // Return 200 with fallback
      )
    }
  } catch (error: unknown) {
    console.error("Unexpected error in GET /api/visitors:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    // Always return a response, never crash
    return NextResponse.json(
      { 
        count: 0,
        error: "Failed to fetch visitor count",
        fallback: true,
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 200 } // Return 200 with fallback count
    )
  }
}

// Track a new visitor
export async function POST(request: Request) {
  try {
    // Check database URL
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set")
      // Return current count (0) instead of error
      return NextResponse.json(
        { 
          count: 0,
          success: false,
          error: "Database not configured",
          fallback: true
        },
        { status: 200 }
      )
    }

    // Check Prisma client
    if (!prisma) {
      console.error("Prisma client is not initialized")
      return NextResponse.json(
        { 
          count: 0,
          success: false,
          error: "Database client not initialized",
          fallback: true
        },
        { status: 200 }
      )
    }

    // Get IP address and user agent from request
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : 
                     request.headers.get("x-real-ip") || 
                     request.headers.get("cf-connecting-ip") ||
                     "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    try {
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
    } catch (dbError: unknown) {
      console.error("Database error tracking visitor:", dbError)
      const errorMessage = dbError instanceof Error ? dbError.message : "Unknown database error"
      
      // Check if it's a table doesn't exist error
      if (errorMessage.includes("does not exist") || errorMessage.includes("Unknown table")) {
        console.error("Visitor table does not exist. Run migrations first.")
        // Try to get count anyway (might work if table exists but create failed)
        try {
          const count = await prisma.visitor.count()
          return NextResponse.json({ 
            count, 
            success: false,
            error: "Table not found",
            fallback: true
          })
        } catch {
          return NextResponse.json({ 
            count: 0, 
            success: false,
            error: "Table not found",
            fallback: true
          })
        }
      }
      
      // Try to get current count as fallback
      try {
        const count = await prisma.visitor.count()
        return NextResponse.json({ 
          count, 
          success: false,
          error: "Failed to track, but count retrieved",
          fallback: true
        })
      } catch {
        return NextResponse.json({ 
          count: 0, 
          success: false,
          error: "Database connection failed",
          fallback: true,
          ...(process.env.NODE_ENV === "development" && { details: errorMessage })
        })
      }
    }
  } catch (error: unknown) {
    console.error("Unexpected error in POST /api/visitors:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    // Always return a response, never crash
    return NextResponse.json(
      { 
        count: 0,
        success: false,
        error: "Failed to track visitor",
        fallback: true,
        ...(process.env.NODE_ENV === "development" && { details: errorMessage })
      },
      { status: 200 } // Return 200 with fallback
    )
  }
}

