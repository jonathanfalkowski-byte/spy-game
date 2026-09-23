# Own-power route — development design (draft)

**Design draft for owner review.** The first route arc built after Chapter 6, and the
template for the other three lanes. No runtime/schema/content is implemented here. Builds on
[CAMPAIGN_ROUTE_MAP.md](../CAMPAIGN_ROUTE_MAP.md) (settled: four lanes, own-power first, one
reconverged endgame), [CHAPTER_7_ROUTE_CONFIRM.md](../CHAPTER_7_ROUTE_CONFIRM.md) (the entry
beat), [FUTURE_TRAJECTORIES.md](../../design/FUTURE_TRAJECTORIES.md) (Free Agent + Celebrity
Power families), and the [Master GDD](../../design/EVE_MASTER_GDD.md) autonomy law.

## 1. Thesis and question

Own-power is the purest test of the game's core promise. **Can Evelynn reach the truth and
hold her ground with nothing but what she built herself, against institutions with far more?**

The answer the route earns: **yes — slower, poorer, more exposed, and entirely hers.**
Independence is real, not a fantasy of costless freedom. Every institution can outspend and
out-access her; what she has instead is control of her own evidence, an audience she can aim,
and alliances she chose. The route dramatizes the trade honestly: she is freer and she is
more alone, and both are true.

This lane carries the **Free Agent** and **Celebrity Power** trajectory families. A player
who published (`c5.published`) leans on audience; a player who self-funded and refused
provider help leans on evidence and independence; most own-power players are some of both.

## 2. Entry — what carries from Chapter 6 (`route.entry`)

The Chapter 7 confirm beat sets `route.lane = own-power` and `route.entry`:

- **built** — arrived on the road she walked: self-funded workspace, kept evidence, published audience, refused-provider independence. Full footing.
- **partial** — pivoted from an adjacent lane (executive or outside). Some standing carried, some to build; the opening acknowledges the turn.
- **unbuilt** — a hard pivot from institutional (the opposite lane). She chose independence against a history of leaning on the institution, and the route **opens on the cost of that choice** — she starts nearly from nothing and builds it here.

Also read: `c5.cash`/purchases (money is now a live constraint), `c5.published` (audience),
held Glass House items / `c3.verified-date` / the Meridian proof (`c6.rook-proof`), the Maya
relationship and `c6.maya`, Rook trust (`c6.oracle-seen`), and any false-statement leverage.

## 3. What makes own-power distinct — four systems

A lane must give the player what the others cannot and cost what they do not. Own-power's
four systems are its signature; each development chapter exercises them.

1. **Money is a live constraint.** Unlike the executive/institutional lanes where a provider absorbs cost, the own-power player spends her own. A small, legible cash economy (built on `c5.cash`, not a grind): some moves cost money; running low forces a real choice — take a paid public gig, trade information, or accept a one-off favour at a cost to her independence-standing. Poverty is a pressure, never a fail state.
2. **Audience as leverage.** With a public artifact/audience, she can *aim* attention: expose a fact, shield a person, pressure an actor, or trade reach for access. Visibility she steers, not that steers her. Without an audience she has less reach and must lean harder on evidence and alliances — a real difference between the Celebrity-Power and Free-Agent flavours of the same lane.
3. **Selective alliances.** She has no faction, so help is assembled transactionally and stays bounded: Rook (information, unreliable provenance), Maya (bounded reads, friendship, her own safety at stake), a public/editorial contact (reach on terms), Marcus/Celeste (bounded Singapore witnesses). Each alliance has terms and a limit; none becomes a faction that owns her. Spending an alliance costs something and can strain it.
4. **Evidence control.** She reaches the truth by holding and *combining* her own evidence — the Glass House items, the Meridian proof, verified dates, public records — rather than being handed institutional access. This is the system that guarantees the autonomy law: the investigation is solvable this way, at every gate.

## 4. The arc — development chapters → reconvergence

Own-power development runs roughly Chapters 7–9 (~6–8h), then reconverges into the shared
endgame. Each chapter advances the investigation toward the endgame's questions (Sloane's
motive, the full Project Eve / ORACLE plan) by a distinctly *independent* road, and exercises
the four systems.

### Chapter 7 — Standing Alone
Establish independence and its first real test. A concrete problem an institutional player
would solve by requisition, but she must **earn**: she needs a fact she has no clearance for
— e.g. **who actually authorized reusing the Evelyn identity for Candidate 7A**, the seam
between ORACLE's prediction and Sloane's decision. She solves it with own-power tools only:
public records, a bounded Maya read, a trade with Rook, or aiming her audience. The chapter
proves the route is viable, sets the money/exposure cost of operating alone, and — on the
`unbuilt` entry — is where she assembles the base she pivoted away from having. Opens on the
confirm-or-redirect beat.

### Chapter 8 — The Cost Bites
Independence's price comes due. Money runs low, or her exposure draws institutional notice —
**Sloane registers the independent operator poking at Project Eve** (using the sourced-only
model: Sloane reacts to what she can see, not omnisciently). Evelynn must leverage: aim her
audience, spend an alliance, or take a costly one-off. A **crossover** appears — an
executive or institutional shortcut (Julian's access, or Sloane's "come inside and it gets
easier") that would solve the immediate problem at a real, refusable cost to independence.
The route's temptation, and its refusal is worth as much as its acceptance. She advances the
case toward the ORACLE/Project Eve truth on independently-corroborated evidence.

### Chapter 9 — Assembling the Case
She gathers enough, from her own sources, to enter the endgame from a position she built.
The independent corroboration of the Rook/ORACLE truth is completed here — or, for a player
who never trusted Rook, her own-evidence case is. She chooses what she is bringing to the
confrontation and on whose terms.

### Reconvergence (Chapter 10+, shared)
The ORACLE / Project Eve confrontation where **Sloane's motive resolves** (per the route
map, one shared operation for all lanes). Own-power brings: independently-held evidence, a
public audience she can deploy, and no institutional leash. The endgame reacts to her arrival
as *the operator no faction authored* — her exits differ from an institutional or executive
player's: expose it publicly, force a reckoning on her own terms, walk with the truth, or
trade it. What it must remember: her self-funded resources, her retained evidence custody,
her public exposure, who she refused, and that she owes no faction.

## 5. Allies and antagonists (this lane)

| Figure | Role on own-power | Bound by |
|---|---|---|
| Rook / the sender | Optional information source; she can use without trusting | Unreliable provenance; only what the proof established |
| Maya | Friend; bounded public-file reads; her own review/safety a live concern (the Ch6 protect thread) | "My work files stay at work"; her own limits |
| Public/editorial contact (Aster editor or a journalist) | Reach and publication, on terms | Exact rights/scope; not a patron |
| Marcus / Celeste | Bounded Singapore witnesses | Firsthand social/professional scope only |
| Sloane / Helix | The institutional pressure she operates *outside* of — not allies; they notice her | Sourced knowledge; not omniscient |

## 6. Crossover (per the route map's crossover doctrine)

- A **one-time executive crossover** (take Julian's access once) or a **one-time institutional shortcut** (accept Sloane's help once) is available at the Ch8 pressure point. Each changes access but costs independence-standing and is fully refusable. Crossovers change *access, never biography* — using one is remembered as a choice with a price, not a route switch.
- **Public visibility reshapes covert access:** a large audience opens some doors (people take her call) and closes others (she is watched). The lane makes that two-edged.

## 7. Autonomy proof (the guarantee)

At every gate, the investigation is solvable with own-power tools alone — public records,
held evidence, assembled alliances, aimed audience. No required proof sits behind an
institution she must join or an intimacy she must give. Money can be *tight* but never a wall
with no legal, affordable way through. This is the property that makes own-power the correct
first lane: if the case is solvable here, it is solvable everywhere.

## 8. State sketch (design-only, for a later versioned build)

Reads: `route.lane`, `route.entry`, `c5.cash`, `c5.published`, `c6.*` (proof, oracle-seen,
maya, exit-action, leverage). New per-chapter `c7.*`/`c8.*`/`c9.*` flags for the beats above,
plus a small `own.cash` running constraint (seeded from `c5.cash`) and `own.alliance.*`
records (rook/maya/editor: engaged, spent, strained) and `own.audience` (from `c5.published`,
spendable). All sourced and re-derivable; no dependency score. Additive in a new content
revision, gated like Chapter 6 until scripted.

## 9. Open decisions for the owner

1. **The Ch7 driving question — SETTLED (owner):** "who authorized reusing the Evelyn identity for Candidate 7A" — the seam between ORACLE's prediction and Sloane's decision. Scripted in [CHAPTER_7_OWN_POWER_SCRIPT.md](../scripts/CHAPTER_7_OWN_POWER_SCRIPT.md).
2. **The endgame's actual plot.** The reconverged ORACLE/Project Eve confrontation and Sloane's motive are still open (Chapter 6 deliberately left the motive unresolved). Own-power's Ch9 assembles toward it, but the endgame itself needs its own design pass before Ch9 can fully land. Do you want that endgame design next, or the Ch7 own-power scenes first?
3. **The cash economy's weight.** How real should the money constraint be — a light narrative pressure (a few costed choices), or a slightly firmer budget the player manages across the arc? Recommend light: felt, never a grind.
4. **Chapter count.** Three development chapters (7–9) before reconvergence, or compress to two? Recommend three for the ~6–8h budget; two if the campaign should run leaner.

## 10. Next steps

Once §9 is settled: script the **Chapter 7 confirm-or-redirect beat** (already designed in
CHAPTER_7_ROUTE_CONFIRM.md) plus the first "Standing Alone" scene set, hand to EVE Code as a
new gated content revision, and build it as the lane template — then the other three lanes
follow the same shape.
