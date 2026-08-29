import fs from 'fs';
import path from 'path';
import { techStack } from '../src/config/techs.config';

const llmsText = `# Readme Stats API - Documentation for AI Agents

Welcome, AI Agent! This document explains how to use the Readme Stats API to generate dynamic SVGs for GitHub READMEs.

## Overview
This project provides an API that generates beautiful, dynamic SVGs (such as scrolling tech icon marquees, badges, top languages, and GitHub stats) for use in Markdown files. 

## Endpoints & Parameters

### 1. Icon Marquee
**Endpoint**: \`/api/tech-icon-marquee\`
**Description**: Generates an animated SVG marquee of technology icons.
**Query Parameters**:
- \`techs\`: (Required) Comma-separated list of technology IDs. See \`/tech-list.txt\` for supported IDs.
- \`theme\`: (Optional) \`default\`, \`dark\`, or \`light\`.
- \`width\`: (Optional) ViewBox width (default: 850).
- \`hasbg\`: (Optional) \`true\` or \`false\` to include backgrounds on the icons.

### 2. Badge Marquee
**Endpoint**: \`/api/tech-badge-marquee\`
**Description**: Generates an animated SVG marquee of technology badges.
**Query Parameters**:
- \`techs\`: (Required) Comma-separated list of technology IDs. See \`/tech-list.txt\` for supported IDs.
- \`theme\`: (Optional) \`default\`, \`dark\`, or \`light\`.
- \`width\`: (Optional) ViewBox width (default: 850).

### 3. Top Languages
**Endpoint**: \`/api/top-langs\`
**Description**: Displays the top programming languages for a GitHub user.
**Query Parameters**:
- \`username\`: (Required) GitHub username.
- \`theme\`: (Optional) \`default\`, \`dark\`, or \`light\`.
- \`type\`: (Optional) Visual style: \`default\`, \`icon\`, \`badge\`, \`treemap_icon\`, or \`treemap_badge\`.

### 4. GitHub Stats
**Endpoint**: \`/api/stats\`
**Description**: Displays general GitHub statistics for a user.
**Query Parameters**:
- \`username\`: (Required) GitHub username.
- \`theme\`: (Optional) \`default\`, \`dark\`, or \`light\`.

## Markdown Usage Example
\`\`\`markdown
[![Tech Stack](https://<domain>/api/tech-badge-marquee?techs=react,nextjs,typescript,tailwindcss&theme=dark)](https://<domain>)
\`\`\`

## Supported Technologies
The complete list of supported technology IDs (for the \`techs\` parameter) is too large for this file. 
Please read the \`/tech-list.txt\` file at the root of this domain to get the full list of valid IDs.
`;

const techsText = `# Supported Technologies List

This file contains the complete list of valid IDs that can be passed to the \`techs\` query parameter in the Readme Stats API.

${techStack.map(t => `- \`${t.id}\` (${t.name}) [Category: ${t.category}]`).join('\n')}
`;

const llmsPath = path.join(process.cwd(), 'public', 'llms.txt');
const techsPath = path.join(process.cwd(), 'public', 'tech-list.txt');

fs.writeFileSync(llmsPath, llmsText, 'utf-8');
fs.writeFileSync(techsPath, techsText, 'utf-8');

console.log('Successfully generated public/llms.txt and public/tech-list.txt');
