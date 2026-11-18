import type { PatternSymbol, PatternType } from '@buni/patterns';
import { del, get, patch, post } from '@buni/api';

export interface SymbolRecord extends PatternSymbol {
  id: string;
  patternId: string;
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
  };
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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const symbolService = {
  async list(): Promise<SymbolRecord[]> {
    const response = await get<ApiResponse<SymbolRecord[]>>('/api/v1/patterns/symbols');
    return response.data ?? [];
  },

  async create(patternId: string, data: SymbolInput): Promise<SymbolRecord> {
    const response = await post<ApiResponse<SymbolRecord>>(
      `/api/v1/patterns/${encodeURIComponent(patternId)}/symbols`,
      data
    );
    if (!response.data) throw new Error('Le backend n’a pas retourné le symbole créé.');
    return response.data;
  },

  async update(id: string, data: SymbolInput): Promise<SymbolRecord> {
    const response = await patch<ApiResponse<SymbolRecord>>(
      `/api/v1/patterns/symbols/${encodeURIComponent(id)}`,
      data
    );
    if (!response.data) throw new Error('Le backend n’a pas retourné le symbole modifié.');
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await del(`/api/v1/patterns/symbols/${encodeURIComponent(id)}`);
  },
};
