/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep case-sensitive path segments for CamelCase doc slugs.
  // Hosting/export mode deferred (D6).
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
