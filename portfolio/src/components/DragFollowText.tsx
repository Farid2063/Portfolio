'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, ReactNode, ElementType } from 'react'

interface DragFollowTextProps {
  children: ReactNode
  className?: string
  as?: ElementType
  intensity?: number
}

export default function DragFollowText({ 
  children, 
  className = '',
  as: Component = 'h2',
  intensity = 0.3
}: DragFollowTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const yRef = useRef(0)

  useGSAP(() => {
    if (!wrapperRef.current) return

    // Find the parent section element
    const parentSection = wrapperRef.current.closest('section')
    if (!parentSection) return

    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is within the parent section
      const sectionRect = parentSection.getBoundingClientRect()
      const isInSection = 
        e.clientX >= sectionRect.left &&
        e.clientX <= sectionRect.right &&
        e.clientY >= sectionRect.top &&
        e.clientY <= sectionRect.bottom

      if (!isInSection) {
        // Reset position when mouse leaves section
        xRef.current = 0
        yRef.current = 0
        gsap.to(wrapperRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
        return
      }

      const rect = wrapperRef.current?.getBoundingClientRect()
      if (!rect) return

      // Calculate mouse position relative to element center
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) * intensity
      const y = (e.clientY - centerY) * intensity

      // Smooth interpolation for drag effect - creates the "lag" or "drag" feel
      xRef.current += (x - xRef.current) * 0.15
      yRef.current += (y - yRef.current) * 0.15

      gsap.to(wrapperRef.current, {
        x: xRef.current,
        y: yRef.current,
        duration: 0.6,
        ease: 'power1.out'
      })
    }

    const handleMouseLeave = () => {
      // Return to center smoothly when mouse leaves the section
      xRef.current = 0
      yRef.current = 0
      
      gsap.to(wrapperRef.current, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power2.out'
      })
    }

    // Listen to mouse move on the parent section only
    parentSection.addEventListener('mousemove', handleMouseMove)
    parentSection.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      parentSection.removeEventListener('mousemove', handleMouseMove)
      parentSection.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className="drag-follow-wrapper inline-block">
      <Component className={`drag-follow-text ${className}`}>
        {children}
      </Component>
    </div>
  )
}

