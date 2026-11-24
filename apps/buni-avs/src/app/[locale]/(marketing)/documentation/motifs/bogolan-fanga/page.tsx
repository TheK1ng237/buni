import type { Metadata } from 'next';
import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { MotifSheet, type MotifData } from '../../motif-sheet';
import { useTranslations } from '@/i18n';

export const metadata: Metadata = { title: 'Bogolan Fanga', description: 'Origine, symbolique et usages du motif Bogolan.' };

export default function BogolanFangaPage() {
  const t = useTranslations('documentation.motifs.bogolanFanga');
  const motif: MotifData = {
    name: t('title'),
    pattern: 'avs-pattern-bogolan-fanga',
    origin: t('origin'),
    ethnicGroup: t('ethnicGroup'),
    country: t('country'),
    region: t('region'),
    meaning: t('meaning'),
    uses: [t('uses.hunting'), t('uses.contemporary'), t('uses.rites')],
    symbolism: t('symbolism'),
    history: t('history'),
    variants: [
      { name: t('variants.classic.title'), pattern: 'avs-pattern-bogolan-fanga', note: t('variants.classic.note') },
      { name: t('variants.reverse.title'), pattern: 'avs-pattern-bogolan-fanga', note: t('variants.reverse.note') },
    ],
    bibliography: [{ author: 'Rovine, V.', work: 'Bogolan: Shaping Culture through Cloth', year: '2001' }],
  };
  const toc: DocTocEntry[] = [{ id: 'exemples', label: t('toc'), level: 2 }];

  return (
    <DocPageTemplate
      space={{ label: t('space'), color: '#D4A017', icon: 'th-large' }}
      title={t('title')}
      summary={t('summary')}
      explanation={<p>{t('explanation')}</p>}
      interactive={<MotifSheet motif={motif} />}
      toc={toc}
      prev={{ href: '/documentation/motifs/kente-royale', title: t('prev') }}
      next={{ href: '/documentation/couleurs/palette-principale', title: t('next') }}
    />
  );
}