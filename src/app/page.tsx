import Loader from "@/components/Loader"
import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import ProjectCard from "@/components/ProjectCard"
import Link from "next/link"
import { prisma } from "@/lib/db"

type Project = {
  id: number
  title: string
  description: string | null
  image: string | null
  link: string | null
  index: number
  type: 'DEVELOPMENT' | 'DESIGN'
  createdAt: Date
  updatedAt: Date
}

export default async function Home() {
  // Fetch projects from PostgreSQL
  let projects: Project[] = []
  
  if (process.env.DATABASE_URL) {
    try {
      projects = await prisma.project.findMany({
        orderBy: { index: 'asc' },
        take: 6, // Show up to 6 projects on home page
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          link: true,
          index: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      
      // Map projects to ensure type field exists (default to DEVELOPMENT if missing)
      projects = projects.map((project: any) => ({
        ...project,
        type: project.type || 'DEVELOPMENT' as 'DEVELOPMENT' | 'DESIGN'
      }))
    } catch (error: any) {
      // If the error is about missing type column, try querying without it
      if (error?.message?.includes('type') || error?.code === 'P2021') {
        try {
          const projectsWithoutType = await prisma.$queryRaw<Array<{
            id: number
            title: string
            description: string | null
            image: string | null
            link: string | null
            index: number
            createdAt: Date
            updatedAt: Date
          }>>`
            SELECT id, title, description, image, link, index, "createdAt", "updatedAt"
            FROM "Project"
            ORDER BY index ASC
            LIMIT 6
          `
          
          projects = projectsWithoutType.map(project => ({
            ...project,
            type: 'DEVELOPMENT' as 'DEVELOPMENT' | 'DESIGN'
          }))
        } catch (fallbackError) {
          // Silently handle database errors - fallback to empty array
          projects = []
        }
      } else {
        // Silently handle database errors - fallback to empty array
        projects = []
      }
    }
  }

  return (
    <main className="relative bg-gray-500 overflow-hidden">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <Loader />
      <AnimatedSections>
        {/* Introduction Section */}
        <section className="min-h-screen flex flex-col justify-end p-8 md:p-16 border-b border-white/10 relative z-10 pt-24">
          <span className="text-[10px] font-mono opacity-40 mb-4 tracking-widest reveal-up">000 - INTRODUCTION</span>
          <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 gradient-text relative">
            <span className="absolute inset-0 blur-2xl opacity-30">Fariduddin Fakhrizan</span>
            Fariduddin <br/> Fakhrizan
          </h1>
          <p className="max-w-xl text-lg md:text-2xl opacity-70 tracking-tight mb-8 reveal-up">
            Full-Stack Developer, Cloud Engineer, and UI/UX Designer
            Dedicated to building innovative solutions and delivering exceptional user experiences.
          </p>
          <div className="reveal-up space-y-6">
            <p className="text-sm font-mono uppercase tracking-widest opacity-40 mb-6">
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

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10">
            <div className="flex justify-between items-baseline mb-12">
              <span className="text-[10px] font-mono opacity-40 tracking-widest reveal-up">001 - SELECTED WORK</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white gradient-text reveal-up">
                Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border border-white/10 reveal-up">
              {projects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {projects.length >= 6 && (
              <div className="mt-12 text-center reveal-up">
                <Link 
                  href="/projects"
                  className="group relative inline-block px-8 py-4 overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-500 text-sm font-mono uppercase tracking-widest hover:border-white/60 hover-lift"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>View All Projects</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Link>
              </div>
            )}
          </section>
        )}

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