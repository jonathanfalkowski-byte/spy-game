# Playthrough review: logic and cohesion (2026-09-24)

**Method.** Three complete playthroughs from the opening to the end of Chapter 9 were exported as
transcripts (every scene title, place line, passage and choice in order) from the Chapter 9
saved-game fixtures: `maya-all` (read by Design, start to finish), `records-name-thin` and
`rook-all` (each read in full by an independent reviewer). About 75,000 words were read. Findings were
cross-checked. Where two or three reads found the same problem, it is marked **(x2)** / **(x3)**.

**Verdict.** Chapters 1–2 hold up as a tense noir spy opener: the blackmail, the clinic, the Glass
House. From Chapter 3 the story turns into contract negotiation and consent bookkeeping, with little
spy work or heat. Chapters 6–9 then compress the conspiracy into summary, and their text often
ignores what the player actually did. Three root causes:

1. **System text in the story.** Source lines, state dumps, internal ids, route tallies, milestone
   notes and legal-style terms appear where drama and intimacy should be. *(x3)*
2. **Text that assumes the wrong path.** Later chapters describe choices the player never made. *(x3)*
3. **Dropped threads and inverted pacing.** Benton, Marcus and Sloane's promise vanish after the Glass
   House. Bureaucracy is granular while the conspiracy is montage. *(x3)*

The fixes fall into three groups, by what they touch.

---

## Group 1: display layer (fix now; no save impact)

- `[Source: …]` lines, raw ids (`[julian-mercer received: …]`, `case-coordinator`, `Aster editor
  received`), route-tally lines (`Route signal: own-power… weighted route tally`), state dumps
  (`[Object: salon. Stated desire: …]`, `Derived from stored Chapter 5 state: c5.service = julian`,
  `Adult Evelynn and adult Julian complete physical-without-sex`) are shown inline. *(x3)*
  → Keep them in the journal and records, and hide them from the reading view.
- From `chapter3.nightComplete` on, choice labels render as spoken dialogue ("(q You) Continue · If I
  do nothing"), and one became a scene title. *(x3)*
- Doubled speaker labels such as "the unknown sender" in lowercase. *(x2)*

## Group 2: Chapters 6–9 (fix now; gated, no shipped saves)

Path state (text describing another run):
- Ch7 celebrity text assumes a published *image* ("the famous back", bus shelter, the clerk's daughter's
  poster, Theo's "pictures", Maya's bus) when Chapter 5 published text only or nothing. *(x3)*
- Ch7 Maya "Not Adrian — never Adrian" when Maya already knows from the Chapter 6 counter. *(x1)*
- Ch7 "the same word that was on the courier page" when the page was never opened, and the word
  Meridian is not on the leaf as written. *(x2)*
- Ch7 standing paraphrases the ORACLE prediction the player never saw. *(x2)*
- Ch7 "the phone that answers only to you" without the Chapter 5 phone; "the desk you pay for" with a
  free Helix workroom; confirm mirror "refused the extensions" after accepting one. *(x3)*
- Ch7 confirm "your last months": the story spans about two to three weeks. *(x3)*
- Ch8 "No one has noticed you yet" after Chapter 7's watchers and exposure. *(x3)*
- Ch9 evidence chain cites "the leaf's dated handoff… and the witness's confirmation" when she took
  no leaf and had no witness; "sourced three ways" regardless. *(x2)*
- Ch9 "Not from a file — from a morning": Celeste's greeting was at 19:04, an evening. *(x1)*
- Ch9 arrive "without borrowing a single door" when the sender or a workroom helped. *(x1)*
- Ch6 resolve/complete: "Tonight, for the first time, you moved" after keeping everything unspent;
  "No room, no issue" while holding both; counterpower "you accepted the first favour" when she
  declined all. *(x2)*

Logic:
- Ch6 proof: the narrator states as fact that Celeste "has no idea she is describing you… was never
  inside it", which Chapter 9 reveals is false. The narrator must not lie. Make it Evelynn's belief. *(x1)*
- Ch6 proof: Celeste, believing she is speaking to Evelyn, says "she wasn't there". It should be "you". *(x1)*
- Ch9: Celeste is both the corroborating witness and the board member, and the case "holds" without
  acknowledging it. Turn this into a beat: her own confirmation becomes evidence against her. *(x1)*
- Ch8 leverage-rook: Evelynn *owes* the sender, yet the sender "collects" by giving her a document.
  The debt runs backwards. *(x1)*
- Meridian as "the operation's own name, reused" vs "a private concern". Make it explicit that the
  company is named after the operation. *(x1)*

Voice and repetition:
- Thoughts `(t)` are first person in Chapters 1–5 and switch to second person in Chapters 6–9. *(x3)*
- The Meridian paragraph repeats almost verbatim from Ch8 advance into Ch9 arrive; "one name… you
  have already met" appears four times; Ch8 close and Ch8 complete repeat each other. *(x2)*
- Ch8 advance delivers the central reveal as path-agnostic summary ("However you got over it"). *(x2)*
  → Addressed by the Chapter 8 deepening pass (next).

## Group 3: Chapters 1–5 (needs content revision 20)

These chapters are in players' saves, so text changes go into a new content revision (old saves replay
exactly; new games get the revised text). The Julian heat-3 rewrite (Content Direction, Beat Map) joins
this revision.

Tone (the biggest single problem):
- Legal and consent-bookkeeping prose replaces drama: term sheets ("No Adrian binding, employer
  endorsement, exclusivity or future work"), "Later social or intimate refusal cannot reverse it",
  consent read out as clauses, Sloane and Voss speaking like compliance systems. *(x3)*
- The only intimate scene on the Julian path is delivered as audit notices. *(x1)*
- Narration reads out the choice menu ("You can surrender the phone, demand an explanation, or…"). *(x1)*
- The "X is not Y" disclaimer construction is everywhere. *(x1)*
- Milestone and development text: "Vertical slice complete", "Scene 1 ends here", "This milestone ends
  in transit", "Adrian remained silent after the simulation." *(x3)*
- Covering-every-path phrasing: "You have either come down from the apartment or…", "the brief you
  requested—or the same public call". *(x3)*

Logic and dropped threads:
- After the Glass House, Sloane never debriefs, the promise "the breach disappears" is never settled,
  Benton's fate and "Voss's replacement team" vanish. *(x2)*
- The day after Marcus sent a guard after her, Helix courts "Evelynn" politely and Marcus writes a
  referral; nobody mentions the chase. *(x1)*
- Maya's reaction to her closest friend's changed voice is "You sound different". *(x2)*
- The Chapter 3 date reveal (Sloane approved the preparation two months before the breach) gets no
  reaction and no confrontation. *(x2)*
- The mission rewards an evidence-free correct guess (Benton) in full. *(x2)*
- "Evelyn" becomes "Evelynn" at the Helix invitation with no in-world marker. Make the protagonist's
  spelling a legible choice or a marked distinction. *(x3)*
- Chapter 5: $0 settled money for a man with eleven years of salary (explain: accounts frozen by the
  suspension); the eleven-step Aster negotiation with three identical replies; the wardrobe described
  five times; Sloane's budgeting reply to her officer taking a Helix room. *(x2)*
- Chapter 6 friction "She thanks the stranger" when Maya has already spoken with the post-clinic
  Adrian twice. *(x1)*
- Smaller: duplicated rehearsal paragraph; duplicated Marcus "raised finger"; "Maya is the closest
  thing I have to family" twice; "Close the the unknown sender"; "Upstairs, Marcus and Celeste…" while
  at home; mission.method names the wafer and token before they appear; the mirror choice "I do not
  know." and the mirror never actually looked into; "Marikina" (a Manila place) in a Singapore
  history. *(x1–x3)*

---

## Plan

1. **Now:** Group 1 (display) and Group 2 (Chapters 6–9), with tests and the Chapter 7–9 saved-game
   checks updated.
2. **Next:** deepen Chapters 8 and 9 (heat and danger, dramatise the Meridian reveal), per the
   owner's queue.
3. **Then:** content revision 20: the Group 3 editorial pass on Chapters 1–5 plus the Julian heat-3
   rewrite.
