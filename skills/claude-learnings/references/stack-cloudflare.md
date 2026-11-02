# Cloudflare Workers and Pages

Most of these sites deploy to Cloudflare. Its limits are not enforced locally, so
they surface in production. Load only when the repo deploys to Cloudflare.

Tags: `cloudflare`

## Runtime limits

1. **Workers Free allows 10 ms of CPU and 50 subrequests per request, and local
   dev enforces neither.** [PS, LCC] Share-card rendering (about 400 ms) moved to
   build time after production errors (error 1102). The YouTube sync is driven
   one page at a time from the browser. HTML-to-text of 0.5 MB runs in the
   browser.
2. **workerd is not Node.** [LCC] There is no `Image`, `document` or
   `createObjectURL`; the main module may export handlers only (exporting a
   constant stopped workerd from starting while every Node test passed); Worker
   types merge into the DOM's `Element` (see `dependencies.md` §9).

## Pages

3. **Pages Functions route every file under `functions/`.** [PS] Keep helpers
   outside it; a Function at `/ask` would shadow the `/ask` page.
4. **On Pages a missing static file is not a 404.** [VC] It returns the app shell
   as 200 text/html, so a missing share image or `/.well-known` file silently
   appears to exist. VC's middleware advertised share images that were never
   deployed. Check content type, not status.
5. **Responses a Worker builds get no `_headers` rules; `ASSETS.fetch` responses
   do.** Each Worker-built path sets its own security headers.
6. **Pages builds with npm 10.9.2 and its own Node version**, whatever your
   machine runs. See `dependencies.md` §1 and §4.

## Accounts and deploys

7. **Run `wrangler whoami` before any deploy.** [LCC] LCC had two accounts. A new
   account has no workers.dev subdomain, Email Routing is not Email Sending, and
   `wrangler secret put` redeploys the deployed code, not the repo.
8. **Free-plan cron triggers are per account.** [LCC] Five triggers, preview
   Workers included, so jobs share triggers and dispatch inside.
9. **Dashboard settings matter as much as code.** [PS] Cloudflare's AI Crawl
   Control returned 403 to GPTBot and ClaudeBot while `robots.txt` welcomed them.
10. **Request logs are a data store.** Turn off invocation logs that would store
    tokens and IPs. See `privacy-security.md` §3.
11. **Stop `wrangler dev` before rebuilding `dist/`.** See `dependencies.md` §7.

For planning-time Cloudflare rules on a new CMS site, see cms-site-planner.
