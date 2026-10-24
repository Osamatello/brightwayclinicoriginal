import type { NextConfig } from "next";

// Until launch the site must not be indexed: a copy on *.vercel.app would compete with brightway.clinic in Google.
// On launch day set ALLOW_INDEXING=true in Vercel's production env vars (plan Phase 6).
const allowIndexing = process.env.ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  // WordPress URLs end with "/" — keep every old URL identical (plan D5)
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return allowIndexing ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
