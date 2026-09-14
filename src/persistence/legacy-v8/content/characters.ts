import { CharacterSchema } from './schema';
export const characters = CharacterSchema.array().parse([
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
]);
