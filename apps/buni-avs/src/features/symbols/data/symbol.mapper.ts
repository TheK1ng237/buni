import { PATTERNS_DOCS } from '@/features/patterns/data/patterns-docs';
import type { SymbolEntry, SymbolRecord } from '../types/symbol.types';

const PREVIEW_CLASSES: Record<string, string> = {
  ADINKRA: 'avs-pattern-adinkra-sankofa',
  BOGOLAN: 'avs-pattern-bogolan-fanga',
  KENTE: 'avs-pattern-kente-royale',
  KUBA: 'avs-pattern-kuba-kasai',
  NDEBELE: 'avs-pattern-wax-dakar',
  NDOP: 'avs-pattern-ndop-sultan',
  WAX: 'avs-pattern-wax-dakar',
  BERBER: 'avs-pattern-wax-dakar',
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

export function mapSymbolRecord(symbol: SymbolRecord): SymbolEntry {
  const pattern = symbol.pattern;
  return {
    id: symbol.id,
    name: symbol.name,
    nameFr: symbol.nameFr,
    meaning: symbol.meaning,
    usage: symbol.usage,
    sacred: symbol.sacred,
    status: symbol.status,
    cssPreview: symbol.cssPreview,
    imageUrl: symbol.imageUrl,
    pattern: pattern
      ? {
          id: pattern.id,
          slug: pattern.slug,
          name: pattern.name || pattern.nameLocal,
          type: pattern.type,
          country: pattern.origin?.country ?? '',
          people: pattern.origin?.people ?? '',
          flag: pattern.origin?.flag ?? '',
          sources: pattern.sources ?? [],
          previewClass: PREVIEW_CLASSES[pattern.type] ?? 'avs-pattern-wax-dakar',
        }
      : {
          id: '',
          slug: `standalone-${symbol.id}`,
          name: 'Symbole libre',
          type: 'UNIVERSAL',
          country: '',
          people: '',
          flag: '',
          sources: [],
          previewClass: 'bg-avs-secondary',
        },
  };
}

export const LOCAL_SYMBOLS: SymbolEntry[] = PATTERNS_DOCS.flatMap((pattern) =>
  pattern.symbols.map((symbol, index) => ({
    id: `${pattern.id}-${index}-${symbol.name}`,
    name: symbol.name,
    nameFr: symbol.nameFr,
    meaning: symbol.meaning,
    usage: symbol.usage,
    sacred: symbol.sacred,
    status: 'PUBLISHED',
    cssPreview: symbol.cssPreview,
    imageUrl: symbol.imageUrl,
    pattern: {
      id: pattern.id,
      slug: pattern.slug,
      name: pattern.name,
      type: pattern.type,
      country: pattern.origin.country,
      people: pattern.origin.people,
      flag: pattern.origin.flag ?? '',
      sources: pattern.sources ?? [],
      previewClass: pattern.previewClass || pattern.cssClass,
    },
  }))
);

export function mergeSymbols(local: SymbolEntry[], remote: SymbolRecord[]): SymbolEntry[] {
  const merged = new Map<string, SymbolEntry>();

  for (const symbol of local) {
    merged.set(`${symbol.pattern.slug}:${normalize(symbol.name)}`, symbol);
  }
  for (const symbol of remote) {
    const entry = mapSymbolRecord(symbol);
    merged.set(`${entry.pattern.slug}:${normalize(entry.name)}`, entry);
  }

  return Array.from(merged.values());
}
