import { PATTERN_CATALOG } from '@buni-design/patterns';

export type PatternMeta = (typeof PATTERN_CATALOG)[number];

const PATTERN_BY_ID = new Map<string, PatternMeta>(PATTERN_CATALOG.map((p) => [p.id, p]));

const ICON_TO_PATTERN_ID: Record<string, string> = {
  home: 'bogolan-malien',
  search: 'ndop-bamoum',
  user: 'ndebele-amabhaxa',
  menu: 'kente-asante',
  settings: 'kuba-kasai',
  'arrow-left': 'wax-dakar',
  'arrow-right': 'wax-dakar',
  close: 'ndop-bamoum',
  check: 'adinkra-akan',
  help: 'adinkra-akan',
  shield: 'bogolan-malien',
  lock: 'ndop-bamoum',
  unlock: 'ndop-bamoum',
  cowrie: 'wax-dakar',
  wallet: 'kente-asante',
  basket: 'kuba-kasai',
  gift: 'wax-dakar',
  favorite: 'adinkra-akan',
  star: 'kente-asante',
  location: 'berber-amazigh',
  map: 'kuba-kasai',
  calendar: 'ndop-bamoum',
  clock: 'berber-amazigh',
  mail: 'wax-dakar',
  phone: 'ndebele-amabhaxa',
  camera: 'kuba-kasai',
  gallery: 'ndebele-amabhaxa',
  upload: 'kente-asante',
  download: 'kente-asante',
  share: 'wax-dakar',
};

const DEFAULT_PATTERN = PATTERN_CATALOG[0];

export function getIconPattern(slug: string): PatternMeta {
  const patternId = ICON_TO_PATTERN_ID[slug];
  if (patternId) {
    const pattern = PATTERN_BY_ID.get(patternId);
    if (pattern) return pattern;
  }
  return DEFAULT_PATTERN;
}
