import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { CodeBlock } from '../../doc-primitives';
import { useTranslations } from '@/i18n';

export default function IntegrationPage() {
  const t = useTranslations('documentation.colors.integration');
  const toc: DocTocEntry[] = [
    { id: 'css', label: t('toc.css'), level: 2 },
    { id: 'tailwind', label: t('toc.tailwind'), level: 2 },
    { id: 'json', label: t('toc.json'), level: 2 },
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
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="css">{t('css.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('css.description')}
            </p>
            <CodeBlock 
              id="css-variables" 
              lang="css" 
              title="globals.css"
              code={`:root {
  --avs-primary: #C0573E;   /* primary · avs-primary */
  --avs-secondary: #F5EBE0; /* secondary · avs-secondary */
  --avs-accent: #1D1D1B;    /* accent · avs-accent */
  --avs-mist: #B0C4C8;      /* neutral · avs-mist */
}

/* Utilisation */
.button {
  background: var(--avs-primary);
  color: var(--avs-secondary);
}`}
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="tailwind">{t('tailwind.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('tailwind.description')}
            </p>
            <CodeBlock 
              id="tailwind-v4-config" 
              lang="css" 
              title="app.css"
              code={`@import "tailwindcss";

@theme {
  --color-avs-primary: #C0573E;
  --color-avs-secondary: #F5EBE0;
  --color-avs-accent: #1D1D1B;
  --color-avs-mist: #B0C4C8;
}

/* Utilisation */
<button class="bg-avs-primary text-avs-secondary">
${t('clickMe')}
</button>`}
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="json">{t('json.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('json.description')}
            </p>
            <CodeBlock 
              id="json-export" 
              lang="json" 
              title="avs-colors.json"
              code={`{
  "primary": {
    "name": "avs-primary",
    "hex": "#C0573E",
    "css": "--avs-primary"
  },
  "secondary": {
    "name": "avs-secondary",
    "hex": "#F5EBE0",
    "css": "--avs-secondary"
  },
  "accent": {
    "name": "avs-accent",
    "hex": "#1D1D1B",
    "css": "--avs-accent"
  },
  "neutral": {
    "name": "avs-mist",
    "hex": "#B0C4C8",
    "css": "--avs-mist"
  }
}

// Utilisation
const colors = require('./avs-colors.json');
const primaryColor = colors.primary.hex;`}
            />
          </div>
        </div>
      }

      toc={toc}
      prev={{ href: '/documentation/couleurs/color-picker', title: t('prev') }}
      next={{ href: '/documentation/couleurs/design-system', title: t('next') }}
    />
  );
}
