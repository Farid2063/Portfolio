'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/offerings', label: 'Offerings' },
  { href: '/technologies', label: 'Technologies' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Close mobile menu on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation - Static, Always Visible */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass backdrop-blur-md py-4 bg-black/50 border-b border-white/20 shadow-lg opacity-100" style={{ visibility: 'visible', opacity: 1 }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link 
              href="/"
              className="group"
            >
              <div className="w-10 h-10 border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl font-black italic">F</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1" style={{ visibility: 'visible', opacity: 1 }}>
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest text-white group ${
                      active 
                        ? 'opacity-100' 
                        : 'opacity-70'
                    }`}
                    style={{ visibility: 'visible' }}
                  >
                    <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                      {item.label}
                    </span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                    )}
                    {!active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    <span className="absolute inset-0 bg-white/10 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 relative z-[101] text-white"
              aria-label="Toggle menu"
              style={{ transition: 'none' }}
            >
              <span className={`w-6 h-[2px] bg-white ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`} style={{ transition: 'none' }} />
              <span className={`w-6 h-[2px] bg-white ${
                isOpen ? 'opacity-0' : ''
              }`} style={{ transition: 'none' }} />
              <span className={`w-6 h-[2px] bg-white ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`} style={{ transition: 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] glass backdrop-blur-md bg-black/70 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        style={{ transition: 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-mono uppercase tracking-widest relative text-white group ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <span className="relative z-10 inline-block group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  {item.label}
                </span>
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white" />
                )}
                {!active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                )}
              </Link>
            )
          })}
        </div>
      </div>

    </>
  )
}

