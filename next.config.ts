import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",

  // Compilar apenas quando necessário
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
