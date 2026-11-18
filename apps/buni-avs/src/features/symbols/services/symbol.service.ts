import { del, get, patch, post } from '@buni/api';
import type { SymbolApiResponse, SymbolInput, SymbolRecord } from '../types/symbol.types';

export const symbolService = {
  async list(): Promise<SymbolRecord[]> {
    const response = await get<SymbolApiResponse<SymbolRecord[]>>('/api/v1/patterns/symbols');
    return response.data ?? [];
  },

  async create(patternId: string, data: SymbolInput): Promise<SymbolRecord> {
    const response = await post<SymbolApiResponse<SymbolRecord>>(
      `/api/v1/patterns/${encodeURIComponent(patternId)}/symbols`,
      data
    );
    if (!response.data) throw new Error('Le backend n’a pas retourné le symbole créé.');
    return response.data;
  },

  async update(id: string, data: SymbolInput): Promise<SymbolRecord> {
    const response = await patch<SymbolApiResponse<SymbolRecord>>(
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
