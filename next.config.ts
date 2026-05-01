import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [72, 75],
  },
  reactCompiler: true,
};

export default nextConfig;
