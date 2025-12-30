import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

// Test endpoint to check database connectivity and table existence
export async function GET() {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
    prismaInitialized: !!prisma,
  }

  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        ...diagnostics,
        error: "DATABASE_URL not configured",
        status: "failed"
      }, { status: 503 })
    }

    if (!prisma) {
      return NextResponse.json({
        ...diagnostics,
        error: "Prisma client not initialized",
        status: "failed"
      }, { status: 503 })
    }

    // Test connection
    await prisma.$connect()
    diagnostics.connection = "success"

    // Test Visitor table
    try {
      const count = await prisma.visitor.count()
      diagnostics.visitorTable = "exists"
      diagnostics.visitorCount = count
      
      // Try to get a sample visitor
      const sample = await prisma.visitor.findFirst()
      diagnostics.sampleVisitor = sample ? {
        id: sample.id,
        ipAddress: sample.ipAddress?.substring(0, 20),
        visitedAt: sample.visitedAt
      } : null
    } catch (tableError: unknown) {
      const errorMsg = tableError instanceof Error ? tableError.message : "Unknown error"
      diagnostics.visitorTable = "error"
      diagnostics.visitorTableError = errorMsg
      
      if (errorMsg.includes("does not exist") || errorMsg.includes("relation")) {
        diagnostics.visitorTable = "not found"
        diagnostics.fix = "Run: npx prisma db push or npx prisma migrate deploy"
      }
    }

    // Test other tables
    try {
      const projectCount = await prisma.project.count()
      diagnostics.projectTable = "exists"
      diagnostics.projectCount = projectCount
    } catch {
      diagnostics.projectTable = "error"
    }

    diagnostics.status = "success"
    return NextResponse.json(diagnostics)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({
      ...diagnostics,
      error: errorMessage,
      status: "failed",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

