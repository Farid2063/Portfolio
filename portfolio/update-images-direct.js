// Direct database update script
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function update() {
  try {
    console.log('Updating project images...\n');
    
    // Use executeRawUnsafe to avoid prepared statement issues
    const result1 = await prisma.$executeRawUnsafe(
      `UPDATE "Project" SET image = '/Reach.png', "updatedAt" = NOW() WHERE title = 'REACH Journal Hub'`
    );
    console.log(`✅ REACH: ${result1} row(s) updated`);
    
    const result2 = await prisma.$executeRawUnsafe(
      `UPDATE "Project" SET image = '/IIIHWS.png', "updatedAt" = NOW() WHERE title = 'IIIHWS - Integrative Healthcare'`
    );
    console.log(`✅ IIIHWS: ${result2} row(s) updated`);
    
    const result3 = await prisma.$executeRawUnsafe(
      `UPDATE "Project" SET image = '/Hero.png', "updatedAt" = NOW() WHERE title = 'KLIBS Portal'`
    );
    console.log(`✅ KLIBS: ${result3} row(s) updated`);
    
    // Verify
    const projects = await prisma.$queryRawUnsafe(
      `SELECT title, image FROM "Project" ORDER BY index ASC`
    );
    
    console.log('\n📋 Current state:');
    projects.forEach(p => {
      console.log(`  ${p.title}: ${p.image || 'NULL'}`);
    });
    
    console.log('\n✅ Done!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

update();

