import type { NextConfig } from "next";

/**
 * Response headers that are safe for every page and asset.
 * Deliberately not set here: `Content-Security-Policy` beyond `frame-ancestors` (the page carries a small inline
 * script and inline style blocks, so a strict policy needs a per-request nonce, which would make every page dynamic)
 * and `Strict-Transport-Security` (belongs to the host that terminates TLS).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Lets parallel tooling build into its own directory without clobbering the dev server's .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // No dev overlay badge polluting screenshots
  devIndicators: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Next answers any direct visit to a route called /404 with status 404, so the
  // custom 404 page lives at /error-404 internally and is served at /404 with status 200.
  async rewrites() {
    return { beforeFiles: [{ source: "/404", destination: "/error-404" }] };
  },
  async redirects() {
    return [{ source: "/error-404", destination: "/404", permanent: true }];
  },
};

export default nextConfig;
