import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Vercel 배포를 위해 비활성화 (기본 최적화 사용)
  images: {
    unoptimized: true, 
  },
  async redirects() {
    return [
      {
        source: "/guide/youth-rent-special-support",
        destination: "/guide/youth-rent-2026",
        permanent: true,
      },
      {
        source: "/guide/energy-voucher-guide",
        destination: "/guide/energy-voucher-2026",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
