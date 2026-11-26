import { PatternType, RegionType } from "@buni-design/patterns";


export interface PatternFilters {
  search?: string;

  type?: PatternType | 'all';

  region?: RegionType | 'all';

  page?: number;

  perPage?: number;
}