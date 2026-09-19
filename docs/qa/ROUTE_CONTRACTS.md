# EVE route contracts

The executable M1 golden routes are in `tests/qa/golden-routes.ts` and use existing route helpers. The contracts below are design contracts for future route families. They are intentionally not executable failures until the corresponding runtime state exists.

| Route family | Status | Required future checks |
|---|---|---|
| Free Agent | DESIGN CONTRACT / FUTURE | Investigation, refusal, independent evidence and reconvergence remain possible. |
| Sloane Operative | DESIGN CONTRACT / FUTURE | Operation history is sourced; compliance does not imply consent or desire. |
| Rook-aligned | DESIGN CONTRACT / FUTURE | Rook knowledge has a source and does not erase other custody. |
| Corporate Predator | DESIGN CONTRACT / FUTURE | Strategy/control remains distinct from attraction, affection, and consent. |
| Executive Companion | DESIGN CONTRACT / FUTURE | Adult handoff requires current authorization and earned history. |
| Trophy Wife | DESIGN CONTRACT / FUTURE | Public identity does not imply sexual availability or dependency. |
| Kept / Dependent | DESIGN CONTRACT / FUTURE | Dependency requires actual resource concentration and can be refused. |
| Celebrity | DESIGN CONTRACT / FUTURE | Investigation, refusal of individual publicity, and independent evidence decisions remain possible; Adrian’s identity is not globally known. |
| Adult Entertainment — high autonomy | DESIGN CONTRACT / FUTURE | Adult state is authorized, voluntary, reversible where authored, and distinct from publicity. |
| Adult Entertainment — controlled/exploitative | DESIGN CONTRACT / FUTURE | Coercive circumstances are not labelled mutually willing; recovery and refusal remain represented. |
| Exploitation / Recovery | DESIGN CONTRACT / FUTURE | Recovery preserves history, evidence custody, and player-authored causality. |

Future machine-readable contracts should expose `mustRemainPossible`, `mustNotImply`, `requiredMilestones`, `forbiddenState`, `expectedReconvergence`, and `persistentDifferences`. They must be registered only once those fields are real runtime state.
