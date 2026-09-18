# Chapter 5 Presentation visual plan

One locked apartment camera family, with one truthful wardrobe-specific Evelynn layer per selected look. The art shows the result of the player's appearance choice; it never substitutes another branch's clothes.

| LOOK            | AUTHORITATIVE WARDROBE REFERENCE                       |   EXISTING CHARACTER LAYER? | EXISTING FULL-BODY REFERENCE? |    CAN COMPOSITOR REUSE IT? | UNIQUE GENERATION REQUIRED? | SHOT GUARD                                                     | NOTES                                                             |
| --------------- | ------------------------------------------------------ | --------------------------: | ----------------------------: | --------------------------: | --------------------------: | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Professional    | C5 v4 wardrobe-reference-only, `c05.professional` spec | No exact presentation layer |           Body reference only | Environment and camera only |                         Yes | `c5.presentation=professional`, `c5.wardrobe=c05.professional` | No dangling earring; low heels only.                              |
| Glamorous       | `c05.glamorous` authored gown-plus-open-jacket spec    |                          No |           Body reference only | Environment and camera only |                         Yes | `c5.presentation=glamorous`, `c5.wardrobe=c05.glamorous`       | Gown and jacket must remain legible.                              |
| Provocative     | `c05.provocative` authored open-back gown spec         |                          No |           Body reference only | Environment and camera only |                         Yes | `c5.presentation=provocative`, `c5.wardrobe=c05.provocative`   | Fully clothed; no implied consent or intimacy.                    |
| Private-Minimal | `c05.minimal` authored charcoal dress spec             |    No exact Chapter 5 layer |           Body reference only | Environment and camera only |                         Yes | `c5.presentation=minimal`, `c5.wardrobe=c05.minimal`           | Minimal means the selected dress and low heels, not invisibility. |

## Minimum future batch

Four character layers, one per branch, after one approved apartment presentation background/camera master is established. Each layer may be generated singly at a live quote of at most one credit; projected ceiling is four credits. Existing images support identity, body, and wardrobe design only and cannot truthfully cover the selected branches.
