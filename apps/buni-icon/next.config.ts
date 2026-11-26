import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  transpilePackages: [
    '@buni-design/ui',
    '@buni/theme',
    '@buni-design/patterns',
    '@buni-design/tokens',
    '@buni-design/icons-data',
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
