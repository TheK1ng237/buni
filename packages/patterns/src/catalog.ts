import type { PatternType, RegionType } from './registry';

export const PATTERN_CATALOG = [
  {
    id: 'kente-asante',
    type: 'kente',
    name: 'Kente Royale',
    cssClass: 'avs-pattern-kente-royale',
    origin: 'Ghana',
    region: 'west-africa',
    flag: 'GH',
    symbolism: 'Royauté · Sagesse',
    colors: ['#C0573E', '#D4A017', '#1D1D1B', '#F5EBE0'],
  },
  {
    id: 'ndop-bamoum',
    type: 'ndop',
    name: 'Ndop Sultan',
    cssClass: 'avs-pattern-ndop-sultan',
    origin: 'Cameroun',
    region: 'central-africa',
    flag: 'CM',
    symbolism: 'Autorité · Ancêtres',
    colors: ['#2A4A6B', '#F5EBE0', '#8B4513', '#1D1D1B'],
  },
  {
    id: 'bogolan-malien',
    type: 'bogolan',
    name: 'Bogolan Fanga',
    cssClass: 'avs-pattern-bogolan-fanga',
    origin: 'Mali',
    region: 'west-africa',
    flag: 'ML',
    symbolism: 'Force · Protection',
    colors: ['#8B4513', '#D4A017', '#1D1D1B', '#F5EBE0'],
  },
  {
    id: 'adinkra-akan',
    type: 'adinkra',
    name: 'Adinkra Sankofa',
    cssClass: 'avs-pattern-adinkra-sankofa',
    origin: 'Ghana',
    region: 'west-africa',
    flag: 'GH',
    symbolism: 'Mémoire · Retour aux sources',
    colors: ['#1D1D1B', '#C8A96E', '#F5EBE0', '#C0573E'],
  },
  {
    id: 'ndebele-amabhaxa',
    type: 'ndebele',
    name: 'Ndebele Amabhaxa',
    cssClass: 'avs-pattern-ndebele-amabhaxa',
    origin: 'Afrique du Sud',
    region: 'south-africa',
    flag: 'ZA',
    symbolism: 'Identité · Statut',
    colors: ['#4A6741', '#C0573E', '#D4A017', '#1D1D1B'],
  },
  {
    id: 'wax-dakar',
    type: 'wax',
    name: 'Wax Dakar',
    cssClass: 'avs-pattern-wax-dakar',
    origin: 'Sénégal',
    region: 'west-africa',
    flag: 'SN',
    symbolism: 'Récit populaire',
    colors: ['#C0573E', '#2A4A6B', '#D4A017', '#F5EBE0'],
  },
  {
    id: 'kuba-kasai',
    type: 'kuba',
    name: 'Kuba Kasai',
    cssClass: 'avs-pattern-kuba-kasai',
    origin: 'République démocratique du Congo',
    region: 'central-africa',
    flag: 'CD',
    symbolism: 'Géométrie sacrée',
    colors: ['#4A6741', '#C8A96E', '#1D1D1B', '#F5EBE0'],
  },
  {
    id: 'berber-amazigh',
    type: 'berber',
    name: 'Berber Amazigh',
    cssClass: 'avs-pattern-berber-amazigh',
    origin: 'Afrique du Nord',
    region: 'north-africa',
    flag: 'MA',
    symbolism: 'Géométrie ancestrale',
    colors: ['#1D1D1B', '#C0573E', '#F5EBE0', '#D4A017'],
  },
] as const satisfies readonly {
  id: string;
  type: PatternType;
  name: string;
  cssClass: string;
  origin: string;
  region: RegionType;
  flag: string;
  symbolism: string;
  colors: readonly [string, string, string, string];
}[];
