# Chapter 3 Scene 2 implementation and first art correction review

Date: 2026-09-16. Authority: revised Chapter 3 playable treatment, post-transformation
home and expanded Glass House implementation, EVE Art Bible v1.0.

## Ordered delivery

The logic/prose/continuity implementation was committed and pushed first as `e40ae0d`,
with no production-art promotion. The owner then authorized exactly the quoted first
four-image correction batch, delegated visual review against the Art Bible, and
promotion only of passing images. No further paid generation was submitted.

## First correction batch

Task `101efa21-c245-493c-bdd8-9d3d4dc71c29`: four completed edits, quoted at one credit
each, total four. Submitted prompts and parameters match the saved proposal exactly.
The proposal retains its historical approval-pending status; the separate execution
receipt records the subsequent authorization and completed task. Original outputs,
dimensions, provider IDs and SHA-256 hashes are retained. No temporary download URL is
required to reproduce the audit trail.

Codex inspected each full-size PNG under the owner's delegated approval. The owner
has not been represented as personally viewing these new outputs.

| Asset | Decision | Evidence |
|---|---|---|
| Wardrobe background | PASS; production | Exactly one suit, long gown and plain charcoal cocktail dress; no tactical harness. Empty room, perspective and illustrated style preserved. |
| Maya evening scene | PASS; production | Black sweater corrected; Maya, Adrian, Lantern booth and semi-cel style preserved. |
| Sloane office background | PASS; production | Daytime skyline and cool window light; room geometry preserved. Graphic shadows are consistent with the Art Bible. |
| Sloane office scene | REVISE; staging only | Daylight corrected, but the silver streak remains on the wrong anatomical side. No retry authorized or submitted. |

Production copies are byte-identical to the reviewed originals. Promotion does not
establish a new canonical reference or enable runtime artwork. The planning coverage
map points to the passing corrections but stays disabled until complete branch guards
and runtime integration are reviewed. Scene 2 currently uses text presentation.

Review gallery: `art/staging/cast-scenes/continuity-review.html`. Production records:
`art/production/continuity/records.json`. Request and quote evidence:
`art/staging/cast-scenes/continuity-batch-receipt.json`.

## Playable continuation

Scene 2 begins through an explicit action at the Scene 1 endpoint. Maya can be called
or left uncontacted. Her opening uses actual received adaptation knowledge, without
inferring the Evelynn identity from hearing a changed voice. Choices preview exact
disclosures and monitoring exposure; missed-call apologies and corrections of the
Benton work excuse appear only when those events actually occurred. A 06:45 call for
the following morning exists only after Maya explicitly accepts it. That call remains
future at the 06:15 endpoint.

Sloane's exchange selects the strongest authenticated original source: the Voss
directory lookup, then the intercepted warning, otherwise Evelynn's existing access
restriction. Each personal-pressure chain requires matching original exposure,
receipt, record and committed actions before Chapter 3 entry. Missing or mismatched
links fail closed. Private affection, witnessed escort, in-person confidence and later
monitored calls do not create Sloane receipt. Axiom monitoring availability and named
NPC knowledge are separate records.

Every response closes Sloane's channel, then any selected Maya follow-up, before
food, sleep and the following morning. Possible scrutiny is an attributed claim, not
a disciplinary action. Maya can refuse investigative help while remaining personally
present. No automatic trust reward, identity acceptance, treatment authorization,
custody transfer, employment change or housing deadline reset occurs.

## Persistence

New runs use content 13. The complete content-12 reducer dependency graph is frozen
from `e40ae0d` in `src/persistence/legacy-v12`; its 38 source files are checked against
the commit and hash manifest. Existing saves load without advancement or writes.
Only explicit continuation at a completed, authenticated content-12 Scene 1 checkpoint
can move to content 13. It first authenticates frozen replay and proves every prefix
field matches the new replay except the version marker, then appends the action.
Older content-11 behavior remains frozen. Envelope, marker, snapshot and ledger must
agree. Stale, repeated or out-of-phase actions are rejected.

## Scope boundary

This increment implements Scene 2 through overnight closure. Voss's care discussion,
the sender's verification path, Helix and subsequent scenes remain treatment material.
The failed Sloane image, apartment variants and later costume corrections remain
outside the four-credit batch. No additional generation or deployment occurred.

## Validation

- 278 unit tests passed, including frozen-source hashes, exact snapshot continuity,
  all three pressure tiers, incomplete source chains, explicit disclosure and call
  arrangements, every new phase's save/reload, and exact art request/PNG provenance.
- 68 Chromium browser tests passed, including both new Scene 2 flows, desktop and
  390-pixel layout, old-save continuation, keyboard interaction and existing routes.
- Desktop disclosure-preview and narrow access-branch captures were visually inspected.
- Typecheck and production build passed; original prototype and GDD hashes unchanged.
- Vite reports a large bundle warning from the current bundled story/save engines.
  This does not fail the build; bundling changes are outside this narrative increment.
