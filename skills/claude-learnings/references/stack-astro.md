# Astro

Astro-specific traps, gathered from across the ledger. Load only when the repo
uses Astro (YF, RF, 45D, ATF, VT, PS and others).

Tags: `astro`

## Toolchain

1. **TypeScript 7 broke `@astrojs/check` and typescript-eslint** in two repos
   [YF, LCC]; npm also paired eslint-plugin-astro 1.7 with ESLint 10. Read
   `peerDependencies` before pinning.
2. **Astro 7 needs Node 22.23.4 or later.** [VT] Pin it with `.node-version` and
   `engines`, or the Cloudflare Pages build fails.
3. **Astro 7.3.6 to 7.4.0 were all under 14 days old** when last checked; pin
   exact versions at least 14 days old.
4. **A prop named `as` silently turned off type checking for a component.** [YF]
   `astro check` stayed green over 26 unchecked call sites. Prove the binding with
   a deliberate type error.
5. **Never run `astro check` or `prettier --write` under a running dev server**,
   and expect the first dev start after them to fail. [LCC]

## Preview and build

6. **`astro preview` keeps a lock, and a second one exits quietly.** Use
   `--ignore-lock` or stop the first. [LCC]
7. **The preview server serves whatever is in `dist/`.** Build before every test
   run. [ATF, 45D]
8. **`is:inline` scripts skip bundling and type checks.** YF's impact counter
   shipped as a syntax error through `is:inline` while its fixture passed. Test
   the built page.
9. **Scoped-style attributes must be forwarded** to child elements you style, or
   the styles silently miss (YF's heading rendered dark green on dark green).
   Verify with computed style.

## Rendering

10. **Anything that depends on the visitor's device or time zone renders after
    hydration.** Server and client produce the same HTML first.
11. **Set theme and saved state in an inline head script before paint** to avoid
    layout shift. See `layout-css-a11y.md` §7.
