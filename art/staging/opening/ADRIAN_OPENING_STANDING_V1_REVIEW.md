# Adrian standing / approaching central desk V1 — review

**Decision: REVISE — staging only.** One owner-authorized `image_editor / SEEDREAM_5` task completed. It used only the approved standing pose plate; M5, any office crop, Daniel, and all other references were excluded from the provider task.

| Check | Result | Evidence |
|---|---|---|
| Adrian identity | PASS | Adult, clean-shaven, restrained dark hair, thin rectangular glasses, pleasant/bookish presentation. |
| Age | PASS | Reads as an adult near the authored 34. |
| Glasses | PASS | Thin dark-neutral rectangular frames are visible. |
| Body / shoulders | PASS | Lean, ordinary, non-heroic proportions and narrow shoulder read. |
| Wardrobe | PASS | Charcoal shirt/trousers, black belt and shoes; no tie or jewellery. |
| Expression | PASS | Quiet, attentive, subdued; no comedy or confrontational pose. |
| Flat-background compliance | PASS | One figure against a uniform neutral gray field; no scene objects, text, furniture, reflections, props, or other people. |
| Extraction | PASS | Local color-distance matte isolates the sole connected foreground component. Original provider PNG remains preserved. |
| Pose / orientation | BLOCKING ISSUE | Provider rendered a largely front-facing stance rather than the exact approved three-quarter northeast body orientation. |
| Original canvas registration | BLOCKING ISSUE | Provider foreground bounds are x=783..1005, y=440..1046, rather than the approved x=805..985, y=625..915. |
| Composite registration | PASS WITH CORRECTION | Deterministic local extraction preserves provider character pixels while proportionally re-registering the layer to the approved foot contact (895,904). |
| Central desk relationship | PASS | Registered layer stands at the central M5 workstation; west neighboring workstations remain empty. |
| Daniel interaction clearance | PASS | Approved Daniel silhouette remains in the east desk-side guest zone with no overlap. |
| M5 integrity | PASS | The source SHA-256 remains `EAE37D43E13E8E6203FFE59EC4C2C1DC047CCE5149E6933E83A051BFA5388566`; no M5 pixels were submitted or modified. |
| Style | MINOR ISSUE | The clean semi-cel treatment is compatible, though slightly more anime-adjacent than the restrained prestige baseline. |

The character-only method is viable: no environment contamination occurred and deterministic extraction/compositing worked. This specific layer is not eligible for production review or runtime use because pose/orientation and original full-canvas registration did not follow the approved plate. No automatic retry is authorized.

See [receipt](adrian-opening-office-standing-v1-receipt.json), [provider original](adrian-opening-office-standing-v1-provider-original.png), [extracted layer](adrian-opening-office-standing-v1-extracted-layer.png), [Adrian-only composite](axiom-opening-office-shot01-daniel-adrian-only-composite.png), and [two-person blocking composite](axiom-opening-office-shot01-daniel-adrian-plus-daniel-silhouette-composite.png).
