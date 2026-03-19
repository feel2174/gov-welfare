import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Vercel 배포를 위해 비활성화 (기본 최적화 사용)
  images: {
    unoptimized: true, 
  }
};

export default nextConfig;
