'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, useEffect, useCallback } from 'react'

export default function Loader() {
    const container = useRef<HTMLDivElement>(null)
    const [isEntered, setIsEntered] = useState(false)

    const onEnter = useCallback(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsEntered(true)
        })

        tl.to("#enter-btn", { opacity: 0, duration: 0.5})
        .to(container.current, {
            yPercent: -100,
            duration: 1.5,
            ease: "expo.inOut"
        })
        .from("h1", {
            y: 150,
            skewY: 7,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1.1")
        .from("section:first-of-type span", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.8")
        .from("section:first-of-type p", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        // Hide all other sections initially - they will appear on scroll
        .set("section:not(:first-of-type)", {
            y: 100,
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none"
        }, "-=0.4")
    }, [])

    useGSAP(() => {
        if (isEntered) return

        const handleMouseMove = (e: MouseEvent) => {
            const xPercent = (e.clientX / window.innerWidth) - 0.5
            const yPercent = (e.clientY / window.innerHeight) - 0.5

            gsap.to(".parallax-layer", {
                x: (i, target) => xPercent * Number((target as HTMLElement).dataset.speed) || 0,
                y: (i, target) => yPercent * Number((target as HTMLElement).dataset.speed) || 0,
                duration: 1,
                ease: "power2.out"
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, { scope: container, dependencies: [isEntered]})

    // Auto-transition after 1.5 seconds
    useEffect(() => {
        if (isEntered) return
        
        const timer = setTimeout(() => {
            onEnter()
        }, 1500)

        return () => clearTimeout(timer)
    }, [isEntered, onEnter])

    if (isEntered) return null

    return (
    <div ref={container} className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="parallax-layer absolute inset-[-10%] bg-[url('/stars.jpg')] opacity-20 bg-cover" data-speed="20" />
      <div className="parallax-layer absolute inset-[-10%] bg-[url('/grain.jpg')] opacity-20 bg-cover" data-speed="40" />
      <div className="parallax-layer absolute inset-[-10%] bg-[url('/mountains.png')] opacity-20 bg-cover" data-speed="60" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-2 border-white flex items-center justify-center mb-8">
            <span className="text-white text-4xl font-black italic">F</span>
        </div>

        <div className="flex flex-col items-center mb-10">
          <p className="font-mono text-[50px] font-black tracking-[0.3em] opacity-100 text-white leading-tight">SYSTEM</p>
          <p className="font-mono text-[50px] font-black tracking-[0.3em] opacity-100 text-white leading-tight">READY</p>
        </div>

        <button
          id="enter-btn"
          onClick={onEnter}
          className="px-10 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-700 uppercase text-[10px] tracking-[0.4em] cursor-pointer"
        >
          Enter
        </button>
      </div>
      </div>
    )
}