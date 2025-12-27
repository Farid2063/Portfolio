// Direct project addition script
const { PrismaClient } = require('@prisma/client');

async function addProjects() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Adding projects...');
    
    // Check if projects already exist
    const existing = await prisma.project.findMany();
    if (existing.length > 0) {
      console.log(`⚠️  Found ${existing.length} existing projects. Updating...`);
      await prisma.project.deleteMany({});
    }
    
    // Add projects
    const project1 = await prisma.project.create({
      data: {
        title: "REACH Journal Hub",
        description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
        image: null,
        link: "https://reach-hub.org/",
        index: 0,
      },
    });
    
    const project2 = await prisma.project.create({
      data: {
        title: "IIIHWS - Integrative Healthcare",
        description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
        image: null,
        link: "https://integrative-care.org/",
        index: 1,
      },
    });
    
    console.log('✅ Projects added successfully!');
    console.log(`   1. ${project1.title}`);
    console.log(`   2. ${project2.title}`);
    console.log('\n💡 Refresh your browser to see them!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) console.error('   Code:', error.code);
  } finally {
    await prisma.$disconnect();
  }
}

addProjects();

