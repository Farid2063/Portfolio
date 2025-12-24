import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Optimize for faster builds and prevent crashes
  experimental: {
    optimizePackageImports: ['@gsap/react', 'gsap'],
  },
  // Increase timeout to prevent connection issues
  serverRuntimeConfig: {
    maxDuration: 30,
  },
};

export default nextConfig;

