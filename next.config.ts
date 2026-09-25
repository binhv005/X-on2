import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lalafolie.us",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/extra-long-handmade-nail-luxury",
        destination: "/blog/extra-long-handmade-nail-luxury",
      },
      {
        source: "/salon-quality-handmade-nails-reimagined-for-home",
        destination: "/blog/salon-quality-handmade-nails-reimagined-for-home",
      },
      {
        source: "/apply-gripx-nails",
        destination: "/blog/apply-gripx-nails",
      },
      {
        source: "/post-1",
        destination: "/blog/post-1",
      },
    ];
  },
};

export default nextConfig;
