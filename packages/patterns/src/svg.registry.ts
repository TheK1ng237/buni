import { PATTERN_CATALOG } from './catalog';
import type { PatternType } from './registry';

export const SVG_REGISTRY = Object.fromEntries(
  PATTERN_CATALOG.map((pattern) => [
    pattern.type,
    {
      ...pattern,
      key: pattern.type,
      downloadSlug: pattern.id,
      preview: pattern.cssClass,
      description: `Motif ${pattern.name} — ${pattern.origin}`,
      license: 'cc-by',
    },
  ])
) as {
  [T in (typeof PATTERN_CATALOG)[number]['type']]: (typeof PATTERN_CATALOG)[number] & {
    key: T;
    downloadSlug: string;
    preview: string;
    description: string;
    license: string;
  };
};

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type SvgPatternKey =
  keyof typeof SVG_REGISTRY;

export type SvgPatternMeta =
  typeof SVG_REGISTRY[SvgPatternKey];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

export function getSvgMeta(
  key: SvgPatternKey
): SvgPatternMeta {
  return SVG_REGISTRY[key];
}

export function isSvgPatternKey(
  value: string
): value is SvgPatternKey {
  return value in SVG_REGISTRY;
}

export function getPatternPreviewClass(
  type: PatternType
): string {
  return SVG_REGISTRY[type].preview;
}