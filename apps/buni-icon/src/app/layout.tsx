import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

export const buniDisplay = localFont({
  src: '../../public/fonts/BuniDisplay-Regular.otf',
  variable: '--font-buni-display',
  display: 'swap',
});

export const jetbrains = localFont({
  src: '../../public/fonts/JetBrains_Mono/JetBrainsMono-Regular.ttf',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://icons.buni.africa'),
  title: {
    template: '%s | BUNI-ICON Core 30',
    default: 'BUNI-ICON Core 30 | Icônes d’interface',
  },
  description:
    'Collection de 30 icônes SVG d’interface en outline minimaliste. Grille 24×24, couleur currentColor et exports SVG, React et Iconify.',
  keywords: [
    'buni',
    'icons',
    'core 30',
    'iconify',
    'svg',
    'interface',
    'outline',
    'open source',
  ],
  authors: [{ name: 'Buni Collective', url: 'https://buni.idem.africa' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Buni Icon',
    title: 'BUNI-ICON Core 30',
    description: '30 icônes SVG minimalistes pour les interfaces.',
  },
};

export const viewport: Viewport = {
  themeColor: '#C0573E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${buniDisplay.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      </head>
      <body className="bg-avs-secondary font-body text-avs-accent selection:bg-avs-primary/20 selection:text-avs-primary min-h-screen antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
