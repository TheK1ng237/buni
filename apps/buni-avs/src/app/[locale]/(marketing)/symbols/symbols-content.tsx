'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Route } from 'next';
import { ArrowUpRight, BookOpen, Check, ChevronRight, Copy, Search, X } from 'lucide-react';
import { useTranslations } from '@/i18n';
import { PATTERNS_DOCS } from '../patterns/mock';
import { symbolService, type SymbolRecord } from '@/features/symbols/symbol.types';

interface SymbolEntry {
  id: string;
  name: string;
  nameFr: string;
  meaning: string;
  usage: string;
  sacred: boolean;
  cssPreview?: string;
  imageUrl?: string;
  pattern: {
    id: string;
    slug: string;
    name: string;
    type: string;
    country: string;
    people: string;
    flag: string;
    sources: string[];
    previewClass: string;
  };
}

const TYPES = ['ALL', 'ADINKRA', 'BOGOLAN', 'KENTE', 'KUBA', 'NDEBELE', 'NDOP', 'WAX', 'BERBER'];
const PREVIEW_CLASSES: Record<string, string> = {
  ADINKRA: 'avs-pattern-adinkra-sankofa',
  BOGOLAN: 'avs-pattern-bogolan-fanga',
  KENTE: 'avs-pattern-kente-royale',
  KUBA: 'avs-pattern-kuba-kasai',
  NDEBELE: 'avs-pattern-wax-dakar',
  NDOP: 'avs-pattern-ndop-sultan',
  WAX: 'avs-pattern-wax-dakar',
  BERBER: 'avs-pattern-wax-dakar',
};

function fromApiSymbol(symbol: SymbolRecord): SymbolEntry {
  return {
    id: symbol.id,
    name: symbol.name,
    nameFr: symbol.nameFr,
    meaning: symbol.meaning,
    usage: symbol.usage,
    sacred: symbol.sacred,
    cssPreview: symbol.cssPreview,
    imageUrl: symbol.imageUrl,
    pattern: {
      id: symbol.pattern.id,
      slug: symbol.pattern.slug,
      name: symbol.pattern.name || symbol.pattern.nameLocal,
      type: symbol.pattern.type,
      country: symbol.pattern.origin?.country ?? '',
      people: symbol.pattern.origin?.people ?? '',
      flag: symbol.pattern.origin?.flag ?? '',
      sources: symbol.pattern.sources ?? [],
      previewClass: PREVIEW_CLASSES[symbol.pattern.type] ?? 'avs-pattern-wax-dakar',
    },
  };
}

const localSymbols: SymbolEntry[] = PATTERNS_DOCS.flatMap((pattern) =>
  pattern.symbols.map((symbol, index) => ({
    id: `${pattern.id}-${index}-${symbol.name}`,
    name: symbol.name,
    nameFr: symbol.nameFr,
    meaning: symbol.meaning,
    usage: symbol.usage,
    sacred: symbol.sacred,
    cssPreview: symbol.cssPreview,
    imageUrl: symbol.imageUrl,
    pattern: {
      id: pattern.id,
      slug: pattern.slug,
      name: pattern.name,
      type: pattern.type,
      country: pattern.origin.country,
      people: pattern.origin.people,
      flag: pattern.origin.flag ?? '',
      sources: pattern.sources ?? [],
      previewClass: pattern.previewClass || pattern.cssClass,
    },
  }))
);

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

export function SymbolsContent() {
  const t = useTranslations('symbols');
  const [symbols, setSymbols] = useState<SymbolEntry[]>(localSymbols);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('ALL');
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');

  const loadSymbols = useCallback(async () => {
    setLoading(true);
    try {
      const remoteSymbols = await symbolService.list();
      const merged = new Map<string, SymbolEntry>();

      for (const symbol of localSymbols) {
        merged.set(`${symbol.pattern.slug}:${normalize(symbol.name)}`, symbol);
      }
      for (const symbol of remoteSymbols) {
        const entry = fromApiSymbol(symbol);
        merged.set(`${entry.pattern.slug}:${normalize(entry.name)}`, entry);
      }

      setSymbols(Array.from(merged.values()));
      setLoadError('');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : t('loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadSymbols();
  }, [loadSymbols]);

  useEffect(() => {
    const symbolId = new URLSearchParams(window.location.search).get('symbol');
    if (symbolId) {
      setSelectedSymbol(symbols.find((symbol) => symbol.id === symbolId) ?? null);
    }
  }, [symbols]);

  useEffect(() => {
    if (!selectedSymbol) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedSymbol(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedSymbol]);

  const filteredSymbols = useMemo(() => {
    const query = normalize(search.trim());
    return symbols.filter((symbol) => {
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
  }, [activeType, search, symbols]);

  const cultureCount = new Set(
    symbols.map((symbol) => `${symbol.pattern.people}:${symbol.pattern.country}`)
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

  function closeSymbol() {
    setSelectedSymbol(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('symbol');
    window.history.replaceState(null, '', url);
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] pb-16 text-avs-accent">
      <section className="relative isolate overflow-hidden bg-[#201b18] text-[#f5ebe0]">
        <div
          className="avs-pattern-adinkra-sankofa pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -top-32 right-[-8%] -z-10 h-96 w-96 rounded-full bg-avs-primary/25 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
          <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#e2bd73]">
            <BookOpen size={13} aria-hidden />
            {t('header.label', { count: symbols.length })}
          </div>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="font-display max-w-3xl text-4xl leading-[1.04] font-black tracking-tight sm:text-6xl">
                {t('header.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                {t('header.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                <p className="font-display text-3xl font-black text-[#e2bd73]">{symbols.length}</p>
                <p className="mt-1 text-[11px] text-white/55">{t('stats.symbols')}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                <p className="font-display text-3xl font-black text-[#e2bd73]">{cultureCount}</p>
                <p className="mt-1 text-[11px] text-white/55">{t('stats.cultures')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="rounded-2xl border border-avs-accent/8 bg-white p-3 shadow-[0_8px_28px_rgba(29,29,27,0.04)] sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{t('search.label')}</span>
              <Search
                size={16}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-avs-accent/35"
                aria-hidden
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('search.placeholder')}
                className="avs-input h-12 border-transparent bg-[#f7f4ef] pl-10 pr-10 text-sm focus:border-avs-primary/35"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label={t('search.clear')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-avs-accent/45 hover:text-avs-accent"
                >
                  <X size={14} aria-hidden />
                </button>
              )}
            </label>
            <p className="px-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-avs-accent/40 lg:px-3">
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
                className={`shrink-0 rounded-full px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] transition ${
                  activeType === type
                    ? 'bg-avs-primary text-white shadow-sm'
                    : 'bg-[#f7f4ef] text-avs-accent/55 hover:bg-avs-accent/8 hover:text-avs-accent'
                }`}
              >
                {t(`types.${type}` as 'types.ALL')}
              </button>
            ))}
          </div>
        </div>

        {loadError && (
          <p role="status" className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
            {loadError} {symbols.length > 0 && t('loadErrorFallback')}
          </p>
        )}

        <div className="mb-5 mt-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-black sm:text-2xl">{t('catalog.title')}</h2>
            <p className="mt-1 text-xs text-avs-accent/45">{t('catalog.count', { count: filteredSymbols.length })}</p>
          </div>
          {loading && (
            <span className="animate-pulse font-mono text-[9px] font-bold uppercase tracking-wider text-avs-primary">
              {t('catalog.updating')}
            </span>
          )}
        </div>

        {filteredSymbols.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-avs-accent/15 bg-white px-6 py-16 text-center">
            <Search size={25} className="mx-auto mb-3 text-avs-primary/55" aria-hidden />
            <h3 className="font-display text-lg font-bold">{t('catalog.emptyTitle')}</h3>
            <p className="mt-2 text-sm text-avs-accent/50">{t('catalog.emptyDescription')}</p>
            {(search || activeType !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveType('ALL');
                }}
                className="mt-5 rounded-xl bg-avs-primary px-4 py-2.5 text-xs font-bold text-white"
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
                className="group overflow-hidden rounded-2xl border border-avs-accent/8 bg-white text-left shadow-[0_3px_15px_rgba(29,29,27,0.025)] transition duration-200 hover:-translate-y-1 hover:border-avs-primary/25 hover:shadow-[0_12px_35px_rgba(29,29,27,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avs-primary"
              >
                <div className={`${symbol.pattern.previewClass} relative h-28 overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-sm font-black text-white shadow-lg"
                      style={{ backgroundColor: symbol.cssPreview || '#1D1D1B' }}
                    >
                      {symbol.name.slice(0, 1)}
                    </span>
                    <span className="rounded-full bg-black/30 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur">
                      {t(`types.${symbol.pattern.type.toUpperCase()}` as 'types.ALL')}
                    </span>
                  </div>
                  {symbol.sacred && (
                    <span className="absolute top-3 right-3 rounded-full bg-[#201b18]/75 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur">
                      {t('detail.restricted')}
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display truncate text-lg font-bold text-avs-accent">{symbol.name}</h3>
                      <p className="mt-0.5 truncate text-xs italic text-avs-accent/45">{symbol.nameFr}</p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-avs-accent/[0.04] text-avs-accent/35 transition group-hover:bg-avs-primary/10 group-hover:text-avs-primary">
                      <ChevronRight size={15} aria-hidden />
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-avs-accent/65">{symbol.meaning}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-avs-accent/6 pt-3">
                    <span className="truncate text-[10px] font-semibold text-avs-accent/45">
                      {symbol.pattern.flag} {symbol.pattern.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-avs-accent/35">{symbol.pattern.country}</span>
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
            className="absolute inset-0 cursor-default bg-[#171411]/65 backdrop-blur-sm"
            aria-label={t('detail.close')}
            onClick={closeSymbol}
          />
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="symbol-detail-title"
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-[#fbf9f6] shadow-2xl sm:rounded-3xl"
          >
            <div className={`${selectedSymbol.pattern.previewClass} relative h-36 shrink-0 sm:h-48`}>
              {selectedSymbol.imageUrl && (
                <img
                  src={selectedSymbol.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute right-4 bottom-4 left-5 flex items-end justify-between gap-4 sm:right-6 sm:bottom-5 sm:left-7">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 text-xl font-black text-white shadow-lg"
                    style={{ backgroundColor: selectedSymbol.cssPreview || '#1D1D1B' }}
                  >
                    {selectedSymbol.name.slice(0, 1)}
                  </span>
                  <span className="rounded-full bg-black/30 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                    {t(`types.${selectedSymbol.pattern.type.toUpperCase()}` as 'types.ALL')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeSymbol}
                  aria-label={t('detail.close')}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
                >
                  <X size={17} aria-hidden />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-avs-accent/45">
                <span>{selectedSymbol.pattern.flag} {selectedSymbol.pattern.country}</span>
                {selectedSymbol.pattern.people && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{selectedSymbol.pattern.people}</span>
                  </>
                )}
                {selectedSymbol.sacred && (
                  <span className="rounded-full bg-avs-primary/10 px-2.5 py-1 text-avs-primary">
                    {t('detail.restricted')}
                  </span>
                )}
              </div>
              <h2 id="symbol-detail-title" className="font-display mt-3 text-3xl font-black sm:text-4xl">
                {selectedSymbol.name}
              </h2>
              <p className="mt-1 text-sm italic text-avs-accent/45">{selectedSymbol.nameFr}</p>

              <section className="mt-6 rounded-2xl border border-avs-accent/8 bg-white p-4 sm:p-5">
                <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-avs-primary">
                  {t('detail.meaning')}
                </h3>
                <p className="mt-2 text-sm leading-7 text-avs-accent/75">{selectedSymbol.meaning}</p>
              </section>
              <section className="mt-4 px-1">
                <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-avs-accent/40">
                  {t('detail.context')}
                </h3>
                <p className="mt-2 text-sm leading-7 text-avs-accent/65">{selectedSymbol.usage}</p>
              </section>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href={`/patterns?pattern=${encodeURIComponent(selectedSymbol.pattern.id)}` as Route}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-avs-accent/10 bg-white px-4 py-3 transition hover:border-avs-primary/30"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[8px] font-bold uppercase tracking-wider text-avs-accent/35">
                      {t('detail.parentPattern')}
                    </span>
                    <span className="mt-1 block truncate text-sm font-bold text-avs-accent">{selectedSymbol.pattern.name}</span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-avs-primary" aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={() => void copySymbolLink()}
                  className="flex items-center justify-center gap-2 rounded-xl border border-avs-accent/10 px-4 py-3 text-xs font-bold text-avs-accent/65 transition hover:border-avs-primary/30 hover:text-avs-primary"
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
                <section className="mt-6 border-t border-avs-accent/8 pt-5">
                  <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-avs-accent/40">
                    {t('detail.sources')}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {selectedSymbol.pattern.sources.map((source) => (
                      <li key={source} className="flex gap-2 text-xs leading-5 text-avs-accent/55">
                        <span className="mt-0.5 text-avs-primary" aria-hidden>•</span>
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
