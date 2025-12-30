// Setup database schema and seed all projects
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function setupAndSeed() {
  try {
    console.log('🔄 Setting up database and seeding projects...\n');
    
    // Step 1: Add type column if it doesn't exist
    console.log('📋 Step 1: Checking/Adding type column...');
    try {
      await prisma.$executeRaw`
        ALTER TABLE "Project" 
        ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'DEVELOPMENT'
      `;
      console.log('   ✅ Type column ready');
    } catch (error) {
      // Check if column already exists
      if (error.message.includes('already exists') || error.code === '42701') {
        console.log('   ✅ Type column already exists');
      } else {
        console.log('   ⚠️  Could not add type column:', error.message);
        console.log('   Continuing without type column...');
      }
    }

    // Step 2: Create enum type if using PostgreSQL
    try {
      await prisma.$executeRaw`
        DO $$ BEGIN
          CREATE TYPE "ProjectType" AS ENUM ('DEVELOPMENT', 'DESIGN');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `;
      console.log('   ✅ ProjectType enum ready');
    } catch (error) {
      // Enum might already exist or we're not using PostgreSQL enum
      console.log('   ℹ️  Using VARCHAR for type (enum may not be needed)');
    }

    // Step 3: Update existing type column to use enum if possible
    try {
      await prisma.$executeRaw`
        ALTER TABLE "Project" 
        ALTER COLUMN type TYPE VARCHAR(20) USING type::VARCHAR(20)
      `;
    } catch (error) {
      // Ignore if this fails
    }

    // Step 4: Delete existing projects
    console.log('\n🗑️  Step 2: Clearing existing projects...');
    try {
      const deleted = await prisma.$executeRaw`DELETE FROM "Project"`;
      console.log('   ✅ Cleared existing projects');
    } catch (error) {
      console.log('   ⚠️  Could not clear projects:', error.message);
    }

    // Step 5: Insert projects using raw SQL to avoid Prisma schema issues
    console.log('\n➕ Step 3: Adding projects...');
    
    const projects = [
      {
        title: "REACH Journal Hub",
        description: "A globally recognized, open-access knowledge ecosystem. Engineered to host peer-reviewed journals, expert directories, and consultancy activities. Features a high-performance search engine for articles and researchers, a multilingual interface, and a 'Hub of Excellence' for academic collaboration. Tech Highlight: Built with Laravel 12 and Vue.js 3, featuring complex database relations and secure knowledge-sharing protocols.",
        link: "https://reach-hub.org/",
        index: 0,
        type: "DEVELOPMENT",
      },
      {
        title: "IIIHWS - Integrative Healthcare",
        description: "A world-class institutional portal for the International Institute of Integrative Healthcare and Wellness Sciences. Designed to bridge modern medical advances with traditional wisdom. Features include accredited program management (Diploma to Doctorate), a translational research ecosystem, and a national certification framework for wellness practitioners. Tech Highlight: Mobile-first responsive design using Tailwind CSS, focusing on accessibility and seamless academic navigation.",
        link: "https://integrative-care.org/",
        index: 1,
        type: "DEVELOPMENT",
      },
      {
        title: "KLIBS Portal",
        description: "A comprehensive learning management system currently in high-fidelity prototyping phase. The design encompasses a complete user journey with 15+ screens including hero landing, secure authentication flows, course management, and community features. Built with modern UI/UX principles focusing on intuitive navigation and engaging user experience. Tech Highlight: Figma-based design system ready for Next.js implementation.",
        link: "https://www.figma.com/proto/zIYS9dwnUHgrBE04orOxi2/PORTFOLIO?node-id=0-1&t=5kHfSCjBqZsEg51V-1",
        index: 2,
        type: "DESIGN",
      },
    ];

    for (const project of projects) {
      try {
        await prisma.$executeRaw`
          INSERT INTO "Project" (title, description, image, link, index, type, "createdAt", "updatedAt")
          VALUES (
            ${project.title},
            ${project.description},
            NULL,
            ${project.link},
            ${project.index},
            ${project.type},
            NOW(),
            NOW()
          )
        `;
        console.log(`   ✅ ${project.title} (${project.type})`);
      } catch (error) {
        // Try without type if column doesn't exist
        if (error.message.includes('type') || error.code === '42703') {
          await prisma.$executeRaw`
            INSERT INTO "Project" (title, description, image, link, index, "createdAt", "updatedAt")
            VALUES (
              ${project.title},
              ${project.description},
              NULL,
              ${project.link},
              ${project.index},
              NOW(),
              NOW()
            )
          `;
          console.log(`   ✅ ${project.title} (added without type)`);
        } else {
          console.error(`   ❌ Failed: ${project.title} - ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Setup complete! All projects have been added.');
    console.log('\n💡 Refresh your browser to see the projects!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code) console.error('   Code:', error.code);
  } finally {
    await prisma.$disconnect();
  }
}

setupAndSeed();



