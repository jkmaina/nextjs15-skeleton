/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React 19 features
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Experimental features
  experimental: {    
    
    // Enable React compiler (experimental)
    reactCompiler: {
      compilationMode: 'annotation',
    },
    
    // Server actions (stable in Next.js 15)
    serverActions: {
      bodySizeLimit: '2mb',
    },
    
    // Turbopack is now stable for dev mode in Next.js 15
    // but still experimental for builds
    turbo: {
      loaders: {
        // Add custom loaders for specific file types if needed
        '.md': ['@mdx-js/loader'],
      },
    },
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Redirects configuration
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
  
  // Environment variable configuration
  env: {
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  
  // Webpack configuration (if needed)
  webpack: (config, { isServer }) => {
    // Custom webpack configuration if needed
    return config;
  },
};

module.exports = nextConfig;