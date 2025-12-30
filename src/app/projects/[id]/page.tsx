'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Project = {
  id: number
  title: string
  description: string | null
  image: string | null
  link: string | null
  type: 'DEVELOPMENT' | 'DESIGN' | null
  index: number
  createdAt: Date
  updatedAt: Date
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProject() {
      if (params?.id) {
        try {
          const response = await fetch(`/api/projects/${params.id}`)
          if (response.ok) {
            const projectData = await response.json()
            setProject(projectData)
          }
        } catch (error) {
          console.error('Error fetching project:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProject()
  }, [params?.id])

  // GSAP Glitch & Boot Animation for Figma Embed
  useGSAP(() => {
    if (!project || project.type !== 'DESIGN' || !containerRef.current) return

    const container = containerRef.current
    const iframe = iframeRef.current

    // Initial state - hidden and glitched
    gsap.set(container, {
      opacity: 0,
      scale: 0.95,
      filter: 'contrast(1.5) brightness(0.8)',
    })

    // Glitch effect timeline
    const glitchTimeline = gsap.timeline()

    // Boot sequence with glitch effects
    glitchTimeline
      .to(container, {
        opacity: 0.3,
        scale: 0.98,
        filter: 'contrast(2) brightness(0.5) hue-rotate(90deg)',
        duration: 0.1,
        ease: 'power2.in',
      })
      .to(container, {
        opacity: 0.1,
        scale: 1.02,
        filter: 'contrast(0.5) brightness(1.5) hue-rotate(-90deg)',
        duration: 0.08,
        ease: 'power2.in',
      })
      .to(container, {
        opacity: 0.5,
        scale: 0.99,
        filter: 'contrast(1.8) brightness(0.7)',
        duration: 0.12,
        ease: 'power2.inOut',
      })
      .to(container, {
        opacity: 0.2,
        scale: 1.01,
        filter: 'contrast(0.8) brightness(1.2)',
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to(container, {
        opacity: 1,
        scale: 1,
        filter: 'contrast(1) brightness(1)',
        duration: 0.5,
        ease: 'power2.out',
      })

    // Animate iframe loading
    if (iframe) {
      gsap.set(iframe, { opacity: 0 })
      glitchTimeline.to(
        iframe,
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    }
  }, { scope: containerRef, dependencies: [project] })

  // Gallery animation
  useGSAP(() => {
    if (!project || project.type !== 'DESIGN' || !galleryRef.current) return

    const galleryItems = galleryRef.current.querySelectorAll('.gallery-item')
    
    gsap.fromTo(
      galleryItems,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, { scope: galleryRef, dependencies: [project] })

  if (loading) {
    return (
      <main className="relative bg-gray-500 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-mono uppercase tracking-widest opacity-40">Loading...</p>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="relative bg-gray-500 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm font-mono uppercase tracking-widest opacity-40">Project not found</p>
          <Link
            href="/projects"
            className="inline-block px-6 py-3 bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-xs font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  // Determine if this is a design project: check type field or infer from title
  const isDesignProject = project.type === 'DESIGN' || project.title.toLowerCase().includes('klibs')
  
  // Use KLIBS Figma link for DESIGN projects
  // For KLIBS specifically, always use the provided Figma prototype URL
  const figmaUrl = isDesignProject
    ? (project.title.toLowerCase().includes('klibs') 
        ? "https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1"
        : project.link || '')
    : ''

  // Convert Figma prototype URL to embed URL
  const getFigmaEmbedUrl = (url: string) => {
    if (!url) return ''
    // Figma prototype URLs need to be embedded using the embed endpoint
    // Format: https://www.figma.com/embed?embed_host=portfolio&url=<encoded_prototype_url>
    if (url.includes('/proto/')) {
      return `https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(url)}`
    }
    // If it's already an embed URL or file URL, return as is
    return url
  }

  const figmaEmbedUrl = getFigmaEmbedUrl(figmaUrl)
  // For deep link to Figma app, convert proto URL to file URL
  const figmaAppUrl = figmaUrl.includes('/proto/') 
    ? figmaUrl.replace('/proto/', '/file/').split('?')[0]
    : figmaUrl

  return (
    <main className="relative bg-gray-500 min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      
      <section className="min-h-screen flex flex-col p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity duration-300 mb-8 hover-lift"
          >
            <span>←</span>
            <span>Back to Projects</span>
          </Link>
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">005 - SELECTED WORK</span>
            <span className="text-[10px] font-mono opacity-40 tracking-widest">0{project.id}/PROJECT</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic text-white gradient-text mb-6">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-base md:text-lg leading-relaxed opacity-70 max-w-3xl mb-8">
              {project.description}
            </p>
          )}
        </div>

        {/* Project Image Preview */}
        {project.image && (
          <div className="mb-12 relative group overflow-hidden rounded-lg border border-white/10">
            <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}

        {/* Design Project - Figma Embed */}
        {isDesignProject && figmaEmbedUrl && (
          <>
            {/* Description */}
            <div className="mb-8 max-w-3xl">
              <p className="text-sm md:text-base leading-relaxed opacity-70">
                Currently in the High-Fidelity Prototyping phase. I have architected the complete user journey in Figma—covering 15+ screens including registration and community management—to ensure a seamless transition into Next.js development.
              </p>
              {project.title.toLowerCase().includes('klibs') && (
                <div className="mt-4 px-4 py-2 bg-purple-500/10 border border-purple-400/20 rounded">
                  <p className="text-xs font-mono uppercase tracking-widest text-purple-300">
                    🎨 Design Blueprint: Interactive Prototype Available
                  </p>
                </div>
              )}
            </div>

            {/* Figma Embed Container with Glassmorphism */}
            <div
              ref={containerRef}
              className="relative w-full mb-12 rounded-lg overflow-hidden"
              style={{
                aspectRatio: '16/9',
                minHeight: '600px',
              }}
            >
              {/* Glassmorphism container */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-md border border-gray-500 rounded-lg" />
              
              {/* Glitch overlay layers for effect */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 glitch-layer-1" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent opacity-0 glitch-layer-2" />
              </div>

              {/* Figma iframe */}
              <iframe
                ref={iframeRef}
                src={figmaEmbedUrl}
                className="relative z-0 w-full h-full border-0 rounded-lg"
                allowFullScreen
                allow="xr-spatial-tracking"
                loading="lazy"
                title={`${project.title} - Figma Prototype`}
              />
            </div>

            {/* Open Figma App Button */}
            <div className="mb-16">
              <a
                href={figmaAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Open Figma App</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </a>
            </div>

            {/* Design Blueprint Gallery - KLIBS Specific */}
            {project.title.toLowerCase().includes('klibs') && (
              <div ref={galleryRef} className="mb-16">
                <h2 className="text-2xl md:text-4xl font-black uppercase italic text-white gradient-text mb-8">
                  Design Blueprint
                </h2>
                <p className="text-sm opacity-60 mb-8 max-w-2xl">
                  High-fidelity screenshots showcasing the core user flows: Hero landing experience, secure authentication system, and comprehensive course management interface.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Hero Page */}
                  <div className="gallery-item relative group overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm hover-lift">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src="/Hero.png" 
                        alt="Hero Landing Experience"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-mono uppercase tracking-widest">Hero Landing Experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Authentication Page */}
                  <div className="gallery-item relative group overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm hover-lift">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src="/Auth.png" 
                        alt="Secure Authentication"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-mono uppercase tracking-widest">Secure Authentication</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Page */}
                  <div className="gallery-item relative group overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm hover-lift">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src="/Courses.png" 
                        alt="Course Management"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-mono uppercase tracking-widest">Course Management</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Generic Design Gallery for other DESIGN projects */}
            {isDesignProject && !project.title.toLowerCase().includes('klibs') && (
              <div ref={galleryRef} className="mb-16">
                <h2 className="text-2xl md:text-4xl font-black uppercase italic text-white gradient-text mb-8">
                  Design Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Hero Page */}
                  <div className="gallery-item relative group overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm hover-lift">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                      <span className="text-xs font-mono uppercase tracking-widest opacity-40">Hero Page</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-mono uppercase tracking-widest">Hero Page</span>
                    </div>
                  </div>

                  {/* Login Page */}
                  <div className="gallery-item relative group overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm hover-lift">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                      <span className="text-xs font-mono uppercase tracking-widest opacity-40">Login Page</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-mono uppercase tracking-widest">Login Page</span>
                    </div>
                  </div>

                  {/* Course Page */}
                  <div className="gallery-item relative group overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm hover-lift">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                      <span className="text-xs font-mono uppercase tracking-widest opacity-40">Course Page</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-mono uppercase tracking-widest">Course Page</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Development Project - Standard View */}
        {!isDesignProject && project.link && (
          <div className="mb-16">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Live Website</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
          </div>
        )}
      </section>
    </main>
  )
}

