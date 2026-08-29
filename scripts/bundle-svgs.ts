import fs from "fs";
import path from "path";

const themes = ["brand", "dark", "light"];
const types = ["icons", "badges"];

const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const bundlesDir = path.join(rootDir, "src", "lib", "bundles");

if (!fs.existsSync(bundlesDir)) {
  fs.mkdirSync(bundlesDir, { recursive: true });
}

console.log("Generating SVG bundles...");

types.forEach((type) => {
  themes.forEach((theme) => {
    const inputDir = path.join(publicDir, type, theme);
    const bundleName = `${type}${theme.charAt(0).toUpperCase() + theme.slice(1)}Bundle`;
    const outputFile = path.join(bundlesDir, `${type}-${theme}.bundle.ts`);

    const bundleObject: Record<string, string> = {};

    if (fs.existsSync(inputDir)) {
      const files = fs
        .readdirSync(inputDir)
        .filter((file) => file.endsWith(".svg"));
      files.forEach((file) => {
        const filePath = path.join(inputDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        bundleObject[file] = content;
      });
    } else {
      console.warn(`Warning: Directory not found: ${inputDir}`);
    }

    const fileContent = `// Auto-generated SVG bundle for ${type} - ${theme}
export const ${bundleName}: Record<string, string> = ${JSON.stringify(bundleObject, null, 2)};
`;

    fs.writeFileSync(outputFile, fileContent);
    console.log(
      `✅ Generated ${type}-${theme}.bundle.ts with ${Object.keys(bundleObject).length} SVGs`,
    );
  });
});

console.log("SVG bundling complete.");
