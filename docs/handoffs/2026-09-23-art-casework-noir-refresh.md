# Art job — refresh the opening casework/desk composites into noir (2026-09-23)

The owner flagged the opening casework desk art as off-style: flat, top-down,
photo-blur composites that clash with EVE's noir house style. Root cause: these were
built deterministically by `scripts/build-opening-casework.py` as "zero-cost" placeholder
composites, not generated as noir art. Refresh them in the noir house style
([EVE_STYLE_LOCK.md](../art/EVE_STYLE_LOCK.md)).

## The family (node → current asset)

From `src/ui/opening-casework-art.ts`:

| Reader shot | Nodes | Current asset (off-style) |
|---|---|---|
| helix.shot01-brief | `helix.brief` | `axiom-casework-brief-v1-production` |
| helix.shot02-documents | `helix.documents`, `helix.analysis` | `axiom-casework-documents-v1-production` *(the one the owner pasted)* |
| helix.shot03-review | `helix.review` | `axiom-casework-review-v1-production` |
| helix.shot04-submitted | `helix.submitted` | `axiom-casework-submitted-v1-production` |
| office.shot03-file | `office.departure` | the office file/desk composite |

Also check `axiom-office-arrival-v1-production.png` (the empty-desk arrival) — it's the same
grey flat look; include it if it reads off-style at runtime.

## Noir direction (same subject, EVE's style)

These are Adrian's **Axiom Strategic Intelligence desk** during the Helix casework. Redraw
each as a proper noir cel-shaded composition — not a flat top-down vector. Anchor on the
approved office frame for the room/desk materials and on `sloane-brief` for the
slate/surface rendering:
- Image 1 (environment/style anchor): `axiom-opening-office-shot01-maya-v2-production` (b0d169e9…) for the dark modern Axiom office, desk, materials, warm-lamp-vs-cool-monitor lighting.
- Image 2 (style ref): `sloane-brief` (fb163e61…) for the inked slate/glass/surface look.
- Locked noir style string, 16:9, width 1920.

Per shot (keep the beat, change the rendering):
- **brief:** a close-up of the slate on the desk showing the Helix brief — cool screen glow, warm lamp rim on a dark desk, inked edges, cel shadows.
- **documents / analysis:** the desk with the slate and the terminal together, source records around them — the two-object composition the owner saw, but noir: the terminal glowing warm, the slate cool, the desk in shadow, a readable cinematic angle rather than flat top-down.
- **review:** the review beat — the file under a desk lamp, a hand or a marked page, close and quiet.
- **submitted:** the terminal after submission — the screen and a confirmation, cool glow in the dark office.
- **office.departure (file):** the file left on the desk as Adrian leaves — the same desk, end-of-day light.

No characters unless a shot already had one (these are object/desk insets). Keep each
recognizably the same scene so no rebinding logic breaks.

## Process

1. Upload the two anchors if not already in the asset table; generate 2 candidates per shot.
2. Full-res QA against the lock (noir rendering, no photo-blur, no flat vector; legible desk; consistent lamp/monitor lighting across the set so they read as one desk).
3. Stage in `art/staging/full-game/opening-casework/` as `<shot>-noir-v2-{a,b}-candidate.png` with records. Do NOT overwrite the production files.
4. Make one comparison sheet (old vs new for all 5) and send it to design for the owner.
5. On owner approval: promote as `-v2-production` files. Because the binding is by `assetId`
   in `src/ui/opening-casework-art.ts`, new v2 assetIds need a one-line-each update there —
   that's EVE Code's lane; design will coordinate the rebind after approval. (Or promote
   under the exact same filenames to avoid a code change — design will decide at approval,
   weighing provenance vs. simplicity.)

Standing spend approval applies. No commits.
