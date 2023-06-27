/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  },
  env: {
    API_HOST: process.env.API_HOST,
    HOST: process.env.HOST
  }
};

module.exports = nextConfig;
