import { patternService } from '../services/pattern.service';

import { mapPatternDtoToModel } from '../mappers/pattern.mapper';

import type { Pattern, PatternDto, PatternFilters } from '../types';

function getPatternPage(response: unknown): {
  items: PatternDto[];
  totalPages: number;
} {
  if (!response || typeof response !== 'object') {
    throw new Error('Réponse invalide lors du chargement des motifs.');
  }

  const envelope = response as {
    data?: unknown;
    meta?: { totalPages?: number };
  };
  const payload = envelope.data;

  if (Array.isArray(payload)) {
    return { items: payload as PatternDto[], totalPages: envelope.meta?.totalPages ?? 1 };
  }

  if (payload && typeof payload === 'object') {
    const page = payload as {
      data?: unknown;
      items?: unknown;
      meta?: { totalPages?: number };
    };
    const items = Array.isArray(page.data)
      ? page.data
      : Array.isArray(page.items)
        ? page.items
        : null;

    if (items) {
      return { items: items as PatternDto[], totalPages: page.meta?.totalPages ?? 1 };
    }
  }

  throw new Error('Format de réponse inattendu lors du chargement des motifs.');
}

export const patternRepository = {
  async findAll(filters: PatternFilters = {}): Promise<Pattern[]> {
    const perPage = 100;
    const firstPage = await patternService.list({ ...filters, page: 1, perPage });
    const firstPageResult = getPatternPage(firstPage);
    const pages = firstPageResult.totalPages;
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(0, pages - 1) }, (_, index) =>
        patternService.list({ ...filters, page: index + 2, perPage })
      )
    );

    return [firstPageResult, ...remainingPages.map(getPatternPage)]
      .flatMap((page) => page.items)
      .map(mapPatternDtoToModel);
  },

  async findBySlug(slug: string): Promise<Pattern> {
    const response = await patternService.bySlug(slug);
    const dto = response?.data ?? response;
    return mapPatternDtoToModel(dto);
  },

  async findFeatured(): Promise<Pattern[]> {
    const response = await patternService.featured();
    const rawData =
      response?.data?.data ?? response?.data ?? (Array.isArray(response) ? response : []);
    const items = Array.isArray(rawData) ? rawData : [];

    return items.map(mapPatternDtoToModel);
  },
  async feature(id: string): Promise<Pattern> {
    const response = await patternService.feature(id);

    return mapPatternDtoToModel(response.data);
  },

  async unfeature(id: string): Promise<Pattern> {
    const response = await patternService.unfeature(id);

    return mapPatternDtoToModel(response.data);
  },

  async create(formData: FormData): Promise<Pattern> {
    const response = await patternService.create(formData);

    return mapPatternDtoToModel(response.data);
  },

  async update(id: string, data: unknown): Promise<Pattern> {
    const response = await patternService.update(id, data);

    return mapPatternDtoToModel(response.data);
  },

  async delete(id: string): Promise<void> {
    await patternService.delete(id);
  },

  async updateStatus(id: string, status: string): Promise<Pattern> {
    const response = await patternService.updateStatus(id, status);

    return mapPatternDtoToModel(response.data);
  },

  async download(id: string): Promise<Blob> {
    return patternService.download(id);
  },

  async stats(id: string): Promise<{ views: number; downloads: number }> {
    const response = await patternService.stats(id);
    return response.data;
  },

  async trackView(id: string): Promise<{ views: number; downloads: number }> {
    const response = await patternService.trackView(id);
    return response.data;
  },
};
