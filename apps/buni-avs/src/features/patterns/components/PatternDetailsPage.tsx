'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Download,
  Globe2,
  Hammer,
  Landmark,
  Layers,
  Link2,
  MapPin,
  Palette,
  Quote,
  Share2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { formatNumber } from '@buni/utils';
import { useToast } from '@buni/ui';

import { usePattern } from '../hooks/usePatterns';
import { patternRepository } from '../repositories/pattern.repository';
import { saveBlob } from '../utils/css-pattern-svg';
import { PatternAdminActions } from './PatternAdminActions';
import { CSS_PATTERN_MAP } from '@buni/patterns';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION DES SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'histoire', label: 'Histoire', icon: BookOpen },
  { id: 'technique', label: 'Technique', icon: Hammer },
  { id: 'symbolisme', label: 'Symbolisme', icon: Sparkles },
  { id: 'ceremoniel', label: 'Cérémoniel', icon: Landmark },
  { id: 'couleurs', label: 'Couleurs', icon: Palette },
  { id: 'symboles', label: 'Symboles', icon: Layers },
  { id: 'sources', label: 'Sources', icon: Link2 },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS DE NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

function SectionNav({
  available,
  activeSection,
}: {
  available: Set<string>;
  activeSection: string | null;
}) {
  const items = SECTIONS.filter((s) => available.has(s.id));
  if (items.length === 0) return null;

  return (
    <div className="sticky top-12 z-10 hidden lg:block">
      <nav className="border-avs-accent/10 border-l pl-4">
        <p className="text-avs-accent/40 mb-6 font-mono text-[10px] font-medium tracking-[0.2em] uppercase">
          Sommaire
        </p>
        <ul className="space-y-4">
          {items.map(({ id, label, icon: Icon }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={`group flex items-center gap-4 text-sm transition-all duration-300 ${
                  activeSection === id
                    ? 'text-avs-primary font-medium'
                    : 'text-avs-accent/50 hover:text-avs-accent font-light'
                }`}
              >
                {activeSection === id && (
                  <motion.div
                    layoutId="activeSection"
                    className="bg-avs-primary absolute top-1/2 -left-[17px] h-4 w-[2px] -translate-y-1/2 rounded-r-full"
                  />
                )}
                <Icon size={14} className="opacity-70 transition-opacity group-hover:opacity-100" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MobileSectionNav({
  available,
  activeSection,
  onSectionClick,
}: {
  available: Set<string>;
  activeSection: string | null;
  onSectionClick: (id: string) => void;
}) {
  const items = SECTIONS.filter((s) => available.has(s.id));
  if (items.length === 0) return null;

  return (
    <div className="sticky top-0 z-20 lg:hidden">
      <div className="border-avs-accent/10 bg-avs-secondary/80 border-b-[0.5px] backdrop-blur-xl">
        <div className="scrollbar-hide flex gap-6 overflow-x-auto px-4">
          {items.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onSectionClick(id)}
              className={`relative shrink-0 border-b-2 px-1 py-4 text-xs font-medium whitespace-nowrap transition-colors ${
                activeSection === id
                  ? 'text-avs-primary border-avs-primary'
                  : 'text-avs-accent/50 hover:text-avs-accent border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS DE MISE EN PAGE
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: typeof MapPin;
}) {
  return (
    <div className="group border-avs-accent/9 bg-avs-secondary hover:border-avs-primary/20 relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5">
      <div className="bg-avs-primary absolute inset-x-0 top-0 h-0.5" aria-hidden />
      <div className="flex items-center gap-3">
        <div className="bg-avs-primary/8 text-avs-primary flex h-9 w-9 items-center justify-center rounded-xl">
          <Icon size={16} aria-hidden />
        </div>
        <div>
          <p
            className="font-display text-avs-accent text-xl leading-none font-black"
            style={{ letterSpacing: '-0.02em' }}
          >
            {value}
          </p>
          <p className="text-avs-accent/35 mt-0.5 text-xs">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Panel({
  children,
  className,
  id,
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-avs-secondary w-full scroll-mt-32 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
        featured
          ? 'border-avs-primary/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          : 'border-avs-accent/9 hover:border-avs-primary/20'
      } ${className ?? ''}`}
      style={{ boxShadow: 'none' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(192,87,62,0.10)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {children}
    </motion.div>
  );
}

function PanelHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-avs-accent/9 border-b px-6 py-5 md:px-8 md:py-6">
      <h3
        className="font-display text-avs-accent text-lg font-black"
        style={{ letterSpacing: '-0.015em' }}
      >
        {title}
      </h3>
      {subtitle && <p className="text-avs-accent/35 mt-1.5 text-sm font-light">{subtitle}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export default function PatternDetailsPage({ slug }: { slug: string }) {
  const { data: pattern, isLoading, error } = usePattern(slug);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { add } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.filter(
        (s) =>
          pattern &&
          ((s.id === 'histoire' && pattern.history) ||
            (s.id === 'technique' && pattern.technique) ||
            (s.id === 'symbolisme' && pattern.symbolism) ||
            (s.id === 'ceremoniel' && pattern.ceremonial) ||
            (s.id === 'couleurs' && pattern.colors?.length) ||
            (s.id === 'symboles' && pattern.symbols?.length) ||
            (s.id === 'sources' && pattern.sources?.length))
      );

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pattern]);

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleDownload = async () => {
    if (!pattern || pattern.status?.toLowerCase() !== 'published' || isDownloading) return;

    setIsDownloading(true);
    try {
      const file = await patternRepository.download(pattern.id);
      const filename = (pattern.slug || pattern.name || 'motif').replace(/[^a-zA-Z0-9-_]/g, '-');
      saveBlob(file, `${filename}.svg`);
      add({
        variant: 'success',
        title: 'Téléchargement réussi',
        message: `Le motif ${pattern.name} a été téléchargé.`,
      });
    } catch (downloadError) {
      console.error('Pattern download failed:', downloadError);
      add({
        variant: 'error',
        title: 'Échec du téléchargement',
        message: 'Le fichier du motif est momentanément indisponible. Réessayez plus tard.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: pattern?.name, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      add({ variant: 'success', message: 'Lien du motif copié ou partagé.' });
    } catch (shareError) {
      if (shareError instanceof Error && shareError.name === 'AbortError') return;
      console.error('Pattern share failed:', shareError);
      add({ variant: 'error', message: 'Impossible de partager ce lien depuis ce navigateur.' });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-avs-secondary min-h-screen">
        <div className="bg-avs-secondary border-avs-accent/9 relative border-b">
          <div className="avs-pattern-kente-royale absolute inset-0 opacity-[0.03]" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-avs-accent/6 h-8 w-48 animate-pulse rounded" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border-avs-accent/9 bg-avs-secondary animate-pulse rounded-2xl border p-5"
              >
                <div className="bg-avs-accent/6 h-4 w-16 rounded" />
                <div className="bg-avs-accent/6 mt-2 h-6 w-12 rounded" />
              </div>
            ))}
          </div>
          <div className="border-avs-accent/9 bg-avs-secondary animate-pulse rounded-2xl border p-8">
            <div className="bg-avs-accent/6 aspect-[21/9] w-full rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !pattern) {
    return (
      <div className="bg-avs-secondary flex min-h-screen flex-col items-center justify-center">
        <p className="text-avs-accent/60 mb-4 font-light">Motif introuvable.</p>
        <Link
          href="/patternsDashboard"
          className="text-avs-primary text-sm font-medium hover:underline"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const patCss =
    pattern.cssClass ||
    (CSS_PATTERN_MAP[pattern.type?.toLowerCase() as keyof typeof CSS_PATTERN_MAP] ??
      CSS_PATTERN_MAP.wax);
  const patternImage = pattern.svgUrl || pattern.imgUrl;
  const available = new Set<string>(
    [
      pattern.history && 'histoire',
      pattern.technique && 'technique',
      pattern.symbolism && 'symbolisme',
      pattern.ceremonial && 'ceremoniel',
      pattern.colors?.length && 'couleurs',
      pattern.symbols?.length && 'symboles',
      pattern.sources?.length && 'sources',
    ].filter(Boolean) as string[]
  );

  return (
    <div className="bg-avs-secondary min-h-screen font-sans">
      {/* ══ HEADER ══════════════════════════════════════════════════════ */}
      <div className="border-avs-accent/9 bg-avs-secondary relative border-b">
        <div className="avs-pattern-kente-royale absolute inset-0 opacity-[0.03]" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="avs-pattern-kente-royale text-avs-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Layers size={18} aria-hidden />
            </span>
            <div>
              <p className="text-avs-primary font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                Encyclopédie des motifs
              </p>
              <p className="text-avs-accent/45 text-xs">Archive Visuelle Sénégalaise</p>
            </div>
          </div>
          <Link
            href="/patternsDashboard"
            className="border-avs-accent/10 bg-avs-secondary text-avs-accent/70 hover:border-avs-primary/30 hover:text-avs-primary inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors sm:px-4"
          >
            <ArrowLeft size={15} /> <span className="hidden sm:inline">Tous les motifs</span>
            <span className="sm:hidden">Retour</span>
          </Link>
        </div>
      </div>

      <MobileSectionNav
        available={available}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="border-avs-accent/10 bg-avs-secondary shadow-avs-md relative isolate overflow-hidden rounded-3xl border"
        >
          <div
            className="avs-pattern-kente-royale pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
            aria-hidden
          />
          <div className="grid lg:min-h-[440px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-avs-primary/10 text-avs-primary rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                  {pattern.type}
                </span>
                <span className="border-avs-accent/10 text-avs-accent/55 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${pattern.status?.toLowerCase() === 'published' ? 'bg-emerald-500' : 'bg-avs-kente'}`}
                  />
                  {pattern.status?.toLowerCase() === 'published' ? 'Publié' : 'En préparation'}
                </span>
              </div>

              <h1 className="font-display text-avs-accent mt-5 text-4xl leading-[1.02] font-black tracking-tight sm:text-5xl lg:text-6xl">
                {pattern.name || pattern.localName}
              </h1>
              {pattern.localName && pattern.localName !== pattern.name && (
                <p className="text-avs-primary mt-2 text-lg font-medium">{pattern.localName}</p>
              )}
              <p className="text-avs-accent/65 mt-5 max-w-xl text-sm leading-7 sm:text-base">
                {pattern.summary ||
                  'Une pièce de patrimoine visuel documentée dans l’encyclopédie.'}
              </p>

              <div className="text-avs-accent/50 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 size={14} className="text-avs-primary" />
                  {pattern.origin?.country || 'Origine à documenter'}
                </span>
                {pattern.origin?.people && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-avs-primary" /> {pattern.origin.people}
                  </span>
                )}
                {pattern.era && (
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={14} className="text-avs-primary" /> {pattern.era}
                  </span>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleDownload()}
                  disabled={pattern.status?.toLowerCase() !== 'published' || isDownloading}
                  title={
                    pattern.status?.toLowerCase() !== 'published'
                      ? 'Le téléchargement sera disponible après publication.'
                      : undefined
                  }
                  className="bg-avs-primary text-avs-secondary shadow-avs-md hover:shadow-avs-lg inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                >
                  <Download size={15} /> {isDownloading ? 'Préparation…' : 'Télécharger le motif'}
                </button>
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  className="border-avs-accent/12 bg-avs-secondary/70 text-avs-accent/70 hover:border-avs-primary/30 hover:text-avs-primary inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition"
                >
                  <Share2 size={15} /> Partager
                </button>
              </div>
            </div>

            <div className="bg-avs-accent/5 relative min-h-[260px] overflow-hidden sm:min-h-[360px] lg:min-h-full">
              <div className={`${patCss} absolute inset-0 opacity-[0.14]`} aria-hidden />
              <div
                className="from-avs-primary/5 to-avs-kente/10 absolute inset-0 bg-gradient-to-br via-transparent"
                aria-hidden
              />
              <div className="border-avs-accent/8 bg-avs-secondary/80 absolute inset-4 flex items-center justify-center overflow-hidden rounded-2xl border p-5 sm:inset-7 sm:p-8">
                {patternImage ? (
                  <img
                    src={patternImage}
                    alt={pattern.name}
                    className="h-full max-h-[360px] w-full object-contain"
                  />
                ) : (
                  <div
                    className={`${patCss} h-full min-h-[220px] w-full rounded-lg`}
                    aria-label={`${pattern.name} pattern preview`}
                  />
                )}
              </div>
              <div className="bg-avs-secondary/90 text-avs-accent/60 absolute bottom-8 left-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold shadow-sm backdrop-blur">
                <BadgeCheck size={13} className="text-avs-primary" /> Archive documentée
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard value={formatNumber(pattern.views || 0)} label="Vues" icon={MapPin} />
          <StatCard
            value={formatNumber(pattern.downloads || 0)}
            label="Téléchargements"
            icon={Download}
          />
          <StatCard value={pattern.type || 'N/A'} label="Famille visuelle" icon={Palette} />
          <StatCard value={pattern.era || 'Non précisée'} label="Période" icon={BookOpen} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-start lg:gap-12">
          <SectionNav available={available} activeSection={activeSection} />

          <div className="w-full min-w-0 space-y-10 pb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <PatternAdminActions pattern={pattern as any} />
            </motion.div>

            {/* ══ CONTENU ═══════════════════════════════════════════════════ */}
            <div className="space-y-8">
              {pattern.history && (
                <Panel id="histoire" featured>
                  <PanelHeader
                    title="Histoire & Origines"
                    subtitle="L'évolution de ce motif à travers le temps"
                  />
                  <div className="p-6 md:p-12">
                    <p className="text-avs-accent/80 text-base leading-relaxed font-light md:text-lg">
                      {pattern.history}
                    </p>
                  </div>
                </Panel>
              )}

              <div className="grid gap-4 lg:grid-cols-2">
                {pattern.technique && (
                  <Panel id="technique">
                    <PanelHeader title="Technique" subtitle="Méthodes de fabrication" />
                    <div className="p-6 md:p-8">
                      <p className="text-avs-accent/70 text-sm leading-relaxed font-light">
                        {pattern.technique}
                      </p>
                    </div>
                  </Panel>
                )}

                {pattern.symbolism && (
                  <Panel id="symbolisme">
                    <PanelHeader title="Symbolisme" subtitle="Significations culturelles" />
                    <div className="p-6 md:p-8">
                      <p className="text-avs-accent/70 mb-6 text-sm leading-relaxed font-light">
                        {pattern.symbolism?.meaning}
                      </p>
                      {pattern.symbolism?.keywords && (
                        <div className="flex flex-wrap gap-2">
                          {pattern.symbolism.keywords.map((k: string) => (
                            <span
                              key={k}
                              className="bg-avs-primary/8 text-avs-primary rounded-lg px-2 py-0.5 font-mono text-[8px] font-semibold"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Panel>
                )}
              </div>

              {pattern.ceremonial && (
                <Panel id="ceremoniel">
                  <PanelHeader title="Usage Cérémoniel" subtitle="Contextes traditionnels" />
                  <div className="p-6 md:p-12">
                    <p className="text-avs-accent/80 text-base leading-relaxed font-light">
                      {pattern.ceremonial}
                    </p>
                  </div>
                </Panel>
              )}
            </div>

            {/* ══ COULEURS ═════════════════════════════════════════════════ */}
            {pattern.colors && pattern.colors.length > 0 && (
              <Panel id="couleurs">
                <PanelHeader
                  title="Palette Chromatique"
                  subtitle={`${pattern.colors.length} teintes authentiques composant le motif`}
                />
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                    {pattern.colors.map((color: any, index: number) => (
                      <motion.div
                        key={color?.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: Math.min(index * 0.06, 0.4),
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group flex flex-col items-center text-center"
                      >
                        <div
                          className="mb-3 aspect-square w-full max-w-16 rounded-full border border-black/5 shadow-sm transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: color?.hex }}
                        />
                        <p className="text-avs-accent text-sm font-medium">{color?.name}</p>
                        <p className="text-avs-accent/40 mt-0.5 font-mono text-[10px] tracking-widest">
                          {color?.hex}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Panel>
            )}

            {/* ══ SYMBOLES ═════════════════════════════════════════════════ */}
            {pattern.symbols && pattern.symbols.length > 0 && (
              <Panel id="symboles">
                <PanelHeader title="Lexique des Symboles" subtitle="Éléments iconographiques" />
                <div className="p-6 md:p-8">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pattern.symbols.map((symbol: any) => (
                      <motion.div
                        key={symbol?.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="group border-avs-accent/9 hover:border-avs-primary/20 flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:translate-x-0.5"
                      >
                        {symbol?.imageUrl && (
                          <img
                            src={symbol.imageUrl}
                            alt={symbol.name}
                            className="h-11 w-11 shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="min-w-0">
                          <h3
                            className="font-display text-avs-accent text-sm leading-tight font-bold"
                            style={{ letterSpacing: '-0.01em' }}
                          >
                            {symbol?.name}
                          </h3>
                          {symbol?.meaning && (
                            <p className="text-avs-accent/35 mt-1.5 line-clamp-2 text-xs leading-relaxed font-light">
                              {symbol.meaning}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Panel>
            )}

            {/* ══ CITATION ARTISAN ═══════════════════════════════════════ */}
            {pattern.artisanQuote && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="avs-pattern-kente-royale relative overflow-hidden rounded-2xl"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(10,8,6,0.96) 0%, rgba(26,18,8,0.89) 100%)',
                  }}
                  aria-hidden
                />
                <div className="relative px-8 py-10 text-center">
                  <Quote className="text-avs-primary/30 mx-auto mb-6" size={36} strokeWidth={1} />
                  <p
                    className="font-display text-avs-secondary mx-auto max-w-2xl leading-relaxed font-light italic"
                    style={{ fontSize: 'clamp(1.25rem,3vw,1.75rem)' }}
                  >
                    «&nbsp;{pattern.artisanQuote.text}&nbsp;»
                  </p>
                  <div className="mt-8 flex flex-col items-center">
                    <p className="text-avs-secondary text-sm font-medium tracking-wide uppercase">
                      {pattern.artisanQuote.author}
                    </p>
                    <p className="text-avs-secondary/52 mt-1 text-xs font-light">
                      {pattern.artisanQuote.role}, {pattern.artisanQuote.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══ SOURCES ═════════════════════════════════════════════════ */}
            {pattern.sources && pattern.sources.length > 0 && (
              <Panel id="sources">
                <PanelHeader title="Références" subtitle="Documentation et bibliographie" />
                <div className="p-6 md:p-8">
                  <ul className="space-y-2">
                    {pattern.sources.map((source, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: Math.min(idx * 0.035, 0.25),
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-avs-accent/35 hover:text-avs-primary flex items-center gap-3 text-sm font-light transition-colors"
                        >
                          <Link2 size={14} className="shrink-0 opacity-50" />
                          <span className="truncate">{source}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Panel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
