import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "tactyqal.com" },
      { protocol: "https", hostname: "www.tactyqal.com" },
    ],
  },
};

export default nextConfig;
