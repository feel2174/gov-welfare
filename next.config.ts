import type { NextConfig } from "next";

const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "font-src 'self' https://cdn.jsdelivr.net data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https://*.googlesyndication.com https://*.vercel-insights.com https://vitals.vercel-insights.com",
  "frame-src https://googleads.g.doubleclick.net https://*.doubleclick.net",
].join('; ');

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
        ],
      },
    ];
  },
};

export default nextConfig;
