// =============================================================================
// AVS / BUNI — Pattern Registry (SOURCE OF TRUTH)
// =============================================================================

/**
 * Pattern types (canonique)
 */
export const PATTERN_TYPES = [
  'kente',
  'bogolan',
  'adinkra',
  'ndebele',
  'ndop',
  'wax',
  'kuba',
  'berber',
] as const;

export const PATTERN_STATUS=[
  'published',
  'draft',
  'review',
  
] as const;

export type PatternStatus = typeof PATTERN_STATUS[number];

export type PatternType = typeof PATTERN_TYPES[number];

/**
 * Regions (canonique)
 */
export const REGIONS = [
  'west-africa',
  'east-africa',
  'central-africa',
  'north-africa',
  'south-africa',
  'diaspora',
] as const;

export type RegionType = typeof REGIONS[number];

/**
 * Licenses
 */
export const PATTERN_LICENSES = [
  'cc0',
  'cc-by',
  'cc-by-sa',
  'proprietary',
] as const;

export type PatternLicense = typeof PATTERN_LICENSES[number];


/**
 * CSS mapping (UI concern but stable registry)
 * NOTE: Maintenant utilise les noms courts directs (kente, ndop, etc.)
 * Les classes complètes (avs-pattern-*) sont toujours disponibles pour compatibilité
 */
export const CSS_PATTERN_MAP = {
  kente: 'kente',
  bogolan: 'bogolan',
  adinkra: 'adinkra',
  ndebele: 'ndebele',
  ndop: 'ndop',
  wax: 'wax',
  kuba: 'kuba',
  berber: 'berber',
} as const satisfies Record<PatternType, string>;

export const PATTERN_CSS_CLASSES = [
  ...Object.values(CSS_PATTERN_MAP),
  'kente-etoile',
  'ndop-ceremoniel',
  'bogolan-terre',
  'wax-lagos',
] as const;

export type PatternCssClass = (typeof PATTERN_CSS_CLASSES)[number];

export function isPatternCssClass(value: string): value is PatternCssClass {
  return (PATTERN_CSS_CLASSES as readonly string[]).includes(value);
}

/**
 * fallback safe class
 */
export const FALLBACK_PATTERN_CSS = 'wax';

/**
 * helper runtime guard (important for monorepo stability)
 */
export function isPatternType(value: string): value is PatternType {
  return (PATTERN_TYPES as readonly string[]).includes(value);
}

export function isRegion(value: string): value is RegionType {
  return (REGIONS as readonly string[]).includes(value);
}

export function isPatternLicense(value: string): value is PatternLicense {
  return (PATTERN_LICENSES as readonly string[]).includes(value);
}