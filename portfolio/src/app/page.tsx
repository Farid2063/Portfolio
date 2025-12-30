import Loader from "@/components/Loader"
import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import VisitorCounter from "@/components/VisitorCounter"
import StatusSection from "@/components/StatusSection"
import Link from "next/link"

export default async function Home() {

  return (
    <main className="relative bg-gray-500 overflow-hidden">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <Loader />
      <AnimatedSections>
        {/* Introduction Section */}
        <section className="min-h-screen flex flex-col justify-end p-8 md:p-16 border-b border-white/10 relative z-10 pt-24">
          <span className="text-[10px] font-mono opacity-50 mb-4 tracking-widest reveal-up">000 - INTRODUCTION</span>
          <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 gradient-text relative">
            <span className="absolute inset-0 blur-2xl opacity-30">Fariduddin Fakhrizan</span>
            Fariduddin <br/> Fakhrizan
          </h1>
          <p className="max-w-xl text-lg md:text-2xl opacity-70 tracking-tight mb-8 reveal-up">
            Full-Stack Developer & Cloud Engineer specializing in high-end UI/UX and scalable architecture.
          </p>
          <div className="reveal-up space-y-6">
            <p className="text-sm font-mono uppercase tracking-widest opacity-50 mb-6">
              Navigate using the menu above to explore
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                href="/about"
                className="group relative px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>About Me</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
              <Link 
                href="/projects"
                className="group relative px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>View Projects</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
              <a 
                href="/MUHAMMAD FARIDUDDIN BIN FAKHRIZAN_SOFTWARE DEVELOPER.pdf"
                download
                className="group relative px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Download CV</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </a>
              <Link 
                href="/contact"
                className="group relative px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get In Touch</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <StatusSection />

        {/* Visitor Counter Section */}
        <section className="min-h-[40vh] flex flex-col justify-center items-center p-8 md:p-16 border-b border-white/10 relative z-10">
          <span className="text-[10px] font-mono opacity-50 mb-8 tracking-widest reveal-up">002 - STATISTICS</span>
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm border-2 border-white/20 p-12 md:p-16 relative overflow-hidden reveal-up">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <VisitorCounter />
              </div>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 md:p-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] uppercase opacity-20 tracking-[0.5em] text-center md:text-left">
              © 2024 Fariduddin Fakhrizan. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest opacity-30">
              <span>Built with Next.js 16</span>
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