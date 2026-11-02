# Verification: proving it works

The most repeated lesson in the ledger: a check that has never failed has not
been tested, and only the built artefact on the real runtime proves what ships.

Tags: `verification`

## Guards and health checks

1. **Every guard gets a positive control: break the thing once and watch the
   check fire.** [YF, ATF, 45D, GB]
   - YF checked its secret-scan regex against real output (supabase-js ships the
     literal `sb_secret_`).
   - ATF's fake-clock test still passed with the guard removed.
   - 45-days' calendar test expected `'\;'`, which is just `';'`, so it passed
     vacuously.
   - Ghat Batteries ships a test proving each integrity rule fires.
2. **Point every health check at a deliberately broken configuration.** [YF]
   Two YF checks reported ok against a broken environment: `getUser()` returns
   early without a network call when there is no cookie, and a HEAD count hid
   the "table does not exist" error because it asked for no body.
3. **A gate that never ran is not a gate.** [E20] E20's "Lighthouse ≥ 95" deploy
   gate sat behind a CI step where Chromium failed to launch. Its first real run
   scored 0.70–0.89.
4. **A green assertion over an empty table is a smoke test, and the output should
   say so.** [YF] YF's access probe reported 19/19; six of those assertions ran
   over tables with no rows.
5. **Exercise both branches of every conditional block.** [YF] Nine YF blocks had
   only ever been seen in their "absent" state. A 40-line PostgREST stand-in with
   an empty/full switch proved all eleven gates flip.

## Test what ships, where it ships

6. **Test the built artefact on the deploy runtime, not the source on the dev
   server.** [YF, LCC, PS]
   - YF's impact counter shipped as a syntax error through `is:inline` while its
     fixture passed.
   - An LCC Worker exported a constant: every Node test passed and workerd
     refused to start.
   - PS's share-card renderer worked under `wrangler pages dev`, which does not
     enforce the 10 ms CPU limit, and failed with error 1102 in production.
7. **A test harness must build what it tests.** [ATF, 45D] A Playwright suite
   reported green against a stale `dist/` because the preview server serves
   whatever is there. Both sister projects build before previewing from day one.
8. **Test the deploy configuration itself, and read what the deploy printed.**
   [LCC] LCC's admin `SITE_URL` pointed at the admin, and `ALERT_FROM` was a Gmail
   address for two phases. Every test passed because tests set their own
   environment.
9. **When the real dependency is unreachable, test what holds because it is
   unreachable, and name the rest as unverified.** [YF] YF proved its admin gate
   fails closed while the auth server was blocked, and listed the signed-in path
   as untested.

## Fakes and databases

10. **Small fakes are cheap. Say which layer each one replaces.** [RF, YF, LCC]
    40 lines of fake Supabase rendered RF's whole dashboard. YF's stub recorded
    request bodies to prove an empty string is never stored. LCC ran its Hono
    admin inside Playwright through `context.route`. None of them proves the
    database's access rules.
11. **Prefer a test the database rolls back for you.** [YF] A probe that needed
    manual cleanup left rows in a staff inbox. YF switched to inserts that fail a
    foreign-key check, and runs each migration inside `begin; … rollback;` before
    pushing it.

## Browser tests

12. **Repeat new browser tests before trusting them.** [LCC, ATF] `--repeat-each=3`
    exposed three races that one green run hid. Playwright's `clock.install()`
    lets time flow unless paused. LCC's `Promise.all` of three bookings was a
    real race against the database.
13. **Detect a reload with something a reload destroys.** [RF] Playwright counts
    `history.replaceState` as a navigation; RF sets a marker on `window` instead.
14. **Assert on the element or the request, never on a string that can appear
    elsewhere.** [LCC, YF] An LCC test matched an attribute name inside an
    inlined language script. YF asserts on recorded request bodies, not on the
    form.
15. **Test date- and flag-dependent behaviour by moving the input, never by
    waiting.** [VT, 45D] VT moved the date, built and grepped `dist/`. 45-days
    seeds saved state and mocks the clock.

## Specs, thresholds and rendered output

16. **Run a threshold against known-good data before shipping it.** [RF] RF's
    "more than 10% above last week" flag fired on five well-designed weeks per
    distance. The rule is about the peak so far, not adjacent weeks.
17. **Turn the spec's own tables into tests, and keep hand-written values as
    fixtures.** [TLWR, RF, BK] TLWR wrote the spec's HUD values into `expect()`
    calls before any UI. RF kept 30 hand-written date strings as the fixture for
    the formatter that replaced them. Brand Kit proved 273 of 273 generated
    prompts match the design file.
18. **For anything that changes over time, review rendered frames, not code.**
    [RS, TLWR] Reelsmith renders stills before motion (four PNGs take a minute, a
    render twenty), then a contact sheet per beat scored 1–10. TLWR: screenshot
    the last frame, not only the first; half the rings were missing at 40,075 km.

## CI gates

- Let deterministic checks block (axe-core, byte budgets) and noisy scores warn.
  The same page on the same commit scored 0.82 and 0.97 in Lighthouse. [E20, VT]
  See `disagreements.md` → Lighthouse as a gate.
- Rules that protect people (patients, donors, minors) have tests. "There is no
  test suite" is no longer an accepted blind spot. [LCC, CMS]
