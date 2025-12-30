'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on single page
  return null

  return (
    <nav className="fixed top-[72px] left-0 right-0 z-50 px-8 md:px-16 py-3 glass backdrop-blur-sm border-b border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <span className="opacity-40">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="opacity-100">{crumb.label}</span>
            ) : (
              <Link 
                href={crumb.href}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 hover-lift"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

