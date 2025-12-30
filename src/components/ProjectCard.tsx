'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description?: string | null
    image?: string | null
    link?: string | null
    type?: 'DEVELOPMENT' | 'DESIGN' | null
    index?: number
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Determine project type: check type field, or infer from title (KLIBS = DESIGN)
  const projectType = project.type || (project.title.toLowerCase().includes('klibs') ? 'DESIGN' : 'DEVELOPMENT')
  
  // Staggered fade-in animation on mount
  useGSAP(() => {
    const card = cardRef.current
    if (!card) return
    
    // Initial state - hidden
    gsap.set(card, {
      opacity: 0,
      y: 30,
      scale: 0.95,
    })
    
    // Animate in with stagger based on index
    const delay = (project.index || 0) * 0.15
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    })
  }, { scope: cardRef, dependencies: [project.index] })

  useGSAP(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: cardRef })

  const handleLiveWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block"
    >
      <div 
        ref={cardRef}
        className="project-card relative group h-[60vh] md:h-[70vh] bg-[#0a0a0a] p-6 md:p-10 flex flex-col justify-between overflow-hidden cursor-pointer border-white/5 border-[0.5px] hover-lift hover-glow glass"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Image overlay with enhanced effects - now visible by default */}
      {project.image ? (
        <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-all duration-700 ease-in-out z-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.7] scale-105 group-hover:scale-100 group-hover:grayscale-[0.3] transition-all duration-1000"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={(e) => {
              console.error('Image failed to load:', project.image);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      ) : (
        // Professional placeholder for null images
        <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm flex items-center justify-center z-0">
          <div className="text-center opacity-30">
            <div className="w-16 h-16 border-2 border-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl">📐</span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest">No Preview</p>
          </div>
        </div>
      )}
      
      {/* Strong dark overlay for text readability on hover */}
      {project.image && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[1]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        </div>
      )}
      
      {/* Additional subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-700 pointer-events-none z-[1]" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 flex justify-between items-start mb-4 md:mb-0 opacity-40 text-[9px] md:text-[10px] font-mono uppercase tracking-widest group-hover:opacity-100 transition-all duration-500">
        <span className="group-hover:translate-x-2 transition-transform duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">0{project.id}/PROJECT</span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 gradient-text leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_6px_12px_rgba(0,0,0,0.95)]">
              {project.title}
            </h3>
            {/* Design Badge - Mobile: below title, Desktop: absolute positioned */}
            {projectType === 'DESIGN' && (
              <div className="md:hidden mt-2 w-fit px-3 py-1 bg-purple-500/30 backdrop-blur-md border border-purple-400/40 rounded-full shadow-lg">
                <span className="text-[9px] font-mono uppercase tracking-widest text-purple-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Design Phase</span>
              </div>
            )}
          </div>
          <div className="relative">
            <p className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 ease-in-out text-xs md:text-sm lg:text-base max-w-lg leading-relaxed group-hover:translate-y-0 translate-y-4 overflow-hidden text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
              {project.description}
            </p>
            {/* Text background for better readability */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 -z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
          </div>
        </div>

        {/* Action Button - Live Website or Interactive Prototype */}
        {project.link && (
          <button
            onClick={handleLiveWebsiteClick}
            className="mt-4 md:mt-6 w-fit px-4 md:px-6 py-2 md:py-3 bg-black/70 backdrop-blur-md border-2 border-white/30 text-white transition-all duration-500 text-[10px] md:text-xs font-mono uppercase tracking-widest hover:border-white/70 hover-lift opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.9)]"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-[10px] md:text-xs">{projectType === 'DESIGN' ? 'Interactive Prototype' : 'Live Website'}</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </button>
        )}
        
        {/* Design Badge - Desktop: absolute positioned */}
        {projectType === 'DESIGN' && (
          <div className="hidden md:block absolute top-4 right-4 px-3 py-1 bg-purple-500/30 backdrop-blur-md border border-purple-400/40 rounded-full shadow-lg z-20">
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-purple-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Design Phase</span>
          </div>
        )}
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
      </div>
    </Link>
  )
}

