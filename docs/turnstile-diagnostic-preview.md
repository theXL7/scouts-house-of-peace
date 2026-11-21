# Turnstile diagnostic preview (synthetic data only)

This branch is for testing the Cloudflare Turnstile widget and the standalone Sheets Worker without collecting real visitor data. **Do not merge this test branch into `main`.**

## Safe preview behavior
- The synthetic test panel renders only when `VERCEL_ENV=preview`, the environment value set by Vercel for preview deployments.
- The existing inquiry form is disabled in that environment. The test panel never reads its values.
- The panel's POST sends fixed invented values and a unique UUID. It must not be used for real pre-registrations.
- Production builds (`VERCEL_ENV=production`) omit the panel and retain their existing form behavior.
- The test panel shows the Turnstile **client-side error code** when `error-callback` runs. A script-load problem has a distinct message.
- No secret keys or Google service-account credentials are included here.

## Test procedure
1. Deploy this branch to Vercel Preview and open its `/join-us/` page. Confirm the synthetic panel appears and the form below is disabled.
2. In Turnstile widget hostname management, add the **exact** `*.vercel.app` preview hostname shown in the browser.
3. In the separate Cloudflare Worker `worker/registration/wrangler.jsonc` add:
   - `ALLOWED_ORIGINS`: the complete origin (scheme + hostname, no trailing slash)
   - `EXPECTED_TURNSTILE_HOSTNAMES`: hostname only (no scheme)
   Then deploy the **standalone Worker**, not the Next.js website.
4. If Turnstile fails, record only its error code. Do not copy private tokens or JSON keys.
5. Test in a private window without extensions; if available, try a second browser or network. Review DevTools Console for the Turnstile error code.
6. Only after the challenge succeeds, click the fictional test button ONCE. Confirm a 201 response with the same UUID and one synthetic row in the private Google Sheet.
7. Delete test rows after verification. The public Worker still needs server-side synthetic-only or private access restriction before guaranteeing no arbitrary data can reach the Sheet.

## Common diagnostic codes
- `110200`: hostname not authorized on Turnstile widget.
- `110100`: invalid site key.
- `200500`: challenge iframe load issue.
- `600010`: generic challenge execution failure, often environment-related.

## Production protection
This branch is deliberately draft-only. A merge could still affect the preview environment for later branches; keep it isolated. Worker and Sheet are not modified by this PR. Before collecting real personal data, perform privacy/legal review, access controls, retention policy, and backend abuse protection.
