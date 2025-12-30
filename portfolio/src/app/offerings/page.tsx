import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"

export default function OfferingsPage() {
  return (
    <main className="relative bg-gray-500 overflow-hidden">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <AnimatedSections>
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
          <div className="flex justify-between items-baseline mb-20 relative z-10">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">002 - OFFERINGS</span>
            <DragFollowText as="h2" className="text-4xl font-black uppercase italic text-white gradient-text" intensity={0.2}>
              Core Services
            </DragFollowText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {/* Institutional Ecosystems */}
            <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-12px] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 card-shimmer opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 gradient-text">
                  Institutional Ecosystems
                </h3>
                <p className="text-base md:text-lg opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity duration-500">
                  Building large-scale platforms for education and research (as seen in REACH Hub).
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none rounded-lg" />
            </div>

            {/* Integrative Healthcare Portals */}
            <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-12px] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 card-shimmer opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 gradient-text">
                  Integrative Healthcare Portals
                </h3>
                <p className="text-base md:text-lg opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity duration-500">
                  Developing professional-grade wellness and medical science interfaces (as seen in IIIHWS).
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none rounded-lg" />
            </div>

            {/* Certification & Regulatory Logic */}
            <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-12px] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30 md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 card-shimmer opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 gradient-text">
                  Certification & Regulatory Logic
                </h3>
                <p className="text-base md:text-lg opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity duration-500">
                  Implementing complex permission-based systems and credentialing boards for professional organizations.
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none rounded-lg" />
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

