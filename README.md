# GitHub Readme Stats API

A dynamic GitHub profile statistics generator built with Next.js. This application provides various endpoints to generate SVG images for your GitHub README, showcasing your stats, top languages, and tech stack.

**Live Deployment:** [https://readme-stats-theta-sepia.vercel.app/](https://readme-stats-theta-sepia.vercel.app/)

## 🎨 Interactive API Builder

Don't want to type out query parameters manually? We have a visual builder!
Navigate to the **`/builder`** route on the live deployment to visually select your technologies, customize your themes, and instantly generate the exact Markdown and HTML code to paste into your GitHub README.

You can also browse all supported brands, icons, and badges visually at the **`/brands`** route, or explore live interactive examples in the **`/preview`** documentation!

## 🚀 Endpoints

- `/api/stats` - Generates a GitHub stats card.
- `/api/streak` - Generates a GitHub streak and consistency card.
- `/api/top-langs` - Generates a top languages card.
- `/api/tech-icon-rain` - Generates an animated tech rainfall banner with custom text.
- `/api/tech-icon-marquee` - Generates an animated tech stack **icon** marquee.
- `/api/tech-badge-marquee` - Generates an animated tech stack **badge** marquee.
- `/api/snake` - Generates an animated GitHub contribution grid snake animation.
- `/api/terminal` - Generates an animated macOS/Linux typing terminal card with custom commands and syntax highlights.

## ✨ Features & Parameter Tables

### 1. GitHub Stats Card (`/api/stats`)

Generates a summary card of your GitHub stars, commits, PRs, and issues:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/stats?username=your-username" alt="GitHub Stats" />
```

| Parameter  | Type     | Default    | Description                              |
| ---------- | -------- | ---------- | ---------------------------------------- |
| `username` | `string` | _Required_ | GitHub username                          |
| `theme`    | `string` | `brand`    | Theme: `brand`, `dark`, `light`, or `bg` |

---

### 2. GitHub Streak Card (`/api/streak`)

Displays your current streak, longest streak, and total contributions with animated flame highlights:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/streak?username=your-username" alt="GitHub Streak" />
```

| Parameter  | Type     | Default    | Description                              |
| ---------- | -------- | ---------- | ---------------------------------------- |
| `username` | `string` | _Required_ | GitHub username                          |
| `theme`    | `string` | `brand`    | Theme: `brand`, `dark`, `light`, or `bg` |

---

### 3. Top Languages Card (`/api/top-langs`)

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

| Parameter  | Type     | Default    | Description                                                                       |
| ---------- | -------- | ---------- | --------------------------------------------------------------------------------- |
| `username` | `string` | _Required_ | GitHub username                                                                   |
| `type`     | `string` | `default`  | Layout: `default`, `badge`, `icon`, `treemap`, `treemap-badge`, or `treemap-icon` |
| `theme`    | `string` | `brand`    | Color palette for badges/icons: `brand`, `dark`, `light`, or `bg`                 |

---

### 4. Tech Icon Rainfall Banner (`/api/tech-icon-rain`)

Animated tech logos raining in the background behind your name and bio:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/tech-icon-rain?techs=react,nextjs,typescript&name=Hi%2C%20I'm%20YourName&description=Full%20Stack%20Engineer" alt="Tech Rainfall Banner" width="100%" />
```

| Parameter     | Type     | Default     | Description                                         |
| ------------- | -------- | ----------- | --------------------------------------------------- |
| `techs`       | `string` | _All techs_ | Comma-separated tech keys to rain in the background |
| `name`        | `string` | _None_      | Title heading centered in banner                    |
| `description` | `string` | _None_      | Subtitle description below title                    |
| `width`       | `number` | `850`       | SVG width in pixels                                 |
| `height`      | `number` | `300`       | SVG height in pixels                                |
| `theme`       | `string` | `brand`     | Icon theme: `brand`, `dark`, `light`, or `bg`       |
| `color`       | `string` | `#FFFFFF`   | Text color (hex code)                               |
| `bgcolor`     | `string` | _Auto_      | Background color (hex code or `transparent`)        |
| `fontSize`    | `number` | `54`        | Font size for title heading                         |

---

### 5. Tech Marquees (`/api/tech-badge-marquee` & `/api/tech-icon-marquee`)

Infinite animated carousel displaying badges or icons:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/tech-badge-marquee?techs=react,nextjs,typescript" alt="Tech Badge Marquee" />
```

| Parameter | Type     | Default     | Description                                             |
| --------- | -------- | ----------- | ------------------------------------------------------- |
| `techs`   | `string` | _All techs_ | Comma-separated technology keys                         |
| `theme`   | `string` | `brand`     | _(Icons only)_ Theme: `brand`, `dark`, `light`, or `bg` |
| `width`   | `number` | `850`       | Marquee viewbox width in pixels                         |

---

### 6. GitHub Contribution Snake Animation (`/api/snake`)

Dynamically generate an animated snake that crawls through your real GitHub contribution graph:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=your-username" alt="Contribution Snake" width="100%" />
```

| Parameter           | Type     | Default       | Description                                                                           |
| ------------------- | -------- | ------------- | ------------------------------------------------------------------------------------- |
| `username`          | `string` | _Required_    | GitHub username                                                                       |
| `palette` / `theme` | `string` | `github-dark` | Color preset: `github-dark`, `github-light`, `github`, `gitlab-dark`, `codeberg-dark` |
| `color_snake`       | `string` | `purple`      | Hex or named color for the snake (e.g. `#38bdf8`, `orange`)                           |
| `color_dots`        | `string` | _5 colors_    | Comma-separated list of 5 colors from 0 to 4 contribution level                       |
| `color_background`  | `string` | `#0c1116`     | Background color of the SVG                                                           |
| `speed`             | `number` | `100`         | Step duration in milliseconds (lower = faster)                                        |

---

### 7. Animated Typing Terminal (`/api/terminal`)

Generates a macOS/Linux terminal window with animated typing lines and a blinking cursor:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username" alt="Terminal Bio" width="100%" />
```

| Parameter  | Type     | Default             | Description                                                                                      |
| ---------- | -------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `username` | `string` | _Optional_          | GitHub username used in prompt and window title                                                  |
| `title`    | `string` | `bash — 80x24`      | Text displayed in the macOS window title bar                                                     |
| `prompt`   | `string` | `➜ ~`               | Shell prompt prefix symbol                                                                       |
| `theme`    | `string` | `brand`             | Theme preset: `brand`, `dark`, `matrix`, `dracula`, `monokai`, `light`, or `bg`                  |
| `lines`    | `string` | _Default developer_ | Semicolon-separated `command:output` pairs (e.g. `whoami:Engineer;cat bio.txt:Building systems`) |
| `width`    | `number` | `850`               | ViewBox width of the terminal SVG                                                                |

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

          # 3. Stats, Streak & Languages
          curl -s -f "${BASE_URL}/api/stats?username=${{ github.repository_owner }}" -o dist/github-stats.svg
          curl -s -f "${BASE_URL}/api/streak?username=${{ github.repository_owner }}" -o dist/github-streak.svg
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
