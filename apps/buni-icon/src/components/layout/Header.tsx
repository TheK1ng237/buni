'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from '@/i18n';
import { Search, Globe } from 'lucide-react';
import { BuniIcon } from '@buni/icon-react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const switchLanguage = () => {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath as any);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-avs-accent/10 bg-avs-secondary/95 backdrop-blur-md transition-colors">
      <div className="avs-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}` as any} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-avs bg-avs-primary text-avs-secondary flex items-center justify-center font-bold text-base shadow-avs group-hover:scale-105 transition-transform">
              <BuniIcon name="home" size={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-wider text-lg leading-none text-avs-accent">
                BUNI<span className="text-avs-primary">.</span>ICON
              </span>
              <span className="text-xs text-avs-accent/60">
                Core 30 · SVG
              </span>
            </div>
          </Link>

        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-avs-accent/80">
          <Link
            href={`/${locale}/icons` as any}
            className="hover:text-avs-primary transition-colors"
          >
            <span>{t('catalog')}</span>
          </Link>
          <Link
            href={`/${locale}/#familles` as any}
            className="hover:text-avs-primary transition-colors"
          >
            {t('families')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/icons` as any}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-avs-accent/65 bg-avs-accent/5 hover:bg-avs-accent/10 rounded-avs border border-avs-accent/10 transition-colors"
          >
            <Search size={13} className="text-avs-primary" />
            <span className="hidden sm:inline">{locale === 'fr' ? 'Rechercher' : 'Search'}</span>
          </Link>

          <button
            onClick={switchLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-avs border border-avs-accent/15 hover:border-avs-primary hover:text-avs-primary transition-colors"
            aria-label="Changer de langue"
          >
            <Globe size={13} />
            <span>{t('switchLang')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
