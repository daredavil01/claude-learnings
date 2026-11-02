# Docs, changelogs and the lessons loop

How the repos record what they learn is itself a lesson, and the part this skill
automates.

Tags: `docs`, `lessons-loop`

## Docs and changelogs

1. **Tracking documents come before code and name their owner.** [YF] YF's
   reference project had a README claiming "Phases 0–3 complete" against a shipped
   1.0.3.
2. **"Not tested" and "not built" read the same in a status file.** A feature
   listed as "never exercised" had never been written; no public page read the
   column. Say which.
3. **A decision justified by something missing expires when it arrives.** "JSON
   because there is no admin tab yet" outlived the admin tab. Write the trigger
   into the task that removes the gap.
4. **Cutting a release adds a heading; it never renames the last one.** [45D, PS]
   45-days' changelog lost seven versions this way. PS's publisher refuses to run
   if a version heading fails to parse, because its bullets would attach to the
   version above.
5. **Update every index in the same commit.** [D01] The profile repo's QA script
   fails if a page is not linked from the homepage, and CLAUDE.md and AGENTS.md
   must stay in sync.
6. **Name the file `LEARNINGS.md`.** [DQ] DQ's brief proposed `LICENSE.md`, which
   collides with licence tooling.

## Writing lessons

7. **Write entries when surprised, corrected or slowed down, not on a schedule.**
   Scheduled entries are the thin ones. End each session by asking whether
   anything surprised you.
8. **A lesson records its trigger; a rule lives in CLAUDE.md; promote the lesson
   when it hardens.** [YF] The lockfile lesson was promoted only after it recurred.
   "A rule stated without the failure it prevents gets argued away."
9. **Write the rule at the operation that creates the bad state.** See
   `stack-supabase.md` §2.
10. **Verify your own playbook's citations.** [RS] Claims attributed to sources
    that do not contain them are marked as house guidance.

### Entry format

Use `templates/LEARNINGS.md`. One entry:

```markdown
### 2026-11-02 · Short title
**Trigger:** what happened, with a number.
**Learning:** the general point.
**Rule:** one imperative sentence, or "none yet".
**Tags:** verification, cloudflare
**Promoted:** CLAUDE.md §… or skill reference
```

It is YF and RF's Trigger / Learning / Rule / Promoted format plus one **Tags**
line, so `scripts/harvest.mjs` can group by theme. Keep a numbered rules index at
the top of each file (ATF's pattern). Use tags from this list where they fit:

`verification`, `data`, `sources`, `layout`, `css`, `a11y`, `motion`,
`performance`, `collaboration`, `scope`, `dates`, `i18n`, `dependencies`,
`toolchain`, `agent-env`, `design-handoff`, `privacy`, `security`, `ai`,
`cloudflare`, `supabase`, `d1`, `astro`, `database`, `storytelling`, `video`,
`docs`, `lessons-loop`.

## Carrying lessons forward

11. **Carry lessons to sister projects on day one, and remember that porting code
    ports its bugs.** [45D, ATF] 45-days imported After the Feed's lessons before
    writing code (the test harness builds before it previews; share images must be
    raster); its log has no entry for either problem. It still found a
    calendar-escaping bug in the code it ported.
12. **Adapt, don't copy, a rules file from another project**; grep the result for
    the old project's names. See `collaboration.md` §9.

## Promotion path

1. **Repo entry** in the repo's `LEARNINGS.md` (Trigger · Learning · Rule · Tags).
2. **Repo rule** in the repo's `CLAUDE.md` once it recurs in that repo or blocks
   work. Set **Promoted:** on the entry.
3. **Skill rule** in this skill once it would help a different repo, or once it
   has been paid for in two repos. Add it to the matching reference file with its
   repo tags; if it was paid for twice, add a row to *Traps already paid for
   twice* in `SKILL.md`. Record the change in the skill repo's `CHANGELOG.md`.

## Harvest

```bash
node scripts/harvest.mjs --since 2026-11-02 ~/code/yung-foundation-website ~/code/low-cost-clinick …
node scripts/harvest.mjs --since 2026-11-02 --tag cloudflare ~/code/*
```

It reads `LEARNINGS.md`, `lessons.md`, `learnings.md` and `docs/lessons.md` in
each repo, keeps entries in the shared format dated on or after `--since`, and
prints them grouped by tag with the repo name, marking entries whose
**Promoted:** line is empty as promotion candidates. Entries in older formats are
counted and reported so they can be converted, not parsed.
