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
};

// Use singleton pattern in all environments to prevent multiple instances
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient(prismaClientOptions);
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
