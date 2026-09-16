import { act, nodeOf } from '../src/state/reducer';
import type { GameState } from '../src/state/schema';
import { traverse, clinicStart } from './clinic-helpers';
export const missionStart = (outfit = 'executive') =>
  traverse(clinicStart(), { wardrobe: 'outfit.' + outfit });
export const mission = (s: GameState, id: string) => {
  const n = act(s, { type: 'MISSION_CHOOSE', id });
  if (n === s) throw Error('Invalid mission action ' + id + ' at ' + nodeOf(s));
  return n;
};
export const missionDefaults: Record<string, string> = {
  complete: 'mission.begin',
  home: 'home.prepare',
  homePresentation: 'home.presentationDone',
  homeContact: 'home.leave',
  car: 'car.arrive',
  arrival: 'arrival.enter',
  reception: 'reception.enter',
  elevator: 'entry.exits',
  entry: 'entry.enter',
  marcus: 'marcus.poised',
  marcusReply: 'marcus.close',
  celeste: 'celeste.boundary',
  celesteReply: 'celeste.close',
  cover: 'cover.redirect',
  hub: 'assess.begin',
  leadReview: 'lead.confirm',
  leadResult: 'lead.return',
  leadRead: 'read.return',
  assessment: 'source.benton',
  assessmentReview: 'source.confirm',
  method: 'method.audio',
  exchange: 'exchange.follow',
  confrontation: 'confrontation.leave',
  escape: 'escape.descend',
  debrief: 'debrief.risk',
  debriefReply: 'debrief.end',
  warning1: 'warning.next1',
  warning2: 'warning.next2',
  warning3: 'warning.finish',
  garage: 'garage.finish',
};
export function runMission(
  start = missionStart(),
  overrides: Record<string, string | string[]> = {},
  until?: string,
  visit?: (s: GameState) => void,
) {
  const plan = Object.fromEntries(
    Object.entries(overrides).map(([k, v]) => [k, Array.isArray(v) ? [...v] : [v]]),
  );
  let s = start;
  for (let i = 0; i < 100; i++) {
    visit?.(s);
    if (s.mission.outcome || (s.scene === 'mission' && s.phase === until)) return s;
    const planned = plan[s.phase]?.shift();
    const defaultChoice =
      s.phase === 'celesteReply' && s.mission.completed.includes('home.begin')
        ? 'cover.begin'
        : missionDefaults[s.phase];
    s = mission(s, planned || defaultChoice);
  }
  throw Error('Mission route exceeded bound');
}
