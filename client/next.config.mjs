import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.petproekt.ru',
        pathname: '/**',
      }
    
    ],
  },
  crossOrigin: 'use-credentials',
};

export default withNextIntl(nextConfig);
