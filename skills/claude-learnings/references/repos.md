# Source repositories

The codes used in brackets throughout this skill. Snapshot from the ledger of
2 November 2026.

| Code | Repository · what it is | Learnings file | Format · where else lessons live |
| --- | --- | --- | --- |
| YF | yung-foundation-website · NGO site, Astro SSR + Supabase | `lessons.md` (37 entries) | Trigger / Learning / Rule / Promoted, split Collaboration vs Technical. Rules promoted into CLAUDE.md. |
| LCC | low-cost-clinick · clinic site and admin, Workers + D1 + R2 + Hono | `learnings.md` (186 bullets) | One section per phase, bold-lead bullets. "Never overrides the docs." |
| 45D | 45-days · daily reading series, Astro on Cloudflare Pages | `LEARNINGS.md` (21 rules + 15 log) | Part 1 numbered rules, each linked to a Part 2 log entry. |
| ATF | after-the-feed · interactive story (sister of 45-days) | `LEARNINGS.md` (22 rules + 14 log) | Same two-part format as 45-days. |
| RF | run-folio · runners' race portfolio, Astro SSR + Supabase + Strava | `lessons.md` (22 entries) | Trigger / Learning / Rule / Promoted (YF's template). |
| TLWR | the-long-way-around · scrollytelling, Vite + React canvas | `LESSONS.md` (20 lessons) | Numbered short essays, ordered by time saved or cost. |
| PW2 | personal-webaite-v2 · voice-first personal site | `learnings.md` (18, 10 build) | Life lessons from the archive, then build lessons. |
| GB | ghat-batteries · pumped-storage data story | `LEARNINGS.md` (22 bullets) | Newest first; Editorial / Sources / Technical. |
| VT | vtbm · bird-count event site | `learnings.md` (24 bullets) | Data / Assets / Build / Tooling. |
| LH | learning-hub · 60-day plan tracker | `docs/lessons.md` (11 bullets) | Dated bullets: what happened, what to do next time. |
| PS | personal-site · sankettambare.in | none | CLAUDE.md (63 KB) records most decisions with their failure; `docs/` audits, Atlas build log, OG cards. |
| CMS | cms-site-planner · Claude Code plugin | template only | A skill already distilled from YF, RF and LCC (Rule · Why · Evidence), for planning CMS sites. |
| D01 | daredavil01 · profile repo and Day Island homepage | none | CLAUDE.md / AGENTS.md conventions; build decks. |
| RS | reelsmoth · Remotion video studio | none | CLAUDE.md, `docs/playbook.md`, a verification pass over the playbook. |
| E20 | e20-ka-chakravyuha · ethanol and sugar data story | none | Architecture decision records, maintenance doc. |
| DQ | the-divident-question · youth dividend data story | none (STATUS names one) | CLAUDE.md data rules; STATUS open data questions. |
| VC | visiting-card · 3D visiting card | none | status.md decision log and known gaps. |
| BK | brand-kit · brand kit and prompt engine | none | `feature.md` technical decisions and checks. |
| MF | museum-of-failures · civic museum site | none | README audit and design notes. |

## Repos without a learnings file

PS, CMS, D01, RS, E20, DQ, VC, BK and MF have no learnings file. The lessons this
skill attributes to them are a ready seed: copy `templates/LEARNINGS.md` into the
repo and add entries for the bracketed lessons tagged with that repo's code. PS is
the largest gap: its CLAUDE.md holds dozens of rules with their reasons, and
nothing marks which were learned the hard way.

## Relation to cms-site-planner

| Theme | cms-site-planner | This skill |
| --- | --- | --- |
| Verify on the deploy runtime, check built output, test deploy config | States it (core rules 1, 18, 21) | References it; adds positive controls and repeat runs |
| 375 px, invented content, `[TBD]`, line endings | States it (core 14, 14a, 15, 22) | Same wording where possible, to avoid drift |
| Cloudflare, Supabase, D1, languages, privacy, booking | Full rule files with evidence | Build-time lessons here; planning rules stay there |
| Agent environment and shell traps | Not covered | New |
| Design handoffs, data stories, storytelling, video, AI features | Design exports at planning time only | New |
| When it runs | Once, at planning, greenfield CMS sites | Every session, any repo |
