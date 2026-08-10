import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow isolated builds when `next dev` is already using `.next`
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // Preserve case-sensitive doc slugs (CNNS, RNNs, etc.)
  trailingSlash: false,
  // WIP Phase 3 tutorials still trip ESLint; do not block docs SSG.
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/ai-for-leaders/intro',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
