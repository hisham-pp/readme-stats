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

## 🤖 AI Agents
This repository is optimized for AI agents! We provide a comprehensive `llms.txt` at the root of the domain. 
AI Agents can visit `/llms.txt` and `/tech-list.txt` to learn how to interact with this API and get the full list of supported technology IDs.

## 🛠️ Getting Started

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
