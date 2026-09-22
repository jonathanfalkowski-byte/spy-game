# Opening visual occupancy contract

EVE’s permanent reader rule is:

**HOLD ON DIALOGUE. CUT ON ACTION. ALWAYS SHOW ART.**

Every playable opening reader state must resolve to a truthful visual mode:

- `CUT` selects the newly authored shot for a location, participant, movement or
  meaningful prop change.
- `HOLD` keeps the last approved shot while dialogue continues in the same
  staging.

There is no release state in which the reader intentionally renders an empty art
area. During development, missing or non-runtime art remains fail-closed and is
reported as incomplete coverage; the contract never substitutes future or
component-only imagery to make the report green.

## Current audit

The canonical opening corridor contains 20 reader states when the four ordered
`commute.arrival` reading beats are counted separately:

```text
OPENING VISUAL OCCUPANCY
total playable screens: 20
total reachable screens/states: 20
screens with runtime-visible art: 19
currently art-visible: 19
screens currently blank: 1
currently blank: 1
unique required cuts: 15
HOLD-covered screens: 6
status: INCOMPLETE
```

The current blank state is Maya’s goodbye beat.
Apartment inspection states are additional transient states;
lease and medical use their approved CUT inserts, while mirror and jacket use a
HOLD of the approved apartment master. After an inspection is complete and the player
chooses to leave, the inspection insert is released and the apartment master is
held truthfully for `apartment.departure`.

The current blank list is emitted by
`formatOpeningVisualOccupancyReport()` and names the exact required shot for
each state. The remaining blank state is Maya goodbye.

## Cut/hold map

| Reader state | Mode | Shot | Hold source |
| --- | --- | --- | --- |
| `apartment.bond` | CUT | `opening.apartment.shot01` | — |
| `apartment.reply` | HOLD | `opening.apartment.shot01` | `opening.apartment.shot01` |
| `apartment.departure` | HOLD | `opening.apartment.shot01` | `opening.apartment.shot01` |
| `commute.arrival` beat 1 | CUT | `opening.axiom.shot01-approach` | — |
| `commute.arrival` beat 2 | CUT, then HOLD through all security prose | `opening.axiom.shot02-security` | — |
| `commute.arrival` beat 3 | CUT | `opening.axiom.shot03-office-arrival` | — |
| `commute.arrival` beat 4 | CUT | `opening.office.shot01-daniel` | — |
| `office.daniel` | HOLD after arrival | `opening.office.shot01-daniel` | Daniel shot |
| `office.benton` | CUT | `opening.office.shot02-benton` | — |
| `office.departure` | CUT | `opening.office.shot03-file` | — |
| `helix.brief` | CUT | `opening.helix.shot01-brief` | — |
| `helix.documents` | CUT | `opening.helix.shot02-documents` | — |
| `helix.analysis` | HOLD | `opening.helix.shot02-documents` | documents shot |
| `helix.review` | CUT | `opening.helix.shot03-review` | — |
| `helix.submitted` | CUT | `opening.helix.shot04-submitted` | — |
| `maya.promotion` | CUT | `opening.maya.shot01-coffee` | — |
| `maya.invitation` | HOLD | `opening.maya.shot01-coffee` | coffee shot |
| `maya.case` | HOLD | `opening.maya.shot01-coffee` | coffee shot |
| `maya.goodbye` | CUT | `opening.maya.shot02-departure` | — |
| `ending.complete` | CUT | `opening.office.shot04-alone` | — |

The Daniel reading beat is a CUT because Daniel becomes visible. His continuing
dialogue is a HOLD. Benton’s arrival is a CUT; his continuing dialogue is a
HOLD, and the file action is a CUT because the desk staging changes. Maya’s
arrival is a CUT, her invitation and case question HOLD, and her departure plus
the Adrian-alone aftermath are CUTs.

The reader exposes only the reading-navigation controls during the first three
commute beats. `Approach your desk` is not rendered until the Daniel waiting beat
is visible, so a player cannot advance into a participant state whose art has not
yet been shown.

## Safety and release gate

`resolveSceneArt()` continues to return no `art` for a missing, staging or
component-only shot and retains `SHOT_WITHOUT_APPROVED_ASSET`. The occupancy
report is a separate completeness invariant. A release/demo gate must require
`openingVisualOccupancyReport().complete === true` after the missing runtime
shots have been approved and bound. M5 remains a component-only office
environment and is not a runtime scene binding.

The focused test is:

```text
npx vitest run tests/state/opening-visual-occupancy.test.ts
```

The release gate is intentionally red until the remaining Benton, Maya and
ending assets are runtime-approved:

```text
npm run qa:opening-visual-occupancy
```
