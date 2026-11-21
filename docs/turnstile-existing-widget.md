# Existing Cloudflare Turnstile widget — integration manifest

**Environment: test only. Do not merge this PR to production.**

## Verified source mapping

- Frontend project: static Next.js site, deployed on Vercel.
- Protected surface: a **synthetic-only** test form on the Join Us page. The public inquiry form remains disabled on this preview and the existing production form is unchanged.
- Frontend component: `components/RegistrationPreviewTestPanel.tsx`.
- Existing Turnstile **public** Site Key: `0x4AAAAAAGLKBeonmZ38khRe`.
- Widget action: `registration_inquiry`.
- Frontend endpoint: `POST https://scouts-registration-api.starofficiel2006.workers.dev/submit`.
- Existing server code: `worker/registration/src/index.mjs` in the previously provided standalone Worker ZIP. **This source has not been committed to this GitHub branch, and it does not prove the active Cloudflare deployment version.**
- Server-side verification: `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- **Private** Cloudflare Worker secret binding: `TURNSTILE_SECRET_KEY`; value must correspond to Site Key above. Never place it in code or chat.
- Worker environment: default/production Worker `scouts-registration-api`. No new Worker was created here.
- Expected hostname configuration: `EXPECTED_TURNSTILE_HOSTNAMES` (hostname only; must include the *actual* Vercel preview hostname).
- CORS configuration: `ALLOWED_ORIGINS` (scheme + hostname; must include the *actual* Vercel preview origin).
- Google Sheet secret binding: `GOOGLE_SERVICE_ACCOUNT_JSON`. This is distinct from the Turnstile secret.
- Google Sheet ID variable: `SHEET_ID` (must identify the private Sheet whose `Inquiries` tab you are checking).

## Existing-widget recovery constraints

Cloudflare Spin's existing-widget flow requires approval of a known, **absolute-path** Wrangler executable (version 4.109+), exact Cloudflare account/Worker/environment, and the target secret-binding mapping *before* any secret is retrieved or written. No automated retrieval was performed in this PR, and the user should not share any private key or retrieved credential in chat.

The Cloudflare dashboard can be used to check the Widget Site Key and safely set the corresponding secret on the existing Worker. The secret cannot be validated simply by checking its name in the dashboard. No secret values should appear in GitHub or Vercel.

## Current contract

The Worker requires a nonempty token (max 2048 bytes), calls canonical Siteverify **on the server**, and accepts only `success === true` with `action === registration_inquiry` and an exact expected hostname. A failed check must reject the request before calling Google Sheets. The browser submits the token only to the Worker; it never handles the private secret.

Frontend tokens are single-use and reset after every request. The browser should never claim a Google Sheets write on the basis of Turnstile success alone.

## Verification still required

1. Confirm the active Cloudflare Worker has `TURNSTILE_SECRET_KEY` for the **same widget** as Site Key `0x4AAAAAAGLKBeonmZ38khRe` (without exposing its value).
2. Confirm exact preview hostname is present in the widget allowed hostnames and both Worker allowlists.
3. Open the synthetic test preview; complete Turnstile and submit once.
4. Record the **HTTP status and sanitized error code** printed by the test panel (this diagnostic is safe to share). An HTTP 403 `verification_failed` points to Turnstile/siteverify; a 503 `service_unavailable` points to backend configuration or an upstream operation (possibly Google).
5. If a 201 response is shown, compare its UUID reference to exactly one row in the private Google Sheet `Inquiries` tab. If you see 201 but no row, compare **SHEET_ID** privately against the document ID you opened in Google Sheets.
6. Verify token replay fails with a second request using the same token (should be rejected), if using an appropriate authenticated test harness. Do not paste raw tokens or payloads in support messages.

This repository update adds source files and documentation only. It does **not** perform a Cloudflare deployment, read a secret, or claim end-to-end success.

Docs: https://developers.cloudflare.com/turnstile/spin/ and https://github.com/cloudflare/skills/blob/main/skills/turnstile-spin/SKILL.md
