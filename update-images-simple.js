// Simple script to update project images using raw SQL
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function updateImages() {
  try {
    console.log('🔄 Updating project images...\n');
    
    // Update REACH Journal Hub
    console.log('📝 Updating REACH Journal Hub...');
    await prisma.$executeRaw`
      UPDATE "Project" 
      SET image = '/Reach.png', "updatedAt" = NOW()
      WHERE title = 'REACH Journal Hub'
    `;
    console.log('   ✅ Updated REACH Journal Hub');
    
    // Update IIIHWS - Integrative Healthcare
    console.log('📝 Updating IIIHWS - Integrative Healthcare...');
    await prisma.$executeRaw`
      UPDATE "Project" 
      SET image = '/IIIHWS.png', "updatedAt" = NOW()
      WHERE title = 'IIIHWS - Integrative Healthcare'
    `;
    console.log('   ✅ Updated IIIHWS - Integrative Healthcare');
    
    // Update KLIBS Portal
    console.log('📝 Updating KLIBS Portal...');
    await prisma.$executeRaw`
      UPDATE "Project" 
      SET image = '/Hero.png', "updatedAt" = NOW()
      WHERE title = 'KLIBS Portal'
    `;
    console.log('   ✅ Updated KLIBS Portal');
    
    // Verify updates
    console.log('\n📋 Verifying updates...');
    const projects = await prisma.$queryRaw`
      SELECT id, title, image, index
      FROM "Project"
      ORDER BY index ASC
    `;
    
    console.log('\n✅ All projects updated successfully!');
    console.log('\n📋 Current projects with images:');
    projects.forEach((project, index) => {
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
updateImages()
  .then(() => {
    console.log('\n🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });

