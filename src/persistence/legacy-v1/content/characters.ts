import { CharacterSchema } from './schema';
export const characters = CharacterSchema.array().parse([
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
    emotion: 'Gratitude that he came himself; anger that Benton left it to him.',
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
