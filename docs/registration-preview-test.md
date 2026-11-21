# Vercel preview: synthetic Google Sheets submission test

This branch adds a deliberately **synthetic-only** Turnstile + Cloudflare Worker test panel on the Join Us page. It does not deploy or alter the Cloudflare Worker. **Do not merge into `main` as a production rollout.**

## Preview isolation

- The test panel is included only when Vercel builds this exact branch with `VERCEL_ENV=preview` and `VERCEL_GIT_COMMIT_REF=preview/registration-sheets-test-2026-11-21`.
- Outside that condition, the test panel is absent and the pre-existing form is unchanged.
- On this preview, the existing contact form fields and submit button are disabled, so visitors cannot send personal details via `mailto:` or the Worker.
- The test panel contains **no editable inquiry fields**. It generates a UUID and sends fixed fictitious data, e.g. `FICTIONAL TEST - NO REAL PERSON`, `example@example.com`, and `+212600000000`. Only Turnstile must be completed.
- The Worker remains the backend deployed separately at `https://scouts-registration-api.starofficiel2006.workers.dev/submit`. No private service-account or Turnstile secret is in this branch.

## Mandatory configuration before a real end-to-end test

1. Deploy this branch as a Vercel Preview, then copy its **exact** preview URL, such as `https://<deployment>.vercel.app`. Do not include a path or trailing slash in the origin.
2. In Cloudflare Turnstile, add that **specific** preview hostname to the widget's allowed hostnames. The Turnstile public site key is baked into the test component.
3. In the **separate Worker source folder**, modify `wrangler.jsonc`:
   - `ALLOWED_ORIGINS`: add `https://<deployment>.vercel.app` exactly (no trailing slash).
   - `EXPECTED_TURNSTILE_HOSTNAMES`: add `<deployment>.vercel.app` exactly, without scheme.
   - Preserve the already configured allowed production hostnames for later use, or remove them while testing for stricter isolation.
4. **Deploy the Worker from its own `worker/registration` folder** using `npx wrangler deploy`, not from the Next.js website root. The provided Worker package is separate from this PR.
5. Confirm the Worker URL still returns `{"status":"ok"}` from `GET /health`.
6. On the Vercel Preview's Join Us page, complete Turnstile and click the button **once**. Verify a HTTP 201 with `success:true` and a matching UUID reference in browser DevTools → Network. Check Google Sheets tab `Inquiries` for exactly one newly appended row with a fictional test name. You may use the reference UUID to correlate the row.
7. Test an expired/reused token and forbidden origin to ensure requests fail. Do not use real family data.

**Important:** The test panel does not verify Google configuration before sending. The Worker health endpoint only verifies the process is running. The Worker code currently does not offer strong idempotency: if a response is lost after a successful append, a manual retry can create another fictional row.

## Data handling and launch boundary

- Keep the Sheet private, and delete test rows after validation.
- Do not add a real-visitor submission form until privacy notice, CNDP formalities, access controls, retention, and end-to-end failure testing are completed.
- The Worker rate limiter, server-side Turnstile verification (hostname and action), CORS origin allowlist, and Sheets authentication remain mandatory. **CORS is not user authentication**.
- Do not paste any Google JSON private key or Turnstile secret into a GitHub issue, PR, Vercel variable, or frontend file.

## Testing

Locally, compile with default environment variables to confirm no test panel is enabled:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

For a preview-only build verification, set `VERCEL_ENV=preview` and `VERCEL_GIT_COMMIT_REF=preview/registration-sheets-test-2026-11-21` before `npm run build`. The Vercel preview itself provides both values automatically if its Git integration is configured normally.
