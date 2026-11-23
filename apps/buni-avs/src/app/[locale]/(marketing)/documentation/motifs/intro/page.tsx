'use client';

import { DocPageTemplate } from '../../doc-page-template';
import { useNavSpaces } from '../../nav-data';
import { useTranslations } from '@/i18n';
import { kente, ndop, bogolan, adinkra, wax, kuba, ndebele, berber } from '@buni/patterns';

export default function MotifsPage() {
  const t = useTranslations('documentation.motifs.intro');
  const NAV_SPACES = useNavSpaces();
  const space = NAV_SPACES.find(s => s.slug === 'motifs')!;

  // Patterns data from the package
  const patterns = [
    {
      id: 'kente',
      name: 'Kente',
      className: kente,
      variations: [kente, 'kente-etoile'],
      origin: t('kente.origin'),
      description: t('kente.description'),
      colors: ['#D4A017', '#C0573E', '#4A6741'],
    },
    {
      id: 'ndop',
      name: 'Ndop',
      className: ndop,
      variations: [ndop, 'ndop-ceremoniel'],
      origin: t('ndop.origin'),
      description: t('ndop.description'),
      colors: ['#1B2A4A', '#F5EBE0', '#D4A017'],
    },
    {
      id: 'bogolan',
      name: 'Bogolan',
      className: bogolan,
      variations: [bogolan, 'bogolan-terre'],
      origin: t('bogolan.origin'),
      description: t('bogolan.description'),
      colors: ['#241C18', '#D7C4B7', '#8B6914'],
    },
    {
      id: 'adinkra',
      name: 'Adinkra',
      className: adinkra,
      variations: [adinkra],
      origin: t('adinkra.origin'),
      description: t('adinkra.description'),
      colors: ['#181818', '#D4A017', '#C0573E'],
    },
    {
      id: 'wax',
      name: 'Wax',
      className: wax,
      variations: [wax, 'wax-lagos'],
      origin: t('wax.origin'),
      description: t('wax.description'),
      colors: ['#FF6B35', '#004E89', '#F7FFF7'],
    },
    {
      id: 'kuba',
      name: 'Kuba',
      className: kuba,
      variations: [kuba],
      origin: t('kuba.origin'),
      description: t('kuba.description'),
      colors: ['#8B7355', '#D2B48C', '#241C18'],
    },
    {
      id: 'ndebele',
      name: 'Ndebele',
      className: ndebele,
      variations: [ndebele],
      origin: t('ndebele.origin'),
      description: t('ndebele.description'),
      colors: ['#FF0000', '#FFFF00', '#0000FF'],
    },
    {
      id: 'berber',
      name: 'Berber',
      className: berber,
      variations: [berber],
      origin: t('berber.origin'),
      description: t('berber.description'),
      colors: ['#C41E3A', '#FCD116', '#007FFF'],
    },
  ];

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
            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`// Installation
pnpm add @buni/patterns

// CSS Import (recommended)
@import '@buni/patterns';

// Or patterns only
@import '@buni/patterns/css';

// Or tokens only
@import '@buni/patterns/tokens';

// Usage in JSX
<div className="kente h-32 w-full" />
<div className="ndop h-32 w-full" />`}</code></pre>
          </section>

          {/* Patterns Grid */}
          <section id="patterns-grid">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('patterns.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('patterns.description')}</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="surface-primary border-primary border rounded-avs overflow-hidden"
                >
                  {/* Preview */}
                  <div
                    className={`aspect-square ${pattern.className} ${pattern.variations[0]}`}
                    style={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-avs-primary">{pattern.name}</h3>
                      <span className="text-xs text-avs-accent/60">{pattern.origin}</span>
                    </div>

                    <p className="text-avs-accent/70 text-sm">{pattern.description}</p>

                    {/* Color palette */}
                    <div className="flex gap-1.5">
                      {pattern.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-primary"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    {/* Variations */}
                    <div className="pt-2 border-t border-primary">
                      <h4 className="text-xs font-medium text-avs-accent/60 mb-2">{t('variations')}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {pattern.variations.map((variation) => (
                          <code
                            key={variation}
                            className="text-xs bg-avs-secondary text-avs-accent px-2 py-1 rounded text-nowrap"
                          >
                            .{variation}
                          </code>
                        ))}
                      </div>
                    </div>

                    {/* Usage code */}
                    <details className="group">
                      <summary className="text-xs text-avs-kente hover:text-avs-primary cursor-pointer flex items-center gap-1">
                        <span>{t('showCode')}</span>
                        <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </summary>
                      <pre className="bg-avs-accent/5 p-3 rounded-avs text-xs overflow-x-auto mt-2"><code>{`// Basic
<div className="${pattern.className} h-32 w-full" />

// With variation
<div className="${pattern.variations[1] || pattern.className} h-32 w-full" />

// With overlay content
<div className="avs-pattern-overlay ${pattern.className} h-64 w-full p-4">
  <div className="relative z-10 text-avs-secondary">
    Contenu au-dessus du motif
  </div>
</div>`}</code></pre>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Symbols Section */}
          <section id="symbols">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('symbols.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('symbols.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto mb-6"><code>{`import { ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5 } from '@buni/patterns/symbols';

// Usage
<img src={ndopSymbol1} alt="Ndop Symbol" width="32" height="32" />
<div style={{ backgroundImage: \`url(\${ndopSymbol1})\` }} />`}</code></pre>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {['ndopSymbol1', 'ndopSymbol2', 'ndopSymbol3', 'ndopSymbol4', 'ndopSymbol5'].map((symbol, i) => (
                <div key={symbol} className="surface-primary border-primary border rounded-avs p-4 text-center">
                  <div className="avs-surface-primary border-primary border rounded-avs aspect-square mb-2 flex items-center justify-center" style={{ backgroundColor: '#071828' }}>
                    <span className="text-avs-kente text-lg">◇</span>
                  </div>
                  <code className="text-sm text-avs-accent/70">{symbol}</code>
                </div>
              ))}
            </div>
          </section>

          {/* Programmatic Access */}
          <section id="programmatic">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('programmatic.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('programmatic.description')}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('programmatic.getPattern')}</h3>
                <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`import { getPatternBySlug, getPatternsByType, getFeaturedPatterns } from '@buni/patterns';

// Get single pattern
const kentePattern = getPatternBySlug('kente-asante');
// { slug: 'kente-asante', name: 'Kente Asante', type: 'kente', cssClass: 'kente', colors: {...}, summary: '...' }

// Get by type
const allKente = getPatternsByType('kente');

// Get featured
const featured = getFeaturedPatterns();`}</code></pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('programmatic.svgRegistry')}</h3>
                <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`import { SVG_PATTERN_REGISTRY, getSvgPattern } from '@buni/patterns';

// Get SVG path
const ndopSvg = SVG_PATTERN_REGISTRY['ndop-bamoum'];
// "./svg/ndop/ndop-bamoum.svg"

// Or helper
const kenteSvg = getSvgPattern('kente-royale');`}</code></pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('programmatic.types')}</h3>
                <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`import type { PatternType, PatternCssClass, PatternStatus } from '@buni/patterns';

// Types disponibles
type PatternType = 'kente' | 'bogolan' | 'adinkra' | 'ndebele' | 'ndop' | 'wax' | 'kuba' | 'berber';
type PatternCssClass = 'kente' | 'kente-etoile' | 'ndop' | 'ndop-ceremoniel' | ...;
type PatternStatus = 'published' | 'draft' | 'review';`}</code></pre>
              </div>
            </div>
          </section>

          {/* Customization */}
          <section id="customization">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('customization.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('customization.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`@import '@buni/patterns';

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
}`}</code></pre>
          </section>

          {/* SVG Export */}
          <section id="svg-export">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('svg.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('svg.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`// Import SVG patterns (Vite, Webpack, Next.js)
import ndopBamoum from '@buni/patterns/svg/ndop/ndop-bamoum.svg';
import kenteRoyale from '@buni/patterns/svg/kente/kente-royale.svg';
import toghuBamenda from '@buni/patterns/svg/toghu-bamenda.svg';

// Usage
<img src={ndopBamoum} alt="Ndop Bamoum" />
<div style={{ backgroundImage: \`url(\${kenteRoyale})\` }} />`}</code></pre>

            <div className="grid gap-4 md:grid-cols-3 mt-6">
              {[
                { name: 'ndop/ndop-bamoum.svg', label: 'Ndop Bamoum' },
                { name: 'kente/kente-royale.svg', label: 'Kente Royale' },
                { name: 'toghu-bamenda.svg', label: 'Toghu Bamenda' },
              ].map(({ name, label }) => (
                <div key={name} className="surface-primary border-primary border rounded-avs p-4 text-center">
                  <div className="aspect-square bg-avs-secondary rounded-avs mb-2 flex items-center justify-center">
                    <span className="text-avs-accent/40 text-lg">📐</span>
                  </div>
                  <p className="font-medium text-avs-primary text-sm">{label}</p>
                  <code className="text-xs text-avs-accent/60">svg/{name}</code>
                </div>
              ))}
            </div>
          </section>
        </div>
      }
      toc={[
        { id: 'installation', level: 2, label: t('toc.installation') },
        { id: 'patterns-grid', level: 2, label: t('toc.patterns') },
        { id: 'symbols', level: 2, label: t('toc.symbols') },
        { id: 'programmatic', level: 2, label: t('toc.programmatic') },
        { id: 'customization', level: 2, label: t('toc.customization') },
        { id: 'svg-export', level: 2, label: t('toc.svg') },
      ]}
    />
  );
}