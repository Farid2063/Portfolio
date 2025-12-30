// Script to update projects with images
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function updateProjectsWithImages() {
  try {
    console.log('🔄 Updating projects with images...\n');
    
    // Update REACH Journal Hub
    console.log('📝 Updating REACH Journal Hub...');
    const reachProject = await prisma.project.updateMany({
      where: { title: 'REACH Journal Hub' },
      data: {
        image: '/Reach.png',
      },
    });
    console.log(`   ✅ Updated ${reachProject.count} project(s)`);
    
    // Update IIIHWS - Integrative Healthcare
    console.log('📝 Updating IIIHWS - Integrative Healthcare...');
    const integrativeProject = await prisma.project.updateMany({
      where: { title: 'IIIHWS - Integrative Healthcare' },
      data: {
        image: '/IIIHWS.png',
      },
    });
    console.log(`   ✅ Updated ${integrativeProject.count} project(s)`);
    
    // Update KLIBS Portal
    console.log('📝 Updating KLIBS Portal...');
    const klibsProject = await prisma.project.updateMany({
      where: { title: 'KLIBS Portal' },
      data: {
        image: '/Hero.png',
      },
    });
    console.log(`   ✅ Updated ${klibsProject.count} project(s)`);
    
    // If projects don't exist, create them
    const existingProjects = await prisma.project.findMany({
      select: { title: true },
    });
    
    const existingTitles = existingProjects.map(p => p.title);
    
    if (!existingTitles.includes('REACH Journal Hub')) {
      console.log('\n📝 Creating REACH Journal Hub (not found)...');
      await prisma.project.create({
        data: {
          title: "REACH Journal Hub",
          description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
          image: "/Reach.png",
          link: "https://reach-hub.org/",
          index: 0,
          type: "DEVELOPMENT",
        },
      });
      console.log('   ✅ Created REACH Journal Hub');
    }
    
    if (!existingTitles.includes('IIIHWS - Integrative Healthcare')) {
      console.log('\n📝 Creating IIIHWS - Integrative Healthcare (not found)...');
      await prisma.project.create({
        data: {
          title: "IIIHWS - Integrative Healthcare",
          description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
          image: "/IIIHWS.png",
          link: "https://integrative-care.org/",
          index: 1,
          type: "DEVELOPMENT",
        },
      });
      console.log('   ✅ Created IIIHWS - Integrative Healthcare');
    }
    
    if (!existingTitles.includes('KLIBS Portal')) {
      console.log('\n📝 Creating KLIBS Portal (not found)...');
      await prisma.project.create({
        data: {
          title: "KLIBS Portal",
          description: "A comprehensive learning management system currently in high-fidelity prototyping phase. The design encompasses a complete user journey with 15+ screens including hero landing, secure authentication flows, course management, and community features. Built with modern UI/UX principles focusing on intuitive navigation and engaging user experience. Tech Highlight: Figma-based design system ready for Next.js implementation.",
          image: "/Hero.png",
          link: "https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1",
          index: 2,
          type: "DESIGN",
        },
      });
      console.log('   ✅ Created KLIBS Portal');
    }
    
    // Fetch and display all projects
    const allProjects = await prisma.$queryRaw`
      SELECT id, title, image, index
      FROM "Project"
      ORDER BY index ASC
    `;
    
    console.log('\n✅ All projects updated successfully!');
    console.log('\n📋 Current projects:');
    allProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title}`);
      console.log(`      Image: ${project.image || 'No image'}`);
    });
    
    console.log('\n💡 Refresh your browser to see the images!');
    
  } catch (error) {
    console.error('❌ Error updating projects:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
updateProjectsWithImages()
  .then(() => {
    console.log('\n🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });

