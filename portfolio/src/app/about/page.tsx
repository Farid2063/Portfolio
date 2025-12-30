import AnimatedSections from "@/components/AnimatedSections"
import BackgroundEffects from "@/components/BackgroundEffects"
import CursorFollower from "@/components/CursorFollower"
import DragFollowText from "@/components/DragFollowText"
import EducationCertCards from "@/components/EducationCertCards"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="relative bg-gray-500 overflow-hidden">
      <CursorFollower />
      <BackgroundEffects />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
      <AnimatedSections>
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10 pt-32">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000" />
          <div className="flex justify-between items-baseline mb-12 relative z-10">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">001 - ABOUT</span>
            <DragFollowText as="h2" className="text-4xl font-black uppercase italic text-white" intensity={0.2}>
              About Me
            </DragFollowText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start relative z-10">
            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
                <div className="relative overflow-hidden rounded-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover-lift">
                  <Image
                    src="/About me.jpeg"
                    alt="About Me"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    priority
                  />
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4 text-lg md:text-xl opacity-70 leading-relaxed">
                <p className="hover-lift">
                  I am an Information Systems Engineering graduate and AWS Certified Cloud Practitioner specialized in high-stakes software development. I thrive in "War Room" environments, bridging the gap between complex backend logic (Laravel/Java) and elite UI/UX design (Figma).
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <span className="px-4 py-2 border border-white/20 text-xs font-mono uppercase tracking-wider opacity-60 hover-lift hover:opacity-100 hover:border-white/40 transition-all duration-300 animated-border">Full-Stack</span>
                <span className="px-4 py-2 border border-white/20 text-xs font-mono uppercase tracking-wider opacity-60 hover-lift hover:opacity-100 hover:border-white/40 transition-all duration-300 animated-border">Cloud Engineer</span>
                <span className="px-4 py-2 border border-white/20 text-xs font-mono uppercase tracking-wider opacity-60 hover-lift hover:opacity-100 hover:border-white/40 transition-all duration-300 animated-border">UI/UX Designer</span>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10">
          <div className="flex justify-between items-baseline mb-12 relative z-10">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">002 - EXPERIENCE</span>
            <DragFollowText as="h2" className="text-4xl font-black uppercase italic text-white" intensity={0.2}>
              Work Experience
            </DragFollowText>
          </div>
          <div className="space-y-8 relative z-10">
            <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 hover:border-white/20 transition-all duration-500 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 gradient-text">
                      Lead Developer
                    </h3>
                    <p className="text-sm font-mono uppercase tracking-widest opacity-60">
                      REACH Journal Hub · Executive Information Technology Intern · Olympia Education Malaysia
                    </p>
                  </div>
                </div>
                <p className="text-base md:text-lg opacity-70 leading-relaxed">
                  Architected a comprehensive academic publishing ecosystem that supports open-access journals and industry consultancy. Engineered a scalable platform enabling global knowledge sharing and research collaboration.
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
            </div>

            <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 hover:border-white/20 transition-all duration-500 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 gradient-text">
                      UI/UX Engineer
                    </h3>
                    <p className="text-sm font-mono uppercase tracking-widest opacity-60">
                      IIIHWS · Executive Information Technology Intern · Olympia Education Malaysia
                    </p>
                  </div>
                </div>
                <p className="text-base md:text-lg opacity-70 leading-relaxed">
                  Delivered a future-ready healthcare portal that aligns with WHO and UN SDG priorities, featuring a multi-division structure for academic and policy governance. Crafted the digital experience embodying the "Transforming Health, Integrating Wisdom" vision, seamlessly bridging modern medical advances with traditional wellness practices.
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
            </div>

            <div className="group relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 hover:border-white/20 transition-all duration-500 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 gradient-text">
                      Head of Registration
                    </h3>
                    <p className="text-sm font-mono uppercase tracking-widest opacity-60">
                      Olympian Golf Tour 2025
                    </p>
                  </div>
                </div>
                <p className="text-base md:text-lg opacity-70 leading-relaxed">
                  Orchestrated automated data workflows and managed VVIP protocols for Tan Sri Dato' Seri Balia Yusof and other dignitaries.
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Education & Certification Section */}
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 border-b border-white/10 relative z-10">
          <div className="flex justify-between items-baseline mb-12 relative z-10">
            <span className="text-[10px] font-mono opacity-40 tracking-widest">003 - QUALIFICATIONS</span>
            <DragFollowText as="h2" className="text-4xl font-black uppercase italic text-white" intensity={0.2}>
              Education & Certification
            </DragFollowText>
          </div>
          <div className="relative z-10">
            <EducationCertCards
              cards={[
                {
                  title: "Information Systems Engineering",
                  subtitle: "Bachelor's Degree (Honours) · Universiti Teknologi MARA",
                  description: "Graduate with expertise in software development, software testing, system architecture, and information technology."
                },
                {
                  title: "AWS Certified Cloud Practitioner",
                  subtitle: "Amazon Web Services",
                  description: "Certified in cloud computing fundamentals and AWS services."
                }
              ]}
            />
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

