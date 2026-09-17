import type { GameState } from '../state/schema';
import { get5, voucher5 } from './chapter5-model';

/** Revision-16 costume assemblies use the three already delivered wardrobe options. */
export const wardrobe5 = {
  daytime: {
    id: 'c05.daytime',
    garments: 'plain charcoal knee-length dress',
    shoes: 'black low heels',
    outerwear: 'none',
    accessories: 'none',
  },
  professional: {
    id: 'c05.professional',
    garments: 'charcoal tailored jacket, ivory blouse, matching trousers',
    shoes: 'black low heels',
    outerwear: 'tailored jacket worn',
    accessories: 'none',
  },
  glamorous: {
    id: 'c05.glamorous',
    garments: 'black floor-length evening gown with charcoal tailored jacket over it',
    shoes: 'black low heels',
    outerwear: 'tailored jacket worn open',
    accessories: 'none',
  },
  provocative: {
    id: 'c05.provocative',
    garments: 'same black floor-length evening gown, open back uncovered',
    shoes: 'black low heels',
    outerwear: 'none; tailored jacket stays in wardrobe',
    accessories: 'none',
  },
  minimal: {
    id: 'c05.minimal',
    garments: 'plain charcoal knee-length dress',
    shoes: 'black low heels',
    outerwear: 'none',
    accessories: 'none',
  },
} as const;

/** Read-only audit projection. This does not authorize an image or reconstruct a past beat. */
export function continuity5(s: GameState) {
  if (s.contentRevision !== 16 || s.scene !== 'chapter5') return undefined;
  const wardrobe = Object.values(wardrobe5).find((w) => w.id === get5(s, 'wardrobe'));
  return {
    wardrobe,
    jacket: get5(s, 'old-jacket'),
    voucher: voucher5(s)
      ? get5(s, 'voucher-location')
      : get5(s, 'voucher-redeemed')
        ? 'accounts-retained'
        : 'absent-or-historically-redeemed',
    axiomPhone: get5(s, 'axiom-location'),
    personalPhone: get5(s, 'purchase') === 'phone' ? get5(s, 'personal-location') : 'not-owned',
    purchase: get5(s, 'purchase'),
    publication: get5(s, 'published') ? 'authorized-digital-issue' : 'none',
    photograph: get5(s, 'event-photo') ? 'authorized-programme-page' : 'none',
    harbourPosition: get5(s, 'harbour-position'),
    guestCard: get5(s, 'guest-card'),
  };
}
