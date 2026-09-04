# GitHub Actions Pre-Generation Pipeline

> **View other styles:** [Overview](./README.md) | [Badge Marquee](./badge-marquee.md) | [Icon Marquee](./icon-marquee.md) | [Top Languages](./top-langs.md) | [Contribution Snake](./snake.md)

Pre-generate all your profile SVGs on a scheduled GitHub Actions workflow and deploy directly to your repository's `output` branch for instant rendering with **zero cold starts**.

When visitors open your GitHub profile, the images load directly from GitHub's fast CDN without waiting for serverless execution.

---

## Complete GitHub Actions Workflow

Create a workflow file in your GitHub profile repository at `.github/workflows/generate-assets.yml` (or update your existing `snake.yml`):

```yaml
name: Generate Profile SVGs & Snake Animation

on:
  schedule:
    # Automatically run every 12 hours
    - cron: "0 */12 * * *"

  # Allow manual triggering from GitHub Actions tab
  workflow_dispatch:

  # Run on every push to the main branch
  push:
    branches:
      - main
      - master

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Create dist directory
        run: mkdir -p dist

      - name: Pre-generate Readme Stats & Marquee SVGs
        run: |
          BASE_URL="https://readme-stats-theta-sepia.vercel.app"

          # 1. Tech Rainfall Banner
          curl -s -f "${BASE_URL}/api/tech-icon-rain?techs=react,nextjs,typescript&name=Hi%2C%20I'm%20Developer" -o dist/tech-icon-rain.svg

          # 2. Tech Stack Marquees
          curl -s -f "${BASE_URL}/api/tech-badge-marquee?techs=react,nextjs,typescript" -o dist/marquee-frontend.svg
          curl -s -f "${BASE_URL}/api/tech-badge-marquee?techs=nodejs,nestjs,python" -o dist/marquee-backend.svg

          # 3. GitHub Stats & Top Languages
          curl -s -f "${BASE_URL}/api/stats?username=${{ github.repository_owner }}" -o dist/github-stats.svg
          curl -s -f "${BASE_URL}/api/top-langs?username=${{ github.repository_owner }}&type=treemap-icon" -o dist/top-langs.svg

      - name: Generate Snake Animation SVGs
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark

      - name: Push generated SVGs to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Embedding the Pre-Generated SVGs in README.md

In your GitHub profile `README.md`, point your image tags directly to GitHub's raw content CDN on the `output` branch:

```markdown
<!-- Rainfall Banner -->
<img src="https://raw.githubusercontent.com/<username>/<username>/output/tech-icon-rain.svg" alt="Banner" width="100%" />

<!-- Tech Marquees -->
<img src="https://raw.githubusercontent.com/<username>/<username>/output/marquee-frontend.svg" alt="Frontend Marquee" width="850" />

<!-- Stats & Top Languages -->
<img src="https://raw.githubusercontent.com/<username>/<username>/output/github-stats.svg" alt="GitHub Stats" width="100%" />
<img src="https://raw.githubusercontent.com/<username>/<username>/output/top-langs.svg" alt="Top Languages" width="100%" />

<!-- Snake Animation -->
<img src="https://raw.githubusercontent.com/<username>/<username>/output/github-contribution-grid-snake-dark.svg" alt="Snake Animation" width="100%" />
```

---

## Benefits

| Feature              | Dynamic API                    | Pre-Generation Pipeline                   |
| -------------------- | ------------------------------ | ----------------------------------------- |
| **Load Speed**       | 200ms - 2s (Cold starts)       | **< 50ms** (Cached by GitHub CDN)         |
| **API Availability** | Dependent on serverless uptime | **100%** (Static repository branch)       |
| **Snake Animation**  | Dynamic generation             | Real-time GitHub Actions grid computation |
| **Update Frequency** | Real-time / on request         | Every 12 hours (configurable cron)        |
