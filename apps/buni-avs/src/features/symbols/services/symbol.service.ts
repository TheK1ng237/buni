import { del, get, patch, post } from '@buni/api';
import type { PatternDto } from '@/features/patterns/types';
import type { SymbolApiResponse, SymbolInput, SymbolRecord } from '../types/symbol.types';

interface PatternSymbolDto {
  id: string;
  name: string;
  nameFr: string;
  cssPreview: string;
  imageUrl: string;
  meaning: string;
  usage: string;
  sacred: boolean;
}

interface PatternListWithSymbolsResponse {
  success: boolean;
  message: string;
  data: {
    data: Array<Omit<PatternDto, 'symbols'> & { symbols?: PatternSymbolDto[] }>;
    meta: { totalPages: number };
  };
}

function mapPatternsToSymbols(
  patterns: Array<Omit<PatternDto, 'symbols'> & { symbols?: PatternSymbolDto[] }>
): SymbolRecord[] {
  return patterns.flatMap((pattern) =>
    (pattern.symbols ?? []).map((symbol) => ({
      ...symbol,
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
              people: pattern.origin.people,
              region: pattern.origin.region,
              country: pattern.origin.country,
              flag: pattern.origin.flag ?? '',
            }
          : null,
      },
    }))
  );
}

async function listFromPatterns(): Promise<SymbolRecord[]> {
  const symbols: SymbolRecord[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await get<PatternListWithSymbolsResponse>('/api/v1/patterns', {
      page,
      perPage: 100,
    });
    symbols.push(...mapPatternsToSymbols(response.data.data));
    totalPages = response.data.meta.totalPages;
    page += 1;
  } while (page <= totalPages);

  const standaloneResponse = await get<SymbolApiResponse<SymbolRecord[]>>('/api/v1/patterns/symbols');
  return [...symbols, ...(standaloneResponse.data ?? [])];
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
    return listFromPatterns();
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

  async remove(id: string): Promise<void> {
    await del(`/api/v1/patterns/symbols/${encodeURIComponent(id)}`);
  },
};
