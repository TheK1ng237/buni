import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { CodeBlock } from '../../doc-primitives';
import { useTranslations } from '@/i18n';

export default function DesignSystemPage() {
  const t = useTranslations('documentation.colors.designSystem');
  const toc: DocTocEntry[] = [
    { id: 'choisir', label: t('toc.choose'), level: 2 },
    { id: 'tokens', label: t('toc.tokens'), level: 2 },
    { id: 'variantes', label: t('toc.variants'), level: 2 },
    { id: 'composants', label: t('toc.components'), level: 2 },
    { id: 'documentation', label: t('toc.documentation'), level: 2 },
  ];

  return (
    <DocPageTemplate
      space={{ label: t('space'), color: '#C0573E', icon: 'palette' }}
      title={t('title')}
      summary={t('summary')}
      
      why={
        <p className="text-avs-accent/70 leading-relaxed">
          {t('why')}
        </p>
      }

      explanation={
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="choisir">{t('choose.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed">
              {t('choose.description')}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="tokens">{t('tokens.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('tokens.description')}
            </p>
            <CodeBlock 
              id="color-tokens" 
              lang="css" 
              title="globals.css"
              code={`:root {
  /* Brand Colors */
  --color-brand-primary: var(--avs-primary);
  --color-brand-secondary: var(--avs-secondary);
  
  /* UI Colors */
  --color-action-primary: var(--avs-primary);
  --color-action-secondary: var(--avs-secondary);
  --color-action-accent: var(--avs-accent);
  
  /* Feedback Colors */
  --color-success: var(--avs-primary);
  --color-warning: var(--avs-accent);
  --color-info: var(--avs-mist);
}`}
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="variantes">{t('variants.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('variants.description')}
            </p>
            <CodeBlock 
              id="color-variants" 
              lang="css" 
              title="globals.css"
              code={`:root {
  --avs-primary-50: #F5EBE0;
  --avs-primary-100: #E8D5C9;
  --avs-primary-200: #D4B8A6;
  --avs-primary-300: #C09B83;
  --avs-primary-400: #C0573E;  /* base */
  --avs-primary-500: #A84632;
  --avs-primary-600: #8B3A2A;
  --avs-primary-700: #6E2E22;
  --avs-primary-800: #522218;
  --avs-primary-900: #35160E;
}`}
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="composants">{t('components.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('components.description')}
            </p>
            <CodeBlock 
              id="component-usage" 
              lang="css" 
              title="components.css"
              code={`/* Button Component */
.btn-primary {
  background: var(--color-action-primary);
  color: var(--avs-secondary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}

.btn-primary:hover {
  background: var(--avs-primary-600);
}

/* Card Component */
.card {
  background: var(--avs-secondary);
  border: 1px solid var(--avs-primary-200);
  border-radius: 1rem;
}

.card-header {
  color: var(--avs-accent);
}`}
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="documentation">{t('documentation.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed">
              {t('documentation.description')}
            </p>
          </div>
        </div>
      }

      toc={toc}
      prev={{ href: '/documentation/couleurs/integration', title: t('prev') }}
      next={{ href: '/documentation/couleurs/palette-principale', title: t('next') }}
    />
  );
}
