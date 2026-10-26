import type { NextConfig } from "next";

// Until launch the site must not be indexed: a copy on *.vercel.app would compete with brightway.clinic in Google.
// On launch day set ALLOW_INDEXING=true in Vercel's production env vars (plan Phase 6).
const allowIndexing = process.env.ALLOW_INDEXING === "true";

// Only what the site really loads: own files, Meta Pixel (connect.facebook.net + facebook.com/tr), Google Maps iframe.
// Add a source here before embedding anything new (e.g. a hosted hero video or YouTube player).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"} https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com",
  "font-src 'self'",
  "connect-src 'self' https://www.facebook.com https://connect.facebook.net",
  "frame-src https://www.google.com https://maps.google.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // No includeSubDomains: the clinic's mail/cPanel subdomains stay on the old host after launch
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  // WordPress URLs end with "/" — keep every old URL identical (plan D5)
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const headers = allowIndexing ? securityHeaders : [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
