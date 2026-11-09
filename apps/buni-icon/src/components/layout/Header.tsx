'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from '@/i18n';
import { Search, Globe, ArrowUpRight } from 'lucide-react';
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
              <BuniIcon name="sankofa" size={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-wider text-lg leading-none text-avs-accent">
                BUNI<span className="text-avs-primary">.</span>ICON
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-avs-accent/60">
                Iconify Afrique
              </span>
            </div>
          </Link>

          <a
            href="https://buni.idem.africa"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-avs border border-avs-accent/10 text-[10px] font-mono uppercase tracking-wider text-avs-accent/60 hover:text-avs-primary hover:border-avs-primary/40 transition-colors"
          >
            <span>AVS Standard</span>
            <ArrowUpRight size={11} />
          </a>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-avs-accent/80">
          <Link
            href={`/${locale}/icons` as any}
            className="hover:text-avs-primary transition-colors flex items-center gap-1.5"
          >
            <span>{t('catalog')}</span>
            <span className="px-1.5 py-0.2 bg-avs-primary/10 text-avs-primary text-[10px] font-mono rounded">
              30
            </span>
          </Link>
          <Link
            href={`/${locale}/#familles` as any}
            className="hover:text-avs-primary transition-colors"
          >
            {t('families')}
          </Link>
          <Link
            href={`/${locale}/#lois` as any}
            className="hover:text-avs-primary transition-colors"
          >
            {t('standards')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/icons` as any}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-avs-accent/60 bg-avs-accent/5 hover:bg-avs-accent/10 rounded-avs border border-avs-accent/10 transition-colors"
          >
            <Search size={13} className="text-avs-primary" />
            <span className="hidden sm:inline">{t('searchPlaceholder').slice(0, 22)}...</span>
            <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] bg-avs-secondary border border-avs-accent/15 rounded text-avs-accent/70">
              ⌘K
            </kbd>
          </Link>

          <button
            onClick={switchLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold uppercase rounded-avs border border-avs-accent/15 hover:border-avs-primary hover:text-avs-primary transition-colors"
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
