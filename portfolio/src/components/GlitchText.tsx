'use client'

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

export default function GlitchText({ 
  children, 
  className = '',
  as: Component = 'h2'
}: GlitchTextProps) {
  return (
    <Component className={`glitch-text ${className}`}>
      <span className="glitch-text-main" aria-hidden="false">
        {children}
      </span>
      <span className="glitch-text-layer glitch-text-layer-1" aria-hidden="true">
        {children}
      </span>
      <span className="glitch-text-layer glitch-text-layer-2" aria-hidden="true">
        {children}
      </span>
      <span className="glitch-text-layer glitch-text-layer-3" aria-hidden="true">
        {children}
      </span>
    </Component>
  )
}






