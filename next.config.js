/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_API_DOMAIN || 'api.zhendong.rgtest.ru',
      },
      {
        protocol: 'https',
        hostname: 'api.zhendong.rgtest.ru',
      },
    ],
  },
}

module.exports = nextConfig
