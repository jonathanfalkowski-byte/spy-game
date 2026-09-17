# EVE art review checklist

Authority: [EVE Art Bible v1.0](EVE_ART_BIBLE.md). Apply this checklist to human-created
and AI-assisted candidate artwork. Review does not change game state.

Also apply the owner's [Global Cinematic Art Rules](GLOBAL_CINEMATIC_ART_RULES.md) to all chapters. Complete the authoring review below before commissioning shots, then repeat it against actual candidates and intended runtime bindings. Use the [scene visual plan template](SCENE_VISUAL_PLAN_TEMPLATE.md).

## Prose/art authoring review

Record scene, content revision, prose anchors, reviewer/date, covered branches and unreviewed branches. Answer for each scene:

1. Where does the shot begin? Identify its opening composition and actual state.
2. Which lines are dialogue-only? Mark the held shot; changing speaker, thought, emotion or menu is not a cut.
3. Where does physical movement occur? Include entry/exit, location changes, significant posture/proximity changes and important object actions.
4. Does every meaningful movement have a corresponding visual requirement, depicting its result chronologically?
5. Does any visual change happen without an authored trigger? A routine sip or small gesture normally holds.
6. Does any image show a future action, arrival, gift, publication, possession or recipient discovery?
7. Do character, wardrobe, object custody and locked-location continuity survive every cut, including alternate branches and withdrawal?
8. Could unnecessary movement be avoided during new authoring to reduce redundant art? Record proposed prose changes separately; never silently rewrite approved/frozen history to fix an art gap.

Use these exact finding identifiers:

| Flag | Record when |
|---|---|
| `MOVEMENT_WITHOUT_SHOT` | Meaningful authored movement, participant entry, object action or location transition lacks a mapped visual requirement. |
| `SHOT_WITHOUT_TRIGGER` | A cut exists only for another line, speaker, thought, menu or insignificant gesture; or the proposed composition has no authored cause. |
| `FUTURE_STATE_VISUAL` | The visual anticipates an unchosen action, possession, arrival, publication or disclosure. |
| `CHARACTER_CONTINUITY_MISMATCH` | Presence, face, hair, age, proportions or established marks change without cause; remote participation is misrepresented. |
| `OBJECT_CUSTODY_MISMATCH` | Object identity, owner/holder, location or condition contradicts the completed action. |
| `LOCATION_CONTINUITY_MISMATCH` | Shot geography, location, environment or lighting/time/weather contradicts established state. |
| `WARDROBE_MISMATCH` | Clothes, accessories or presentation change without an actual authored change or show another branch's selection. |
| `INTIMACY_STATE_MISMATCH` | Position/contact, nudity or encounter state exceeds current authorization, contradicts withdrawal/AdultSceneSpec, or infers desire from compliance. |

Finding record: **flag | scene/beat/shot | exact prose anchor | branch and actual state | mismatch | required correction | open/resolved/deferred | evidence/reviewer**. Distinguish a mapped requirement with a missing asset (production gap) from a movement with no mapped shot. A paper checklist does not constitute an automated validator or runtime coverage test.

## Shot specification and production gate

- Declare scene ID, beat ID, stable shot ID, location, time, physically present characters and remote participants/medium.
- Declare wardrobe/presentation, positions, object/evidence possession, relationship/intimacy boundary, completed prerequisite action and prohibited conflicting state.
- Verify the trigger has actually occurred before binding the asset. Menus retain the last valid shot. Dialogue holds never depict movement before it happens.
- Preserve canonical environment layout, lighting variants, age, face, proportions, hair, accessories, weather and any established injuries/marks. Show actual object custody across cuts.
- Validate refusal, delay, alternate outfit, absence, non-publication and withdrawal branches where relevant. A shared setting alone does not permit shared branch art.
- Record **SPEC → STAGING → REVIEW → PASS / REVISE / REJECT → HUMAN APPROVAL → PRODUCTION**. PASS is a review result; it does not authorize promotion or canonical-reference status. Existing explicit owner approvals remain recorded; this checklist grants none.
- Record pending shots honestly. A scene is not visually complete until each supported meaningful beat has a valid approved asset or a documented applicable hold.

## Style

- Clearly illustrated rather than photorealistic.
- Matches EVE's graphic-novel / sophisticated adult-animation language.
- Clean, deliberate linework and semi-cel shading.

## Character

- Immediately recognizable relative to approved references.
- Consistent facial proportions, silhouette, and body design.
- Clearly adult age presentation where relevant; an image does not override character age eligibility.
- Wardrobe fits the character and situation.
- Persona presentation does not imply private identity acceptance or verified historical biography.

## Tone

- Sophisticated rather than cheap.
- Supports espionage, power, secrecy, danger, or psychological tension.
- Sensuality, where present, is character-driven rather than random.

## Environment, lighting, and composition

- Believable location supporting the social/power context, with controlled clutter.
- Lighting contributes to the narrative tone and maintains EVE's contrast.
- Camera angle supports the scene; focal point is clear.
- Cinematic composition rather than an isolated pin-up.

## Drift: reject or revise

- Photorealism, generic anime, Pixar/Disney styling.
- Goofy cartoon parody, superhero comics, plastic CGI.
- Random pin-up art, inconsistent anatomy, excessive cyberpunk neon.
- Obvious AI artifacts or an inconsistent character design.

> A slightly less impressive image that clearly depicts the correct character in the
> correct EVE visual language is more valuable than a spectacular image that drifts from canon.

Character consistency has priority over novelty. Style consistency has priority over
individual-image experimentation.

## Decision record

Record the asset ID, Art Bible version, reviewer, decision, date, evidence/source of
approval, and any requested revisions. Approval as a production asset does not
automatically make an image a canonical reference. Canonical-reference approval must
be explicit. A pending candidate remains staging; an explicit rejection remains rejected.

## Evelynn reference roadmap — not generated

1. Canonical front portrait.
2. Canonical 3/4 portrait.
3. Canonical side/profile.
4. Full-body proportions.
5. Expression sheet.
6. Gala wardrobe reference.
7. Business wardrobe.
8. Operational wardrobe.
9. Casual/private wardrobe.
10. Lighting-reference sheet.

Stabilize facial structure and proportions before considering character-specific
training. The gala reference depicts one presentation; its individual gown, hairstyle,
jewelry, pose, lighting, and location are not permanent requirements.
