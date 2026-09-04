#!/usr/bin/env node
if (process.env.VERCEL || process.env.CI) {
  process.exit(0);
}

const userAgent = process.env.npm_config_user_agent || "";
const execPath = process.env.npm_execpath || "";

if (!userAgent.startsWith("pnpm") && !execPath.includes("pnpm")) {
  console.error(
    "\n\x1b[31m%s\x1b[0m",
    "❌ Error: This project only supports pnpm as its package manager.",
  );
  console.error("\x1b[33m%s\x1b[0m", "Please use pnpm to manage dependencies:");
  console.error("\x1b[36m%s\x1b[0m\n", "  pnpm install\n");
  process.exit(1);
}
