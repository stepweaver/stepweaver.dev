/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
    // Next.js 15 features
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Keep webpack config minimal to avoid conflicts
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
