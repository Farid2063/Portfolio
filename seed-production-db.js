// Script to seed production database
// Usage: node seed-production-db.js
// Make sure DATABASE_URL is set in your environment or .env.production file

require('dotenv').config({ path: '.env.production' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['error'],
});

async function seedProjects() {
  try {
    console.log('🔄 Connecting to database...');
    
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL is not set!');
      console.log('Please set DATABASE_URL in your environment or .env.production file');
      process.exit(1);
    }

    console.log('✅ Connected to database');
    console.log('🔄 Deleting existing projects...');
    
    // Disconnect and reconnect to avoid prepared statement issues
    await prisma.$disconnect();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Recreate client
    const freshPrisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ['error'],
    });
    
    await freshPrisma.$executeRawUnsafe('DELETE FROM "Project"');

    console.log('🔄 Adding projects...');
    
    // Use raw SQL to insert projects
    const insertSQL = `
      INSERT INTO "Project" (title, description, image, link, index, "createdAt", "updatedAt")
      VALUES 
        ('REACH Journal Hub', 'A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a ''Hub of Excellence'' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.', NULL, 'https://reach-hub.org/', 0, NOW(), NOW()),
        ('IIIHWS - Integrative Healthcare', 'A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.', NULL, 'https://integrative-care.org/', 1, NOW(), NOW()),
        ('KLIBS Portal', 'A comprehensive learning management system currently in high-fidelity prototyping phase. The design encompasses a complete user journey with 15+ screens including hero landing, secure authentication flows, course management, and community features. Built with modern UI/UX principles focusing on intuitive navigation and engaging user experience. Tech Highlight: Figma-based design system ready for Next.js implementation.', NULL, 'https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1', 2, NOW(), NOW())
    `;
    
    await freshPrisma.$executeRawUnsafe(insertSQL);

    const createdProjects = await freshPrisma.$queryRawUnsafe('SELECT id, title, "index" FROM "Project" ORDER BY "index" ASC');

    console.log('\n✅ Projects added successfully!');
    console.log(`\nAdded ${createdProjects.length} projects:`);
    createdProjects.forEach((project, index) => {
      console.log(`  ${index + 1}. ${project.title} (ID: ${project.id})`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    try {
      await prisma.$disconnect();
    } catch (e) {}
  }
}

seedProjects();

