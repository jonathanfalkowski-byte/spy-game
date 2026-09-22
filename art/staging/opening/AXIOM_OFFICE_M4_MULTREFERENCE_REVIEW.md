# Axiom Office M4 — Multi-Reference Master Review

**Classification: REJECT.** M4 used the approved clean structure plate and approved gala art as separate provider references, but the result ignored the structural lock and materially leaked the style-reference subject and gala content into the office. It is not a reusable environment master.

## Provenance and spend

| Field | Value |
| --- | --- |
| M4 output | `axiom-opening-office-master-v1-m4-multireference.png` |
| Provider asset | `4f815104-28c5-4bc1-b58b-2a4c3a190cc2` |
| Task / call | `09fb6adc-ef33-4ff8-aec0-1f65f9551101` / `53f9103d-7c53-473f-bce4-2c07255f6596` |
| Tool / model | `image_editor` / `QWEN_IMAGE` |
| Reference 1, structure | `axiom-office-clean-structural-conditioning-plate.png` / provider asset `2ab290cc-a41f-42e4-b19a-c9c6b15ac58b` |
| Reference 2, style only | `art/reference/evelynn/evelynn-helix-gala-v1.png` / provider asset `3cefac6d-fb4f-47a4-a2d8-d0a43f9971b6` |
| Multi-reference mode | Yes: both assets were submitted, ordered structure then style, in one `image_editor` call. |
| Output | one 1920 x 1080 PNG, 3,088,989 bytes |
| SHA-256 | `0638F136DFC2D8D1C16648693D5C2191194E6531396291E6321A1AF5DC6D940C` |
| Quote | 1 art credit |
| Before / after balance | 346 / 345 credits |
| Observed delta | 1 credit |
| Task-level billing | Not supplied by provider |

The one-credit quote and observed balance delta align, but provider task-level billing was unavailable. One task completed one call and yielded one output; no alternate or retry occurred.

## Structural review

| Point | Result | Finding |
| --- | --- | --- |
| Desk footprint | BLOCKING DRIFT | Replaced by a frontal meeting table. |
| Desk orientation | BLOCKING DRIFT | Locked desk orientation is lost. |
| Divider | BLOCKING DRIFT | Low divider is absent. |
| Guest zone | BLOCKING DRIFT | Meeting furniture occupies/undefines it. |
| Common floor plane | BLOCKING DRIFT | Chairs and table obstruct circulation. |
| Daniel workstation | BLOCKING DRIFT | West workstation relationship is absent. |
| Daniel route | BLOCKING DRIFT | No clean route to Adrian's desk. |
| Benton route | BLOCKING DRIFT | Director relationship and stopping space are absent. |
| Maya coffee blocking | BLOCKING DRIFT | Wine glass and person replace the state-safe zone. |
| Smoked-glass office | MINOR DRIFT | Glass appears but not in the locked director-office relationship. |
| Evidence surface | BLOCKING DRIFT | Paperwork occupies the required empty surface. |
| Terminal | MINOR DRIFT | Terminal exists but is displaced and secondary. |
| Anchor A | BLOCKING DRIFT | Composition is a meeting-table/gala-character shot. |
| Anchor B | BLOCKING DRIFT | No stable same-pixel evidence crop. |

See the [human-only comparison board](axiom-opening-office-master-v1-m4-multireference-review-board.png).

## Nine-state and style review

All nine office states are **BLOCKED**. The replacement table, chair clutter, person, wine glass, and paperwork prevent fixed-geometry, state-safe reuse.

Style-reference leakage is a **material failure**: Evelynn, her gala gown, jewellery, portrait/pose framing, and drink appear in the output. This violates the explicit style-only scope for reference 2 and the environment-only/no-people/no-props requirement.

## Scope confirmation

- Exactly one paid M4 generation occurred.
- No character, prop-state, alternate, or automatic retry generation was requested or completed after it.
- No runtime binding, manifest integration, production promotion, commit, or push occurred.

**Required next action:** human review. Do not automatically submit another paid generation.
