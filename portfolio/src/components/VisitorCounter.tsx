"use client"

import { useEffect, useState } from "react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackAndFetchVisitor = async () => {
      try {
        // Try to track visitor with CountAPI
        const trackResponse = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })

        if (trackResponse.ok) {
          const trackData = await trackResponse.json()
          
          // Always use the count from response, even if there's an error
          const apiCount = trackData.count || 0
          
          // If we got a valid count from API, use it and save to localStorage
          if (apiCount > 0 || trackData.success) {
            setCount(apiCount)
            localStorage.setItem('visitor_count', apiCount.toString())
            localStorage.setItem('visitor_count_timestamp', Date.now().toString())
          } else {
            // API failed, try to get from localStorage
            const storedCount = localStorage.getItem('visitor_count')
            const storedTimestamp = localStorage.getItem('visitor_count_timestamp')
            
            if (storedCount && storedTimestamp) {
              const age = Date.now() - parseInt(storedTimestamp)
              // Use stored count if it's less than 24 hours old
              if (age < 24 * 60 * 60 * 1000) {
                setCount(parseInt(storedCount))
                console.log("Using cached visitor count:", storedCount)
                return
              }
            }
            
            // No valid count anywhere, just show 0
            setCount(0)
          }
        } else {
          // HTTP error, try localStorage
          await tryLocalStorageFallback()
        }
      } catch (error) {
        console.error("Error tracking visitor:", error)
        // On any error, try localStorage
        await tryLocalStorageFallback()
      } finally {
        setIsLoading(false)
      }
    }

    const tryLocalStorageFallback = async () => {
      const storedCount = localStorage.getItem('visitor_count')
      const storedTimestamp = localStorage.getItem('visitor_count_timestamp')
      
      if (storedCount && storedTimestamp) {
        const age = Date.now() - parseInt(storedTimestamp)
        if (age < 24 * 60 * 60 * 1000) {
          setCount(parseInt(storedCount))
          console.log("Using cached visitor count from localStorage:", storedCount)
          return
        }
      }
      
      // Try to fetch count without tracking
      try {
        const fetchResponse = await fetch("/api/visitors", {
          cache: "no-store",
        })
        if (fetchResponse.ok) {
          const fetchData = await fetchResponse.json()
          const apiCount = fetchData.count || 0
          setCount(apiCount)
          if (apiCount > 0) {
            localStorage.setItem('visitor_count', apiCount.toString())
            localStorage.setItem('visitor_count_timestamp', Date.now().toString())
          }
        } else {
          // Last resort: use stored count or 0
          setCount(storedCount ? parseInt(storedCount) : 0)
        }
      } catch (fetchError) {
        // Last resort: use stored count or 0
        setCount(storedCount ? parseInt(storedCount) : 0)
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
        {count !== null ? count.toLocaleString() : "0"}
      </div>
      <p className="text-xs font-mono opacity-30 mt-2 tracking-wider">
        Total page visits
      </p>
    </div>
  )
}
