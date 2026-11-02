# Numbers, sources and invented content

Every repo that published figures found at least one its own sources got wrong.
The fix each time was the same: derive the number, cite the row, and leave a gap
visible rather than fill it.

Tags: `data`, `sources`

## Derive, don't type

1. **Never type a number that a model or table can compute.** [TLWR, PW2, PS, DQ]
   TLWR's spec, a 49-claim fact-check and the design all said the cyclist takes
   84 days; the model said 83.49. PW2 reads every count from `derive.js`, PS from
   `computeSiteStats`, and DQ fails the build on an unknown stat id.
2. **One mapping, many readers: derived output gets one code path.** [PW2, PS, LCC]
   PW2's `archive.js` feeds page, tests, share card and film. PS's "Ghangad Fort
   Fort" came from a second path that lacked the first path's guard. LCC tests
   that seed and publish derive the same rows.
3. **Prose numbers are claims; check them against the tables.** [VT] VT's press
   release said 12,000 km walked and its own table said 251.29 km. Press species
   counts for one year read 111, 120+ and 135.
4. **Check a methodology claim against all of the data, not a sample.** [RF] RF's
   "derived from Daniels' formulas" did not hold when the public equations were
   run over all 21 rows.
5. **Diff two copies of the same data before choosing one.** [RF] RF's CSV export
   quietly shortened 14 entries the HTML kept, and "three source files" turned
   out to be one existing table plus extra columns.
6. **Same unit is not same measure.** [RF] A 55 km race drawn on a weekly-kilometres
   line reads as a week you have to run.

## Never invent; show the gap

7. **Never publish invented content. An unconfirmed fact is `[TBD]`, and the
   release check refuses it.** [YF, 45D, VC, DQ] Prototypes carried a UPI id, a
   testimonial and sample team rows (YF) and a sample reader on Day 12 (45-days).
   VC renders unverified links as plain text. DQ keeps archive fields null until
   the archiving script fills them, and removed a footer claiming every source
   was archived.
8. **An empty state is safer than a plausible one; a stat with no value is
   omitted, never shown as 0.**
9. **Label evidence at the data level.** [GB, RS] Ghat Batteries gives every row
   an evidence class (documented, official claim, allegation), so copy can't
   upgrade an allegation. It shows three disagreeing tree counts, labelled, and
   treats the 15,510 gap as the finding. Reelsmith labels illustrative data
   "Example data" on screen.
10. **Show a missing record as a finding.** [MF, E20, TLWR] Museum of Failures
    draws six of twelve exhibits as outlines because their record is withheld.
    E20 lists nine citation gaps on its sources page. TLWR flags two unverified
    figures where they appear.

## Quotes and strings

11. **Quotes move by script and are looked up by fragment, never retyped.**
    [45D, ATF, PW2] A script confirmed 40 of 45 quotes verbatim in 45-days and 11
    of 12 in ATF; the differing words went to the owner to confirm. PW2 fails a
    test if a quoted fragment disappears from the archive.
12. **Trim hand-typed strings once, at the view layer.** [PS, 45D] Trailing spaces
    from the admin reached JSON-LD, meta tags and llms files. 45-days trims every
    string in the schema and lets templates add spacing.

## Sources and originals

13. **Prefer primary documents, and cross-check secondary tables.** [GB, E20, VT]
    Government portals return 503 to cloud requests. A trusted annual table
    misassigned a developer, a status site was contradicted by the clearance PDF,
    and newspaper clippings mislabelled birds.
14. **Keep the largest original and resize once.** [VT] A 13 MB JPEG and a RAW
    file became 2,400 px masters; the repo stayed at 24 MB.
15. **When the published rule and the practice disagree, ask.** [VT] VT's top
    scorer did not win Best Checklist, because of an unwritten eligibility rule.
