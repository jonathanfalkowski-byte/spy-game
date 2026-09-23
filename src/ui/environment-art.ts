/** Environment fallback: when a reached scene resolves no exact shot art, show the empty-room master for
 * where the scene takes place. Masters contain no identifiable character and no state-specific prop, so they
 * can never reveal a later outfit, identity or custody state early (owner decision: every page has fitting art).
 * Scenes with no suitable master return undefined and stay text-only until new art exists. */
import type { GameState } from '../state/schema';
import { helix4 } from '../content/chapter4-case';

type Master = { assetId: string; alt: string };
const masters = {
  apartment: { assetId: 'opening-apartment-master-v3-production', alt: 'Adrian’s apartment: rain on the tall window, the lamp lit by the counter, no one in the room.' },
  apartmentDay: { assetId: 'c5-s01-daytime-apartment-anchor-v5-production', alt: 'The apartment sofa and low table in daylight.' },
  apartmentNight: { assetId: 'c5-people-night-apartment-master-v1-production', alt: 'The apartment at night, the window dark and the lamp lit, no one in the room.' },
  phone: { assetId: 'chapter3-surveillance-phone-v1-production', alt: 'The monitored phone lies lit on the apartment table; its screen is unreadable.' },
  wardrobe: { assetId: 'eve-bg-wardrobe-continuity-v2', alt: 'A dressing area: a suit, a gown and a dress on the rail beside a lit vanity mirror.' },
  car: { assetId: 'car-rain-window-v1-production', alt: 'Rain beads across the car window as the city passes in the blue light.' },
  securityLobby: { assetId: 'axiom-security-lobby-v2-production', alt: 'The Axiom security lobby: scanning lanes and glass gates under cold light.' },
  executiveOffice: { assetId: 'eve-bg-sloane-office-continuity-v2', alt: 'An empty executive office high above the city, the desk facing the windows.' },
  glassLobby: { assetId: 'eve-bg-glass-lobby-v1-production', alt: 'The Glass House elevator lobby: marble, warm light and closed elevator doors.' },
  shoppingStreet: { assetId: 'c5-s02-shopping-street-master-v1-production', alt: 'A quiet shopping street with a lit shop window.' },
  publicRecords: { assetId: 'chapter4-public-records-v1-production', alt: 'The public records reading room: long tables, a folder and a registration form.' },
} satisfies Record<string, Master>;
type Key = keyof typeof masters;

/** Node → master. Only nodes whose authored place matches the master's location are listed. */
const byNode: Record<string, Key> = {
  // Opening day, before the clinic.
  'apartment.departure': 'apartment',
  'release.departure': 'executiveOffice',
  'release.home': 'apartment',
  'evening.plan': 'apartment',
  'evening.home': 'apartment',
  'warning.first': 'apartment',
  'warning.second': 'apartment',
  'warning.third': 'apartment',
  'dayend.accepted': 'apartment',
  // Clinic day.
  'clinic.morning': 'apartment',
  'clinic.contact': 'apartment',
  'clinic.morningReply': 'apartment',
  'clinic.travel': 'car',
  'clinic.entrance': 'securityLobby',
  'clinic.screened': 'securityLobby',
  'clinic.departure': 'securityLobby',
  'clinic.complete': 'car',
  // Glass House evening.
  'mission.home': 'apartmentNight',
  'mission.homePresentation': 'apartmentNight',
  'mission.homeContact': 'apartmentNight',
  'mission.elevator': 'glassLobby',
  'mission.entry': 'glassLobby',
  'mission.hub': 'glassLobby',
  'mission.marcus': 'glassLobby',
  'mission.marcusReply': 'glassLobby',
  'mission.celeste': 'glassLobby',
  'mission.celesteReply': 'glassLobby',
  'mission.cover': 'glassLobby',
  'mission.leadReview': 'glassLobby',
  'mission.leadResult': 'glassLobby',
  'mission.leadRead': 'glassLobby',
  'mission.assessmentReview': 'glassLobby',
  'mission.escape': 'glassLobby',
  // Chapter 3.
  'chapter3.home': 'apartment',
  'chapter3.complete': 'apartment',
  'chapter3.mayaContact': 'apartment',
  'chapter3.mayaTalk': 'phone',
  'chapter3.mayaClose': 'phone',
  'chapter3.pressure': 'phone',
  'chapter3.rest': 'apartment',
  'chapter3.nightComplete': 'apartment',
  'chapter3.morningPlan': 'apartment',
  'chapter3.voss': 'phone',
  'chapter3.vossPlan': 'phone',
  'chapter3.rook': 'phone',
  'chapter3.rookCompare': 'phone',
  'chapter3.rookReply': 'phone',
  'chapter3.informationEnd': 'phone',
  'chapter3.invitation': 'phone',
  'chapter3.verifyOffer': 'phone',
  'chapter3.opportunityEnd': 'phone',
  'chapter3.truths': 'apartment',
  'chapter3.disclosure': 'phone',
  'chapter3.calendar': 'phone',
  'chapter3.departure': 'apartment',
  // Chapter 4 (records-room scenes only on the public path; see below).
  'chapter4.notice': 'phone',
  // Chapter 5.
  'chapter5.home': 'apartmentDay',
  'chapter5.presentation': 'wardrobe',
  'chapter5.infrastructure': 'apartmentDay',
  'chapter5.invitation': 'apartmentDay',
  'chapter5.offer': 'apartmentDay',
  'chapter5.terms': 'apartmentDay',
  'chapter5.spend': 'shoppingStreet',
  'chapter5.people': 'apartmentNight',
  'chapter5.want': 'apartmentNight',
  'chapter5.return': 'apartmentNight',
  'chapter5.complete': 'apartmentNight',
  // Chapter 6 (friction only while the Counter is not running; see below).
  'chapter6.benefit': 'apartmentDay',
  'chapter6.expectation': 'phone',
  'chapter6.exit': 'apartmentNight',
  'chapter6.proof': 'phone',
  'chapter6.counterpower': 'apartmentNight',
  'chapter6.resolve': 'apartmentNight',
  'chapter6.complete': 'apartmentNight',
  // Chapter 7.
  'chapter7.confirm': 'apartmentDay',
  'chapter7.standing': 'apartmentDay',
  'chapter7.pursue': 'publicRecords',
  'chapter7.close': 'apartmentNight',
  'chapter7.complete': 'apartmentNight',
};

export function environmentShot(state: GameState): { shotId: string; assetId: string; alt: string } | undefined {
  const node = `${state.scene}.${state.phase}`;
  let key: Key | undefined = byNode[node];
  // Evening disclosure/closure away from the Lantern happen at home.
  if (!key && state.scene === 'evening' && ['disclosure', 'closure'].includes(state.phase) && state.day.evening !== 'meet')
    key = 'apartment';
  // Chapter 4 review scenes: only the public records path has a matching room master.
  if (!key && state.scene === 'chapter4' && ['room', 'assessment', 'privateAccess', 'complete'].includes(state.phase) && !helix4(state))
    key = 'publicRecords';
  // Chapter 6 friction is at home unless the Counter was arranged.
  if (!key && node === 'chapter6.friction' && !state.choices['c6.counter-arranged']) key = 'apartmentNight';
  if (!key) return undefined;
  return { shotId: `environment.${key}`, ...masters[key] };
}

export const environmentMasterIds = Object.values(masters).map((m) => m.assetId);

/** Reached scenes with no suitable existing master: text-only until EVE Art supplies noir art.
 * Kept in one place so the audit test and the art handoff agree. */
export const environmentGaps = [
  'chapter3.executive', 'chapter3.executiveWork', 'chapter3.marcusRecord', 'chapter3.marcusLeverage', 'chapter3.reception',
  'chapter3.institutional', 'chapter3.reviewQualification',
  'chapter4.interest', 'chapter4.outside', 'chapter4.favor', 'chapter4.power', 'chapter4.intimacy',
  'chapter4.room', 'chapter4.assessment', 'chapter4.privateAccess', 'chapter4.complete',
  'chapter5.proof', 'chapter5.salon', 'chapter5.salon-room', 'chapter5.room',
  'chapter6.friction',
  'clinic.profileReview', 'clinic.voice', 'clinic.voiceReply', 'clinic.stopConfirm', 'clinic.stopped',
  'clinic.examResult', 'clinic.makeup',
  'dayend.cautious', 'dayend.walkaway', 'evening.goodbye',
  'mission.exchange', 'mission.confrontation', 'mission.debrief', 'mission.debriefReply',
  'mission.warning1', 'mission.warning2', 'mission.warning3', 'mission.garage', 'mission.complete',
] as const;
