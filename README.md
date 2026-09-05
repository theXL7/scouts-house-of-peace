# Scouts Maison de La Paix

Homepage project for **Scouts Maison de La Paix / Scouts of the House of Peace**.

This site is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS

## Project Direction

The website is designed to feel:

- warm
- calm
- dignified
- human

The main association identity is the primary brand. Recognition from the Moroccan Scouting League is treated as a secondary trust signal.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

Create a production build:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

Check types and crawlability after building:

```bash
npm run typecheck
npm run test:crawlability
```

The crawlability suite serves `out/` over HTTP and checks all 57 public routes,
content outside scripts, metadata, language alternates, robots, sitemap, and
internal links. It uses Node's built-in test runner and existing dependencies.
To preview the same production HTML locally:

```bash
npm run serve:export
```

Open `http://127.0.0.1:3010`. `next start` is not used for static exports.
See [CRAWLABILITY-AUDIT.md](./CRAWLABILITY-AUDIT.md) for findings, verification,
the full crawler policy, and the remaining hosting actions.

## Search Console Readiness

The site is set up to expose:

- localized canonical URLs
- `hreflang` for English, French, and Arabic
- Arabic as `x-default`
- `sitemap.xml`
- `robots.txt`
- Open Graph and Twitter metadata
- Organization and WebSite JSON-LD on homepages
- FAQPage data matching the Join Us answers
- BreadcrumbList data on programs, category, archive and culture pages
- static category pages and yearly archives in all three languages

The canonical host is `https://www.scoutsmaisonpaix.org`, matching the existing
production redirect. English uses `/`, French `/fr/`, and Arabic `/ar/`.
Public content is statically generated; JavaScript enhances filters and previews.
Activity status is evaluated at build time in the Africa/Casablanca calendar;
rebuild when activity dates or content change.

Optional verification tokens can be added at deploy time:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

You can start from [`.env.example`](./.env.example).

After deployment, submit this sitemap in Google Search Console:

- `https://www.scoutsmaisonpaix.org/sitemap.xml`

Recommended first indexing requests:

- `https://www.scoutsmaisonpaix.org/`
- `https://www.scoutsmaisonpaix.org/ar/`
- `https://www.scoutsmaisonpaix.org/fr/`
- `https://www.scoutsmaisonpaix.org/programs/`
- `https://www.scoutsmaisonpaix.org/join-us/`

## GitHub Pages Deployment

Production responses identify Vercel hosting, with Cloudflare present on the
non-www host. The repository also retains an optional GitHub Pages workflow.

Important deployment details:

- `output: "export"` is enabled in [next.config.ts](./next.config.ts)
- `basePath` is optional and derives from `NEXT_PUBLIC_BASE_PATH` or the GitHub repository name in Actions
- `.nojekyll` is included so GitHub Pages serves the `_next` folder correctly
- the optional Pages deployment runs through [.github/workflows/nextjs.yml](./.github/workflows/nextjs.yml)

To deploy:

1. Push changes to the `main` branch.
2. In GitHub, set `Settings -> Pages -> Source` to `GitHub Actions`.
3. Let the workflow build and publish the site.

## Assets

Project assets live in the [`public`](./public) folder.

The main association logo is currently stored at:

- [`public/scouts-house-of-peace-logo.png`](./public/scouts-house-of-peace-logo.png)

If you replace the logo later:

1. Put the new file in `public`
2. Keep the same filename, or update the component that uses it
3. Commit and push the change

## Main Files

- [`app/(default)/page.tsx`](./app/(default)/page.tsx) - English homepage route
- [`app/[locale]/page.tsx`](./app/[locale]/page.tsx) - localized homepage routes
- [`app/root-shell.tsx`](./app/root-shell.tsx) - shared root document and verification metadata
- [`components/Hero.tsx`](./components/Hero.tsx) - hero section
- [`components/TrustStrip.tsx`](./components/TrustStrip.tsx) - recognition ribbon
- [`components/HouseOfPeace.tsx`](./components/HouseOfPeace.tsx) - identity section
- [`components/Values.tsx`](./components/Values.tsx) - values section
- [`components/Activities.tsx`](./components/Activities.tsx) - programs section
- [`components/GlobalMovement.tsx`](./components/GlobalMovement.tsx) - global movement section
- [`components/Impact.tsx`](./components/Impact.tsx) - impact section
- [`components/JoinUs.tsx`](./components/JoinUs.tsx) - closing invitation
- [`components/Footer.tsx`](./components/Footer.tsx) - footer
