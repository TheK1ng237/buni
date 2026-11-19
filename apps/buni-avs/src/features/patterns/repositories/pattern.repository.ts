import { patternService } from '../services/pattern.service';

import { mapPatternDtoToModel } from '../mappers/pattern.mapper';

import type { Pattern, PatternFilters } from '../types';

export const patternRepository = {
  async findAll(filters: PatternFilters = {}): Promise<Pattern[]> {
    const perPage = 100;
    const firstPage = await patternService.list({ ...filters, page: 1, perPage });
    const pages = firstPage.data.meta?.totalPages ?? 1;
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(0, pages - 1) }, (_, index) =>
        patternService.list({ ...filters, page: index + 2, perPage })
      )
    );

    return [firstPage, ...remainingPages]
      .flatMap((response) => response.data.data)
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
