import { replay as replayContentV8 } from './legacy-v8/state/reducer';
import { replay as replayContentV9 } from './legacy-v9/state/reducer';
import { StateSchema as ContentV9StateSchema } from './legacy-v9/state/schema';
import { StateSchema as ContentV8StateSchema } from './legacy-v8/state/schema';
import { replay as replayContentV7 } from './legacy-v7/state/reducer';
import { StateSchema as ContentV7StateSchema } from './legacy-v7/state/schema';
import { replay as replayContentV6 } from './legacy-v6/state/reducer';
import { StateSchema as ContentV6StateSchema } from './legacy-v6/state/schema';
import { z } from 'zod';
import { StateSchema, type GameState } from '../state/schema';
import { initialState, replay } from '../state/reducer';
import { replay as replayContentV1 } from './legacy-v1/state/reducer';
import { replay as replayContentV2 } from './legacy-v2/state/reducer';
import { StateSchema as LegacyStateSchema } from './legacy-v2/state/schema';
import { EventSchema as LegacyEventSchema } from './legacy-v2/state/actions';
import { replay as replayContentV3 } from './legacy-v3/state/reducer';
import { StateSchema as DayV3StateSchema } from './legacy-v3/state/schema';
import { replay as replayContentV4 } from './legacy-v4/state/reducer';
import { StateSchema as ContentV4StateSchema } from './legacy-v4/state/schema';
import { replay as replayContentV5 } from './legacy-v5/state/reducer';
import { StateSchema as ContentV5StateSchema } from './legacy-v5/state/schema';

export const SAVE_KEY = 'eve.production.opening';
export const MAX_SAVE_BYTES = 2_000_000;
export const SaveSchema = z
  .object({ schemaVersion: z.literal(5), contentVersion: z.union([z.literal(9), z.literal(10)]), state: StateSchema })
  .strict();
const DayV3SaveSchema = z
  .object({ schemaVersion: z.literal(3), contentVersion: z.literal(3), state: DayV3StateSchema })
  .strict();
const ContentV1Schema = z
  .object({
    schemaVersion: z.literal(2),
    contentVersion: z.union([z.literal(1), z.literal(2)]),
    state: LegacyStateSchema,
  })
  .strict();
const V1Schema = z
  .object({
    schemaVersion: z.literal(1),
    contentVersion: z.literal(1),
    ledger: z.array(LegacyEventSchema).max(10000),
  })
  .strict();
// Frozen v1 replay verifies the original prose as well as every mechanical field.
// Only then do we replay the unchanged decisions against the revised authored content.
export function migrateSave(input: unknown) {
  const v9 = z.object({ schemaVersion: z.literal(5), contentVersion: z.literal(9), state: ContentV9StateSchema }).strict().safeParse(input);
  if (v9.success) {
    if (canonical(replayContentV9(v9.data.state.ledger)) !== canonical(v9.data.state)) throw Error('Original content-v9 snapshot does not match its event ledger.');
    return { schemaVersion: 5 as const, contentVersion: 9 as const, state: replay(v9.data.state.ledger) };
  }
  const v8 = z
    .object({
      schemaVersion: z.literal(5),
      contentVersion: z.literal(8),
      state: ContentV8StateSchema,
    })
    .strict()
    .safeParse(input);
  if (v8.success) {
    if (canonical(replayContentV8(v8.data.state.ledger)) !== canonical(v8.data.state))
      throw Error('Original content-v8 snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(v8.data.state.ledger),
    };
  }
  const v7 = z
    .object({
      schemaVersion: z.literal(5),
      contentVersion: z.literal(7),
      state: ContentV7StateSchema,
    })
    .strict()
    .safeParse(input);
  if (v7.success) {
    if (canonical(replayContentV7(v7.data.state.ledger)) !== canonical(v7.data.state))
      throw new Error('Original content-v7 snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(v7.data.state.ledger),
    };
  }

  const v6 = z
    .object({
      schemaVersion: z.literal(4),
      contentVersion: z.literal(6),
      state: ContentV6StateSchema,
    })
    .strict()
    .safeParse(input);
  if (v6.success) {
    if (canonical(replayContentV6(v6.data.state.ledger)) !== canonical(v6.data.state))
      throw new Error('Original content-v6 snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(v6.data.state.ledger),
    };
  }
  const v5 = z
    .object({
      schemaVersion: z.literal(4),
      contentVersion: z.literal(5),
      state: ContentV5StateSchema,
    })
    .strict()
    .safeParse(input);
  if (v5.success) {
    if (canonical(replayContentV5(v5.data.state.ledger)) !== canonical(v5.data.state))
      throw new Error('Original clinic snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(v5.data.state.ledger),
    };
  }
  const v4 = z
    .object({
      schemaVersion: z.literal(3),
      contentVersion: z.literal(4),
      state: ContentV4StateSchema,
    })
    .strict()
    .safeParse(input);
  if (v4.success) {
    if (canonical(replayContentV4(v4.data.state.ledger)) !== canonical(v4.data.state))
      throw new Error('Original content-v4 snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(v4.data.state.ledger),
    };
  }
  const dayV3 = DayV3SaveSchema.safeParse(input);
  if (dayV3.success) {
    if (canonical(replayContentV3(dayV3.data.state.ledger)) !== canonical(dayV3.data.state))
      throw new Error('Original day-zero snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(dayV3.data.state.ledger),
    };
  }
  const old = V1Schema.safeParse(input);
  if (old.success) {
    replayContentV1(old.data.ledger);
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(old.data.ledger),
    };
  }
  const original = ContentV1Schema.safeParse(input);
  if (original.success) {
    const legacyReplay = original.data.contentVersion === 1 ? replayContentV1 : replayContentV2;
    if (canonical(legacyReplay(original.data.state.ledger)) !== canonical(original.data.state))
      throw new Error('Original save snapshot does not match its event ledger.');
    return {
      schemaVersion: 5 as const,
      contentVersion: 9 as const,
      state: replay(original.data.state.ledger),
    };
  }
  return input;
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object')
    return (
      '{' +
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => JSON.stringify(k) + ':' + canonical(v))
        .join(',') +
      '}'
    );
  return JSON.stringify(value);
}
export function decodeSave(raw: string): GameState {
  if (new TextEncoder().encode(raw).length > MAX_SAVE_BYTES)
    throw new Error('Save exceeds the 2 MB save limit.');
  const decoded = SaveSchema.parse(migrateSave(JSON.parse(raw)));
  const reconstructed = replay(decoded.state.ledger);
  if (canonical(reconstructed) !== canonical(decoded.state))
    throw new Error('Save snapshot does not match its event ledger.');
  return reconstructed;
}
export function encodeSave(state: GameState) {
  const value = SaveSchema.parse({ schemaVersion: 5, contentVersion: state.scene === 'chapter3' ? 10 : 9, state });
  const raw = JSON.stringify(value);
  if (new TextEncoder().encode(raw).length > MAX_SAVE_BYTES)
    throw new Error('Save exceeds the save limit. Download a backup.');
  return raw;
}
export type StoragePort = Pick<Storage, 'getItem' | 'setItem'>;
export type LoadResult =
  | { kind: 'ready'; state: GameState; raw: string | null }
  | { kind: 'invalid'; raw: string | null; error: string };
export function loadGame(storage: StoragePort): LoadResult {
  let raw: string | null = null;
  try {
    raw = storage.getItem(SAVE_KEY);
    return { kind: 'ready', state: raw === null ? initialState() : decodeSave(raw), raw };
  } catch (error) {
    return { kind: 'invalid', raw, error: error instanceof Error ? error.message : String(error) };
  }
}
export function persist(
  storage: StoragePort,
  state: GameState,
  expectedRaw: string | null,
): string {
  if (storage.getItem(SAVE_KEY) !== expectedRaw)
    throw new Error('Another tab changed this save. Download this run before reloading.');
  const raw = encodeSave(state);
  storage.setItem(SAVE_KEY, raw);
  return raw;
}
