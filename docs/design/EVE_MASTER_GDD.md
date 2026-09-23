# EVE — MASTER GAME DESIGN DOCUMENT

## Full-Game North Star

**Version 0.3 — design authority for future full-game development.**

The historical [vertical-slice GDD](../../Library/EVE_Vertical_Slice_GDD_v0.2.docx) remains production evidence for the slice that shipped through its own review. It is not overwritten or reinterpreted by this document. This Master GDD governs future full-game design only; it does not alter current runtime, save schema, authored scenes, art approvals, or frozen revisions.

## High concept

EVE is a dark adult espionage RPG: an investigation, a choice-driven erotic thriller, and a life, identity, and power game. Evelynn’s investigations, identity, power, desire, public image, and survival interlock. The game asks what she chooses, what choices remain meaningful, who benefits when those choices narrow, and what she remembers when control changes hands.

The full game supports extensive possible trajectories: independent intelligence work; Sloane or Rook alignment; corporate leadership; executive companionship; a publicly visible career; adult entertainment as chosen professional work; a trophy/kept arrangement; and exploitation/recovery. These are emergent patterns made from repeated terms, relationships, alternatives, costs, and consequences. They are never menu labels, morality ratings, costume classifications, or predetermined endings.

## The player promise

- **Investigate:** follow evidence, assess competing claims, preserve or trade information, and expose systems with incomplete knowledge.
- **Author a life:** make choices about work, presentation, intimacy, public visibility, material comfort, and alliances without a hidden virtue meter.
- **Exercise and confront power:** negotiate terms, use leverage, protect people, refuse access, accept a bargain, or recognize when a bargain has changed the available options.
- **Live with memory:** the game remembers material choices, obligations, publications, custody, knowledge, relationship boundaries, and shifts in practical control.

## Full-game shape

The first substantial campaign should run **15–20 hours**:

| Segment | Target | Function |
|---|---:|---|
| Shared spine | 6–7 hours | Establish the investigation, Evelynn’s position, core relationships, and recurring systems of evidence and terms. |
| Route pressure | 6–8 hours | Let public, executive, intelligence, and independent choices develop through distinct opportunities and costs. |
| Convergent endgame | 3–5 hours | Bring routes into a shared operation whose consequences are route-sensitive, without erasing the history that reached it. |

The campaign alternates investigative pressure, social/power negotiation, private life, public consequences, and recovery or counterpower. It does not turn every chapter into an intimacy chapter, an espionage chapter, or a punishment chapter.

## Route families

### Espionage and agency

Free-agent, Sloane, and Rook-aligned play concerns evidence, operational access, handlers, credibility, covert risk, and the cost of retaining independent sources. Alignment is never a moral answer; no source is automatically truthful or safe.

### Corporate private power

Helix, executive influence, companionship, and possible trophy/kept states concern access to decisions, status asymmetry, gifts, obligations, housing, protection, and the ability to leave. Julian is neither automatic savior nor villain. A visible luxury state never proves who has power.

### Public body and fame

Celebrity, modelling, editorial work, public image, and an adult career concern rights, authorship, audience, privacy, exposure, and professional terms. Fame can be influence and danger. Adult work may be chosen work, entrepreneurial work, or work with unfair conditions; the conditions, rights, and alternatives matter.

### Exploitation and recovery overlay

Exploitation/recovery may intersect any family, but it is not an inevitable destination for women, public figures, adult workers, or people who accept comfort. It begins only with independently authored coercion, deception, threats, constrained options, or harm. Recovery restores specific options, resources, safety, and authorship; it does not require repudiating femininity, desire, luxury, or a chosen profession.

## Darkness and agency law

The game does not guarantee that Evelynn will remain in control. It guarantees that it will distinguish control from its appearance, retain the history of how it changed hands, and keep harm legible.

- Consent, compliance, desire, pleasure, affection, dependency, control, and strategy are separate authored facts.
- Coercion never becomes consent retroactively because someone later finds value, pleasure, affection, status, or survival in an outcome.
- A dark event remains canonically non-graphic and structurally separate from a mutually authorized `AdultSceneSpec`.
- A later recovery, romance, career decision, or strategic use of a situation cannot erase a prior threat, refusal, lack of alternatives, or harm.
- Where fiction permits, refusal, negotiation, exit, support, and recovery must be viable. Dark outcomes remain allowed to be dark when the fiction has actually established them.

## Body autonomy and modification

Presentation, embodiment, and modification can arise through self-authorship, career choice, sponsorship, relationship pressure, dependency pressure, or coercion. Their visual result does not answer which occurred.

Every material change proposal must preserve, in design and eventual runtime contracts, the following provenance:

| Field | Question it answers |
|---|---|
| `requested_by` | Who proposed or asked for the change? |
| `desired_by_evelynn` | Did Evelynn affirmatively want it at the relevant time? |
| `pressure_source` | What social, economic, institutional, or interpersonal pressure existed? |
| `payer` | Who paid, and what terms attached to payment? |
| `reversibility` | Can it be changed, paused, removed, or practically escaped? |
| `permanence` | What persists physically, socially, financially, or publicly? |
| `accepted_scope` | What exact action, use, visibility, or alteration was accepted? |
| `appearance` | What is visibly true without inferring motive or agency? |
| `attribution_influence` | Who may be publicly or privately credited with influence, if anyone? |

Appearance never reveals whether a change was desired. Any later stage of Evelynn’s embodiment retains affirmative authorization unless a new canon event explicitly establishes a different condition; pressure or compliance is never silently converted into identity investment.

## Adult-thriller pacing

After Chapter 3, a substantial chapter should generally contain **2–4 adult heat beats** and **0–2 AdultScene handoffs**. A heat beat can be attention, negotiation, flirtation, private vulnerability, presentation, or a boundary; it is not a quota for sexual action. Handoffs require the chapter’s actual eligibility, current willingness, scoped authorization, and aftermath gates.

Julian cannot monopolize Evelynn’s adult life. Non-Julian possibilities may be emotionally meaningful, strategic, social, public, professional, or simply pleasurable, but they must be independently authored and never exist to reward or punish a route. Core investigation progress never requires sex.

## Design laws

1. Becoming female is not corruption.
2. Erotic desire is not a morality score.
3. Adult work is not inherently exploitation.
4. Luxury is not automatically dependency.
5. Dependency means shrinking meaningful alternatives.
6. Consent, compliance, desire, pleasure, affection, dependency, control, and strategy remain separate.
7. Harmful conduct stays harmful even if later value is found in its aftermath.
8. Evelynn may be victim, survivor, manipulator, protector, exploiter, or power broker.
9. The player is not guaranteed control forever.
10. The game remembers how control changed hands.
11. Appearance never indicates whether something was desired.
12. Relationships may be loving, strategic, transactional, dependent, abusive, or mixed.
13. Julian is neither an automatic savior nor an automatic villain.
14. Celebrity is opportunity and exposure.
15. Adult entertainment conditions matter.
16. Trophy/kept visibility does not reveal the real power balance.
17. Investigation remains playable on every trajectory.
18. Branches reconverge without erasing history.
19. Refusal, negotiation, and recovery remain viable where the fiction permits.
20. Dark outcomes are allowed to remain dark.

## Branch and consequence doctrine

Use a diamond structure: choices diverge around access, knowledge, terms, social visibility, and relationship history; a later shared operation can reconverge the plot; the game must react to the route that arrived. Reconvergence is not amnesia. It should change witnesses, available evidence, public risk, resources, obligations, private boundaries, and the language of later scenes.

An overlay such as exploitation/recovery can coexist with public, executive, or espionage play, but must preserve the distinct causes, harms, alternatives, and recovery work. Replay value comes from materially different access and consequence, not merely reordered dialogue.

## Current-document relationship

This document is the North Star for future design. It is implemented through, and constrained by, [Future Trajectories](FUTURE_TRAJECTORIES.md), [Full-Game Route Architecture](../story/FULL_GAME_ROUTE_ARCHITECTURE.md), [Adult-Thriller Pacing Map](../story/ADULT_THRILLER_PACING_MAP.md), [Dark Power Roadmap](../story/DARK_POWER_ROADMAP.md), and [Adult Scene Handoff Map](../story/ADULT_SCENE_HANDOFF_MAP.md). None of those documents independently changes frozen runtime.
