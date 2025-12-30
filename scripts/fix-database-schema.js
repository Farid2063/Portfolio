// Script to fix database schema by adding missing type column
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function fixDatabaseSchema() {
  try {
    console.log('🔄 Fixing database schema...\n');
    
    // Step 1: Check if type column exists
    console.log('📋 Step 1: Checking for type column...');
    const columnCheck = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Project' AND column_name = 'type'
    `;
    
    if (columnCheck.length === 0) {
      console.log('   ⚠️  Type column does not exist. Adding it...');
      
      // Step 2: Create enum type if it doesn't exist
      try {
        await prisma.$executeRaw`
          DO $$ BEGIN
            CREATE TYPE "ProjectType" AS ENUM ('DEVELOPMENT', 'DESIGN');
          EXCEPTION
            WHEN duplicate_object THEN null;
          END $$;
        `;
        console.log('   ✅ ProjectType enum created/verified');
      } catch (error) {
        console.log('   ⚠️  Could not create enum (may already exist or not supported)');
      }
      
      // Step 3: Add type column
      try {
        await prisma.$executeRaw`
          ALTER TABLE "Project" 
          ADD COLUMN type "ProjectType" DEFAULT 'DEVELOPMENT'
        `;
        console.log('   ✅ Type column added successfully');
      } catch (error) {
        // Fallback: use VARCHAR if enum doesn't work
        console.log('   ⚠️  Enum approach failed, trying VARCHAR...');
        try {
          await prisma.$executeRaw`
            ALTER TABLE "Project" 
            ADD COLUMN type VARCHAR(20) DEFAULT 'DEVELOPMENT'
          `;
          console.log('   ✅ Type column added as VARCHAR');
        } catch (varcharError) {
          console.error('   ❌ Failed to add type column:', varcharError.message);
          throw varcharError;
        }
      }
    } else {
      console.log('   ✅ Type column already exists');
    }
    
    // Step 4: Update any NULL values to default
    try {
      const updated = await prisma.$executeRaw`
        UPDATE "Project" 
        SET type = 'DEVELOPMENT' 
        WHERE type IS NULL
      `;
      console.log(`   ✅ Updated NULL values to default`);
    } catch (error) {
      console.log('   ℹ️  Could not update NULL values (may not be needed)');
    }
    
    console.log('\n✅ Database schema fix completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Run: npm run db:generate (from root directory)');
    console.log('   2. Restart your Next.js dev server');
    
  } catch (error) {
    console.error('\n❌ Error fixing database schema:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabaseSchema()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });

