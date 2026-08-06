import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
