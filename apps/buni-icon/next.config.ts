import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  transpilePackages: [
    '@buni/ui',
    '@buni/theme',
    '@buni/patterns',
    '@buni/tokens',
    '@buni/icons-data',
    '@buni/icon-react',
    '@buni/config',
    '@buni/utils',
  ],
  typedRoutes: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://icons.buni.africa',
  },
};

export default withNextIntl(config);
