# PRIVATE ACCESS — entry-state matrix

Authority: `story/chapter-3-design`, inspected HEAD `75add30`. Chapter 3 is content revision 14, save schema 5. Its terminal node is `chapter3.departure`, at 18:00. This matrix describes reachable state, not factions.

## Departure families

| `c3.departure` | Required preceding state | Actual opening | What is NOT implied |
|---|---|---|---|
| `sloane` | Earned invitation, confirmed 18:00 or rescheduled 18:45 | Continue the connected six-o’clock call, or walk until the later call | Obedience to a new assignment; knowledge of other contacts |
| `julian-mercer` | Completed paid discussion; reception creates follow-up; not withdrawn; 18:00 confirmed | Continue the connected professional follow-up | Romance, future contract, knowledge of undisclosed files |
| `rook` | Retained sender window; 18:00 confirmed | Continue unknown sender’s call | True identity, complete program history, trust |
| `voss` | Actual institutional review; offered and confirmed 18:00 | Continue the scoped records call | A handler relationship or further medical intervention |
| `maya` | Prior Chapter 3 call/kept morning call; confirmed 18:00 or 18:45 | Continue or honestly bridge to the agreed call | Knowledge of adaptation without its disclosure, returned affection |
| `own` | Always available | Walk on the river path without an invented call | Absence of obligations to other people |

The selected six-o’clock call is already connected at departure. The selected 18:45 call has only a reminder. Chapter 4 must not dial the first again or describe the second as already completed. All travel remains on the actual river path; no unseen arrival at a new residence.

## Independent axes retained at entry

| Axis | Actual storage / values | Consumption and limits |
|---|---|---|
| Julian availability | `c3.helix-window`: offered / withdrawn / absent; `c3.cal-julian-mercer` | Only a kept selected follow-up earns the new Julian assignment. A missed/unanswered/cancelled/withdrawn follow-up does not become automatic employment. |
| Reception | `c3.reception`: embrace / negotiate / exploit / refused / absent | Introduction wording and contacts remain exact; refusal still keeps earned voucher. |
| Image permission | `c3.photo`: published / refused / absent; `c3.photo-scope`, `c3.public-association` records | Only published artifact permits an authored public-page discovery. No new image use or rights. |
| Marcus summary | `c3.marcus-auth`, `c3.memo`: correct / allow / retain / negotiate / pressure | Authenticated note, correction and circulation retained. Never a signed advisory contract. |
| Pressure | `c3.memo=pressure`; `c3.access-reduced`; Julian delivery log | Guaranteed access refused; introductions/follow-up withdrawn; exact demand delivered. Do not quietly restore access. |
| Procurement | `c3.procurement` or `c3.marcus-access` | A contact or one proposal route, not guaranteed work or unrestricted data. |
| Voss review | `c3.review-done`; three document records; `c3.scope-gap` | Different clinical and administrative claims; routing receipt does not prove Sloane read it. |
| Qualification | `c3.qualification`: retain / circulate / formal; signed proof; routed/review records | Retention is private. Formal review is pending, not already won. |
| Sender | `c3.verified-date`, `c3.compared-date`, `c3.rook-window`; dated sender delivery log | Verified chronology is not verified motive; exact reporting/misdirection remains available. |
| Maya | `npcs.maya.known`, earlier `chapter3.*` records, `c3.morning-contact`, current calendar | Read exact received messages. Private player feelings do not grant her knowledge or willingness. |
| Sloane | `npcs.sloane.known` | Received wording only; partial reports do not grant original documents. |
| Competing accounts | Individual old-NPC observations and chronological Julian/sender logs, each with source/event | Preserve contradictory accounts as accounts. Do not reconcile them into omniscience. |
| Evidence custody | `proof`, `mission.capture`, `mission.token`, `mission.wafer`, `c3.*` documents | Sloane’s copy is not a player clean copy. Public copies do not imply private file access. |
| Prior medical plan | `c3.medical-plan`, clinic state and care-plan record | No later adaptation or changed prognosis is inferred. |

## Calendar product space

Each earned recipient independently has one of these statuses; absent invitations remain absent.

| Status | Meaning at departure | Chapter 4 handling |
|---|---|---|
| `18:00` | Selected call, or confirmed call not yet resolved | Selected call pays off first. Other confirmed calls were changed to waiting by departure. |
| `18:45` | Agreed later slot (Maya/Sloane only) | Keep, cancel or explicitly miss after time advances; never premature no-show. |
| `waiting-confirmed` | Six-o’clock confirmation unanswered at departure; follow-up received | Apologize/request another time or acknowledge the missed window. No universal trust penalty. |
| `conflict-pending` | Competing 18:45 confirmation remains | After the selected later call, the competing window is actually missed; identify that recipient alone. |
| `cancelled` | Plain cancellation delivered | Released slot, not a no-show. |
| `excused` | False medical-order claim delivered | Recipient knows the assertion, not its falsity unless an authored contradiction is delivered. Voss already contradicted claims made to her. |
| `unavailable` | 18:45 request refused and old slot released | No appointment exists. |
| `waiting` / `unanswered` | No confirmation | Expired invitation, not broken promise. |

Selecting no-call can leave a real 18:45 appointment outstanding. Selecting an 18:00 call does not erase another 18:45 slot. Selecting one 18:45 call can produce both an earlier missed six-o’clock call and a later double-booking. These dimensions combine; no route label replaces them.

## Implementation representation

Freeze all revision-14 replay dependencies before changes. Continue explicitly to revision 15 only from an authenticated departure. Preserve the entire ledger and history prefix. Do not mutate Chapter 3 choices to represent Chapter 4 consequences.

Schema 5 already provides bounded choices, typed history, knowledge, custody proofs and sourced NPC observations. Chapter 4 will index its sourced journal entries into existing typed history through `c4.rec.*`/`c4.event.*` choice keys, avoiding the near-full 100-entry day-record list. No JSON payload is hidden in prose, no record is dropped, and the journal renders the same readable text/source. Physical assets retain explicit proof custody.

Validation will construct each departure through actual offered choices, including both later-call destinations and pending double-bookings, then authenticate/replay their continuations. Designs above are checked against `calendarInvites`, `calendarStatus`, `disclosureText`, `opportunityChoices` and `autonomyChoices` at the inspected HEAD.
