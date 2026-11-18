import { mergeSymbols } from '../data/symbol.mapper';
import { symbolRepository } from '../repositories/symbol.repository';
import type { SymbolEntry, SymbolInput, SymbolRecord } from '../types/symbol.types';

export async function listSymbols(fallback: SymbolEntry[]): Promise<SymbolEntry[]> {
  return mergeSymbols(fallback, await symbolRepository.findAll());
}

export function listManagedSymbols(): Promise<SymbolRecord[]> {
  return symbolRepository.findAll();
}

export function createSymbol(patternId: string, data: SymbolInput): Promise<SymbolRecord> {
  return symbolRepository.create(patternId, data);
}

export function updateSymbol(id: string, data: SymbolInput): Promise<SymbolRecord> {
  return symbolRepository.update(id, data);
}

export function deleteSymbol(id: string): Promise<void> {
  return symbolRepository.delete(id);
}
