import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  env: {
    DOCKER_ENV: process.env.DOCKER_ENV || 'false',
  },
};

export default nextConfig;
