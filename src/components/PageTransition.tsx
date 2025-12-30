'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (displayChildren !== children) {
      setIsTransitioning(true)
      
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children)
          setIsTransitioning(false)
          
          gsap.fromTo('.page-content', 
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
          )
        }
      })

      tl.to('.page-content', {
        opacity: 0,
        y: -30,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [children, displayChildren])

  useGSAP(() => {
    gsap.fromTo('.page-content',
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
    )
  }, { scope: { current: document.body } })

  return (
    <div className="page-content">
      {displayChildren}
    </div>
  )
}





