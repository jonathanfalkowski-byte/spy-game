# Harbour two-character composite V2 — review
Date: 2026-09-17. Reviewer: Codex visual inspection against EVE Art Bible v1.0 and ART_REVIEW_CHECKLIST.
Decision: **PASS — STAGING, human approval required**. Not promoted; not a new canonical identity reference.

## Asset and generation
- Composite: C5-HARBOUR-EVELYNN-JULIAN-COMPOSITE-V2.
- Shot: c05.s06.shot12-entrance; Chapter 5 Harbour outside conversation after Julian arrives.
- Branch: revision16; event attend; professional wardrobe; Julian access; coffee attention; Julian present/not departed; one coffee held by Evelynn; no contact.
- Generated asset: C5-HARBOUR-JULIAN-LAYER-V1; one output, no retries.
- Tool/model: ZenCreator image_editor / SEEDREAM_5.
- Generation/task ID: 2eb43972-fa55-49e0-826b-aea7fb68b542.
- Call ID: 871c8a52-aa4c-4fe0-a8c7-58a4b7932ff9.
- Provider asset ID: 9456dc7e-0933-41d3-8cc5-8059b5db960e.
- Original format: PNG, 1536x2048.
- Live quote/actual cost: 1/1 credit; observed balance710 →709; pilot12 →13.
- References: Wave2 v1 pose/composition UUID f6b8541e-b617-4200-92f3-b8f243fd7d8e; approved Julian identity UUID2152077c-4772-4642-94a1-c092ae9881a9. Exact payload and provider response in GENERATION_RECEIPT.json.

## Julian layer — PASS with LOW/POLISH
Recognizable mature Julian: angular nose/jaw/brow, swept dark/silver hair and adult age49 appearance compatible with approved reference. Illustration/cel shading maintained. Dark suit, shirt/tie, black footwear; left-facing standing profile, relaxed arms, both hands and complete head/feet present. No other person, coffee, props or architecture.

The newly generated face and hands have minor line/rendering variation compared with Wave2, without significant identity, age, pose or wardrobe drift. It is an illustration-derived layer, not an exact pixel copy of the former Julian. Authority stays with the approved identity reference.

Extraction removed white backing and head/neck wedges; local alpha-only cleanup preserved every RGB channel before placement resampling. Near-white enclosed pixels removed and one source-pixel erosion used. Tiny hair-strand/footwear-highlight alpha details at the isolated layer's native magnification are LOW/POLISH: they do not form a visible residue wedge or objectionable halo in the full composite/game sizes. Warm edge line retained as generated contour lighting, not repainted. No generative cleanup.

## Calibration and visual checks
Uniform normalization0.33085896076352067 maps the visible figure to131x624 inside the prior158x628 layer canvas. Previous silhouette was135x624: width difference comes from the new drawing, not nonuniform distortion. Head/floor anchors and silhouette horizontal center preserved; x597,y277,scale0.8,top-left,z30 unchanged. Evelynn x366.6,y299.4,scale0.8 unchanged. Same exterior landing, through the existing entrance panes; door mullion remains between figures in this camera view.

- Harbour: PASS. Exact original architecture, tile material/pattern, glazing, geography, lights and camera; no recoloring or relighting.
- Evelynn: PASS, inherited usable layer unchanged byte-for-byte, including face, outfit, pose and the single coffee. No jewelry propagation or additional prop.
- Julian: PASS. Head/neck matte defect resolved; scale and left-facing perspective compatible with existing placement. Full shoe/floor contact retained. Lighting fits evening palette; contour light is restrained at game size.
- Composition: PASS. Conversational distance maintained; no contact/intimacy/action added, no departure or future props.
- Full resolution1920x1080 and 2x detail crop: PASS with tiny edge LOW/POLISH notes above.
- Desktop: actual game CSS yields880x495 at1920 viewport and896x504 at1440; PASS, no visible head/neck wedge.
- Mobile: actual game CSS yields350x196.875 at390 viewport; PASS for staging readability/edge review. Faces are naturally small at this scale; identity assessment relies on full resolution. No claim of detailed facial readability on mobile.

## Objective verification
- Uncovered background pixels: 2,000,981; changed: **0**.
- Pixels outside Julian's unchanged126x502 placement canvas: 2,010,348; changed versus V1: **0**.
- Original background and Evelynn/coffee hashes unchanged.
- Repeated deterministic render: identical SHA256.
- Composite SHA256: 2feac8b2944917f6bd99254eee0328dc36043a3d2c977beb9c7672bb139e55d7.
See VERIFICATION.json, EXTRACTION_NORMALIZATION.json and game-size-measurements.json.

## Gate
PASS is technical/visual review only. Human approval of the combined master remains pending. All new assets stay STAGING. No Julian-leaves image, promotion, extra generation, runtime/story edits, revision16 changes, Chapter6 or Git commit/push performed. Existing apartment promotion remains valid and uncommitted.
