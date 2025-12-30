import { prisma } from "../src/lib/db"

async function updateProjects() {
  try {
    console.log('Deleting existing projects...')
    await prisma.project.deleteMany({})

    console.log('Adding REACH Journal Hub project...')
    const reachProject = await prisma.project.create({
      data: {
        title: "REACH Journal Hub",
        description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
        image: null,
        link: "https://reach-hub.org/",
        index: 0,
        type: "DEVELOPMENT",
      },
    })

    console.log('Adding IIIHWS - Integrative Healthcare project...')
    const integrativeProject = await prisma.project.create({
      data: {
        title: "IIIHWS - Integrative Healthcare",
        description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
        image: null,
        link: "https://integrative-care.org/",
        index: 1,
        type: "DEVELOPMENT",
      },
    })

    console.log('\n✅ Projects updated successfully!')
    console.log('\nProjects added:')
    console.log(`1. ${reachProject.title} - ${reachProject.link}`)
    console.log(`2. ${integrativeProject.title} - ${integrativeProject.link}`)
  } catch (error) {
    console.error('❌ Error updating projects:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

updateProjects()

