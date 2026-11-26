'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from '@/i18n';
import { ICONS_CATALOG } from '@buni-design/icons-data';
import { IconCard } from '@/components/icons/IconCard';
import { IconFilters } from '@/components/icons/IconFilters';

function CatalogInner() {
  const t = useTranslations('catalog');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get('q') ?? '');
  const [size, setSize] = React.useState(72);
  const [strokeWidth, setStrokeWidth] = React.useState(1.75);

  React.useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  const filteredIcons = React.useMemo(() => {
    return ICONS_CATALOG.filter(icon => {
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchesNameFr = icon.nameFr.toLowerCase().includes(query);
        const matchesNameEn = icon.nameEn.toLowerCase().includes(query);
        const matchesSlug = icon.slug.toLowerCase().includes(query);
        const matchesPeople = icon.people.toLowerCase().includes(query);
        const matchesCountry = icon.country.toLowerCase().includes(query);
        const matchesTags = icon.tags.some(t => t.toLowerCase().includes(query));
        const matchesNote = icon.culturalNote.toLowerCase().includes(query);

        return (
          matchesNameFr ||
          matchesNameEn ||
          matchesSlug ||
          matchesPeople ||
          matchesCountry ||
          matchesTags ||
          matchesNote
        );
      }

      return true;
    });
  }, [search]);

  const handleReset = () => {
    setSearch('');
  };

  return (
    <div className="avs-container py-10 sm:py-14 space-y-8">
      <div className="space-y-3 max-w-3xl">
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
        size={size}
        onSizeChange={setSize}
        strokeWidth={strokeWidth}
        onStrokeWidthChange={setStrokeWidth}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between text-sm text-avs-accent/60 border-b border-avs-accent/8 pb-2">
        <span>{t('found', { count: filteredIcons.length })}</span>
      </div>

      {filteredIcons.length > 0 ? (
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
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
