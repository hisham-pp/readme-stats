# GitHub Readme Stats API

A dynamic GitHub profile statistics generator built with Next.js. This application provides various endpoints to generate SVG images for your GitHub README, showcasing your stats, top languages, and tech stack.

**Live Deployment:** [https://readme-stats-theta-sepia.vercel.app/](https://readme-stats-theta-sepia.vercel.app/)

## 🎨 Interactive API Builder

Don't want to type out query parameters manually? We have a visual builder!
Navigate to the **`/builder`** route on the live deployment to visually select your technologies, customize your themes, and instantly generate the exact Markdown and HTML code to paste into your GitHub README.

You can also browse all supported icons and badges visually at the **`/icons`** and **`/badges`** routes!

## 🚀 Endpoints

- `/api/stats` - Generates a GitHub stats card.
- `/api/top-langs` - Generates a top languages card.
- `/api/tech-icon-marquee` - Generates an animated tech stack **icon** marquee.
- `/api/tech-badge-marquee` - Generates an animated tech stack **badge** marquee.

## ✨ Features

### 3. Top Languages Card

Showcase your most-used GitHub languages using dedicated endpoints for each visual layout:

**Default Dots (`/api/top-langs`):**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username" alt="Top Languages" />
```

**Custom Badges (`/api/top-langs/badge`):**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/badge?username=your-username" alt="Top Languages Badges" />
```

**Custom Icons (`/api/top-langs/icon`):**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/icon?username=your-username" alt="Top Languages Icons" />
```

**Treemap (`/api/top-langs/treemap`):**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/treemap?username=your-username" alt="Top Languages Treemap" />
```

> **Tip:** You can also pass `?theme=dark|light|brand` or use the query parameter `?type=badge|icon|treemap` on `/api/top-langs`.

### 4. GitHub Contribution Snake Animation (`/api/snake`)

Dynamically generate an animated snake that crawls through your real GitHub contribution graph:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=your-username" alt="Contribution Snake" width="100%" />
```

> **Options:** `?palette=github-dark|github-light` • `?color_snake=purple|#38bdf8` • `?color_dots=...`

## 🚀 GitHub Actions Pre-Generation Pipeline (Zero Cold Starts)

Want completely instant loading without relying on dynamic API cold starts when visitors open your profile? You can pre-generate all your SVGs using a scheduled GitHub Actions workflow and push them directly to an `output` branch:

```yaml
name: Generate Profile SVGs & Snake Animation

on:
  schedule:
    - cron: "0 */12 * * *" # Every 12 hours
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: mkdir -p dist

      # Pre-generate your SVGs before the snake
      - name: Generate Readme Stats & Marquee SVGs
        run: |
          BASE_URL="https://readme-stats-theta-sepia.vercel.app"

          # 1. Tech Rainfall Banner
          curl -s -f "${BASE_URL}/api/tech-icon-rain?techs=react,nextjs,typescript&name=Hi" -o dist/tech-icon-rain.svg

          # 2. Tech Marquees
          curl -s -f "${BASE_URL}/api/tech-badge-marquee?techs=react,nextjs,typescript" -o dist/marquee-frontend.svg

          # 3. Stats & Languages
          curl -s -f "${BASE_URL}/api/stats?username=${{ github.repository_owner }}" -o dist/github-stats.svg
          curl -s -f "${BASE_URL}/api/top-langs?username=${{ github.repository_owner }}&type=treemap-icon" -o dist/top-langs.svg

      # Generate snake animation
      - name: Generate Snake Animation SVGs
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark

      # Push all SVGs to the output branch
      - name: Push generated SVGs to output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Then in your profile `README.md`, simply link to the raw pre-generated SVGs:

```markdown
<img src="https://raw.githubusercontent.com/<username>/<username>/output/github-stats.svg" alt="GitHub Stats" />
```

This repository is optimized for AI agents! We provide a comprehensive `llms.txt` at the root of the domain.
AI Agents can visit `/llms.txt` and `/tech-list.txt` to learn how to interact with this API and get the full list of supported technology IDs.

## 🛠️ Getting Started

> [!NOTE]
> This project exclusively supports **[pnpm](https://pnpm.io/)** as its package manager. Running with `npm`, `yarn`, or `bun` is not supported.

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration (For Local Development)

If you wish to run this locally, you may need to configure a GitHub Personal Access Token (PAT) in your `.env.local` file to avoid rate limits from the GitHub API.

```
GITHUB_TOKEN=your_token_here
```
