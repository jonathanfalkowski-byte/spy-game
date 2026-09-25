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
export const FADE_KEY = 'eve.reader.fade-coercion.v1';
/** "Fade coercion scenes" (CONTENT_DIRECTION §6): a per-reader preference, outside the save. */
export function readFade(storage: StoragePort): boolean {
  try {
    return storage.getItem(FADE_KEY) === 'yes';
  } catch {
    return false;
  }
}
export function writeFade(storage: StoragePort, fade: boolean) {
  try {
    storage.setItem(FADE_KEY, fade ? 'yes' : 'no');
  } catch {
    /* Keep session choice. */
  }
}
export function writeNavigation(storage: StoragePort, collapsed: boolean) {
  try {
    storage.setItem(NAVIGATION_KEY, collapsed ? 'yes' : 'no');
  } catch {
    /* Keep session choice. */
  }
}
