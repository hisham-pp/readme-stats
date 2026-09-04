#!/usr/bin/env node
const { execSync } = require("child_process");

if (process.env.VERCEL || process.env.CI) {
  console.log(
    "⚡ Vercel/CI environment detected: skipping asset generation scripts during production build.",
  );
  process.exit(0);
}

console.log(
  "🔨 Local build detected: running asset generation scripts before build...",
);
try {
  execSync(
    "pnpm run config:merge && pnpm run badges:generate && pnpm run icons:generate && pnpm run bundle:svgs",
    {
      stdio: "inherit",
    },
  );
} catch (error) {
  console.error("❌ Failed to run asset generation scripts:", error);
  process.exit(1);
}
