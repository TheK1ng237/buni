import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const apiOrigin = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000')
  .replace(/\/api(\/v1)?\/?$/, '');

const config: NextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@buni/ui',
    '@buni/theme',
    '@buni/auth',
    '@buni/patterns',
    '@buni/api',
    '@buni/tokens',
    '@buni/icons',
    '@buni/config',
    '@buni/analytics',
    '@buni/utils',
    '@buni/i18n',
    '@buni/component',
  ],
  typedRoutes: true,
  allowedDevOrigins: ['192.168.1.18'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.buni.africa',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiOrigin}/api/v1/:path*`,
      },
    ];
  },
  env: { NEXT_PUBLIC_SITE_URL: 'https://avs.buni.africa' },
};

export default withNextIntl(config);
