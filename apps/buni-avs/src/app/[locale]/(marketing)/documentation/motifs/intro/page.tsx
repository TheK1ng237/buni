'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { DocPageTemplate } from '../../doc-page-template';
import { useNavSpaces } from '../../nav-data';
import { useTranslations } from '@/i18n';
import { CodeBlock } from '../../doc-primitives';
import { PATTERNS_DOCS } from '@/features/patterns/data/patterns-docs';
import { patternRepository } from '@/features/patterns/repositories/pattern.repository';
import type { Pattern } from '@/features/patterns/types/models/pattern.model';
import { LOCAL_SYMBOLS } from '@/features/symbols/data/symbol.mapper';
import { useSymbols } from '@/features/symbols/hooks/useSymbols';

export default function MotifsPage() {
  const t = useTranslations('documentation.motifs.intro');
  const NAV_SPACES = useNavSpaces();
  const space = NAV_SPACES.find(s => s.slug === 'motifs')!;
  const [patterns, setPatterns] = useState<Pattern[]>(PATTERNS_DOCS);
  const [patternsError, setPatternsError] = useState(false);
  const { data: symbols = LOCAL_SYMBOLS, error: symbolsError, isFetching: symbolsFetching } = useSymbols(LOCAL_SYMBOLS);

  useEffect(() => {
    let active = true;
    patternRepository.findAll()
      .then((backendPatterns) => {
        if (!active) return;
        const merged = new Map(backendPatterns.map((pattern) => [pattern.id, pattern]));
        for (const pattern of PATTERNS_DOCS) {
          if (!merged.has(pattern.id) && ![...merged.values()].some((item) => item.slug === pattern.slug)) {
            merged.set(pattern.id, pattern);
          }
        }
        setPatterns([...merged.values()]);
      })
      .catch((error: unknown) => {
        console.error('Unable to load documentation patterns from the backend:', error);
        if (active) setPatternsError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const publishedPatterns = patterns.filter((pattern) => pattern.status.toUpperCase() === 'PUBLISHED');
  const publishedSymbols = symbols.filter((symbol) => symbol.status === 'PUBLISHED');

  return (
    <DocPageTemplate
      space={space}
      title={t('title')}
      summary={t('summary')}
      explanation={
        <div className="space-y-8">
          {/* Installation */}
          <section id="installation">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('installation.title')}</h2>
            <CodeBlock id="patterns-installation" lang="bash" title={t('installation.title')} code={`# Installation
pnpm add @buni/patterns

# CSS Import (recommended)
@import '@buni/patterns';

# Or patterns only
@import '@buni/patterns/css';

# Or tokens only
@import '@buni/patterns/tokens';

# Usage in JSX
<div className="kente h-32 w-full" />
<div className="ndop h-32 w-full" />`} />
          </section>

          {/* Patterns Grid */}
          <section id="patterns-grid">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('patterns.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('patterns.description')}</p>
            {patternsError && (
              <p role="status" className="mb-4 text-sm text-amber-800 dark:text-amber-300">
                {t('patterns.loadError')}
              </p>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publishedPatterns.slice(0, 3).map((pattern) => (
                <div
                  key={pattern.id}
                  className="surface-primary border-primary border rounded-avs overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {pattern.imgUrl ? (
                      <img src={pattern.imgUrl} alt={pattern.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className={`${pattern.cssClass} absolute inset-0`} aria-label={pattern.name} />
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-avs-primary">{pattern.name}</h3>
                      <span className="text-xs text-avs-accent/75">{pattern.origin.country}</span>
                    </div>
                    <p className="text-xs text-avs-accent/70">{pattern.origin.people}</p>
                    <div className="flex gap-1.5" aria-label={t('patterns.colors')}>
                      {pattern.colors.slice(0, 5).map((color) => (
                        <div
                          key={`${pattern.id}-${color.hex}`}
                          className="w-6 h-6 rounded-full border border-primary"
                          style={{ backgroundColor: color.hex }}
                          title={`${color.name}: ${color.hex}`}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <Link href={'/patterns' as Route} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-avs-primary px-4 py-2.5 text-sm font-bold text-avs-secondary">
              {t('patterns.continueToEncyclopedia')} <span aria-hidden>→</span>
            </Link>
          </section>

          {/* Published symbols from the shared encyclopedia query */}
          <section id="symbols">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('symbols.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('symbols.description')}</p>
            {symbolsError && (
              <p role="status" className="mb-4 text-sm text-amber-800 dark:text-amber-300">
                {t('symbols.loadError')}
              </p>
            )}
            {symbolsFetching && <p className="mb-3 text-xs text-avs-accent/60">{t('symbols.updating')}</p>}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {publishedSymbols.slice(0, 4).map((symbol) => (
                <div key={symbol.id} className="surface-primary border-primary overflow-hidden rounded-avs border">
                  <div className="relative flex aspect-square items-center justify-center" style={{ backgroundColor: symbol.cssPreview || '#C0573E' }}>
                    {symbol.imageUrl ? (
                      <img src={symbol.imageUrl} alt={symbol.name} className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
                    ) : (
                      <span className="text-4xl font-bold text-white">{symbol.name.trim().charAt(0).toLocaleUpperCase()}</span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-avs-primary">{symbol.name}</h3>
                    <p className="text-xs text-avs-accent/70">{symbol.pattern.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={'/symbols' as Route} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-avs-primary px-4 py-2.5 text-sm font-bold text-avs-secondary">
              {t('symbols.continueToEncyclopedia')} <span aria-hidden>→</span>
            </Link>
          </section>

          {/* Programmatic Access */}
          <section id="programmatic">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('programmatic.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('programmatic.description')}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('programmatic.getPattern')}</h3>
                <CodeBlock id="patterns-catalog-api" lang="ts" code={`import { getPatternBySlug, getPatternsByType, getFeaturedPatterns } from '@buni/patterns';

// Get single pattern
const kentePattern = getPatternBySlug('kente-asante');
// { slug: 'kente-asante', name: 'Kente Asante', type: 'kente', cssClass: 'kente', colors: {...}, summary: '...' }

// Get by type
const allKente = getPatternsByType('kente');

// Get featured
const featured = getFeaturedPatterns();`} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('programmatic.svgRegistry')}</h3>
                <CodeBlock id="patterns-svg-registry" lang="ts" code={`import { SVG_PATTERN_REGISTRY, getSvgPattern } from '@buni/patterns';

// Get SVG path
const ndopSvg = SVG_PATTERN_REGISTRY['ndop-bamoum'];
// "./svg/ndop/ndop-bamoum.svg"

// Or helper
const kenteSvg = getSvgPattern('kente-royale');`} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('programmatic.types')}</h3>
                <CodeBlock id="patterns-types" lang="ts" code={`import type { PatternType, PatternCssClass, PatternStatus } from '@buni/patterns';

// Types disponibles
type PatternType = 'kente' | 'bogolan' | 'adinkra' | 'ndebele' | 'ndop' | 'wax' | 'kuba' | 'berber';
type PatternCssClass = 'kente' | 'kente-etoile' | 'ndop' | 'ndop-ceremoniel' | ...;
type PatternStatus = 'published' | 'draft' | 'review';`} />
              </div>
            </div>
          </section>

          {/* Customization */}
          <section id="customization">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('customization.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('customization.description')}</p>

            <CodeBlock id="patterns-customization" lang="css" code={`@import '@buni/patterns';

@theme {
  /* Override pattern colors */
  --color-avs-primary: #YOUR_BRAND_COLOR;
  --color-avs-kente: #YOUR_GOLD;
  --color-avs-ndop: #YOUR_GREEN;

  /* Custom pattern variation */
  --my-custom-kente: repeating-linear-gradient(
    90deg,
    var(--color-avs-kente) 0px,
    var(--color-avs-kente) 8px,
    var(--color-avs-primary) 8px,
    var(--color-avs-primary) 16px
  );
}

/* Usage */
.my-custom-pattern {
  background: var(--my-custom-kente);
}`} />
          </section>

        </div>
      }
      toc={[
        { id: 'installation', level: 2, label: t('toc.installation') },
        { id: 'patterns-grid', level: 2, label: t('toc.patterns') },
        { id: 'symbols', level: 2, label: t('toc.symbols') },
        { id: 'programmatic', level: 2, label: t('toc.programmatic') },
        { id: 'customization', level: 2, label: t('toc.customization') },
      ]}
    />
  );
}