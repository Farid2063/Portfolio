'use client'

import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      
      if (cursor) {
        cursor.style.left = cursorX + 'px'
        cursor.style.top = cursorY + 'px'
      }
      
      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = () => {
      cursor?.classList.add('active')
    }

    const handleMouseLeave = () => {
      cursor?.classList.remove('active')
    }

    const handleFormInputEnter = () => {
      cursor?.classList.add('form-active')
    }

    const handleFormInputLeave = () => {
      cursor?.classList.remove('form-active')
    }

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .hover-lift')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Add special effect for form inputs
    const formInputs = document.querySelectorAll('input, textarea, .form-input')
    formInputs.forEach((el) => {
      el.addEventListener('mouseenter', handleFormInputEnter)
      el.addEventListener('mouseleave', handleFormInputLeave)
      el.addEventListener('focus', handleFormInputEnter)
      el.addEventListener('blur', handleFormInputLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)
    updateCursor()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      formInputs.forEach((el) => {
        el.removeEventListener('mouseenter', handleFormInputEnter)
        el.removeEventListener('mouseleave', handleFormInputLeave)
        el.removeEventListener('focus', handleFormInputEnter)
        el.removeEventListener('blur', handleFormInputLeave)
      })
    }
  }, [])

  return <div ref={cursorRef} className="cursor-follower" />
}



