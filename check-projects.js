// Quick script to check current project images in database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error'],
});

async function checkProjects() {
  try {
    const projects = await prisma.$queryRaw`
      SELECT id, title, image, index
      FROM "Project"
      ORDER BY index ASC
    `;
    
    console.log('\n📋 Current projects in database:');
    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`);
      console.log(`   Image: ${project.image || 'NULL (no image)'}`);
      console.log(`   Index: ${project.index}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProjects();

