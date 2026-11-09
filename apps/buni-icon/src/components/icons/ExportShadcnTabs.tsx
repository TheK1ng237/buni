'use client';

import * as React from 'react';
import type { BuniIconMeta } from '@buni/icons-data';
import { getIconifyName, getJsxSnippet } from '@buni/icon-react';
import { useToast } from '@buni/ui';
import { Copy, Check, Download, Terminal, Code2, FileCode, FileJson, Image as ImageIcon } from 'lucide-react';

interface ExportShadcnTabsProps {
  icon: BuniIconMeta;
  colorHex?: string;
  strokeWidth?: number;
}

type TabKey = 'svg' | 'jsx' | 'iconify' | 'json' | 'png';

export function ExportShadcnTabs({
  icon,
  colorHex = '#C0573E',
  strokeWidth = 1.75,
}: ExportShadcnTabsProps) {
  const { add } = useToast();
  const [activeTab, setActiveTab] = React.useState<TabKey>('svg');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const iconifyName = getIconifyName(icon.slug);
  const jsxCode = getJsxSnippet(icon.slug);
  const jsonMetadata = JSON.stringify(
    {
      slug: icon.slug,
      nameFr: icon.nameFr,
      nameEn: icon.nameEn,
      family: icon.family,
      tags: icon.tags,
      country: icon.country,
      people: icon.people,
      culturalNote: icon.culturalNote,
      verifiedBy: icon.verifiedBy,
      license: icon.license,
    },
    null,
    2
  );

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(activeTab);
      add({
        variant: 'success',
        title: 'Copié !',
        message: `${label} copié dans votre presse-papier.`,
        duration: 2500,
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      //
    }
  };

  const downloadSvgFile = () => {
    const blob = new Blob([icon.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buni-${icon.slug}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    add({
      variant: 'success',
      title: 'Téléchargement lancé',
      message: `Fichier buni-${icon.slug}.svg enregistré.`,
      duration: 2500,
    });
  };

  const downloadPngFile = () => {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Remplacer currentColor par la couleur choisie pour l'export PNG
    const tintedSvg = icon.svg
      .replace(/currentColor/g, colorHex)
      .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);

    const img = new Image();
    const svgBlob = new Blob([tintedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const URLObject = window.URL || window.webkitURL || window;
    const url = URLObject.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `buni-${icon.slug}.png`;
      a.click();
      URLObject.revokeObjectURL(url);
      add({
        variant: 'success',
        title: 'PNG généré',
        message: `Image PNG haute résolution (512x512) téléchargée.`,
        duration: 2500,
      });
    };
    img.src = url;
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'svg', label: 'SVG Brut', icon: <FileCode size={14} /> },
    { key: 'jsx', label: 'React JSX', icon: <Code2 size={14} /> },
    { key: 'iconify', label: 'Iconify', icon: <Terminal size={14} /> },
    { key: 'json', label: 'JSON Meta', icon: <FileJson size={14} /> },
    { key: 'png', label: 'PNG HD', icon: <ImageIcon size={14} /> },
  ];

  const currentContent = {
    svg: icon.svg,
    jsx: jsxCode,
    iconify: iconifyName,
    json: jsonMetadata,
    png: `Export haute définition PNG (512×512) avec pigment personnalisé (${colorHex}). Prêt pour Figma, Canva et présentations.`,
  }[activeTab];

  return (
    <div className="avs-card overflow-hidden">
      {/* Header bar with tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-avs-accent/10 bg-avs-accent/5 px-4 py-2 gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-avs text-xs font-mono font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-avs-secondary text-avs-primary shadow-avs border border-avs-accent/10'
                  : 'text-avs-accent/60 hover:text-avs-accent hover:bg-avs-accent/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {activeTab === 'svg' && (
            <button
              onClick={downloadSvgFile}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-avs border border-avs-accent/15 hover:border-avs-primary hover:text-avs-primary transition-colors"
              title="Télécharger le fichier .svg"
            >
              <Download size={13} />
              <span>.svg</span>
            </button>
          )}

          {activeTab === 'png' ? (
            <button
              onClick={downloadPngFile}
              className="avs-btn-primary !py-1 !px-3 !text-xs font-mono flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Télécharger PNG</span>
            </button>
          ) : (
            <button
              onClick={() => copyToClipboard(currentContent, tabs.find(t => t.key === activeTab)?.label ?? '')}
              className="avs-btn-primary !py-1 !px-3 !text-xs font-mono flex items-center gap-1.5"
            >
              {copiedKey === activeTab ? (
                <>
                  <Check size={13} className="text-white" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copier le code</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code preview area */}
      <div className="relative p-4 bg-avs-accent/90 text-avs-secondary font-mono text-xs overflow-x-auto max-h-72 selection:bg-avs-primary/40 selection:text-white">
        <pre className="whitespace-pre-wrap leading-relaxed">
          <code>{currentContent}</code>
        </pre>
      </div>
    </div>
  );
}

