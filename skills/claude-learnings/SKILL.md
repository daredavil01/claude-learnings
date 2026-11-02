---
name: claude-learnings
description: Lessons recorded across Sanket's builds (Astro, Cloudflare Workers and Pages, Supabase, D1, data stories, interactive pieces, video). Use at the start of a session in any of these repos, before calling work done, when adding a test or guard, when touching dependencies or the lockfile, when porting a Claude Design export, when publishing numbers, quotes or dates, and when writing an entry in LEARNINGS.md.
---

# Claude learnings

Rules distilled from what nineteen repositories recorded about building them
(ledger compiled 2 November 2026, kept in `docs/sources/` of this skill's repo).
Every rule here was paid for at least once; the ones in **Traps already paid for
twice** were paid for again because the fix sat in one repo's notes.

**Precedence.** The repo's own `CLAUDE.md` wins over this skill. This skill wins
over habit. Where repos disagree on a convention, read
`references/disagreements.md` before choosing.

Repo codes in brackets (`[YF]`, `[LCC]` …) are explained in `references/repos.md`.

## Session start

1. Read the repo's `CLAUDE.md`, then its learnings file (`LEARNINGS.md`,
   `lessons.md`, `learnings.md`, `docs/lessons.md`). Note its authority order
   (which document wins for words, for layout, for schema).
2. Run `git status`. Files you did not touch mean another session may be working
   here; do not stage or revert them. [PS, LCC]
3. Check what the repository actually contains before trusting a status file or
   plan that describes it. [YF]
4. If the request is vague, investigate first (audit, measure, screenshot); the
   investigation survives a change of mind. Ask only when two readings lead to
   different work, lead with a recommendation and its cost. [YF, PS, PW2]
5. Load the references that match the stack and the task (table at the bottom).
   A stack the repo does not use contributes no rules.

## Core rules

These apply in every repo. Detail and evidence live in the references.

1. **A check that has never failed has not been tested.** Break the thing once
   and watch every new guard, test and health check fire. [YF, ATF, 45D, GB, E20]
2. **Only the built artefact on the deploy runtime proves what ships.** Build,
   then preview; never trust the dev server or a stale `dist/`. Read what the
   deploy printed. [YF, LCC, PS, ATF]
3. **Never type a number a model or table can compute; never publish invented
   content.** Derive or cite every figure. Unknowns are `[TBD]` or left empty,
   never a plausible sample. A stat with no value is omitted, not shown as 0.
   [TLWR, PW2, PS, DQ, VT, YF, 45D]
4. **Look at every new screen at 375 px and desktop width, light and dark, with
   reduced motion.** Compare `document.documentElement.scrollWidth` with the
   viewport. No unit test sees a layout. [RF, LCC, TLWR, MF]
5. **Nothing a script fills in may appear after first paint.** Set state in an
   inline head script; render device- or zone-dependent content after hydration.
   [ATF, 45D, LCC, E20]
6. **Count calendar days in the reader's zone (IST, UTC+05:30); never compare
   dates through UTC strings.** Write dates as "9 August 2026". [45D, VT]
7. **Touch the lockfile only when `package.json` changed, and write it with the
   npm the build uses** (Cloudflare: npm 10.9.2). Pin exact versions at least
   14 days old, peers included, and pin Node. [YF, LH, VT, LCC]
8. **A prompt is not enforcement; a design's sample values never ship; a rule
   needs the failure it prevents.** Code holds the rules. [YF, PS, 45D, LCC, BK]
9. **Write a rule at the operation that creates the bad state, not the one that
   reveals it.** [YF]
10. **Commit and push at a rollback boundary**, on the branch the repo's
    `CLAUDE.md` names (default: a branch, not `main`).

## Traps already paid for twice

| Trap | Fix | Seen in |
| --- | --- | --- |
| npm 11 lockfile fails `npm ci` on Cloudflare's npm 10 | `npx npm@10.9.2 install`; prove with `npx npm@10.9.2 ci --dry-run` | YF ×2, LH |
| Shell heredocs mangle generated edit scripts (backticks, `${}`) | Write the script with the Write tool, run it from a file | LCC ×5 |
| CRLF / cp1252 rewrites break a derived-text test | Keep line endings; `python -X utf8` | LCC ×3 |
| Overflow visible only at phone width | 375 px pass + `scrollWidth` check on every screen | RF, LCC |
| Rebuilding `dist/` under a running preview | Stop the server first | LCC ×2 |
| UTC date shows the wrong day in India | Compute in reader's zone, mock the clock in tests | 45D, VT |
| TypeScript 7 too new for the Astro toolchain | Read `peerDependencies` before pinning | YF, LCC |
| `pkill -f vite` kills its own shell (exit 144) | `pkill -f "[v]ite"` | TLWR, ATF |
| Stylesheet or class order decides which rule wins | One import point, cascade order; equal specificity for overrides | ATF, RF, VT |
| Layout shift from script-revealed content | Decide state before paint | ATF/45D, LCC, E20 |
| Design export is a bundle that must be decoded | Decode first, then read the spec | TLWR, ATF, 45D, MF |
| DesignSync needs interactive `/design-login` | Work from exported files in the repo | LH, DQ, TLWR |
| PostgREST caps responses at 1,000 rows | Page (in parallel) | PW2, LH |
| PGRST205: app ahead of its migration | `supabase migration list` before push; name the migration in the error | YF, LH |
| A health check or gate passes without testing anything | Positive control; point it at a broken config | YF ×2, E20, LCC |
| Hand-applied migrations drift from history | `supabase migration repair` right after applying by hand | YF ×2 |

## Before you call it done

- [ ] Built and checked on the deploy runtime (preview build, not the dev
      server), and the deploy output read.
- [ ] Every new test or guard seen to fail once; what was broken to make it fail
      is written down.
- [ ] Both branches of every new conditional exercised (empty and full data).
- [ ] Looked at 375 px and desktop width, light and dark, reduced motion;
      `scrollWidth` equals the viewport; contrast checked, not assumed.
- [ ] Every number on the page derived or cited; quotes looked up by script; no
      sample values from the design; unknowns shown as `[TBD]` or left empty.
- [ ] Dates computed in the reader's zone and tested by moving the clock, not
      waiting.
- [ ] Lockfile untouched unless `package.json` changed; if changed, written with
      the build's npm and Node.
- [ ] New browser tests repeated (`--repeat-each=3`) before they are trusted.
- [ ] `git status` read before staging; no stray directories (e.g. `undefined/`);
      nothing restored with `git checkout` over uncommitted work.
- [ ] Changelog, status and every index updated in the same commit; a release
      adds a heading, never renames the last one.
- [ ] Asked: did anything surprise, correct or slow me down? If so, write an
      entry (below).

## Session end: the lessons loop

Write an entry when surprised, corrected or slowed down, not on a schedule.
Use the shared format from `templates/LEARNINGS.md`:

```markdown
### 2026-11-02 · Short title
**Trigger:** what happened, with a number.
**Learning:** the general point.
**Rule:** one imperative sentence, or "none yet".
**Tags:** verification, cloudflare
**Promoted:** CLAUDE.md §… or skill reference
```

Promote a lesson into the repo's `CLAUDE.md` when it recurs or hardens; promote
it into this skill when it would help a different repo. Collect new entries
across repos with `node scripts/harvest.mjs --since 2026-11-02 <repo dirs…>`.
Full procedure: `references/lessons-loop.md`.

## Where to read what

| When you are… | Read |
| --- | --- |
| Adding a test, guard, health check or CI gate | `references/verification.md` |
| Publishing figures, quotes, sources or any fact | `references/data-and-sources.md` |
| Changing layout, CSS, fonts, colour, motion or a11y | `references/layout-css-a11y.md` |
| Clarifying a request, porting someone's work, reconciling docs | `references/collaboration.md` |
| Handling dates, time zones, Marathi / Hindi / Kannada | `references/dates-and-languages.md` |
| Installing, upgrading or pinning anything; dev servers | `references/dependencies.md` |
| Running shell commands, killing processes, editing files, Windows | `references/agent-environment.md` |
| Starting from a Claude Design export or prototype | `references/design-handoffs.md` |
| Touching personal data, auth, errors, keys, analytics | `references/privacy-security.md` |
| Calling a language model, retrieval, speech | `references/ai-features.md` |
| Deploying to Cloudflare Workers or Pages | `references/stack-cloudflare.md` |
| Using Supabase / Postgres / PostgREST | `references/stack-supabase.md` |
| Using Cloudflare D1 | `references/stack-d1.md` |
| Using Astro | `references/stack-astro.md` |
| Shaping a data story, interactive piece or video | `references/storytelling.md` |
| Writing docs, changelogs, status files, learnings | `references/lessons-loop.md` |
| Two repos do it differently | `references/disagreements.md` |
| Decoding a repo code like `[LCC]` | `references/repos.md` |

For greenfield CMS sites, `cms-site-planner` holds the planning-time rules
(Cloudflare, Supabase, languages, booking) with full evidence; point to it
rather than copying it.
