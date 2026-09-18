import type { StoragePort } from '../persistence/saves';
export const NAVIGATION_KEY = 'eve.reader.navigation-collapsed.v1';
export function readNavigation(storage: StoragePort): boolean | undefined {
  try {
    const value = storage.getItem(NAVIGATION_KEY);
    return value === 'yes' ? true : value === 'no' ? false : undefined;
  } catch {
    return undefined;
  }
}
export function writeNavigation(storage: StoragePort, collapsed: boolean) {
  try {
    storage.setItem(NAVIGATION_KEY, collapsed ? 'yes' : 'no');
  } catch {
    /* Keep session choice. */
  }
}
