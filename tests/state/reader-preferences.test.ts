import { expect, it } from 'vitest';
import { readNavigation, writeNavigation, NAVIGATION_KEY } from '../../src/ui/reader-preferences';
it('navigation preference is validated, separate from the game save and optional', () => {
  const entries = new Map([['eve.production.save', 'unchanged story']]);
  const storage = {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => {
      entries.set(key, value);
    },
  };
  expect(readNavigation(storage)).toBeUndefined();
  entries.set(NAVIGATION_KEY, 'invalid');
  expect(readNavigation(storage)).toBeUndefined();
  writeNavigation(storage, true);
  expect(readNavigation(storage)).toBe(true);
  writeNavigation(storage, false);
  expect(readNavigation(storage)).toBe(false);
  expect(entries.get('eve.production.save')).toBe('unchanged story');
});
it('blocked preference storage does not block the reader', () => {
  const blocked = {
    getItem: () => {
      throw Error('blocked');
    },
    setItem: () => {
      throw Error('blocked');
    },
  };
  expect(readNavigation(blocked)).toBeUndefined();
  expect(() => writeNavigation(blocked, true)).not.toThrow();
});
