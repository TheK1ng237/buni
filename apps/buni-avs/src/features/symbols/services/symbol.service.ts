import { del, get, patch, post } from '@buni/api';
import type { PatternDto } from '@/features/patterns/types';
import type { SymbolApiResponse, SymbolInput, SymbolRecord } from '../types/symbol.types';

interface PatternListResponse {
  success: boolean;
  message: string;
  data: {
    data: Array<
      PatternDto & {
        symbols?: Array<{
          id?: string;
          name: string;
          nameFr: string;
          status: string;
          cssPreview: string;
          imageUrl?: string;
          meaning: string;
          usage: string;
          sacred: boolean;
        }>;
      }
    >;
    meta: { totalPages: number };
  };
}

function symbolKey(symbol: Pick<SymbolRecord, 'name' | 'patternId'>): string {
  return `${symbol.patternId ?? 'free'}:${symbol.name.trim().toLocaleLowerCase()}`;
}

async function listCatalog(): Promise<SymbolRecord[]> {
  const response = await get<SymbolApiResponse<SymbolRecord[]>>('/api/v1/patterns/symbols/catalog');
  if (!Array.isArray(response.data)) {
    throw new Error('Le backend a retourné un catalogue de symboles invalide.');
  }
  const symbolsByKey = new Map(response.data.map((symbol) => [symbolKey(symbol), symbol]));

  let page = 1;
  let totalPages = 1;
  do {
    const patterns = await get<PatternListResponse>('/api/v1/patterns', {
      page,
      perPage: 100,
    });
    for (const pattern of patterns.data.data) {
      if (pattern.status.toLocaleUpperCase() !== 'PUBLISHED') continue;
      for (const symbol of pattern.symbols ?? []) {
        if (symbol.status !== 'PUBLISHED') continue;
        const record: SymbolRecord = {
          ...symbol,
          id: symbol.id ?? `pattern-symbol:${pattern.id}:${symbol.name.trim().toLocaleLowerCase()}`,
          status: 'PUBLISHED',
          createdById: null,
          imageUrl: symbol.imageUrl ?? '',
          patternId: pattern.id,
          pattern: {
            id: pattern.id,
            slug: pattern.slug,
            name: pattern.name,
            nameLocal: pattern.nameLocal ?? pattern.name,
            type: pattern.type,
            status: pattern.status,
            sources: pattern.sources ?? [],
            origin: pattern.origin
              ? {
                  people: pattern.origin.people ?? '',
                  region: pattern.origin.region ?? '',
                  country: pattern.origin.country ?? '',
                  flag: pattern.origin.flag ?? '',
                }
              : null,
          },
        };
        const key = symbolKey(record);
        if (!symbolsByKey.has(key)) symbolsByKey.set(key, record);
      }
    }
    totalPages = patterns.data.meta.totalPages;
    page += 1;
  } while (page <= totalPages);

  return [...symbolsByKey.values()];
}

async function listManagedSymbols(): Promise<SymbolRecord[]> {
  const response = await get<SymbolApiResponse<SymbolRecord[]>>('/api/v1/patterns/symbols');
  if (!Array.isArray(response.data)) {
    throw new Error('Le backend a retourné une liste de symboles invalide.');
  }
  return response.data;
}

function toSymbolFormData(data: SymbolInput, image?: File): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, String(value));
  }
  if (image) formData.append('image', image);
  return formData;
}

export const symbolService = {
  async list(): Promise<SymbolRecord[]> {
    return listCatalog();
  },

  async listManaged(): Promise<SymbolRecord[]> {
    return listManagedSymbols();
  },

  async create(patternId: string | null, data: SymbolInput, image?: File): Promise<SymbolRecord> {
    const endpoint = patternId
      ? `/api/v1/patterns/${encodeURIComponent(patternId)}/symbols`
      : '/api/v1/patterns/symbols';
    const response = await post<SymbolApiResponse<SymbolRecord>>(
      endpoint,
      toSymbolFormData(data, image)
    );
    if (!response.data) throw new Error('Le backend n’a pas retourné le symbole créé.');
    return response.data;
  },

  async update(id: string, data: SymbolInput, image?: File): Promise<SymbolRecord> {
    const response = await patch<SymbolApiResponse<SymbolRecord>>(
      `/api/v1/patterns/symbols/${encodeURIComponent(id)}`,
      toSymbolFormData(data, image)
    );
    if (!response.data) throw new Error('Le backend n’a pas retourné le symbole modifié.');
    return response.data;
  },

  async updateStatus(id: string, status: SymbolRecord['status']): Promise<SymbolRecord> {
    const response = await patch<SymbolApiResponse<SymbolRecord>>(
      `/api/v1/patterns/symbols/${encodeURIComponent(id)}/status`,
      { status }
    );
    if (!response.data) throw new Error('Le backend n’a pas retourné le symbole modifié.');
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await del(`/api/v1/patterns/symbols/${encodeURIComponent(id)}`);
  },
};
