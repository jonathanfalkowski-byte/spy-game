# Non-Julian social lane: Sebastian Okoro (design, 2026-09-23)

Status: **character and structure approved by the owner, 2026-09-23.** The lane
partner is a man (owner direction: Evelynn's adult possibilities are mostly with
men). The Harbour seed is kept. The Chapter 6 depth (question 1 below) is still
open. Nothing is implemented until EVE Code receives a handoff.

This lane satisfies backlog item 1 in
[eve-continuity-and-next-design.md](eve-continuity-and-next-design.md) and the GDD
rule that "Julian cannot monopolize Evelynn's adult life" (`EVE_MASTER_GDD.md:86`).

## What the lane is for

Julian is a possibility with terms attached: he is a COO, a target and a source of
access, which is why his route carries personal, instrumental and mixed motives.
Sebastian is the opposite on purpose: **a man with nothing to offer Evelynn except
himself.** He brings no access, information, leverage or cover. Whatever she chooses
with him, she chooses for herself. The lane can be a quiet good evening, a
friendship, or a night of real pleasure, and each of those is worth having. Wanting
him is never corruption, and not wanting him is never a loss.

## Why a new character

| Candidate | Verdict | Reason |
|---|---|---|
| **New adult met at Harbour** | Chosen | The D11 rooftop "salon" slot at 20:00 is reserved for a non-Julian possibility and has no second person (`chapter5-desire.ts:123-133`). A new character can be built clean of leverage and of the Chapter 6 witness roles. |
| Daniel Kessler | Hold | Eligible and unused since Chapter 1, but he has no voice. Keep him as a later "someone from the old life who doesn't recognize her" possibility. |
| Marcus Chen | No | He holds referral power, is a planned Chapter 6 corroborator (`CHAPTER_6_THE_CAGE_YOU_CHOOSE.md:49`), and has no established age. |
| Harbour host, Aster editor, staff | No | Functional roles are barred from romance (Chapter 5 treatment; `FULL_GAME_NORTH_STAR_REVIEW.md:13`). |
| Benton, Rook, Voss, Sloane | No | Each holds institutional power over Evelynn. |
| Maya Reyes | Separate lane | A friendship lane is designed next. |

## Character: Sebastian Okoro

- **Age 38.** Established explicitly so `adultEligibility()` returns `adult`. He is visibly a different generation and register from Julian (49, executive).
- **Cellist.** Booked for the one-night rooftop music hour at the Harbour, 20:30–21:30. He is a hired artist, not Harbour staff, with no tie to Helix, Axiom or the fund. He leaves the city on Thursday for a four-city tour.
- **His own life:** he is finishing an arrangement he won't name until it's right. He is dodging his brother's calls about selling their mother's house. He has contempt for patrons who applaud the fee instead of the playing. He walks everywhere, eats standing up, and has large, careful hands that he flexes when he's thinking.
- **Voice:** warm, blunt and unhurried. He asks one real question instead of three polite ones and doesn't fill silence. His humour is at his own expense, and his desire is stated plainly rather than performed.
  - "You listened like it was going to be on the exam. There's no exam."
  - "I don't need you impressed. I need you to tell me if the middle drags."
  - "I want you. That's information, not a request. Do what you like with it."
  - "No is a whole sentence. I've played for people who didn't know that."
- **What draws him to Evelynn:** she listens properly and doesn't perform being moved. He also reads something in her he knows from the stage: someone still learning to live in a version of herself. He doesn't know why and never asks. His attention is on her, not on what she could do for him.
- **What he knows:** only what anyone at the Harbour could see, plus whatever Evelynn chooses to tell him. He knows nothing about Axiom, Helix, the clinic, Adrian or the case.
- **Firewall:** Sebastian can never authenticate, witness, carry, store or deliver anything connected to the investigation. His expertise is sound, not documents, and the design must not make him useful. If the player tries to involve him, he declines on his own terms, and that costs her nothing more.
- **Look (for art):** tall, dark brown skin, close-cropped hair, a short neat beard, reading glasses on a cord, and silver rings he takes off before playing. On stage he wears a black open-collar shirt and dark tailored trousers with the sleeves pushed up; off stage, a long camel overcoat. He must be visually distinct from Julian: younger, no suit and tie, and a different silhouette.

## Beats

### B6 · Harbour, `room` (optional seed, uses 1 of the 2 attention stops)

A new option, `attention-sebastian`: during the preview he is sound-checking alone in a
side room while the reception carries on outside. Evelynn can stop and listen.

- **Listen:** he plays the unfinished middle section twice, then asks whether it drags. The player answers honestly, kindly, or not at all. He hands her the rooftop guest card himself and says, "If you're free. If not, not." His eyes stay on her a beat longer than the question needs, and both of them notice.
- **Walk past:** nothing is recorded against the player.

Cost: one of the two attention stops, competing with the editor, the host's painting,
Julian's coffee or flirt, and photos. Flags: `c5.sebastian-met = harbour` and
`c5.sebastian-note = honest | kind | silent`.

### D11 · 20:00, `want` → the salon

The salon target already exists. It gets two variants that share one camera:
**met** (he recognizes her and plays the middle section the way she described it) and
**unmet** (he is a stranger on stage, and the first conversation comes after the set).

The hour itself is **worth having with no romance at all.** The music is good, the
city is quiet from up there, and Evelynn gets an evening that is not a mission.

After the set, the choices are:

1. **Talk.** He asks a real question about her, not about the Harbour. The player picks what Evelynn shares: something true (not the case), a deflection, or a light lie. He takes each at face value and says so. Flags: `c5.sebastian-talk = true | deflect | lie`.
2. **Ask him to play something for her.** Evelynn names a piece she wants for herself, not for any cover. This is the lane's signature beat: a small, uncontested act of wanting. It is the first step up the heat ladder, because he plays it looking at her.
3. **Leave after the set.** A full, respected ending. He nods, and the music is still hers to keep.

If she stayed to talk, he makes one clear offer: "I'm walking back along the water.
Come if you want. You don't owe me a reason either way."

- **Decline.** Warm and complete. `c5.sebastian-outcome = declined`.
- **Walk, as friends.** A non-intimate walk that ends at his hotel door with a goodnight. She can ask to hear the finished piece. `c5.sebastian-outcome = walk`.
- **Uncertain.** She says she doesn't know yet. He gives her the tour dates and a number: "Thursday's not a deadline. It's just the train." `c5.sebastian-outcome = open`.
- **Want him.** Evelynn says it herself. This goes through the same fresh consent step as Julian's route (scope: no sex / sex), with his desire stated plainly and his own limits named. Either of them can withdraw at any point, and withdrawal is honored on the page. `c5.sebastian-outcome = intimate-<scope> | withdrawn`.

**Heat:** this is the game's most openly erotic chosen scene in Chapter 5, and it
should read that way. The heat is ecstatic and mutual, with pleasure on the page and
Evelynn discovering her body's capacity for it as her own. There is nothing to
extract, so nothing dilutes it. The `intimate-sex` body gets a full local-writer card
at heat 4. The `intimate-no-sex` body is still charged (kissing, hands, undressing,
stopping where she decides) at heat 2–3.

There is no instrumental or mixed motive option. That absence is the design.

**Scheduling:** `want` at 20:00 is a single evening. Choosing the salon means not
choosing Julian that night, and vice versa. Neither route is closed by the other, and
neither is penalized for the other existing.

### `return` (22:30) and `complete`

The return prose remembers what she chose and felt, reading `c5.desire`,
`c5.sebastian-outcome` and `c5.sebastian-talk`: the guest card kept or thrown away, a
phone number, his coat smell still on her dress, the tune still in her head. It must
never read as a verdict on whether the choice was good.

### Chapter 6 carry-forward (owner decision 2026-09-23: bounded, a goodbye before Thursday)

- **open / walk / intimate:** one message thread before Thursday. It is ordinary and costs no time budget. He sends the finished middle section as a voice memo. She can reply, and she may choose one brief goodbye before his train. That is a fresh-choice scene, and it can be warm or intimate within its own consent step. Then he leaves for the tour. Sebastian does not become a recurring partner.
- **declined / left / unmet:** nothing follows. There is no callback guilt, and he is not used later as a pang.
- He is never a hostage, a leak, a witness, a threat or a reward. The Chapter 6 exit-cost design must not target him.

## Consent gate check ([intimate/README.md](intimate/README.md))

| Rule | How the lane meets it |
|---|---|
| A player choice with an equal-weight decline | Every offer has a decline or leave option that ends the scene well. |
| No lever active | He has no access, information or authority. The firewall keeps it that way. |
| Adult partner who can refuse; no authority | 38, independent, and he states his own limits on the page. |
| Desire is hers | "Want him" is Evelynn saying it. The only motive is personal. |
| A consequence the story remembers | The `return` prose and the Chapter 6 message thread. |

## State and implementation notes (for EVE Code)

- Add `sebastian` to `NpcIdSchema` and `characters.ts` with `age: 38` and the bio above.
- New flags live in `choices` under `c5.sebastian-*`. `npcs.sebastian.known` starts empty.
- `attention-sebastian` joins the `room` options and uses the existing `c5.attention` budget.
- The salon branch lives inside the existing `want` phase. It reuses the consent and withdrawal machinery from `intimate5` with a partner id, and must not read or write Julian's `c5.motive` or `c5.mutual-interest`.
- New content means a new content revision (likely 19) for new games. Older saves keep their revision. The save schema should not need a change; EVE Code should confirm.
- Tests: the salon is reachable with and without the Harbour seed and with every Julian state. Decline and leave produce complete endings. Nothing in the investigation reads a `c5.sebastian-*` flag.

## Art needed (EVE Art)

1. Sebastian character design sheet, noir house style (distinct from Julian).
2. Harbour side-room sound check (B6).
3. The rooftop set, in met and unmet variants on one camera.
4. After the set: the conversation.
5. The walk along the water, and the hotel door goodnight.
6. The intimate outcome: charged but implied (threshold, closeness, aftermath), per the style lock's content ceiling. The explicit content lives in the prose.

## Decisions

All owner decisions are made. Chapter 6 is bounded: a goodbye before Thursday.
