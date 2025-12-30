'use client'

export default function StatusSection() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })

  return (
    <section className="min-h-[30vh] flex flex-col justify-center items-center p-8 md:p-16 border-b border-white/10 relative z-10">
      <span className="text-[10px] font-mono opacity-50 mb-8 tracking-widest reveal-up">001 - SYSTEM STATUS</span>
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-sm border-2 border-white/20 p-8 md:p-12 relative overflow-hidden reveal-up">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-sm md:text-base font-mono uppercase tracking-widest opacity-80">
                STATUS: AVAILABLE FOR PROJECTS
              </p>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50 mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
        </div>
      </div>
    </section>
  )
}

