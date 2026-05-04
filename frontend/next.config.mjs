import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@backend': path.join(__dirname, '../backend/src'),
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/trpc/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/trpc/:path*`,
      },
    ];
  },
};

export default nextConfig;
