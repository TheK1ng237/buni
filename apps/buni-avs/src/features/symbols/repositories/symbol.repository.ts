import { symbolService } from '../services/symbol.service';
import type { SymbolInput, SymbolRecord } from '../types/symbol.types';

export const symbolRepository = {
  findAll(): Promise<SymbolRecord[]> {
    return symbolService.listManaged();
  },

  findPublished(): Promise<SymbolRecord[]> {
    return symbolService.list();
  },

  create(patternId: string | null, data: SymbolInput, image?: File): Promise<SymbolRecord> {
    return symbolService.create(patternId, data, image);
  },

  update(id: string, data: SymbolInput, image?: File): Promise<SymbolRecord> {
    return symbolService.update(id, data, image);
  },

  updateStatus(id: string, status: SymbolRecord['status']): Promise<SymbolRecord> {
    return symbolService.updateStatus(id, status);
  },

  delete(id: string): Promise<void> {
    return symbolService.remove(id);
  },
};
