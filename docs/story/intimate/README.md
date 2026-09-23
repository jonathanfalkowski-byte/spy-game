# Intimate scene pipeline (local writer)

Explicit scene bodies are drafted by the local Ollama `writer` model (Hermes 3)
from a scene card, then screened, read, repaired and handed to code for wiring.
This is the same pipeline Undertow uses, adapted to EVE's content format.

## Lanes

| Lane | Owns |
|---|---|
| Design (this chat) | Cards in `cards/`, this README, the consent gate, reading and choosing takes, hand repair of a chosen take. |
| Writer (local Ollama) | First-draft explicit bodies only. |
| Code chat | Wiring a chosen take into `src/content/*.ts`, flags, save versioning, tests. Never edits cards. |
| Art chat | Suggestive/implied frames only, per [EVE_STYLE_LOCK.md](../../art/EVE_STYLE_LOCK.md). |

## Consent gate (a card is not written until every line is true)

1. Evelynn reaches the scene through a player choice that states what she is choosing; there is an equal-weight way to decline that leads somewhere worthwhile.
2. No lever is active in the moment: no job, clearance, clinic record, money, housing, or information depends on her saying yes.
3. The partner is an adult who can refuse, and the scene is not with a clinic staff member, handler or anyone holding authority over her in that moment.
4. Desire is hers: the card states what she wants from it. Attraction, pleasure and intimacy are not corruption and are not punished.
5. The scene has a consequence the story remembers (trust, exposure risk, a changed relationship), consistent with "power has terms".

Pressure, leverage and the clinic stay in the non-explicit story. If a scene needs
coercion to exist, it does not get an explicit body.

## Workflow

```
node tools/writer/write-scene.mjs <card-id> [--takes 3] [--model writer]
node tools/writer/screen-take.mjs <card-id>
```

1. Write `cards/<card-id>.md` from [CARD_TEMPLATE.md](CARD_TEMPLATE.md). The card id is lowercase letters, digits and hyphens.
2. `write-scene.mjs` sends the card to `http://127.0.0.1:11434` and saves each take to `local/writer-out/<card-id>/takeN.txt` plus a `takeN.blocks.txt` copy already converted to `p(...)` / `q(...)` calls. `local/` is gitignored; drafts never enter the repo until chosen.
3. `screen-take.mjs` is a screen, not a verdict: POV, length, required/forbidden phrases, loops, fade-to-black. Read the top two takes in full anyway.
4. Repair the chosen take by hand, save it as `cards/<card-id>.chosen.txt`, and send the code chat a handoff naming the scene, state flags and the chosen file.

Start Ollama with `%LOCALAPPDATA%\Programs\Ollama\ollama.exe serve` if the port is closed.

## Known writer failures (from Undertow)

- Slips into first person (I/me/my) or narrates the partner's POV. EVE is second person, present tense.
- Writes mood instead of the act unless the beat list is numbered and physical.
- Invents facts (time of day, room, clothing, scars, glasses). Give continuity facts explicitly.
- Collapses the desire axis into passivity. Make "she wants / she moves first" numbered beats.
- Single-word forbidden tokens misfire; use multi-word phrases. Required tokens match whole words.
