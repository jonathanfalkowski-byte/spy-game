import type { StoragePort } from './saves';
export const READING_KEY = 'eve.production.reading-size';
export function readSize(storage: StoragePort): string {
  try {
    const value = storage.getItem(READING_KEY);
    return value && ['18', '21', '24'].includes(value) ? value : '18';
  } catch {
    return '18';
  }
}
export function writeSize(storage: StoragePort, size: string): boolean {
  if (!['18', '21', '24'].includes(size)) return false;
  try {
    storage.setItem(READING_KEY, size);
    return true;
  } catch {
    return false;
  }
}
