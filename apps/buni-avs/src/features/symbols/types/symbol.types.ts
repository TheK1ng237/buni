import type { PatternSymbol, PatternType } from '@buni/patterns';

export interface SymbolRecord extends PatternSymbol {
  id: string;
  patternId: string | null;
  pattern: {
    id: string;
    slug: string;
    name: string;
    nameLocal: string;
    type: PatternType;
    status: string;
    sources: string[];
    origin: {
      people: string;
      region: string;
      country: string;
      flag: string;
    } | null;
  } | null;
}

export interface SymbolInput {
  name: string;
  nameFr: string;
  cssPreview: string;
  imageUrl: string;
  meaning: string;
  usage: string;
  sacred: boolean;
}

export interface SymbolEntry {
  id: string;
  name: string;
  nameFr: string;
  meaning: string;
  usage: string;
  sacred: boolean;
  cssPreview?: string;
  imageUrl?: string;
  pattern: {
    id: string;
    slug: string;
    name: string;
    type: string;
    country: string;
    people: string;
    flag: string;
    sources: string[];
    previewClass: string;
  };
}

export interface SymbolApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
