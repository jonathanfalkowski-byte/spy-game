# Chapter 6 entry-state matrix — The Cage You Choose

**Design only.** This matrix reads existing Chapter 3–5 state and records. It adds no schema fields, reducers, content, runtime scenes, UI, art binding, relationship status, knowledge, obligation, or consent. A later implementation must trace every callback to an authenticated source event and preserve revision-15/16 replay.

## Reading rule

Use the actual stored key or sourced record. If a value is absent, Chapter 6 treats it as **unknown / not established**, not as a negative or a hidden default. A player’s motive, an NPC’s private feeling, and an external fact are distinct. No route label is exposed to the player.

| Carry-forward axis | Current evidence / state family | Chapter 6 design use | Do not infer |
|---|---|---|---|
| Julian professional relationship | `c3.helix-window`; `c4.audit-paid`, `c4.julian-kept`, `c4.method`, `c4.personal-withdrawn`; Chapter 5 `julian5()` guard | Gate only the concrete professional access, completed fee, kept window and new work conversation that actually occurred. | Employment, exclusivity, private access or an obligation from a meeting alone. |
| Julian personal relationship / intimacy | `c4.mutual-interest`, Chapter 5 `c5.mutual-interest`, `c5.want-target`, `c5.desire`, `c5.motive`, `c5.authorization`, `c5.intimacy` and withdrawal record | Fresh interactions can recognize a prior explicit outcome without treating it as current permission. | Attraction, willingness, sex, affection, or a relationship where no source establishes it. |
| Julian-provided resources | `c5.service=julian`, duration/call records, service confirmation | Show the stated room/service benefit and only accepted feedback-call terms. | Housing, money, transport, surveillance, or an unlimited personal debt. |
| Self-funded / public alternatives | `c5.cash`, purchase and payment records; `c5.service=self` or municipal/public-reader outcome | Give independently funded players a real path with cost, privacy and friction. | That a lower-cost option disappeared merely because a premium option was offered. |
| Editorial / public visibility | `c5.offer`, accepted concept/scope records, `c5.published`, `c5.event-photo`, exact released artifact | Let a public artifact create sourced opportunities or scrutiny after an actual discovery path. | Universal recognition, a career, image rights beyond the agreed scope, or NPC knowledge without delivery. |
| Representation / exclusivity | Exact Chapter 5 offer and terms records only | A later request may cite an accepted term, provider and consideration. | A representation agreement, exclusivity, or ongoing public control where no term exists. |
| Money and purchases | `c5.cash`, `c5.purchase`, `c5.placement`, money records | Preserve owned phone, wardrobe, clasp, meal, receipt and chosen location as concrete resources. | A gift, debt, or new source of money. |
| Maya relationship and knowledge | `npcs.maya.known`, delivered Chapter 3/5 messages and calendar/history records | Maya responds to what she received and her own stated boundary. | Knowledge of private motive, unshown intimacy or undisclosed resource terms. |
| Sloane knowledge | `npcs.sloane.known`, source reports, `c5.message-sloane` records | Her concern remains an attributed institutional judgment tied to what reached her. | Omniscience, jealousy, a secret author of outside opportunity, or final motive. |
| Rook / unknown sender contact | `c3.verified-date`, `c3.compared-date`, `c3.rook-window`, sender delivery records; Chapter 5 sender message | Supply a selective-information trail that can make a proof request meaningful. | A named identity, trust, allegiance, presence, or complete knowledge of prior Evelynn history. |
| Voss | `c3.review-done`, qualification/scope records, delivered Voss messages | Retain medical/administrative boundaries and pending formal review. | A booked procedure, personal access, romance, or access to unrelated private files. |
| False statements / exposure | Authenticated Chapter 3 assertion, correction status, Chapter 4 method, delivery/recipient records | Let an actual recipient challenge an actual statement or leverage it. | Discovery by an uninformed actor or a false statement that the player never delivered. |
| Leverage held / exposed | `c3.memo`, correction/pressure records, exact messages, proofs and recipients | Support a bounded bargain, correction, threat, refusal or counter-disclosure with named evidence. | Guaranteed compliance or a general power score. |
| Housing, transport and security | Existing clinical/access/care records and any explicit Chapter 5 service record | Treat each concrete provider, scope, term, and alternative separately. | A Chapter 5 housing/transport/security benefit if no stored source establishes one. |

## Design-only consequence ledger

A later Chapter 6 implementation may add only explicit, sourced records for: benefit supplied; provider; term; accepted obligation; fulfilled obligation; alternative cost; actor knowledge; actual request; response; and recovery or exit action. It must not replace these axes with a dependency score.

## Entry profiles for scene selection

These are writer-facing combinations, not persistent route labels.

| Profile | Evidence threshold | Dramatic opportunity | Preserved exit |
|---|---|---|---|
| Independent operator | Self-funded/public alternative or refusal of provider extension; no accepted dependency term | Convenience becomes a cost comparison instead of a trap. | Pay, wait, use public access, decline or renegotiate. |
| Supported professional | Actual Julian or editorial resource with named scope and no completed obligation | A useful benefit meets a new request that may be accepted, narrowed or refused. | Retain earned benefit while rejecting the new request. |
| Visible public actor | Released editorial/public artifact plus a sourced discovery | Visibility creates audience demand, opportunity or scrutiny. | Restrict future use, correct a claim, decline an appearance, or use attention strategically. |
| Bound by an accepted term | Explicit service/feedback or representation term exists | A concrete future choice conflicts with a real prior term. | Fulfil, negotiate, buy out, invoke a fallback, or accept a recorded breach. |
| Selective-information player | Verified sender/Rook trail and retained documents | The player can demand corroboration before granting credibility. | Withhold, seek another source, expose manipulation, or trade verified knowledge. |
| Exposed strategist | A real pressure/false-statement/disclosure route with known recipients | A past tactic becomes a specific reputational or leverage problem. | Correct, defend, disclose further, negotiate, or accept the cost. |

No profile decides Evelynn’s morality, relationships, or future consent.
