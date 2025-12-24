'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

export default function Loader() {
    const container = useRef<HTMLDivElement>(null)
    const [isEntered, setIsEntered] = useState(false)

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

    const onEnter = () => {
        const tl = gsap.timeline({
            onComplete: () => setIsEntered(true)
        })

        tl.to("#enter-btn", { opacity: 0, duration: 0.5})
    .to (container.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .from("h1", {
        y:150,
        skewY: 7,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }, "-=1.1")
    .from("section:first-of-type span, section:first-of-type p", {
        y:20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    }, "-=0.6")
    }

    if (isEntered) return null

    return (
    <div ref={container} className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="parallax-layer absolute inset-[-10%] bg-[url('/stars.jpg')] opacity-20 bg-cover" data-speed="20" />
      <div className="parallax-layer absolute inset-[-10%] bg-[url('/grain.jpg')] opacity-20 bg-cover" data-speed="40" />
      <div className="parallax-layer absolute inset-[-10%] bg-[url('/mountains.png')] opacity-20 bg-cover" data-speed="60" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-2 border-white flex items-center justify-center mb-6">
            <span className="text-white text-4xl font-black italic">F</span>
        </div>

        <p className="font-mono text-[50px] font-black mb-8 tracking-[0.3em] opacity-100 text-white">SYSTEM READY</p>

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