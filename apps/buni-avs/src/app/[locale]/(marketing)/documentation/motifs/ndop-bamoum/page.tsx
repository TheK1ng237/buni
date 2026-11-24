import type { Metadata } from 'next';
import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { MotifSheet, type MotifData } from '../../motif-sheet';
import { Callout } from '../../doc-primitives';
import { useTranslations } from '@/i18n';

export const metadata: Metadata = {
  title: 'Ndop Bamoum',
  description: 'Origine, symbolique et usages du motif Ndop Bamoum — documentation African Visual System.',
};

export default function NdopBamoumPage() {
  const t = useTranslations('documentation.motifs.ndopBamoum');
  const motif: MotifData = {
    name: t('title'),
    pattern: 'avs-pattern-ndop-sultan',
    origin: t('origin'),
    ethnicGroup: t('ethnicGroup'),
    country: t('country'),
    region: t('region'),
    meaning: t('meaning'),
    uses: [t('uses.court'), t('uses.ceremonial'), t('uses.manuscripts'), t('uses.architecture')],
    symbolism: t('symbolism'),
    history: t('history'),
    variants: [
      { name: t('variants.royal.title'), pattern: 'avs-pattern-ndop-sultan', note: t('variants.royal.note') },
      { name: t('variants.civil.title'), pattern: 'avs-pattern-ndop-sultan', note: t('variants.civil.note') },
      { name: t('variants.funeral.title'), pattern: 'avs-pattern-ndop-sultan', note: t('variants.funeral.note') },
    ],
    bibliography: [
      { author: 'Geary, C.', work: 'Images from Bamum', year: '1988' },
      { author: 'Njoya, I.', work: 'Histoire et coutumes des Bamum', year: '1952' },
    ],
  };
  const toc: DocTocEntry[] = [
    { id: 'explication', label: t('toc.explanation'), level: 2 },
    { id: 'exemples', label: t('toc.examples'), level: 2 },
    { id: 'bonnes-pratiques', label: t('toc.practices'), level: 2 },
    { id: 'references-culturelles', label: t('toc.references'), level: 2 },
    { id: 'telechargements', label: t('toc.downloads'), level: 2 },
  ];

  return (
    <DocPageTemplate
      space={{ label: t('space'), color: '#D4A017', icon: 'th-large' }}
      title={t('title')}
      summary={t('summary')}
      why={
        <p>
          {t('why')}
        </p>
      }
      explanation={
        <>
          <p>{t('explanation')} <code>avs-pattern-ndop-sultan</code>.</p>
          <Callout type="tip" title={t('practiceTitle')}>
            {t('practice')}
          </Callout>
        </>
      }
      interactive={<MotifSheet motif={motif} />}
      bestPractices={
        <ul>
          <li>{t('bestPractices.opacity')}</li>
          <li>{t('bestPractices.credit')}</li>
        </ul>
      }
      pitfalls={
        <ul>
          <li>{t('pitfalls.civil')}</li>
          <li>{t('pitfalls.colors')}</li>
        </ul>
      }
      culturalRefs={<p>{t('culturalReferences')}</p>}
      downloads={[
        { label: t('downloadSvg'), href: '#', format: 'SVG' },
        { label: t('downloadPalette'), href: '#', format: 'JSON' },
      ]}
      toc={toc}
      prev={{ href: '/documentation/motifs/kente-royale', title: t('prev') }}
      next={{ href: '/documentation/motifs/bogolan-fanga', title: t('next') }}
    />
  );
}