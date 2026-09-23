# Art job 2 — restyle the street master into the house style (2026-09-23)

Owner decision: noir flat-cel is the only house style, daylight included. See the
"House style decision" section of `docs/art/EVE_STYLE_LOCK.md`.

1. **Restyle the master.** `image_editor`, `SEEDREAM_5`, 16:9, width 1920, 2 images.
   - Image 1: shopping street master `17823367-7746-412b-9929-c0c5bef781bd`.
   - Image 2: sloane-brief `fb163e61-b577-4f68-a6c3-24ab85c7ba38`.
   - Prompt: `Redraw image 1 in exactly the rendering style of image 2:` + the locked style string + the daylight palette line from the lock. Keep the geometry, shopfronts, window display (blouse and clasp), lamp post and street perspective exactly. Add no people.
   - Stage as `c5-s02-street-master-noir-v1-{a,b}-candidate.png` with records. Do not overwrite production.
2. **QA it** against the lock gate, with particular attention to style (ink lines, hard cel shadows, no wash texture) and geometry drift from the original. Pick one.
3. **Rerun the Evelynn pilot** on the picked restyled master (upload it if it has no asset id yet) plus Evelynn `46090cef-b081-49ab-aa26-cc2c52f94284`, 2 images. From pilot A/B: say `no earrings, no jewellery`, and have her look at the window display. Make her a clear medium figure rather than a distant one if the `spend` staging allows.
4. Put the original master, the noir master and the best new pilot into one comparison image with `sloane-brief` for the owner. Stop and report. Expected cost about 4 credits; show the estimate first.
