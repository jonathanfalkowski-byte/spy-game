# PRIVATE ACCESS — presentation contracts

Chapter 4 is playable as text. No images were generated or promoted in this implementation.

## Offline adult handoff

`src/narrative/adult-scenes/chapter4.ts` exports `createChapter4Handoff(state)`.
Supply a real authenticated revision-15 state at `chapter4.handoff`, then call
`.issue('fade_to_black')` to obtain the immutable `AdultSceneSpec`.
The factory authenticates the save through the existing workspace validator.
The static `productionOutcomes` array remains empty: this contract depends on the
actual committed scope and motive, rather than a reusable unbound encounter.

The scene is `chapter4.private-time`; its variants are `chapter4.no-sex` and
`chapter4.sex`. Canonical outcomes are `chapter4.physical-without-sex`,
`chapter4.voluntary-encounter`, `chapter4.instrumental-encounter`, and
`chapter4.mixed-encounter`. All end at `chapter4.private-access`.
Refusal, flirtation only, quiet time and withdrawal are runtime outcomes and do
not export an intimate encounter specification.

Both participants are established adults: the player-character, 34, presenting
as Evelynn, and Julian Mercer, 49, Helix Group COO. Actual mutual interest,
completed payment, explicit current scope and absence of a withdrawn invitation
are required. Private motive is writer-only; Julian receives only his actual
delivered authorization. Authority asymmetry is recorded separately from desire,
willingness and consent. No threat, dependency, affection or trust is inferred.

The new offline `delivery` source reference validates the exact recipient, event
and existing typed-history record against the authenticated save. It does not
extend the fixed save-schema NPC object or treat arbitrary event knowledge as
participant knowledge. Earlier prefixes are inspected in their actual authored
revision; complete revision-15 saves still require the explicit continuation.

Exporting or reading a specification does not commit an encounter. The player
can still withdraw. Only `chapter4.fade` commits the selected outcome; no external
draft, generator or approved prose asset is called by the runtime.

## Art requirements

Apply the [Art Bible](../art/EVE_ART_BIBLE.md) and
[review checklist](../art/ART_REVIEW_CHECKLIST.md). These are pending requirements,
not approved assets or generation orders.

| Scene family | Needed illustration and continuity |
|---|---|
| River departure | Call and no-call variants, same actual river path; later-call version must not imply the call happened at 18:00. Retain the established clothing and phone. |
| Public reading room | Independent municipal desk, visibly public, with reader pass and permitted copies. Do not depict a secure private office or Helix credential. |
| Helix review | Approved Julian visual base, age 49 and executive role; bounded professional meeting. Functional supporting staff have no invented major-character identity. |
| Public-file review | Municipal extracts and filed witness statement; no unauthorized private Helix room or unearned confidential annex. |
| Café | Professional and mutually expressed-interest variants only as supported; ordinary seating and consistent character scale. A paid meeting alone cannot select romantic imagery. |
| Practical favor | Distinguish temporary Helix workroom, public desk and certified-copy-only branches. Refusal must not show the rejected resource. |
| Optional private time | `chapter4-private-time-pending`: non-graphic only, current adult eligibility and authorization required. Withdrawal never displays a completed encounter. No art is selected for this ID yet. |
| Collection | Evelynn uses her own pass and retains the permitted packet. Disputed extra material is excluded. |

Prepare 16:9 scene illustrations and matching empty backgrounds when generation
is separately commissioned. Where the active wardrobe differs, generate matching
variants; do not reuse a Glass House gown or bathrobe merely because an older
asset exists. New-day wardrobe must be pinned to its then-authored state before
production. Review anatomy, hand contact, perspective, room geometry, outfit
duplication, record custody and exact participants before promotion.
