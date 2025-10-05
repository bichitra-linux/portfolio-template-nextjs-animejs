/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Exclude old src/ files from build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  eslint: {
    dirs: ['app', 'components', 'lib', 'types', 'data'],
    ignoreDuringBuilds: false,
  },
  
  images: {
    domains: ['via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable experimental features if needed
  experimental: {
    optimizePackageImports: ['animejs'],
  },
  
  // Custom webpack configuration for Anime.js
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
