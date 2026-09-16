import { CharacterSchema } from './schema';
import { IntroductionSchema } from './character-schema';
const introductions = [
  {
    id: 'julian-mercer', name: 'Julian Mercer', role: 'Helix Group COO',
    arrival: 'A professional introduction at Helix, when the player accepts the meeting.',
    appearance: 'Forty-nine, dark hair graying at the temples, a navy suit; use the existing executive portrait as the visual base.',
    history: 'Major adult character. His position at Helix is established; a personal history with Evelynn is not.',
    emotion: 'Professional attention. The introduction establishes no attraction, romance, coercion or dependency.',
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'Helix director of strategic acquisitions',
    arrival: 'Leaves a group by the Glass House windows to greet Evelyn.',
    appearance: 'Lean, early forties, silver at both temples, black dinner jacket.',
    history:
      'Known to Adrian through the Helix brief. Marcus claims to remember Evelyn from Singapore.',
    emotion: 'His familiarity creates pressure to answer without supplying an invented memory.',
  },
  {
    id: 'celeste',
    name: 'Celeste Laurent',
    role: 'Director of the Laurent Sovereign Fund',
    arrival: 'Approaches Marcus and Evelyn during their greeting.',
    appearance: 'Tall, dark-skinned, close-cropped hair, silver gown, unhurried posture.',
    history:
      'Marcus introduces her as financier of two acquisitions. She claims a shared Singapore history with Evelyn.',
    emotion: 'Easy familiarity is unsettling without proving the history she describes.',
  },
  {
    id: 'voss',
    name: 'Dr Lena Voss',
    role: 'EVE scientist in Axiom Adaptive Medicine',
    arrival: 'Waiting beside the examination chair on Sublevel 17, with Sloane present.',
    appearance:
      'Mid-forties, slight and sharp-featured; silver at her dark temples, charcoal blouse and open medical coat.',
    history:
      'First personal meeting. Adrian knows her name from the directory and Sloane; the Novagen connection is recognized only if researched.',
    emotion: 'Cautious trust in her clinical boundaries, without absolving her involvement.',
  },
  {
    id: 'sloane',
    name: 'Victoria Sloane',
    role: 'Director of Executive Intelligence',
    arrival: 'At her Level 71 office window; Adrian arrives under escort.',
    appearance:
      'Late forties, tall and spare, bronze skin, jaw-length black hair with a silver streak, graphite suit.',
    history: 'Adrian knows her reputation but has never met her.',
    emotion: 'Fear, anger and the desire to understand her control.',
  },
  {
    id: 'evelyn',
    name: 'Evelyn Vale',
    role: 'Identity presented by Axiom for the proposed operation',
    arrival: 'Photograph and records displayed by Sloane, not a physical meeting.',
    appearance:
      'Presented as thirty-one, shoulder-length dark hair, ivory jacket, features recognizably related to Adrian.',
    history:
      'Axiom presents an established identity and Singapore records; their origins remain unverified.',
    emotion: 'Violation and uncertainty; the player chooses where Adrian directs his attention.',
  },
  {
    id: 'adrian',
    name: 'Adrian Vale',
    role: 'Senior intelligence analyst at Axiom',
    arrival: 'At home on promotion morning.',
    appearance: 'Thirty-four; the mirror reflects the man on his employee badge.',
    history: 'Eleven years at Axiom. Senior analyst for four of them.',
    emotion: 'Brilliant, cautious, ambitious and professionally trapped.',
  },
  {
    id: 'daniel',
    name: 'Daniel Kessler',
    role: 'Axiom intelligence colleague',
    arrival: 'Waiting beside Adrian’s desk.',
    appearance:
      'Thirty-two, long-limbed, dark curls, permanently one button short of Axiom’s dress code.',
    history: 'Worked two desks over from Adrian for four years.',
    emotion:
      'Gratitude that Daniel told him himself; anger at hearing it from Daniel instead of Benton.',
  },
  {
    id: 'benton',
    name: 'Elias Benton',
    role: 'Director and Adrian’s supervisor',
    arrival: 'Crosses the floor from his smoked-glass office carrying a black data slate.',
    appearance: 'Fifty-eight, compact and silver-haired, in a precisely fitted charcoal suit.',
    history: 'Has supervised Adrian for four years.',
    emotion: 'Disappointment hardens into suspicion.',
  },
  {
    id: 'maya',
    name: 'Maya Reyes',
    role: 'Corporate compliance investigator',
    arrival: 'First a phone message; later she crosses from the compliance wing with two coffees.',
    appearance:
      'Thirty-three, warm brown skin, watchful dark eyes, black hair in a loose knot, navy suit with turned-back cuffs.',
    history:
      'Met Adrian in his first year at Axiom; a decade of bad coffee and sealed investigations.',
    emotion: 'Relief and trust; the player defines the private emotional boundary.',
  },
];

// Exact ages only: approximate ages remain in the preserved descriptive prose.
const establishedAges: Partial<Record<string, number>> = {
  'julian-mercer': 49,
  adrian: 34,
  daniel: 32,
  benton: 58,
  maya: 33,
};
// Preserved identity-package prose is not a second person in the character catalog.
export const presentedIdentityIntroduction = IntroductionSchema.parse(
  introductions.find((character) => character.id === 'evelyn'),
);
export const characters = CharacterSchema.array().parse(
  introductions
    .filter((character) => character.id !== 'evelyn')
    .map((character) => ({
      id: character.id === 'adrian' ? 'player-character' : character.id,
      displayName: character.id === 'adrian' ? 'Evelynn Vale' : character.name,
      introduction: character,
      canon: {
        ...(establishedAges[character.id] !== undefined
          ? {
              age: {
                years: establishedAges[character.id],
                status: 'established',
                source: character.appearance,
              },
            }
          : {}),
        // Maya is the first migrated context example. Other introductions stay intact;
        // no allegiance, desire, secret, or romantic fact is inferred from them.
        facts:
          character.id === 'julian-mercer'
            ? [{id:'name',text:'Julian Mercer',source:'Explicit user canon approval'}, {id:'role',text:'Helix Group COO; major adult character',source:'Explicit user canon approval'}, {id:'visual-base',text:'art/staging/cast-scenes/eve-cast-executive-v1.png',source:'Existing executive artwork approved as visual base'}]
            : character.id === 'maya'
            ? [
                {
                  id: 'name',
                  text: character.name,
                  source: 'Existing Maya character introduction',
                },
                {
                  id: 'occupation',
                  text: character.role,
                  source: 'Existing Maya character introduction',
                },
                {
                  id: 'appearance',
                  text: character.appearance,
                  source: 'Existing Maya character introduction',
                },
                {
                  id: 'background',
                  text: character.history,
                  source: 'Existing Maya character introduction',
                },
              ]
            : [],
      },
    })),
);
