'use client'

interface GlitchImageProps {
  src: string
  alt: string
  className?: string
}

export default function GlitchImage({ src, alt, className = '' }: GlitchImageProps) {
  return (
    <div className={`glitch-container relative overflow-hidden ${className}`}>
      <div 
        className="glitch-image-wrapper"
        style={{ backgroundImage: `url(${src})` }}
      >
        <img 
          src={src} 
          alt={alt}
          className="glitch-image w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}

