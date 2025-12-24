import { prisma } from "@/lib/db"
import Loader from "@/components/Loader"
import ProjectCard from "@/components/ProjectCard"

type Project = {
  id: number
  title: string
  description: string | null
  image: string | null
  link: string | null
  index: number
  createdAt: Date
  updatedAt: Date
}

export default async function Home() {
  // Fetch projects from PostgreSQL
  let projects: Project[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: { index: 'asc' }
    })
  } catch (error) {
    console.error('Database error:', error)
    // Fallback to empty array if database is not available
    projects = []
  }

  return (
    <main className="relative bg-gray-500">
      <Loader />

      <section className="min-h-screen flex flex-col justify-end p-8 md:p-16 border-b border-white/10">
      <span className="text-[10px] font-mono opacity-40 mb-4 tracking-widest">000 - INTRODUCTION</span>
      <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-12">
        Fariduddin <br/> Fakhrizan
      </h1>
      <p className="max-w-xl text-lg md:text-2xl opacity-70 tracking-tight">
        Full-Stack Developer, Cloud Engineer, and UI/UX Designer
        Dedicated to building innovative solutions and delivering exceptional user experiences.
      </p>
      </section>

      <section className="p-8 md:p-16 border-b border-white/10">
      <div className="flex justify-between items-baseline mb-20">
        <span className="text-[10px] font-mono opacity-40 tracking-widest">001 - OFFERINGS</span>
        <h2 className="text-4xl font-black uppercase italic">Capabilities</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-tighter">Next.js Development</h3>
          <p className="text-sm opacity-50 leading-relaxed">Scalable frontend architecture with App Router, server actions and high-performance SEO</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-tighter">Backend & Cloud</h3>
          <p className="text-sm opacity-50 leading-relaxed">Robust database solutions with Prisma and PostgreSQL, paired with scalable cloud deployments</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-tighter">UI/UX Design</h3>
          <p className="text-sm opacity-50 leading-relaxed">Intuitive interfaces with responsive design and pixel-perfect attention to detail</p>
          </div>
      </div>
      </section>

      <section id="work" className="p-8 md:p-16">
        <div className="flex justify-between items-baseline mb-12">
          <span className="text-[10px] font-mono opacity-40 tracking-widest">002 - SELECTED WORK</span>
          <h2 className="text-4xl font-black uppercase italic">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border border-white/10">
        {projects.map((project:Project)=>(
          <ProjectCard key={project.id} project={project}/>
        ))}
        </div>
      </section>

      <footer className="p-20 text-center border-t border-white/10">
        <p className="text-[10px] uppercase opacity-20 tracking-[0.5em]">
          © 2024 Made with Next.js 15 & Prisma
        </p>
      </footer>
    </main>
  )
}