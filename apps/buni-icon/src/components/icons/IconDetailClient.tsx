'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/i18n';
import type { BuniIconMeta } from '@buni-design/icons-data';
import { BuniIcon } from '@buni/icon-react';
import { ExportShadcnTabs } from '@/components/icons/ExportShadcnTabs';
import { IconCard } from '@/components/icons/IconCard';
import { getIconPattern } from '@/lib/pattern-map';
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  Users,
  Scale,
} from 'lucide-react';

const PIGMENTS = [
  { name: 'Terre cuite', hex: '#C0573E' },
  { name: 'Or Kente', hex: '#D4A017' },
  { name: 'Vert Ndop', hex: '#4A6741' },
  { name: 'Bleu Bogolan', hex: '#2A4A6B' },
  { name: 'Obsidienne', hex: '#1D1D1B' },
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
  const pattern = getIconPattern(icon.slug);

  const [activeColor, setActiveColor] = React.useState('#C0573E');
  const [activeStroke, setActiveStroke] = React.useState(1.75);
  const [previewSize, setPreviewSize] = React.useState(72);
  const [patternBackdrop, setPatternBackdrop] = React.useState<'none' | 'subtle' | 'vibrant'>('subtle');

  return (
    <div className="avs-container py-10 sm:py-14 space-y-12">
      <div>
        <Link
          href={`/${locale}/icons` as any}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-avs-accent/70 hover:text-avs-primary transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{t('back')}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="avs-card p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[340px] border border-avs-accent/15">
            {patternBackdrop !== 'none' && (
              <div
                className={`absolute inset-0 ${pattern.cssClass} transition-opacity duration-300 ${
                  patternBackdrop === 'vibrant' ? 'opacity-35' : 'opacity-10'
                }`}
                aria-hidden="true"
              />
            )}
            <div
              className="relative z-10 my-10 flex items-center justify-center transition-all"
              style={{ color: activeColor }}
            >
              <BuniIcon
                name={icon.slug}
                size={previewSize}
                strokeWidth={activeStroke}
              />
            </div>

            <div className="relative z-10 text-xs text-avs-accent/60">
              Core 30 · 24×24 · {previewSize}px
            </div>
          </div>

          <div className="avs-card p-5 space-y-4">
            <h3 className="font-display text-lg font-semibold text-avs-accent">
              {t('customize')}
            </h3>
            <div>
              <span className="block text-sm text-avs-accent/65 mb-2">
                {locale === 'en' ? `Textile motif (${pattern.name})` : `Motif textile (${pattern.name})`} :
              </span>
              <div className="grid grid-cols-3 gap-2">
                {([
                  ['none', locale === 'en' ? 'None' : 'Neutre'],
                  ['subtle', locale === 'en' ? 'Subtle' : 'Filigrane'],
                  ['vibrant', locale === 'en' ? 'Vibrant' : 'Texturé'],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPatternBackdrop(value)}
                    className={`px-2.5 py-1.5 text-sm rounded-avs border transition-colors ${
                      patternBackdrop === value
                        ? 'bg-avs-accent text-avs-secondary border-avs-accent'
                        : 'border-avs-accent/20 text-avs-accent/70 hover:border-avs-accent'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-sm text-avs-accent/65 mb-2">
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
            <div>
              <span className="block text-sm text-avs-accent/65 mb-2">
                {t('strokeWidth')} :
              </span>
              <div className="flex items-center gap-2">
                {[1.25, 1.75, 2.0, 2.5].map(st => (
                  <button
                    key={st}
                    onClick={() => setActiveStroke(st)}
                    className={`px-3 py-1 text-sm rounded-avs border transition-colors ${
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

            <div>
              <span className="block text-sm text-avs-accent/65 mb-2">
                Échelle ({previewSize}px) :
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

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 border-b border-avs-accent/10 pb-5">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-avs-accent">
              {locale === 'en' ? icon.nameEn : icon.nameFr}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-avs-accent/70 pt-1">
              <span className="flex items-center gap-1.5">
                <Globe size={13} className="text-avs-primary" />
                <span>{icon.country}</span>
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

          <div className="avs-card p-5 space-y-3 bg-avs-secondary/60 border border-avs-accent/15">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-avs-accent">
                {locale === 'en' ? `Associated motif · ${pattern.name}` : `Motif associé · ${pattern.name}`}
              </div>
              <span className="text-xs text-avs-accent/60">
                {pattern.origin} · {pattern.flag}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-14 rounded-avs border border-avs-accent/20 ${pattern.cssClass} shrink-0 shadow-sm`}
                title={pattern.name}
              />
              <div className="text-xs space-y-1">
                <div className="text-avs-accent/90 font-medium font-sans">
                  {pattern.symbolism}
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-xs text-avs-accent/50">
                    {locale === 'en' ? 'Palette:' : 'Palette :'}
                  </span>
                  {pattern.colors.map(col => (
                    <span
                      key={col}
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: col }}
                      title={col}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="avs-card p-6 space-y-4 border-l-4 border-l-avs-primary">
            <h2 className="font-display text-xl font-semibold text-avs-accent">
              {t('culturalSheet')}
            </h2>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-avs-accent/75">
                {t('meaning')}
              </h4>
              <p className="text-sm text-avs-accent/90 leading-relaxed font-sans">
                {icon.culturalNote}
              </p>
            </div>

            {icon.recommendedUse && (
              <div className="space-y-1 pt-2 border-t border-avs-accent/8">
                <h4 className="text-sm font-semibold text-avs-accent/75">
                  {t('recommendedUse')}
                </h4>
                <p className="text-xs text-avs-accent/80 font-sans">
                  {icon.recommendedUse}
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-avs-accent/8 flex items-center gap-2 text-sm text-avs-accent/70">
              <ShieldCheck size={14} className="text-avs-ndop shrink-0" />
              <span>
                <strong>{t('verifiedBy')} :</strong> {icon.verifiedBy}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-semibold text-avs-accent">
              Exports
            </h3>
            <ExportShadcnTabs
              icon={icon}
              colorHex={activeColor}
              strokeWidth={activeStroke}
            />
          </div>

          <div className="pt-2 text-sm text-avs-accent/60">
            {icon.tags.join(' · ')}
          </div>
        </div>
      </div>

      {relatedIcons.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-avs-accent/10">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-avs-accent">
              {locale === 'en' ? 'More Core 30 icons' : 'Autres icônes Core 30'}
            </h3>
            <Link
              href={`/${locale}/icons` as any}
              className="text-sm font-medium text-avs-primary hover:underline"
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
