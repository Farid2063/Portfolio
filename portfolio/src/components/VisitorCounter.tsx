"use client"

import { useEffect, useState } from "react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const trackAndFetchVisitor = async () => {
      try {
        // Check if we've already tracked this session
        const sessionKey = "visitor_tracked_" + new Date().toDateString()
        const alreadyTracked = typeof window !== "undefined" && localStorage.getItem(sessionKey)

        if (!alreadyTracked) {
          // Track the visitor
          const trackResponse = await fetch("/api/visitors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })

        if (trackResponse.ok) {
          const trackData = await trackResponse.json()
          // Use count from response, even if tracking failed (fallback mode)
          setCount(trackData.count || 0)
          // Mark as tracked for this session only if actually successful
          if (trackData.success && typeof window !== "undefined") {
            localStorage.setItem(sessionKey, "true")
          }
          // If there's an error but we got a count, show it
          if (trackData.error) {
            console.warn("Visitor tracking warning:", trackData.error)
          }
        } else {
          const errorData = await trackResponse.json().catch(() => ({}))
          console.error("Tracking failed:", errorData)
          // If tracking fails, just fetch the count
          await fetchCount()
        }
        } else {
          // Already tracked, just fetch the count
          await fetchCount()
        }
      } catch (error) {
        console.error("Error tracking/fetching visitor:", error)
        setError("Failed to load visitor count")
        // Try to just fetch the count as fallback
        await fetchCount()
      } finally {
        setIsLoading(false)
      }
    }

    const fetchCount = async () => {
      try {
        const fetchResponse = await fetch("/api/visitors", {
          cache: "no-store",
        })
        if (fetchResponse.ok) {
          const fetchData = await fetchResponse.json()
          // Always set count, even if there's an error (fallback mode)
          setCount(fetchData.count || 0)
          // Only show error if count is 0 and there's an actual error
          if (fetchData.error && fetchData.count === 0) {
            setError("Database unavailable")
          } else {
            setError(null)
          }
        } else {
          // Even on error, try to get data
          const errorData = await fetchResponse.json().catch(() => ({}))
          console.error("Fetch failed:", errorData)
          setCount(errorData.count || 0)
          setError("Unable to load count")
        }
      } catch (fetchError) {
        console.error("Error fetching visitor count:", fetchError)
        setCount(0)
        setError("Connection error")
      }
    }

    trackAndFetchVisitor()
  }, [])

  if (isLoading) {
    return (
      <div className="reveal-up">
        <span className="text-[10px] font-mono opacity-40 mb-2 tracking-widest">
          VISITOR COUNT
        </span>
        <div className="text-2xl md:text-4xl font-mono opacity-70">
          <span className="inline-block w-16 h-8 bg-white/10 animate-pulse"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="reveal-up">
      <span className="text-[10px] font-mono opacity-40 mb-2 tracking-widest block">
        VISITOR COUNT
      </span>
      <div className="text-2xl md:text-4xl font-mono font-bold text-white">
        {error ? (
          <span className="text-red-400/60 text-sm">Error</span>
        ) : count !== null ? (
          count.toLocaleString()
        ) : (
          "—"
        )}
      </div>
      <p className="text-xs font-mono opacity-30 mt-2 tracking-wider">
        {error ? "Please refresh" : "Total page visits"}
      </p>
    </div>
  )
}

