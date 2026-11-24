'use client';

import { useCopy, CodeBlock } from '../../doc-primitives';
import { DocPageTemplate, type DocTocEntry } from '../../doc-page-template';
import { useTranslations } from '@/i18n';

const PALETTE = [
  { name: 'avs-primary', hex: '#C0573E', key: 'primary' },
  { name: 'avs-secondary', hex: '#F5EBE0', key: 'secondary' },
  { name: 'avs-accent', hex: '#1D1D1B', key: 'accent' },
  { name: 'avs-kente', hex: '#D4A017', key: 'kente' },
  { name: 'avs-ndop', hex: '#4A6741', key: 'ndop' },
  { name: 'avs-indigo', hex: '#2A4A6B', key: 'indigo' },
  { name: 'avs-earth', hex: '#8B4513', key: 'earth' },
  { name: 'avs-raffia', hex: '#C8A96E', key: 'raffia' },
];

function PaletteGrid() {
  const t = useTranslations('documentation.colors.palette');
  const { copied, copy } = useCopy();
  return (
    <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {PALETTE.map(({ name, hex, key }) => (
        <button
          key={name}
          onClick={() => void copy(hex, name)}
          className="group overflow-hidden rounded-xl border border-avs-accent/9 text-left shadow-avs transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative h-16" style={{ background: hex }}>
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[10px] font-bold text-avs-secondary drop-shadow">{copied === name ? `✓ ${t('copied')}` : t('copyHex')}</span>
            </div>
          </div>
          <div className="bg-avs-secondary p-2.5">
            <p className="font-mono text-[9px] text-avs-accent/70">{hex}</p>
            <p className="mt-0.5 text-[11px] font-bold text-avs-accent">{t(`${key}.label`)}</p>
            <p className="mt-0.5 font-mono text-[8px] text-avs-accent/70">{name}</p>
            <p className="mt-0.5 text-[8px] italic text-avs-accent/65">{t(`${key}.origin`)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function PalettePrincipalePage() {
  const t = useTranslations('documentation.colors.palette');
  const toc: DocTocEntry[] = [
    { id: 'explication', label: t('toc.palette'), level: 2 },
    { id: 'exemples', label: t('toc.css'), level: 2 },
  ];

  return (
    <DocPageTemplate
      space={{ label: t('space'), color: '#8B4513', icon: 'palette' }}
      title={t('title')}
      summary={t('summary')}
      explanation={<PaletteGrid />}
      interactive={
        <CodeBlock id="css-vars" lang="css" title="avs-tokens.css" code={`:root {
  --avs-primary:   #C0573E;
  --avs-secondary: #F5EBE0;
  --avs-accent:    #1D1D1B;
  --avs-kente:     #D4A017;
  --avs-ndop:      #4A6741;
  --avs-indigo:    #2A4A6B;
  --avs-earth:     #8B4513;
  --avs-raffia:    #C8A96E;
}`} />
      }
      toc={toc}
      prev={{ href: '/documentation/motifs/bogolan-fanga', title: t('prev') }}
      next={{ href: '/documentation/tokens/reference', title: t('next') }}
    />
  );
}