import fs from "fs";
import path from "path";
import { generateBadge } from "../src/lib/badgeGenerator";

// Read the tech config
const configPath = path.join(__dirname, "../src/lib/techConfig.json");
const techConfig: Record<string, any> = JSON.parse(
  fs.readFileSync(configPath, "utf8"),
);

const badgesDir = path.join(__dirname, "../public/badges");
const themeBadgesDir = path.join(badgesDir, "brand");

if (!fs.existsSync(themeBadgesDir)) {
  fs.mkdirSync(themeBadgesDir, { recursive: true });
}

// --- Prune stale badge files ---
// Build the set of expected output filenames from the current config.
// Includes both the key-based primary name and the id-based alias.
const expectedBadgeFiles = new Set(
  Object.entries(techConfig).flatMap(([k, c]: [string, any]) => {
    const files = [`${k}.svg`];
    if (c.id) files.push(`${c.id}.svg`);
    return files;
  }),
);

for (const file of fs.readdirSync(themeBadgesDir)) {
  if (!expectedBadgeFiles.has(file)) {
    fs.rmSync(path.join(themeBadgesDir, file));
    console.log(`\u{1F5D1}  Removed stale badge: brand/${file}`);
  }
}

console.log("Generating badges from techConfig.json...");

for (const [key, config] of Object.entries(techConfig)) {
  try {
    const { id, icon, badgeIconTheme = "brand" } = config as any;
    if (!id) {
      console.warn(`Skipping ${key}: No 'id' provided in config.`);
      continue;
    }

    // Read the raw SVG icon if provided
    let rawIconSvg = "";
    if (icon) {
      const iconsDir = path.join(
        __dirname,
        `../public/icons/${badgeIconTheme}`,
      );
      const iconPath = path.join(iconsDir, icon);
      if (fs.existsSync(iconPath)) {
        rawIconSvg = fs.readFileSync(iconPath, "utf8");
      } else {
        // fallback to brand if theme icon not found
        const brandIconPath = path.join(
          __dirname,
          `../public/icons/brand/${icon}`,
        );
        if (fs.existsSync(brandIconPath)) {
          rawIconSvg = fs.readFileSync(brandIconPath, "utf8");
        } else {
          console.warn(`Warning: Icon file ${icon} not found for ${key}.`);
        }
      }
    }

    // Generate the full badge SVG
    const badgeSvg = generateBadge({
      ...config,
      icon: rawIconSvg || undefined,
    });

    // Use the tech key as the primary filename (e.g. react_js.svg) to match
    // the same convention used by the icon generator (key-icon.svg).
    const outputFilename = `${key}.svg`;
    const outputPath = path.join(themeBadgesDir, outputFilename);
    fs.writeFileSync(outputPath, badgeSvg);
    // Also write to the id-based filename as a convenience alias
    // only if no other tech has already written to it (first-write wins).
    if (id) {
      const aliasPath = path.join(themeBadgesDir, `${id}.svg`);
      if (!fs.existsSync(aliasPath)) {
        fs.writeFileSync(aliasPath, badgeSvg);
      }
    }
    console.log(
      `\u2705 Successfully generated brand/${outputFilename} for ${config.name}`,
    );
  } catch (error) {
    console.error(`\u274C Failed to generate badge for ${key}:`, error);
  }
}

console.log("Badge generation complete.");
