'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  id: number
  title: string
  description: string | null
  image: string | null
  link: string | null
  index: number
  type: 'DEVELOPMENT' | 'DESIGN'
  createdAt: Date
  updatedAt: Date
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Enhanced staggered fade-in animation
  useGSAP(() => {
    if (!gridRef.current || projects.length === 0) return

    const cards = Array.from(gridRef.current.querySelectorAll('.project-card')) as HTMLElement[]
    
    if (cards.length === 0) return

    // Set initial state for all cards
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotationY: 15,
      transformPerspective: 1000,
    })

    // Create a master timeline
    const masterTimeline = gsap.timeline({
      delay: 0.3, // Small delay to ensure DOM is ready
    })

    // Animate cards with stagger
    masterTimeline.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 0.9,
      stagger: {
        amount: 0.6,
        from: 'start',
        ease: 'power2.out',
      },
      ease: 'power3.out',
    })

    // Add subtle hover anticipation effect
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          duration: 0.4,
          ease: 'power2.out',
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
    })

    return () => {
      // Cleanup
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {})
        card.removeEventListener('mouseleave', () => {})
      })
    }
  }, { scope: gridRef, dependencies: [projects] })

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border border-white/10" 
      id="projects-grid"
    >
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={{...project, index}}
        />
      ))}
    </div>
  )
}

