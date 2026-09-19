# Adrian visual reference authority

**Status: human review required.** No current Adrian image is canonical, production-approved, or runtime-bound. This document separates authority before any future Adrian generation.

## Current review candidate

`art/staging/cast-scenes/eve-cast-adrian-v1.png` is the only dedicated portrait. It is a **REVISE** face candidate: the 34-year-old intelligence-analyst concept, dark short hair, restrained professional presentation and family resemblance are usable review material, but visible stubble conflicts with the original clean-shaven direction. Its high-contrast angular rendering also needs an owner decision that it reads as an adult EVE character rather than a generic or exaggerated masculine archetype. It must not be promoted automatically.

The companion scenes in `art/staging/cast-scenes/adrian-review-gallery.html` support comparison only. `eve-scene-benton-v1.png` is explicitly excluded from opening-wardrobe authority because its white collar has a documented same-day continuity conflict. Clinic and evening scenes are excluded from opening-morning wardrobe authority.

## Authority model

| Authority | Required source | Current status | Permitted use |
|---|---|---|---|
| Adrian identity | Owner-approved canonical face/three-quarter reference | Missing | Facial likeness only |
| Adrian body | Owner-approved neutral full-body/proportion reference | Missing | Scale and silhouette only |
| Opening wardrobe | Owner-approved exact promotion-morning clothing reference | Missing | Opening apartment, commute and office clothing only |
| Environment | Approved opening apartment or future office master | Apartment approved; office missing | Geography, camera and lighting only |
| Shot composites | Reviewed exact-state composition | None approved for Adrian | Exact scene only; never global authority |

## Future full-body Adrian reference — do not generate yet

**Purpose:** one neutral, reusable reference asset after the owner approves Adrian identity. It is not a runtime scene.

**Required framing:** 3:4 or taller; full head, both hands and both shoes visible; neutral upright stance; simple removable background; polished EVE illustrated espionage-thriller rendering; believable adult proportions; no heroic or glamour pose.

**Authored clothing facts:** the opening explicitly establishes a jacket in the closet and a separate usual coat worn for the commute. Shirt, trousers, belt, shoes, exact jacket cut, and grooming beyond the staging proposal are **not authored facts**. They need an owner-approved wardrobe decision before generation; do not import the Benton white-collar conflict or treat the staging portrait's dark shirt/simple jacket as canon. No later Evelynn, clinic, Glass House, mission, or transformation elements.

**Reference order for the later single-output task:** approved Adrian face → approved Adrian body/proportion reference → approved opening wardrobe reference. Use a consistency-oriented character workflow with those separate references; one output, no automatic retry, 1-credit maximum only after a live quote and owner approval.

## Mirror inspection specification

| Field | Locked requirement |
|---|---|
| Shot ID | `opening.apartment.inspect-mirror` after `INSPECT_APARTMENT mirror` |
| Status | **BLOCKED ON ADRIAN AUTHORITY** |
| Camera | 16:9 medium object-led view from the apartment threshold toward the actual bathroom mirror; no glamour framing |
| Mirror | Bathroom mirror only; do not substitute the proposed dressing mirror or fabricate extra room geometry |
| Adrian position | Ordinary standing inspection posture within physically plausible reflection geometry |
| Wardrobe | Exact approved opening-morning wardrobe only |
| Expression | Neutral, tired-alert self-assessment; no transformation foreshadowing or identity conclusion |
| Light | 06:42 cool rainy spill plus restrained bathroom practical |
| Visible geography | Mirror, threshold and only coherent adjacent apartment/bathroom anchors |
| Cut rule | Cut on the completed `INSPECT_APARTMENT mirror` action; hold through its immediate feedback only; never change artwork merely because interface panels open |

## Office reuse

After all three Adrian authorities exist, derive rather than redesign Adrian for commute/arrival, Daniel conversation, Benton assignment, Helix investigation, Maya conversation where Adrian is present, and office aftermath. Each still requires an exact environment, action, wardrobe and prop-state review.
