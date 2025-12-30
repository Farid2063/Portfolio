// Script to check and update project images
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error'],
});

async function checkAndUpdate() {
  try {
    console.log('🔍 Checking current projects...\n');
    
    // Check current state
    const projects = await prisma.$queryRaw`
      SELECT id, title, image, index
      FROM "Project"
      ORDER BY index ASC
    `;
    
    console.log('📋 Current projects:');
    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`);
      console.log(`   Current Image: ${project.image || 'NULL (no image)'}`);
    });
    
    console.log('\n\n🔄 Updating images...\n');
    
    // Update with images
    await prisma.$executeRawUnsafe(`
      UPDATE "Project" 
      SET image = '/Reach.png', "updatedAt" = NOW()
      WHERE title = 'REACH Journal Hub'
    `);
    console.log('✅ Updated REACH Journal Hub → /Reach.png');
    
    await prisma.$executeRawUnsafe(`
      UPDATE "Project" 
      SET image = '/IIIHWS.png', "updatedAt" = NOW()
      WHERE title = 'IIIHWS - Integrative Healthcare'
    `);
    console.log('✅ Updated IIIHWS → /IIIHWS.png');
    
    await prisma.$executeRawUnsafe(`
      UPDATE "Project" 
      SET image = '/Hero.png', "updatedAt" = NOW()
      WHERE title = 'KLIBS Portal'
    `);
    console.log('✅ Updated KLIBS Portal → /Hero.png');
    
    // Verify updates
    console.log('\n\n📋 Verifying updates...\n');
    const updatedProjects = await prisma.$queryRaw`
      SELECT id, title, image, index
      FROM "Project"
      ORDER BY index ASC
    `;
    
    updatedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Image: ${project.image || 'NULL'}`);
    });
    
    console.log('\n✅ Done! Refresh your browser.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndUpdate();

