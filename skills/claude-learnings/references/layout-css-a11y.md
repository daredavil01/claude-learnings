# Layout, CSS, first paint, accessibility and motion

No unit test in these repos can see a layout. Every layout bug here was found by
looking at the page at a phone width. Accessibility was a constraint from the
first commit in most repos, and the bugs that slipped through were specific and
repeatable.

Tags: `layout`, `css`, `a11y`, `motion`, `performance`

## Look at it

1. **Look at every new screen at 375 px and at desktop width, and compare
   `document.documentElement.scrollWidth` with the viewport.** [RF, LCC] RF
   shipped three overflow bugs that were invisible at desktop width. LCC found a
   761 px page from a hidden table cell, a 1,076 px page from a long URL in
   wrapped text (an element scan missed it), and 40 px of overflow from a fixed
   three-column grid.
2. **Measure reflow in a narrow desktop window, never under mobile emulation.**
   Emulated phones zoom out to fit wide content, so the overflow disappears from
   the measurement. Measure the header at 320, 390, 900, 1000 and 1100 px.
3. **Verify a change to how something renders with pixels or computed style, not
   by diffing text.** [YF] Seven phases of text checks missed YF's home-page
   heading rendered 18 px dark green on dark green, because a scoped-style
   attribute was not forwarded.
4. **Measure layout, don't guess it.** [TLWR, LCC] TLWR's `clamp()` card position
   ran into the controls once copy wrapped at 360×640. A `position: fixed` menu in
   LCC was trapped by its header's stacking context.

## Cascade

5. **Keep a base rule and its media-query override at the same specificity.**
   [RF] `.kw-cal td` (0,1,1) beat `.kw-cell` (0,1,0) at every width, so the month
   grid never became a grid.
6. **Import every stylesheet from one place, in cascade order.** [ATF, VT] A
   page-level import was linked before the layout CSS, so `.button` beat
   `.button-small`. Tailwind orders `inline-flex` after `hidden`, so a hidden
   component stayed visible.

## First paint and fonts

7. **Nothing a script fills in may appear after the first paint.** [45D, LCC, E20]
   CLS 0.10 on desktop from elements unhidden by script (45-days); 0.6–0.9 on
   translated LCC pages, which hid the text but not its boxes; 0.475 from a
   footer under script-rendered content; 0.269 in E20 from a modal reflowing
   under the font swap. Set state in an inline head script before paint.
8. **Self-host fonts and preload only the styles in use.** [LCC, E20] LCC's font
   loader preloaded unused italics (about 335 KB); removing them took LCP from
   3.4 s to 2.0–2.4 s. E20 ships 11.35 KB of Cyrillic, Greek and Vietnamese
   `@font-face` blocks, 35% of its render-blocking CSS.
9. **Lazy images move anchor targets.** A `#section` link lands right only if the
   images above it have loaded; give anchors `scroll-margin-top` under a sticky
   bar.

## Responsive strategy

10. **Scale one layout rather than maintain two size sets.** [VC, PS] VC's
    separate phone type scale clipped 4 of 20 face and theme combinations;
    scaling one layout made overflow impossible. PS draws Logbook figures at
    their real pixel width and uses container queries because the sidebar makes
    viewport breakpoints lie.

## Canvas, SVG, print

11. **Canvas and floating-point traps.** [TLWR, RF]
    - Canvas arcs lose precision at a 3×10⁸ px radius; compute geometry in
      doubles.
    - `4.37789 × 1000 !== 4377.89`, so float equality on a value from a URL is a
      bug.
    - CSS `transform-origin` re-anchors an SVG `rotate()`; draw diamonds as
      polygons.
12. **A closed `<details>` cannot be opened from CSS for print.** Use
    `beforeprint`/`afterprint`, and decide what prints without script.

## Accessibility and motion

13. **Check every UI change in both themes and with reduced motion.** [MF, TLWR]
    The design canvases only showed the light theme. Reduced motion means instant
    moves, not a missing feature: the Museum's camera teleports and TLWR's
    milestones jump.
14. **A design colour is a proposal until the contrast check agrees.** [LCC, PW2]
    "Lighten by 20%" gave 4.0–4.6:1 on dark cards; it took 40% to reach
    6.0–7.4:1. An LCC status chip measured 4.1:1. Tailwind `text-ink/60` fails AA
    where `/70` passes. PW2 keeps its saffron for fills and large type only.
15. **Colour never carries meaning alone.** [TLWR] TLWR's yellow and pink converge
    for red-green colour-blind viewers, so the palette passed only on condition of
    shape encoding (dots, dashes, line). When a review says "passes, conditional
    on X", X is a constraint.
16. **Structural landmarks need a source that cannot be empty.** [YF] An unseeded
    content field removed YF's home-page `<h1>`; check the document outline per
    route.
17. **Native controls carry rules a validator knows.** [LCC, YF]
    - `role="switch"` only on `type="button"`.
    - A label holds one control; chips inside a label join the accessible name.
    - `aria-disabled` keeps focus where `disabled` drops it to the page body.
    - Esc in a non-empty search field clears it, and the dialog never closes.
    - An input named only by its placeholder has no name.
18. **Let deterministic accessibility checks block; let noisy performance scores
    warn.** [E20, VT] The same page on the same commit scored 0.82 and 0.97. E20
    blocks on axe-core and on byte budgets instead.
19. **Derive state from the device instead of shipping demo toggles.** [TLWR, MF]
    Reduced motion, device tier and embed mode are detected, with a URL flag to
    force the low path for testing.
