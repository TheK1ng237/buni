// ONLY UI / FORM CONFIG (no domain duplication)

import { REGIONS, PATTERN_TYPES, PatternOrigin, PatternSymbolism, PatternColor, PatternSymbol } from '@buni/patterns';

// ─────────────────────────────────────────────────────────────
// REGIONS & TYPES (re-exported from @buni/patterns)
// ─────────────────────────────────────────────────────────────

export { REGIONS, PATTERN_TYPES };

// ─────────────────────────────────────────────────────────────
// COUNTRIES & FLAGS
// ─────────────────────────────────────────────────────────────

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  region?: string;
}

export const AFRICAN_COUNTRIES: CountryOption[] = [
  { code: 'DZ', name: 'Algérie', flag: '🇩🇿', region: 'Afrique du Nord' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', region: 'Afrique Centrale' },
  { code: 'BJ', name: 'Bénin', flag: '🇧🇯', region: 'Afrique de l\'Ouest' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', region: 'Afrique Australe' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', region: 'Afrique de l\'Ouest' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', region: 'Afrique de l\'Est' },
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲', region: 'Afrique Centrale' },
  { code: 'CV', name: 'Cap-Vert', flag: '🇨🇻', region: 'Afrique de l\'Ouest' },
  { code: 'CF', name: 'République Centrafricaine', flag: '🇨🇫', region: 'Afrique Centrale' },
  { code: 'TD', name: 'Tchad', flag: '🇹🇩', region: 'Afrique Centrale' },
  { code: 'KM', name: 'Comores', flag: '🇰🇲', region: 'Afrique de l\'Est' },
  { code: 'CG', name: 'Congo-Brazzaville', flag: '🇨🇬', region: 'Afrique Centrale' },
  { code: 'CD', name: 'Congo (RD Congo)', flag: '🇨🇩', region: 'Afrique Centrale' },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', region: 'Afrique de l\'Ouest' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', region: 'Afrique de l\'Est' },
  { code: 'EG', name: 'Égypte', flag: '🇪🇬', region: 'Afrique du Nord' },
  { code: 'GQ', name: 'Guinée Équatoriale', flag: '🇬🇶', region: 'Afrique Centrale' },
  { code: 'ER', name: 'Érythrée', flag: '🇪🇷', region: 'Afrique de l\'Est' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', region: 'Afrique Australe' },
  { code: 'ET', name: 'Éthiopie', flag: '🇪🇹', region: 'Afrique de l\'Est' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', region: 'Afrique Centrale' },
  { code: 'GM', name: 'Gambie', flag: '🇬🇲', region: 'Afrique de l\'Ouest' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Afrique de l\'Ouest' },
  { code: 'GN', name: 'Guinée', flag: '🇬🇳', region: 'Afrique de l\'Ouest' },
  { code: 'GW', name: 'Guinée-Bissau', flag: '🇬🇼', region: 'Afrique de l\'Ouest' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Afrique de l\'Est' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', region: 'Afrique Australe' },
  { code: 'LR', name: 'Libéria', flag: '🇱🇷', region: 'Afrique de l\'Ouest' },
  { code: 'LY', name: 'Libye', flag: '🇱🇾', region: 'Afrique du Nord' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', region: 'Afrique de l\'Est' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', region: 'Afrique de l\'Est' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', region: 'Afrique de l\'Ouest' },
  { code: 'MR', name: 'Mauritanie', flag: '🇲🇷', region: 'Afrique de l\'Ouest' },
  { code: 'MU', name: 'Maurice', flag: '🇲🇺', region: 'Afrique de l\'Est' },
  { code: 'MA', name: 'Maroc', flag: '🇲🇦', region: 'Afrique du Nord' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', region: 'Afrique Australe' },
  { code: 'NA', name: 'Namibie', flag: '🇳🇦', region: 'Afrique Australe' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', region: 'Afrique de l\'Ouest' },
  { code: 'NG', name: 'Nigéria', flag: '🇳🇬', region: 'Afrique de l\'Ouest' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', region: 'Afrique de l\'Est' },
  { code: 'ST', name: 'São Tomé-et-Príncipe', flag: '🇸🇹', region: 'Afrique Centrale' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳', region: 'Afrique de l\'Ouest' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', region: 'Afrique de l\'Est' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', region: 'Afrique de l\'Ouest' },
  { code: 'SO', name: 'Somalie', flag: '🇸🇴', region: 'Afrique de l\'Est' },
  { code: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦', region: 'Afrique Australe' },
  { code: 'SS', name: 'Soudan du Sud', flag: '🇸🇸', region: 'Afrique de l\'Est' },
  { code: 'SD', name: 'Soudan', flag: '🇸🇩', region: 'Afrique du Nord' },
  { code: 'TZ', name: 'Tanzanie', flag: '🇹🇿', region: 'Afrique de l\'Est' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', region: 'Afrique de l\'Ouest' },
  { code: 'TN', name: 'Tunisie', flag: '🇹🇳', region: 'Afrique du Nord' },
  { code: 'UG', name: 'Ouganda', flag: '🇺🇬', region: 'Afrique de l\'Est' },
  { code: 'ZM', name: 'Zambie', flag: '🇿🇲', region: 'Afrique Australe' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', region: 'Afrique Australe' },
];

// ─────────────────────────────────────────────────────────────
// LICENSES (backend source of truth)
// ─────────────────────────────────────────────────────────────

export const LICENSES = [
  'cc0',
  'cc-by',
  'cc-by-sa',
] as const;

export type LicenseType = typeof LICENSES[number];

export const SYMBOL_USAGES = [
  'ceremonial',
  'daily',
  'royal',
  'spiritual',
  'universal',
] as const;



export const DEFAULT_COLORS: PatternColor[] = [
  {
    hex: '#C0573E',
    name: 'Primaire',
    meaning: 'Couleur principale',
  },
  {
    hex: '#F5EBE0',
    name: 'Secondaire',
    meaning: 'Couleur secondaire',
  },
];

// ─────────────────────────────────────────────────────────────
// DEFAULT SYMBOL
// ─────────────────────────────────────────────────────────────

export const DEFAULT_SYMBOL: PatternSymbol = {
  name: '',
  nameFr: '',
  meaning: '',
  usage: '',
  sacred: false,
  cssPreview: '',
};

// ─────────────────────────────────────────────────────────────
// FIELD LIMITS
// ─────────────────────────────────────────────────────────────

export const FIELD_LIMITS = {
  summary: 500,
  history: 2000,
  technique: 1000,
  ceremonial: 1000,
  symbolMeaning: 512,
  keywordsMax: 10,
  colorsMax: 5,
  symbolsMax: 20,
  sourcesMax: 10,
} as const;

// ─────────────────────────────────────────────────────────────
// FORM STEPS (UI ONLY)
// ─────────────────────────────────────────────────────────────

export const FORM_STEPS = [
  { label: 'Identité', desc: 'Nom & origine géographique' },
  { label: 'Description', desc: 'Contexte & symbolisme' },
  { label: 'Couleurs & Assets', desc: 'Palette & fichier SVG' },
  { label: 'Révision', desc: 'Vérification avant envoi' },
] as const;

export type StepIndex = 0 | 1 | 2 | 3;

export type RegionType = PatternOrigin['region'];


export type SymbolUsageType =
  PatternSymbolism['usage'];