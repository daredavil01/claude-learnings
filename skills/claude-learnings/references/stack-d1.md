# Cloudflare D1

Lessons from LCC (Workers + D1 + R2 + Hono). Load only when the repo uses D1.
Cloudflare runtime rules are in `stack-cloudflare.md`.

Tags: `d1`, `database`

## Limits that bite

1. At most five terms in a compound `SELECT`.
2. Glob patterns of about 45 characters is the practical ceiling.
3. No `CREATE TEMP TABLE`.
4. `db.batch([])` throws; guard empty batches.
5. `wrangler d1 execute --command` silently ran only one statement; use `--file`
   for more than one.
6. A `CHECK` that evaluates to NULL passes. Write date checks as
   `date(x) IS x`, not `date(x) = x`.
7. Computed columns need an explicit `CAST`.

## Concurrency

8. **Claim work atomically.**
   `INSERT … SELECT … ON CONFLICT DO NOTHING RETURNING`.
9. **Order the checks.** Count lockout attempts before comparing credentials;
   check the idempotency key before the free-slot check and before consuming a
   single-use bot-check token.
10. **Test the race for real.** LCC's `Promise.all` of three bookings was a real
    race against the database. See `verification.md` §12.

## Data

11. **Encrypt personal fields bound to their row.** See `privacy-security.md` §9.
12. **Seed and publish must derive the same rows; test that they do.** See
    `data-and-sources.md` §2.
