# Supabase, Postgres and PostgREST

Row-level security as the access boundary and migrations against live data
produced the most expensive near-misses in the ledger. Load only when the repo
uses Supabase or Postgres.

Tags: `supabase`, `database`

## Migrations

1. **Run `supabase migration list` before every push, and finish a hand-applied
   migration with `supabase migration repair` immediately.** [YF ×2] YF applied
   five migrations by hand (0004–0005, then 0006–0008). The rule had been written
   at the push step, while the bad state was created at the apply step.
2. **Write a rule at the operation that creates the bad state, not the one that
   reveals it.** A rule attached to the wrong operation reads as handled and
   changes nothing.
3. **A trigger for new rows says nothing about rows already there.** [YF] Backfill
   in the same migration, assert the row count, and avoid reserved words
   (`values` became `org_values`).
4. **Test a migration inside `begin; … rollback;` before pushing it.** See
   `verification.md` §11.

## PostgREST and the client

5. **PostgREST returns at most 1,000 rows per request.** [PW2, LH] PW2's 1,677
   micro-posts are paged in parallel, because sequential paging doubled load time.
6. **PostgREST errors you will meet.** [YF, LH]
   - `PGRST205`: the table is not migrated yet. Name the missing migration in the
     error message.
   - `PGRST102`: bulk-insert objects must share keys.
   - A HEAD request hides the error body (a health check passed against a missing
     table).
7. **Don't call Supabase inside `onAuthStateChange`.** It can deadlock; defer with
   `setTimeout(…, 0)`.
8. **`getUser()` returns early with no network call when there is no cookie.** A
   health check built on it proves nothing. [YF]

## Access control

9. **A safety default filtered by RLS is invisible where it bites.** [YF] Uploads
   defaulted to unpublished for consent review, and public pages silently showed
   no photo. Warn on the screen where the row is chosen.
10. **Lock down functions and grants explicitly.** [YF, PS] Revoking from `anon`
    and `authenticated` left `PUBLIC` able to execute. Anonymous callers could
    exhaust a global cap and forge logs through RPCs. An anonymous select policy
    makes "unlisted" shares enumerable.
11. **Fakes don't prove RLS.** A stubbed client tests rendering, not access rules.
    See `verification.md` §10.

## Capacity

12. **Name the resource that runs out first, and measure it.** [YF] Storage (1 GB)
    was irrelevant. Egress (5 GB a month) with 3–8 MB phone photos was the real
    limit, and nothing measured it.

For planning-time Supabase rules on a new CMS site, see cms-site-planner.
