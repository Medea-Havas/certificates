/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
