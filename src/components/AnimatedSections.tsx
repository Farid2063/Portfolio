'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactNode, useEffect } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionsProps {
  children: ReactNode
}

export default function AnimatedSections({ children }: AnimatedSectionsProps) {
  useGSAP(() => {
    // Wait a bit for initial Loader animation to complete
    let timer: NodeJS.Timeout | null = null
    
    timer = setTimeout(() => {
      // Animate sections on scroll with more creative effects
      const sections = document.querySelectorAll('section')
      
      sections.forEach((section, index) => {
        // Skip first section (already animated by Loader)
        if (index === 0) return

        // Set initial state with rotation and scale for more dynamic effect
        gsap.set(section, { 
          y: 150, 
          opacity: 0,
          scale: 0.95,
          rotationX: 5,
          visibility: 'hidden',
          pointerEvents: 'none',
          transformOrigin: 'center center'
        })

        // Create scroll trigger with parallax effect
        ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          onEnter: () => {
            // Make visible and animate in with 3D effect
            gsap.set(section, { visibility: 'visible', pointerEvents: 'auto' })
            
            const tl = gsap.timeline()
            
            tl.to(section, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 1.4,
              ease: 'power4.out',
            })

            // Animate children with stagger and rotation
            const sectionChildren = Array.from(section.children)
            if (sectionChildren.length > 0) {
              gsap.set(sectionChildren, { 
                y: 60, 
                opacity: 0,
                scale: 0.9,
                rotationY: 10
              })
              
              gsap.to(sectionChildren, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                stagger: {
                  amount: 0.6,
                  from: 'start'
                },
                ease: 'back.out(1.2)',
                delay: 0.3,
              })
            }

            // Add parallax scroll effect
            gsap.to(section, {
              y: -50,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              }
            })
          },
          once: true,
        })
      })

      // Enhanced project cards animation
      const projectCards = document.querySelectorAll('.project-card')
      if (projectCards.length > 0) {
        gsap.set(projectCards, { 
          y: 100, 
          opacity: 0,
          scale: 0.8,
          rotationY: 15
        })
        
        ScrollTrigger.create({
          trigger: '#work, section:has(.project-card)',
          start: 'top 85%',
          onEnter: () => {
            gsap.to(projectCards, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              stagger: {
                amount: 0.8,
                from: 'random'
              },
              ease: 'elastic.out(1, 0.5)',
            })
          },
          once: true,
        })
      }

      // Enhanced footer animation
      const footer = document.querySelector('footer')
      if (footer) {
        gsap.set(footer, { 
          y: 80, 
          opacity: 0,
          scale: 0.9
        })
        
        ScrollTrigger.create({
          trigger: footer,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(footer, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
            })
          },
          once: true,
        })
      }

      // Animate navigation links
      const navLinks = document.querySelectorAll('nav a, a[href]')
      navLinks.forEach((link, index) => {
        gsap.from(link, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          delay: 0.5 + index * 0.1,
          ease: 'power2.out'
        })
      })

      // Add continuous subtle animations to headings
      const headings = document.querySelectorAll('h1, h2, h3')
      headings.forEach((heading) => {
        gsap.to(heading, {
          y: -3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        })
      })
    }, 500)

    return () => {
      if (timer) clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return <>{children}</>
}

