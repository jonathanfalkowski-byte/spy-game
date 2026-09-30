# Institutional · Chapter 13: "Through Channels" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_13_THROUGH_CHANNELS_DESIGN.md](../INSTITUTIONAL_CHAPTER_13_THROUGH_CHANNELS_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_13_THE_HONEYPOT_DESIGN.md](../CHAPTER_13_THE_HONEYPOT_DESIGN.md).

> The game's reserved sexual-coercion beat on this road, following CONTENT_DIRECTION §2 exactly: the order, the choice,
> getting ready, the walk to the door and the door closing are on screen; **everything behind the door is off screen**;
> the aftermath is on screen without graphic detail; refusal never costs her body; every threat is non-sexual. A content
> notice opens the chapter (and is in the entry's hint), and the comply lead-in honours "Fade coercion scenes".

- **Code:** `src/content/chapter13-institutional.ts`. It is wired through:
  - `src/content/chapter13.ts`: phase definitions, `place13`, blocks, choices, the begin from an Institutional
    `chapter12.complete`, and `fadeCoercion13` → `fadeInstitutional13` (by the lead-in's first line,
    `I_COMPLY_OPENING13`);
  - `src/content/chapter14.ts`: `institutionalBridgeFrom14` enters Ch14 **directly** from `chapter13.complete` (the
    bridge is now only a fallback); `chapter14-institutional.ts` begins "Monday" with no bridge text, adds Sloane's
    Saturday complaint to the notice (channel sloane), and Maya's withdrawn promotion to the glass room (refuse);
  - titles in `src/ui/App.tsx` (THROUGH CHANNELS), masters in `src/ui/environment-art.ts`, and node ids in
    `src/content/schema.ts`;
  - `tests/state/chapter13.test.ts` and `chapter14.test.ts` now expect Institutional's own entries.
- **Gate:** `VITE_EVE_CHAPTER13`.
- **Naming:** phases are `tasking → dread → channel → reply → corridor → smallhours → weekend`. Choice ids carry `i13-`.
- **Keys:** the shared `c13.answer` (complied / refused / countered), `act3.honeypot` (done / refused / staged / pulled),
  `act3.ally.marsh = in` (turn), `c13.card = taken` (swap); Institutional `inst.channel13` (sloane / benton / nobody),
  `inst.backup13 = sloane`, `inst.maya13 = warned` (refuse); sub-state `c13.i-answer`, `c13.i-dread`, `c13.i-door`,
  `c13.i-recover`; facts `c13.i-forgery`, `c13.i-marsh`, `c13.i-card`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **tasking** | **Content notice.** The grey envelope: TASKING · THE CLAREMONT · THURSDAY 21:00 · SUBJECT: O. MARSH · … · SUITE 1109 · BACKUP: —. The black phone: "Victoria has sent you something, darling… And do think of Maya." | **i13-tasking-on** | — |
| **dread** | Marsh as a person (canon). | **i13-dread-maya** · **-daniel** (if told: the fire stairs) · **-alone** | `c13.i-dread` |
| **channel** | Tuesday. | **i13-channel-sloane** ("I never wrote this. Look at the sevens."; she writes MINE on the blank line) · **-benton** ("Victoria signs what the client needs.") · **-nobody** | `inst.channel13`, `inst.backup13`; fact `c13.i-forgery` |
| **reply** | Wednesday midnight. | **i13-reply-comply** · **-refuse** (DECLINED UNDER SCOPE with the refusal term; otherwise a hearing) · **-turn** (with proof: the Records note or copy, Ashby, or the schedule) · **-swap** (if Iris has her number or was warned) | `c13.i-answer`, `c13.answer`, `act3.honeypot`, `inst.maya13` |
| **corridor** | **Comply:** the lead-in (fade-aware; Sloane in the lobby with the backup), the bar, the lift, the corridor, "Are you all right?"; **i13-door-look** / **-away**; "The door closes behind you." **Refuse:** home, the phone. **Turn:** the lift, the staged scene (clothed; "Is this all right?" "Yes. Keep going. Slower."; heat 2). **Swap:** Iris, 1108, the card. | door choices, or **i13-corridor-on** | `c13.i-door`, `act3.ally.marsh` / `c13.card`; facts `c13.i-marsh` / `c13.i-card` |
| **smallhours** | **Comply:** the car (Sloane drives, if backup), the shower as time, "Lovely. You see how easy it is." Recovery: **i13-recover-daniel** (if told; being held, nothing more) · **-maya** (if restored) · **-sloane** (if backup: on the hall floor, not touching her; the log: V.S. PRESENT. NO ACTION.) · **-wall** (DONE TO ME. NOT BY ME.) · **-alone**. Otherwise **i13-smallhours-on**. | | `c13.i-recover` |
| **weekend** | **Refuse:** Maya's promotion withdrawn, a warning on her record ("It is only paper."). **Comply / turn / swap:** Celeste's word. Then Sloane's complaint to the chair (channel sloane), or Benton's "THANK YOU FOR YOUR SERVICE." (channel benton). | **i13-weekend-card** | — |
| **complete** | THE CLAREMONT. 1109. DONE. / REFUSED. MAYA. / STAGED. MARSH IS OURS. MINE. / THE CARD IS OUT. Then SHE NEVER WROTE IT. / BENTON CONFIRMED IT. / NOBODY KNOWS. | — (Ch14 directly) | — |

**Tests:** `tests/state/institutional-ch13.test.ts`, on real golden saves through Institutional Ch7–12: the entry and
the content notice; **comply** with the tasking taken to Sloane (the fade tested on the lead-in; nothing behind the
door; Sloane on the hall floor; Ch14 directly, with the complaint; authenticates); **refuse under scope** with Benton
(Maya's promotion; Ch14's glass-room line); **turn** (the Records copy; Marsh an ally); **swap** (Iris; the card). The fade
was also checked in the real UI (`eve.reader.fade-coercion.v1 = yes`).

**Size (honest), pass 1:** ~0.78k (refuse / turn) to ~1.24k (comply), against the ~4.5k target.
