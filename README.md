# GitHub Readme Stats API

A dynamic GitHub profile statistics generator built with Next.js. This application provides various endpoints to generate SVG images for your GitHub README, showcasing your stats, top languages, and tech stack.

**Live Deployment:** [https://readme-stats-theta-sepia.vercel.app/](https://readme-stats-theta-sepia.vercel.app/)

## Endpoints

- `https://readme-stats-theta-sepia.vercel.app/api/stats` - Generates a GitHub stats card.
- `https://readme-stats-theta-sepia.vercel.app/api/top-langs` - Generates a top languages card.
- `https://readme-stats-theta-sepia.vercel.app/api/tech-badge-marquee` - Generates an animated tech stack badge marquee.

## Features

### Top Languages with Custom Icons/Badges
You can render your most-used languages using your custom icons or badges by appending the `?type=` query parameter.

**Default Dots:**
```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username" alt="Top Languages" />
```

**Custom Icons (`?type=icon`):**
```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username&type=icon" alt="Top Languages Icons" />
```

**Custom Badges (`?type=badge`):**
```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username&type=badge" alt="Top Languages Badges" />
```

**Treemap Icons (`?type=treemap-icon`):**
```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username&type=treemap-icon" alt="Top Languages Treemap Icons" />
```

**Treemap Badges (`?type=treemap-badge`):**
```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username&type=treemap-badge" alt="Top Languages Treemap Badges" />
```

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
