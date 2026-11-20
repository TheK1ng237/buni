'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Route } from 'next';
import { ArrowUpRight, BookOpen, Check, ChevronRight, Copy, Search, X } from 'lucide-react';
import { useTranslations } from '@/i18n';
import { useSymbols } from '../hooks/useSymbols';
import { LOCAL_SYMBOLS } from '../data/symbol.mapper';
import type { SymbolEntry } from '../types/symbol.types';
import { AVS_COLORS } from '@/core/constants/avs';

const TYPES = [
  'ALL',
  'ADINKRA',
  'BOGOLAN',
  'KENTE',
  'KUBA',
  'NDEBELE',
  'NDOP',
  'WAX',
  'BERBER',
  'UNIVERSAL',
];

function SymbolArtwork({
  name,
  imageUrl,
  cssPreview,
}: {
  name: string;
  imageUrl?: string;
  cssPreview?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initial = name.trim().charAt(0).toLocaleUpperCase() || '?';

  return imageUrl && !imageFailed ? (
    <img
      src={imageUrl}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setImageFailed(true)}
      className="absolute inset-0 h-full w-full object-contain"
    />
  ) : (
    <span
      aria-label={name}
      className="text-avs-secondary absolute inset-0 flex items-center justify-center text-5xl font-black"
      style={{ backgroundColor: cssPreview || AVS_COLORS.primary }}
    >
      {initial}
    </span>
  );
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

export function SymbolsEncyclopedia() {
  const t = useTranslations('symbols');
  const {
    data: symbols = LOCAL_SYMBOLS,
    isFetching,
    error: symbolError,
  } = useSymbols(LOCAL_SYMBOLS);
  const publishedSymbols = useMemo(
    () => symbols.filter((symbol) => symbol.status === 'PUBLISHED'),
    [symbols]
  );
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('ALL');
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');

  const closeSymbol = useCallback(() => {
    setSelectedSymbol(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('symbol');
    window.history.replaceState(null, '', url);
  }, []);

  useEffect(() => {
    const symbolId = new URLSearchParams(window.location.search).get('symbol');
    if (symbolId) {
      setSelectedSymbol(publishedSymbols.find((symbol) => symbol.id === symbolId) ?? null);
    }
  }, [publishedSymbols]);

  useEffect(() => {
    if (!selectedSymbol) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSymbol();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeSymbol, selectedSymbol]);

  const filteredSymbols = useMemo(() => {
    const query = normalize(search.trim());
    return publishedSymbols.filter((symbol) => {
      const matchesSearch =
        !query ||
        normalize(
          [
            symbol.name,
            symbol.nameFr,
            symbol.meaning,
            symbol.usage,
            symbol.pattern.name,
            symbol.pattern.people,
            symbol.pattern.country,
          ].join(' ')
        ).includes(query);
      const matchesType = activeType === 'ALL' || symbol.pattern.type.toUpperCase() === activeType;
      return matchesSearch && matchesType;
    });
  }, [activeType, search, publishedSymbols]);

  const cultureCount = new Set(
    publishedSymbols.map((symbol) => `${symbol.pattern.people}:${symbol.pattern.country}`)
  ).size;

  async function copySymbolLink() {
    if (!selectedSymbol) return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('symbol', selectedSymbol.id);
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setCopyError('');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(t('copyError'));
    }
  }

  function selectSymbol(symbol: SymbolEntry) {
    setSelectedSymbol(symbol);
    const url = new URL(window.location.href);
    url.searchParams.set('symbol', symbol.id);
    window.history.replaceState(null, '', url);
  }

  return (
    <main className="bg-avs-secondary text-avs-accent min-h-screen pb-16">
      <section className="bg-avs-accent text-avs-secondary relative isolate overflow-hidden">
        <div
          className="avs-pattern-adinkra-sankofa pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          aria-hidden
        />
        <div className="bg-avs-primary/25 pointer-events-none absolute -top-32 right-[-8%] -z-10 h-96 w-96 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pt-12 pb-10 sm:px-8 sm:pt-16 sm:pb-14">
          
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="font-display max-w-3xl text-4xl leading-[1.04] font-black tracking-tight sm:text-6xl">
                {t('header.title')}
              </h1>
              <p className="text-avs-secondary/65 mt-5 max-w-2xl text-sm leading-7 sm:text-base">
                {t('header.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border-avs-secondary/10 bg-avs-secondary/5 rounded-2xl border p-4 sm:p-5">
                <p className="font-display text-avs-kente text-3xl font-black">{publishedSymbols.length}</p>
                <p className="text-avs-secondary/55 mt-1 text-[11px]">{t('stats.symbols')}</p>
              </div>
              <div className="border-avs-secondary/10 bg-avs-secondary/5 rounded-2xl border p-4 sm:p-5">
                <p className="font-display text-avs-kente text-3xl font-black">{cultureCount}</p>
                <p className="text-avs-secondary/55 mt-1 text-[11px]">{t('stats.cultures')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="border-avs-accent/8 bg-avs-secondary shadow-avs rounded-2xl border p-3 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{t('search.label')}</span>
              <Search
                size={16}
                className="text-avs-accent/35 absolute top-1/2 left-3.5 -translate-y-1/2"
                aria-hidden
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('search.placeholder')}
                className="avs-input bg-avs-accent/3 focus:border-avs-primary/35 h-12 border-transparent pr-10 pl-10 text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label={t('search.clear')}
                  className="text-avs-accent/45 hover:text-avs-accent absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1"
                >
                  <X size={14} aria-hidden />
                </button>
              )}
            </label>
            <p className="text-avs-accent/40 px-1 font-mono text-[10px] font-bold tracking-[0.12em] uppercase lg:px-3">
              {t('filters.label')}
            </p>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
                className={`shrink-0 rounded-full px-4 py-2 font-mono text-[9px] font-bold tracking-[0.12em] uppercase transition ${
                  activeType === type
                    ? 'bg-avs-primary text-avs-secondary shadow-avs'
                    : 'bg-avs-accent/3 text-avs-accent/55 hover:bg-avs-accent/8 hover:text-avs-accent'
                }`}
              >
                {t(`types.${type}` as 'types.ALL')}
              </button>
            ))}
          </div>
        </div>

        {symbolError && (
          <p
            role="status"
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"
          >
            {symbolError instanceof Error ? symbolError.message : t('loadError')}{' '}
            {publishedSymbols.length > 0 && t('loadErrorFallback')}
          </p>
        )}

        <div className="mt-8 mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-black sm:text-2xl">{t('catalog.title')}</h2>
            <p className="text-avs-accent/45 mt-1 text-xs">
              {t('catalog.count', { count: filteredSymbols.length })}
            </p>
          </div>
          {isFetching && (
            <span className="text-avs-primary animate-pulse font-mono text-[9px] font-bold tracking-wider uppercase">
              {t('catalog.updating')}
            </span>
          )}
        </div>

        {filteredSymbols.length === 0 ? (
          <div className="border-avs-accent/15 bg-avs-secondary rounded-3xl border border-dashed px-6 py-16 text-center">
            <Search size={25} className="text-avs-primary/55 mx-auto mb-3" aria-hidden />
            <h3 className="font-display text-lg font-bold">{t('catalog.emptyTitle')}</h3>
            <p className="text-avs-accent/50 mt-2 text-sm">{t('catalog.emptyDescription')}</p>
            {(search || activeType !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveType('ALL');
                }}
                className="bg-avs-primary text-avs-secondary mt-5 rounded-xl px-4 py-2.5 text-xs font-bold"
              >
                {t('search.reset')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSymbols.map((symbol) => (
              <button
                key={symbol.id}
                type="button"
                onClick={() => selectSymbol(symbol)}
                className="group border-avs-accent/8 bg-avs-secondary shadow-avs hover:border-avs-primary/25 hover:shadow-avs-md focus-visible:outline-avs-primary relative isolate grid h-[420px] grid-rows-[3fr_1fr] overflow-hidden rounded-2xl border text-left transition duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div className="relative min-h-0 overflow-hidden">
                  <SymbolArtwork
                    name={symbol.name}
                    imageUrl={symbol.imageUrl}
                    cssPreview={symbol.cssPreview}
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-avs-accent/50 text-avs-secondary rounded-full px-2.5 py-1 font-mono text-[8px] font-bold tracking-[0.13em] uppercase backdrop-blur">
                      {t(`types.${symbol.pattern.type.toUpperCase()}` as 'types.ALL')}
                    </span>
                  </div>
                  {symbol.sacred && (
                    <span className="bg-avs-accent/75 text-avs-secondary absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-semibold backdrop-blur">
                      {t('detail.restricted')}
                    </span>
                  )}
                </div>
                <div className="relative isolate flex min-h-0 flex-col justify-between overflow-hidden p-3 sm:p-4">
                  <div
                    className={`${symbol.pattern.previewClass} pointer-events-none absolute inset-0 z-0 opacity-[0.12]`}
                    aria-hidden
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-avs-accent truncate text-lg font-bold">
                        {symbol.name}
                      </h3>
                      <p className="text-avs-accent/45 mt-0.5 truncate text-xs italic">
                        {symbol.nameFr}
                      </p>
                    </div>
                    <span className="bg-avs-accent/[0.04] text-avs-accent/35 group-hover:bg-avs-primary/10 group-hover:text-avs-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition">
                      <ChevronRight size={15} aria-hidden />
                    </span>
                  </div>
                  <p className="text-avs-accent/65 relative z-10 line-clamp-1 text-xs leading-5">
                    {symbol.meaning}
                  </p>
                  <div className="border-avs-accent/6 relative z-10 mt-0 flex items-center justify-between gap-3 border-t pt-2">
                    <span className="text-avs-accent/45 truncate text-[10px] font-semibold">
                      {symbol.pattern.flag} {symbol.pattern.name}
                    </span>
                    <span className="text-avs-accent/35 shrink-0 text-[10px]">
                      {symbol.pattern.country}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedSymbol && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <button
            type="button"
            className="bg-avs-accent/65 absolute inset-0 cursor-default backdrop-blur-sm"
            aria-label={t('detail.close')}
            onClick={closeSymbol}
          />
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="symbol-detail-title"
            className="bg-avs-secondary shadow-avs-lg relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl"
          >
            <div
              className={`${selectedSymbol.pattern.previewClass} relative h-36 shrink-0 sm:h-48`}
            >
              <SymbolArtwork
                name={selectedSymbol.name}
                imageUrl={selectedSymbol.imageUrl}
                cssPreview={selectedSymbol.cssPreview}
              />
              <div className="from-avs-accent/55 via-avs-accent/10 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute right-4 bottom-4 left-5 flex items-end justify-between gap-4 sm:right-6 sm:bottom-5 sm:left-7">
                <div className="flex items-center gap-3">
                  <span
                    className="border-avs-secondary/70 text-avs-secondary shadow-avs-md flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl font-black"
                    style={{ backgroundColor: selectedSymbol.cssPreview || AVS_COLORS.accent }}
                  >
                    {selectedSymbol.name.slice(0, 1)}
                  </span>
                  <span className="bg-avs-accent/50 text-avs-secondary rounded-full px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.12em] uppercase backdrop-blur">
                    {t(`types.${selectedSymbol.pattern.type.toUpperCase()}` as 'types.ALL')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeSymbol}
                  aria-label={t('detail.close')}
                  className="bg-avs-accent/50 text-avs-secondary hover:bg-avs-accent/70 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition"
                >
                  <X size={17} aria-hidden />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
              <div className="text-avs-accent/45 flex flex-wrap items-center gap-2 text-[10px] font-semibold">
                <span>
                  {selectedSymbol.pattern.flag} {selectedSymbol.pattern.country}
                </span>
                {selectedSymbol.pattern.people && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{selectedSymbol.pattern.people}</span>
                  </>
                )}
                {selectedSymbol.sacred && (
                  <span className="bg-avs-primary/10 text-avs-primary rounded-full px-2.5 py-1">
                    {t('detail.restricted')}
                  </span>
                )}
              </div>
              <h2
                id="symbol-detail-title"
                className="font-display mt-3 text-3xl font-black sm:text-4xl"
              >
                {selectedSymbol.name}
              </h2>
              <p className="text-avs-accent/45 mt-1 text-sm italic">{selectedSymbol.nameFr}</p>

              <section className="border-avs-accent/8 bg-avs-secondary mt-6 rounded-2xl border p-4 sm:p-5">
                <h3 className="text-avs-primary font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
                  {t('detail.meaning')}
                </h3>
                <p className="text-avs-accent/75 mt-2 text-sm leading-7">
                  {selectedSymbol.meaning}
                </p>
              </section>
              <section className="mt-4 px-1">
                <h3 className="text-avs-accent/40 font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
                  {t('detail.context')}
                </h3>
                <p className="text-avs-accent/65 mt-2 text-sm leading-7">{selectedSymbol.usage}</p>
              </section>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href={
                    `/patterns?pattern=${encodeURIComponent(selectedSymbol.pattern.id)}` as Route
                  }
                  className="group border-avs-accent/10 bg-avs-secondary hover:border-avs-primary/30 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition"
                >
                  <span className="min-w-0">
                    <span className="text-avs-accent/35 block font-mono text-[8px] font-bold tracking-wider uppercase">
                      {t('detail.parentPattern')}
                    </span>
                    <span className="text-avs-accent mt-1 block truncate text-sm font-bold">
                      {selectedSymbol.pattern.name}
                    </span>
                  </span>
                  <ArrowUpRight size={16} className="text-avs-primary shrink-0" aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={() => void copySymbolLink()}
                  className="border-avs-accent/10 text-avs-accent/65 hover:border-avs-primary/30 hover:text-avs-primary flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? t('detail.copied') : t('detail.share')}
                </button>
              </div>
              {copyError && (
                <p role="status" className="mt-2 text-right text-xs text-red-700">
                  {copyError}
                </p>
              )}

              {selectedSymbol.pattern.sources.length > 0 && (
                <section className="border-avs-accent/8 mt-6 border-t pt-5">
                  <h3 className="text-avs-accent/40 font-mono text-[9px] font-bold tracking-[0.14em] uppercase">
                    {t('detail.sources')}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {selectedSymbol.pattern.sources.map((source) => (
                      <li key={source} className="text-avs-accent/55 flex gap-2 text-xs leading-5">
                        <span className="text-avs-primary mt-0.5" aria-hidden>
                          •
                        </span>
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
