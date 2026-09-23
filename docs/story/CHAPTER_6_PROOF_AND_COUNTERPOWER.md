# Chapter 6 — proof and counterpower (design)

**Design only. No runtime, schema, choices, art, AdultSceneSpec or UI is implemented
here.** This pins the specifics the treatment left open: the exact proof artifact and
its authentication, the corroborator's firsthand scope, the concrete exit cost, and a
recovery route for each. It resolves backlog items 2–4 of
[eve-continuity-and-next-design.md](eve-continuity-and-next-design.md) into approvable
canon. Authorities: [CHAPTER_6_THE_CAGE_YOU_CHOOSE.md](CHAPTER_6_THE_CAGE_YOU_CHOOSE.md)
(structure), [CHAPTER_6_ENTRY_STATE_MATRIX.md](CHAPTER_6_ENTRY_STATE_MATRIX.md) (carry-forward),
[Master GDD](../design/EVE_MASTER_GDD.md) (autonomy model).

**The five core decisions are settled (owner, 2026-09-23), per the recommendations
below.** They are now Chapter 6 canon for design; implementation still follows the gates
in the treatment (new state fields, migration, replay stability) before prose or code.
Only the small sub-items listed at the end of §10 remain open.

---

## 0. Story thesis — what the proof is really for

The reveal must land as a **human gut-punch, not a spy-plot checkmark.** Its power is
not "Rook was the previous operative" as a twist. It is that Evelynn discovers **the
identity she is living was a real person's whole life, and that person is still out
there.** She is not a unique creation; she is the second person to wear "Evelyn Vale."
That reframes her own autonomy, her transformation, and whether any of this is hers —
which is EVE's actual subject. Every decision below serves that moment.

Three principles follow, and the recommendations enforce them:

- **Reward the investigation.** The proof should reflect how the player played, not hand them a fixed cutscene.
- **Respect the skeptic.** Distrusting Rook is a smart, in-theme way to play. A player who never trusts Rook must still reach a strong ending.
- **Make the reveal cost something emotionally, not just procedurally.**

## 1. The reveal, stated precisely

**Rook is the operative who previously lived and performed the Evelyn Vale identity —
the Singapore-era Evelyn — before Adrian was made Candidate 7A.**

This is why Marcus ("I was beginning to think Singapore had frightened you away",
`mission.ts:128`) and Celeste ("You disappeared before breakfast") greet the current
Evelynn as someone they already know. They are not mistaken and they are not lying:
they knew the *prior* Evelyn. The current Evelynn (Adrian) never lived those events.
The Axiom package (`EV_7A_BLACKGLASS`: Evelyn Vale, age 31, Singapore location history,
99.97% biometric compatibility — `day.ts:200`) is Axiom's own unauthenticated record of
that identity, reused for Adrian.

The proof problem: a claim, a photograph, or "trust me" cannot establish that Rook *was*
that operative. Only a chain of independent links can.

## 2. The proof artifact — exact

**Artifact: the Meridian ledger leaf** *(decided).* A single dated page (or its
authenticated scan) from the courier log of **Operation Meridian** — the Singapore
operation the prior Evelyn ran, held by Rook. "Meridian" is now the operation's name, not
a placeholder.

**Why a document, and why this one.** Its dramatic power is not the cross-check — it is
that the page is **in another person's handwriting.** The moment Evelynn sees someone's
real hand, with its own annotation, inside the identity she was told is a fabricated
package, "Evelyn Vale" stops being a dossier and becomes a person who lived. Keep the
forensic function (it rewards the investigative spine), but the beat that matters is the
human trace. This beats a keyed object, a datable photograph (the game already holds that
photos prove little), or a voice line (hard to authenticate on the page) precisely
because handwriting is a person.

| Property | Specification |
|---|---|
| What it is | One page of a hand-annotated transfer log from the Singapore Evelyn operation, dated within the window the Blackglass package labels "Singapore location history". It records a specific courier handoff by initial and time, in the prior Evelyn's own hand. |
| Provenance | Predates Candidate 7A by the established interval. Rook possesses the physical leaf; Axiom's package holds only a summary location history, not this operational detail. The two must be able to *agree on a fact Axiom's summary does not spell out* — that is the contradiction-resistant detail. |
| Custody | Rook's, sole. Evelynn can be shown it, photograph it on the monitored phone (which then makes it visible to Sloane — a real cost), or be allowed to compare it without taking custody. No route lets Evelynn silently acquire a clean copy, mirroring the Glass House audio/photo custody limits (`mission.ts:203`). |
| Authentication | Cross-check three things that were captured independently: (a) the leaf's dated handoff detail; (b) the Blackglass package's Singapore location history that Evelynn already saw (`day.ts:188,200`); (c) a firsthand memory from Marcus or Celeste (§3). Agreement across all three, where no single source could have fed the others, authenticates it. |
| What it proves | That the person who wrote/held the leaf was operating as Evelyn in Singapore on that date, and that Rook has that person's operational material in hand. Combined with §4, that Rook is that person. |
| What it does NOT prove | Rook's motive, loyalty, or truthfulness now; that Sloane committed a specific crime; the full ORACLE plan; anything about Adrian's own clinic history. Corroboration establishes involvement in a past operation, not present allegiance. |

**Why not the existing Glass House items.** The audio, photograph, access token and wafer
(`mission.ts:203,643–654`) are about the *current* Helix/fund exchange, and their limits
are already fixed (audio → Sloane only, photo can't prove wafer contents, token possession
≠ espionage). They are counterpower material for the current operation, not proof of
Rook's identity. The Rook proof needs a *Singapore-era* item, which the ledger leaf is.
The player's retained current-op evidence is reused in §6, not here.

## 3. The corroborator — firsthand scope

**Celeste Laurent** is the corroborator (decided), over Marcus. Marcus is transactional (acquisitions);
Celeste *touched Evelynn's arm* and said "You disappeared before breakfast" — she knew
the prior Evelyn **personally, perhaps intimately,** and now relates warmly to
Adrian-in-her-place without knowing. That undertow — being cared for as someone you are
not, by someone who knew the original — is the chapter's theme in one interaction. She is
also outside Sloane's institution (an independent sovereign-fund actor), so her
corroboration is structurally cleaner. Marcus stays the fallback.

- **Celeste Laurent** knew the prior Evelyn socially in Singapore. Her firsthand knowledge is limited to **what a close social acquaintance would observe**: a habit, an appearance detail, a shared occasion, a claimed disappearance. She can confirm the leaf's handoff *fits the person she knew* — e.g., that Evelyn was indeed away on that date. She **cannot** supply private medical history, the ORACLE plan, Axiom's internal decisions, or a full identity dossier. She does not know Adrian exists, and she must never be pushed past her real knowledge into a convenient reveal.
- **Marcus Chen** (fallback) knew the prior Evelyn through Helix acquisitions work. His firsthand scope is **professional**: that Evelyn handled a specific transaction, was trusted with a specific access, or was present at a specific meeting. Same hard limits.

The corroborator confirms *one* specific, plausibly-known fact that the leaf implies.
They are not omniscient and are not a second proof by themselves — the treatment's rule:
they establish that Rook knew/was involved in a specified past operation, nothing more.
Neither can be coerced or seduced into exceeding their real knowledge; pushing past it
produces a refusal or a guess, flagged as such (the Undertow "fence a character out"
discipline applies to knowledge, not just presence).

## 4. Player verification — the link Evelynn controls

**Both methods are offered, gated by how the player played** (decided) — the proof scene
should reflect the earlier game, not be a fixed cutscene:

1. **Comparison with retained evidence** *(available if the player kept the evidence).* If the player holds a Glass House item or a Chapter 3 verified-date record (`c3.verified-date`, `chapter3-next.ts:378`), Evelynn compares the leaf's date against her own authenticated trail. A contradiction breaks the claim; consistency across independent captures supports it. This is the investigator's route, earned by earlier care.
2. **Prediction before disclosure** *(the route for a player who kept nothing to compare, and available to anyone).* Evelynn withholds the corroborator's confirmed detail and makes Rook state it first. If Rook predicts the fact Celeste independently gave, Rook has firsthand knowledge of the Singapore Evelyn's actions. This is the active, higher-tension gambit — Evelynn sets the trap and controls the moment.
3. **Refusal path.** A player can decline to run either test. Then Rook stays **untrusted**, the ORACLE escalation (§5) is unavailable, and Chapter 6 still resolves to a strong end through the "your own hand" counterpower (§7) using only current-operation evidence. Proof is optional, never mandatory, and skepticism is not punished.

Outcome states **[design-only fields]**: `c6.rook-proof = untested | broken | supported`.
"Supported" is the threshold for §5; it never becomes "certain".

## 5. ORACLE escalation — bounded

Only if `c6.rook-proof = supported`: Rook points Evelynn to an authenticated ORACLE
assessment (ORACLE is the established predictive system; clearance was denied to Adrian,
`day.ts:43`). It predicted **high voluntary adoption of the Evelyn identity and low
long-term Sloane control**. The chapter may establish that **Sloane knew that limited
prediction and proceeded anyway**.

The chilling turn — and the point of the whole escalation — is what "low long-term
control" plus "proceeded anyway" implies: **Sloane did not particularly care whether she
could control Evelynn. She wanted the adoption itself.** Why is left open; that is the
Chapter 7 engine.

Boundaries (from the treatment, kept): it must not reveal Sloane's final motive, must not
make ORACLE omniscient, and must not treat a prediction as causation. New field:
`c6.oracle-seen = false | true`.

**ORACLE is one flavor of counterpower, not a bigger one, and it is not required for a
strong ending.** It gives leverage over Sloane's *premise*. A player who never trusted
Rook reaches an equally strong end through their own current-operation evidence (§7).
Making both strong is what keeps the game honest about its autonomy promise; gating the
best ending behind trusting Rook would punish the skeptic.

## 6. Exit cost — concrete, state-sensitive

The climax attaches a real exit cost to **one** arrangement the player actually used, then
gives them the counterpower to face it. The arrangement is selected from stored Chapter 5
state (never invented). Each has: the benefit, the term that makes leaving cost something,
timing, what is lost, what remains, and at least one recovery route.

| Entry state (source) | The arrangement | Exit cost (timing, what is lost) | What remains yours | Recovery route(s) |
|---|---|---|---|---|
| `c5.service = julian` (Helix workroom used, + any feedback-call term) | The staffed Helix workroom and Julian's open professional channel | Leaving now forfeits the remaining booked days and any un-taken feedback call; the Helix entry log of your use exists and Julian could reference it. Timing: immediate on refusal of the new request. | Your owned phone, wardrobe, reader pass, published artifact, cash, and every fact you learned. | Self-fund a Harbour week ($60, `c5.service=self` path) or fall back to the public reader pass; the case stays solvable without the room. Cost: money and privacy, both survivable. |
| `c5.service = self` / public reader (independent) | A self-funded or public workspace | There is no provider term to break, so the "cost" is comparative: elite convenience was never yours to lose. A new request from a provider can simply be declined. | Everything; independence is intact. | Pay or wait for public access; no recovery needed beyond time. This profile's drama is a cost comparison, not a trap. |
| `c5.published` (Aster issue released) | The public artifact and the audience it created | A provider or actor can cite the released image/scope to request an appearance or a follow-on. Leaving means restricting future use and possibly correcting a claim publicly. Timing: on the next discovery/appearance ask. | The agreed, bounded rights you actually released; creative approval you retained. | Restrict future use to the exact released scope, issue a correction, or decline the appearance — the audience is also leverage you can aim. |
| Sloane arrangement / institutional (source reports, `c5.message-sloane`) | Institutional cover, monitored phone, subsidized housing continuity | The standing Axiom powers (housing, monitoring) were never a Chapter 5 gift and cannot be revoked as a "benefit"; the exit cost here is that acting against Sloane risks the institutional protection you rely on by default. Timing: on using the ORACLE leverage. | Your independent resources and any evidence you hold. | The §5 ORACLE information is itself the recovery lever: it lets Evelynn bargain from the fact that the operation's controllability premise was predicted false. |
| Maya channel (`c5.maya-clean-line`) | The unmonitored line to Maya | Not a provider benefit and never a debt; it is only exposed if Evelynn arranges the Chapter 6 Counter on a monitored line (see the Maya lane doc). | The friendship, on Maya's own terms. | Use the clean line; Maya sets her own boundary. No provider can price this. |

**No arrangement becomes a cage by luxury alone.** The cost exists only where a term was
actually accepted or a benefit actually used more than once. A player who refused every
extension (as in the read-through) reaches Chapter 6 with the "independent operator"
comparison, not a trap — which is correct.

## 7. Counterpower — the end position

There are **two distinct strong end positions** (decided), and a player reaches one
or the other by how they played. Neither is bigger; they are different kinds of power.

- **The ORACLE truth** *(you trusted and verified Rook: `rook-proof = supported`, `oracle-seen = true`).* You know the operation's own system predicted you would adopt the identity voluntarily and that Sloane's control would be low, and that she proceeded anyway. Your leverage is over Sloane's *premise* — you can renegotiate or refuse from the fact that the thing the operation was sold on was known to be false.
- **Your own hand** *(you never needed Rook, or refused the test).* Your leverage is what you actually built and kept: a Glass House item, a false statement you can now correct, the audience a published artifact created, an accepted term you can enforce or expose. The case is solvable and your position is strong without ever trusting the sender.

A player can also hold both. From whichever position, the end choices (the player picks;
none is the "right" one):

1. **Enforce a term** — hold a provider (Julian, Aster, Harbour) to the exact wording already agreed.
2. **Challenge Sloane** — use the ORACLE prediction to renegotiate the arrangement's terms or refuse a new demand, from a stronger position.
3. **Break the arrangement** — pay the exit cost (§6) and take the recovery route.
4. **Protect someone** — spend leverage or evidence to shield Maya (or another exposed person) rather than to advance Evelynn's own position.
5. **Trade or expose the proof** — give Rook's proof to an actor, or expose the ORACLE fact, accepting the consequences of each.
6. **Decline to use it** — keep the information in reserve; a knowing, un-spent position is a valid ending.

The chapter ends with **increased knowledge and agency**, not a verdict of capture. The
unresolved items (Sloane's motive, the full ORACLE/PROJECT EVE plan, Rook's ultimate aim)
carry to Chapter 7.

**Intimacy: optional, and about the power shift, never the proof** (decided). The
required spine stays sex-free — proof never depends on intimacy (a stated rule), and the
tension is investigative. But allow *optional*, fresh-consent beats that **express** the
changed position rather than advance it: a Julian scene that now plays differently because
Evelynn holds leverage, or the bounded Sebastian goodbye before his Thursday tour. Use
intimacy to *show* the new power, not to obtain it. Each needs its own AdultSceneSpec,
fresh authorization, and a non-intimate alternative, exactly as elsewhere.

## 8. Knowledge boundaries preserved

- No NPC learns anything except through a delivered message, witnessed action, or discovered artifact (the matrix's information rule).
- Marcus/Celeste stay within firsthand Singapore scope; neither resolves the mystery by fiat.
- Sloane remains sourced-only; her motive is not revealed.
- Rook supplying a true detail is not proof of motive or trustworthy allegiance.
- The prior open question — whether receiving Benton's report counts as reading it — is **not** touched here and still needs its own versioned decision.

## 9. New state (design-only sketch, for a later versioned change)

`c6.rook-proof` (untested|broken|supported), `c6.oracle-seen` (bool), `c6.exit-arrangement`
(the selected arrangement id, derived from Chapter 5 state), `c6.exit-action` (paid|
negotiated|public|exposed|protected|declined|deepened), plus a sourced consequence record
(benefit, provider, term, obligation, alternative cost, actor knowledge, request, response,
recovery). No dependency score. Any implementation must preserve revision-15/16/18/19
replay and add its own content revision.

## 10. Decisions — settled (owner, 2026-09-23)

| # | Decision | Settled answer |
|---|---|---|
| 1 | Artifact | The **Operation Meridian ledger leaf**, a Singapore courier-log page **in the prior Evelyn's handwriting**; the human trace is the beat. |
| 2 | Corroborator | **Celeste** (personal, outside Sloane's institution); Marcus is the fallback. |
| 3 | Verification | **Both methods offered**, gated by retained evidence — comparison for the player who kept evidence, the prediction gambit otherwise; refusal always available. |
| 4 | ORACLE requirement | **Not required for a strong ending.** Two distinct strong end positions — the ORACLE truth, and "your own hand" — so the skeptic is never punished. |
| 5 | Intimacy | **Optional, never required, tied to the power shift** (a changed-dynamic Julian scene, the bounded Sebastian goodbye); the spine stays sex-free. |

Small sub-items still open (not blocking): whether Chapter 7 is scoped now or after
Chapter 6 prose, and the unrelated Benton receipt-versus-reading question, which this
design does not touch. The implementation gates in the treatment (new state fields,
migration, revision replay) still apply before any prose or code.
