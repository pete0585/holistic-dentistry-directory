import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./app/best/**/*'],
  },
}

export default nextConfig
