# Maya friendship lane — design draft (2026-09-23)

Status: **Maya's canon approved by the owner (2026-09-23): the review and 12:14 fear,
the half-marathon, the counter, and "I loved you too. Not like that."** The report
header teaches Maya **client names only** (approved). **"The Counter" opens Chapter 6**, and
the Chapter 5 `maya-new-number` seed **costs one of the two message sends** (both
approved). All four decisions are settled. Nothing is implemented yet: the Chapter 5
seed rides with revision 19, and the Counter waits for Chapter 6 implementation.

Maya Reyes is the only person in EVE who knew Adrian for a decade and could still
know Evelynn. Her lane is a **friendship**, not a romance. That follows the existing
design rules (Maya is never a romance reward or guaranteed rescuer:
`CHAPTER_3_PLAYABLE_TREATMENT.md:62,68,89`; she "responds to actual knowledge and her
own boundaries": `CHAPTER_6_THE_CAGE_YOU_CHOOSE.md:37`) and the owner's direction
that Evelynn's adult possibilities are mostly with men.

**The core feeling:** being seen by someone who knew you before. Every other
relationship Evelynn has began after the clinic. Maya is the one person who can
compare. That is dangerous, precious, or both.

## What exists now

- Maya is 33, a corporate compliance investigator at Axiom, and Adrian's friend of ten years (`characters.ts:93-102`). Her voice is dry and direct, and she holds her own limits: "Don't ask me to act as if you've explained."
- Adrian's private framing of her (`bond`) is the player's: friend, love or colleague. **Maya's own feelings have never been established.**
- Since the clinic, every contact has been a call or message on Evelynn's **Axiom-monitored** phone. They have never met in person.
- She knows about the adaptation only if Evelynn explicitly told her, through the clinic recovery message or the Chapter 3 identity disclosure (`mayaKnowsAdaptation`, `src/state/chapter3-provenance.ts`).
- She is exposed: Sloane holds leverage over her through the warning and the 12:14 lookup (`PSYCHOLOGY_POWER.md:22-23`).
- The Chapter 4 call can be missed, which sets `c4.cal-maya = missed | repair-requested`. Chapter 5's `people` scene lets Evelynn send her one concrete thing (`chapter5-benefit.ts:304-326`).
- In Chapter 5, `spend` can buy a **personal phone with a prepaid month**. That is the first line in the game Axiom doesn't monitor.

## Proposed canon for Maya (needs owner approval)

- **Her own life:** she is under a quiet internal review. Someone ran a lookup on her at 12:14 and she knows it. She suspects it is connected to the Helix file, and she is frightened for her job without saying so. She is training for a half-marathon she signed up for to prove something to herself, and she hates every kilometre of it. She eats late at the same counter she has used for years.
- **Her feelings for Adrian:** deep, long friendship. If Evelynn ever says Adrian loved her, Maya's answer is her own: moved, honest, and not romantic. "I loved you too. Not like that. I needed you to be the one person who never wanted anything from me." It is a real answer, not a rejection scene. It leaves the friendship intact if the player wants it.
- **What she wants from Evelynn:** the truth at the level Evelynn can give it, and not to be used. She would rather hear "I can't tell you" than be handled.

## The lane

### Chapter 5 seed · `people` (18:00–19:00)

A small addition to the existing Maya thread.

- **If Evelynn bought the personal phone:** a new option, `maya-new-number`: "Send Maya the new number, and nothing else." This uses one of the two message sends. Maya replies once, on the new line: "Received. That's a new habit for you." Flag: `c5.maya-clean-line`.
- **Without the personal phone:** the existing thread is unchanged.

Nothing else is implied. The number is an invitation, not an explanation.

### Chapter 6 · "The Counter"

The first time they meet in person since the clinic.

**Arranging it.** Maya proposes the place: her late-night noodle counter near the
Axiom compliance floor, where she and Adrian used to eat after audits. The player
reaches it by one of three routes:

- **Clean line** (`c5.maya-clean-line`): arranged privately.
- **Monitored phone:** possible, but the game states the exposure plainly. Sloane may see that Maya agreed to meet Evelynn off the books. The player chooses whether to put Maya at that risk, and Maya is told the line is monitored, so she chooses too.
- **Don't arrange it:** a respected choice. The lane pauses rather than ending with guilt.

**Arrival.** Maya is already there, at her usual seat.

- **If Maya knows:** she looks for Adrian in Evelynn's face and doesn't hide that she's looking. "Give me a second. I'm allowed a second."
- **If Maya doesn't know:** a woman she has never met has asked for her by name, on a new number. She is a compliance investigator and treats it as a possible Helix approach, polite and guarded. Evelynn recognizes the counter, and Maya's order before she gives it.

**The central choice (Maya doesn't know).** This is the first unmonitored chance in
the game to tell her.

1. **Tell her, here.** The full identity disclosure, in Evelynn's own words, with no one else listening. Maya asks one question only Adrian could answer, then stops asking. `c6.maya-knows = in-person`.
2. **Tell her part of it.** "I knew Adrian. He'd want you to be careful about the 12:14 lookup." True, bounded, and costly to hold back. `c6.maya-knows = partial`.
3. **Don't tell her.** Evelynn becomes a stranger with a warning. Maya takes the warning seriously and the stranger less so. `c6.maya-knows = none`.

**The central conversation (Maya knows).** The player picks what the hour is about.
The deciding choice (at most two topics fit the hour):

1. **What happened to you:** the body, the voice, what Evelynn can say about the clinic without the case.
2. **What you chose:** the echo of Chapter 5 ("tell me about the part you enjoyed"). Evelynn talks about something she wanted, from a dress to Sebastian or Julian, as far as the player likes. Maya listens without verdicts. For a player who says Evelynn likes men, Maya's reaction is curiosity and warmth, not surprise that needs managing.
3. **Her life:** Evelynn asks about the review and the lookup and actually listens. Maya admits she's frightened. This is the only route to Maya's own trust peak.
4. **Adrian's feelings** (only if `bond = love`): Evelynn can say it, and Maya gives her own answer, as above.

**What Evelynn can ask of her.** Maya's line from Chapter 4 holds: "My work files stay
at work." Evelynn can ask for a public-file opinion, and Maya gives a bounded one, as
in Chapter 4's `outside-maya`. If Evelynn asks for restricted material, Maya refuses.
If Evelynn pushes, Maya gets up and pays for both bowls. That is the lane's one real
loss, and it is caused by using her, not by any feeling.

**Endings.**

- **Restored:** they agree on how to reach each other, and on what neither will ask. `c6.maya = restored`.
- **Careful:** Maya asks for distance until the review is over, for her own safety. It is framed as her choice, and a good one. `c6.maya = paused-by-maya`.
- **Strained:** Evelynn used her, or put her at risk on the monitored line without saying so. Maya leaves. She can be repaired later, by an apology that costs Evelynn something real. `c6.maya = strained`.

Nothing here grants access, evidence or rescue. Maya's trust changes how she speaks
to Evelynn, not what Evelynn can get from her.

### Later chapters (outline only)

- **Restored:** Maya can become the person Evelynn calls after a hard night. A standing, low-cost contact option, like Sebastian's thread, with no plot power.
- **Maya's review** resolves on its own timeline, and Evelynn may or may not be able to help without exposing herself. That is a "power has terms" dilemma for a later chapter. Maya never becomes a hostage beat by default.

## Decisions needed

1. **Maya's canon:** approve the internal review and 12:14 fear, the half-marathon, the counter, and "I loved you too. Not like that."
2. **Semantic question from the backlog: what Maya learns from the report header.** Recommendation: only the client names (Helix, Novagen), as `helix_assignment` already records. No content and no link to Evelynn unless told. This lane depends on that boundary.
3. **Where "The Counter" lives:** the first Chapter 6 personal scene (recommended), or a late addition to Chapter 5 after `people`, which is already dense.
4. Should the Chapter 5 `maya-new-number` seed use one of the two sends (recommended, a real tradeoff), or be free?

## State notes (for EVE Code, after approval)

- `c5.maya-clean-line` requires the personal phone purchase flag from `spend`.
- `c6.maya-knows` is `in-person | partial | none`, and extends `mayaKnowsAdaptation()` with a new in-person source.
- `c6.maya` is `restored | paused-by-maya | strained`. `relationships.mayaTrust` moves only through the conversation choices above.
- A meeting arranged on the monitored line writes a record Sloane can read, using the existing leverage model. This is the only Sloane interaction the lane creates.

## Art needed

1. The counter: a night interior with warm practical light, a counter and stools, steam. Noir house style.
2. Maya's arrival variants, known and unknown, on one camera.
3. The conversation two-shot, with Maya and Evelynn visibly distinct per `MAYA_EVELYNN_VISUAL_IDENTITY.md`.
4. Maya leaving, for the strained ending.
