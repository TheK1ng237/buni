'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from '@/i18n';
import { ICONS_CATALOG, type BuniIconMeta } from '@buni/icons-data';
import { BuniIcon } from '@buni/icon-react';
import { Marquee } from '@/components/ui/Marquee';
import { ArrowRight, Search, Copy, Terminal, Compass, Sparkles } from 'lucide-react';
import { useToast } from '@buni/ui';

export function HomeClient() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const { add } = useToast();
  const [quickSearch, setQuickSearch] = React.useState('');

  const featuredSlugs = [
    'sankofa',
    'calebasse',
    'mobile-money',
    'djembe',
    'gye-nyame',
    'ussd',
    'tabouret-ashanti',
    'duafe',
  ];

  const featuredIcons: BuniIconMeta[] = featuredSlugs
    .map(slug => ICONS_CATALOG.find(i => i.slug === slug))
    .filter((i): i is BuniIconMeta => Boolean(i));

  const copyQuickSvg = async (icon: any) => {
    try {
      await navigator.clipboard.writeText(icon.svg);
      add({
        variant: 'success',
        title: 'Copié !',
        message: `SVG de « ${icon.nameFr} » copié en un clic.`,
        duration: 2500,
      });
    } catch {
      //
    }
  };

  const copyIconifyInstall = async () => {
    try {
      await navigator.clipboard.writeText('npm install @buni/icon-react @buni/icons-data');
      add({
        variant: 'success',
        title: 'Commande copiée !',
        message: 'npm install @buni/icon-react copié dans le presse-papier.',
        duration: 2500,
      });
    } catch {
      //
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* ══ § 1 — HERO SECTION ════════════════════════════════════════ */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="avs-container max-w-5xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-avs-primary/10 border border-avs-primary/20 text-avs-primary text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles size={13} />
            <span>{t('badge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-avs-accent leading-[1.08]">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-avs-accent/75 font-sans leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Instant Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (quickSearch.trim()) {
                  window.location.href = `/${locale}/icons?q=${encodeURIComponent(quickSearch.trim())}`;
                }
              }}
              className="relative flex items-center"
            >
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-avs-accent/40"
              />
              <input
                type="text"
                value={quickSearch}
                onChange={e => setQuickSearch(e.target.value)}
                placeholder={tNav('searchPlaceholder')}
                className="w-full pl-12 pr-28 py-3.5 rounded-avs border-2 border-avs-accent/20 bg-white dark:bg-dark-surface shadow-avs text-sm font-sans focus:border-avs-primary focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-avs bg-avs-primary text-avs-secondary font-mono text-xs font-bold hover:bg-avs-primary/90 transition-colors shadow-sm"
              >
                Explorer
              </button>
            </form>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={`/${locale}/icons` as any}
              className="avs-btn-primary flex items-center gap-2 text-sm px-6 py-3"
            >
              <span>{t('ctaExplore')}</span>
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={copyIconifyInstall}
              className="avs-btn-secondary flex items-center gap-2 text-sm px-5 py-3 font-mono"
            >
              <Terminal size={15} />
              <span>npm i @buni/icon-react</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══ § 2 — MARQUEE BANNER ══════════════════════════════════════ */}
      <Marquee locale={locale} />

      {/* ══ § 3 — STATS CHIFFRES CLÉS ═════════════════════════════════ */}
      <section className="avs-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="avs-card p-5 text-center">
            <div className="font-display font-black text-3xl sm:text-4xl text-avs-primary">
              30
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-avs-accent mt-1">
              {t('stats.icons')}
            </div>
            <div className="text-[10px] font-mono text-avs-accent/50">
              {t('stats.iconsSub')}
            </div>
          </div>

          <div className="avs-card p-5 text-center">
            <div className="font-display font-black text-3xl sm:text-4xl text-avs-kente">
              4
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-avs-accent mt-1">
              {t('stats.families')}
            </div>
            <div className="text-[10px] font-mono text-avs-accent/50">
              {t('stats.familiesSub')}
            </div>
          </div>

          <div className="avs-card p-5 text-center">
            <div className="font-display font-black text-3xl sm:text-4xl text-avs-ndop">
              100%
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-avs-accent mt-1">
              {t('stats.verified')}
            </div>
            <div className="text-[10px] font-mono text-avs-accent/50">
              {t('stats.verifiedSub')}
            </div>
          </div>

          <div className="avs-card p-5 text-center">
            <div className="font-display font-black text-3xl sm:text-4xl text-avs-indigo">
              CC BY 4.0
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-avs-accent mt-1">
              {t('stats.license')}
            </div>
            <div className="text-[10px] font-mono text-avs-accent/50">
              {t('stats.licenseSub')}
            </div>
          </div>
        </div>
      </section>

      {/* ══ § 4 — SÉLECTION D'ICÔNES PHARES ════════════════════════════ */}
      <section id="familles" className="avs-container space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-avs-accent/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-avs-primary font-bold">
              <span>Collection Souveraine</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-avs-accent">
              {t('popular')}
            </h2>
          </div>
          <Link
            href={`/${locale}/icons` as any}
            className="text-xs font-mono font-bold text-avs-primary hover:underline flex items-center gap-1"
          >
            <span>{t('viewAll')} (30)</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredIcons.map(icon => (
            <div
              key={icon.slug}
              className="avs-card p-4 group hover:border-avs-primary/50 hover:shadow-avs-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-avs-accent/50 mb-2">
                <span className="uppercase">{icon.family.split('-')[0]}</span>
                <span className="font-bold">{icon.countryCode}</span>
              </div>

              <Link
                href={`/${locale}/icons/${icon.slug}` as any}
                className="flex flex-col items-center justify-center py-5 group-hover:scale-105 transition-transform"
              >
                <div className="w-14 h-14 rounded-avs bg-avs-secondary border border-avs-accent/10 flex items-center justify-center text-avs-accent group-hover:text-avs-primary group-hover:border-avs-primary/40 transition-colors">
                  <BuniIcon name={icon.slug} size={28} />
                </div>
              </Link>

              <div className="pt-2 border-t border-avs-accent/8 flex items-center justify-between">
                <div>
                  <Link
                    href={`/${locale}/icons/${icon.slug}` as any}
                    className="text-xs font-bold text-avs-accent hover:text-avs-primary transition-colors block truncate"
                  >
                    {locale === 'en' ? icon.nameEn : icon.nameFr}
                  </Link>
                  <span className="text-[9px] font-mono text-avs-accent/50 truncate block">
                    {icon.people}
                  </span>
                </div>
                <button
                  onClick={() => copyQuickSvg(icon)}
                  className="p-1 rounded-avs border border-avs-accent/15 text-avs-accent/70 hover:text-avs-primary hover:border-avs-primary hover:bg-avs-primary/10 transition-colors"
                  title="Copier SVG"
                >
                  <Copy size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ § 5 — LES QUATRE LOIS DE BUNI ═════════════════════════════ */}
      <section id="lois" className="avs-container space-y-8">
        <div className="max-w-xl">
          <div className="font-mono text-[10px] uppercase tracking-widest text-avs-primary font-bold mb-1">
            Manifeste & Rigueur
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-avs-accent">
            {t('lawsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loi 1 */}
          <div className="avs-card p-6 space-y-3 border-l-4 border-l-avs-primary">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-avs-primary uppercase tracking-wider">
                Loi I
              </span>
              <Compass size={18} className="text-avs-primary/60" />
            </div>
            <h3 className="font-display font-bold text-lg text-avs-accent">
              {t('laws.law1Title')}
            </h3>
            <p className="text-sm text-avs-accent/70 leading-relaxed">
              {t('laws.law1Desc')}
            </p>
          </div>

          {/* Loi 2 */}
          <div className="avs-card p-6 space-y-3 border-l-4 border-l-avs-kente">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-avs-kente uppercase tracking-wider">
                Loi II
              </span>
              <Sparkles size={18} className="text-avs-kente/60" />
            </div>
            <h3 className="font-display font-bold text-lg text-avs-accent">
              {t('laws.law2Title')}
            </h3>
            <p className="text-sm text-avs-accent/70 leading-relaxed">
              {t('laws.law2Desc')}
            </p>
          </div>

          {/* Loi 3 */}
          <div className="avs-card p-6 space-y-3 border-l-4 border-l-avs-ndop">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-avs-ndop uppercase tracking-wider">
                Loi III
              </span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-avs-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-avs-kente" />
                <span className="w-2.5 h-2.5 rounded-full bg-avs-ndop" />
              </div>
            </div>
            <h3 className="font-display font-bold text-lg text-avs-accent">
              {t('laws.law3Title')}
            </h3>
            <p className="text-sm text-avs-accent/70 leading-relaxed">
              {t('laws.law3Desc')}
            </p>
          </div>

          {/* Loi 4 */}
          <div className="avs-card p-6 space-y-3 border-l-4 border-l-avs-indigo">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-avs-indigo uppercase tracking-wider">
                Loi IV
              </span>
              <Terminal size={18} className="text-avs-indigo/60" />
            </div>
            <h3 className="font-display font-bold text-lg text-avs-accent">
              {t('laws.law4Title')}
            </h3>
            <p className="text-sm text-avs-accent/70 leading-relaxed">
              {t('laws.law4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* ══ § 6 — CALL TO ACTION CATALOGUE ═════════════════════════════ */}
      <section className="avs-container">
        <div className="avs-card p-8 sm:p-12 text-center bg-gradient-to-br from-avs-primary/10 via-avs-secondary to-avs-kente/10 border-2 border-avs-accent/15 space-y-6">
          <div className="inline-flex p-3 rounded-full bg-avs-primary text-avs-secondary shadow-avs">
            <BuniIcon name="sankofa" size={32} />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-avs-accent">
            Prêt à enrichir vos applications ?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-avs-accent/75">
            Accédez à toutes les icônes en un clic. Copiez le SVG brut, intégrez le composant React ou chargez le préfixe <code className="font-mono font-bold text-avs-primary">buni:</code> dans vos projets Iconify.
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/icons` as any}
              className="avs-btn-primary inline-flex items-center gap-2 text-sm px-8 py-3.5"
            >
              <span>Accéder au catalogue complet</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

