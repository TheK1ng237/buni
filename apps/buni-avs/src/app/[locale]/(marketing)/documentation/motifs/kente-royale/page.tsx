import type { Metadata } from 'next';
import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { MotifSheet, type MotifData } from '../../motif-sheet';
import { useTranslations } from '@/i18n';

export const metadata: Metadata = { title: 'Kente Royale', description: 'Origine, symbolique et usages du motif Kente Royale.' };

export default function KenteRoyalePage() {
  const t = useTranslations('documentation.motifs.kenteRoyale');
  const motif: MotifData = {
    name: t('title'),
    pattern: 'avs-pattern-kente-royale',
    origin: t('origin'),
    ethnicGroup: 'Akan',
    country: t('country'),
    region: t('region'),
    meaning: t('meaning'),
    uses: [t('uses.ceremonial'), t('uses.wedding'), t('uses.regalia'), t('uses.diplomacy')],
    symbolism: t('symbolism'),
    history: t('history'),
    variants: [
      { name: 'Adweneasa', pattern: 'avs-pattern-kente-royale', note: t('variants.adweneasa') },
      { name: 'Oyokoman', pattern: 'avs-pattern-kente-royale', note: t('variants.oyokoman') },
      { name: 'Sika Fre Mogya', pattern: 'avs-pattern-kente-royale', note: t('variants.sikaFreMogya') },
    ],
    bibliography: [
      { author: 'Ross, D.', work: 'Wrapped in Pride: Ghanaian Kente', year: '1998' },
      { author: 'Boateng, B.', work: 'The Copyright Thing Doesn’t Work Here', year: '2011' },
    ],
  };
  const toc: DocTocEntry[] = [
    { id: 'exemples', label: t('toc.sheet'), level: 2 },
    { id: 'bonnes-pratiques', label: t('toc.practices'), level: 2 },
  ];

  return (
    <DocPageTemplate
      space={{ label: t('space'), color: '#D4A017', icon: 'th-large' }}
      title={t('title')}
      summary={t('summary')}
      explanation={<p>{t('explanation')}</p>}
      interactive={<MotifSheet motif={motif} />}
      bestPractices={<p>{t('practice')}</p>}
      toc={toc}
      prev={{ href: '/documentation/motifs/ndop-bamoum', title: t('prev') }}
      next={{ href: '/documentation/motifs/bogolan-fanga', title: t('next') }}
    />
  );
}