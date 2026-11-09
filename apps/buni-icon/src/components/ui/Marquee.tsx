'use client';

import * as React from 'react';
import { ICONS_CATALOG } from '@buni/icons-data';
import { BuniIcon } from '@buni/icon-react';
import Link from 'next/link';

export function Marquee({ locale }: { locale: string }) {
  // Dupliquer la liste pour un défilement infini sans coupure
  const items = [...ICONS_CATALOG, ...ICONS_CATALOG];

  return (
    <div
      className="overflow-hidden py-3 bg-avs-primary/5 border-y border-avs-accent/10 select-none"
      aria-hidden="true"
    >
      <div className="animate-avs-marquee gap-8">
        {items.map((icon, idx) => (
          <Link
            key={`${icon.slug}-${idx}`}
            href={`/${locale}/icons/${icon.slug}` as any}
            className="flex items-center gap-3 px-3 py-1 rounded hover:bg-avs-primary/10 transition-colors group cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center text-avs-primary group-hover:scale-110 transition-transform">
              <BuniIcon name={icon.slug} size={18} strokeWidth={1.75} />
            </div>
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-avs-accent/80 group-hover:text-avs-primary transition-colors">
              {icon.nameFr}
            </span>
            <span className="text-[9px] font-mono text-avs-accent/40">
              [{icon.countryCode ?? 'AF'}]
            </span>
            <span className="h-1 w-1 rounded-full bg-avs-primary/30" />
          </Link>
        ))}
      </div>
    </div>
  );
}

