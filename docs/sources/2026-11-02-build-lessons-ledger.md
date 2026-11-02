Consolidated report · compiled 2 November 2026

# Build Lessons Ledger

What nineteen of Sanket's repositories recorded about building them, merged into one place, grouped by theme and tagged by project. It is written as the groundwork for a Claude skill: which lessons recur, which belong to one stack, where repos disagree, and how the skill could be shaped.

**19** repositories read (read-only) **10** with a learnings file · **2,336** lines · **38,434** words **\~360** recorded entries **–** consolidated lessons below **–** themes

## What the ledger shows

1. **The same lessons were learned over and over.** – of the – themes below have lessons from five or more repositories. The widest are numbers and sources, proving that something works, and layout. These are the rules a skill should carry everywhere.
2. **Several bugs were learned a second time in another repo.** A lockfile written by npm 11 failing `npm ci` on Cloudflare's npm 10 (three times, two repos), `pkill -f` killing its own shell, the UTC day boundary in India, TypeScript 7 being too new, PostgREST's 1,000-row cap. Each fix sat in one repo's learnings file, where the next project never looked.
3. **Lessons that were carried forward did not recur.** 45-days imported After the Feed's lessons on day one (the test harness builds before it previews, share images must be raster). Its log has no entry for either problem.
4. **A skill built this way already exists.** `cms-site-planner` turned the lessons from three of these repos into a plugin of rules stated as Rule · Why · Evidence. It is a planning tool for CMS sites only. Nothing covers the shell traps, design handoffs, data stories, video or the lessons loop itself.
5. **Nine repos have no learnings file.** Their lessons live in a 63 KB CLAUDE.md (personal-site), architecture decision records, audits, status logs and READMEs. "Everything" mode found them there.

## Sources

Every repository was read in place and nothing was changed. The ten learnings files were read in full; for the other nine, the lessons were taken from CLAUDE.md "why" notes, docs, status files and changelogs.

| Code | Repository · what it is | Learnings file | Format · where else lessons live |
| --- | --- | --- | --- |
| YF | yung-foundation-website · NGO site, Astro SSR + Supabase | `lessons.md` 68 KB, 37 entries | Trigger / Learning / Rule / Promoted, split Collaboration vs Technical. Rules promoted into CLAUDE.md. |
| LCC | low-cost-clinick · clinic site and admin, Workers + D1 + R2 + Hono | `learnings.md` 51 KB, 186 bullets | One section per phase, bold-lead bullets. "Never overrides the docs." |
| 45D | 45-days · daily reading series, Astro on Cloudflare Pages | `LEARNINGS.md` 37 KB, 21 rules + 15 log | Part 1 numbered rules, each linked to a Part 2 log entry. |
| ATF | after-the-feed · interactive story (sister of 45-days) | `LEARNINGS.md` 25 KB, 22 rules + 14 log | Same two-part format as 45-days. |
| RF | run-folio · runners' race portfolio, Astro SSR + Supabase + Strava | `lessons.md` 26 KB, 22 entries | Trigger / Learning / Rule / Promoted (YF's template). |
| TLWR | the-long-way-around · scrollytelling, Vite + React canvas | `LESSONS.md` 13 KB, 20 lessons | Numbered short essays, ordered by time saved or cost. |
| PW2 | personal-webaite-v2 · voice-first personal site | `learnings.md` 6.6 KB, 18 (10 build) | Source for a deck and film: life lessons from the archive, then build lessons. |
| GB | ghat-batteries · pumped-storage data story | `LEARNINGS.md` 4.7 KB, 22 bullets | Newest first; Editorial / Sources / Technical. |
| VT | vtbm · bird-count event site | `learnings.md` 4 KB, 24 bullets | Data / Assets / Build / Tooling. |
| LH | learning-hub · 60-day plan tracker | `docs/lessons.md` 2.5 KB, 11 bullets | Dated bullets: what happened, what to do next time. |
| PS | personal-site · sankettambare.in | none | CLAUDE.md (63 KB) records most decisions with their failure; `docs/` agent and security audits, Atlas build log, OG cards. |
| CMS | cms-site-planner · Claude Code plugin | template only | A skill already distilled from YF, RF and LCC; README, CHANGELOG, rule references. |
| D01 | daredavil01 · profile repo and Day Island homepage | none | CLAUDE.md / AGENTS.md conventions; build decks. |
| RS | reelsmoth · Remotion video studio | none | CLAUDE.md, `docs/playbook.md`, a verification pass over the playbook. |
| E20 | e20-ka-chakravyuha · ethanol and sugar data story | none | Architecture decision records, maintenance doc. |
| DQ | the-divident-question · youth dividend data story | none (STATUS names one) | CLAUDE.md data rules; STATUS open data questions. |
| VC | visiting-card · 3D visiting card | none | status.md decision log and known gaps. |
| BK | brand-kit · brand kit and prompt engine | none | `feature.md` technical decisions and checks. |
| MF | museum-of-failures · civic museum site | none | README audit and design notes. |

## Where each theme shows up

A filled dot means the repo recorded at least one lesson in that theme. The grid is computed from the project tags on the lessons below, so the two can't disagree. Underlined codes have a learnings file. Choose a code to show only that repo's lessons.

## Themes

Tier

Project

**Core**: applies to any project. **Stack**: Cloudflare, Supabase, D1 or Astro specifics. **Domain**: data stories, languages, design handoffs, video, AI features.

## Proving it works

The most repeated lesson in the ledger: a check that has never failed has not been tested, and only the built artefact on the real runtime proves what ships.

1. **Every guard gets a positive control: break the thing once and watch the check fire.** YF checked its secret-scan regex against real output (supabase-js ships the literal `sb_secret_`). ATF's fake-clock test still passed with the guard removed. 45-days' calendar test expected `'\;'`, which is just `';'`, so it passed vacuously. Ghat Batteries ships a test proving each integrity rule fires.
2. **Point every health check at a deliberately broken configuration.** Two YF checks reported ok against a broken environment: `getUser()` returns early without a network call when there is no cookie, and a HEAD count hid the "table does not exist" error because it asked for no body.
3. **Test the built artefact on the deploy runtime, not the source on the dev server.** YF's impact counter shipped as a syntax error through `is:inline` while its fixture passed. An LCC Worker exported a constant: every Node test passed and workerd refused to start. PS's share-card renderer worked under `wrangler pages dev`, which does not enforce the 10 ms CPU limit, and failed with error 1102 in production.
4. **A test harness must build what it tests.** A Playwright suite reported green against a stale `dist/` because the preview server serves whatever is there. Both sister projects build before previewing from day one.
5. **A gate that never ran is not a gate.** E20's "Lighthouse ≥ 95" deploy gate sat behind a CI step where Chromium failed to launch. Its first real run scored 0.70–0.89.
6. **Test the deploy configuration itself, and read what the deploy printed.** LCC's admin `SITE_URL` pointed at the admin, and `ALERT_FROM` was a Gmail address for two phases. Every test passed because tests set their own environment.
7. **A green assertion over an empty table is a smoke test, and the output should say so.** YF's access probe reported 19/19, and six of those assertions ran over tables with no rows.
8. **Exercise both branches of every conditional block.** Nine YF blocks had only ever been seen in their "absent" state. A 40-line PostgREST stand-in with an empty/full switch proved all eleven gates flip.
9. **Small fakes are cheap. Say which layer each one replaces.** 40 lines of fake Supabase rendered RF's whole dashboard. YF's stub recorded request bodies to prove an empty string is never stored. LCC ran its Hono admin inside Playwright through `context.route`. None of them proves the database's access rules.
10. **Prefer a test the database rolls back for you.** A probe that needed manual cleanup left rows in a staff inbox. YF switched to inserts that fail a foreign-key check, and runs each migration inside `begin; … rollback;` before pushing it.
11. **Repeat new browser tests before trusting them.** `--repeat-each=3` exposed three races that one green run hid. Playwright's `clock.install()` lets time flow unless paused. LCC's `Promise.all` of three bookings was a real race against the database.
12. **Detect a reload with something a reload destroys.** Playwright counts `history.replaceState` as a navigation; RF sets a marker on `window` instead.
13. **Run a threshold against known-good data before shipping it.** RF's "more than 10% above last week" flag fired on five well-designed weeks per distance. The rule is about the peak so far, not adjacent weeks.
14. **Turn the spec's own tables into tests, and keep hand-written values as fixtures.** TLWR wrote the spec's HUD values into `expect()` calls before any UI. RF kept 30 hand-written date strings as the fixture for the formatter that replaced them. Brand Kit proved 273 of 273 generated prompts match the design file.
15. **For anything that changes over time, review rendered frames, not code.** Reelsmith renders stills before motion (four PNGs take a minute, a render twenty), then a contact sheet per beat scored 1–10. TLWR: screenshot the last frame, not only the first; half the rings were missing at 40,075 km.
16. **Assert on the element or the request, never on a string that can appear elsewhere.** An LCC test matched an attribute name inside an inlined language script. YF asserts on recorded request bodies, not on the form.
17. **Test date- and flag-dependent behaviour by moving the input, never by waiting.** VT moved the date, built and grepped `dist/`. 45-days seeds saved state and mocks the clock.
18. **When the real dependency is unreachable, test what holds because it is unreachable, and name the rest as unverified.** YF proved its admin gate fails closed while the auth server was blocked, and listed the signed-in path as untested.

## Numbers, sources and invented content

Every repo that published figures found at least one its own sources got wrong. The fix each time was the same: derive the number, cite the row, and leave a gap visible rather than fill it.

1. **Never type a number that a model or table can compute.** TLWR's spec, a 49-claim fact-check and the design all said the cyclist takes 84 days; the model said 83.49. PW2 reads every count from `derive.js`, PS from `computeSiteStats`, and DQ fails the build on an unknown stat id.
2. **Prose numbers are claims; check them against the tables.** VT's press release said 12,000 km walked and its own table said 251.29 km. Press species counts for one year read 111, 120+ and 135.
3. **Check a methodology claim against all of the data, not a sample.** RF's "derived from Daniels' formulas" did not hold when the public equations were run over all 21 rows.
4. **Diff two copies of the same data before choosing one.** RF's CSV export quietly shortened 14 entries the HTML kept, and "three source files" turned out to be one existing table plus extra columns.
5. **Never publish invented content. An unconfirmed fact is `[TBD]`, and the release check refuses it.** Prototypes carried a UPI id, a testimonial and sample team rows (YF) and a sample reader on Day 12 (45-days). VC renders unverified links as plain text. DQ keeps archive fields null until the archiving script fills them, and removed a footer claiming every source was archived.
6. **An empty state is safer than a plausible one; a stat with no value is omitted, never shown as 0.**
7. **Label evidence at the data level.** Ghat Batteries gives every row an evidence class (documented, official claim, allegation), so copy can't upgrade an allegation. It shows three disagreeing tree counts, labelled, and treats the 15,510 gap as the finding. Reelsmith labels illustrative data "Example data" on screen.
8. **Show a missing record as a finding.** Museum of Failures draws six of twelve exhibits as outlines because their record is withheld. E20 lists nine citation gaps on its sources page. TLWR flags two unverified figures where they appear.
9. **Quotes move by script and are looked up by fragment, never retyped.** A script confirmed 40 of 45 quotes verbatim in 45-days and 11 of 12 in ATF; the differing words went to Sanket to confirm. PW2 fails a test if a quoted fragment disappears from the archive.
10. **One mapping, many readers: derived output gets one code path.** PW2's `archive.js` feeds page, tests, share card and film. PS's "Ghangad Fort Fort" came from a second path that lacked the first path's guard. LCC tests that seed and publish derive the same rows.
11. **Same unit is not same measure.** A 55 km race drawn on a weekly-kilometres line reads as a week you have to run.
12. **Trim hand-typed strings once, at the view layer.** Trailing spaces from the admin reached JSON-LD, meta tags and llms files. 45-days trims every string in the schema and lets templates add spacing.
13. **Prefer primary documents, and cross-check secondary tables.** Government portals return 503 to cloud requests. A trusted annual table misassigned a developer, a status site was contradicted by the clearance PDF, and newspaper clippings mislabelled birds.
14. **Keep the largest original and resize once.** A 13 MB JPEG and a RAW file became 2,400 px masters; the repo stayed at 24 MB.
15. **When the published rule and the practice disagree, ask.** VT's top scorer did not win Best Checklist, because of an unwritten eligibility rule.

## Layout, CSS and first paint

No unit test in these repos can see a layout. Every layout bug here was found by looking at the page at a phone width.

1. **Look at every new screen at 375 px and at desktop width, and compare `document.documentElement.scrollWidth` with the viewport.** RF shipped three overflow bugs that were invisible at desktop width. LCC found a 761 px page from a hidden table cell, a 1,076 px page from a long URL in wrapped text (an element scan missed it), and 40 px of overflow from a fixed three-column grid.
2. **Verify a change to how something renders with pixels or computed style, not by diffing text.** Seven phases of text checks missed YF's home-page heading rendered 18 px dark green on dark green, because a scoped-style attribute was not forwarded.
3. **Keep a base rule and its media-query override at the same specificity.** RF's `.kw-cal td` (0,1,1) beat `.kw-cell` (0,1,0) at every width, so the month grid never became a grid.
4. **Import every stylesheet from one place, in cascade order.** A page-level import was linked before the layout CSS, so `.button` beat `.button-small`. Tailwind orders `inline-flex` after `hidden`, so a hidden component stayed visible.
5. **Measure reflow in a narrow desktop window, never under mobile emulation.** Emulated phones zoom out to fit wide content, so the overflow disappears from the measurement. Measure the header at 320, 390, 900, 1000 and 1100 px.
6. **Measure layout, don't guess it.** TLWR's `clamp()` card position ran into the controls once copy wrapped at 360×640. A `position: fixed` menu in LCC was trapped by its header's stacking context.
7. **Nothing a script fills in may appear after the first paint.** Layout shift (CLS) of 0.10 on desktop from elements unhidden by script (45-days); 0.6–0.9 on translated LCC pages, which hid the text but not its boxes; 0.475 from a footer under script-rendered content; 0.269 in E20 from a modal reflowing under the font swap. Set state in an inline head script before paint.
8. **Self-host fonts and preload only the styles in use.** LCC's font loader preloaded unused italics (about 335 KB); removing them took LCP from 3.4 s to 2.0–2.4 s. E20 ships 11.35 KB of Cyrillic, Greek and Vietnamese `@font-face` blocks, 35% of its render-blocking CSS.
9. **Lazy images move anchor targets.** A `#section` link lands right only if the images above it have loaded; give anchors `scroll-margin-top` under a sticky bar.
10. **Scale one layout rather than maintain two size sets.** VC's separate phone type scale clipped 4 of 20 face and theme combinations; scaling one layout made overflow impossible. PS draws Logbook figures at their real pixel width and uses container queries because the sidebar makes viewport breakpoints lie.
11. **Canvas and floating-point traps.** Canvas arcs lose precision at a 3×10⁸ px radius, so compute geometry in doubles. `4.37789 × 1000 !== 4377.89`, so float equality on a value from a URL is a bug. CSS `transform-origin` re-anchors an SVG `rotate()`, so draw diamonds as polygons.
12. **A closed `<details>` cannot be opened from CSS for print.** Use `beforeprint`/`afterprint`, and decide what prints without script.

## Working with Claude: questions, scope, sources

The costliest mistakes in these logs started before any code: a guessed reading of the request, or a document trusted over the repository.

1. **Ask when two readings lead to different work; decide when they lead to the same work.** YF's first brief forked three ways (scope, deliverable, design fidelity); three questions took one round trip. The Wanderer's Atlas redesign began from "ask everything, assume nothing".
2. **Lead with a recommendation and state its cost; never offer an option you would refuse to build.** All six of YF's setup questions were answered with the recommended option, so the recommendation carries the weight.
3. **Check a set of answers for contradictions before acting on them.** "One scroll page", "each chapter as a query parameter" and "read on load only" only fit once the whole plan was reshaped around them.
4. **For a vague request, investigate first; the investigation survives a change of mind.** "Modernize all the tools" (six tools, about 12,000 lines) was audited at 375 and 1280 px before any code. The request narrowed to a plan and widened again within the hour, and the plan became the build order. In Sanket's own words (PW2): "a set of vague instructions leads to a lot of messed up code".
5. **Before porting someone's own work, settle where it lives, whose voice it keeps and how long it lasts.** The technical shape followed from those four answers.
6. **Check what the repository contains before trusting a document that describes it.** YF's status file described a four-phase migration; the repository had no commits and no `package.json`.
7. **Keep an explicit authority order, and log every conflict with its resolution.** PLAN.md beats BUILD.md in ATF and 45-days (BUILD.md was written for another stack); the concept note wins for words and the canvas for layout. CLAUDE.md beats the plan in YF and RF. LCC's learnings "never override the docs".
8. **Adapt a rules file from another project instead of copying it; grep the result for the old project's names.** YF's inherited CLAUDE.md named the wrong district and a migration file that would never exist. cms-site-planner writes all evidence generically for this reason.
9. **When two sources disagree, split the expensive-to-reverse decision from the cheap one.** YF built the spec's schema and shipped the design's narrower admin screen, instead of averaging them.
10. **Read the design before choosing the stack.** Learning Hub chose a docs framework before seeing a 12-screen app design, then dropped it. VC ported a finished CSS-3D prototype instead of spending weeks rebuilding it in React Three Fiber.
11. **Another session may be working in the same repo.** A second Claude Code session had already landed most of the Atlas mobile fix. LCC found a config file rewritten mid-session and another session's dev server holding the port. Check `git status` for files you did not touch.
12. **Precise, scoped feedback produces precise changes.** "Fix only mobile view… no change for desktop" became a one-token edit.

## Accessibility and motion

Accessibility was a constraint from the first commit in most of these repos, and the bugs that slipped through were specific and repeatable.

1. **Check every UI change in both themes and with reduced motion.** The design canvases only showed the light theme. Reduced motion means instant moves, not a missing feature: the Museum's camera teleports and TLWR's milestones jump.
2. **A design colour is a proposal until the contrast check agrees.** "Lighten by 20%" gave 4.0–4.6:1 on dark cards, and it took 40% to reach 6.0–7.4:1. An LCC status chip measured 4.1:1. Tailwind `text-ink/60` fails AA where `/70` passes. PW2 keeps its saffron for fills and large type only.
3. **Colour never carries meaning alone.** TLWR's yellow and pink converge for red-green colour-blind viewers, so the palette passed only on condition of shape encoding (dots, dashes, line). When a review says "passes, conditional on X", X is a constraint.
4. **Structural landmarks need a source that cannot be empty.** An unseeded content field removed YF's home-page `<h1>`; check the document outline per route.
5. **Native controls carry rules a validator knows.** `role="switch"` only on `type="button"`; a label holds one control; chips inside a label join the accessible name; `aria-disabled` keeps focus where `disabled` drops it to the page body; Esc in a non-empty search field clears it and the dialog never closes; an input named only by its placeholder has no name.
6. **Let deterministic accessibility checks block; let noisy performance scores warn.** The same page on the same commit scored 0.82 and 0.97. E20 blocks on axe-core and on byte budgets instead.

## Dates, time zones and languages

These sites serve readers in India (UTC+05:30), several in Marathi, Hindi or Kannada. Time zones and scripts produced bugs in most of them.

1. **Count calendar days in the reader's zone; never compare dates through UTC strings.** UTC strings put a 45-days reader on the wrong day for five and a half hours. VT showed today's birds as "yesterday" after 5:30 PM IST.
2. **A relative word in generated text is a claim about when it will be read.** RF's "Today's Plan" was false at the moment people post it, the night before. LCC's "Sends at 6:00 pm" read wrong at 9 pm. Check such screens after their time as well as before.
3. **Write dates unambiguously.** Agents read "09-08-2026" as 8 September; the fix was "9 August 2026".
4. **Anything that depends on the visitor's device or time zone renders after hydration.** Server and client must produce the same HTML first.
5. **A locale is not a specification.** `Intl` with `mr-IN` prints Devanagari digits. YF's requirement is Latin digits everywhere; VT wanted Devanagari digits on Marathi pages. Check what the formatter emits against each project's requirement.
6. **Review both language variants of a field together.** YF's prototype gave the founding year as 2010 in Marathi and 2016 in English, in the same sentence.
7. **Form size caps must count encoded bytes.** URL-encoded Indic text costs about 9 characters per letter, so a 4 KB cap refused a 500-letter Hindi comment. The cap is now 16 KB.
8. **Test every language swap with pseudo-translations.** Prefix each string (`हिं·`, `ಕನ·`, `मरा·`) and flag visible text without the prefix. Fallback text needs fallback dates, or a Marathi reader gets English words with Marathi dates.
9. **A second script's font is a content budget, not a CSS budget.** YF's English pages carry 29,364 B of font only while no Devanagari glyphs appear in the content; re-measure when content changes. PS's card renderer (satori 0.32) can't shape Devanagari conjuncts.
10. **Write narration for the ear separately.** Years are spelled as spoken and sentences shortened, and the numbers still come from the data. The deep archive once answered an English question in Marathi.

## Dependencies, toolchain and dev servers

The lockfile lesson was learned three times in two repos, and promoted to a rule only after the second time in the same repo.

1. **Touch the lockfile only when `package.json` changed, and write it with the npm that CI uses.** Cloudflare's build runs npm 10.9.2; a lockfile written by npm 11 on Windows failed `npm ci` there three times across two repos. Prove it with `npx npm@10.9.2 ci --dry-run`.
2. **"Latest" is not a version: read `peerDependencies` before pinning.** TypeScript 7 broke `@astrojs/check` and typescript-eslint in two repos; npm also paired eslint-plugin-astro 1.7 with ESLint 10.
3. **Pin exact versions at least 14 days old, including every peer npm would install for you.** Astro 7.3.6 to 7.4.0 were all under 14 days old. npm 10 installed playwright-core 1.64.1, four days old, beside the test runner's 1.63.0, and type checks failed.
4. **Pin the build's Node version.** VT's Cloudflare Pages build failed on Node 22.16 because Astro 7 needs 22.23.4 or later; `.node-version` and `engines` fixed it.
5. **Pin one engine and record why.** Reelsmith pins Remotion so Claude stops switching between Remotion and Python from run to run, and bumps every `@remotion/*` package together. PS pins satori 0.32.0 for a recorded reason.
6. **Expect the first dev start after an install, a type check or a build to fail, and start it again before debugging.** Vite's optimiser leaves workerd pointing at a stale chunk. Never run `astro check` or `prettier --write` under a running dev server.
7. **Stop a server before rebuilding what it serves.** `wrangler dev` served 404s and 500s after `dist/` was rebuilt under it, twice. `astro preview` keeps a lock, and a second one exits quietly (`--ignore-lock`). On Windows, stop the dev server before `npm ci`.
8. **Generated Worker types have side effects.** `wrangler types` reads `.dev.vars`, writes literal types for variables and merges into the DOM's `Element`. Keep Worker code in its own tsconfig and move `.dev.vars` aside first.
9. **In Astro, a prop named `as` silently turned off type checking for a component.** `astro check` stayed green over 26 unchecked call sites. Prove the binding with a deliberate type error.

## The agent's own environment

These are traps in how Claude runs commands, not in any project. They recur because no project repo carries them to the next one, which makes them the clearest case for a shared skill.

1. **Never `pkill -f` a pattern that appears in your own command.** It matches the shell running it and kills it (exit 144). Use `pkill -f "[v]ite"` or find the PID with `ps aux | grep [v]ite`.
2. **A hang with no output is a network trap, not a slow install.** npm sat silent for 15 minutes; the registry answered 503 in 5 seconds because it was listed in `no_proxy`. Test the transport before the tool.
3. **Back files up before breaking them on purpose; never restore with `git checkout` while work is uncommitted.** It restored the last commit and threw away a phase's edits to three files.
4. **Read `git status` before `git add -A`.** An unset variable sent screenshots into a literal `undefined/` directory, which got staged.
5. **Write edit scripts with the Write tool and run them from a file, never through shell heredocs.** Heredocs with backticks and `${}` broke LCC's edit scripts in five separate phases. `cat > file` with no input hung until timeout. A Python-written `\b` became a backspace in a JavaScript regex.
6. **Keep line endings and encodings.** Python on Windows wrote CRLF and read cp1252, and `core.autocrlf` rewrote a seed until a derived-text test failed. PowerShell mangles Marathi. `python -I` ignores `PYTHONIOENCODING`; use `-X utf8`.
7. **Use the Edit tool, not `sed -i`, while a file watcher runs.** Vite on Windows missed `sed -i` rewrites and kept serving stale styles.
8. **Behind TLS inspection, drive the installed browser; never weaken certificate checks.** Playwright's bundled Chromium rejected a corporate re-signing certificate.
9. **Treat the browser pane as an unreliable instrument.** Screenshots time out when the window is hidden or come back blank mid-scroll, emulation ignores scroll, and assets are cached. Read the DOM instead (`elementFromPoint`, scripted checks), and poll a health URL before driving a server that was just started.
10. **Git Bash rewrites arguments that start with `/` into Windows paths.** Set `MSYS_NO_PATHCONV=1`.

## Design handoffs

Most of these builds began from a Claude Design export or a working prototype, and the same handful of lessons came up each time.

1. **A design export is a self-unpacking bundle; decode it before reinterpreting the spec.** TLWR's 607 KB file had 395 lines, and two of them held 98% of the bytes. The canvases ran 2.3–5.2 MB in about 590 lines. The Museum's logo board was a 760 KB nested bundle.
2. **Port the logic and structure, never the runtime.** `support.js` and the `DCLogic` classes are Claude Design's runtime; rebuild them as tokens, templates and modules.
3. **Take structure, layout and colour from a prototype, and nothing about how it loads assets.** YF's prototype linked Google Fonts and requested a family it never used.
4. **A design's sample values never ship.** A sample UPI id and testimonial (YF), a sample reader's progress (45-days), sample phone numbers, hours and fees (LCC). Brand Kit's QA checklist started fully ticked, so "Ready to post" showed before anything was checked.
5. **Extract content by script, then prove parity.** Brand Kit matched 273 of 273 prompts against the design file. DQ keeps its markup close to the export so later revisions can be diffed and ported.
6. **DesignSync needs an interactive `/design-login` and reads only design-system projects.** Unattended sessions should work from exported files in the repo.
7. **Get a cheap approval before expensive work.** A concept board before any biome art (PS), stills before a render (Reelsmith), design gates that are shown and never self-approved (ATF, 45-days).
8. **The brief and the canvases disagree in small ways; log each one in a table with its resolution.** DQ lists eight figures in the design copy that are not in its verified table, and fixed the design's "21th" and "22th".

## Privacy and security

The clinic and the main site went furthest here; the rest contributed the small rules that keep a static site from leaking.

1. **Make no third-party runtime requests unless the page needs one; a request identifies the site, never a person.** Crossref's "polite pool" asks for an email address, and the site's URL is enough. Fonts are self-hosted.
2. **Source documents carry personal data.** VT's documents held personal phone numbers; only the event email is published. Development and test data are made up.
3. **Request logs are a data store.** Workers invocation logs keep every URL and header, which would have stored booking tokens and IP addresses; they are turned off.
4. **Never spread a database row into a JSON response; list the fields by hand.** The next migration's new column would otherwise publish itself.
5. **Errors are verbose inside the gate and opaque at the gate.** Raw login errors reveal which accounts exist. PS's stats endpoint returned `err.message` to the public.
6. **Guard a dev-only sign-in twice:** an environment variable and a localhost host check.
7. **Encrypt personal fields bound to their row.** AES-GCM with `table.column:id` as additional data means a copied ciphertext fails to open, and a CHECK on encrypted columns refuses plaintext.
8. **Sanitise anything a client sent before rendering it on your origin.** PS's shared-conversation pages carried a stored XSS through raw HTML and `javascript:` links. A canonical-path redirect was an open redirect for `//evil.example/`.
9. **Scope privileged keys to one step or one module.** A workflow exposed the service-role key job-wide to npm install scripts. RF reads Strava tokens from one service-role module, with zero RLS policies on that table.
10. **Settle consent before an analytics tag goes live.** VC's GA4 tag sets cookies and the consent question is still open.

## Cloudflare Workers and Pages

Most of these sites deploy to Cloudflare. Its limits are not enforced locally, so they surface in production.

1. **Workers Free allows 10 ms of CPU and 50 subrequests per request, and local dev enforces neither.** Share-card rendering (about 400 ms) moved to build time after production errors. The YouTube sync is driven one page at a time from the browser. HTML-to-text of 0.5 MB runs in the browser.
2. **workerd is not Node.** There is no `Image`, `document` or `createObjectURL`; the main module may export handlers only; Worker types merge into the DOM's `Element`.
3. **Pages Functions route every file under `functions/`.** Keep helpers outside it; a Function at `/ask` would shadow the `/ask` page.
4. **On Pages a missing static file is not a 404.** It returns the app shell as 200 text/html, so a missing share image or `/.well-known` file silently appears to exist. VC's middleware advertised share images that were never deployed.
5. **Responses a Worker builds get no `_headers` rules; `ASSETS.fetch` responses do.** Each Worker-built path sets its own security headers.
6. **Run `wrangler whoami` before any deploy.** LCC had two accounts. A new account has no workers.dev subdomain, Email Routing is not Email Sending, and `wrangler secret put` redeploys the deployed code, not the repo.
7. **Free-plan cron triggers are per account.** Five triggers, preview Workers included, so jobs share triggers and dispatch inside.
8. **Dashboard settings matter as much as code.** Cloudflare's AI Crawl Control returned 403 to GPTBot and ClaudeBot while `robots.txt` welcomed them.
9. **Pages builds with npm 10.9.2 and its own Node version**, whatever your machine runs. See the lockfile and Node lessons above.

## Databases: Supabase, Postgres, D1

Row-level security as the access boundary and migrations against live data produced the most expensive near-misses in the ledger.

1. **Run `supabase migration list` before every push, and finish a hand-applied migration with `migration repair`.** YF applied five migrations by hand. The rule had been written at the push step, while the bad state was created at the apply step.
2. **Write a rule at the operation that creates the bad state, not the one that reveals it.** A rule attached to the wrong operation reads as handled and changes nothing.
3. **PostgREST returns at most 1,000 rows per request.** PW2's 1,677 micro-posts are paged in parallel, because sequential paging doubled load time.
4. **PostgREST errors you will meet.** PGRST205 means the table is not migrated yet (name the missing migration in the error). PGRST102 means bulk-insert objects must share keys. A HEAD request hides the error body.
5. **Don't call Supabase inside `onAuthStateChange`.** It can deadlock; defer with `setTimeout(…, 0)`.
6. **A safety default filtered by RLS is invisible where it bites.** Uploads defaulted to unpublished for consent review, and public pages silently showed no photo. Warn on the screen where the row is chosen.
7. **Lock down functions and grants explicitly.** Revoking from anon and authenticated left PUBLIC able to execute. Anonymous callers could exhaust a global cap and forge logs through RPCs. An anonymous select policy makes "unlisted" shares enumerable.
8. **A trigger for new rows says nothing about rows already there.** Backfill in the same migration, assert the row count, and avoid reserved words (`values` became `org_values`).
9. **D1 limits that bite.** Five terms in a compound SELECT, glob patterns of about 45 characters, no `CREATE TEMP TABLE`, `db.batch([])` throws, `--command` silently ran only one statement, a CHECK that evaluates to NULL passes (use `date(x) IS x`), and computed columns need a CAST.
10. **Claim work atomically.** `INSERT … SELECT … ON CONFLICT DO NOTHING RETURNING`; count lockout attempts before comparing; check the idempotency key before the free-slot check and before a single-use bot-check token.
11. **Name the resource that runs out first, and measure it.** Storage (1 GB) was irrelevant. Egress (5 GB a month) with 3–8 MB phone photos was the real limit, and nothing measured it.

## AI features

Three repos call language models. Each concluded that the model is the least reliable layer and code must hold the rules.

1. **A model id is configuration, never a constant.** `gemini-2.5-flash` answered 404 for a new key, and the alternatives returned 503 for minutes. YF reads the id from the admin with a fallback; PS keeps its model ladder in a settings row.
2. **A prompt is not enforcement.** The rule a prompt stated was broken on the first call. Code enforces what it can and flags what it can detect; PS strips any link the archive did not supply.
3. **If the data can't answer, say so.** Quick answers are assembled from the archive, never generated, and the page labels which layer answered.
4. **Retrieval needs a similarity floor, and type filters must re-rank, not pre-filter.** Without a floor the semantic half always returns its nearest rows. Filtering by type before ranking returned eight confident, unrelated items.
5. **An LLM judge must know what retrieval missed.** Refusals of answerable questions scored "refused correctly" until an archive summary was added. 63 of 98 self-reported confidences read 1.00.
6. **Exact text is typeset in code, never left to AI-generated pixels.**
7. **A synthetic voice should not borrow a real identity, and browser speech fails unevenly.** The narrator speaks about Sanket, never as him. Chrome cuts utterances after about 15 seconds, `onend` may never fire, Firefox can't listen, and Android re-sends earlier results.

## Docs, changelogs and the lessons loop

How the repos record what they learn is itself a lesson, and the part a skill would automate.

1. **Tracking documents come before code and name their owner.** YF's reference project had a README claiming "Phases 0–3 complete" against a shipped 1.0.3.
2. **"Not tested" and "not built" read the same in a status file.** A feature listed as "never exercised" had never been written; no public page read the column.
3. **A decision justified by something missing expires when it arrives.** "JSON because there is no admin tab yet" outlived the admin tab. Write the trigger into the task that removes the gap.
4. **Cutting a release adds a heading; it never renames the last one.** 45-days' changelog lost seven versions this way. PS's publisher refuses to run if a version heading fails to parse, because its bullets would attach to the version above.
5. **Update every index in the same commit.** The profile repo's QA script fails if a page is not linked from the homepage, and CLAUDE.md and AGENTS.md must stay in sync.
6. **A lesson records its trigger; a rule lives in CLAUDE.md; promote the lesson when it hardens.** The lockfile lesson was promoted only after it recurred. "A rule stated without the failure it prevents gets argued away."
7. **Carry lessons to sister projects on day one, and remember that porting code ports its bugs.** 45-days imported its sister projects' lessons before writing code, and found a calendar-escaping bug in the code it ported.
8. **Verify your own playbook's citations.** Reelsmith's verification pass found claims attributed to sources that do not contain them; they are now marked as house guidance.
9. **End each session by asking whether anything surprised you.** Write entries when surprised, corrected or slowed down, not on a schedule; scheduled entries are the thin ones.
10. **Name the file LEARNINGS.md, not LICENSE.md.** DQ's brief proposed a name that collides with licence tooling. The file has not been created yet.

## Product and storytelling judgement

The lessons least likely to be written down elsewhere: what a reader actually came for.

1. **Completeness is not a feature.** Seventy day cards and seventy messages (about 70 KB) answered nothing. Build the question the reader came with, usually "what is tomorrow?"
2. **Before deriving one control from another, name the question each answers.** If you can write two different sentences, keep two controls.
3. **When shortening something periodised, remove whole cycles; if no cut keeps the shape, offer none.**
4. **When the metaphor can't be completed, change the mapping.** A linear lap was 320 million pixels of scroll that nobody travelled; a log scale made it a journey.
5. **Put the moment of insight where the reader has committed.** Ask for the guess before the explanation, and show the gap in the same picture as the answer.
6. **A signal needs a neutral background.** One shared sky palette made the only difference between lanes the one that mattered.
7. **Lead with the concrete.** A felling order for 32,490 trees with dates is more verifiable than megawatts.
8. **Show the edit; don't claim it.** Striking out a visitor's own filler words convinces in a second where a description convinces nobody.
9. **Give the other side equal weight.** The Museum's Reply tab is the same size as the charge; DQ presents both radicalisation cases at the same weight, as one mechanism.
10. **A cosmetic-sounding edit can be a correctness fix.** Removing one food unit fixed two descriptions of the same walker in different units.
11. **Derive state from the device instead of shipping demo toggles.** Reduced motion, device tier and embed mode are detected, with a URL flag to force the low path for testing.

## Learned more than once

The same failure, paid for again in another repo (or in the same repo later). These are the strongest evidence that a shared skill would save time.

| Lesson | Where | Times |
| --- | --- | --- |
| A lockfile written by npm 11 fails `npm ci` on CI or Cloudflare's npm 10 | YF (twice, promoted after the second), LH | 3 |
| Shell heredocs break generated edit scripts | LCC phases 7, 13, 15, 16, 18 | 5 |
| CRLF or encoding rewrites break a derived-text test | LCC phases 9, 14, 18 | 3 |
| Overflow only visible at phone width | RF (3 bugs), LCC (4 screens) | 7 |
| Rebuilding `dist/` under a running preview breaks it | LCC phases 3 and 11 | 2 |
| A UTC date shows the wrong day in India | 45D, VT | 2 |
| TypeScript 7 too new for the Astro toolchain | YF, LCC | 2 |
| `pkill -f` kills its own shell | TLWR, ATF | 2 |
| Stylesheet or class order silently decides which rule wins | ATF, RF, VT | 3 |
| Layout shift from content revealed by script | ATF/45D, LCC (twice), E20 | 4 |
| Design export is a bundle that has to be decoded | TLWR, ATF, 45D, MF | 4 |
| DesignSync can't run without an interactive login | LH, DQ, TLWR | 3 |
| PostgREST caps responses at 1,000 rows | PW2, LH | 2 |
| PGRST205 when the app is ahead of its migration | YF, LH | 2 |
| A health check or gate passes without testing anything | YF (twice), E20, LCC | 4 |
| Hand-applied migrations drift from recorded history | YF (0004–0005, then 0006–0008) | 2 |

## Where the repos disagree

A skill has to settle these or leave them to each project. Most are project choices, not errors, so the recommended default is to defer to the repo's CLAUDE.md.

| Topic | One position | The other | Suggested for the skill |
| --- | --- | --- | --- |
| Where to commit | Directly on `main`, approved 2026-10-18 (ATF, 45D) | A long-running branch behind a flag, pushed but never merged by Claude (PS Atlas); session branches elsewhere | Follow the repo's CLAUDE.md; default to a branch when it says nothing. |
| Commit size | One commit per deliverable (ATF) | One commit per phase (45D, 2026-10-19); "the boundary you'd roll back to" (YF, RF) | Defer to the repo; the shared rule is "commit and push at a rollback boundary". |
| Design gates | Never self-approve; build, show, wait (ATF, 45D) | Once the pattern was proven, later phases committed with no gate (PS Atlas) | Gate the first instance of a pattern; record when the owner waives later gates. |
| Digits in Marathi | Latin digits everywhere, by requirement (YF) | Devanagari digits on Marathi pages (VT) | Neither is a rule; check the locale's output against the project's requirement. |
| A test suite | "There is no test suite" listed as an accepted blind spot (YF) | No longer accepted as of cms-site-planner 0.2.0; LCC tests every rule that protects patients | The newer position: rules that protect people have tests. |
| Lighthouse as a gate | A deploy gate at ≥ 95 (E20's original plan) | Performance warns, accessibility blocks, byte budgets gate (E20 ADR-011); ±5 run to run (VT) | Gate on deterministic checks (axe, byte budgets); report Lighthouse. |
| Changelog shape | Keep a Changelog with `[Unreleased]` (ATF, 45D, YF) | Public, reader-facing entries (RF); a staging buffer published to a database (PS); dated entries (DQ, LH) | Don't impose a format; check the invariants (a release adds a heading, headings parse). |
| Lessons format | Trigger / Learning / Rule / Promoted (YF, RF, CMS) | Rules index plus log (ATF, 45D); per-phase bullets (LCC); essays (TLWR); dated bullets (GB, VT, LH) | One shared format, below, with a machine-readable tag line. |

Foundation for the new skill

## Turning the ledger into a skill

### What the evidence says the skill should do

Three jobs, in order of value:

1. **Carry the core rules everywhere.** The lessons tagged Core that recur across repos (the matrix's widest rows) belong in the skill's main file, mostly as a short "before you call it done" checklist.
2. **Load stack and domain packs only when they apply.** cms-site-planner's best idea: "a stack that was not chosen contributes no rules". Cloudflare, Supabase, D1, Astro, languages, data stories, design handoffs and video each become one reference file.
3. **Run the lessons loop.** One entry format for every repo, a promotion path from a repo's learnings file into the skill, and a harvest step that gathers new entries from all repos so the skill stays current.

### Proposed shape

```
build-lessons/              name to be decided
  SKILL.md                  under 200 lines: when to use,
                            session start and end, core
                            rules, done checklist, and a
                            "where to read what" table
  references/
    verification.md
    layout-css-a11y.md
    data-and-sources.md
    dates-and-languages.md
    dependencies.md
    agent-environment.md
    design-handoffs.md
    privacy-security.md
    ai-features.md
    stack-cloudflare.md
    stack-supabase.md
    stack-d1.md
    stack-astro.md
    storytelling.md
  templates/
    LEARNINGS.md            the shared entry format
  scripts/
    harvest.mjs             new entries from every repo
                            since a date, grouped by tag
```

The under-200-lines main file, pointing into references, is the pattern Reelsmith's draft skill and cms-site-planner both use.

### Draft frontmatter

```
---
name: build-lessons
description: Lessons recorded across Sanket's
  builds (Astro, Cloudflare Workers and Pages,
  Supabase, D1, data stories, interactive
  pieces, video). Use at the start of a session
  in any of these repos, before calling work
  done, when adding a test or guard, when
  touching dependencies or the lockfile, when
  porting a Claude Design export, and when
  writing an entry in LEARNINGS.md.
---
```

### Shared entry format

```
### 2026-11-02 · Short title
**Trigger:** what happened, with a number.
**Learning:** the general point.
**Rule:** one imperative sentence, or "none yet".
**Tags:** verification, cloudflare
**Promoted:** CLAUDE.md §… or skill reference
```

YF and RF's format plus one **Tags** line, so a script can harvest by theme. Keep ATF's numbered rules index at the top of each file.

### Draft "before you call it done" checklist

- Built and checked on the deploy runtime (preview build, not the dev server), and the deploy output read.
- Every new test or guard seen to fail once, with what was broken to make it fail written down.
- Looked at 375 px and desktop width, light and dark themes, reduced motion; `scrollWidth` equals the viewport.
- Every number on the page derived or cited; no sample values from the design; unknowns shown as `[TBD]` or left empty.
- Dates computed in the reader's zone (IST) and tested with a mocked clock.
- Lockfile untouched unless `package.json` changed; if it changed, written with the build's npm and Node.
- New browser tests repeated (`--repeat-each=3`) before they are trusted.
- `git status` read before staging; no stray directories; nothing restored with `git checkout` over uncommitted work.
- Changelog, status and learnings updated; asked whether anything surprised you.

### How it relates to cms-site-planner

| Theme | cms-site-planner | New skill |
| --- | --- | --- |
| Verify on the deploy runtime, check the built output, test deploy config | States it (core rules 1, 18, 21) | Reference it, add positive controls and repeat runs |
| 375 px, invented content, `[TBD]`, line endings | States it (core 14, 14a, 15, 22) | Share wording; avoid two versions drifting |
| Cloudflare, Supabase, D1, languages, privacy, booking | Full rule files with evidence | Reuse, don't copy (see question 4) |
| Agent environment and shell traps | Not covered | New |
| Design handoffs, data stories, storytelling, video, AI features | Design exports at planning time only | New |
| When it runs | Once, at planning, greenfield CMS sites | Every session, any repo |

### Decisions for you before building it

1. **Name.** "build-lessons" is a placeholder. Suggest something you will type, since it may be invoked by hand.
2. **One skill or two.** One skill with checklist and loop, or a working skill plus a separate "lessons-keeper" that only writes and harvests entries. Suggest one, split later if it grows past 200 lines.
3. **Where it lives.** A plugin repo like cms-site-planner (versioned, installable, has a changelog) or a personal skills folder. Suggest a repo, so the skill has its own history and lessons.
4. **Stack rules.** Copy cms-site-planner's Cloudflare and Supabase files into the new skill, point to them, or move both skills onto shared files. Suggest pointing to them first, to avoid two versions drifting.
5. **Standardise the repos.** Adopt the shared entry format in all 19 repos, including a LEARNINGS.md for the nine that have none (seeded from the lessons this report found in their docs), or leave existing files alone and only harvest them.
6. **Harvest.** Run by hand when you want, or as a scheduled task that collects new entries and proposes promotions.
7. **Scope.** PW2's life lessons (running, writing, patience) are content for its film, not engineering. Suggest leaving them out. Decide whether the video pack (Reelsmith) belongs here or in Reelsmith's own skill.
8. **Windows-only traps.** Many environment lessons come from Windows sessions (LCC, LH, VT, YF). Keep them in the environment pack, marked by operating system.

### Gaps to close first

Nine repos have no learnings file: personal-site, cms-site-planner (template only), daredavil01, reelsmoth, e20-ka-chakravyuha, the-divident-question, visiting-card, brand-kit and museum-of-failures. personal-site is the largest gap: its 63 KB CLAUDE.md holds dozens of lessons as rules with their reasons, and nothing marks which ones were learned the hard way. The lessons this report attributes to those nine repos are a ready seed for their files.

Compiled 2 November 2026 from read-only copies of 19 repositories. Codes in tags refer to the Sources table; every lesson names the repos that recorded it. Figures quoted are the repos' own; where a repo's figure was later corrected, the corrected figure is used.