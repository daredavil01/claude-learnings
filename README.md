# claude-learnings

A Claude Code skill (packaged as a plugin) that carries the lessons recorded
across nineteen of Sanket's repositories into every session, so a bug fixed in
one repo is not paid for again in the next.

Source: the *Build Lessons Ledger* of 2 November 2026, kept verbatim in
[`docs/sources/2026-11-02-build-lessons-ledger.md`](docs/sources/2026-11-02-build-lessons-ledger.md).

## What it does

1. **Carries the core rules everywhere.** `SKILL.md` (under 200 lines) holds the
   session-start steps, ten core rules, the traps already paid for twice, and a
   "before you call it done" checklist.
2. **Loads stack and domain packs only when they apply.** Each theme of the ledger
   is one file under `references/`; a stack the repo does not use contributes no
   rules.
3. **Runs the lessons loop.** One entry format for every repo
   (`templates/LEARNINGS.md`), a promotion path from repo to skill, and
   `scripts/harvest.mjs`, which gathers new entries from all repos grouped by tag.

## Layout

```
.claude-plugin/plugin.json
skills/claude-learnings/
  SKILL.md                      core rules, checklist, where to read what
  references/
    verification.md             proving it works (positive controls, runtime, fakes)
    data-and-sources.md         numbers, quotes, [TBD], evidence labels
    layout-css-a11y.md          375 px, cascade, first paint, fonts, a11y, motion
    collaboration.md            questions, scope, authority order
    dates-and-languages.md      IST, relative dates, Indic scripts, i18n tests
    dependencies.md             lockfile, pinning, Node, dev servers
    agent-environment.md        shell, git, editing and browser traps (OS-marked)
    design-handoffs.md          Claude Design exports and prototypes
    privacy-security.md         minimisation, errors, keys, encryption
    ai-features.md              model ids, enforcement, retrieval, speech
    stack-cloudflare.md         Workers and Pages
    stack-supabase.md           Supabase, Postgres, PostgREST
    stack-d1.md                 Cloudflare D1
    stack-astro.md              Astro
    storytelling.md             product judgement, data stories, video
    lessons-loop.md             docs, changelogs, entry format, promotion, harvest
    disagreements.md            where repos differ, and the skill's default
    repos.md                    repo codes, gaps, relation to cms-site-planner
  templates/LEARNINGS.md        shared entry format for every repo
  scripts/harvest.mjs           collect entries across repos (Node 18+, no deps)
docs/sources/                   the source ledger, unedited
```

## Install

As a plugin for one session, from a clone:

```bash
claude --plugin-dir ~/code/claude-learnings
```

Or as a personal skill, available in every session:

```bash
git clone https://github.com/daredavil01/claude-learnings ~/code/claude-learnings
ln -s ~/code/claude-learnings/skills/claude-learnings ~/.claude/skills/claude-learnings
```

## Harvest

```bash
node skills/claude-learnings/scripts/harvest.mjs --since 2026-11-02 ~/code/*
node skills/claude-learnings/scripts/harvest.mjs --tag cloudflare ~/code/*
```

## Decisions taken from the ledger

The ledger left eight decisions open. These were settled using its own
suggestions; change any of them by editing this section and the files it names.

| # | Decision | Taken |
| --- | --- | --- |
| 1 | Name | `claude-learnings`, matching this repository. |
| 2 | One skill or two | One skill; split out a "lessons-keeper" only if `SKILL.md` outgrows 200 lines. |
| 3 | Where it lives | This repo, as a plugin with a changelog. |
| 4 | Stack rules vs cms-site-planner | Build-time lessons here; point to cms-site-planner for planning-time rules instead of copying them. |
| 5 | Standardise the repos | Not done here. New entries use the shared format; existing files are left alone. `references/repos.md` lists the nine repos with no learnings file and how to seed one. |
| 6 | Harvest | By hand for now (`scripts/harvest.mjs`); can become a scheduled task later. |
| 7 | Scope | PW2's life lessons are left out. Reelsmith's video lessons are kept, in `storytelling.md` and `verification.md`. |
| 8 | Windows-only traps | Kept in `agent-environment.md`, marked *(Windows)*. |

## Contributing a lesson

Follow `skills/claude-learnings/references/lessons-loop.md` → *Promotion path*:
add it to the matching reference with repo tags, add a row to *Traps already paid
for twice* in `SKILL.md` if it recurred, and record it in `CHANGELOG.md`.
