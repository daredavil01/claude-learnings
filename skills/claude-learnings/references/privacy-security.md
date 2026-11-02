# Privacy and security

The clinic (LCC) and the main site (PS) went furthest here; the rest contributed
the small rules that keep a static site from leaking.

Tags: `privacy`, `security`

## Data minimisation

1. **Make no third-party runtime requests unless the page needs one; a request
   identifies the site, never a person.** Crossref's "polite pool" asks for an
   email address, and the site's URL is enough. Fonts are self-hosted.
2. **Source documents carry personal data.** [VT] VT's documents held personal
   phone numbers; only the event email is published. Development and test data
   are made up.
3. **Request logs are a data store.** [LCC] Workers invocation logs keep every URL
   and header, which would have stored booking tokens and IP addresses; they are
   turned off.
4. **Settle consent before an analytics tag goes live.** [VC] VC's GA4 tag sets
   cookies and the consent question is still open.

## Responses and errors

5. **Never spread a database row into a JSON response; list the fields by hand.**
   The next migration's new column would otherwise publish itself.
6. **Errors are verbose inside the gate and opaque at the gate.** [PS, LCC] Raw
   login errors reveal which accounts exist. PS's stats endpoint returned
   `err.message` to the public.
7. **Sanitise anything a client sent before rendering it on your origin.** [PS]
   PS's shared-conversation pages carried a stored XSS through raw HTML and
   `javascript:` links. A canonical-path redirect was an open redirect for
   `//evil.example/`.

## Auth, keys and encryption

8. **Guard a dev-only sign-in twice:** an environment variable and a localhost
   host check.
9. **Encrypt personal fields bound to their row.** [LCC] AES-GCM with
   `table.column:id` as additional data means a copied ciphertext fails to open,
   and a CHECK on encrypted columns refuses plaintext.
10. **Scope privileged keys to one step or one module.** [RF] A workflow exposed
    the service-role key job-wide to npm install scripts. RF reads Strava tokens
    from one service-role module, with zero RLS policies on that table.
11. **Check a secret-scan regex against real output.** supabase-js ships the
    literal `sb_secret_`. See `verification.md` §1.

Database grants and RLS: `stack-supabase.md` §10. Worker-built responses and
security headers: `stack-cloudflare.md` §5.
