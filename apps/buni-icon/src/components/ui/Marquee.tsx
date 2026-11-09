'use client';

import * as React from 'react';
import { ICONS_CATALOG } from '@buni/icons-data';
import { BuniIcon } from '@buni/icon-react';
import { PATTERN_CATALOG } from '@buni/patterns';
import Link from 'next/link';

export function Marquee({ locale }: { locale: string }) {
  const sampleIcons = ICONS_CATALOG.slice(0, 12);
  const patterns = PATTERN_CATALOG;

  // Création d'une séquence rythmée alternant icône et motif
  const sequence = React.useMemo(() => {
    const list: Array<{ type: 'icon'; data: (typeof sampleIcons)[0] } | { type: 'pattern'; name: string; origin: string }> = [];
    sampleIcons.forEach((icon, i) => {
      list.push({ type: 'icon', data: icon });
      const p = patterns[i % patterns.length];
      if (p) {
        list.push({ type: 'pattern', name: p.name, origin: p.origin });
      }
    });
    return [...list, ...list];
  }, [sampleIcons, patterns]);

  return (
    <div
      className="overflow-hidden py-3 bg-avs-primary/5 border-y border-avs-accent/10 select-none"
      aria-hidden="true"
    >
      <div className="animate-avs-marquee gap-8">
        {sequence.map((item, idx) => {
          if (item.type === 'icon') {
            const icon = item.data;
            return (
              <Link
                key={`icon-${icon.slug}-${idx}`}
                href={`/${locale}/icons/${icon.slug}` as any}
                className="flex items-center gap-2.5 px-2 py-1 rounded hover:bg-avs-primary/10 transition-colors group cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center text-avs-primary group-hover:scale-110 transition-transform">
                  <BuniIcon name={icon.slug} size={16} strokeWidth={1.8} />
                </div>
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-avs-accent/80 group-hover:text-avs-primary transition-colors">
                  {icon.nameFr}
                </span>
                <span className="text-[9px] font-mono text-avs-accent/40">
                  [{icon.countryCode ?? 'AF'}]
                </span>
                <span className="h-1 w-1 rounded-full bg-avs-primary/30" />
              </Link>
            );
          }

          return (
            <div
              key={`pattern-${idx}`}
              className="flex items-center gap-2 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-avs-accent/50"
            >
              <span className="text-avs-kente font-bold">{item.name}</span>
              <span>· {item.origin}</span>
              <span className="h-1 w-1 rounded-full bg-avs-accent/20" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
