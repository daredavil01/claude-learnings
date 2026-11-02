# claude-learnings

> Every rule in it was paid for once. Sixteen were paid for twice.

**claude-learnings** is a [Claude Code](https://claude.com/claude-code) skill,
packaged as a plugin. It brings what nineteen repositories recorded about building
them into every new Claude Code session, so a bug fixed in one repo is not paid for
again in the next.

It was built from the *Build Lessons Ledger* (2 November 2026), a read-only review
of nineteen repositories: about 360 recorded entries from ten learnings files,
plus CLAUDE.md "why" notes, decision records, audits and status logs from the other
nine.

- **Interactive infographic:** [`docs/infographic.html`](docs/infographic.html)
  (published as a private claude.ai artifact; share it from its Share menu)
- **Source ledger, unedited:** [`docs/sources/2026-11-02-build-lessons-ledger.md`](docs/sources/2026-11-02-build-lessons-ledger.md)
- **Ready-to-post announcements:** [`docs/social-posts.md`](docs/social-posts.md)

---

## Contents

- [Why it exists](#why-it-exists)
- [What it does](#what-it-does)
- [Install](#install)
- [Using it](#using-it)
- [The ten core rules](#the-ten-core-rules)
- [Traps already paid for twice](#traps-already-paid-for-twice)
- [Before you call it done](#before-you-call-it-done)
- [Reference packs](#reference-packs)
- [The lessons loop](#the-lessons-loop)
- [Harvest script](#harvest-script)
- [Repository layout](#repository-layout)
- [Source repositories](#source-repositories)
- [Design decisions](#design-decisions)
- [Contributing a lesson](#contributing-a-lesson)
- [Roadmap](#roadmap)

---

## Why it exists

The ledger found five things:

1. **The same lessons were learned over and over.** The most widely repeated
   themes were numbers and sources, proving that something works, and layout.
2. **Bugs were learned a second time in another repo.** An npm 11 lockfile failing
   `npm ci` on Cloudflare's npm 10 (three times, two repos), `pkill -f` killing its
   own shell, the UTC day boundary in India, TypeScript 7 being too new,
   PostgREST's 1,000-row cap. Each fix sat in one repo's learnings file, where the
   next project never looked.
3. **Lessons that were carried forward did not recur.** 45-days imported After the
   Feed's lessons on day one. Its log has no entry for either problem.
4. **One skill built this way already existed,** `cms-site-planner`, but only for
   planning CMS sites. Nothing covered shell traps, design handoffs, data stories,
   video or the lessons loop itself.
5. **Nine repos had no learnings file.** Their lessons were in CLAUDE.md files,
   decision records and status logs.

This skill is the shared home those lessons were missing.

## What it does

1. **Brings the core rules into every session.** `SKILL.md` (about 150 lines)
   holds the session-start steps, ten core rules, the traps already paid for
   twice, and a "before you call it done" checklist.
2. **Loads stack and domain packs only when they apply.** Each theme is one file
   under `references/`. A stack the repo does not use contributes no rules.
3. **Runs the lessons loop.** One entry format for every repo, a path for
   promoting a lesson from a repo into the skill, and a harvest script that
   gathers new entries from all repos.

**Precedence:** the repo's own `CLAUDE.md` > this skill > habit.

## Install

Requirements: Claude Code. The harvest script needs Node 18 or later. No other
dependencies.

### Option A: personal skill (recommended)

Available in every Claude Code session on your machine.

```bash
git clone https://github.com/daredavil01/claude-learnings ~/code/claude-learnings
mkdir -p ~/.claude/skills
ln -s ~/code/claude-learnings/skills/claude-learnings ~/.claude/skills/claude-learnings
```

On Windows (PowerShell, run as administrator or with Developer Mode on):

```powershell
git clone https://github.com/daredavil01/claude-learnings $HOME\code\claude-learnings
New-Item -ItemType SymbolicLink -Path $HOME\.claude\skills\claude-learnings `
  -Target $HOME\code\claude-learnings\skills\claude-learnings
```

Because it is a symlink, `git pull` in the clone updates the skill.

### Option B: plugin for one session

```bash
claude --plugin-dir ~/code/claude-learnings
```

### Option C: project skill

To pin one version of the skill inside a single repo, copy the folder in and
commit it:

```bash
mkdir -p .claude/skills
cp -r ~/code/claude-learnings/skills/claude-learnings .claude/skills/
```

### Check it loaded

Start Claude Code and ask "what skills do you have?". The answer should include
`claude-learnings`.

## Using it

Claude loads the skill on its own when the task matches its description. That
includes starting a session in one of these repos, finishing work, adding a test
or guard, touching dependencies or the lockfile, porting a Claude Design export,
publishing numbers, quotes or dates, and writing a LEARNINGS.md entry.

You can also call it by name:

```text
/claude-learnings
Use claude-learnings: run the done checklist on this change.
Use claude-learnings: I'm about to upgrade Astro — what should I watch for?
Use claude-learnings: write a LEARNINGS.md entry for what just happened.
```

A session that uses it typically goes like this:

| Stage | What happens |
| --- | --- |
| Session start | Read the repo's `CLAUDE.md` and learnings file; `git status` for another session's files; check the repo against the docs that describe it. |
| While working | Load the reference pack that matches the task (see the table below). |
| Before done | Run the checklist. |
| Session end | Ask whether anything surprised, corrected or slowed you down; if so, write an entry. |

## The ten core rules

1. A check that has never failed has not been tested. Break the thing once and
   watch every new guard fire.
2. Only the built artefact on the deploy runtime proves what ships.
3. Never type a number a model or table can compute; never publish invented
   content. Unknowns are `[TBD]`.
4. Look at every new screen at 375 px and desktop, light and dark, with reduced
   motion; compare `scrollWidth` with the viewport.
5. Nothing a script fills in may appear after first paint.
6. Count calendar days in the reader's zone (IST); never compare dates through UTC
   strings.
7. Touch the lockfile only when `package.json` changed, with the npm the build
   uses. Pin exact versions at least 14 days old, and pin Node.
8. A prompt is not enforcement; a design's sample values never ship; a rule needs
   the failure it prevents.
9. Write a rule at the operation that creates the bad state, not the one that
   reveals it.
10. Commit and push at a rollback boundary, on the branch the repo's `CLAUDE.md`
    names.

## Traps already paid for twice

| Trap | Fix | Times |
| --- | --- | --- |
| Overflow only visible at phone width | 375 px pass + `scrollWidth` check | 7 |
| Shell heredocs break generated edit scripts | Write the script with the Write tool, run from a file | 5 |
| Layout shift from content revealed by script | Decide state in an inline head script | 4 |
| Design export is a bundle to decode | Decode the long lines first | 4 |
| A health check or gate passes without testing anything | Positive control; point it at a broken config | 4 |
| npm 11 lockfile fails `npm ci` on Cloudflare's npm 10 | `npx npm@10.9.2 install`, prove with `ci --dry-run` | 3 |
| CRLF / encoding rewrites break a derived-text test | Keep line endings; `python -X utf8` | 3 |
| Stylesheet or class order decides the winner | One import point; equal specificity | 3 |
| DesignSync needs an interactive login | Work from exported files | 3 |
| Rebuilding `dist/` under a running preview | Stop the server first | 2 |
| UTC date shows the wrong day in India | Reader's zone; mock the clock | 2 |
| TypeScript 7 too new for Astro tooling | Read `peerDependencies` | 2 |
| `pkill -f` kills its own shell | `pkill -f "[v]ite"` | 2 |
| PostgREST caps at 1,000 rows | Page in parallel | 2 |
| PGRST205: app ahead of migration | `supabase migration list` before push | 2 |
| Hand-applied migrations drift | `supabase migration repair` right away | 2 |

## Before you call it done

- [ ] Built and checked on the deploy runtime, and the deploy output read.
- [ ] Every new test or guard seen to fail once.
- [ ] Both branches of every new conditional exercised (empty and full data).
- [ ] 375 px and desktop, light and dark, reduced motion; contrast checked.
- [ ] Every number derived or cited; quotes looked up by script; no sample values.
- [ ] Dates computed in the reader's zone and tested by moving the clock.
- [ ] Lockfile untouched unless `package.json` changed.
- [ ] New browser tests repeated (`--repeat-each=3`).
- [ ] `git status` read before staging; nothing restored with `git checkout`.
- [ ] Changelog, status and every index updated in the same commit.
- [ ] Asked whether anything surprised you, and wrote the entry.

## Reference packs

| Pack | Tier | Load when you are… |
| --- | --- | --- |
| [`verification.md`](skills/claude-learnings/references/verification.md) | Core | Adding a test, guard, health check or CI gate |
| [`data-and-sources.md`](skills/claude-learnings/references/data-and-sources.md) | Core | Publishing figures, quotes, sources or any fact |
| [`layout-css-a11y.md`](skills/claude-learnings/references/layout-css-a11y.md) | Core | Changing layout, CSS, fonts, colour, motion or a11y |
| [`collaboration.md`](skills/claude-learnings/references/collaboration.md) | Core | Clarifying a request, porting work, reconciling docs |
| [`dependencies.md`](skills/claude-learnings/references/dependencies.md) | Core | Installing, upgrading or pinning; dev servers |
| [`agent-environment.md`](skills/claude-learnings/references/agent-environment.md) | Core | Shell, processes, file edits, Windows |
| [`privacy-security.md`](skills/claude-learnings/references/privacy-security.md) | Core | Personal data, auth, errors, keys, analytics |
| [`lessons-loop.md`](skills/claude-learnings/references/lessons-loop.md) | Core | Docs, changelogs, status files, learnings |
| [`stack-cloudflare.md`](skills/claude-learnings/references/stack-cloudflare.md) | Stack | Deploying to Workers or Pages |
| [`stack-supabase.md`](skills/claude-learnings/references/stack-supabase.md) | Stack | Supabase, Postgres, PostgREST |
| [`stack-d1.md`](skills/claude-learnings/references/stack-d1.md) | Stack | Cloudflare D1 |
| [`stack-astro.md`](skills/claude-learnings/references/stack-astro.md) | Stack | Astro |
| [`dates-and-languages.md`](skills/claude-learnings/references/dates-and-languages.md) | Domain | Dates, time zones, Marathi / Hindi / Kannada |
| [`design-handoffs.md`](skills/claude-learnings/references/design-handoffs.md) | Domain | Claude Design exports and prototypes |
| [`ai-features.md`](skills/claude-learnings/references/ai-features.md) | Domain | Language models, retrieval, speech |
| [`storytelling.md`](skills/claude-learnings/references/storytelling.md) | Domain | Data stories, interactive pieces, video |
| [`disagreements.md`](skills/claude-learnings/references/disagreements.md) | — | Two repos do it differently |
| [`repos.md`](skills/claude-learnings/references/repos.md) | — | Decoding a repo code like `[LCC]` |

Every rule names the repos that recorded it in brackets (`[YF, LCC]`), so the
evidence can be traced back to the source ledger.

## The lessons loop

Write an entry when surprised, corrected or slowed down, not on a schedule.
Copy [`templates/LEARNINGS.md`](skills/claude-learnings/templates/LEARNINGS.md)
into any repo that has no learnings file. One entry looks like this:

```markdown
### 2026-11-02 · Short title
**Trigger:** what happened, with a number.
**Learning:** the general point.
**Rule:** one imperative sentence, or "none yet".
**Tags:** verification, cloudflare
**Promoted:** CLAUDE.md §… or skill reference
```

**Promotion path:**

```
repo LEARNINGS.md  ──recurs or blocks work──▶  repo CLAUDE.md  ──helps another repo──▶  this skill
```

**Tags:** `verification`, `data`, `sources`, `layout`, `css`, `a11y`, `motion`,
`performance`, `collaboration`, `scope`, `dates`, `i18n`, `dependencies`,
`toolchain`, `agent-env`, `design-handoff`, `privacy`, `security`, `ai`,
`cloudflare`, `supabase`, `d1`, `astro`, `database`, `storytelling`, `video`,
`docs`, `lessons-loop`.

## Harvest script

`skills/claude-learnings/scripts/harvest.mjs` collects shared-format entries across
repos, groups them by tag and flags entries not yet promoted.

```bash
node skills/claude-learnings/scripts/harvest.mjs [--since YYYY-MM-DD] [--tag name] <repo dir> [<repo dir> …]

# Everything new since the skill was built
node skills/claude-learnings/scripts/harvest.mjs --since 2026-11-02 ~/code/*

# Only Cloudflare lessons
node skills/claude-learnings/scripts/harvest.mjs --tag cloudflare ~/code/*
```

| Option | Meaning |
| --- | --- |
| `--since YYYY-MM-DD` | Keep entries dated on or after this day |
| `--tag name` | Keep entries with this tag |
| `<repo dir>` | One or more repository folders |

It reads `LEARNINGS.md`, `LESSONS.md`, `lessons.md`, `learnings.md`,
`docs/lessons.md` and `docs/LEARNINGS.md`. Example output:

```markdown
# Harvested learnings

1 entry since 2026-11-02 from 3 repos.

## dependencies (1)

- **2026-11-05 · Lockfile again** [yung-foundation-website]  ← promotion candidate
  - Rule: Write the lockfile with npm 10.9.2.
  - Trigger: npm ci failed on Pages after an npm 11 install.

## Not harvested

- vtbm/learnings.md: no entries in the shared format
- reelsmoth: no learnings file
```

Files in older formats are listed under *Not harvested* so they can be converted;
the script does not guess at them.

## Repository layout

```
.claude-plugin/plugin.json          plugin manifest
skills/claude-learnings/
  SKILL.md                          core rules, checklist, where to read what
  references/                       18 packs (table above)
  templates/LEARNINGS.md            shared entry format
  scripts/harvest.mjs               cross-repo harvest (Node 18+, no deps)
docs/
  infographic.html                  interactive infographic (claude.ai artifact source)
  social-posts.md                   LinkedIn and WhatsApp announcements
  sources/                          the source ledger, unedited
CHANGELOG.md
README.md
```

## Source repositories

| Code | Repository | What it is |
| --- | --- | --- |
| YF | yung-foundation-website | NGO site, Astro SSR + Supabase |
| LCC | low-cost-clinick | Clinic site and admin, Workers + D1 + R2 + Hono |
| 45D | 45-days | Daily reading series, Astro on Cloudflare Pages |
| ATF | after-the-feed | Interactive story (sister of 45-days) |
| RF | run-folio | Runners' race portfolio, Astro SSR + Supabase + Strava |
| TLWR | the-long-way-around | Scrollytelling, Vite + React canvas |
| PW2 | personal-webaite-v2 | Voice-first personal site |
| GB | ghat-batteries | Pumped-storage data story |
| VT | vtbm | Bird-count event site |
| LH | learning-hub | 60-day plan tracker |
| PS | personal-site | sankettambare.in |
| CMS | cms-site-planner | Claude Code plugin for planning CMS sites |
| D01 | daredavil01 | Profile repo and Day Island homepage |
| RS | reelsmoth | Remotion video studio |
| E20 | e20-ka-chakravyuha | Ethanol and sugar data story |
| DQ | the-divident-question | Youth dividend data story |
| VC | visiting-card | 3D visiting card |
| BK | brand-kit | Brand kit and prompt engine |
| MF | museum-of-failures | Civic museum site |

Formats, file sizes and the nine repos without a learnings file are in
[`references/repos.md`](skills/claude-learnings/references/repos.md).

## Design decisions

The ledger left eight decisions open. Each was settled using the ledger's own
suggestion:

| # | Decision | Taken |
| --- | --- | --- |
| 1 | Name | `claude-learnings`, matching this repository. |
| 2 | One skill or two | One skill; split out a "lessons-keeper" only if `SKILL.md` outgrows 200 lines. |
| 3 | Where it lives | This repo, as a plugin with a changelog. |
| 4 | Stack rules vs cms-site-planner | Build-time lessons here; point to cms-site-planner for planning-time rules rather than copying them. |
| 5 | Standardise the repos | Not yet. New entries use the shared format; existing files are left alone. |
| 6 | Harvest | By hand for now; can become a scheduled task. |
| 7 | Scope | PW2's life lessons left out; Reelsmith's video lessons kept. |
| 8 | Windows-only traps | Kept in `agent-environment.md`, marked *(Windows)*. |

Where the repos disagree (commit target, commit size, design gates, Marathi
digits, Lighthouse gates, changelog shape), the default is to follow the repo's
`CLAUDE.md`. See
[`references/disagreements.md`](skills/claude-learnings/references/disagreements.md).

## Contributing a lesson

1. Write it as an entry in the repo where it happened.
2. When it would help a different repo, add it to the matching reference pack as a
   bold rule followed by its evidence and repo codes.
3. If it has now been paid for twice, add a row to *Traps already paid for twice*
   in `SKILL.md` and in this README.
4. Keep `SKILL.md` under 200 lines; detail belongs in `references/`.
5. Add a line to `CHANGELOG.md`. A release adds a heading; it never renames the
   last one.

## Roadmap

- [ ] Add a `LEARNINGS.md` to the nine repos that have none, seeded from the
      lessons this skill attributes to them.
- [ ] Move existing learnings files to the shared format, or convert them as they
      are touched.
- [ ] Run the harvest as a scheduled task that proposes promotions.
- [ ] Decide whether the video lessons move into Reelsmith's own skill.

## Licence

No licence has been chosen yet. Until one is added, all rights are reserved by
the repository owner.
