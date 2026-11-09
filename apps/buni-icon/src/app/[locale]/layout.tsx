import * as React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales, messages } from '@/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/Providers';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const currentMessages = messages[locale as keyof typeof messages];

  return (
    <NextIntlClientProvider locale={locale} messages={currentMessages} timeZone="Africa/Dakar">
      <Providers>
        <a
          href="#main-content"
          className="focus:rounded-avs focus:bg-avs-primary focus:text-avs-secondary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Aller au contenu principal
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="min-h-[calc(100vh-16rem)] outline-none">
          {children}
        </main>

        <Footer />
      </Providers>
    </NextIntlClientProvider>
  );
}
