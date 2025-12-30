'use client'

interface TechMarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
}

export default function TechMarquee({ items, direction = 'left' }: TechMarqueeProps) {
  // Duplicate items multiple times for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        className={`flex gap-8 md:gap-12 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{
          width: 'max-content',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white/60 whitespace-nowrap hover:text-white transition-colors duration-300 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

