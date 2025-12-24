interface ProjectCardProps {
  project: {
    id: number
    title: string
    description?: string | null
    image?: string | null
    link?: string | null
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card relative group h-[70vh] bg-[#0a0a0a] p-10 flex flex-col justify-between overflow-hidden cursor-pointer border-white/5 border-[0.5px]">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out">
        {project.image && (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000"/>
        )}
      </div>

      <div className="relative z-10 flex justify-between items-start opacity-40 text-[10px] font-mono uppercase tracking-widest group-hover:opacity-100 transition-opacity">
        <span>0{project.id}/PROJECT</span>
        {project.link && <span>[CLICK TO VIEW]</span>}
      </div>

      <div className="relative z-10">
      <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 group-hover:-translate-y-2 transition-transform duration-500">
        {project.title}
        </h3>
        <p className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-60 transition-all duration-700 ease-in-out text-sm max-w-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  )
}

