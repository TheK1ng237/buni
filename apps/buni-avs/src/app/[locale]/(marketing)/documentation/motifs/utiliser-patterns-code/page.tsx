import { useTranslations } from '@/i18n';
import { DocPageTemplate } from '../../doc-page-template';
import { CodeBlock } from '../../doc-primitives';

export default function UtiliserPatternsCode() {
  const t = useTranslations('documentation.motifs.useCode');

  return (
    <DocPageTemplate
      space={{ label: t('space'), color: '#D4A017', icon: 'th-large' }}
      title={t('title')}
      summary={t('summary')}
      explanation={
        <div>
          <p className="mb-6">{t('why')}</p>

          <h3 className="mb-3 text-lg font-bold">{t('installation')}</h3>
          <CodeBlock
            id="install-patterns"
            lang="bash"
            title={t('installation')}
            code={`npm install @buni-design/patterns
yarn add @buni-design/patterns
pnpm add @buni-design/patterns`}
          />

          <h3 className="mb-3 text-lg font-bold">{t('cssImport')}</h3>
          <p className="mb-4">{t('cssImportDescription')}</p>
          <CodeBlock id="css-import" lang="css" code={`@import '@buni-design/patterns/css';`} />

          <h3 className="mb-3 text-lg font-bold">{t('tailwind')}</h3>
          <p className="mb-4">{t('tailwindDescription')}</p>
          <CodeBlock
            id="direct-tailwind"
            lang="tsx"
            code={`<div className="ndop h-20 w-full" />
<div className="kente h-32 w-32 rounded-full" />
<div className="bogolan h-16 w-full opacity-20" />

<section className="ndop relative min-h-screen">
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 p-8">
    <h1 className="text-white">Page title</h1>
  </div>
</section>`}
          />

          <h3 className="mb-3 text-lg font-bold">{t('optionalImport')}</h3>
          <p className="mb-4">{t('optionalImportDescription')}</p>
          <CodeBlock
            id="import-patterns"
            lang="tsx"
            code={`import { kente, ndop, bogolan } from '@buni-design/patterns';

<div className={\`\${kente} h-48\`} />
<section className={ndop}>
  <h1>Page title</h1>
</section>
<div className={\`\${bogolan} opacity-30 rounded-xl\`}>
  <p>Page content</p>
</div>`}
          />

          <div className="bg-avs-kente/5 border border-avs-kente/20 rounded-xl p-6 my-6">
            <h4 className="text-avs-kente mb-4">{t('availableClasses')}</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>kente</strong> — {t('classes.kente')}</li>
              <li><strong>bogolan</strong> — {t('classes.bogolan')}</li>
              <li><strong>adinkra</strong> — {t('classes.adinkra')}</li>
              <li><strong>ndebele</strong> — {t('classes.ndebele')}</li>
              <li><strong>ndop</strong> — {t('classes.ndop')}</li>
              <li><strong>wax</strong> — {t('classes.wax')}</li>
              <li><strong>kuba</strong> — {t('classes.kuba')}</li>
              <li><strong>berber</strong> — {t('classes.berber')}</li>
            </ul>
          </div>

          <h3 className="mb-3 text-lg font-bold">{t('customization')}</h3>
          <CodeBlock
            id="tailwind-examples"
            lang="tsx"
            code={`<div className="bogolan opacity-10" />
<div className="kente opacity-20 mix-blend-multiply" />
<div className="ndop opacity-15 animate-pulse" />
<div className="wax opacity-25 grayscale hover:grayscale-0 transition-all" />
<div className="kente h-12 w-12 rounded-full" />
<div className="ndop h-8 w-full rounded-lg" />`}
          />
        </div>
      }
      bestPractices={
        <ul className="list-disc pl-5 space-y-2">
          <li>{t('bestPractices.performance')}</li>
          <li>{t('bestPractices.accessibility')}</li>
          <li>{t('bestPractices.mobile')}</li>
          <li>{t('bestPractices.contrast')}</li>
          <li>{t('bestPractices.css')}</li>
        </ul>
      }
      interactive={
        <div>
          <h4 className="mb-4 text-lg font-bold">{t('completeExample')}</h4>
          <CodeBlock
            id="complete-example"
            lang="tsx"
            code={`export function HeroSection() {
  return (
    <section className="ndop relative min-h-screen">
      <div className="absolute inset-0 bg-avs-accent/10" />
      <div className="relative z-10 px-6 py-24">
        <h1 className="font-display text-5xl font-bold text-avs-accent">
          Page title
        </h1>
        <p className="mt-4 text-xl text-avs-accent/70">
          Page content
        </p>
        <button className="mt-8 bg-avs-primary text-avs-secondary px-6 py-3 rounded-lg">
          Action
        </button>
      </div>
    </section>
  );
}`}
          />
        </div>
      }
      prev={{ href: '/documentation/motifs/intro', title: t('prev') }}
      next={{ href: '/documentation/motifs/ndop-bamoum', title: t('next') }}
    />
  );
}
