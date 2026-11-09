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
    template: '%s | Buni Icon — L’Iconify de l’Afrique',
    default: 'Buni Icon — L’Iconify de l’Afrique | Standard d’icônes africaines',
  },
  description:
    'La bibliothèque souveraine d’icônes SVG africaines : artisanat, vie quotidienne, tech locale et symboles Adinkra vérifiés. Grille 24×24, trait pur, zéro artifice.',
  keywords: [
    'buni',
    'icons',
    'african icons',
    'iconify',
    'svg',
    'adinkra',
    'sankofa',
    'ghana',
    'senegal',
    'nigeria',
    'open source',
  ],
  authors: [{ name: 'Buni Collective', url: 'https://buni.idem.africa' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Buni Icon',
    title: 'Buni Icon — L’Iconify de l’Afrique',
    description: 'Le standard vectoriel des cultures et usages africains.',
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

