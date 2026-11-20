'use client';

import * as React from 'react';
import Link from 'next/link';
import { BuniIcon } from '@buni/icon-react';
import type { BuniIconMeta } from '@buni/icons-data';
import { useToast } from '@buni/ui';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { getIconPattern } from '@/lib/pattern-map';

interface IconCardProps {
  icon: BuniIconMeta;
  locale: string;
  size?: number;
  strokeWidth?: number;
}

export function IconCard({
  icon,
  locale,
  size = 72,
  strokeWidth = 1.75,
}: IconCardProps) {
  const { add } = useToast();
  const [copied, setCopied] = React.useState(false);
  const familyLabel = 'Interface';
  const pattern = getIconPattern(icon.slug);

  const copySvg = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(icon.svg);
      setCopied(true);
      add({
        variant: 'success',
        title: 'Copié',
        message: `${icon.nameFr} (SVG) copié dans le presse-papier`,
        duration: 2200,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      //
    }
  };

  return (
    <article className="group relative isolate flex min-h-64 flex-col overflow-hidden border-2 border-avs-accent/25 bg-avs-secondary text-avs-accent shadow-avs transition-all duration-200 hover:border-avs-primary/60 hover:shadow-avs-md">
      <div
        className={`absolute inset-0 ${pattern.cssClass} opacity-[0.16] transition-opacity duration-200 group-hover:opacity-25`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-avs-secondary/95 via-avs-secondary/90 to-avs-secondary/80" />
      <div
        className={`absolute inset-x-0 top-0 h-3 ${pattern.cssClass} opacity-80`}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-3 ${pattern.cssClass} opacity-80`}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-2 border border-dashed border-avs-accent/30" />

      <div className="relative z-10 flex flex-1 flex-col items-center gap-5 px-7 py-8 sm:flex-row sm:gap-7 sm:px-9">
        <Link
          href={`/${locale}/icons/${icon.slug}` as any}
          aria-label={`${locale === 'en' ? 'View' : 'Voir'} ${locale === 'en' ? icon.nameEn : icon.nameFr}`}
          className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-2 border-avs-primary/45 bg-avs-secondary/90 text-avs-primary shadow-avs transition-transform duration-200 group-hover:scale-105"
        >
          <div
            className={`absolute inset-1 rounded-full ${pattern.cssClass} opacity-20`}
            aria-hidden="true"
          />
          <BuniIcon name={icon.slug} size={size} strokeWidth={strokeWidth} />
        </Link>

        <div className="">
        <div className="flex min-w-0 flex-1 flex-col items-center text-center sm:items-start sm:text-left">
          <span className="text-sm text-avs-primary">
            {familyLabel} · {icon.people}
          </span>
          <Link
            href={`/${locale}/icons/${icon.slug}` as any}
            className="mt-1 font-display text-xl font-bold leading-tight text-avs-accent transition-colors group-hover:text-avs-primary sm:text-2xl"
          >
            {locale === 'en' ? icon.nameEn : icon.nameFr}
          </Link>
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-avs-accent/75">
            {icon.culturalNote}
          </p>
          <span className="mt-2 text-sm text-avs-accent/60">{icon.country}</span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={copySvg}
            title={locale === 'en' ? 'Copy SVG' : 'Copier le SVG'}
            className="inline-flex items-center gap-2 border border-avs-accent/30 px-3 py-2 text-xs font-medium text-avs-accent/80 transition-colors hover:border-avs-primary hover:text-avs-primary"
            aria-label={`${locale === 'en' ? 'Copy SVG for' : 'Copier le SVG de'} ${icon.nameFr}`}
          >
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            <span>{locale === 'en' ? 'Copy SVG' : 'Copier le SVG'}</span>
          </button>
          <Link
            href={`/${locale}/icons/${icon.slug}` as any}
            title={locale === 'en' ? 'Icon details' : 'Détails de l’icône'}
            className="inline-flex items-center gap-2 bg-avs-primary px-3 py-2 text-xs font-semibold text-avs-secondary transition-colors hover:bg-avs-primary/90"
            aria-label={`${locale === 'en' ? 'View details for' : 'Voir la fiche de'} ${icon.nameFr}`}
          >
            <span>{locale === 'en' ? 'Details' : 'Détails'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        </div>
      </div>
    </article>
  );
}
