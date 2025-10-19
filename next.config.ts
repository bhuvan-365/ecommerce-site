import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['k72.ca'],  // Add any other domains you're using for images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k72.ca',
        pathname: '/uploads/**',
      },
      // Add more patterns if needed
    ],
  },
};

export default nextConfig;
