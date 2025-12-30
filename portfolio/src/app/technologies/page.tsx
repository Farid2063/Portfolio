import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"
import TechMarquee from "@/components/TechMarquee"

export default function TechnologiesPage() {
  const frontendTechs = ['Next.js 16', 'React 19', 'Tailwind 4.0', 'GSAP', 'TypeScript']
  const backendTechs = ['Laravel 12', 'PHP 8.2', 'Java', 'PostgreSQL', 'Prisma']
  const designCloudTechs = ['Figma', 'AWS', 'Archimate', 'UML']

  return (
    <main className="relative bg-gray-500 overflow-hidden">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <AnimatedSections>
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
          <div className="flex justify-between items-baseline mb-20 relative z-10">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">003 - TECHNOLOGIES</span>
            <DragFollowText as="h2" className="text-4xl font-black uppercase italic text-white gradient-text" intensity={0.2}>
              Tech Stack
            </DragFollowText>
          </div>
          <div className="space-y-12 md:space-y-16 relative z-10">
            {/* Frontend Category */}
            <div className="relative group">
              <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-6 md:p-8 overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <h3 className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60 mb-6 group-hover:opacity-100 transition-opacity duration-300">
                    Frontend
                  </h3>
                  <TechMarquee items={frontendTechs} direction="left" />
                </div>
              </div>
            </div>

            {/* Backend/DB Category */}
            <div className="relative group">
              <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-6 md:p-8 overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <h3 className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60 mb-6 group-hover:opacity-100 transition-opacity duration-300">
                    Backend/DB
                  </h3>
                  <TechMarquee items={backendTechs} direction="right" />
                </div>
              </div>
            </div>

            {/* Design/Cloud Category */}
            <div className="relative group">
              <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-6 md:p-8 overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <h3 className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60 mb-6 group-hover:opacity-100 transition-opacity duration-300">
                    Design/Cloud
                  </h3>
                  <TechMarquee items={designCloudTechs} direction="left" />
                </div>
              </div>
            </div>
          </div>
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

