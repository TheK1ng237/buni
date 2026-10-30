
import { post, patch, del, get, apiClient } from '@buni/api';

import type {
  PatternDto,
  PatternListApiResponse,
} from '../types';

export const patternService = {

  async stats(id: string) {
    return get<{ data: { views: number; downloads: number } }>(
      `/api/v1/patterns/${encodeURIComponent(id)}/stats`
    );
  },

  async list(filters = {}) {

    return get<PatternListApiResponse>(
      '/api/v1/patterns',
      filters as Record<string, unknown>
    );
  },

  async bySlug(slug: string) {

    return get<{ data: PatternDto }>(
      `/api/v1/patterns/${slug}`
    );
  },

  async featured() {

    return get<PatternListApiResponse>(
      '/api/v1/patterns?featured=true&perPage=6'
    );
  },

  async create(formData: FormData) {

    return post<{ data: PatternDto }>(
      '/api/v1/patterns',
      formData
    );
  },

  async update(
    id: string,
    data: unknown
  ) {

    return patch<{ data: PatternDto }>(
      `/api/v1/patterns/${id}`,
      data
    );
  },

  async delete(id: string) {

    return del(
      `/api/v1/patterns/${id}`
    );
  },

  async feature(id: string) {
    return patch<{ data: PatternDto }>(
      `/api/v1/patterns/${id}/featured`,
      { featured: true }
    );
  },

  async unfeature(id: string) {
    return patch<{ data: PatternDto }>(
      `/api/v1/patterns/${id}/featured`,
      { featured: false }
    );
  },

  async updateStatus(id: string, status: string) {
    return patch<{ data: PatternDto }>(
      `/api/v1/patterns/${id}/status`,
      { status: status.toUpperCase() }
    );
  },

  async download(id: string) {
    const response = await apiClient.get<Blob>(
      `/api/v1/patterns/${encodeURIComponent(id)}/download`,
      { responseType: 'blob' }
    );
    return response.data;
  },

  async trackView(id: string) {
    return post<{ data: { views: number; downloads: number } }>(
      `/api/v1/patterns/${encodeURIComponent(id)}/view`,
      {}
    );
  },
};