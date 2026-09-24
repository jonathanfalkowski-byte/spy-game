/** Environment fallback: when a reached scene resolves no exact shot art, show the empty-room master for
 * where the scene takes place. Masters contain no identifiable character and no state-specific prop, so they
 * can never reveal a later outfit, identity or custody state early (owner decision: every page has fitting art).
 * Scenes with no suitable master return undefined and stay text-only until new art exists. */
import type { GameState } from '../state/schema';
import { helix4 } from '../content/chapter4-case';

type Master = { assetId: string; alt: string };
const masters = {
  apartment: { assetId: 'opening-apartment-master-v3-production', alt: 'Adrian’s apartment: rain on the tall window, the lamp lit by the counter, no one in the room.' },
  apartmentDay: { assetId: 'c5-s01-daytime-apartment-anchor-v5-noir-production', alt: 'The apartment sofa and low table on an overcast afternoon, the lights off.' },
  apartmentNight: { assetId: 'c5-people-night-apartment-master-v1-noir-production', alt: 'The apartment at night, the window dark and the lamp lit, no one in the room.' },
  phone: { assetId: 'chapter3-surveillance-phone-v1-lift-production', alt: 'The monitored phone lies lit on the apartment table; its screen is unreadable.' },
  wardrobe: { assetId: 'eve-bg-wardrobe-continuity-noir-v2-lift-production', alt: 'A dressing area: a suit, a gown and a dress on the rail beside a lit vanity mirror.' },
  car: { assetId: 'car-rain-window-noir-v2-lift-production', alt: 'Rain beads across the car window as the city passes in the blue light.' },
  securityLobby: { assetId: 'axiom-security-lobby-v2-production', alt: 'The Axiom security lobby: scanning lanes and glass gates under cold light.' },
  executiveOffice: { assetId: 'eve-bg-sloane-office-continuity-noir-v2-lift-production', alt: 'An empty executive office high above the city, the desk facing the windows.' },
  glassLobby: { assetId: 'eve-bg-glass-lobby-noir-v2-lift-production', alt: 'The Glass House elevator lobby at night: dark marble, one warm sconce and closed elevator doors.' },
  shoppingStreet: { assetId: 'c5-s02-shopping-street-master-v1-noir-production', alt: 'A quiet shopping street with a lit shop window.' },
  publicRecords: { assetId: 'chapter4-public-records-noir-v2-production', alt: 'The public records reading room: long tables, a folder and a registration form.' },
  closedReport: { assetId: 'chapter4-interest-closed-report-v1-production', alt: 'The closed report lies on the table after the session.' },
  privateDinner: { assetId: 'chapter4-private-time-dinner-v1-lift-production', alt: 'An apartment table set for dinner, no one yet seated.' },
  rooftop: { assetId: 'harbour-rooftop-terrace-noir-v1-production', alt: 'The Harbour roof terrace at night: chairs, the parapet light and the towers beyond.' },
  hotelRoom: { assetId: 'harbour-hotel-room-noir-v1-production', alt: 'A small hotel room near the harbour, one lamp lit.' },
  noodleCounter: { assetId: 'noodle-counter-noir-v1-production', alt: 'The late noodle counter near Compliance, the stools empty.' },
  serviceGallery: { assetId: 'glass-house-service-gallery-noir-v1-production', alt: 'The Glass House service gallery, empty.' },
  elevator: { assetId: 'descending-elevator-noir-v1-production', alt: 'The inside of a descending elevator, empty.' },
  garage: { assetId: 'service-garage-noir-v1-production', alt: 'The service garage below the Glass House, empty.' },
  officeDusk: { assetId: 'si-office-dusk-noir-v1-production', alt: 'The Strategic Intelligence office at dusk, empty.' },
  axiomGates: { assetId: 'axiom-gates-noir-v1-production', alt: 'Outside the Axiom gates, empty, in the rain.' },
  lantern: { assetId: 'lantern-exterior-noir-v1-production', alt: 'Outside the Lantern, empty, the windows lit.' },
  helixSuite: { assetId: 'helix-exec-suite-noir-v2-production', alt: 'The Helix executive suite, empty: a long desk, city light and closed doors.' },
  helixReception: { assetId: 'helix-small-reception-noir-v2-lift-production', alt: 'Outside the smaller Helix reception, empty.' },
  clinicalRecords: { assetId: 'clinical-records-room-noir-v2-lift-production', alt: 'The clinical records room, empty: files, a reading table and a lamp.' },
  reviewRoom: { assetId: 'ch4-review-room-noir-v2-lift-production', alt: 'The Helix review room, empty: a long table set for an authorized session.' },
  asterProof: { assetId: 'aster-proof-table-noir-v2-lift-production', alt: 'The Aster studio proof table, empty.' },
  harbourRoom: { assetId: 'harbour-room-noir-v2-lift-production', alt: 'The Harbour room, empty, the works along the wall.' },
  consultation: { assetId: 'clinic-consultation-suite-noir-v2-lift-production', alt: 'The clinic consultation suite, empty.' },
  recordsCounter: { assetId: 'chapter4-outside-public-counter-noir-v2-lift-production', alt: 'The public records counter, empty, a copy-request tray on the ledge.' },
  publicDesk: { assetId: 'chapter4-favor-public-desk-noir-v2-lift-production', alt: 'A reserved desk in the public records office, empty.' },
  helixWorkroom: { assetId: 'chapter4-favor-julian-workroom-noir-v2-lift-production', alt: 'A Helix workroom booked for the afternoon, empty.' },
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
  // Consultation suite (partial states fall back only where no exact frame resolves).
  'clinic.profileReview': 'consultation',
  'clinic.voice': 'consultation',
  'clinic.voiceReply': 'consultation',
  'clinic.stopConfirm': 'consultation',
  'clinic.stopped': 'consultation',
  'clinic.examResult': 'consultation',
  'clinic.makeup': 'consultation',
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
  'mission.exchange': 'serviceGallery',
  'mission.confrontation': 'serviceGallery',
  'mission.debrief': 'elevator',
  'mission.debriefReply': 'elevator',
  'mission.warning1': 'elevator',
  'mission.warning2': 'elevator',
  'mission.warning3': 'elevator',
  'mission.garage': 'garage',
  'mission.complete': 'garage',
  // Opening day, the three formerly blank endings.
  'dayend.cautious': 'officeDusk',
  'dayend.walkaway': 'axiomGates',
  'evening.goodbye': 'lantern',
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
  'chapter3.executive': 'helixSuite',
  'chapter3.executiveWork': 'helixSuite',
  'chapter3.marcusRecord': 'helixSuite',
  'chapter3.marcusLeverage': 'helixSuite',
  'chapter3.reception': 'helixReception',
  'chapter3.institutional': 'clinicalRecords',
  'chapter3.reviewQualification': 'clinicalRecords',
  // Chapter 4 (review scenes and the favor branch on the client; see below).
  'chapter4.outside': 'recordsCounter',
  'chapter4.power': 'recordsCounter',
  'chapter4.notice': 'phone',
  'chapter4.interest': 'closedReport',
  'chapter4.intimacy': 'privateDinner',
  // Chapter 5.
  'chapter5.home': 'apartmentDay',
  'chapter5.presentation': 'wardrobe',
  'chapter5.infrastructure': 'apartmentDay',
  'chapter5.invitation': 'apartmentDay',
  'chapter5.offer': 'apartmentDay',
  'chapter5.terms': 'apartmentDay',
  'chapter5.spend': 'shoppingStreet',
  'chapter5.proof': 'asterProof',
  'chapter5.room': 'harbourRoom',
  'chapter5.salon': 'rooftop',
  'chapter5.salon-room': 'hotelRoom',
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
  // Chapter 8 (the Helix room on the executive road is on EVE Art's gap list; advance keeps the apartment).
  'chapter8.cost': 'apartmentDay',
  'chapter8.leverage': 'phone',
  'chapter8.advance': 'apartmentNight',
  'chapter8.close': 'apartmentNight',
  'chapter8.complete': 'apartmentNight',
  // Chapter 9 (the shared bridge).
  'chapter9.arrive': 'apartmentDay',
  'chapter9.assemble': 'phone',
  'chapter9.resolve': 'apartmentNight',
  'chapter9.complete': 'apartmentNight',
  // Chapter 10 (stand-ins until EVE Art's Chapter 10 frames: the Lindqvist, the wall, the archive).
  'chapter10.breakfast': 'privateDinner',
  'chapter10.claimed': 'phone',
  'chapter10.wall': 'apartmentNight',
  'chapter10.order': 'phone',
  'chapter10.answer': 'apartmentDay',
  'chapter10.invitation': 'apartmentNight',
  'chapter10.complete': 'apartmentNight',
};

export function environmentShot(state: GameState): { shotId: string; assetId: string; alt: string } | undefined {
  const node = `${state.scene}.${state.phase}`;
  let key: Key | undefined = byNode[node];
  // Evening disclosure/closure away from the Lantern happen at home.
  if (!key && state.scene === 'evening' && ['disclosure', 'closure'].includes(state.phase) && state.day.evening !== 'meet')
    key = 'apartment';
  // Chapter 4 review scenes and the favor: the public records rooms, or Helix's on the Helix path.
  if (!key && state.scene === 'chapter4' && ['room', 'assessment', 'privateAccess', 'complete'].includes(state.phase))
    key = helix4(state) ? 'reviewRoom' : 'publicRecords';
  if (!key && node === 'chapter4.favor') key = helix4(state) ? 'helixWorkroom' : 'publicDesk';
  // Chapter 6 friction is at home, or at the noodle counter once the Counter is arranged.
  if (!key && node === 'chapter6.friction') key = state.choices['c6.counter-arranged'] ? 'noodleCounter' : 'apartmentNight';
  if (!key) return undefined;
  return { shotId: `environment.${key}`, ...masters[key] };
}

export const environmentMasterIds = Object.values(masters).map((m) => m.assetId);

/** Reached scenes with no suitable existing master: text-only until EVE Art supplies noir art.
 * Kept in one place so the audit test and the art handoff agree. */
export const environmentGaps = [
] as const;
