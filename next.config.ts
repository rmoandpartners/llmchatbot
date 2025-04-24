import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Specify the source directory for the app
  distDir: '.next',
  experimental: {
    appDir: true,
  },
}

export default nextConfig
