# Evelyn → Evelynn display compatibility audit

This checkpoint changes only current player-facing presentation. Authenticated
content, reducer state, ledger events, save bytes, replay validation and raw
history remain authoritative and unchanged.

## Occurrence audit

| Classification | Examples | Treatment |
| --- | --- | --- |
| Stable internal ID | `evelyn`, `voice.evelyn`, `owner: 'Evelyn'` | Unchanged; these drive state and identity association. |
| Authenticated frozen prose | `src/persistence/legacy-v13` through `legacy-v16`, legacy `day.ts` and `mission.ts` wording | Unchanged; hashes and replay continue to use raw bytes. |
| Current-authoring prose | Current Chapter 3–5 content and state records using `Evelynn` | Unchanged; already canonical. |
| Player-facing UI | Narrative blocks, choices, journal, casework, scene headings and restore preview | Routed through the centralized display helper. |
| NPC knowledge / state strings | `npcs.*.known`, provenance, capture custody and records | Stored values remain raw; UI projections normalize them at render time. |
| Tests / fixtures | Historical assertions and replay fixtures | Retained as raw/authenticated expectations; compatibility tests assert both layers. |
| Debug / archival output | Raw history, saves, identity introductions and QA transcripts | Bypasses the helper and remains exact. |

The audit found no gameplay branch, scene-art selector, save validator or replay
check that uses a rendered display name. The one legacy `Evelyn` alias in
`src/state/player.ts` and the `owner: 'Evelyn'` state values are semantic
compatibility/state data, not UI text, and are deliberately untouched.

## Architecture

`renderCanonicalIdentityText` in `src/ui/reading-presentation.ts` is the single
presentation boundary. It normalizes `Evelyn Vale`, `EVELYN VALE`, both
possessive apostrophe forms and standalone operational `Evelyn` while leaving
the lowercase stable ID `evelyn` unchanged. `displayName` remains as a
compatibility export for existing UI callers.

The helper is applied only to player-facing text. It is never called by the
reducer, persistence, hashes, replay, raw QA transcript storage or archival
identity metadata.

## Examples

| Raw stored/authenticated text | Player-facing rendering |
| --- | --- |
| `Evelyn Vale already has an invitation.` | `Evelynn Vale already has an invitation.` |
| `EVELYN VALE` | `EVELYNN VALE` |
| `Evelyn’s photograph` / `Evelyn's name` | `Evelynn’s photograph` / `Evelynn's name` |
| stable ID `evelyn` | stable ID `evelyn` |

The deterministic compatibility tests preserve raw source and save bytes,
assert the stable ID, verify the historical identity introduction remains
`Evelyn Vale`, and replay a Chapter 5 route after rendering without changing
state or ledger results.
