import { act, nodeOf } from '../src/state/reducer';
import { availableClinicChoices } from '../src/content/clinic';
import type { GameState } from '../src/state/schema';
import { endAccepted, evening } from './day-helpers';
export const clinic = (s: GameState, id: string) => {
  const next = act(s, { type: 'CLINIC_CHOOSE', id });
  if (next === s) throw Error('Invalid clinic action ' + id + ' at ' + nodeOf(s));
  return next;
};
export const clinicStart = () => endAccepted(evening(), 'call', 'medical', 'checkin');
export const defaults: Record<string, string> = {
  accepted: 'clinic.begin',
  morning: 'c.morning',
  contact: 'morning.answer',
  morningReply: 'c.morningReply',
  travel: 'c.travel',
  entrance: 'c.entrance',
  screened: 'c.screened',
  reception: 'reception.ask',
  receptionReply: 'c.receptionReply',
  privacy: 'privacy.ask',
  privacyReply: 'c.privacyReply',
  exam: 'exam.terminal',
  examResult: 'c.examResult',
  protocol: 'c.protocol',
  profile: 'profile.existing',
  profileReview: 'profile.confirm',
  simulation: 'attention.face',
  display: 'display.silent',
  authorization: 'auth.yes',
  preparation: 'c.preparation',
  voice: 'voice.lower',
  voiceReply: 'c.voiceReply',
  voicePause: 'voice.resume',
  face: 'face.temporary',
  faceReply: 'c.faceReply',
  facePause: 'face.resume',
  steps: 'step.help',
  mirror: 'mirror.unknown',
  name: 'name.correct',
  rest: 'c.rest',
  recoveryContact: 'contact.brief',
  recoveryReply: 'c.recoveryReply',
  wardrobe: 'outfit.executive',
  makeup: 'makeup.corporate',
  presentationReview: 'fit.confirm',
  rehearsal: 'rehearse.practice',
  briefing: 'c.briefing',
  farewell: 'farewell.thanks',
  departure: 'c.departure',
  stopConfirm: 'stop.confirm',
};
export function traverse(
  start = clinicStart(),
  overrides: Record<string, string | string[]> = {},
  until?: string,
  visit?: (s: GameState) => void,
) {
  const plan = Object.fromEntries(
    Object.entries(overrides).map(([k, v]) => [k, Array.isArray(v) ? [...v] : [v]]),
  );
  let s = start;
  for (let i = 0; i < 150; i++) {
    visit?.(s);
    if (s.scene === 'clinic' && (s.phase === until || ['complete', 'stopped'].includes(s.phase)))
      return s;
    const eligible = availableClinicChoices(s);
    const id =
      plan[s.phase]?.shift() ||
      (s.phase === 'contact' && s.day.closure !== 'checkin' ? 'morning.quiet' : defaults[s.phase]);
    if (!eligible.some((c) => c.id === id))
      throw Error('No traversal choice ' + id + ' at ' + nodeOf(s));
    s = clinic(s, id);
  }
  throw Error('Clinic traversal exceeded bound');
}
