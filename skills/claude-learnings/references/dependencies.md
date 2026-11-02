# Dependencies, toolchain and dev servers

The lockfile lesson was learned three times in two repos, and promoted to a rule
only after the second time in the same repo.

Tags: `dependencies`, `toolchain`

## Lockfile and versions

1. **Touch the lockfile only when `package.json` changed, and write it with the
   npm that CI uses.** [YF ×2, LH] Cloudflare's build runs npm 10.9.2; a lockfile
   written by npm 11 on Windows failed `npm ci` there three times across two
   repos. Write it with `npx npm@10.9.2 install` and prove it with
   `npx npm@10.9.2 ci --dry-run`.
2. **"Latest" is not a version: read `peerDependencies` before pinning.** [YF, LCC]
   TypeScript 7 broke `@astrojs/check` and typescript-eslint in two repos; npm
   also paired eslint-plugin-astro 1.7 with ESLint 10.
3. **Pin exact versions at least 14 days old, including every peer npm would
   install for you.** Astro 7.3.6 to 7.4.0 were all under 14 days old. npm 10
   installed playwright-core 1.64.1, four days old, beside the test runner's
   1.63.0, and type checks failed.
4. **Pin the build's Node version.** [VT] VT's Cloudflare Pages build failed on
   Node 22.16 because Astro 7 needs 22.23.4 or later; `.node-version` and
   `engines` fixed it.
5. **Pin one engine and record why.** [RS, PS] Reelsmith pins Remotion so Claude
   stops switching between Remotion and Python from run to run, and bumps every
   `@remotion/*` package together. PS pins satori 0.32.0 for a recorded reason.

## Dev servers

6. **Expect the first dev start after an install, a type check or a build to fail,
   and start it again before debugging.** [LCC] Vite's optimiser leaves workerd
   pointing at a stale chunk. Never run `astro check` or `prettier --write` under
   a running dev server.
7. **Stop a server before rebuilding what it serves.** [LCC ×2] `wrangler dev`
   served 404s and 500s after `dist/` was rebuilt under it, twice. `astro preview`
   keeps a lock, and a second one exits quietly (`--ignore-lock`). On Windows,
   stop the dev server before `npm ci`.
8. **Poll a health URL before driving a server that was just started.** See
   `agent-environment.md` §10.

## Generated types and type checking

9. **Generated Worker types have side effects.** [LCC] `wrangler types` reads
   `.dev.vars`, writes literal types for variables and merges into the DOM's
   `Element`. Keep Worker code in its own tsconfig and move `.dev.vars` aside
   first.
10. **In Astro, a prop named `as` silently turned off type checking for a
    component.** [YF] `astro check` stayed green over 26 unchecked call sites.
    Prove the binding with a deliberate type error.
