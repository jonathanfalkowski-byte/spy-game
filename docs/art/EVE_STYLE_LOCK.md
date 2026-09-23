# EVE style lock — reproducing the approved look on ZenCreator

The approved production art (opening, clinic, Glass House, Chapter 5 harbour and
apartment) was made in ChatGPT. New art is made on ZenCreator and must be
indistinguishable in rendering from those images. This file is the operating rule
for every generation. [EVE_ART_BIBLE.md](EVE_ART_BIBLE.md) remains the design
authority; [GLOBAL_CINEMATIC_ART_RULES.md](GLOBAL_CINEMATIC_ART_RULES.md) and
[MAYA_EVELYNN_VISUAL_IDENTITY.md](MAYA_EVELYNN_VISUAL_IDENTITY.md) still govern
continuity and identity.

## What the approved look actually is

Read from `sloane-brief-v1-production.png` and `C5-HARBOUR-EVELYNN-JULIAN-COMPOSITE-V2.png`:

- Clean, confident ink outlines on figures, furniture and architecture; uniform-ish line weight, no sketchiness.
- Flat cel fills with one hard shadow tone and a restrained highlight. No pores, no photographic skin, no airbrush glow.
- Graphic light shapes: window light and lamp pools drawn as crisp geometric patches on walls and floors.
- Noir split palette: cold blue/grey exterior or night against warm amber practicals; blacks, charcoal, cream, gunmetal, occasional burgundy/emerald/gold accents.
- Cinematic 16:9 wide staging, eye-level or slightly low camera, figures often small-to-medium in a readable room; restrained facial acting, mouths closed unless speaking.
- Reflective floors and glass rendered as simple stretched highlights, not ray-traced detail.

## House style decision (owner, 2026-09-23)

**Noir flat-cel is the only house style, for every scene including daylight exteriors.**
Some approved ChatGPT frames use a softer pen-and-wash look (notably
`C5-S02-SHOPPING-STREET-MASTER-V1.png`). The Seedream pilot showed that the provider
copies image 1's rendering almost exactly, so an off-style frame must never be image 1
as is. Restyle it first (the restyle trick below, with `sloane-brief` as image 2),
review the restyled master as a new candidate, and anchor on that. Originals stay
untouched in `art/production`.

Daylight in the house style means: the same ink lines and hard cel shadows, with a
brighter palette (cream, stone, pale sky blue, warm sun patches) and crisp cast
shadows instead of noir darkness.

## World look: near-future luxury (owner, 2026-09-23)

The world is a few years ahead of now, read from the Axiom office frames and the
Helix gala: dark stone and glass, brushed brass, integrated linear light strips,
frameless glass partitions, reflective floors, clean monolithic geometry, and discreet
screens and panels built into surfaces. Exteriors follow the same logic: glass
shopfronts with light-strip framing, transparent display signage, smart street
furniture, and slim modern towers behind older facades. Keep it grounded and
expensive. Not cyberpunk and not neon (per the art bible). Historic architecture can
appear, but it is retrofitted, not a period piece.

The office and gala frames also carry a richer rendering than flat daylight: deeper
blacks, warm light blooms and painted cel gradients. Use
`axiom-opening-office-shot01-maya-v2-production.png` and
`art/reference/evelynn/evelynn-helix-gala-v1.png` as the richness reference alongside
`sloane-brief`.

## Evelynn's presentation (owner, 2026-09-23)

EVE is an adult game, and Evelynn is always styled to be sexy. **Hair is done**: the
canon updo with face-framing strands, or a deliberate styled alternative. **Heels,
always.** Silhouettes are fitted, and makeup is finished. The chosen wardrobe line
(Executive, Socialite, Shadow) decides how it reads: sharp tailoring, glamour, or
sleek dark practicality. It never decides whether she looks desirable. The only
exceptions are beats where the prose makes her unstyled state the point (clinic
recovery, the mirror reveal), and they return to styled immediately afterwards. When
the prose says "low heels", prompt a sleek mid heel, and flag any prose that
contradicts this rule to design.

## Locked style string (paste verbatim into every prompt)

```
polished 2D graphic-novel illustration, clean confident ink linework, flat cel shading with hard graphic shadows, controlled highlights, noir palette of charcoal, cream and midnight blue with warm amber practical light, cinematic 16:9 composition, not photorealistic, no photographic skin texture
```

Never add: photoreal, 8k, hyperrealistic, octane, cinematic photo, anime, chibi, neon cyberpunk.

## Models and method

| Job | Tool / model | Notes |
|---|---|---|
| Every scene, background and character frame | `image_editor`, `SEEDREAM_5`, ratio 16:9, width 1920 | Always image-conditioned. Text-only generation drifts photoreal and is not allowed. |
| Identity finishing pass when a face drifts | `faceswap`, `SEEDREAM_5_PRO`, `swap_type: face` | Face source must be a neutral, front-facing approved pick; the source expression transfers. |
| Not used | Qwen, FLUX_KLEIN_NSFW, text-only `by_prompt` | Qwen/by_prompt go photoreal; Flux fights likeness. |

**Image order in `image_assets`:** (1) the approved environment/anchor frame for this location, (2) the style reference, (3) character references in order of screen importance. When image 1 is already an approved EVE production frame it doubles as the style reference.

**The restyle trick** (for any photoreal or off-style source): image 1 = source, image 2 = an approved frame below, prompt starts `Redraw image 1 in exactly the rendering style of image 2:` then the style string.

**Anchor method for multi-frame scenes:** generate and review the first frame of a scene family; every follow-up frame uses that approved frame as image 1 plus the character reference. This keeps camera, room, wardrobe and prop custody consistent (HOLD ON DIALOGUE / CUT ON ACTION).

## Style reference set

Pick the nearest match by lighting, not by location.

| Lighting family | Reference |
|---|---|
| Daylight executive interior, window light | `art/production/opening/sloane-brief-v1-production.png` |
| Night interior, warm track lights vs blue window | `art/production/chapter5/C5-HARBOUR-EVELYNN-JULIAN-COMPOSITE-V2.png` |
| Night apartment, practical lamps | `art/production/chapter5/C5-PEOPLE-NIGHT-APARTMENT-MASTER-V1.png` |
| Daytime apartment | `art/production/opening/opening-apartment-master-v2-production.png` |
| Clinical white/steel/cyan | `art/production/opening/clinic-reception-v1-production.png` |
| Glass House / luxury lobby | `art/production/opening/glass-house-reception-v1-production.png`, `art/production/continuity/eve-bg-glass-lobby-v1-production.png` |
| Street / exterior day | `art/production/chapter5/C5-S02-SHOPPING-STREET-MASTER-V1.png` |
| Corporate security / cold blue | `art/production/opening/axiom-security-lobby-v2-production.png` |

Upload each once and record its ZenCreator asset id in the table below so it is
never re-uploaded.

| Reference | ZenCreator asset id |
|---|---|
| sloane-brief | `fb163e61-b577-4f68-a6c3-24ab85c7ba38` |
| harbour composite | `fa4d7dcf-a3fc-4525-b698-2ca5aada238c` |
| night apartment master | `8bcdddbb-96fd-4591-9842-87a377d5bc1b` |
| clinic reception | `3e350e89-7d96-4fd1-bfa3-37d9fc3631bb` |
| glass-house reception | `76f8ba07-5afd-49cb-9652-568485d2c119` |
| shopping street | `17823367-7746-412b-9929-c0c5bef781bd` |
| Evelynn canon three-quarter (identity, `art/production/chapter5/apartment-components/evelynn-canon-three-quarter-v1.png`) | `46090cef-b081-49ab-aa26-cc2c52f94284` |
| Evelynn identity, no jewellery (use for every no-jewellery state; staging candidate `art/staging/full-game/chapter5/evelynn-identity-nojewellery-v1-b-candidate.png`, alternate `-a-`) | `0555c297-b834-4e6f-8148-9f6295c194e6` (alternate `81295f5f-6c74-4c3f-967c-47deadc32033`) |
| C5-S02 shopping street, noir house-style master (staging candidate `art/staging/full-game/chapter5/c5-s02-street-master-noir-v1-a-candidate.png`; anchor for C5-S02 frames) | `7c56dc53-192a-465c-8066-c4b7cf1493e0` |
| Axiom office, Maya v2 (near-future interior and richness reference, `art/production/opening/axiom-opening-office-shot01-maya-v2-production.png`) | `b0d169e9-993e-4ef2-9f36-0bc78e46b18a` |
| Helix gala, Evelynn (glamour and richness reference, `art/reference/evelynn/evelynn-helix-gala-v1.png`) | `cbc5c03e-46df-40e3-a11d-33511eec897e` |

All uploaded 2026-09-23 at original size through the one-time upload page (Claude in
Chrome `file_upload`, no resize). That is the working route for local files; base64
upload is too large for these PNGs.

## Identity block (append the relevant lines to each prompt)

- **Evelynn:** adult woman, dark brunette to near-black hair, sharp elegant face, defined cheekbones, almond eyes, strong brows, slim graceful build. **No white or grey streak.**
- **Maya:** warm brown skin, watchful dark eyes, black hair usually in a loose high knot, softer more compact face than Evelynn. Must not share Evelynn's face, hairline, eye shape or gala earrings.
- **Sloane:** black shoulder-length hair with a white streak at her **anatomical right** temple (viewer's left when she faces camera). The streak belongs only to Sloane.
- **Julian:** use the existing executive visual base (`art/staging/cast-scenes/eve-cast-executive-v1.png`); fixed age and appearance.
- **Benton:** compact, 58, silver hair, fitted charcoal suit.

Always add `mouth closed, restrained expression` unless the beat calls for speech or a stated emotion; Seedream defaults to smiling.

## Content ceiling for generated images

Images stop at suggestive or implied: clothed or partly dressed, closeness, a
touch, a bedroom or hotel threshold, aftermath. Explicit content lives only in the
prose produced by the local writer pipeline
([docs/story/intimate/README.md](../story/intimate/README.md)). No image depicts the
clinic procedures sexually, and no image sexualizes a scene where Evelynn is under
coercion.

## Pre-acceptance QA gate (full-size, every candidate)

1. Rendering matches the reference: ink lines present, flat cel shading, no photographic skin.
2. Every person has two arms, two legs, five-fingered hands, one head; no fused or duplicated limbs or props.
3. Faces on model; Maya and Evelynn distinct; streak only on Sloane and on the correct side.
4. Wardrobe matches the prose for this exact state (e.g. Maya's black sweater at Lantern, navy suit at the office).
5. Prop custody: nothing appears before it is introduced or after it leaves (cups, slates, files, phones).
6. Room geography and camera match the scene's anchor frame.
7. Nothing reveals a later event, person or branch.

A failing candidate stays in staging with a REVISE/REJECT note. PASS is a review
recommendation; approval and runtime binding follow the existing record process.
