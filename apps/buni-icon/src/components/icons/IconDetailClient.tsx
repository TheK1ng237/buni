'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/i18n';
import type { BuniIconMeta } from '@buni/icons-data';
import { BuniIcon } from '@buni/icon-react';
import { ExportShadcnTabs } from '@/components/icons/ExportShadcnTabs';
import { IconCard } from '@/components/icons/IconCard';
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  Users,
  Scale,
  Sparkles,
} from 'lucide-react';

const PIGMENTS = [
  { name: 'Terre cuite (Primary)', hex: '#C0573E' },
  { name: 'Or Kente', hex: '#D4A017' },
  { name: 'Vert Ndop', hex: '#4A6741' },
  { name: 'Bleu Bogolan', hex: '#2A4A6B' },
  { name: 'Obsidienne (Accent)', hex: '#1D1D1B' },
];

interface IconDetailClientProps {
  icon: BuniIconMeta;
  relatedIcons: BuniIconMeta[];
  locale: string;
}

export function IconDetailClient({
  icon,
  relatedIcons,
  locale,
}: IconDetailClientProps) {
  const t = useTranslations('detail');

  const [activeColor, setActiveColor] = React.useState('#C0573E');
  const [activeStroke, setActiveStroke] = React.useState(1.75);
  const [previewSize, setPreviewSize] = React.useState(72);

  return (
    <div className="avs-container py-10 sm:py-14 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href={`/${locale}/icons` as any}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-avs-accent/70 hover:text-avs-primary transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{t('back')}</span>
        </Link>
      </div>

      {/* Main Grid: Left Preview & Controls | Right Cultural & Exports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Large Preview & Live Styling Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Card with Big Preview */}
          <div className="avs-card p-8 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-avs-secondary to-avs-accent/5">
            {/* Top info badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full border border-avs-accent/15 text-[9px] font-mono font-bold uppercase tracking-wider bg-avs-secondary">
                {icon.family}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-avs-primary/10 text-avs-primary border border-avs-primary/20 text-[9px] font-mono font-bold">
                {icon.countryCode}
              </span>
            </div>

            {/* Icon Render */}
            <div
              className="my-10 flex items-center justify-center transition-all"
              style={{ color: activeColor }}
            >
              <BuniIcon
                name={icon.slug}
                size={previewSize}
                strokeWidth={activeStroke}
              />
            </div>

            {/* Grid size indicator */}
            <div className="font-mono text-[10px] text-avs-accent/40">
              Grille originale : 24×24 · Rendu : {previewSize}px
            </div>
          </div>

          {/* Interactive Customizer */}
          <div className="avs-card p-5 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-avs-accent/80">
              {t('customize')}
            </h3>

            {/* Pigment Palette */}
            <div>
              <span className="block text-[11px] font-mono text-avs-accent/60 mb-2">
                {t('color')} :
              </span>
              <div className="flex items-center gap-2">
                {PIGMENTS.map(p => (
                  <button
                    key={p.hex}
                    onClick={() => setActiveColor(p.hex)}
                    style={{ backgroundColor: p.hex }}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      activeColor === p.hex
                        ? 'ring-2 ring-offset-2 ring-avs-primary scale-110'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Width Selector */}
            <div>
              <span className="block text-[11px] font-mono text-avs-accent/60 mb-2">
                {t('strokeWidth')} :
              </span>
              <div className="flex items-center gap-2">
                {[1.25, 1.75, 2.0, 2.5].map(st => (
                  <button
                    key={st}
                    onClick={() => setActiveStroke(st)}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-avs border transition-colors ${
                      activeStroke === st
                        ? 'bg-avs-accent text-avs-secondary border-avs-accent shadow-sm'
                        : 'border-avs-accent/20 text-avs-accent/70 hover:border-avs-accent'
                    }`}
                  >
                    {st}px
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Scale */}
            <div>
              <span className="block text-[11px] font-mono text-avs-accent/60 mb-2">
                Taille d’aperçu ({previewSize}px) :
              </span>
              <input
                type="range"
                min="32"
                max="128"
                step="8"
                value={previewSize}
                onChange={e => setPreviewSize(Number(e.target.value))}
                className="w-full accent-avs-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Metadata, Cultural Sheet & Exports (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header titles */}
          <div className="space-y-2 border-b border-avs-accent/10 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-avs-primary uppercase tracking-widest">
                buni:{icon.slug}
              </span>
              <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 border border-green-200 text-[10px] font-mono font-bold">
                Vérifié
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-avs-accent">
              {locale === 'en' ? icon.nameEn : icon.nameFr}
            </h1>

            {/* Sub-meta chips */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-avs-accent/70 pt-1">
              <span className="flex items-center gap-1.5">
                <Globe size={13} className="text-avs-primary" />
                <span>{icon.country} ({icon.countryCode})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-avs-kente" />
                <span>{icon.people}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Scale size={13} className="text-avs-ndop" />
                <span>{icon.license}</span>
              </span>
            </div>
          </div>

          {/* FICHE CULTURELLE & PATRIMONIALE */}
          <div className="avs-card p-6 space-y-4 border-l-4 border-l-avs-primary">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-avs-primary">
              <Sparkles size={15} />
              <span>{t('culturalSheet')}</span>
            </div>

            {/* Signification */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase font-mono text-avs-accent/60">
                {t('meaning')}
              </h4>
              <p className="text-sm text-avs-accent/90 leading-relaxed font-sans">
                {icon.culturalNote}
              </p>
            </div>

            {/* Usage recommandé */}
            {icon.recommendedUse && (
              <div className="space-y-1 pt-2 border-t border-avs-accent/8">
                <h4 className="text-xs font-bold uppercase font-mono text-avs-accent/60">
                  {t('recommendedUse')}
                </h4>
                <p className="text-xs text-avs-accent/80 font-sans">
                  {icon.recommendedUse}
                </p>
              </div>
            )}

            {/* Vérifié par */}
            <div className="pt-2 border-t border-avs-accent/8 flex items-center gap-2 text-xs font-mono text-avs-accent/70">
              <ShieldCheck size={14} className="text-avs-ndop shrink-0" />
              <span>
                <strong>{t('verifiedBy')} :</strong> {icon.verifiedBy}
              </span>
            </div>
          </div>

          {/* EXPORTS SHADCN TABS */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-avs-accent/80">
              Exports & Copier-Coller Instantané
            </h3>
            <ExportShadcnTabs
              icon={icon}
              colorHex={activeColor}
              strokeWidth={activeStroke}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-[10px] font-mono uppercase text-avs-accent/50 mr-1">
              Tags :
            </span>
            {icon.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-avs-accent/5 text-avs-accent/70 border border-avs-accent/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RELATED ICONS SECTION */}
      {relatedIcons.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-avs-accent/10">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-avs-accent">
              Autres icônes de la famille « {icon.family} »
            </h3>
            <Link
              href={`/${locale}/icons` as any}
              className="text-xs font-mono font-bold text-avs-primary hover:underline"
            >
              Voir tout
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedIcons.map(related => (
              <IconCard
                key={related.slug}
                icon={related}
                locale={locale}
                size={28}
                strokeWidth={1.75}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

