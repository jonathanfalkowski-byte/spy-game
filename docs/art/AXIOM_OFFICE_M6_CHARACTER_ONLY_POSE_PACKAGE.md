# Axiom Office M6 — Character-Only Pose Package

**Status: zero-credit, prepared for human review.** M6 changes the Adrian production method after the rejected office-referenced attempt: generate Adrian alone on a simple separable background, extract the layer, then deterministically composite it onto the frozen M5 office. The office master is never supplied to the character generator.

## Exact seated registration

The M5 canvas is 1920 x 1080. Adrian’s seated-working registration is fixed to chair-seat center **(880, 836)** with silhouette bounds **x=798..962, y=608..910** and floor contact at **y=904**. This places Adrian at the central operator chair, never the west workstation. The evidence surface stays to the left of his torso and the terminal stays to the right.

Anchor A is the full canvas. Anchor B is the fixed same-pixel crop **(610, 430, 1260, 830)**. The compositing order is M5 environment, Adrian contact shadow, Adrian layer, desk foreground mask, then later reviewed state props.

## Proof artifacts

- [Plain mannequin plate](../../art/staging/opening/adrian-m6-seated-working-mannequin-plain.png)
- [RGBA mannequin layer](../../art/staging/opening/adrian-m6-seated-working-mannequin-layer.png)
- [Anchor A composite proof](../../art/staging/opening/adrian-m6-seated-working-anchor-a-proof.png)
- [Anchor B composite proof](../../art/staging/opening/adrian-m6-seated-working-anchor-b-proof.png)
- [Registration board](../../art/staging/opening/adrian-m6-seated-working-registration-board.png)

## Future provider rule — do not execute

The future provider receives **no M5 image, office crop, desk, chair, office reference, or other environment image**. It receives the character-only prompt in the [machine receipt](../../art/staging/opening/adrian-m6-character-only-pose-package.json) and must return Adrian alone over a simple flat neutral backing with an isolated contact shadow. Local deterministic compositing is the only way that result reaches M5.

No paid generation, production promotion, runtime binding, manifest integration, commit, or push occurred in M6.
