# Opening cinematic coverage contract

This contract separates two questions:

1. **Scene-art safety:** if an asset is unavailable, the resolver fails closed and never shows wrong or future-state imagery.
2. **Cinematic completeness:** every authored CUT beat has a runtime-approved scene asset that shows the required participant set and action state.

The first question must remain green during incremental production. The second is the release/demo gate and is intentionally **INCOMPLETE** in the current build.

The executable contract is [opening-cinematic-coverage.ts](../../src/ui/opening-cinematic-coverage.ts). Run the development report with the focused Vitest test. Run `npm run qa:opening-cinematic` for the release gate; it exits non-zero until every required cut is runtime-approved.

## Current report

```text
OPENING CINEMATIC COVERAGE
required shots: 15
runtime approved: 2
component-only: 1
staging: 3
missing: 9
status: INCOMPLETE
```

The two runtime-approved cuts are the bounded apartment housing-notice and medical-package inserts. The M5 Axiom office master is component-only and does not count as completed office scene art.

## Required CUT beats

| Shot ID | Trigger / node | Location | Active characters | Required status |
| --- | --- | --- | --- | --- |
| `opening.apartment.inspect-lease` | Housing-notice inspection / `apartment.reply` | Apartment | Adrian | `RUNTIME_APPROVED` |
| `opening.apartment.inspect-medical` | Medical-package inspection / `apartment.reply` | Apartment | Adrian | `RUNTIME_APPROVED` |
| `opening.axiom.shot01-approach` | Leaves apartment / `commute.arrival` | Axiom approach | Adrian | `MISSING` |
| `opening.axiom.shot02-security` | Joins screening queue / `commute.arrival` | Security lobby | Adrian, security guards | `STAGING` |
| `opening.axiom.shot03-office-arrival` | Clears inner gate and arrives / `commute.arrival` | Office corridor | Adrian | `COMPONENT_ONLY` |
| `opening.office.shot01-daniel` | Daniel waits at desk / `office.daniel` | Strategic Intelligence desk | Adrian, Daniel | `MISSING` |
| `opening.office.shot02-benton` | Benton replaces Daniel / `office.benton` | Strategic Intelligence desk | Adrian, Benton | `STAGING` |
| `opening.office.shot03-file` | Helix file wakes / `office.departure` | Adrian’s desk | Adrian, Benton | `MISSING` |
| `opening.helix.shot01-brief` | Opens brief / `helix.brief` | Casework workstation | Adrian | `MISSING` |
| `opening.helix.shot02-documents` | Opens source workspace / `helix.documents` | Casework workstation | Adrian | `MISSING` |
| `opening.helix.shot03-review` | Enters assessment review / `helix.review` | Assessment workstation | Adrian | `MISSING` |
| `opening.helix.shot04-submitted` | Report transmitted / `helix.submitted` | Assessment workstation | Adrian | `MISSING` |
| `opening.maya.shot01-coffee` | Maya enters with two cups / `maya.promotion` | Strategic Intelligence desk | Adrian, Maya | `STAGING` |
| `opening.maya.shot02-departure` | Maya leaves / `maya.goodbye` | Desk and corridor | Adrian, Maya | `MISSING` |
| `opening.office.shot04-alone` | Opening milestone / `ending.complete` | Strategic Intelligence desk | Adrian | `MISSING` |

## HOLD contract

- Daniel’s shot holds through `office.daniel` dialogue while positions remain unchanged.
- Benton’s shot holds through his assignment conversation; the file/action change is the next cut.
- Maya’s coffee shot holds through `maya.invitation` and `maya.case`; her departure is the next cut.
- The Helix documents shot holds through `helix.analysis`; review and submission are authored work-state changes.

No M5 environment record may be added to `approved-scene-art.json` merely to satisfy this contract. A complete office shot requires a reviewed composite with the correct participant set, props, camera, and state.
