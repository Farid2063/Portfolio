import { NextResponse } from "next/server"

// CountAPI configuration - no database needed!
const COUNTAPI_NAMESPACE = "fariduddin-portfolio"
const COUNTAPI_KEY = "visitor-count"

// Get visitor count
export async function GET() {
  try {
    const response = await fetch(
      `https://api.countapi.xyz/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Cache for 30 seconds to reduce API calls
        next: { revalidate: 30 }
      }
    )
    
    if (!response.ok) {
      throw new Error(`CountAPI returned ${response.status}`)
    }
    
    const data = await response.json()
    const count = data.value || 0
    
    console.log(`[GET /api/visitors] Retrieved count: ${count}`)
    return NextResponse.json({ 
      count, 
      success: true 
    })
  } catch (error) {
    console.error("[GET /api/visitors] Error fetching visitor count:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json(
      { 
        count: 0, 
        error: "Failed to fetch count", 
        fallback: true,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 200 } // Return 200 with fallback count
    )
  }
}

// Track a new visitor
export async function POST(request: Request) {
  try {
    // Get IP address for logging (not stored, just for tracking)
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0].trim() : 
                     request.headers.get("x-real-ip") || 
                     request.headers.get("cf-connecting-ip") ||
                     "unknown"
    
    console.log(`[POST /api/visitors] Tracking visitor - IP: ${ipAddress.substring(0, 20)}...`)
    
    // Increment the count using CountAPI
    const response = await fetch(
      `https://api.countapi.xyz/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store" // Don't cache increment requests
      }
    )
    
    if (!response.ok) {
      throw new Error(`CountAPI returned ${response.status}`)
    }
    
    const data = await response.json()
    const count = data.value || 0
    
    console.log(`[POST /api/visitors] Visitor tracked. New count: ${count}`)
    return NextResponse.json({ 
      count, 
      success: true 
    })
  } catch (error) {
    console.error("[POST /api/visitors] Error tracking visitor:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    // Try to get current count as fallback
    try {
      const getResponse = await fetch(
        `https://api.countapi.xyz/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
        { cache: "no-store" }
      )
      if (getResponse.ok) {
        const getData = await getResponse.json()
        console.log(`[POST /api/visitors] Fallback: Retrieved count ${getData.value} despite tracking error`)
        return NextResponse.json({ 
          count: getData.value || 0, 
          success: false,
          error: "Failed to increment but got count",
          fallback: true,
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined
        })
      }
    } catch (fallbackError) {
      console.error("[POST /api/visitors] Fallback also failed:", fallbackError)
    }
    
    return NextResponse.json(
      { 
        count: 0, 
        success: false,
        error: "Failed to track visitor", 
        fallback: true,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 200 } // Return 200 with fallback
    )
  }
}
