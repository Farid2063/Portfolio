'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Card {
  title: string
  subtitle: string
  description?: string
}

interface EducationCertCardsProps {
  cards: Card[]
}

export default function EducationCertCards({ cards }: EducationCertCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const cardElements = containerRef.current.querySelectorAll('.edu-cert-card')
    
    // Set initial state for all cards
    gsap.set(cardElements, {
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotationX: 15,
    })

    // Create scroll trigger for staggered animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cardElements, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: 'start',
          },
          ease: 'power4.out',
        })
      },
      once: true,
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="edu-cert-card relative group bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/20 transition-all duration-500 hover-lift"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 gradient-text">
              {card.title}
            </h3>
            <p className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60 mb-4">
              {card.subtitle}
            </p>
            {card.description && (
              <p className="text-sm opacity-70 leading-relaxed">
                {card.description}
              </p>
            )}
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  )
}




