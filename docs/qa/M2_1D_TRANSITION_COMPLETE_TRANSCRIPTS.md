# M2.1D transition-complete narrative transcripts

## Root cause and fix

The former transcript exporter represented each state snapshot with only `history.at(-1)`. That loses authored context when one reducer action appends more than one history record. `CHOOSE_DIALOGUE` can append the selected player line at the previous node and then append the entered scene; the old export retained only the entered scene record. The first live LOGIC finding was therefore a false positive caused by missing transition context, not a runtime defect.

The new contract keeps one explicit `initial` entry followed by `transition` entries. Each transition carries the previous node, next node, executed action (`type`, stable id, source, intent, and available choice semantics), every history record appended by that action in order, flattened blocks for compatibility, and the resulting evidence, knowledge, custody, NPC knowledge, and resources. Each emitted history record retains its authored node, so a player line and an NPC response cannot be mistaken for one another.

The M2 context packet exposes `kind`, `previousNode`, `nextNode`, `action`, and `emittedHistory` for every transcript entry. The reviewer contract also requires inspection of the complete transition before making a provenance claim.

## Regression coverage

- `maya.invitation → invitation.yes → maya.case` contains Adrian’s `“Eight o’clock.”` and Maya’s `“Eight,” she says. “I am holding you to that.”` with their speakers and history nodes preserved.
- Maya’s resulting observation remains `“Eight o’clock.”` with source `Adrian’s answer to the evening invitation`; the transcript and state are logically compatible.
- A deterministic synthetic action that appends two history records keeps both records in order.
- All 10 golden routes rebuild deterministically, remain dedupe-compatible, and still pass their route contracts.

## Context-size measurement

The comparison uses the 14 prepared M2 context packets from the pre-M2.1D `qa/reports/m2-contexts.json` as the before baseline. After is generated from the same route metadata and runtime states with the transition-complete contract. Digest changes are expected because the transcript intentionally contains more authored truth.

| Route | Before bytes | After bytes | Delta | Delta % |
| --- | ---: | ---: | ---: | ---: |
| chapter4-julian-professional | 251,610 | 446,574 | 194,964 | 77.49% |
| chapter5-eligible-intimacy | 300,847 | 532,461 | 231,614 | 76.99% |
| chapter5-no-intimacy | 295,533 | 520,329 | 224,796 | 76.06% |
| mission-cautious-investigation | 172,618 | 315,654 | 143,036 | 82.86% |
| opening-analytical-cautious | 22,592 | 42,307 | 19,715 | 87.27% |
| opening-bad-assessment | 21,302 | 40,193 | 18,891 | 88.68% |
| chapter3-home-contact | 190,954 | 345,713 | 154,759 | 81.05% |
| chapter4-independent-public | 275,676 | 484,719 | 209,043 | 75.83% |
| chapter5-public-visibility | 289,521 | 505,551 | 216,030 | 74.62% |
| clinic-privacy-autonomy | 127,874 | 238,731 | 110,857 | 86.69% |
| fuzz-seed-17 | 56,541 | 109,068 | 52,527 | 92.90% |
| fuzz-seed-29 | 29,113 | 56,740 | 27,627 | 94.90% |
| fuzz-seed-41 | 28,279 | 57,195 | 28,916 | 102.25% |
| fuzz-seed-53 | 27,651 | 54,669 | 27,018 | 97.71% |
| **Total** | **2,090,111** | **3,749,904** | **1,659,793** | **79.41%** |

The three pilot routes grew as follows: `opening-bad-assessment` 21,302 → 40,193 bytes (+88.68%); `chapter5-no-intimacy` 295,533 → 520,329 (+76.06%); `chapter5-public-visibility` 289,521 → 505,551 (+74.62%). This is a material increase. Necessary transition truth is retained; route-aware compression remains a later optimization.

## First live-finding calibration

```json
{
  "contextVersionBefore": "m2-context-expanded-v1",
  "contextVersionAfter": "m2-context-delta-v1",
  "classification": "FALSE_POSITIVE",
  "cause": "MISSING_TRANSITION_CONTEXT",
  "reviewer": "LOGIC v1",
  "route": "opening-bad-assessment",
  "findingSummary": "The reviewer believed Maya’s own ‘Eight’ response was incorrectly recorded as Adrian’s knowledge source.",
  "humanRuntimeResolution": "Adrian selected ‘Eight o’clock.’ immediately before Maya responded. The reducer records Maya’s knowledge from Adrian’s answer to the evening invitation.",
  "runtimeChanged": false
}
```

Future findings are not auto-classified. The supported human vocabulary is `TRUE_ISSUE`, `USEFUL_WARNING`, `FALSE_POSITIVE`, and `INSUFFICIENT_EVIDENCE`.

## Encoding diagnosis

The stored JSON context/report files are valid UTF-8 and round-trip byte-for-byte; curly quotes are present as Unicode code points and mojibake sequences are absent. The `â€™`/`â€œ` display was a PowerShell console-decoding artifact. Story text was not normalized or rewritten.
