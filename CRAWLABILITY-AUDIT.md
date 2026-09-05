# Crawlability and factual retrieval audit

Scouts Maison de La Paix — 5 September 2026

The repository changes are implemented and verified against a production static export. They have **not been deployed**. Production will continue serving the old content until deployment; its Cloudflare policy also needs the external changes in section J.

## A. Problems discovered

| Finding | Why it affected retrieval | Source / resolution |
| --- | --- | --- |
| The entire Programs explorer was inside `Suspense` with an empty fallback and called `useSearchParams()`. | Static export substituted a client-rendering bailout for the activity families, cards and archive. A successful HTTP response contained only the surrounding page shell. | `components/ProgramsPage.tsx`, `components/ProgramsActivityExplorer.tsx`. Removed the suspending query read and the outer empty fallback. |
| Impact counters initialized to zero and cards started at `opacity-0`. | Raw HTML reported `0+`, and no-JavaScript visitors could not see the cards. | `components/Impact.tsx`. Initial text now contains the real values and remains visible. |
| Category links used `?category=...`; archive details and source links were rendered only after opening a modal. | Categories lacked independently meaningful URLs; full reports could be absent from the HTML and lacked reliable citation targets. | `lib/activities.ts`, `components/ProgramsActivityExplorer.tsx`. Added static category/year routes, native disclosures, source text and story anchors. |
| The archive total was hardcoded to 100. | It did not reflect the current 97 documented archive entries. | `components/ProgramsActivityExplorer.tsx`. Totals now derive from the data. The separate, published impact claim of **100+ activities** is preserved. |
| Only the selected scouting-stage detail panel was rendered. | Most goals, methods and unit information required a click even though other Culture sections were static. | `components/ScoutStagesShowcase.tsx`. All four panels now render initially; JavaScript enhances selection. |
| Language selection used buttons and router navigation. | Separate translations already existed, but the language UI itself provided no crawlable or no-JavaScript links. | `components/Header/Header.tsx`. EN/FR/AR are real links, retaining enhanced navigation and query/hash state. |
| The non-www host redirects to www, while canonicals, the sitemap and social URLs used non-www. | Discovery signals pointed to redirecting URLs rather than the served canonical host. | `lib/seo.ts`, `.env.example`, `app/sitemap.ts`. Standardized on `https://www.scoutsmaisonpaix.org` and trailing slashes. |
| Production robots policies differed by hostname. | The apex served Cloudflare-managed `Google-Extended: Disallow: /`; the www host served the repository's generic allow rule. The apex response omitted the sitemap. | External Cloudflare configuration; not present in this repository. See J. |
| The sitemap listed only 12 core localized pages and used build time as `lastmod`. | New collections needed discovery, and build timestamps did not establish editorial updates. | `app/sitemap.ts`. Now 57 canonical URLs, reciprocal language alternates, no fabricated modification dates. |
| Two responsive hero copies used `<h1>` and included hidden SEO wording. | Text extraction duplicated the main heading and unnecessary wording. | `components/Hero.tsx`, `app/globals.css`. One HTML H1 remains; the mobile presentation retains an accessible heading role and its existing appearance. Removed the hidden SEO wording. |
| Join FAQ answers existed in HTML, but opening them depended on JavaScript; the form had no native submission action. | No-JavaScript visitors could not expand most answers. A form fallback could submit personal fields to the current page URL. | `components/JoinFaqAccordion.tsx`, `components/RegistrationInterestForm.tsx`. Native FAQ disclosures and a POST-to-mailto fallback preserve the existing email workflow. |
| Entity wording was general, and geographic identity was chiefly in metadata. | A text-only reader had less direct evidence of who the organization serves and where it operates. | EN/FR/AR `houseOfPeace.intro` in `messages/`. Added concise factual identification using existing project facts. |
| International map destinations were only in interactive SVG tooltips/accessibility labels. | Ordinary text extraction could miss the country/connection list. | `components/GlobalMovement.tsx`. Added a compact native disclosure using the same existing node text. |
| Culture descriptions were vague, WebSite schema was absent, JSON-LD serialization did not escape `<`, and future-event schema hardcoded Taourirt for every venue. | Less clear page identification; future text containing a script delimiter could break markup; non-Taourirt activities could receive an incorrect address. | `lib/seo.ts`, `lib/activities.ts`. Improved descriptions, added appropriate schema, escaped JSON-LD, and removed unsupported venue-address assumptions. |

The Programs diagnosis was confirmed in a direct production download: HTTP 200, `BAILOUT_TO_CLIENT_SIDE_RENDERING` present, zero activity cards, and no Ifrane activity text outside scripts. This behavior matches the framework's documented [static rendering behavior for useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params).

### Architecture audit

- **Stack:** installed Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4. App Router, with `(default)` and `[locale]` root layouts.
- **Rendering/deployment:** `next.config.ts` uses `output: "export"`, `trailingSlash: true`, and unoptimized static images. Build output is `out/`. Production www responses identify Vercel; the apex response identifies Cloudflare and redirects to www. An optional GitHub Pages workflow also exists.
- **Content sources:** checked-in TypeScript data in `messages/`, `lib/activities.ts`, `lib/activity-archive.ts`, and the Culture component. No CMS, activity API, database, or authenticated content fetch is needed.
- **Localization:** merged dictionaries are selected at build time by URL. `/` is English; `/fr/` and `/ar/` are separate generated pages. No localStorage, cookies, browser language, or post-load translation request gates content.
- **Counters:** factual values come from `messages/en.ts`; translations provide labels. Values were already 16+, 1,000+, 100+, and 7+; those values are unchanged.
- **Existing strengths:** Join Us fees/documents/contact information and most Culture content were already static. Core metadata, organization schema, language alternates, and preview noindex handling already existed and were reused.
- **Client behavior:** filtering, archive previews, map interactions, stage selection, count animation, the responsive menu, analytics and mailto form enhancement. None needs to provide the initial authoritative activity/registration/culture text.
- **Security/access:** no repository middleware, user-agent filtering, authentication gate, API route, rate limiter, Cloudflare Worker or private/admin route was found. Lazy images do not gate text. Hosting account rules cannot be determined from source alone.

## B. Changed files

| File | Change |
| --- | --- |
| `.env.example` | Documents the canonical www origin. |
| `app/(default)/page.tsx` | Adds WebSite data alongside existing Organization data. |
| `app/[locale]/page.tsx` | Same structured data for French and Arabic homepages. |
| `app/(default)/programs/[category]/page.tsx` | Generates the six English category routes and metadata. |
| `app/[locale]/programs/[category]/page.tsx` | Generates the twelve French/Arabic category routes. |
| `app/(default)/programs/archive/[year]/page.tsx` | Generates nine English yearly archive routes. |
| `app/[locale]/programs/archive/[year]/page.tsx` | Generates eighteen French/Arabic archive routes. |
| `app/globals.css` | Preserves heading typography for the semantic mobile hero change. |
| `app/robots.ts` | Explicit retrieval policy; separate GPTBot training opt-out; preview protection retained. |
| `app/sitemap.ts` | All 57 canonical routes with language alternates; removes build-time `lastmod`. |
| `components/ArchiveStoryText.tsx` | Shared initial-HTML report paragraphs and official source links. |
| `components/ProgramsArchivePage.tsx` | Static archive collection layout, full reports, images, category links and anchors. |
| `components/ProgramsPage.tsx` | Removes the empty explorer Suspense boundary; supplies category context and one build date; adds breadcrumbs. |
| `components/ProgramsActivityExplorer.tsx` | Static initial content, non-suspending filter enhancement, real links, disclosures, source-derived totals, semantic cards/dates and stable story links. |
| `components/Impact.tsx` | Factual initial text, visible cards and stable accessible values during animation. |
| `components/Header/Header.tsx` | Link-based language controls and preservation of the corresponding path/query/hash during enhanced switching. |
| `components/Hero.tsx` | One HTML H1, mobile heading semantics, removal of hidden SEO wording. |
| `components/JoinFaqAccordion.tsx` | Native single-open disclosures instead of state-dependent expansion. |
| `components/JoinUsPage.tsx` | FAQPage schema from existing answers; correct navigation for both anchors and localized URLs. |
| `components/RegistrationInterestForm.tsx` | Native mailto POST fallback; existing JavaScript form handler preserved. |
| `components/ScoutStagesShowcase.tsx` | All four stage details in initial HTML; enhanced selector retains the current panel design. |
| `components/ScoutingCulturePage.tsx` | BreadcrumbList data; substantive culture copy preserved. |
| `components/GlobalMovement.tsx` | Text disclosure for existing international connections. |
| `components/Footer.tsx` | Adds the localized Culture link. |
| `lib/activities.ts` | Stable category/share URLs, deterministic date classification, and accurate future-event URLs/locations. |
| `lib/program-seo.ts` | Central metadata and breadcrumb helpers for category/year collections. |
| `lib/seo.ts` | Canonical host normalization, collection metadata, richer Culture descriptions, WebSite/breadcrumb helpers and safe JSON-LD serialization. |
| `messages/index.ts` | Programs navigation points to the corresponding localized public page. |
| `messages/en.ts` | Factual organization introduction, consistent brand spelling and Culture footer label. |
| `messages/fr.ts` | French equivalents. |
| `messages/ar.ts` | Arabic equivalents. |
| `package.json` | Adds typecheck, static-preview and crawlability-test commands. No dependency was added. |
| `scripts/serve-export.mjs` | Local static HTTP preview used by tests and manual verification. |
| `scripts/crawlability.test.mjs` | 75 lightweight HTTP/content/metadata/policy regression tests using existing dependencies. |
| `README.md` | Test/preview instructions, rendering/canonical notes and corrected deployment documentation. |
| `CRAWLABILITY-AUDIT.md` | This report. |

Pre-existing workspace edits were preserved. In particular, `lib/activity-archive.ts` is byte-identical to its state at the start of this task; its existing additions and the four new activity photos were not authored or replaced by this audit. Existing updates in `lib/activities.ts` and the explorer were retained. `qa-artifacts/` was left alone. Audit snapshots, raw samples and browser images are under ignored `tmp/crawl-audit/`.

## C. Final rendering architecture

| Content | Rendering |
| --- | --- |
| Home, Join Us, Culture and Programs | Build-time prerendered static HTML. |
| Categories and yearly archives | SSG through `generateStaticParams`, exported to stable HTML files. |
| Activity cards | All 13 exist in initial Programs HTML with titles, dates, descriptions, categories, locations, image alt text and links. JavaScript changes visibility; it does not fetch the cards. |
| Archive | All 97 reports and their source links exist in initial Programs HTML. Native disclosures support no-JS access. Year pages display full reports directly and offer stable story fragments. |
| Impact | Actual values are visible in initial HTML. Animation is an enhancement; accessible values remain constant. |
| Scouting stages | All four detail panels exist in initial HTML and are visible without JavaScript. After hydration the existing selector shows the active panel. |
| FAQ | Every answer is HTML, with native expandable summaries. |
| Request-time SSR | None required; the host serves the static export. |

Activity status and any upcoming Event schema share a build-time date in the Africa/Casablanca calendar. Rebuild when activity data changes or an upcoming date passes. This avoids hydration differences between server/browser clocks; there is no runtime API or automatic revalidation service.

The main Programs HTML is approximately 454 KB uncompressed because it now includes the actual content. Category and year pages provide smaller focused retrieval targets. No hosting upgrade, framework upgrade, image regeneration, or additional runtime dependency was introduced.

## D. Final repository robots.txt

```text
User-Agent: *
User-Agent: Googlebot
User-Agent: OAI-SearchBot
User-Agent: Google-Extended
Allow: /

User-Agent: GPTBot
Disallow: /

Sitemap: https://www.scoutsmaisonpaix.org/sitemap.xml
```

Generic crawlers, Google Search and OAI-SearchBot may retrieve public content. GPTBot's training opt-out is separate from ChatGPT Search, as documented in [OpenAI's crawler policy](https://developers.openai.com/api/docs/bots). This preserves the training preference observed on the apex host while aligning both hosts on retrieval after deployment/configuration.

Allowing Google-Extended supports the requested Gemini access. Google's token covers both Gemini training and grounding, while Google Search AI features use Googlebot. See [Google's crawler definitions](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) and [Search AI feature requirements](https://developers.google.com/search/docs/appearance/ai-features).

Vercel preview builds retain `Disallow: /`, noindex metadata and an empty sitemap. No nonexistent private endpoints were added to discovery. If private functionality is introduced later, it needs genuine access control; this application currently has none.

## E. Sitemap and stable URLs

57 URLs: 19 per language, on the www HTTPS host with trailing slashes.

- `/`, `/fr/`, `/ar/`.
- `/programs/`, `/join-us/`, `/scouting-culture/`, plus their `/fr/` and `/ar/` equivalents.
- `/programs/{camps,workshops,service,exchange,training,scout-life}/`, in all three languages.
- `/programs/archive/{2018,2019,2020,2021,2022,2023,2024,2025,2026}/`, in all three languages.

Every listed URL has unique metadata, an H1, a self canonical, language alternates, and incoming ordinary HTML links. Tests resolve every internal link and fragment. Queries, fragments, 404s, APIs, preview URLs and redirects are excluded from the sitemap.

Existing homepage anchors for About (`#house-of-peace`), Impact (`#impact`) and Contact (`#contact`) remain useful and static. No thin duplicate pages were created for those sections. Existing category queries and activity fragments still work. Activity share links now point to the canonical category plus the activity ID; archive story links point to a full yearly collection plus the story ID.

## F. Multilingual behavior

The existing architecture remains: English at `/`, French under `/fr/`, Arabic under `/ar/`; there is no new `/en/` duplicate. Each URL returns translated text directly. Document `lang` and Arabic `dir="rtl"` are present before JavaScript.

Every equivalent page references EN/FR/AR and `x-default`. The existing Arabic `x-default` choice is preserved. Alternate relationships also appear in the sitemap. Language links preserve the corresponding category/year/page. Enhanced switching additionally retains query parameters and fragments.

The 13 activity cards have existing EN/FR/AR factual translations. Older archive entries often have only a localized title/category summary plus an original report, primarily in Arabic. The original reports are now available alongside those summaries, rather than being discarded. Full editorial translation of all historical reports remains a content task; no new facts or pretend translations were generated.

## G. Structured data

- **Organization:** retained on all three homepages, with existing name, logo, public telephone/email, Taourirt address and official Facebook/Instagram profiles.
- **WebSite:** added on homepages, connected to the Organization ID, with EN/FR/AR languages.
- **FAQPage:** added to Join Us, using the exact existing questions and answers rendered by the page. This does not promise a Google rich result.
- **BreadcrumbList:** added to Programs, categories, yearly archive pages and Culture.
- **Event:** existing support retained only for future/current activities with known dates. It now uses stable URLs and no longer invents a Taourirt address for every venue. On this audit date all 13 curated activities are past; the current export therefore has no upcoming Event entries.

No speculative Article, review, rating, membership price or registration identifiers were invented. JSON-LD parsing and FAQ/content agreement pass automated checks. These are syntax/content checks, not a claim of external rich-result approval.

## H. Crawler verification evidence

The test server serves the actual production files. Tests remove scripts, styles and templates before checking factual content; serialized React data cannot satisfy the tests.

| Raw HTTP route | Result |
| --- | --- |
| `/` | 200; factual organization introduction; actual 16+, 1,000+, 100+, 7+ values; one H1; correct canonical. |
| `/programs/` | 200; **13 activity cards and 97 archive stories**, with every original report paragraph outside scripts. |
| `/fr/programs/` | 200; 13 localized cards, 97 archive stories; French title/description and self canonical. |
| `/ar/programs/` | 200; 13 localized cards, 97 archive stories; Arabic HTML/RTL and self canonical. |
| `/programs/camps/` | 200; Camps H1 and metadata; relevant activities and 23 camp archive entries. |
| `/programs/archive/2026/` | 200; full report paragraphs and stable story/source links. |
| `/join-us/` | 200; 60 MAD registration, 260 MAD uniform, required documents, minor authorization, process, contact and every FAQ answer. |
| `/scouting-culture/` | 200; approximately 18.5 KB of extracted text; all four stage panels and existing anchored culture sections. |
| `/robots.txt`, `/sitemap.xml` | 200; intended policy and exactly 57 canonical public URLs. XML also parsed independently. |
| Unknown category/year/page | 404, not an empty page with HTTP 200. |

An independent HTML/image scan found **zero missing referenced local images**. All image elements on the public routes have alt attributes. Decorative images retain empty alt text.

Evidence files in this workspace:

- `tmp/crawl-audit/raw-results.json` — status, size, card counts and canonical samples.
- `tmp/crawl-audit/*.text.txt` — extracted text with scripts removed.
- `tmp/crawl-audit/browser-results.json` — six passing EN/FR/AR × JS/no-JS browser scenarios and zero runtime/hydration errors.
- `tmp/crawl-audit/*-js.png`, `*-nojs.png` — desktop activity/impact and mobile category captures.
- `tmp/crawl-audit/live-programs.html`, `live-programs.headers.txt`, `www-robots.txt` — pre-deployment production evidence.

Production crawler user-agent probes for Googlebot, OAI-SearchBot, Google-Extended and GPTBot reached the www Programs page with HTTP 200. These are probes from this environment, not requests from verified crawler IPs; they cannot establish how every CDN rule treats genuine crawlers. A robots exclusion is also distinct from an HTTP block.

## I. Tests

| Check | Final result |
| --- | --- |
| `npm run build` | **PASS** — all 62 build entries generated; 57 indexable content URLs plus framework/metadata outputs. All content routes are static/SSG. |
| `npm run lint` | **PASS**. |
| `npm run typecheck` | **PASS**. |
| `npm run test:crawlability` | **PASS — 75/75**. |
| Browser integration | **PASS** — EN/FR/AR with JavaScript enabled and disabled; 13 cards each; filters retain cards; legacy queries; archive preview/Escape; FAQ; stage switching; language navigation; mobile EN/AR category layouts. |
| Runtime/hydration errors | **0** in tested browser scenarios. |
| Additional interaction/visual checks | **PASS** — normal-motion counters reach the source values; language switches preserve query/hash; the mobile menu opens and closes; final activity/FAQ typography inspected. |
| Internal links and fragments | **PASS** across all 57 public pages; all sitemap pages have incoming HTML links. |
| Local image references | **PASS**, no missing files. |

The in-app browser integration failed to connect in this environment. Verification used an installed headless Chromium/Playwright fallback, without adding it as a project dependency. No registration email or external form was submitted. Existing Google Fonts downloads required network access for the production build; the final build used the actual configured fonts.

To repeat locally:

```bash
npm run build
npm run lint
npm run typecheck
npm run test:crawlability
npm run serve:export
```

Then open `http://127.0.0.1:3010`. The automated suite starts its own temporary loopback HTTP server when `CRAWL_BASE_URL` is unset. To check the deployed site after publishing, set `CRAWL_BASE_URL=https://www.scoutsmaisonpaix.org` when running the same suite from this checkout.

## J. Remaining external actions

### 1. Deploy the verified repository

Publish through the existing Vercel project/deployment process. Keep production `NEXT_PUBLIC_SITE_URL=https://www.scoutsmaisonpaix.org`, with an empty base path for this custom domain. The code also normalizes the old non-www value, but updating the setting keeps configuration clear. Ensure production is not built with `VERCEL_ENV=preview`. Retain preview noindex behavior on actual previews.

The task did not push, merge, deploy, change DNS, or modify hosting accounts. The production findings above remain the pre-deployment state.

### 2. Correct Cloudflare's policy on the apex hostname

In the `scoutsmaisonpaix.org` Cloudflare zone, open **Security → Settings**, filter **Bot traffic**, and locate **Set your preference to block training in robots.txt**. Turn off that managed robots injection so the explicit repository policy can be served or reached via the canonical redirect. This is the documented setting controlling the injected block; see [Cloudflare managed robots](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).

Then open **AI Crawl Control → Crawlers** and review the **Action** for the intended retrieval crawlers. Remove any blocking/challenge action affecting Googlebot, OAI-SearchBot or the intended Gemini access. Check **Metrics** by hostname/path/status and **Security Events** for real 403/429/challenge responses. Do not disable unrelated WAF protections. [Cloudflare's crawl controls](https://developers.cloudflare.com/ai-crawl-control/get-started/) describe these controls separately from robots preferences.

Verify **both** `https://scoutsmaisonpaix.org/robots.txt` and `https://www.scoutsmaisonpaix.org/robots.txt` after deployment. The apex should reach or serve the same intended policy and sitemap, without a managed `Google-Extended: Disallow: /` override. Keep the explicit GPTBot opt-out if retaining the training preference.

### 3. Align redirects and caches

Production currently uses a 307 from apex to www. In the existing Vercel domain redirect or Cloudflare redirect rule, make the canonical redirect permanent (301 or 308), preserving paths and queries. Avoid rules in both places that create loops. Check HTTP → HTTPS and the existing trailing-slash handling.

If the old shell or managed policy persists, purge only affected Cloudflare cache URLs (robots, sitemap and changed public pages), and verify Vercel serves the new deployment. No DNS change or paid upgrade is indicated by this audit.

### 4. Request fresh discovery

In Google Search Console, use the existing verified domain property, or the www HTTPS URL-prefix property. Submit `https://www.scoutsmaisonpaix.org/sitemap.xml` under **Sitemaps**. Use **URL Inspection → Test Live URL** on `/programs/`, `/fr/programs/`, `/ar/programs/`, one category and one year page; confirm rendered HTML contains the actual activity text and the declared canonical is www, then request indexing. Monitor indexing and canonical reports. [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) distinguishes sitemap discovery from individual URL requests.

In Bing Webmaster Tools, open the corresponding verified site, submit the same canonical sitemap, and inspect representative Programs/category/year URLs. Existing optional verification environment variables remain supported.

If verified OpenAI crawler requests are challenged despite the public policy, compare security logs with the current published IP ranges linked in [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots). Prefer verified crawler/range controls over a broad security bypass based only on a spoofable user-agent string.

These changes make the content retrievable and attributable. Search engines and AI systems still decide when to recrawl, index, retrieve and cite it; a production citation cannot be guaranteed or verified by local rendering tests.
