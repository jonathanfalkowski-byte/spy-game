# Art job — refresh the opening apartment into noir (2026-09-23)

The owner flagged the opening apartment master ("The tower is waiting" / MORNING · ADRIAN'S
APARTMENT, and the bond/reply beats) as off-style: a soft, bright, saturated-blue
anime-background look, flatter and lighter than EVE's noir house style. Refresh it into noir
([EVE_STYLE_LOCK.md](../art/EVE_STYLE_LOCK.md)).

## Target(s)

- **opening-apartment-master-v2-production.png** — the recurring apartment interior (used by apartment.bond / reply / departure).
- **Audit the rest of the opening apartment family** and include any that share the same soft-blue look: the bathroom-mirror scene (`adrian-first-bathroom-mirror-apartment-v1-production` — the first Adrian reveal), and the departure/notice/medical/jacket derivatives if they inherit the master's style. List what you find before generating.

## Critical constraint — keep the geography

This apartment recurs and its "look around" props are referenced in prose (bathroom mirror,
closet, kitchenette with lamp, the floor-to-ceiling rain window, the door). **Keep the exact
room layout and every prop in place** — same window wall, same closet/mirror on the left,
same kitchenette + warm lamp on the right, same door. Only the *rendering and mood* change,
not the geometry. All apartment beats must stay consistent with each other and with the
bathroom-mirror scene.

## Noir direction

Push it from bright anime interior to noir graphic novel:
- Crisp confident ink, hard graphic shadows, flat cel fills — not soft airbrush gradients.
- Drop the overall brightness and the flat saturated blue; deepen to charcoal/midnight with the cool rain-window light as one source and the **warm practical lamp** as the counter-source (noir warm/cool split, the sloane-brief/harbour contrast).
- Keep it an ordinary subsidized flat — not luxury — but moody and cinematic.
- Anchor: image 1 = harbour composite (`fa4d7dcf…`) for the night warm-lamp-vs-cool-window interior; image 2 = sloane-brief (`fb163e61…`) for the inked surfaces. Locked style string, 16:9, 1920.

## Process

1. 2 candidates for the master; QA full-res against the lock (noir rendering, geometry unchanged vs the v1, props all present, warm/cool split reads).
2. If the bathroom-mirror or other apartment beats are off-style, refresh those too, same geography, so the family stays one apartment.
3. Stage in `art/staging/full-game/opening-apartment/` as v2 candidates with records; don't overwrite production.
4. Before/after comparison sheet (old vs new for each) to design for the owner.
5. On approval: promote as v2 + records.json entries + mark v1 not-runtime; I'll coordinate the rebind with EVE Code (this touches more beats than casework — apartment.bond/reply/departure and the mirror — so we'll map the bindings carefully).

Standing spend approval. No commits. This is a key recurring asset — flag anything that
can't hold geometry across the refresh rather than drifting it.
