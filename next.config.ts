import type { NextConfig } from "next";

// basePath só em produção (GitHub Pages); em dev o site fica em localhost:3000/
const basePath = process.env.NODE_ENV === "production" ? "/petcare-premium" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
