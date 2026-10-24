import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WordPress URLs end with "/" — keep every old URL identical (plan D5)
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
