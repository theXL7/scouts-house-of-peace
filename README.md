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

## GitHub Pages Deployment

This project is configured for GitHub Pages static export.

Important deployment details:

- `output: "export"` is enabled in [next.config.ts](./next.config.ts)
- `basePath` and `assetPrefix` are set for the repository path
- `.nojekyll` is included so GitHub Pages serves the `_next` folder correctly
- deployment runs through GitHub Actions in [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

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

- [`app/page.tsx`](./app/page.tsx) - homepage composition
- [`components/Hero.tsx`](./components/Hero.tsx) - hero section
- [`components/TrustStrip.tsx`](./components/TrustStrip.tsx) - recognition ribbon
- [`components/HouseOfPeace.tsx`](./components/HouseOfPeace.tsx) - identity section
- [`components/Values.tsx`](./components/Values.tsx) - values section
- [`components/Activities.tsx`](./components/Activities.tsx) - programs section
- [`components/GlobalMovement.tsx`](./components/GlobalMovement.tsx) - global movement section
- [`components/Impact.tsx`](./components/Impact.tsx) - impact section
- [`components/JoinUs.tsx`](./components/JoinUs.tsx) - closing invitation
- [`components/Footer.tsx`](./components/Footer.tsx) - footer
