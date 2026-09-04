import fs from "fs";
import path from "path";
import { techStack } from "../src/config/techs.config";

const llmsText = `# Readme Stats API - Documentation for AI Agents

Welcome, AI Agent! This document explains how to use the Readme Stats API to generate dynamic SVGs for GitHub READMEs.

## Overview
This project provides an API that generates beautiful, dynamic SVGs (such as scrolling tech icon marquees, badges, tech rainfall banners, top languages, GitHub stats, streak counters, and contribution snake animations) for use in Markdown files. 

## Endpoints & Parameters

### 1. Icon Marquee
**Endpoint**: \`/api/tech-icon-marquee\`
**Description**: Generates an animated SVG marquee of technology icons.
**Query Parameters**:
- \`techs\`: (Required) Comma-separated list of technology IDs. See \`/tech-list.txt\` for supported IDs.
- \`theme\`: (Optional) \`brand\`, \`dark\`, \`light\`, or \`bg\`.
- \`width\`: (Optional) ViewBox width (default: 850).

### 2. Badge Marquee
**Endpoint**: \`/api/tech-badge-marquee\`
**Description**: Generates an animated SVG marquee of technology badges.
**Query Parameters**:
- \`techs\`: (Required) Comma-separated list of technology IDs. See \`/tech-list.txt\` for supported IDs.
- \`width\`: (Optional) ViewBox width (default: 850).

### 3. Tech Icon Rainfall Banner
**Endpoint**: \`/api/tech-icon-rain\`
**Description**: Generates an animated tech logos rainfall banner with custom title text and description.
**Query Parameters**:
- \`techs\`: (Optional) Comma-separated list of technology IDs (defaults to all supported techs).
- \`name\`: (Optional) Centered title text.
- \`description\`: (Optional) Subtitle / bio description.
- \`width\`: (Optional) SVG width in pixels (default: 850).
- \`height\`: (Optional) SVG height in pixels (default: 300).
- \`theme\`: (Optional) \`brand\`, \`dark\`, \`light\`, or \`bg\`.
- \`color\`: (Optional) Text color hex code (default: #FFFFFF).
- \`bgcolor\`: (Optional) Background color hex code or \`transparent\`.
- \`fontSize\`: (Optional) Title font size (default: 54).

### 4. Top Languages
**Endpoint**: \`/api/top-langs\`
**Description**: Displays the top programming languages for a GitHub user.
**Query Parameters**:
- \`username\`: (Required) GitHub username.
- \`theme\`: (Optional) \`brand\`, \`dark\`, or \`light\`.
- \`type\`: (Optional) Visual style: \`default\`, \`icon\`, \`badge\`, \`treemap_icon\`, or \`treemap_badge\`.

### 5. GitHub Stats
**Endpoint**: \`/api/stats\`
**Description**: Displays general GitHub statistics for a user.
**Query Parameters**:
- \`username\`: (Required) GitHub username.
- \`theme\`: (Optional) \`brand\`, \`dark\`, or \`light\`.

### 6. GitHub Streak
**Endpoint**: \`/api/streak\`
**Description**: Displays GitHub current streak, longest streak, and total contributions with an animated flame icon.
**Query Parameters**:
- \`username\`: (Required) GitHub username.
- \`theme\`: (Optional) \`brand\`, \`dark\`, \`light\`, or \`bg\`.

### 7. GitHub Contribution Snake Animation
**Endpoint**: \`/api/snake\`
**Description**: Generates an animated snake that crawls through the user's real GitHub contribution calendar grid.
**Query Parameters**:
- \`username\`: (Required) GitHub username.
- \`palette\` / \`theme\`: (Optional) Color preset (\`github-dark\`, \`github-light\`, \`github\`, \`gitlab-dark\`, \`codeberg-dark\`).
- \`color_snake\`: (Optional) Hex or named color for the snake (e.g. \`#38bdf8\`, \`purple\`, \`orange\`).
- \`color_dots\`: (Optional) Comma-separated list of 5 colors for contribution levels 0 to 4.
- \`color_background\`: (Optional) Background color hex or named color.
- \`speed\`: (Optional) Step duration in milliseconds (default: 100).

### 8. Animated Typing Terminal
**Endpoint**: \`/api/terminal\`
**Description**: Generates an animated macOS/Linux typing terminal with custom commands and syntax-highlighted responses.
**Query Parameters**:
- \`username\`: (Optional) GitHub username for prompt/title.
- \`title\`: (Optional) Window title text (default: \`bash — 80x24\`).
- \`prompt\`: (Optional) Shell prompt prefix (default: \`➜ ~\`).
- \`theme\`: (Optional) \`brand\`, \`dark\`, \`matrix\`, \`dracula\`, \`monokai\`, \`light\`, or \`bg\`.
- \`lines\`: (Optional) Semicolon-separated \`command:output\` pairs.
- \`width\`: (Optional) Card width in pixels (default: 850).

### 9. Pinned Repository Card
**Endpoint**: \`/api/pin\`
**Description**: Generates a dynamic pinned repository card showing live stars, forks, primary language, and description. Supports single cards and multi-card SVG grids.
**Query Parameters**:
- \`username\` / \`owner\`: (Required) GitHub username or organization name.
- \`repo\` / \`repos\`: (Required) GitHub repository name, or comma-separated list of repos (e.g. \`repo1,repo2\`). Supports \`owner/repo\` syntax.
- \`cols\`: (Optional) Columns for multi-repo grids (e.g. \`1\` or \`2\`, default \`2\`).
- \`theme\`: (Optional) \`brand\`, \`dark\`, \`light\`, or \`bg\`.
- \`show_owner\`: (Optional) \`true\` or \`false\` (default: \`false\`).
- \`description\`: (Optional) Custom description override for single cards.

## Markdown Usage Example
\`\`\`markdown
[![Tech Stack](https://<domain>/api/tech-badge-marquee?techs=react,nextjs,typescript,tailwindcss)](https://<domain>)
\`\`\`

## Supported Technologies
The complete list of supported technology IDs (for the \`techs\` parameter) is too large for this file. 
Please read the \`/tech-list.txt\` file at the root of this domain to get the full list of valid IDs.
`;

const techsText = `# Supported Technologies List

This file contains the complete list of valid IDs that can be passed to the \`techs\` query parameter in the Readme Stats API.

${techStack.map((t) => `- \`${t.id}\` (${t.name}) [Category: ${t.category}]`).join("\n")}
`;

const llmsPath = path.join(process.cwd(), "public", "llms.txt");
const techsPath = path.join(process.cwd(), "public", "tech-list.txt");

fs.writeFileSync(llmsPath, llmsText, "utf-8");
fs.writeFileSync(techsPath, techsText, "utf-8");

console.log("Successfully generated public/llms.txt and public/tech-list.txt");
