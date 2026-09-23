# EVE — full game design document

**Working synthesis · 2026-09-23 · repository snapshot `e83dc61` · current content revision 19 · save schema 5**

This document describes the playable game through Chapter 5 and the approved direction for a larger campaign. It is a review document, not a content revision, art approval, or Chapter 6 implementation. Where an exact event or rule is not yet decided, it is marked **open** rather than silently made canon. The [Master GDD](EVE_MASTER_GDD.md) remains the future-design authority; authenticated runtime and frozen revision records govern what currently plays.

## 1. Creative proposition

**Logline.** A gifted but stalled intelligence analyst finds a file that should not exist. The investigation draws him into a manufactured identity, institutional coercion, and an operation whose evidence never tells the whole story. As Evelynn Vale, the player must decide what to investigate, whom to trust, which pleasures and forms of power to choose, and what it would cost to walk away.

**Genre.** Dark adult espionage RPG, investigative interactive fiction, and cinematic graphic novel. The erotic dimension concerns anticipation, mutual desire, negotiated terms, social visibility, and aftermath as much as intimate scenes. The mystery remains playable without sex or romance.

**Core question.** When institutions and people offer Evelynn access, protection, money, recognition, or intimacy, which choices are genuinely hers, and which become costly to refuse? The answer is expressed through specific events, resources, knowledge, promises, and exits—not a hidden morality or dependency score.

**Player promise.** The player can reason about evidence, author Evelynn's responses, set boundaries, accept worthwhile pleasure, make strategic bargains, refuse, and use later knowledge against someone with more formal power. The game remembers what was actually done and disclosed. It does not diagnose the player's feelings from an outfit, relationship, or outcome.

**Target scope.** The existing opening through Chapter 5 is playable. The first substantial full campaign aims for **15–20 hours**: approximately 6–7 hours of shared investigative spine, 6–8 hours of developing routes, and 3–5 hours of convergent endgame with route-sensitive consequences. That is a design target, not the present runtime length.

## 2. Design pillars and limits

1. **Evidence before revelation.** A claim, source, inference, and authenticated proof are different. A useful fact may still be selective or manipulated.
2. **Power is personal and concrete.** Every consequential offer names its provider, scope, price, duration, alternative, and exit. A later request cites an accepted term rather than inventing debt.
3. **Desire belongs to the player.** Attraction, pleasure, affection, compliance, strategy, consent, and relationship status are separate facts. Quiet satisfaction can be a complete outcome.
4. **Characters retain their own lives.** Maya can set limits; Julian may help without owning Evelynn; Sebastian cannot become an investigative utility; Sloane can be perceptive without omniscience.
5. **Choices leave legible traces.** The game remembers custody, money, public artifacts, actual recipients, false statements, deadlines, accepted obligations, and honored or violated boundaries.
6. **Darkness has a cause.** Coercion or exploitation requires a named action, threat or constrained alternative and a visible consequence. Later affection or pleasure cannot rewrite earlier harm into consent.
7. **Presentation is neither virtue nor vice.** Becoming female, styling oneself, taking pleasure, receiving help, or pursuing public or adult work is not corruption. The conditions and available exits matter.

The current runtime uses non-graphic fades for Julian's intimate outcomes. Revision 19 ships Sebastian's mutually chosen no-sex outcome; its sex-scope choice is deliberately unavailable until a separate body is authored and approved. The [explicit-scene register](../story/EXPLICIT_SCENE_REGISTER.md) tracks those points. This GDD does not authorize an encounter or graphic asset.

## 3. Player experience and format

The player reads a staged scene, inspects optional details, chooses a speech or action, sees the response, and later encounters the consequence. The action loop is:

`OBSERVE → INVESTIGATE / SPEAK / WITHHOLD → COMMIT → RECORD → CONSEQUENCE → REASSESS`

The interface is a cinematic reader: a scene image above a scrolling story pane, choice controls, and a utility rail/menu for assessment, evidence journal, conversation history, reading settings, and save recovery. On mobile, art, prose, and choices stack in document order. Assessment is accessible without replacing the fiction or silently committing an answer. There is no combat, tactical movement, simulation clock, procedural dialogue, or runtime LLM.

The current save is local to the browser profile and origin. Save schema **5** authenticates the state against its event ledger; new games use content revision **19**. Older authenticated saves retain their original content revision and continuation behavior. Backup download/restore and conflict handling are player-facing safeguards, not story mechanics. Any future revision must preserve frozen replay and make continuation explicit.

### Core interaction types

| Interaction | Player-facing use | Design constraint |
| --- | --- | --- |
| Investigation | Inspect documents, compare leads, request a bounded check, submit an assessment | Say what evidence supports; permit uncertainty and a weak but continuing result. |
| Dialogue | Choose wording, disclosure, challenge, invitation, or boundary | Only actual speech reaches the recipient; inner thought is not NPC knowledge. |
| Commitment | Accept, narrow, refuse, perform, or withdraw from a term | Show scope and consequence before commitment; do not infer a later obligation. |
| Personal life | Dress, spend, rest, contact someone, enjoy an event, seek or decline intimacy | Pleasure and solitude can reward the player without a compulsory penalty. |
| Public action | Authorize an image, caption, name, publication, or appearance | Permission and actual release are separate; rights remain exact and limited. |
| Recovery / counterplay | Correct a record, use retained proof, self-fund, seek support, end an arrangement | Make the alternative materially possible and acknowledge its real cost. |

## 4. World, premise, and knowledge boundaries

The setting is a grounded, near-future corporate city. Axiom's Strategic Intelligence floor, security system, monitored phone, subsidized housing, and Adaptive Medicine clinic give institutional decisions a physical reach. Helix, its executives, financiers, and acquisitions work offer different access and different incentives. Public records, editorial outlets, arts venues, and personal devices can create alternatives, though none automatically removes Axiom's existing powers.

Adrian Vale is a 34-year-old senior Axiom analyst. On a promotion morning, Daniel tells him Priya received the role; Benton assigns a Helix report. An unexplained Blackglass file then appears under Adrian's name. Security and Victoria Sloane treat the resulting access as an incident. Sloane presents an established Evelynn identity and a proposed operation; the origin and meaning of those records are not settled by her account. Refusal has real employment and housing costs. The clinic and Glass House operation carry the player into Evelynn's public life. The protagonist is one persistent person; an institutional identity package is not a second player character or proof of voluntary identity investment.

**Current mystery discipline.** The unknown sender is not named to the player before earned verification. The planned Rook proposition—that Rook previously lived/performed the established Evelynn identity—is a **Chapter 6 design target**, not a proven runtime fact. A photograph, familiar detail, or confession alone cannot establish it. Sloane's final motive and the complete ORACLE plan remain open.

**Information rule.** The player may know, suspect, or infer more than an NPC. Each NPC's knowledge must come from a delivered message, witnessed action, published artifact discovered through a source, or another recorded path. A phone may be monitored without Sloane instantly knowing every private line. Maya seeing the Helix/Novagen report header teaches **client names only** in revision 19. Benton receiving a submitted report is not automatically proof he read every attached document; the historical knowledge semantics on that point still need a versioned decision.

## 5. Campaign structure

| Movement | Current status | Dramatic job | Important choices and persistent results |
| --- | --- | --- | --- |
| **Opening: Adrian's day** | Playable, revision 19; 20/20 tracked opening visual states illustrated | Promotion humiliation, Benton/Helix assignment, evidence reasoning, Maya's personal support | Bond framing toward Maya; report quality; whether and how to discuss the case; security/case decisions. |
| **Day zero: Blackglass and Sloane** | Playable | Turn analyst into subject; define coercive offer and refusal cost | Report, trace, delete, open, authorize or leave; questions to Sloane; accept/refuse/reconsider; employment and housing consequences. |
| **Clinic / Glass House vertical slice** | Playable, with bounded stop and withdrawal endings | Test bodily/institutional authority, presentation, cover, incomplete proof, and custody | Stage One authorization and pause/stop; voice/face/presentation; zero to two mission leads; capture method, assessment and debrief. |
| **Chapter 3: Second Skin** | Playable | Return to a familiar home in a changed body; measure surveillance, truth, contact, independent opportunity | Scoped reply to residential log; Maya disclosure/distance; Voss/Helix alternatives; records, messages, appointments, public association and leverage. |
| **Chapter 4: Private Access** | Playable | Let Evelynn use independence and test professional/personal access | Public-file or Julian audit; three inquiries; supported/weak findings; earned fee and copy; bounded favor; false authority shortcut; eligible Julian interest and withdrawal. |
| **Chapter 5: The Beautiful Life** | Playable in revision 19 | Make money, clothes, public attention, work terms, help, and desire independently attractive and consequential | Purchase or save; messages; Harbour/Aster; image rights and publication; workspace terms; Maya's clean-line number; Julian or Sebastian/solitude; final owned placement. |
| **Chapter 6: The Cage You Choose** | Design only | Convert one actual benefit into an explicit expectation and exit cost while testing the Rook claim | Verify artifact and witness; negotiate/refuse/buy out; protect someone; use counter-information; Maya's first in-person meeting; bounded Sebastian goodbye. |
| **Later route pressure and endgame** | North-star design only | Bring public, executive, intelligence and independent histories into a shared operation | Route-sensitive evidence, witnesses, resources, exposure, obligations, relationships, and available exits. No ending resolution is locked here. |

### Chapter 5 detail

The twelve authored movements run from what Evelynn brought home, one purchase, correspondence and invitation, through chosen presentation, Harbour attention, Aster's public offer, workspace help/terms, messages, an optional personal evening, and the final arrangement of her belongings. A professional, glamorous, deliberately sensual, or minimal look changes presentation, not consent or identity. Aster publication requires separately authorized name, portrait/text, caption, fee, and use; an accepted sitting does not publish itself. Julian's professional help can be genuine and bounded. Sebastian's revision-19 lane adds a Harbour sound-check and rooftop hour with complete leave, decline, open, walk, and mutually chosen no-sex outcomes. It carries no case evidence or access.

The new personal-phone choice lets Evelynn send Maya only her number on an unmonitored line, using one of the two Chapter 5 message sends. It does not tell Maya the case or identity by implication. Their planned first in-person post-clinic conversation, **The Counter**, belongs to Chapter 6 and is not yet in the player.

### Current experience assessment

The implemented spine has a clear progression: professional slight → evidence anomaly → institutional control → bodily/identity pressure → operational uncertainty → independently chosen work and private life. The revision-18 prose pass reduced procedural narration, while revision 19 gives the non-Julian evening a person with his own voice and a respected non-intimate ending. Chapter 4's public-file route and Chapter 5's self-funded choices keep the investigation from depending on Julian.

The principal experience gaps are equally concrete. Chapter 6 has no executable proof or counterpower, so the mystery and accumulated terms have not yet paid off. The majority of later pages still lack final images, which weakens the intended cinematic rhythm even when the prose and choices work. Sebastian and Maya's revision-19 additions have source-level tests but still need a dedicated uninterrupted browser/editorial pass across their new branches. The deliberately gated Sebastian sex scope and the unbound shopping image must be presented as unfinished, not silently counted as playable content or visible art.

### Chapter 6 design gate

The approved direction is `BENEFIT → EXPECTATION → FRICTION → REVELATION → CONSTRAINT → COUNTERPOWER`. A useful arrangement becomes restrictive only after repeated reliance, an actual accepted term, and a costly alternative are shown. The Rook proof chain needs specific knowledge, a controlled artifact, independent corroboration, and player verification. The exact artifact, witness, provenance, rights of custody, ORACLE disclosure limit, and route-specific exit costs require a separate canon decision before implementation. Sebastian may have one ordinary message thread and optional goodbye before his Thursday tour; he does not become a recurring partner, hostage, source, or reward.

## 6. Principal cast and dramatic functions

| Person | Current role | Design rule |
| --- | --- | --- |
| **Adrian / Evelynn Vale** | Player character: Axiom analyst, then the person living under the Evelynn identity | Internal narration respects selected motives and feelings. Appearance does not prove acceptance. |
| **Victoria Sloane** | Executive Intelligence director with institutional leverage | Competent and potentially right about a bounded risk; knows only sourced facts. Her final motive is unresolved. Her white hair streak is unique to her. |
| **Maya Reyes** | Axiom compliance investigator, Adrian's long-time friend | Friendship with her own fears, work, training, limits, and partial knowledge. The player's earlier love framing is not reciprocation. Chapter 6 Counter is designed, not live. |
| **Elias Benton** | Adrian's supervisor | Professional control and humiliation are shown through action; receipt of a report and reading it need separate semantics. |
| **Daniel Kessler** | Axiom colleague who delivers the promotion news | A person from Adrian's prior work life, not a default romantic or investigative route. |
| **Dr Lena Voss** | Adaptive Medicine scientist | Clinical scope, records and qualifications; not an all-purpose handler, romantic route or secret source. |
| **Julian Mercer** | Helix COO and earned professional/personal possibility | Neither savior nor villain by default; fee, favor, workroom term, interest, intimacy and authority remain separately sourced. |
| **Sebastian Okoro** | Independent cellist met at Harbour or its rooftop hour | Adult personal possibility with no Helix/Axiom access, evidence function or investigative leverage; his own music and departure matter. |
| **Marcus Chen / Celeste Laurent** | Helix/fund figures tied to Glass House and possible later corroboration | Their claims and witnessed knowledge are bounded. Neither can resolve the Rook mystery by fiat. |
| **Unknown sender / Rook** | Selective outside information; identity remains a proof problem | A true detail is not proof of motive or trustworthy allegiance. |

Supporting editors, hosts, clerks, coordinators and service workers have functional roles and their own immediate interests. They do not become intimate partners or witnesses merely because a route needs one.

## 7. Systems and state design

### Evidence, assessment, and custody

Investigations should let the player form a bounded conclusion, a weak conclusion, or an explicit unresolved assessment and continue. An unsupported accusation brings an authored challenge, not a reload trap. Each item records source, holder, recipient, permitted use, and what it proves. Glass House audio, photograph, access token and wafer have distinct ownership and evidentiary limits; no route upgrades a suggestive item into proof of an unseen fact. Later callbacks require the actual retained item and relevant actor knowledge.

### Relationships and power

Store actions, statements, contact, boundaries and available help rather than one visible affection or dependency score. A choice may make a relationship warmer, more careful, or strained, but NPCs can disagree and refuse. A resource becomes dependency only through a provider-controlled term and shrinking alternatives. A luxury object or chosen intimacy is insufficient evidence. An exit may cost money, time, privacy, opportunity or trust; those costs must be named and recoverable where the fiction permits.

### Presentation, wardrobe, and identity

The canonical visual identity of Evelynn is distinct from Maya and Sloane. Revision 19 aligns Chapter 5 wardrobe prose with the approved styling direction: fitted looks, deliberately finished hair and makeup, and heels; clinic recovery and the first mirror reveal are explicit unstyled exceptions. Executive, Socialite and Shadow lines alter silhouette and social reading, not desirability, willingness or future career. A change in outfit requires continuity for shoes, bag, jewelry, phone, cup, documents and weather. Future body modification needs separate records for requester, desire, pressure, payer, reversibility, permanence, accepted scope, appearance and attribution.

### Intimacy

Eligibility is not consent. A handoff requires established adult participants, a current invitation and answer, explicit scope, ability to refuse or withdraw, and an aftermath that remembers the choice without assigning shame or allegiance. Desire can be personal; Julian's route may also have a separately chosen instrumental or mixed motive. Sebastian's route is personal by design and cannot be used to solve the case. No required proof, money or professional fee sits behind a sexual choice. Coercive content cannot be repackaged as a mutually willing scene.

### Route architecture

The larger campaign uses a diamond: a common operation can follow different agency, public, executive and independent approaches, then reconverge with distinct evidence, witness access, publicity, resources and obligations. Exploitation/recovery is an overlay caused by specific acts, not the inevitable endpoint of public, erotic or luxurious play. Reconnection may share a location or objective but must not erase who arrived, what they know, or what it cost them.

| Future trajectory | What it offers the player | Distinct pressure | What a reconverged scene must remember |
| --- | --- | --- | --- |
| Independent / free agent | Control of evidence and selective alliances | Limited money, slower access and personal exposure | Self-funded resources, custody, unshared facts and who was refused. |
| Sloane / institutional intelligence | Operational infrastructure and formal authority | Monitoring, scope disputes and loyalty expectations | Exact reports, permissions, objections and institutional sources. |
| Rook / outside intelligence | Competing history and selective counter-information | Provenance, manipulation and uncertain motive | Which proof links were verified, withheld or traded. |
| Executive / corporate | Access to decisions, status and useful support | Conflicts between professional terms, private care and influence | Contracted work, fee, accepted benefit, Julian boundary and exit rights. |
| Public / editorial / celebrity | Audience, income and image as leverage | Privacy, attribution, licensing and cover risk | What was actually published, under which rights, and who discovered it. |
| Chosen adult professional work | Authorship, audience, income and negotiated participation | Distribution, stigma, partner/sponsor terms and continuing consent | Scope, rights, compensation, participants and independent exit; this remains future design. |
| Kept / concentrated-support state | Comfort or relief with potentially costly reliance | Alternatives may shrink if resources consolidate under a provider | The sequence of accepted terms and lost/retained options; never infer captivity from luxury alone. |
| Exploitation and recovery overlay | Survive a specific harm and rebuild options | Threats, isolation, loss of resources or trust | The cause of harm, available support, repairs and rights restored; never redefine the harm as chosen. |

These are writer-facing trajectory families, not menu labels, morality grades, or promises that all will have equal scene counts. The independent path must keep the case solvable. A relationship, public job or adult scene may change access, but none is mandatory proof.

## 8. Visual, audio, and interface direction

**Visual thesis.** A polished, adult 2D graphic novel: near-future luxury, architectural control, clean ink, flat cel fills, hard graphic shadows, cool graphite/blue balanced with warm amber light. Daylight uses the same line and shadow language with brighter materials. Avoid photorealistic skin, anime shorthand, neon cyberpunk, and generic glamour. Adrian reads as bookish; Evelynn's face remains her own through wardrobe changes. Maya has a distinct face and warmer silhouette; Sloane alone has the white streak. The [Art Bible](../art/EVE_ART_BIBLE.md), [style lock](../art/EVE_STYLE_LOCK.md), and [identity gate](../art/MAYA_EVELYNN_VISUAL_IDENTITY.md) provide the operational details.

**Shot grammar.** **HOLD ON DIALOGUE. CUT ON ACTION. ALWAYS SHOW ART.** Hold an approved composition across dialogue in unchanged staging. Cut for entrances, movement, place, material object action or changed participants. Never show a future character, cup, file, outfit, publication, or decision. Use stable beat IDs and exact state guards. Staging references and production environment components are not generic runtime fallbacks. The Axiom desk axis remains consistent, with Adrian screen-left looking toward the desk; the desk, monitor face, visitor chairs, circulation lane and smoked-glass office must keep their geography.

**Current art status.** The tracked opening fixture is **20/20 runtime-visible**. The rest of the game is not fully illustrated; the 2026-09-22 audit of 175 then-authored pages is a pre-revision-19 source inventory, not a current exhaustive branch denominator. Many release, clinic, mission, Chapter 3, Chapter 4 and Chapter 5 states lack reviewed exact art. The newly approved C5-S02 near-future shopping composite is in production with a recorded PASS but, at this snapshot, has **no public copy or runtime binding**; its street master is an environment anchor only. Sebastian scene images and many other candidates remain staging-only. Coverage and quality must be reviewed separately.

**Sound direction (future design).** Use restrained city rain, building air, security gates, quiet rooms, paper and glass, music with a source in the scene, and intentional silence. Sebastian's cello should feel like music he is making, not a generic romance cue. No voice acting or shipped audio system is claimed by this document.

**Reader requirements.** Keep art visible during dialogue, preserve legible typography and speaker distinction, place investigation instructions in concise hints or notices, and keep Assessment, evidence and history accessible. Mobile must retain image order, readable prose, clear touch targets and no horizontal overflow. Keyboard focus, reduced motion, save feedback, and valid backup restoration remain release checks. A missing image must fail closed without hiding the story; it is a coverage defect to resolve, not permission for a misleading substitute.

## 9. Content production and verification

### Authoring package for every new scene

Specify the dramatic purpose; location/time and previous shot; entry facts; player knowledge; each NPC's sourced knowledge and objective; player choices; immediate response; persistent record; prop/wardrobe custody; HOLD/CUT map; alternative/exit; and at least one later callback. A scene that changes the case must state exactly what evidence was added and what remains unknown. A social scene must justify its own existence even if no relationship advances.

### Approval and implementation boundary

Design approves canon, dialogue, structure, and meaningful consequences. Code implements versioned actions, saves, resolver bindings and tests. Art produces and reviews specific shots; PASS, production registration and runtime binding are separate steps. The three work lanes and file ownership are described in [LANES.md](../LANES.md). Current production files, receipts and scene guards take precedence over a staged preview. No paid generation, promotion or credit expenditure follows from this GDD.

### Acceptance tests

- A fresh revision-19 game and representative older revisions reach their authored endpoints without changing historic text or ledger authentication.
- Equivalent decisions preserve evidence, resources, NPC knowledge and gameplay outcomes unless a separately approved revision changes them.
- Every playable state receives truthful art in the final art-completion pass, including branch-safe wardrobe, participant and prop states; opening 20/20 alone is not the whole-game gate.
- A Chapter 6 proof sequence is reconstructible from independent, limited sources and never requires intimacy.
- A costly exit has a named term, a material consequence, and at least one feasible counterplay/recovery route.
- A new social lane supports refusal, uncertainty, friendship or pleasure without punishing nonparticipation.
- Complete desktop and mobile routes, save/load, historical replay, accessibility and an uninterrupted editorial read accompany automated state/build checks.

At this snapshot, the full state suite passed **537/537** across 58 files, including the focused revision-19 and frozen-18 checks; the production build/typecheck passed, and the existing Chapter 5 browser suite passed **3/3**. That browser suite exercises earlier saved revisions; it does **not** constitute live browser verification of the new Sebastian or Maya-number UI.

## 10. Open decisions and next milestones

| Priority | Decision or work | Gate for completion |
| --- | --- | --- |
| **1 — Current release truth** | Finish a revision-19 desktop/mobile reader traversal for Sebastian (met/unmet, decline, walk, no-sex, withdrawal), Maya's clean line and older-save isolation. | No mismatched prose, state, save or art; source and browser tests agree. |
| **2 — Visual completion** | Build a fresh post-revision-19 page/branch inventory, group missing shots by reusable environments and cast layers, then review, promote and bind exact states. Bind the approved pre-purchase C5-S02 image only when its revision-19 wardrobe guard and public copy are verified. | Every reached page has a truthful approved CUT/HOLD; no staging-only or future-state fallback. |
| **3 — Chapter 6 canon** | Choose the Rook proof artifact, independent corroborator, provenance, custody, exact ORACLE reveal limit, provider-specific exit cost and recovery actions. | Design review accepts a verifiable, route-sensitive sequence before prose or code. |
| **4 — Maya's Counter** | Implement the approved first in-person post-clinic meeting with clean/monitored/no-meeting entries, her own review/fear, disclosure limits and boundaries. | Revisioned knowledge and phone-exposure checks; no automatic romance or access reward. |
| **5 — Sebastian carry-forward** | Add the bounded pre-Thursday message/goodbye to Chapter 6 with a fresh choice. | No investigative leverage, recurring-partner assumption or guilt for other outcomes. |
| **6 — Full-campaign architecture** | Specify later shared operation, route-specific resources and endings after Chapter 6 proves its evidence and exit logic. | Each route changes access and cost, and reconvergence preserves history. |
| **7 — Production polish** | Review remaining prose combinations, visual consistency, physical-device performance and the large historical-content bundle. | Quality evidence from real play, not only a passing test suite. |

**Unresolved, not silently fixed here:** Benton's receipt-versus-reading knowledge; the final Rook/ORACLE truth; which later public/adult professional institutions may make an offer and under what rights; the exact future operation and endings; full-game visual coverage; and whether any deferred explicit scene bodies are authored. The proposed Chapter 6 facts and route families remain subject to their own approval and versioned implementation.

## 11. Source map

- Future design law: [Master GDD](EVE_MASTER_GDD.md), [route architecture](../story/FULL_GAME_ROUTE_ARCHITECTURE.md), [adult-thriller pacing](../story/ADULT_THRILLER_PACING_MAP.md), [future trajectories](FUTURE_TRAJECTORIES.md).
- Current story and editorial proof: [revision-18 implementation record](../story/REVISION_18_IMPLEMENTATION_RECORD.md), [scene audit](../story/eve-scene-editorial-audit.md), [Chapter 4 treatment](../story/CHAPTER_4_PRIVATE_ACCESS_TREATMENT.md), [Chapter 5 treatment](../story/CHAPTER_5_THE_BEAUTIFUL_LIFE_TREATMENT.md).
- New revision-19 authority and limits: [Sebastian lane](../story/NON_JULIAN_SOCIAL_LANE.md), [Maya friendship lane](../story/MAYA_FRIENDSHIP_LANE.md), [revision-19 script](../story/scripts/REV19_SEBASTIAN_MAYA_SCRIPT.md), [explicit-scene register](../story/EXPLICIT_SCENE_REGISTER.md).
- Future chapter: [Chapter 6 treatment](../story/CHAPTER_6_THE_CAGE_YOU_CHOOSE.md), [entry-state matrix](../story/CHAPTER_6_ENTRY_STATE_MATRIX.md).
- Visual production: [Art Bible](../art/EVE_ART_BIBLE.md), [style lock](../art/EVE_STYLE_LOCK.md), [opening occupancy](../art/OPENING_VISUAL_OCCUPANCY_CONTRACT.md), [full-game art inventory](../../eve-full-game-art-coverage.md).
