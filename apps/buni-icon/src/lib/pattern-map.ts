import { PATTERN_CATALOG } from '@buni/patterns';

export type PatternMeta = (typeof PATTERN_CATALOG)[number];

const PATTERN_BY_ID = new Map<string, PatternMeta>(PATTERN_CATALOG.map((p) => [p.id, p]));

const ICON_TO_PATTERN_ID: Record<string, string> = {
  // Objets & Artisanat
  calebasse: 'bogolan-malien',
  djembe: 'wax-dakar',
  'tabouret-ashanti': 'kente-asante',
  pagne: 'kente-asante',
  poterie: 'ndop-bamoum',
  pirogue: 'kuba-kasai',

  // Vie quotidienne
  'moto-taxi': 'wax-dakar',
  marche: 'wax-dakar',
  bassine: 'wax-dakar',
  kiosque: 'wax-dakar',
  case: 'bogolan-malien',
  'theiere-ataya': 'bogolan-malien',
  'mortier-pilon': 'ndop-bamoum',
  'foyer-charbon': 'bogolan-malien',

  // Tech locale
  'mobile-money': 'kente-asante',
  ussd: 'kente-asante',
  'recharge-credit': 'ndebele-amabhaxa',
  'agent-point': 'wax-dakar',
  cybercafe: 'ndop-bamoum',
  'panneau-solaire': 'berber-amazigh',
  'carte-sim': 'kente-asante',
  'compteur-prepaye': 'ndebele-amabhaxa',

  // Symboles Adinkra
  sankofa: 'adinkra-akan',
  'gye-nyame': 'adinkra-akan',
  duafe: 'adinkra-akan',
  adinkrahene: 'adinkra-akan',
  fawohodie: 'adinkra-akan',
  dwennimmen: 'adinkra-akan',
  'bese-saka': 'adinkra-akan',
  nkonsonkonson: 'adinkra-akan',
};

const DEFAULT_PATTERN = PATTERN_CATALOG[0];

export function getIconPattern(slug: string): PatternMeta {
  const patternId = ICON_TO_PATTERN_ID[slug];
  if (patternId && PATTERN_BY_ID.has(patternId)) {
    return PATTERN_BY_ID.get(patternId)!;
  }
  return DEFAULT_PATTERN;
}
