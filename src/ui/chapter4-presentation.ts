import type { GameState } from '../state/schema';
import { get4 } from '../content/chapter4-model';
import { helix4 } from '../content/chapter4-case';
import { sebastianReturnPlace5 } from '../content/chapter5-sebastian';
import { place7 } from '../content/chapter7-own';
import { place8 } from '../content/chapter8';
import { place9 } from '../content/chapter9';
import { place10 } from '../content/chapter10';
import { place11 } from '../content/chapter11';
import { place12 } from '../content/chapter12';
import { place13 } from '../content/chapter13';
import { place14 } from '../content/chapter14';
import { place15 } from '../content/chapter15';
/** Journal records remain in the authenticated history; this is display only. */
export function conversationHistory(s: GameState) {
  const records = new Set(
    Object.entries(s.choices)
      .filter(([key]) => key.startsWith('c4.rec.') || key.startsWith('c5.rec.'))
      .map(([, value]) => Number(value)),
  );
  return s.history.filter((_, index) => !records.has(index));
}
export function currentPlace(s: GameState, fallback: string) {
  if (s.scene === 'chapter3') {
    if (s.phase === 'complete') return '20:04 · Apartment';
    if (s.phase === 'nightComplete') return '06:15 · Following morning · Apartment';
    // Frozen node times mark the start of a scene, not a clock that rewinds on a menu loop.
    if (['truths', 'disclosure'].includes(s.phase)) return '16:00–17:00 · Apartment desk';
    if (s.phase === 'morningPlan' && s.choices['c3.morning-contact'] === 'called')
      return 'After the 06:45 call · Apartment';
    if (s.phase === 'vossPlan' && s.choices['c3.careMode'] !== 'attend')
      return '08:48 · Apartment · Follow-up messages';
  }
  if (s.scene === 'chapter7') return place7(s) ?? fallback;
  if (s.scene === 'chapter8') return place8(s) ?? fallback;
  if (s.scene === 'chapter9') return place9(s) ?? fallback;
  if (s.scene === 'chapter10') return place10(s) ?? fallback;
  if (s.scene === 'chapter11') return place11(s) ?? fallback;
  if (s.scene === 'chapter12') return place12(s) ?? fallback;
  if (s.scene === 'chapter13') return place13(s) ?? fallback;
  if (s.scene === 'chapter14') return place14(s) ?? fallback;
  if (s.scene === 'chapter15') return place15(s) ?? fallback;
  if (s.scene === 'chapter6' && s.phase === 'friction' && s.choices['c6.counter-arranged'])
    return '22:00 · THE COUNTER NEAR COMPLIANCE';
  if (s.scene === 'chapter5') {
    const salonReturn = sebastianReturnPlace5(s);
    if (salonReturn) return salonReturn;
    if (s.phase === 'presentation')
      return s.choices['c5.event'] === 'attend'
        ? '17:00 · Following day · Apartment'
        : '14:00 · Following day · Apartment';
    if (s.phase === 'room')
      return s.choices['c5.event'] === 'attend'
        ? '18:30–19:15 · Harbour preview'
        : '15:00–15:45 · Harbour reading salon';
    return fallback;
  }
  if (s.scene !== 'chapter4') return fallback;
  if (s.phase === 'consequences')
    return `${get4(s, 'clock') === '1155' ? '19:15' : '18:30'} · River path`;
  if (s.phase === 'resource')
    return `${get4(s, 'redeemed') ? '09:50' : '09:15'} · Next morning · Public records room`;
  if (s.phase === 'room')
    return `10:30–11:30 · ${helix4(s) ? 'Helix review room' : 'Public records desk'}`;
  if (s.phase === 'outside')
    return `12:15 · ${helix4(s) ? 'Hotel café beside Helix' : 'Records-room counter'}`;
  if (s.phase === 'notice') return '13:30 · Phone messages';
  if (s.phase === 'power')
    return `14:00 · ${helix4(s) ? 'Helix case desk' : 'Municipal case desk'}`;
  return fallback;
}
