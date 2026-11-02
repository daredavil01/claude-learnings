# Where the repos disagree

Most of these are project choices, not errors. Default: defer to the repo's
`CLAUDE.md`. When it says nothing, use the **Skill default** column.

| Topic | One position | The other | Skill default |
| --- | --- | --- | --- |
| Where to commit | Directly on `main`, approved 2026-10-18 (ATF, 45D) | A long-running branch behind a flag, pushed but never merged by Claude (PS Atlas); session branches elsewhere | Follow the repo's CLAUDE.md; default to a branch when it says nothing. |
| Commit size | One commit per deliverable (ATF) | One commit per phase (45D, 2026-10-19); "the boundary you'd roll back to" (YF, RF) | Defer to the repo; the shared rule is "commit and push at a rollback boundary". |
| Design gates | Never self-approve; build, show, wait (ATF, 45D) | Once the pattern was proven, later phases committed with no gate (PS Atlas) | Gate the first instance of a pattern; record when the owner waives later gates. |
| Digits in Marathi | Latin digits everywhere, by requirement (YF) | Devanagari digits on Marathi pages (VT) | Neither is a rule; check the locale's output against the project's requirement. |
| A test suite | "There is no test suite" listed as an accepted blind spot (YF) | No longer accepted as of cms-site-planner 0.2.0; LCC tests every rule that protects patients | The newer position: rules that protect people have tests. |
| Lighthouse as a gate | A deploy gate at ≥ 95 (E20's original plan) | Performance warns, accessibility blocks, byte budgets gate (E20 ADR-011); ±5 run to run (VT) | Gate on deterministic checks (axe, byte budgets); report Lighthouse. |
| Changelog shape | Keep a Changelog with `[Unreleased]` (ATF, 45D, YF) | Public, reader-facing entries (RF); a staging buffer published to a database (PS); dated entries (DQ, LH) | Don't impose a format; check the invariants (a release adds a heading, headings parse). |
| Lessons format | Trigger / Learning / Rule / Promoted (YF, RF, CMS) | Rules index plus log (ATF, 45D); per-phase bullets (LCC); essays (TLWR); dated bullets (GB, VT, LH) | The shared format in `templates/LEARNINGS.md`, with a Tags line. Existing entries stay; new ones use the shared format. |
