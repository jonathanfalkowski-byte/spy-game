# Milestone 1 — player, character, identity, and context

## Scope and status

This milestone adds validated metadata and read-only selectors. It does not introduce
story choices, psychology, power consequences, romance, an LLM, image generation, or
a new renderer. The deterministic game engine remains authoritative. Existing scenes,
dialogue, save payloads, and original references remain unchanged.

The canonical name in new display metadata is **Evelynn Vale**. The internal identity
ID remains `evelyn`. Original introduction prose and historical/save strings retain
their previous spelling. No global substitution or historical rewrite is performed.

## Five separate concepts

| Concept | Representation | What it does not establish |
| --- | --- | --- |
| Persistent playable character | `playerBinding`: local-player → player-character; character display name Evelynn Vale | A statement of private identity acceptance |
| Current presentation | `playerView(state).presentation`, derived from an existing committed event | Permanent identity, biography, attraction, consent |
| NPC interpretation | Existing sourced `npcs.known`/`beliefs`; narrow persona-observation adapter | The canonical bearer of a persona |
| Historical record | `earnedIdentityClaims(state)` with identity ID, claim layer, source, event | Verified player autobiography or historical bearer |
| Private interpretation | Existing mirror choice and event, separate from the spoken name response | A generalized acceptance flag or another character's knowledge |

`CharacterSchema` now describes people only. Eight character records exist: one
playable character and the seven existing NPCs. Neither `adrian` nor `evelyn` is a
character/NPC ID in the new model. `IdentitySchema` describes the two established
presentations. Helix remains a company in the existing mission content.

The original character introduction is nested under `introduction`. The original
identity-package introduction is retained under identity metadata, not counted as an
independent person. The catalog remains `characters.ts`, with identities in its
companion `identities.ts`; there is no second relationship or mutable character store.

## Continuity without acceptance

The player binding is constant through every route. The read-only presentation view
starts with the opening ordinary identity `adrian`. After physical change, before an
explicit public presentation event, it returns `null` rather than guessing from voice,
clothing, profile, or private feelings. Entering Glass House reception through the
existing `arrival.enter` event establishes operational presentation `evelyn`.

This selector describes the latest established presentation in the current authored
slice; it is not a general identity-switching system. A future event can explicitly
change presentation without changing the controlled character or private interpretation.

For example, the existing `name.correct` and `mirror.anger` choices can coexist with
operational presentation `evelyn`. The selector retains both choices with their event
numbers. It never converts `name.answer` (answering for the operation), silence,
customization, or physical progression into identity acceptance.

`characterForLegacyCustodian` maps the existing token/capture ownership values to a
stable person for future consumers. It is deliberately an evidence-custody adapter,
not an NPC knowledge resolver or a global name-to-person lookup.

## Character canon and adult eligibility

Structured canon contains sourced facts, optional age, and optional private secrets
and objectives. Maya's name, occupation, appearance, and background come verbatim
from existing content. No motivation, attraction, consent, allegiance, vulnerability,
or relationship development is invented. Missing fields remain missing.

Known exact ages are migrated for the playable character (34 in the opening), Maya
(33), Daniel (32), and Benton (58). Approximate ages remain in the legacy descriptions;
they conservatively yield unknown structured eligibility until explicitly migrated.
The identity package's claimed age of 31 is separately attributed. It cannot establish
the bearer's age or make a minor character eligible. Adult eligibility concerns age
only, never desire, consent, availability, or encounter permission.

## Information firewall

The three layers are implemented without a provider:

1. **Canonical truth:** existing validated GameState plus character and identity canon.
   The controlled character and actual operational presentation may be known here.
2. **Beat projection:** a strict, trusted engine-authored allowlist tied to the exact
   scene node and revision. This describes selected facts and visible beats, not the
   reasons behind them. A future model cannot supply its own authorization policy.
3. **Narrator context:** a fresh object containing only authorized selections. Neither
   the full state/catalog nor the player binding/private interpretation is forwarded.

Default selections are empty. Character facts need an authored prerequisite present
in player knowledge. NPC observations require the exact NPC, knowledge/belief layer,
key, source, and event. Private canon secrets/objectives are not selectable. Persona
observations have an observer and identity ID, without a bearer-character field.
Identity displays require earned identity knowledge; historical claims remain claims.

### Concrete existing-story example

After Marcus's greeting, canonical state contains the player binding, operational
presentation, private mirror/name choices, and Marcus's sourced interpretation.
An authored projection can select:

- speaker character `marcus`;
- identity display `evelyn` → Evelynn Vale;
- Marcus's exact greeting interpretation from `npcPersonaObservations(state)`;
- an authored visible beat about leaving the shared recollection unspoken.

The narrator context contains that identity display and the observation marked
`belief`. It does **not** contain `player-character`, the Adrian/persona association,
private mirror choices, or a historical bearer. Selecting `mission.singapore`
separately adds Marcus's sourced claim, not a verified memory belonging to the player.
The regression test `projects persona recognition without exposing the player/persona
association` executes this example rather than relying on documentation alone.

### Limits and failure behaviour

Bounds are 8 canon records, 12 player knowledge keys, 8 NPC observations, 2 identity
displays, 4 identity claims, 4 persona observations, 6 beats of up to 500 characters,
and a total serialized UTF-8 context budget of 16,000 bytes.

Malformed, stale, extra-field, unearned, or mismatched requests are rejected.
`tryProjectNarratorContext` returns `authored-fallback` without changing state or
returning partial context. It performs no rendering or network call. Future callers
must keep the existing authored renderer when they receive that result.

This is an information-flow contract, not semantic spoiler detection. Trusted authors
must choose appropriate prerequisites and spoiler-free beat text. Deliberately writing
a secret into an approved beat bypasses its purpose; schemas cannot understand that.
The local game's bundled files also remain inspectable outside normal play.

## Compatibility

- Save schema **5**, content version **9**, storage key, actions, and ledger are unchanged.
- No saved identity adoption, presentation, or psychological fields are added.
- All original introduction fields and all 13 review saves are compared to preserved
  data in tests. Replay remains the compatibility authority.
- Frozen engines and source references are not modified.
- Existing UI labels and authored spelling remain intact; new consumers should use
  display metadata rather than derive names from stable IDs.
- The new CharacterSchema is an internal content-contract change: consumers use
  `displayName` and `introduction`, while person IDs and identity IDs are separate.

## Deliberately unresolved

Who the historical persona records describe, which recollections are accurate, how
those records were produced, and what the playable character eventually accepts
remain unresolved. Axiom's claims and an NPC's apparent familiarity do not resolve
those questions. Presentation intensity must never resolve them either.

## Milestone 2 boundary

Future relationship records can attach to stable character IDs; NPC-specific identity
beliefs can attach to identity IDs without revealing canonical associations. Existing
sourced events provide references for later leverage, compromise, obligation,
vulnerability, and authority records. These systems are not implemented here.

Consent, obedience, desire, affection, fear, dependency, loyalty, trust, resentment,
and resistance must remain independent. No numeric rescaling, inferred motivation,
corruption score, or automatic consequence formula is introduced.

## Verification commands

```powershell
npm.cmd test -- tests/state/identity.test.ts tests/state/narrative-context.test.ts --maxWorkers=1
npm.cmd run test:coverage -- --maxWorkers=1 --testTimeout=30000
npm.cmd run test:browser -- --workers=1
npm.cmd run build
npm.cmd run check:references
node scripts/check-content8.mjs
```

## Verified results — 2026-09-15

- New identity/context suites: **17 passed**.
- Complete Vitest suite with coverage: **118 passed**, 12 files, 100 seconds.
- Complete Playwright suite: **55 passed**, 4.3 minutes. This includes production
  build/typecheck at web-server startup, keyboard/narrow layouts, every ending
  category, legacy migration, backup restoration, and browser close/reopen.
- TypeScript also passed as a separate check during implementation.
- Both original reference hashes and all 18 frozen content-8 hashes: unchanged.
- Context module: 100% line coverage, 94.44% branch coverage. Overall coverage is
  84.02% lines and 67.74% branches, including frozen historical engines.
- The existing Vite warning about a chunk above 500 kB remains; it is not a build
  failure and this milestone does not attempt bundle restructuring.
- No commit, push, deployment, or user save replacement was performed.

Files changed: `src/content/characters.ts`, `src/content/schema.ts`,
`src/content/validate.ts`, `src/content/character-schema.ts`,
`src/content/identities.ts`, `src/state/player.ts`, `src/narrative/context.ts`,
`tests/state/identity.test.ts`, `tests/state/narrative-context.test.ts`, and this document.
Ignored build/coverage/browser artifacts were regenerated. The prior packaged review
ZIP was not replaced.

Milestone 2 requires separate approval.
