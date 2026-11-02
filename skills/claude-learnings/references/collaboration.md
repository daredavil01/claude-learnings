# Working with Claude: questions, scope, sources

The costliest mistakes in these logs started before any code: a guessed reading
of the request, or a document trusted over the repository.

Tags: `collaboration`, `scope`

## Asking

1. **Ask when two readings lead to different work; decide when they lead to the
   same work.** [YF, PS] YF's first brief forked three ways (scope, deliverable,
   design fidelity); three questions took one round trip. The Wanderer's Atlas
   redesign began from "ask everything, assume nothing".
2. **Lead with a recommendation and state its cost; never offer an option you
   would refuse to build.** [YF] All six of YF's setup questions were answered
   with the recommended option, so the recommendation carries the weight.
3. **Check a set of answers for contradictions before acting on them.** "One
   scroll page", "each chapter as a query parameter" and "read on load only" only
   fit once the whole plan was reshaped around them.
4. **For a vague request, investigate first; the investigation survives a change
   of mind.** [PS, PW2] "Modernize all the tools" (six tools, about 12,000 lines)
   was audited at 375 and 1280 px before any code. The request narrowed to a plan
   and widened again within the hour, and the plan became the build order. In
   the owner's words (PW2): "a set of vague instructions leads to a lot of messed
   up code".
5. **Before porting someone's own work, settle where it lives, whose voice it
   keeps and how long it lasts.** [PW2] The technical shape followed from those
   answers.
6. **Precise, scoped feedback produces precise changes.** "Fix only mobile view…
   no change for desktop" became a one-token edit. Ask for that precision when
   feedback is broad.

## Trusting documents

7. **Check what the repository contains before trusting a document that
   describes it.** [YF] YF's status file described a four-phase migration; the
   repository had no commits and no `package.json`.
8. **Keep an explicit authority order, and log every conflict with its
   resolution.** [ATF, 45D, YF, RF, LCC] PLAN.md beats BUILD.md in ATF and
   45-days (BUILD.md was written for another stack); the concept note wins for
   words and the canvas for layout. CLAUDE.md beats the plan in YF and RF. LCC's
   learnings "never override the docs".
9. **Adapt a rules file from another project instead of copying it; grep the
   result for the old project's names.** [YF, CMS] YF's inherited CLAUDE.md named
   the wrong district and a migration file that would never exist.
   cms-site-planner writes all evidence generically for this reason.
10. **When two sources disagree, split the expensive-to-reverse decision from the
    cheap one.** [YF] YF built the spec's schema and shipped the design's narrower
    admin screen, instead of averaging them.
11. **Read the design before choosing the stack.** [LH, VC] Learning Hub chose a
    docs framework before seeing a 12-screen app design, then dropped it. VC
    ported a finished CSS-3D prototype instead of spending weeks rebuilding it in
    React Three Fiber.

## Shared workspace

12. **Another session may be working in the same repo.** [PS, LCC] A second Claude
    Code session had already landed most of the Atlas mobile fix. LCC found a
    config file rewritten mid-session and another session's dev server holding
    the port. Check `git status` for files you did not touch.
