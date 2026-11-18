import { symbolService } from '../services/symbol.service';
import type { SymbolInput, SymbolRecord } from '../types/symbol.types';

export const symbolRepository = {
  findAll(): Promise<SymbolRecord[]> {
    return symbolService.list();
  },

  create(patternId: string, data: SymbolInput): Promise<SymbolRecord> {
    return symbolService.create(patternId, data);
  },

  update(id: string, data: SymbolInput): Promise<SymbolRecord> {
    return symbolService.update(id, data);
  },

  delete(id: string): Promise<void> {
    return symbolService.remove(id);
  },
};
