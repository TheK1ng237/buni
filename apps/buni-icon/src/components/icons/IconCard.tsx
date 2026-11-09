'use client';

import * as React from 'react';
import Link from 'next/link';
import { BuniIcon } from '@buni/icon-react';
import type { BuniIconMeta } from '@buni/icons-data';
import { useToast } from '@buni/ui';
import { Copy, Check, ArrowRight } from 'lucide-react';

interface IconCardProps {
  icon: BuniIconMeta;
  locale: string;
  size?: number;
  strokeWidth?: number;
}

const familyColors: Record<string, { badge: string; text: string; label: string }> = {
  'objets-artisanat': {
    badge: 'bg-[#C0573E]/10 text-[#C0573E] border-[#C0573E]/20',
    text: 'Artisanat',
    label: 'Artisanat',
  },
  'vie-quotidienne': {
    badge: 'bg-[#D4A017]/15 text-[#9C750D] border-[#D4A017]/30',
    text: 'Quotidien',
    label: 'Vie Quotidienne',
  },
  'tech-locale': {
    badge: 'bg-[#2A4A6B]/15 text-[#2A4A6B] border-[#2A4A6B]/30',
    text: 'Tech Locale',
    label: 'Tech Locale',
  },
  'symboles': {
    badge: 'bg-[#4A6741]/15 text-[#4A6741] border-[#4A6741]/30',
    text: 'Symbole',
    label: 'Symbole Adinkra',
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

  const familyConfig = familyColors[icon.family] ?? {
    badge: 'bg-avs-accent/10 text-avs-accent border-avs-accent/20',
    text: icon.family,
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
        title: 'Copié !',
        message: `SVG de « ${icon.nameFr} » copié dans le presse-papier.`,
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="avs-card group relative flex flex-col justify-between overflow-hidden p-4 hover:border-avs-primary/50 hover:shadow-avs-md transition-all duration-200">
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${familyConfig.badge}`}
        >
          {familyConfig.text}
        </span>
        <span className="font-mono text-[9px] font-semibold text-avs-accent/50 bg-avs-accent/5 px-1.5 py-0.5 rounded">
          {icon.countryCode ?? 'AF'}
        </span>
      </div>

      {/* Main icon preview */}
      <Link
        href={`/${locale}/icons/${icon.slug}` as any}
        className="flex flex-col items-center justify-center py-6 group-hover:scale-105 transition-transform"
      >
        <div className="w-16 h-16 rounded-avs bg-avs-secondary border border-avs-accent/8 flex items-center justify-center text-avs-accent group-hover:text-avs-primary group-hover:border-avs-primary/30 transition-colors">
          <BuniIcon
            name={icon.slug}
            size={size}
            strokeWidth={strokeWidth}
          />
        </div>
      </Link>

      {/* Info & Quick Actions */}
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
            title="Voir la fiche culturelle"
            className="p-1.5 rounded-avs border border-avs-accent/15 text-avs-accent/70 hover:border-avs-primary hover:text-avs-primary hover:bg-avs-primary/10 transition-colors"
            aria-label={`Voir détails de ${icon.nameFr}`}
          >
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

