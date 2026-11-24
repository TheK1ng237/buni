import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { CodeBlock } from '../../doc-primitives';
import { useTranslations } from '@/i18n';

export default function ColorPickerPage() {
  const t = useTranslations('documentation.colors.colorPicker');
  const toc: DocTocEntry[] = [
    { id: 'structure', label: t('toc.structure'), level: 2 },
    { id: 'filtrage', label: t('toc.filtering'), level: 2 },
    { id: 'custom', label: t('toc.custom'), level: 2 },
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
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="structure">{t('structure.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('structure.description')} <code className="font-mono text-xs bg-avs-accent/10 px-1.5 py-0.5 rounded">data.ts</code> :
            </p>
            <CodeBlock 
              id="combo-structure" 
              lang="typescript" 
              title="data.ts"
              code={`interface Combo {
  id: string;
  name: string;
  origin: string;
  description: string;
  patternCSS: string;
  colors: ComboColor[];
  accentClass: string;
  accentHex: string;
  region?: string;
  culture?: string;
  theme?: string;
}

interface ComboColor {
  role: 'primary' | 'secondary' | 'accent' | 'neutral';
  name: string;
  hex: string;
  meaning: string;
  origin: string;
  css: string;
}`}
            />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="filtrage">{t('filtering.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed mb-4">
              {t('filtering.description')}
            </p>
            <ul className="space-y-2 text-avs-accent/70">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-avs-primary" />
                <strong>{t('filtering.region')}</strong> : {t('filtering.regionValues')}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-avs-primary" />
                <strong>{t('filtering.culture')}</strong> : {t('filtering.cultureValues')}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-avs-primary" />
                <strong>{t('filtering.theme')}</strong> : {t('filtering.themeValues')}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-avs-accent mb-3" id="custom">{t('custom.title')}</h3>
            <p className="text-avs-accent/70 leading-relaxed">
              {t('custom.before')} <code className="font-mono text-xs bg-avs-accent/10 px-1.5 py-0.5 rounded">CustomPaletteBuilder</code> {t('custom.after')}
            </p>
          </div>
        </div>
      }

      toc={toc}
      prev={{ href: '/documentation/couleurs/introduction', title: t('prev') }}
      next={{ href: '/documentation/couleurs/integration', title: t('next') }}
    />
  );
}
