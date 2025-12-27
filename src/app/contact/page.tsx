'use client'

import { useState, useRef, useEffect } from 'react'
import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import GlitchText from "@/components/GlitchText"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const backToTopRef = useRef<HTMLButtonElement>(null)

  const email = "m.fariduddinfakhrizan@gmail.com"

  // Copy email to clipboard
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert('Thank you for your message! I will get back to you soon.')
    }, 1000)
  }

  // GSAP Reveal Animation
  useGSAP(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    const leftColumn = leftColumnRef.current
    const rightColumn = rightColumnRef.current
    const formElements = formRef.current?.querySelectorAll('input, textarea, button') || []

    // Set initial states
    gsap.set([leftColumn, rightColumn], {
      y: 100,
      opacity: 0,
      visibility: 'hidden'
    })

    gsap.set(formElements, {
      y: 50,
      opacity: 0
    })

    // Create scroll trigger for section reveal
    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.set([leftColumn, rightColumn], { visibility: 'visible' })
        
        const tl = gsap.timeline()
        
        // Animate columns
        tl.to([leftColumn, rightColumn], {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.2
        })

        // Animate form elements with stagger
        tl.to(formElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.5')
      },
      once: true
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, { scope: sectionRef })

  // Magnetic Pull Effect for Submit Button
  useGSAP(() => {
    const button = submitButtonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 100

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const moveX = x * force * 0.3
        const moveY = y * force * 0.3

        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: submitButtonRef })

  // Back to Top Button (only in this section)
  useEffect(() => {
    const button = backToTopRef.current
    if (!button) return

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isInView && window.scrollY > 300) {
          gsap.to(button, {
            opacity: 1,
            scale: 1,
            pointerEvents: 'auto',
            duration: 0.3
          })
        } else {
          gsap.to(button, {
            opacity: 0,
            scale: 0.8,
            pointerEvents: 'none',
            duration: 0.3
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <main className="relative bg-gray-500 overflow-hidden" id="main-content">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <AnimatedSections>
        <section 
          ref={sectionRef}
          className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32"
        >
          {/* Section Number */}
          <span className="text-[10px] font-mono opacity-40 mb-8 tracking-widest">006 - CONTACT</span>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Column: Contact Information */}
            <div ref={leftColumnRef} className="space-y-8">
              {/* Name */}
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-white">
                MUHAMMAD FARIDUDDIN BIN FAKHRIZAN
              </h2>

              {/* Email with Copy to Clipboard */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest opacity-60 block">
                  Email
                </label>
                <button
                  onClick={handleCopyEmail}
                  className="group relative w-full text-left p-4 rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md hover:border-gray-400/50 transition-all duration-300 hover-lift email-shimmer"
                  aria-label={`Copy email ${email} to clipboard`}
                >
                  <span className="text-white font-mono text-sm md:text-base relative z-10 block">
                    {email}
                  </span>
                  <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  {copied && (
                    <span className="absolute top-2 right-2 text-xs font-mono uppercase tracking-widest text-white bg-white/20 px-2 py-1 rounded z-20">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest opacity-60 block">
                  Location
                </label>
                <p className="text-white text-lg md:text-xl font-light">
                  Kuala Lumpur, Malaysia
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-2 pt-4">
                <label className="text-xs font-mono uppercase tracking-widest opacity-60 block">
                  Connect
                </label>
                <div className="flex gap-6">
                  <a
                    href="https://www.linkedin.com/in/muhammad-fariduddin-bin-fakhrizan-8754bb248"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md"
                    aria-label="Visit LinkedIn profile"
                  >
                    <svg
                      className="w-6 h-6 text-white opacity-70"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/Farid2063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 flex items-center justify-center rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md"
                    aria-label="Visit GitHub profile"
                  >
                    <svg
                      className="w-6 h-6 text-white opacity-70"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div ref={rightColumnRef} className="space-y-6">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label="Contact form"
              >
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-mono uppercase tracking-widest opacity-60 block"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 form-input"
                    placeholder="Your name"
                    aria-required="true"
                    aria-label="Your name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono uppercase tracking-widest opacity-60 block"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 form-input"
                    placeholder="your.email@example.com"
                    aria-required="true"
                    aria-label="Your email address"
                  />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-mono uppercase tracking-widest opacity-60 block"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 form-input"
                    placeholder="What's this about?"
                    aria-required="true"
                    aria-label="Message subject"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-mono uppercase tracking-widest opacity-60 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 resize-none form-input"
                    placeholder="Tell me about your project..."
                    aria-required="true"
                    aria-label="Your message"
                  />
                </div>

                {/* Submit Button */}
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-lg border border-gray-400/30 bg-white/5 backdrop-blur-md text-white font-mono uppercase tracking-widest text-sm hover:border-gray-400/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group submit-button-glitch"
                  aria-label="Submit contact form"
                >
                  <span className="relative z-10 block group-hover:opacity-0 transition-opacity duration-300">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <GlitchText as="span" className="text-white font-mono uppercase tracking-widest text-sm">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </GlitchText>
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Back to Top Button (Section Specific) */}
          <button
            ref={backToTopRef}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full backdrop-blur-md border-2 border-white/30 bg-black/80 hover:bg-black flex items-center justify-center hover-lift hover-glow group text-white shadow-2xl transition-all duration-300 opacity-0 scale-0.8 pointer-events-none"
            aria-label="Back to top"
            style={{
              minWidth: '48px',
              minHeight: '48px'
            }}
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </section>

        <footer className="p-8 md:p-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] uppercase opacity-20 tracking-[0.5em] text-center md:text-left">
              © 2024 Fariduddin Fakhrizan. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest opacity-30">
              <span>Built with Next.js 15</span>
              <span>•</span>
              <span>Prisma</span>
              <span>•</span>
              <span>TypeScript</span>
            </div>
          </div>
        </footer>
      </AnimatedSections>
    </main>
  )
}
