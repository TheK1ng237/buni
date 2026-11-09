'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from '@/i18n';
import { ICONS_CATALOG } from '@buni/icons-data';
import { IconCard } from '@/components/icons/IconCard';
import { IconFilters } from '@/components/icons/IconFilters';
import { getIconPattern } from '@/lib/pattern-map';
import { Layers } from 'lucide-react';

function CatalogInner() {
  const t = useTranslations('catalog');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get('q') ?? '');
  const [selectedFamily, setSelectedFamily] = React.useState('all');
  const [selectedCountry, setSelectedCountry] = React.useState('all');
  const [size, setSize] = React.useState(28);
  const [strokeWidth, setStrokeWidth] = React.useState(1.75);

  React.useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  const countries = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const icon of ICONS_CATALOG) {
      if (icon.countryCode) {
        map.set(icon.countryCode, icon.country);
      }
    }
    return Array.from(map.entries()).map(([code, label]) => ({ code, label }));
  }, []);

  const familyCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const icon of ICONS_CATALOG) {
      counts[icon.family] = (counts[icon.family] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredIcons = React.useMemo(() => {
    return ICONS_CATALOG.filter(icon => {
      if (selectedFamily !== 'all' && icon.family !== selectedFamily) {
        return false;
      }

      if (selectedCountry !== 'all' && icon.countryCode !== selectedCountry) {
        return false;
      }

      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const pattern = getIconPattern(icon.slug);
        const matchesNameFr = icon.nameFr.toLowerCase().includes(query);
        const matchesNameEn = icon.nameEn.toLowerCase().includes(query);
        const matchesSlug = icon.slug.toLowerCase().includes(query);
        const matchesPeople = icon.people.toLowerCase().includes(query);
        const matchesCountry = icon.country.toLowerCase().includes(query);
        const matchesTags = icon.tags.some(t => t.toLowerCase().includes(query));
        const matchesNote = icon.culturalNote.toLowerCase().includes(query);
        const matchesPattern =
          pattern.name.toLowerCase().includes(query) ||
          pattern.type.toLowerCase().includes(query) ||
          pattern.symbolism.toLowerCase().includes(query);

        return (
          matchesNameFr ||
          matchesNameEn ||
          matchesSlug ||
          matchesPeople ||
          matchesCountry ||
          matchesTags ||
          matchesNote ||
          matchesPattern
        );
      }

      return true;
    });
  }, [search, selectedFamily, selectedCountry]);

  const handleReset = () => {
    setSearch('');
    setSelectedFamily('all');
    setSelectedCountry('all');
  };

  return (
    <div className="avs-container py-10 sm:py-14 space-y-8">
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-avs-primary/10 border border-avs-primary/20 text-avs-primary text-xs font-mono font-bold tracking-wider uppercase">
          <Layers size={13} />
          <span>V1.0 · 30 Icônes Souveraines</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-avs-accent">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-base text-avs-accent/70 leading-relaxed font-sans">
          {t('subtitle')}
        </p>
      </div>

      <IconFilters
        search={search}
        onSearchChange={setSearch}
        selectedFamily={selectedFamily}
        onFamilyChange={setSelectedFamily}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        size={size}
        onSizeChange={setSize}
        strokeWidth={strokeWidth}
        onStrokeWidthChange={setStrokeWidth}
        countries={countries}
        familyCounts={familyCounts}
        totalCount={ICONS_CATALOG.length}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between text-xs font-mono text-avs-accent/60 border-b border-avs-accent/8 pb-2">
        <span>{t('found', { count: filteredIcons.length })}</span>
        <span className="hidden sm:inline">Grille 24×24 · Stroke uniforme</span>
      </div>

      {filteredIcons.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredIcons.map(icon => (
            <IconCard
              key={icon.slug}
              icon={icon}
              locale={locale}
              size={size}
              strokeWidth={strokeWidth}
            />
          ))}
        </div>
      ) : (
        <div className="avs-card p-12 text-center space-y-4">
          <p className="text-sm text-avs-accent/70 font-sans">{t('noResults')}</p>
          <button onClick={handleReset} className="avs-btn-primary !text-xs font-mono">
            {t('reset')}
          </button>
        </div>
      )}
    </div>
  );
}

export function CatalogClient() {
  return (
    <React.Suspense fallback={<div className="avs-container py-20 text-center font-mono text-xs text-avs-accent/60">Chargement du catalogue...</div>}>
      <CatalogInner />
    </React.Suspense>
  );
}
