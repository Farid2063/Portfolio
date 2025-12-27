import { prisma } from "@/lib/db"
import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import ProjectsGrid from "@/components/ProjectsGrid"

// Force dynamic rendering to bypass Next.js static caching
export const dynamic = 'force-dynamic'

type Project = {
  id: number
  title: string
  description: string | null
  image: string | null
  link: string | null
  index: number
  type: 'DEVELOPMENT' | 'DESIGN' | null
  createdAt: Date
  updatedAt: Date
}

async function getProjects(): Promise<Project[]> {
  try {
    // Check if DATABASE_URL is configured (required for production)
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL environment variable is not set')
      return []
    }

    // First, try to check if the type column exists
    const columnCheck = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Project' AND column_name = 'type'
    `
    
    const hasTypeColumn = columnCheck.length > 0
    
    if (hasTypeColumn) {
      // Column exists, use normal Prisma query
      const projects = await prisma.project.findMany({
        orderBy: { index: 'asc' },
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          link: true,
          index: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      
      return projects.map((project) => ({
        ...project,
        type: (project.type || 'DEVELOPMENT') as 'DEVELOPMENT' | 'DESIGN'
      }))
    } else {
      // Column doesn't exist, use raw query
      const projects = await prisma.$queryRaw<Array<{
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
      `
      
      return projects.map(project => ({
        ...project,
        type: 'DEVELOPMENT' as 'DEVELOPMENT' | 'DESIGN'
      }))
    }
  } catch (error: any) {
    // Gracefully handle database errors in production
    const errorMessage = error?.message || 'Unknown database error'
    console.error('Error fetching projects:', errorMessage)
    
    // Don't throw errors during build time - return empty array
    // This prevents static page generation from failing
    if (process.env.NODE_ENV === 'production') {
      console.warn('Database connection failed in production, returning empty projects array')
    }
    
    return []
  }
}

export default async function ProjectsPage() {
  // Fetch projects from PostgreSQL with fresh data on every request
  const projects = await getProjects()

  return (
    <main className="relative bg-gray-500 overflow-hidden">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <AnimatedSections>
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
          <div className="flex justify-between items-baseline mb-12">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">004 - SELECTED WORK</span>
            <h2 className="text-4xl font-black uppercase italic text-white gradient-text">
              Projects
            </h2>
          </div>
          {projects.length > 0 ? (
            <ProjectsGrid projects={projects} />
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center border border-white/10 bg-[#0a0a0a]">
              <div className="text-center space-y-4 opacity-40">
                <p className="text-sm font-mono uppercase tracking-widest">No Projects Available</p>
                <p className="text-xs opacity-60">Projects will appear here once added to the database</p>
              </div>
            </div>
          )}
        </section>

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

