import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",

  transpilePackages: ["@wi-ui/registry"],

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  turbopack: {
    root: path.resolve(__dirname),
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
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
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
