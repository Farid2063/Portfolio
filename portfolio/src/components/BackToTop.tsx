'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    toggleVisibility() // Check on mount
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full backdrop-blur-md border-2 border-white/30 bg-black/80 hover:bg-black flex items-center justify-center hover-lift hover-glow group text-white shadow-2xl transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 visible pointer-events-auto translate-y-0' 
          : 'opacity-0 invisible pointer-events-none translate-y-4'
      }`}
      aria-label="Back to top"
      style={{
        minWidth: '48px',
        minHeight: '48px'
      }}
    >
      <svg
        className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

