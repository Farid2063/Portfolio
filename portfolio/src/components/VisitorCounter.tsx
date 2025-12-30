"use client"

import { useEffect, useState } from "react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackAndFetchVisitor = async () => {
      try {
        // Track the visitor
        const trackResponse = await fetch("/api/visitors", {
          method: "POST",
        })

        if (trackResponse.ok) {
          const trackData = await trackResponse.json()
          setCount(trackData.count)
        } else {
          // If tracking fails, just fetch the count
          const fetchResponse = await fetch("/api/visitors")
          if (fetchResponse.ok) {
            const fetchData = await fetchResponse.json()
            setCount(fetchData.count)
          }
        }
      } catch (error) {
        console.error("Error tracking/fetching visitor:", error)
        // Try to just fetch the count as fallback
        try {
          const fetchResponse = await fetch("/api/visitors")
          if (fetchResponse.ok) {
            const fetchData = await fetchResponse.json()
            setCount(fetchData.count)
          }
        } catch (fetchError) {
          console.error("Error fetching visitor count:", fetchError)
        }
      } finally {
        setIsLoading(false)
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
        {count !== null ? count.toLocaleString() : "—"}
      </div>
      <p className="text-xs font-mono opacity-30 mt-2 tracking-wider">
        Total page visits
      </p>
    </div>
  )
}

