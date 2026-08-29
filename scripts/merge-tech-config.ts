import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const techDir = path.join(__dirname, "../src/config/tech");
const outputPath = path.join(__dirname, "../src/lib/techConfig.json");

async function main() {
  const merged: Record<string, any> = {};

  const techFolders = fs
    .readdirSync(techDir)
    .filter(
      (f) =>
        fs.statSync(path.join(techDir, f)).isDirectory() && !f.startsWith("_"),
    )
    .sort();

  for (const key of techFolders) {
    const folderPath = path.join(techDir, key);

    const load = async (filename: string): Promise<Record<string, any>> => {
      const filePath = path.join(folderPath, filename);
      if (!fs.existsSync(filePath)) return {};
      const mod = await import(pathToFileURL(filePath).href);
      return mod.default ?? {};
    };

    const base = await load("default.ts");
    const badge = await load("badge.ts");
    const icon = await load("icon.ts");

    merged[key] = { ...base, ...badge, ...icon };
  }

  fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2) + "\n");
  console.log(
    `\u2705 Merged ${techFolders.length} tech configs \u2192 src/lib/techConfig.json`,
  );
}

main().catch((err) => {
  console.error("\u274C Merge failed:", err);
  process.exit(1);
});
