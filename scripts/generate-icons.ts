import fs from "fs";
import path from "path";

// Read the tech config
const configPath = path.join(__dirname, "../src/lib/techConfig.json");
const techConfig: Record<string, any> = JSON.parse(
  fs.readFileSync(configPath, "utf8"),
);

const iconsBgDir = path.join(__dirname, "../public/icons/bg");
if (!fs.existsSync(iconsBgDir)) {
  fs.mkdirSync(iconsBgDir, { recursive: true });
}

console.log("Generating icons with backgrounds from techConfig.json...");

for (const [key, config] of Object.entries(techConfig)) {
  try {
    const {
      icon,
      color = "#333333",
      iconBgColor,
      iconBgTheme = "brand",
      defs = "",
    } = config as any;
    if (!icon) {
      continue;
    }

    const finalBgColor = iconBgColor || color;
    let rawIconSvg = "";

    const iconsDir = path.join(__dirname, `../public/icons/${iconBgTheme}`);
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
        continue;
      }
    }

    // Process the SVG
    let cleanedSvgContent = rawIconSvg.replace(/<\?xml.*?\?>/g, "").trim();

    // We want a 24x24 icon padded by 6 on each side, so container is 36x36
    const iconWidth = 24;
    const targetHeight = 24;
    const padding = 6;
    const containerWidth = iconWidth + padding * 2;
    const containerHeight = targetHeight + padding * 2;

    cleanedSvgContent = cleanedSvgContent.replace(
      /<svg([^>]*)width="[^"]*"/g,
      "<svg$1",
    );
    cleanedSvgContent = cleanedSvgContent.replace(
      /<svg([^>]*)height="[^"]*"/g,
      "<svg$1",
    );

    let innerIcon = cleanedSvgContent.replace(
      /<svg\s+width="[^"]*"\s+height="[^"]*"/,
      "<svg",
    );
    innerIcon = innerIcon.replace(
      /<svg/,
      `<svg x="${padding}" y="${padding}" width="${iconWidth}" height="${targetHeight}"`,
    );

    const finalSvgContent = `<svg width="${containerWidth}" height="${containerHeight}" viewBox="0 0 ${containerWidth} ${containerHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${defs ? `<defs>${defs}</defs>` : ""}
  <rect x="0" y="0" width="${containerWidth}" height="${containerHeight}" rx="12" fill="${finalBgColor}" />
  ${innerIcon}
</svg>`;

    // Use the tech key as the output filename to avoid collisions when
    // multiple techs share the same source icon (e.g. react-icon.svg).
    const outputFilename = `${key}-icon.svg`;
    const outputPath = path.join(iconsBgDir, outputFilename);
    fs.writeFileSync(outputPath, finalSvgContent);
    // Also write to the original icon filename as a convenience alias
    // only if no other tech has already written to it (first-write wins).
    const aliasPath = path.join(iconsBgDir, icon);
    if (!fs.existsSync(aliasPath)) {
      fs.writeFileSync(aliasPath, finalSvgContent);
    }
    console.log(
      `\u2705 Successfully generated bg/${outputFilename} for ${config.name}`,
    );
  } catch (error) {
    console.error(`\u274C Failed to generate bg icon for ${key}:`, error);
  }
}

console.log("Icon bg generation complete.");
