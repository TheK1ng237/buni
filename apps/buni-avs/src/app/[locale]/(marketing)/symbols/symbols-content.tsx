'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Route } from 'next';
import { useTranslations } from '@/i18n';
import { PATTERNS_DOCS } from '../patterns/mock';

const SYMBOLS = PATTERNS_DOCS.flatMap((pattern) =>
  pattern.symbols.map((symbol, index) => ({
    ...symbol,
    id: `${pattern.id}-${index}-${symbol.name}`,
    pattern,
  }))
);

const TYPES = ['ALL', 'KENTE', 'NDOP', 'BOGOLAN', 'ADINKRA'];

export function SymbolsContent() {
  const t = useTranslations('symbols');
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredSymbols = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return SYMBOLS.filter(({ name, nameFr, meaning, usage, pattern }) => {
      const matchesSearch =
        !query ||
        [name, nameFr, meaning, usage, pattern.name, pattern.origin.country, pattern.origin.people]
          .join(' ')
          .toLocaleLowerCase()
          .includes(query);
      const matchesType = activeType === 'ALL' || pattern.type.toUpperCase() === activeType;

      return matchesSearch && matchesType;
    });
  }, [activeType, search]);

  const selectedSymbol =
    filteredSymbols.find((symbol) => symbol.id === selectedId) ?? filteredSymbols[0];

  return (
    <div className="bg-avs-secondary flex h-screen flex-col overflow-hidden">
      <header className="bg-avs-secondary border-avs-accent/10 shrink-0 border-b px-4 py-4 sm:px-6 sm:py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-avs-primary mb-2 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                {t('header.label', { count: SYMBOLS.length })}
              </p>
              <h1 className="font-display text-avs-accent text-2xl leading-none font-black sm:text-4xl">
                {t('header.title')}
              </h1>
            </div>
            <p className="text-avs-accent/50 max-w-lg text-xs leading-relaxed sm:text-sm">
              {t('header.description')}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{t('search.label')}</span>
              <i
                className="pi pi-search text-avs-accent/40 absolute top-1/2 left-3 -translate-y-1/2"
                aria-hidden
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('search.placeholder')}
                className="avs-input focus:border-avs-primary w-full pr-9 pl-9 text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label={t('search.clear')}
                  className="text-avs-accent/40 hover:text-avs-accent absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <i className="pi pi-times" aria-hidden />
                </button>
              )}
            </label>

            <div className="flex flex-wrap gap-1.5" aria-label={t('filters.label')}>
              {TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={activeType === type}
                  onClick={() => setActiveType(type)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-mono text-[9px] font-black tracking-[0.12em] uppercase transition-colors ${
                    activeType === type
                      ? 'bg-avs-primary text-avs-secondary'
                      : 'border-avs-accent/15 text-avs-accent/50 hover:border-avs-primary/30 border'
                  }`}
                >
                  {t(`types.${type}` as 'types.ALL')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-hidden">
        <aside className="border-avs-accent/10 flex w-full shrink-0 flex-col overflow-hidden border-r sm:w-72 lg:w-80">
          <div className="border-avs-accent/10 text-avs-accent/40 border-b px-4 py-3 font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
            {t('list.count', { count: filteredSymbols.length })}
          </div>

          {filteredSymbols.length === 0 ? (
            <div className="text-avs-accent/45 flex flex-1 flex-col items-center justify-center px-6 text-center">
              <i className="pi pi-search mb-3 text-2xl" aria-hidden />
              <p className="text-sm font-semibold">{t('list.emptyTitle')}</p>
              <p className="mt-1 text-xs">{t('list.emptyDescription')}</p>
            </div>
          ) : (
            <nav className="flex-1 overflow-y-auto py-1" aria-label={t('list.label')}>
              {filteredSymbols.map((symbol) => {
                const isSelected = selectedSymbol?.id === symbol.id;

                return (
                  <button
                    key={symbol.id}
                    type="button"
                    aria-current={isSelected ? 'true' : undefined}
                    onClick={() => setSelectedId(symbol.id)}
                    className={`border-avs-accent/10 w-full border-b border-l-2 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? 'border-l-avs-primary bg-avs-primary/5'
                        : 'border-l-transparent hover:bg-avs-accent/[0.03]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`${symbol.pattern.previewClass || symbol.pattern.cssClass} flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/10`}
                        aria-hidden
                      >
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/60 text-[10px] font-black text-white shadow"
                          style={{ backgroundColor: symbol.cssPreview || '#1D1D1B' }}
                        >
                          {symbol.name.slice(0, 1)}
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="font-display text-avs-accent block truncate text-sm font-bold">
                          {symbol.name}
                        </span>
                        <span className="text-avs-accent/45 mt-0.5 block truncate text-[10px]">
                          {symbol.pattern.origin.flag} {symbol.pattern.name} ·{' '}
                          {symbol.pattern.origin.country}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          )}
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto">
          {selectedSymbol ? (
            <article className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
              <div
                className={`${selectedSymbol.pattern.previewClass || selectedSymbol.pattern.cssClass} relative mb-8 flex h-40 items-center justify-center overflow-hidden rounded-2xl sm:h-56`}
                aria-hidden
              >
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/70 text-3xl font-black text-white shadow-xl"
                  style={{ backgroundColor: selectedSymbol.cssPreview || '#1D1D1B' }}
                >
                  {selectedSymbol.name.slice(0, 1)}
                </span>
              </div>

              <div className="text-avs-primary mb-3 flex flex-wrap items-center gap-2 font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
                <span>{selectedSymbol.pattern.type}</span>
                <span aria-hidden>·</span>
                <span>
                  {selectedSymbol.pattern.origin.flag} {selectedSymbol.pattern.origin.country}
                </span>
                {selectedSymbol.sacred && (
                  <span className="rounded-full bg-avs-primary/10 px-2 py-1 tracking-normal">
                    {t('detail.restricted')}
                  </span>
                )}
              </div>

              <h2 className="font-display text-avs-accent text-3xl font-black sm:text-5xl">
                {selectedSymbol.name}
              </h2>
              <p className="text-avs-accent/50 mt-2 text-sm italic">{selectedSymbol.nameFr}</p>

              <section className="border-avs-accent/10 mt-8 border-t py-6">
                <h3 className="text-avs-accent mb-2 text-xs font-bold tracking-wide uppercase">
                  {t('detail.meaning')}
                </h3>
                <p className="text-avs-accent/70 text-sm leading-7">{selectedSymbol.meaning}</p>
              </section>

              <section className="border-avs-accent/10 border-t py-6">
                <h3 className="text-avs-accent mb-2 text-xs font-bold tracking-wide uppercase">
                  {t('detail.context')}
                </h3>
                <p className="text-avs-accent/70 text-sm leading-7">{selectedSymbol.usage}</p>
                <p className="text-avs-accent/45 mt-3 text-xs leading-6">
                  {selectedSymbol.pattern.origin.people} · {selectedSymbol.pattern.origin.country}
                </p>
              </section>

              <section className="border-avs-accent/10 border-t py-6">
                <h3 className="text-avs-accent mb-3 text-xs font-bold tracking-wide uppercase">
                  {t('detail.parentPattern')}
                </h3>
                <Link
                  href={`/patterns?pattern=${encodeURIComponent(selectedSymbol.pattern.id)}` as Route}
                  className="border-avs-accent/10 hover:border-avs-primary/40 inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors"
                >
                  <i className="pi pi-th-large text-avs-primary" aria-hidden />
                  <span className="text-avs-accent">{selectedSymbol.pattern.name}</span>
                  <i className="pi pi-arrow-up-right text-avs-accent/40" aria-hidden />
                </Link>
              </section>

              <section className="border-avs-accent/10 border-t py-6">
                <h3 className="text-avs-accent mb-3 text-xs font-bold tracking-wide uppercase">
                  {t('detail.sources')}
                </h3>
                <ul className="text-avs-accent/55 space-y-2 text-xs leading-5">
                  {selectedSymbol.pattern.sources.map((source) => (
                    <li key={source} className="flex gap-2">
                      <span className="text-avs-primary" aria-hidden>
                        •
                      </span>
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          ) : (
            <div className="text-avs-accent/45 flex h-full items-center justify-center p-8 text-center text-sm">
              {t('detail.select')}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
