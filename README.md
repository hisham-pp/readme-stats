# GitHub Readme Stats API

A dynamic GitHub profile statistics generator built with Next.js. This application provides various endpoints to generate SVG images for your GitHub README, showcasing your stats, top languages, and tech stack.

**Live Deployment:** [https://readme-stats-theta-sepia.vercel.app/](https://readme-stats-theta-sepia.vercel.app/)

## Endpoints

- `https://readme-stats-theta-sepia.vercel.app/api/stats` - Generates a GitHub stats card.
- `https://readme-stats-theta-sepia.vercel.app/api/top-langs` - Generates a top languages card.
- `https://readme-stats-theta-sepia.vercel.app/api/tech-badge-marquee` - Generates an animated tech stack badge marquee.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

You may need to configure a GitHub Personal Access Token (PAT) in your `.env.local` file to avoid rate limits from the GitHub API.

```
GITHUB_TOKEN=your_token_here
```

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).
