'use client';

import * as React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { useTranslations } from '@/i18n';

interface IconFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedFamily: string;
  onFamilyChange: (family: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  size: number;
  onSizeChange: (size: number) => void;
  strokeWidth: number;
  onStrokeWidthChange: (stroke: number) => void;
  countries: { code: string; label: string }[];
  onReset: () => void;
}

export function IconFilters({
  search,
  onSearchChange,
  selectedFamily,
  onFamilyChange,
  selectedCountry,
  onCountryChange,
  size,
  onSizeChange,
  strokeWidth,
  onStrokeWidthChange,
  countries,
  onReset,
}: IconFiltersProps) {
  const t = useTranslations('catalog');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const families = [
    { key: 'all', label: 'Toutes' },
    { key: 'objets-artisanat', label: 'Artisanat' },
    { key: 'vie-quotidienne', label: 'Vie Quotidienne' },
    { key: 'tech-locale', label: 'Tech Locale' },
    { key: 'symboles', label: 'Symboles Adinkra' },
  ];

  const sizes = [48, 56, 72, 88, 104];
  const strokes = [1.25, 1.75, 2.0, 2.5];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-avs-accent/40"
          />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={t('search')}
            className="w-full pl-10 pr-4 py-2.5 rounded-avs border border-avs-accent/15 bg-avs-secondary text-sm font-sans placeholder:text-avs-accent/40 focus:border-avs-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCountry}
            onChange={e => onCountryChange(e.target.value)}
            className="px-3 py-2.5 rounded-avs border border-avs-accent/15 bg-avs-secondary text-sm focus:border-avs-primary focus:outline-none transition-colors cursor-pointer"
          >
            <option value="all">{t('allCountries')}</option>
            {countries.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>

          {(search || selectedFamily !== 'all' || selectedCountry !== 'all') && (
            <button
              onClick={onReset}
              className="px-3 py-2.5 rounded-avs border border-avs-accent/20 hover:border-avs-primary text-avs-accent/70 hover:text-avs-primary text-sm flex items-center gap-1 transition-colors"
              title={t('reset')}
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">{t('reset')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-t border-avs-accent/8">
        <div className="flex flex-wrap items-center gap-1.5">
          {families.map(f => (
            <button
              key={f.key}
              onClick={() => onFamilyChange(f.key)}
              className={`px-3 py-1.5 rounded-avs text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedFamily === f.key
                  ? 'bg-avs-primary text-avs-secondary shadow-avs'
                  : 'bg-avs-secondary text-avs-accent/70 border border-avs-accent/10 hover:border-avs-accent/30'
              }`}
            >
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-avs-accent/70 bg-avs-accent/5 p-2 rounded-avs border border-avs-accent/10 self-start lg:self-auto">
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-avs-accent/40 mr-1">
              {t('size')} :
            </span>
            {sizes.map(s => (
              <button
                key={s}
                onClick={() => onSizeChange(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  size === s
                    ? 'bg-avs-accent text-avs-secondary'
                    : 'hover:bg-avs-accent/10 text-avs-accent/70'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-avs-accent/15" />

          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-avs-accent/40 mr-1">
              {t('stroke')} :
            </span>
            {strokes.map(st => (
              <button
                key={st}
                onClick={() => onStrokeWidthChange(st)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  strokeWidth === st
                    ? 'bg-avs-accent text-avs-secondary'
                    : 'hover:bg-avs-accent/10 text-avs-accent/70'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
