import { symbolService } from '../services/symbol.service';
import type { SymbolInput, SymbolRecord } from '../types/symbol.types';

export const symbolRepository = {
  findAll(): Promise<SymbolRecord[]> {
    return symbolService.list();
  },

  create(patternId: string, data: SymbolInput, image?: File): Promise<SymbolRecord> {
    return symbolService.create(patternId, data, image);
  },

  update(id: string, data: SymbolInput, image?: File): Promise<SymbolRecord> {
    return symbolService.update(id, data, image);
  },

  delete(id: string): Promise<void> {
    return symbolService.remove(id);
  },
};
