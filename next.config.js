/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js where to find the app directory
  experimental: {
    appDir: true,
  },
  // Specify the source directory
  distDir: '.next',
  // This is the key configuration needed for Vercel to find the app directory
  dir: './src',
}

module.exports = nextConfig
