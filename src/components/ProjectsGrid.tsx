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

  // Enhanced staggered fade-in animation - but ensure titles stay visible
  useGSAP(() => {
    if (!gridRef.current || projects.length === 0) return

    const cards = Array.from(gridRef.current.querySelectorAll('.project-card')) as HTMLElement[]
    
    if (cards.length === 0) return

    // Ensure all titles are visible before any animation
    cards.forEach(card => {
      const title = card.querySelector('h3') as HTMLElement
      if (title) {
        gsap.set(title, { opacity: 1, visibility: 'visible' })
        const titleSpans = title.querySelectorAll('span')
        if (titleSpans.length > 0) {
          gsap.set(titleSpans, { opacity: 1, visibility: 'visible', y: 0 })
        }
      }
    })

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
      onStart: () => {
        // Force all titles to remain visible during animation
        cards.forEach(card => {
          const title = card.querySelector('h3') as HTMLElement
          if (title) {
            gsap.set(title, { opacity: 1, visibility: 'visible' })
            const titleSpans = title.querySelectorAll('span')
            if (titleSpans.length > 0) {
              gsap.set(titleSpans, { opacity: 1, visibility: 'visible', y: 0 })
            }
          }
        })
      }
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
      {projects.map((project, index) => {
        // Debug: log image data
        if (process.env.NODE_ENV === 'development') {
          console.log(`Project ${project.id} (${project.title}): image = ${project.image || 'NULL'}`);
        }
        return (
          <ProjectCard 
            key={project.id} 
            project={{...project, index}}
          />
        );
      })}
    </div>
  )
}



