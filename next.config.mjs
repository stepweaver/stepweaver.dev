/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's strict mode for better error detection
  reactStrictMode: true,

  // Enable static image imports for optimization
  images: {
    remotePatterns: [
      // Add patterns here if you need to load external images
    ],
  },
};

export default nextConfig;
