// Simple script to add projects directly
const path = require('path');

// Set the path to find Prisma client
process.chdir(__dirname);

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function addProjects() {
  try {
    console.log('🔄 Connecting to database...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected!');
    
    console.log('\n🗑️  Deleting existing projects...');
    const deleted = await prisma.project.deleteMany({});
    console.log(`   Deleted ${deleted.count} existing projects`);
    
    console.log('\n➕ Adding REACH Journal Hub project...');
    const reachProject = await prisma.project.create({
      data: {
        title: "REACH Journal Hub",
        description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
        image: null,
        link: "https://reach-hub.org/",
        index: 0,
      },
    });
    console.log(`   ✅ Created: ${reachProject.title} (ID: ${reachProject.id})`);
    
    console.log('\n➕ Adding IIIHWS - Integrative Healthcare project...');
    const integrativeProject = await prisma.project.create({
      data: {
        title: "IIIHWS - Integrative Healthcare",
        description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
        image: null,
        link: "https://integrative-care.org/",
        index: 1,
      },
    });
    console.log(`   ✅ Created: ${integrativeProject.title} (ID: ${integrativeProject.id})`);
    
    console.log('\n🎉 SUCCESS! Projects have been added to the database!');
    console.log('\n📋 Summary:');
    console.log(`   1. ${reachProject.title}`);
    console.log(`   2. ${integrativeProject.title}`);
    console.log('\n💡 Refresh your browser to see the projects!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 'P1001') {
      console.error('   Database connection failed. Make sure:');
      console.error('   1. DATABASE_URL is set in your .env file');
      console.error('   2. Your database server is running');
      console.error('   3. Run: npm run db:dev (if using Prisma Dev)');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addProjects();

