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
} from 'lucide-react';
import { useTranslations, useLocale } from '@/i18n';
import { ICONS_CATALOG, type BuniIconMeta } from '@buni/icons-data';
import { BuniIcon } from '@buni/icon-react';
import { IconCard } from '@/components/icons/IconCard';
import { useToast } from '@buni/ui';
import { getIconPattern } from '@/lib/pattern-map';

interface HeroPairing {
  iconSlug: string;
  labelFr: string;
  labelEn: string;
}

const HERO_PAIRINGS: readonly HeroPairing[] = [
  { iconSlug: 'home', labelFr: 'Accueil', labelEn: 'Home' },
  { iconSlug: 'search', labelFr: 'Recherche', labelEn: 'Search' },
  { iconSlug: 'user', labelFr: 'Profil', labelEn: 'Profile' },
  { iconSlug: 'shield', labelFr: 'Sécurité', labelEn: 'Security' },
  { iconSlug: 'basket', labelFr: 'Panier', labelEn: 'Basket' },
] as const;

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
  const pattern = getIconPattern(active.iconSlug);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-avs-accent/15 bg-avs-secondary/85 shadow-avs-md backdrop-blur-md"
      style={{
        boxShadow: '0 24px 60px -20px rgba(0,0,0,.22), 4px 4px 0 rgba(29,29,27,.08)',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4">
        <div className="flex flex-wrap gap-3">
          {HERO_PAIRINGS.map((p, i) => (
            <button
              key={p.iconSlug}
              type="button"
              onClick={() => onSelect(i)}
              className={`text-xs transition-colors ${
                i === index
                  ? 'font-semibold text-avs-primary'
                  : 'text-avs-accent/55 hover:text-avs-accent'
              }`}
            >
              {locale === 'en' ? p.labelEn : p.labelFr}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-4 my-3 flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl bg-avs-secondary/40">
        <div
          className={`absolute inset-0 ${pattern.cssClass} opacity-25 transition-all duration-700`}
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
            <div className="p-4 text-avs-primary">
              <BuniIcon name={active.iconSlug} size={56} strokeWidth={1.8} />
            </div>
            <div className="text-sm text-avs-accent/75">
              {locale === 'en' ? active.labelEn : active.labelFr}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-4 pb-4">
        <div className="mb-2 flex items-center justify-between text-xs text-avs-accent/60">
          <span>
            {locale === 'en'
              ? `Textile palette · ${pattern.name} · ${pattern.origin}`
              : `Palette textile · ${pattern.name} · ${pattern.origin}`}
          </span>
        </div>

        <div className="flex gap-1.5">
          {pattern.colors.map(hex => (
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
            <span>{locale === 'en' ? 'Icon details & exports' : 'Détails et exports'}</span>
            <ArrowRight size={12} />
          </Link>
          <div className="flex gap-1 text-[10px] text-avs-accent/45">
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
      'home',
      'search',
      'user',
      'menu',
      'settings',
      'shield',
      'basket',
      'favorite',
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
              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-avs-accent sm:text-6xl lg:text-7xl">
                Core 30
                <span className="block text-avs-primary">
                  {locale === 'en' ? 'for your interfaces.' : 'pour vos interfaces.'}
                </span>
              </h1>

              <p className="max-w-xl text-base text-avs-accent/75 font-sans leading-relaxed sm:text-lg">
                {t('subtitle')}
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-avs bg-avs-primary px-4 py-2 text-sm font-semibold text-avs-secondary transition-colors hover:bg-avs-primary/90 shadow-sm"
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

      <section id="familles" className="avs-container space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-avs-accent/10 pb-4">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-avs-accent">
              {t('popular')}
            </h2>
          </div>
          <Link
            href={`/${locale}/icons` as any}
            className="text-xs font-mono font-bold text-avs-primary hover:underline flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          {featuredIcons.map(icon => (
            <IconCard
              key={icon.slug}
              icon={icon}
              locale={locale}
              size={80}
              strokeWidth={1.75}
            />
          ))}
        </div>
      </section>

      <section className="avs-container">
        <div className="relative overflow-hidden rounded-2xl border-2 border-avs-accent/15 avs-pattern-kente-royale p-8 sm:p-12 text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/96 via-avs-secondary/92 to-avs-secondary/88" />
          <div className="relative z-10 space-y-5">
            <div className="inline-flex p-3 rounded-2xl bg-avs-primary text-avs-secondary shadow-avs">
              <BuniIcon name="home" size={32} />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-avs-accent">
              BUNI-ICON Core 30
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
