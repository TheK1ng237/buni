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

const FAMILY_BADGES: Record<string, { badge: string; label: string }> = {
  'objets-artisanat': {
    badge: 'bg-[#C0573E]/10 text-[#C0573E] border-[#C0573E]/20',
    label: 'Artisanat',
  },
  'vie-quotidienne': {
    badge: 'bg-[#D4A017]/15 text-[#9C750D] border-[#D4A017]/30',
    label: 'Quotidien',
  },
  'tech-locale': {
    badge: 'bg-[#2A4A6B]/15 text-[#2A4A6B] border-[#2A4A6B]/30',
    label: 'Tech Locale',
  },
  symboles: {
    badge: 'bg-[#4A6741]/15 text-[#4A6741] border-[#4A6741]/30',
    label: 'Adinkra',
  },
};

export function IconCard({
  icon,
  locale,
  size = 28,
  strokeWidth = 1.75,
}: IconCardProps) {
  const { add } = useToast();
  const [copied, setCopied] = React.useState(false);
  const pattern = getIconPattern(icon.slug);

  const familyConfig = FAMILY_BADGES[icon.family] ?? {
    badge: 'bg-avs-accent/10 text-avs-accent border-avs-accent/20',
    label: icon.family,
  };

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
    <div className="avs-card group relative flex flex-col justify-between overflow-hidden p-3.5 hover:border-avs-primary/50 hover:shadow-avs-md transition-all duration-200">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${familyConfig.badge}`}
        >
          {familyConfig.label}
        </span>
        <span className="font-mono text-[9px] font-semibold text-avs-accent/60 bg-avs-accent/5 px-1.5 py-0.5 rounded">
          {icon.countryCode ?? 'AF'}
        </span>
      </div>

      <Link
        href={`/${locale}/icons/${icon.slug}` as any}
        className="relative flex flex-col items-center justify-center my-1 rounded-avs overflow-hidden border border-avs-accent/8 bg-avs-secondary/40 py-6 transition-all group-hover:border-avs-primary/30"
      >
        <div
          className={`absolute inset-0 ${pattern.cssClass} opacity-[0.05] group-hover:opacity-[0.14] transition-opacity`}
          aria-hidden="true"
        />
        <div className="relative z-10 text-avs-accent group-hover:text-avs-primary group-hover:scale-110 transition-all duration-200">
          <BuniIcon
            name={icon.slug}
            size={size}
            strokeWidth={strokeWidth}
          />
        </div>
        <span className="absolute bottom-1 right-1.5 font-mono text-[8px] uppercase tracking-wider text-avs-accent/40 group-hover:text-avs-accent/70 transition-colors">
          {pattern.name}
        </span>
      </Link>

      <div className="pt-2 border-t border-avs-accent/8 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <Link
            href={`/${locale}/icons/${icon.slug}` as any}
            className="block text-xs font-bold text-avs-accent hover:text-avs-primary truncate transition-colors"
          >
            {locale === 'en' ? icon.nameEn : icon.nameFr}
          </Link>
          <span className="block font-mono text-[9px] text-avs-accent/50 truncate">
            {icon.people}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={copySvg}
            title="Copier le SVG"
            className="p-1.5 rounded-avs border border-avs-accent/15 text-avs-accent/70 hover:border-avs-primary hover:text-avs-primary hover:bg-avs-primary/10 transition-colors"
            aria-label={`Copier SVG de ${icon.nameFr}`}
          >
            {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
          </button>

          <Link
            href={`/${locale}/icons/${icon.slug}` as any}
            title="Fiche culturelle"
            className="p-1.5 rounded-avs border border-avs-accent/15 text-avs-accent/70 hover:border-avs-primary hover:text-avs-primary hover:bg-avs-primary/10 transition-colors"
            aria-label={`Fiche de ${icon.nameFr}`}
          >
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
