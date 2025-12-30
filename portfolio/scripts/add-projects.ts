import { prisma } from "../src/lib/db";

async function addProjects() {
  try {
    // Add REACH Hub project
    const reachProject = await prisma.project.create({
      data: {
        title: "REACH Hub",
        description: "Research Expertise Advisory Consultancy Hub of Excellence by Olympia Education. A platform bridging academia and industry through impactful research, global collaboration, and sustainable solutions.",
        image: null, // You can add an image URL later
        link: "https://reach-hub.org/",
        index: 0,
      },
    });
    console.log("✓ REACH Hub project added:", reachProject.id);

    // Add IIIHWS/Integrative Care project
    const integrativeProject = await prisma.project.create({
      data: {
        title: "IIIHWS - Integrative Healthcare",
        description: "International Institute of Integrative Healthcare and Wellness Sciences. A world-class institute dedicated to blending cutting-edge medical advances with timeless wisdom, inspiring healthier lives and thriving communities.",
        image: null, // You can add an image URL later
        link: "https://integrative-care.org/",
        index: 1,
      },
    });
    console.log("✓ IIIHWS project added:", integrativeProject.id);

    console.log("\n✅ Both projects successfully added to the database!");
  } catch (error) {
    console.error("❌ Error adding projects:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addProjects();




