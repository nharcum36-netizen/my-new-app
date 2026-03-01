import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/journal",
        destination: "/programs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
