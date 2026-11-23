'use client';

import { DocPageTemplate } from '../../doc-page-template';
import { useNavSpaces } from '../../nav-data';
import { useTranslations } from '@/i18n';
import { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from '@buni/icons';

export default function CataloguePage() {
  const t = useTranslations('documentation.icones.catalogue');
  const NAV_SPACES = useNavSpaces();
  const space = NAV_SPACES.find(s => s.slug === 'icones')!;

  // Icons with their props
  const icons = [
    { name: 'Avs', component: Avs, description: t('avs.desc'), category: t('categories.brand') },
    { name: 'AvsPerson', component: AvsPerson, description: t('person.desc'), category: t('categories.ui') },
    { name: 'AvsSettings', component: AvsSettings, description: t('settings.desc'), category: t('categories.ui') },
    { name: 'AvsHome', component: AvsHome, description: t('home.desc'), category: t('categories.navigation') },
    { name: 'AvsSearch', component: AvsSearch, description: t('search.desc'), category: t('categories.navigation') },
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
pnpm add @buni/icons

// CSS (for class-based usage)
@import '@buni/icons/css';

// React (short imports - recommended)
import { Avs, AvsPerson, AvsSettings, AvsHome, AvsSearch } from '@buni/icons';

// Symbols (Ndop cultural symbols)
import { ndopSymbol1, ndopSymbol2 } from '@buni/icons/symbols';

// Cultural assets
import { ndopBamoum, toghuBamenda } from '@buni/icons/cultural';`}</code></pre>
          </section>

          {/* React Components */}
          <section id="react-components">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('react.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('react.description')}</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {icons.map(({ name, component: Icon, description, category }) => (
                <div key={name} className="surface-primary border-primary border rounded-avs p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="avs-surface-primary border-primary border rounded-avs p-4">
                      <Icon className="h-10 w-10 text-avs-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-avs-primary">{name}</h3>
                      <span className="text-xs bg-avs-kente/10 text-avs-kente px-2 py-0.5 rounded-full">{category}</span>
                    </div>
                  </div>

                  <p className="text-avs-accent/70 text-sm">{description}</p>

                  {/* Usage examples */}
                  <div className="space-y-3 pt-2 border-t border-primary">
                    <h4 className="text-sm font-medium text-avs-accent/60">{t('examples.basic')}</h4>
                    <pre className="bg-avs-accent/5 p-3 rounded-avs text-xs overflow-x-auto"><code>{`<${name} className="h-6 w-6" />`}</code></pre>

                    <h4 className="text-sm font-medium text-avs-accent/60">{t('examples.sizes')}</h4>
                    <pre className="bg-avs-accent/5 p-3 rounded-avs text-xs overflow-x-auto"><code>{`<${name} size="sm" />  {/* 0.875rem */}
<${name} size="md" />  {/* 1rem - default */}
<${name} size="lg" />  {/* 1.25rem */}
<${name} size="xl" />  {/* 1.5rem */}
<${name} size="2xl" /> {/* 2rem */}
<${name} size={24} />  {/* Custom pixels */}`}</code></pre>

                    <h4 className="text-sm font-medium text-avs-accent/60">{t('examples.colors')}</h4>
                    <pre className="bg-avs-accent/5 p-3 rounded-avs text-xs overflow-x-auto"><code>{`<${name} color="#C0573E" />  {/* Primary */}
<${name} color="#D4A017" />  {/* Kente Gold */}
<${name} color="#4A6741" />  {/* Ndop Green */}
<${name} color="currentColor" /> {/* Inherit text color */}`}</code></pre>

                    <h4 className="text-sm font-medium text-avs-accent/60">{t('examples.interactive')}</h4>
                    <div className="flex items-center gap-4">
                      <Icon className="h-3.5 w-3.5 text-avs-accent/60" />
                      <Icon className="h-4 w-4 text-avs-primary" />
                      <Icon className="h-5 w-5 text-avs-kente" />
                      <Icon className="h-6 w-6 text-avs-ndop" />
                      <Icon className="h-8 w-8 text-avs-indigo" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CSS Classes */}
          <section id="css-classes">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('css.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('css.description')}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('css.basic')}</h3>
                <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`@import '@buni/icons/css';

<i class="avs"></i>
<i class="avs-person"></i>
<i class="avs-settings"></i>
<i class="avs-home"></i>
<i class="avs-search"></i>`}</code></pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('css.sizes')}</h3>
                <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`<i class="avs avs-sm"></i>   {/* 0.875rem */}
<i class="avs avs-md"></i>   {/* 1rem - default */}
<i class="avs avs-lg"></i>   {/* 1.25rem */}
<i class="avs avs-xl"></i>   {/* 1.5rem */}
<i class="avs avs-2xl"></i>  {/* 2rem */}

<!-- With base class -->
<i class="buni-icon avs"></i>`}</code></pre>
              </div>

              <div>
                <h3 className="text-lg font-medium text-avs-primary mb-3">{t('css.preview')}</h3>
                <div className="flex flex-wrap items-center gap-6 p-4 surface-primary border-primary border rounded-avs">
                  <i className="avs avs-2xl text-avs-primary" />
                  <i className="avs avs-xl text-avs-kente" />
                  <i className="avs avs-lg text-avs-ndop" />
                  <i className="avs avs-md text-avs-indigo" />
                  <i className="avs avs-sm text-avs-accent/60" />
                  <i className="avs-person avs-2xl text-avs-primary" />
                  <i className="avs-settings avs-xl text-avs-kente" />
                  <i className="avs-home avs-lg text-avs-ndop" />
                  <i className="avs-search avs-md text-avs-indigo" />
                </div>
              </div>
            </div>
          </section>

          {/* Symbols (Ndop) */}
          <section id="symbols">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('symbols.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('symbols.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto mb-6"><code>{`import { ndopSymbol1, ndopSymbol2, ndopSymbol3, ndopSymbol4, ndopSymbol5 } from '@buni/icons/symbols';

// Usage
<img src={ndopSymbol1} alt="Ndop Symbol" width="32" height="32" />
<div style={{ backgroundImage: \`url(\${ndopSymbol1})\` }} />`}</code></pre>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {['ndopSymbol1', 'ndopSymbol2', 'ndopSymbol3', 'ndopSymbol4', 'ndopSymbol5'].map((symbol, i) => (
                <div key={symbol} className="surface-primary border-primary border rounded-avs p-4 text-center">
                  <div className="avs-surface-primary border-primary border rounded-avs p-4 mb-2" style={{ width: 64, height: 64, margin: '0 auto', backgroundImage: `var(--symbol-${i+1})` }} />
                  <code className="text-sm text-avs-accent/70">{symbol}</code>
                </div>
              ))}
            </div>
          </section>

          {/* Cultural Assets */}
          <section id="cultural">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('cultural.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('cultural.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto mb-6"><code>{`import { ndopBamoum, toghuBamenda, toghuBamileke } from '@buni/icons/cultural';

// Usage
<img src={ndopBamoum} alt="Ndop Bamoum" />
<img src={toghuBamenda} alt="Toghu Bamenda" />`}</code></pre>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { name: 'ndopBamoum', origin: 'Cameroun / Bamoum' },
                { name: 'toghuBamenda', origin: 'Cameroun / Bamenda' },
                { name: 'toghuBamileke', origin: 'Cameroun / Bamiléké' },
              ].map(({ name, origin }) => (
                <div key={name} className="surface-primary border-primary border rounded-avs p-4 text-center">
                  <div className="aspect-square bg-avs-secondary rounded-avs mb-2 flex items-center justify-center" style={{ backgroundImage: `var(--cultural-${name})` }}>
                    <span className="text-avs-accent/40 text-lg">📐</span>
                  </div>
                  <p className="font-medium text-avs-primary">{name}</p>
                  <p className="text-xs text-avs-accent/60">{origin}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SVG Direct Import */}
          <section id="svg-import">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('svg.title')}</h2>
            <p className="text-avs-accent/80 mb-6">{t('svg.description')}</p>

            <pre className="bg-avs-accent/5 p-4 rounded-avs overflow-x-auto"><code>{`import AvsSvg from '@buni/icons/svg/avs.svg';
import PersonSvg from '@buni/icons/svg/avs-person.svg';

// As <img>
<img src={AvsSvg} alt="AVS" width="32" height="32" />

// As background
<div style={{ backgroundImage: \`url(\${AvsSvg})\` }} />`}</code></pre>
          </section>

          {/* Props Reference */}
          <section id="props">
            <h2 className="text-2xl font-semibold text-avs-primary mb-4">{t('props.title')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full surface-primary border-primary border rounded-avs">
                <thead>
                  <tr className="border-b border-primary">
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('props.prop')}</th>
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('props.type')}</th>
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('props.default')}</th>
                    <th className="p-4 text-left font-semibold text-avs-primary">{t('props.description')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/50">
                    <td className="p-4 font-mono text-sm">className</td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">-</td>
                    <td className="p-4 text-sm text-avs-accent/70">Classes CSS additionnelles</td>
                  </tr>
                  <tr className="border-b border-primary/50">
                    <td className="p-4 font-mono text-sm">size</td>
                    <td className="p-4 text-sm">'sm' | 'md' | 'lg' | 'xl' | '2xl' | number</td>
                    <td className="p-4 text-sm">'md'</td>
                    <td className="p-4 text-sm text-avs-accent/70">Taille de l'icône (rem ou pixels)</td>
                  </tr>
                  <tr className="border-b border-primary/50">
                    <td className="p-4 font-mono text-sm">color</td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">'currentColor'</td>
                    <td className="p-4 text-sm text-avs-accent/70">Couleur SVG (hérite du texte par défaut)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-sm">...props</td>
                    <td className="p-4 text-sm">SVGProps&lt;SVGSVGElement&gt;</td>
                    <td className="p-4 text-sm">-</td>
                    <td className="p-4 text-sm text-avs-accent/70">Tous les props SVG natifs (onClick, aria-label, etc.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      }
      toc={[
        { id: 'installation', level: 2, label: t('toc.installation') },
        { id: 'react-components', level: 2, label: t('toc.react') },
        { id: 'css-classes', level: 2, label: t('toc.css') },
        { id: 'symbols', level: 2, label: t('toc.symbols') },
        { id: 'cultural', level: 2, label: t('toc.cultural') },
        { id: 'svg-import', level: 2, label: t('toc.svg') },
        { id: 'props', level: 2, label: t('toc.props') },
      ]}
    />
  );
}