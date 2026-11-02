# Design handoffs

Most of these builds began from a Claude Design export or a working prototype, and
the same handful of lessons came up each time.

Tags: `design-handoff`

1. **A design export is a self-unpacking bundle; decode it before reinterpreting
   the spec.** [TLWR, ATF, 45D, MF] TLWR's 607 KB file had 395 lines, and two of
   them held 98% of the bytes. The canvases ran 2.3–5.2 MB in about 590 lines. The
   Museum's logo board was a 760 KB nested bundle. Find the long lines first
   (`awk '{ print length, NR }' file | sort -rn | head`), decode them, then read.
2. **Port the logic and structure, never the runtime.** `support.js` and the
   `DCLogic` classes are Claude Design's runtime; rebuild them as tokens,
   templates and modules.
3. **Take structure, layout and colour from a prototype, and nothing about how it
   loads assets.** [YF] YF's prototype linked Google Fonts and requested a family
   it never used. Self-host what is actually used.
4. **A design's sample values never ship.** [YF, 45D, LCC, BK] A sample UPI id and
   testimonial (YF), a sample reader's progress (45-days), sample phone numbers,
   hours and fees (LCC). Brand Kit's QA checklist started fully ticked, so "Ready
   to post" showed before anything was checked. Replace with `[TBD]` and let the
   release check refuse it.
5. **Extract content by script, then prove parity.** [BK, DQ] Brand Kit matched 273
   of 273 prompts against the design file. DQ keeps its markup close to the export
   so later revisions can be diffed and ported.
6. **DesignSync needs an interactive `/design-login` and reads only design-system
   projects.** [LH, DQ, TLWR] Unattended sessions should work from exported files
   in the repo.
7. **Get a cheap approval before expensive work.** [PS, RS, ATF, 45D] A concept
   board before any biome art (PS), stills before a render (Reelsmith), design
   gates that are shown and never self-approved (ATF, 45-days). See
   `disagreements.md` → Design gates.
8. **The brief and the canvases disagree in small ways; log each one in a table
   with its resolution.** [DQ] DQ lists eight figures in the design copy that are
   not in its verified table, and fixed the design's "21th" and "22th".
9. **Canvases show the light theme only.** Check dark theme and reduced motion
   yourself (`layout-css-a11y.md` §13).
10. **Read the design before choosing the stack.** [LH, VC] See
    `collaboration.md` §11.
