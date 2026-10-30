'use client';

// =============================================================================
// AVS — Composant SvgPattern
// Affiche un aperçu CSS et propose le SVG vectoriel généré par le backend :
//   - Fond de page/section
//   - Téléchargement direct
//   - Animation Framer Motion
//
// USAGE :
//   <SvgPattern name="ndop-bamoum" />
//   <SvgPattern name="toghu-bamileke" size={200} animated />
//   <SvgPattern name="kente-asante" asBackground className="h-64" />
//   <SvgPattern name="bogolan-malien" showDownload />
// =============================================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Info } from 'lucide-react';
import { apiClient } from '@buni/api';
import {
  SVG_REGISTRY,
  getSvgMeta,
  generatePaletteJson,
  type SvgPatternKey,
} from '@buni/patterns';

// ── Types ──────────────────────────────────────────────────────────────────────
interface SvgPatternProps {
  /** Clé du motif dans SVG_REGISTRY */
  name:           SvgPatternKey;
  /** Taille en px (carré) — défaut 256 */
  size?:          number;
  /** Afficher comme fond de conteneur au lieu d'une image */
  asBackground?:  boolean;
  /** Activer l'animation Framer Motion */
  animated?:      boolean;
  /** Afficher le bouton de téléchargement */
  showDownload?:  boolean;
  /** Afficher les infos culturelles au survol */
  showInfo?:      boolean;
  /** Classes CSS additionnelles */
  className?:     string;
  /** Alt text pour l'accessibilité */
  alt?:           string;
  /** Opacité du motif (0–1) */
  opacity?:       number;
  /** Répétition (tile) ou stretch */
  repeat?:        boolean;
  /** Callback au clic */
  onClick?:       () => void;
}

function saveBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

async function downloadSvg(key: SvgPatternKey, filename: string) {
  const response = await apiClient.get<Blob>(
    `/api/v1/patterns/${encodeURIComponent(SVG_REGISTRY[key].downloadSlug)}/download`,
    { responseType: 'blob' }
  );
  saveBlob(response.data, filename);
}

// ── Composant principal ───────────────────────────────────────────────────────
export function SvgPattern({
  name,
  size        = 256,
  asBackground = false,
  animated    = false,
  showDownload = false,
  showInfo    = false,
  className   = '',
  alt,
  opacity     = 1,
  repeat      = false,
  onClick,
}: SvgPatternProps) {
  const meta    = getSvgMeta(name);
  const [info,  setInfo]  = useState(false);
  const [dlDone,setDlDone]= useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  const altText = alt ?? `Motif ${meta.name} — ${meta.origin}`;

  // ── Mode background ────────────────────────────────────────────────────────
  if (asBackground) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ opacity }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
        aria-label={onClick ? `Voir ${meta.name}` : undefined}
      >
        {/* CSS preview; the downloadable vector comes from the backend. */}
        <div
          className={`absolute inset-0 ${meta.preview}`}
          style={{ backgroundSize: repeat ? 'auto' : undefined }}
          aria-hidden
        />
        {/* Dégradé de sortie */}
        <div className="absolute inset-0 bg-gradient-to-t from-avs-accent/80 via-transparent to-transparent" aria-hidden />
      </div>
    );
  }

  // ── Mode image ─────────────────────────────────────────────────────────────
  const imageContent = (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-avs-lg border border-avs-accent/10 ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      <div
        className={`h-full w-full ${meta.preview}`}
        role="img"
        aria-label={altText}
      />

      {/* Overlay info au survol */}
      {showInfo && info && (
        <div className="absolute inset-0 flex flex-col justify-end bg-avs-accent/80 p-3 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-avs-primary">{meta.type}</p>
          <p className="text-sm font-bold text-avs-secondary">{meta.name}</p>
          <p className="text-xs text-avs-secondary/65">{meta.origin}</p>
          <p className="mt-1 text-[10px] text-avs-secondary/50 line-clamp-2">{meta.description}</p>
          <div className="mt-2 flex gap-1">
            {meta.colors.map(c => (
              <span key={c} className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      {(showDownload || showInfo) && (
        <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {showInfo && (
            <button
              onClick={e => { e.stopPropagation(); setInfo(v => !v); }}
              className="flex h-7 w-7 items-center justify-center rounded-avs bg-avs-secondary/90 text-avs-accent shadow-sm hover:bg-avs-secondary"
              aria-label={info ? 'Masquer les infos' : 'Afficher les infos'}
            >
              <Info size={13} />
            </button>
          )}
          {showDownload && (
            <button
              onClick={e => {
                e.stopPropagation();
                if (downloading) return;
                setDownloading(true);
                setDownloadError(false);
                void downloadSvg(name, `avs-${name}.svg`)
                  .then(() => {
                    setDlDone(true);
                    setTimeout(() => setDlDone(false), 2000);
                  })
                  .catch(error => {
                    console.error(`Unable to download SVG pattern ${name}:`, error);
                    setDownloadError(true);
                  })
                  .finally(() => setDownloading(false));
              }}
              disabled={downloading}
              className="flex h-7 w-7 items-center justify-center rounded-avs bg-avs-primary text-avs-secondary shadow-sm hover:bg-avs-primary/90 disabled:opacity-50"
              aria-label={downloading ? 'Téléchargement en cours' : 'Télécharger le SVG'}
            >
              <Download size={13} />
            </button>
          )}
        </div>
      )}

      {dlDone && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-avs bg-green-600 px-3 py-1 text-[10px] font-bold text-white shadow">
          Téléchargé ✓
        </div>
      )}
      {downloadError && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-avs bg-red-700 px-3 py-1 text-[10px] font-bold text-white shadow" role="status">
          Échec du téléchargement
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        className="group"
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
        {imageContent}
      </motion.div>
    );
  }

  return (
    <div className="group" onClick={onClick} role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? e => { if (e.key === 'Enter') onClick(); } : undefined}>
      {imageContent}
    </div>
  );
}

// =============================================================================
// SvgPatternGrid — Affiche une grille de motifs SVG
// =============================================================================
interface SvgPatternGridProps {
  patterns:    SvgPatternKey[];
  columns?:    2 | 3 | 4;
  size?:       number;
  animated?:   boolean;
  showInfo?:   boolean;
  showDownload?: boolean;
  onSelect?:   (key: SvgPatternKey) => void;
  className?:  string;
}

export function SvgPatternGrid({
  patterns,
  columns   = 3,
  size      = 200,
  animated  = true,
  showInfo  = true,
  showDownload = true,
  onSelect,
  className = '',
}: SvgPatternGridProps) {
  const colClass = { 2:'grid-cols-2', 3:'grid-cols-2 sm:grid-cols-3', 4:'grid-cols-2 sm:grid-cols-4' }[columns];

  return (
    <div className={`grid gap-4 ${colClass} ${className}`}>
      {patterns.map((key, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <SvgPattern
            name={key}
            size={size}
            animated={animated}
            showInfo={showInfo}
            showDownload={showDownload}
            onClick={onSelect ? () => onSelect(key) : undefined}
            className="w-full h-full"
          />
          <p className="mt-1.5 text-center text-xs font-semibold text-avs-accent truncate">
            {SVG_REGISTRY[key].name}
          </p>
          <p className="text-center text-[10px] text-avs-accent/45 truncate">
            {SVG_REGISTRY[key].origin}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// SvgPatternHero — Section hero avec SVG en fond animé
// =============================================================================
interface SvgPatternHeroProps {
  name:        SvgPatternKey;
  title:       string;
  subtitle?:   string;
  children?:   React.ReactNode;
  className?:  string;
  overlayOpacity?: number;
}

export function SvgPatternHero({
  name,
  title,
  subtitle,
  children,
  className   = '',
  overlayOpacity = 0.75,
}: SvgPatternHeroProps) {
  return (
    <section className={`relative overflow-hidden ${className}`} aria-label={`Section ${title}`}>
      {/* SVG fond animé */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <div className={`h-full w-full ${SVG_REGISTRY[name].preview}`} />
      </motion.div>

      {/* Overlay dégradé */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(29,29,27,${overlayOpacity})` }}
        aria-hidden
      />

      {/* Contenu */}
      <div className="relative px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-avs-primary mb-3">
            {SVG_REGISTRY[name].origin}
          </p>
          <h2 className="font-display text-4xl font-bold text-avs-secondary sm:text-5xl">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-lg text-avs-secondary/65 leading-relaxed">{subtitle}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// SvgDownloadCard — Carte de téléchargement avec préview + formats
// =============================================================================
export function SvgDownloadCard({ name }: { name: SvgPatternKey }) {
  const meta = getSvgMeta(name);
  const [downloading, setDownloading] = useState<'svg' | 'json' | null>(null);
  const [downloaded, setDownloaded] = useState<'svg' | 'json' | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const dl = async (format: 'svg' | 'json') => {
    setDownloading(format);
    setDownloaded(null);
    setDownloadError(null);
    try {
      if (format === 'svg') {
        await downloadSvg(name, `avs-${name}.svg`);
      } else {
        const paletteJson = JSON.stringify({
          key: name,
          name: meta.name,
          colors: meta.colors,
          type: meta.type,
          origin: meta.origin,
        }, null, 2);
        saveBlob(new Blob([paletteJson], { type: 'application/json' }), `avs-${name}-palette.json`);
      }
      setDownloaded(format);
    } catch (error) {
      console.error(`Unable to download ${format} pattern ${name}:`, error);
      setDownloadError(`Échec du téléchargement ${format.toUpperCase()}. Réessayez.`);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="avs-card overflow-hidden p-0">
      {/* Aperçu SVG */}
      <div className="relative h-44 bg-avs-accent/5" role="img" aria-label={`Aperçu ${meta.name}`}>
        <div className={`h-full w-full ${meta.preview}`} />
      </div>

      {/* Infos */}
      <div className="p-5">
        <p className="font-display font-bold text-avs-accent">{meta.name}</p>
        <p className="text-xs text-avs-primary font-semibold mt-0.5">{meta.type.toUpperCase()} · {meta.origin}</p>
        <p className="mt-2 text-xs text-avs-accent/55 leading-snug">{meta.description}</p>

        {/* Palette */}
        <div className="mt-3 flex gap-1.5">
          {meta.colors.map(c => (
            <span key={c} className="h-5 w-5 rounded-full border border-avs-accent/15 shadow-sm" style={{ backgroundColor: c }} title={c} />
          ))}
        </div>

        {/* Boutons téléchargement */}
        <div className="mt-4 flex gap-2">
          {(['svg','json'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => void dl(fmt)}
              disabled={!!downloading}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-avs py-2 text-xs font-bold transition-all ${
                fmt === 'svg'
                  ? 'bg-avs-primary text-avs-secondary shadow-avs hover:-translate-y-0.5 hover:shadow-avs-md'
                  : 'border border-avs-accent/20 text-avs-accent hover:border-avs-primary hover:text-avs-primary'
              } disabled:opacity-60`}
            >
              <Download size={11} aria-hidden />
              {downloading === fmt
                ? 'Téléchargement…'
                : downloaded === fmt
                  ? 'Téléchargé ✓'
                  : fmt.toUpperCase()}
            </button>
          ))}
        </div>
        {downloadError && (
          <p className="mt-2 text-xs text-red-700" role="alert">{downloadError}</p>
        )}

        {/* Licence */}
        <p className="mt-3 text-[10px] text-avs-accent/35">
          Licence : {meta.license.toUpperCase()} · AVS Standard
        </p>
      </div>
    </div>
  );
}

export default SvgPattern;