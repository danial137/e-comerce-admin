import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
