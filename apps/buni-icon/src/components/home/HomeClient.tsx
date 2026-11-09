'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Copy,
  Check,
  Terminal,
  Compass,
  Layers,
  Code2,
  Palette,
} from 'lucide-react';
import { useTranslations, useLocale } from '@/i18n';
import { ICONS_CATALOG, type BuniIconMeta } from '@buni/icons-data';
import { BuniIcon } from '@buni/icon-react';
import { Marquee } from '@/components/ui/Marquee';
import { IconCard } from '@/components/icons/IconCard';
import { useToast } from '@buni/ui';

interface HeroPairing {
  iconSlug: string;
  patternCss: string;
  patternName: string;
  culture: string;
  country: string;
  flag: string;
  colors: readonly [string, string, string, string];
}

const HERO_PAIRINGS: readonly HeroPairing[] = [
  {
    iconSlug: 'sankofa',
    patternCss: 'avs-pattern-adinkra-sankofa',
    patternName: 'Adinkra Sankofa',
    culture: 'Peuple Akan',
    country: 'Ghana',
    flag: 'GH',
    colors: ['#C0573E', '#F5EBE0', '#1D1D1B', '#C8A96E'],
  },
  {
    iconSlug: 'tabouret-ashanti',
    patternCss: 'avs-pattern-kente-royale',
    patternName: 'Kente Royale',
    culture: 'Royaume Ashanti',
    country: 'Ghana',
    flag: 'GH',
    colors: ['#D4A017', '#C0573E', '#4A6741', '#1D1D1B'],
  },
  {
    iconSlug: 'djembe',
    patternCss: 'avs-pattern-bogolan-fanga',
    patternName: 'Bogolan Fanga',
    culture: 'Peuple Mandé',
    country: 'Mali',
    flag: 'ML',
    colors: ['#8B4513', '#D4A017', '#1D1D1B', '#F5EBE0'],
  },
  {
    iconSlug: 'poterie',
    patternCss: 'avs-pattern-ndop-sultan',
    patternName: 'Ndop Sultan',
    culture: 'Royaume Bamoun',
    country: 'Cameroun',
    flag: 'CM',
    colors: ['#2A4A6B', '#F5EBE0', '#8B4513', '#1D1D1B'],
  },
  {
    iconSlug: 'pirogue',
    patternCss: 'avs-pattern-kuba-kasai',
    patternName: 'Kuba Kasai',
    culture: 'Royaume Kuba',
    country: 'RD Congo',
    flag: 'CD',
    colors: ['#4A6741', '#C8A96E', '#1D1D1B', '#F5EBE0'],
  },
] as const;

const AUTO_ADVANCE_MS = 4600;
const ease = [0.22, 1, 0.36, 1] as const;

function IconInspector({
  active,
  index,
  onSelect,
  copiedHex,
  onCopyHex,
  locale,
}: {
  active: HeroPairing;
  index: number;
  onSelect: (i: number) => void;
  copiedHex: string | null;
  onCopyHex: (hex: string) => void;
  locale: string;
}) {
  const iconMeta = ICONS_CATALOG.find(i => i.slug === active.iconSlug);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-avs-accent/15 bg-avs-secondary/85 shadow-avs-md backdrop-blur-md"
      style={{
        boxShadow: '0 24px 60px -20px rgba(0,0,0,.22), 4px 4px 0 rgba(29,29,27,.08)',
      }}
    >
      <div className="flex gap-1 px-4 pt-3" aria-hidden="true">
        {HERO_PAIRINGS.map((p, i) => (
          <div
            key={p.iconSlug}
            className="h-1 flex-1 overflow-hidden rounded-full bg-avs-accent/10"
          >
            {i === index && (
              <motion.div
                key={`${p.iconSlug}-${index}`}
                className="h-full bg-avs-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
              />
            )}
            {i < index && <div className="h-full w-full bg-avs-primary/60" />}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3">
        <div className="flex flex-wrap gap-1">
          {HERO_PAIRINGS.map((p, i) => (
            <button
              key={p.iconSlug}
              type="button"
              onClick={() => onSelect(i)}
              className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase transition-colors ${
                i === index
                  ? 'bg-avs-primary text-avs-secondary shadow-sm'
                  : 'text-avs-accent/60 hover:text-avs-accent hover:bg-avs-accent/5'
              }`}
            >
              {p.flag} {p.iconSlug}
            </button>
          ))}
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-avs-accent/50">
          buni:{active.iconSlug}
        </span>
      </div>

      <div className="relative mx-4 my-3 flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-avs-accent/10 bg-avs-secondary/40">
        <div
          className={`absolute inset-0 ${active.patternCss} opacity-25 transition-all duration-700`}
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.iconSlug}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.35, ease }}
            className="relative z-10 flex flex-col items-center gap-2 p-4 text-center"
          >
            <div className="rounded-2xl border border-avs-accent/15 bg-avs-secondary/95 p-4 text-avs-primary shadow-avs">
              <BuniIcon name={active.iconSlug} size={56} strokeWidth={1.8} />
            </div>
            <div className="rounded-full border border-avs-accent/15 bg-avs-secondary/90 px-3 py-0.5 font-mono text-[10px] font-bold text-avs-accent">
              {active.patternName} · {active.culture}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-4 pb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-avs-primary">
            Pigments naturels associés
          </span>
          <span className="font-mono text-[9px] text-avs-accent/50">
            {active.country} [{active.flag}]
          </span>
        </div>

        <div className="flex gap-1.5">
          {active.colors.map(hex => (
            <button
              key={hex}
              type="button"
              onClick={() => onCopyHex(hex)}
              className="group relative h-7 flex-1 overflow-hidden rounded border border-black/10 transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: hex }}
              title={`Copier ${hex}`}
            >
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {copiedHex === hex ? (
                  <Check size={11} className="text-white" />
                ) : (
                  <Copy size={11} className="text-white" />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-avs-accent/10 pt-2 text-xs">
          <Link
            href={`/${locale}/icons/${active.iconSlug}` as any}
            className="flex items-center gap-1 font-mono text-[11px] font-bold text-avs-primary hover:underline"
          >
            <span>Fiche culturelle & exports</span>
            <ArrowRight size={12} />
          </Link>
          <div className="flex gap-1 font-mono text-[9px] uppercase tracking-wider text-avs-accent/40">
            <span>SVG</span>
            <span>·</span>
            <span>JSX</span>
            <span>·</span>
            <span>Iconify</span>
            <span>·</span>
            <span>PNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeClient() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const { add } = useToast();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeInspectorIndex, setActiveInspectorIndex] = React.useState(0);
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  const activePairing = HERO_PAIRINGS[activeInspectorIndex] ?? HERO_PAIRINGS[0]!;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveInspectorIndex(i => (i + 1) % HERO_PAIRINGS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  const handleCopyHex = React.useCallback(
    (hex: string) => {
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(hex).catch(() => {});
      }
      setCopiedHex(hex);
      add({
        variant: 'success',
        title: 'Pigment copié',
        message: `${hex} copié dans le presse-papier.`,
        duration: 2000,
      });
      setTimeout(() => setCopiedHex(c => (c === hex ? null : c)), 1500);
    },
    [add]
  );

  const featuredIcons = React.useMemo(() => {
    const slugs = [
      'sankofa',
      'calebasse',
      'mobile-money',
      'djembe',
      'gye-nyame',
      'ussd',
      'tabouret-ashanti',
      'duafe',
    ];
    return slugs
      .map(slug => ICONS_CATALOG.find(i => i.slug === slug))
      .filter((i): i is BuniIconMeta => Boolean(i));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/icons?q=${encodeURIComponent(searchQuery.trim())}` as any);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 overflow-x-hidden">
      <section className="relative px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="avs-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-avs-primary/25 bg-avs-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-avs-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-avs-primary animate-pulse" />
                <span>{t('badge')}</span>
              </div>

              <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-avs-accent sm:text-6xl lg:text-7xl">
                <span>Chaque icône</span>
                <span className="block text-avs-primary">a une histoire.</span>
                <span className="block">Nous l'avons codée.</span>
              </h1>

              <p className="max-w-xl text-base text-avs-accent/75 font-sans leading-relaxed sm:text-lg">
                La bibliothèque souveraine d’icônes vectorielles ancrées dans les cultures,
                l’artisanat et le quotidien africains. Grille 24×24, pixel habité, copier-coller
                immédiat pour React, SVG et l'écosystème Iconify.
              </p>

              <form onSubmit={handleSearchSubmit} className="relative max-w-lg">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-avs-accent/40"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={tNav('searchPlaceholder')}
                  className="w-full rounded-avs border border-avs-accent/20 bg-white dark:bg-dark-surface py-3.5 pl-12 pr-28 text-sm font-sans shadow-avs transition-all focus:border-avs-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-avs bg-avs-primary px-4 py-2 font-mono text-xs font-bold text-avs-secondary transition-colors hover:bg-avs-primary/90 shadow-sm"
                >
                  Explorer
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/${locale}/icons` as any}
                  className="avs-btn-primary flex items-center gap-2 text-sm px-6 py-3"
                >
                  <span>{t('ctaExplore')}</span>
                  <ArrowRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('npm i @buni/icon-react @buni/icons-data');
                    add({
                      variant: 'success',
                      title: 'Commande copiée',
                      message: 'npm i @buni/icon-react @buni/icons-data',
                      duration: 2000,
                    });
                  }}
                  className="avs-btn-secondary flex items-center gap-2 text-sm px-5 py-3 font-mono"
                >
                  <Terminal size={15} />
                  <span>npm i @buni/icon-react</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[11px] text-avs-accent/60">
                <span>Provenance vérifiée</span>
                <span>·</span>
                <span>CC BY 4.0</span>
                <span>·</span>
                <span>Grille 24×24</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <IconInspector
                active={activePairing}
                index={activeInspectorIndex}
                onSelect={setActiveInspectorIndex}
                copiedHex={copiedHex}
                onCopyHex={handleCopyHex}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </section>

      <Marquee locale={locale} />

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

      <section id="familles" className="avs-container space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-avs-accent/10 pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-avs-primary font-bold">
              Collection Souveraine
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
            <IconCard
              key={icon.slug}
              icon={icon}
              locale={locale}
              size={32}
              strokeWidth={1.75}
            />
          ))}
        </div>
      </section>

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
          <div className="relative overflow-hidden rounded-2xl border border-avs-accent/15 avs-pattern-adinkra-sankofa p-6 space-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/95 via-avs-secondary/90 to-avs-secondary/85" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-avs-primary uppercase tracking-wider">
                  Loi I · Adinkra Sankofa
                </span>
                <Compass size={18} className="text-avs-primary/70" />
              </div>
              <h3 className="font-display font-bold text-lg text-avs-accent">
                {t('laws.law1Title')}
              </h3>
              <p className="text-sm text-avs-accent/75 leading-relaxed font-sans">
                {t('laws.law1Desc')}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-avs-accent/15 avs-pattern-ndop-sultan p-6 space-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/95 via-avs-secondary/90 to-avs-secondary/85" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-avs-ndop uppercase tracking-wider">
                  Loi II · Ndop Sultan
                </span>
                <Layers size={18} className="text-avs-ndop/70" />
              </div>
              <h3 className="font-display font-bold text-lg text-avs-accent">
                {t('laws.law2Title')}
              </h3>
              <p className="text-sm text-avs-accent/75 leading-relaxed font-sans">
                {t('laws.law2Desc')}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-avs-accent/15 avs-pattern-kente-royale p-6 space-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/95 via-avs-secondary/90 to-avs-secondary/85" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-avs-kente uppercase tracking-wider">
                  Loi III · Kente Royale
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-avs-primary" />
                  <span className="w-2.5 h-2.5 rounded-full bg-avs-kente" />
                  <span className="w-2.5 h-2.5 rounded-full bg-avs-ndop" />
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-avs-accent">
                {t('laws.law3Title')}
              </h3>
              <p className="text-sm text-avs-accent/75 leading-relaxed font-sans">
                {t('laws.law3Desc')}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-avs-accent/15 avs-pattern-bogolan-fanga p-6 space-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/95 via-avs-secondary/90 to-avs-secondary/85" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-avs-indigo uppercase tracking-wider">
                  Loi IV · Bogolan Fanga
                </span>
                <Code2 size={18} className="text-avs-indigo/70" />
              </div>
              <h3 className="font-display font-bold text-lg text-avs-accent">
                {t('laws.law4Title')}
              </h3>
              <p className="text-sm text-avs-accent/75 leading-relaxed font-sans">
                {t('laws.law4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="avs-container">
        <div className="relative overflow-hidden rounded-2xl border-2 border-avs-accent/15 avs-pattern-kente-royale p-8 sm:p-12 text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/96 via-avs-secondary/92 to-avs-secondary/88" />
          <div className="relative z-10 space-y-5">
            <div className="inline-flex p-3 rounded-2xl bg-avs-primary text-avs-secondary shadow-avs">
              <BuniIcon name="sankofa" size={32} />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-avs-accent">
              Chaque icône a une histoire.
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-avs-accent/75 font-sans leading-relaxed">
              Copiez le SVG brut, intégrez le composant React tree-shakable ou chargez le préfixe <code className="font-mono font-bold text-avs-primary">buni:</code> dans vos projets Iconify.
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
        </div>
      </section>
    </div>
  );
}
