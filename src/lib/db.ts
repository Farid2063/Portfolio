import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma Client configuration
const prismaClientOptions = {
  log: process.env.NODE_ENV === "development" 
    ? ["error", "warn"] 
    : ["error"],
  errorFormat: "pretty" as const,
  // Production optimizations
  datasources: process.env.DATABASE_URL ? {
    db: {
      url: process.env.DATABASE_URL,
    },
  } : undefined,
};

// Use singleton pattern in all environments to prevent multiple instances
if (!globalForPrisma.prisma) {
  try {
    globalForPrisma.prisma = new PrismaClient(prismaClientOptions);
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    // In production, we want to continue even if Prisma fails to initialize
    // This prevents build-time crashes
    if (process.env.NODE_ENV === 'production') {
      console.warn('Prisma Client initialization failed, but continuing in production mode');
    } else {
      throw error;
    }
  }
}

const prisma = globalForPrisma.prisma;

// Graceful shutdown
if (typeof window === "undefined") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
  
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

export { prisma };
